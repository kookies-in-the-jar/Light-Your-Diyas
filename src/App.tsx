/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HeroDiya } from './components/HeroDiya';
import { BentoGrid } from './components/BentoGrid';
import { CardCreator } from './components/CardCreator';
import { RangoliShowcase } from './components/RangoliShowcase';
import { WishWall } from './components/WishWall';
import { Footer } from './components/Footer';
import { BlessingModal } from './components/BlessingModal';
import { ReceivedBlessingModal } from './components/ReceivedBlessingModal';
import { Toast } from './components/Toast';
import { CardTheme } from './types';
import { ambientPlayer, playDiyaChime } from './utils/audio';

export default function App() {
  const [activeSection, setActiveSection] = useState<string>('light-a-diya');
  const [isAmbientPlaying, setIsAmbientPlaying] = useState<boolean>(false);
  const [isBlessingModalOpen, setIsBlessingModalOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Received blessing state from shareable links
  const [receivedBlessing, setReceivedBlessing] = useState<{
    to: string;
    from: string;
    message: string;
    theme: CardTheme;
  } | null>(null);
  const [isReceivedBlessingOpen, setIsReceivedBlessingOpen] = useState<boolean>(false);
  const [replyTo, setReplyTo] = useState<{ recipient: string; sender: string } | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((current) => (current === msg ? null : current));
    }, 3800);
  };

  const handleToggleAmbient = () => {
    if (isAmbientPlaying) {
      ambientPlayer.stop();
      setIsAmbientPlaying(false);
      showToast('Sitar ambient paused');
    } else {
      ambientPlayer.start(146.83); // Raag Yaman D drone
      setIsAmbientPlaying(true);
      showToast('🎶 Sitar & Tanpura ambient resonance activated');
    }
  };

  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleReplyBlessing = (toName: string, fromName: string) => {
    setReplyTo({ recipient: toName, sender: fromName });
    handleNavigate('personalized-wishes');
  };

  // Check URL query parameters for personalized blessing when opened in any browser
  useEffect(() => {
    try {
      if (typeof window === 'undefined') return;
      const params = new URLSearchParams(window.location.search);
      const to = params.get('to');
      const from = params.get('from');
      const msg = params.get('msg');
      const themeParam = params.get('theme') as CardTheme | null;
      const theme: CardTheme =
        themeParam === 'emerald' || themeParam === 'crimson' || themeParam === 'amber'
          ? themeParam
          : 'amber';

      if (to && from) {
        const defaultMsg =
          'May the divine light of Diwali illuminate your life with infinite peace, joyous prosperity, and vibrant happiness! 🪔✨';
        setReceivedBlessing({
          to,
          from,
          message: msg || defaultMsg,
          theme,
        });
        setIsReceivedBlessingOpen(true);
        showToast(`✨ Special Deepavali blessing received for ${to} from ${from}!`);
      }
    } catch {
      // Ignored
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#2e001c] text-[#ffd8e7] flex flex-col font-sans selection:bg-[#fe8932] selection:text-[#311300]">
      {/* Top Navigation */}
      <Header
        activeSection={activeSection}
        onNavigate={handleNavigate}
        isAmbientPlaying={isAmbientPlaying}
        onToggleAmbient={handleToggleAmbient}
        onOpenSendWish={() => handleNavigate('personalized-wishes')}
      />

      {/* Main Content Sections */}
      <main className="w-full pt-20 flex flex-col flex-1">
        {/* Central Diya Altar */}
        <HeroDiya
          onOfferBlessing={() => setIsBlessingModalOpen(true)}
          onDiyaLit={() =>
            showToast('✨ An auspicious Diya was lit! Blessings sent across the world.')
          }
        />

        {/* Bento Grid: Fireworks, Featured Rangoli, Music Sanctuary, Vedic Wisdom */}
        <BentoGrid
          onShowToast={showToast}
          onNavigateToGallery={() => handleNavigate('rangoli-gallery')}
        />

        {/* Personalized Wish Card Designer */}
        <CardCreator onShowToast={showToast} replyTo={replyTo} />

        {/* Sacred Rangoli Showcase */}
        <RangoliShowcase onShowToast={showToast} />

        {/* Global Blessing Circle & Ticker */}
        <WishWall onShowToast={showToast} />
      </main>

      {/* Footer */}
      <Footer
        onShowToast={showToast}
        onOpenSendWish={() => handleNavigate('personalized-wishes')}
      />

      {/* Received Personalized Blessing Card Modal (when opened from any shared browser link) */}
      {receivedBlessing && (
        <ReceivedBlessingModal
          isOpen={isReceivedBlessingOpen}
          onClose={() => setIsReceivedBlessingOpen(false)}
          to={receivedBlessing.to}
          from={receivedBlessing.from}
          message={receivedBlessing.message}
          theme={receivedBlessing.theme}
          onLightDiyaInReturn={() => {
            playDiyaChime();
            showToast(`✨ You lit an auspicious return Diya for ${receivedBlessing.from}!`);
          }}
          onReply={handleReplyBlessing}
          onShowToast={showToast}
        />
      )}

      {/* Silent Prayer / Meditation Modal */}
      <BlessingModal
        isOpen={isBlessingModalOpen}
        onClose={() => setIsBlessingModalOpen(false)}
        onBlessingOffered={() => {
          playDiyaChime();
          showToast('🌸 Silent prayer offered with auspicious reverence.');
        }}
      />

      {/* Toast Notification Container */}
      <Toast message={toastMessage} onClose={() => setToastMessage(null)} />
    </div>
  );
}
