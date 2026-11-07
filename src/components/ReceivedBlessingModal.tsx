import React from 'react';
import { Sparkles, Download, Flame, Send, X, Check } from 'lucide-react';
import { CardTheme } from '../types';
import { playKeyClickSound, playDiyaChime } from '../utils/audio';

interface ReceivedBlessingModalProps {
  isOpen: boolean;
  onClose: () => void;
  to: string;
  from: string;
  message: string;
  theme: CardTheme;
  onLightDiyaInReturn: () => void;
  onReply: (toName: string, fromName: string) => void;
  onShowToast: (msg: string) => void;
}

export const ReceivedBlessingModal: React.FC<ReceivedBlessingModalProps> = ({
  isOpen,
  onClose,
  to,
  from,
  message,
  theme,
  onLightDiyaInReturn,
  onReply,
  onShowToast,
}) => {
  if (!isOpen) return null;

  const handleDownloadCard = () => {
    playKeyClickSound();
    playDiyaChime();

    const canvas = document.createElement('canvas');
    canvas.width = 800;
    canvas.height = 950;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Background gradient based on theme
    const grad = ctx.createLinearGradient(0, 0, 0, 950);
    if (theme === 'emerald') {
      grad.addColorStop(0, '#003a05');
      grad.addColorStop(0.5, '#2e001c');
      grad.addColorStop(1, '#002202');
    } else if (theme === 'crimson') {
      grad.addColorStop(0, '#680010');
      grad.addColorStop(0.5, '#ba0225');
      grad.addColorStop(1, '#250015');
    } else {
      grad.addColorStop(0, '#3d0026');
      grad.addColorStop(0.5, '#43022b');
      grad.addColorStop(1, '#250015');
    }

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 800, 950);

    // Golden border
    ctx.strokeStyle = '#FE8932';
    ctx.lineWidth = 4;
    ctx.strokeRect(24, 24, 752, 902);
    ctx.strokeStyle = '#FFB689';
    ctx.lineWidth = 1;
    ctx.strokeRect(34, 34, 732, 882);

    // Filigree corners
    ctx.font = '24px serif';
    ctx.fillStyle = '#FE8932';
    ctx.fillText('❖', 48, 64);
    ctx.fillText('❖', 732, 64);
    ctx.fillText('❖', 48, 896);
    ctx.fillText('❖', 732, 896);

    // Header text
    ctx.textAlign = 'center';
    ctx.font = 'bold 16px "Plus Jakarta Sans", sans-serif';
    ctx.fillStyle = '#3AE441';
    ctx.fillText('SHUBH DEEPAVALI BLESSINGS', 400, 160);

    // Recipient
    ctx.font = 'italic bold 36px "Playfair Display", Georgia, serif';
    ctx.fillStyle = '#FFB689';
    ctx.fillText(`Dearest ${to || 'Loved One'},`, 400, 240);

    // Box for message
    ctx.fillStyle = 'rgba(37, 0, 21, 0.7)';
    ctx.beginPath();
    ctx.roundRect(80, 290, 640, 260, 16);
    ctx.fill();
    ctx.strokeStyle = 'rgba(254, 137, 50, 0.3)';
    ctx.stroke();

    // Word wrap message
    ctx.font = 'italic 20px "Plus Jakarta Sans", sans-serif';
    ctx.fillStyle = '#FFD8E7';
    const words = `"${message}"`.split(' ');
    let line = '';
    let y = 370;
    for (let n = 0; n < words.length; n++) {
      const testLine = line + words[n] + ' ';
      const metrics = ctx.measureText(testLine);
      if (metrics.width > 560 && n > 0) {
        ctx.fillText(line, 400, y);
        line = words[n] + ' ';
        y += 34;
      } else {
        line = testLine;
      }
    }
    ctx.fillText(line, 400, y);

    // Sender
    ctx.font = '14px "Plus Jakarta Sans", sans-serif';
    ctx.fillStyle = '#DDC1B1';
    ctx.fillText('WITH LOVING PRAYERS,', 400, 630);

    ctx.font = 'bold 28px "Playfair Display", serif';
    ctx.fillStyle = '#FE8932';
    ctx.fillText(from || 'With Warmth', 400, 680);

    // Token of light
    ctx.font = '14px "Plus Jakarta Sans", sans-serif';
    ctx.fillStyle = '#3AE441';
    ctx.fillText('✨ An Auspicious Digital Token of Light 🪔', 400, 770);

    const link = document.createElement('a');
    link.download = `Diwali_Wish_${to || 'Blessing'}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
    onShowToast('✨ Diwali Greeting Card downloaded!');
  };

  const getThemeContainerStyle = () => {
    if (theme === 'emerald') {
      return 'bg-gradient-to-b from-[#003a05]/90 via-[#2e001c] to-[#002202] border-[#3ae441]/50';
    }
    if (theme === 'crimson') {
      return 'bg-gradient-to-b from-[#680010]/95 via-[#ba0225]/50 to-[#250015] border-[#ffb3b0]/50';
    }
    return 'bg-gradient-to-b from-[#43022b]/95 via-[#3d0026] to-[#250015] border-[#fe8932]/45';
  };

  const getThemeTextColor = () => {
    if (theme === 'emerald') return 'text-[#3ae441]';
    if (theme === 'crimson') return 'text-[#ffdad8]';
    return 'text-[#ffb689]';
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#250015]/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-xl my-8 bg-[#3d0026] border border-[#fe8932]/40 rounded-3xl p-6 sm:p-8 shadow-[0_0_50px_rgba(254,137,50,0.3)] flex flex-col gap-6 animate-in fade-in zoom-in-95 duration-300">
        {/* Close Button */}
        <button
          type="button"
          onClick={() => {
            playKeyClickSound();
            onClose();
          }}
          aria-label="Close Blessing Card"
          className="absolute top-4 right-4 p-2 rounded-full bg-[#510e35] text-[#ffd8e7] hover:text-[#ffb689] transition-all cursor-pointer z-20"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Auspicious Announce Banner */}
        <div className="text-center flex flex-col items-center">
          <div className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full bg-[#510e35] text-[#3ae441] text-xs font-bold uppercase tracking-wider mb-2 border border-[#fe8932]/25 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#3ae441]" />
            <span>Special Diwali Blessing Received</span>
            <Sparkles className="w-3.5 h-3.5 text-[#3ae441]" />
          </div>
          <h2 className="font-headline text-2xl sm:text-3xl font-bold text-[#ffd8e7]">
            A Personal Greeting For You
          </h2>
          <p className="text-xs sm:text-sm text-[#ddc1b1] mt-1">
            Sent with heartfelt wishes and auspicious light by <span className="text-[#fe8932] font-semibold">{from}</span>
          </p>
        </div>

        {/* Personalized Festive Card Display */}
        <div className={`w-full relative rounded-2xl p-6 sm:p-8 overflow-hidden shadow-2xl border ${getThemeContainerStyle()}`}>
          {/* Filigree motifs */}
          <div className="absolute top-3 left-3 text-[#fe8932]/50 text-xl font-serif select-none">❖</div>
          <div className="absolute top-3 right-3 text-[#fe8932]/50 text-xl font-serif select-none">❖</div>
          <div className="absolute bottom-3 left-3 text-[#fe8932]/50 text-xl font-serif select-none">❖</div>
          <div className="absolute bottom-3 right-3 text-[#fe8932]/50 text-xl font-serif select-none">❖</div>

          <div className="relative z-10 flex flex-col items-center text-center">
            {/* Centerpiece Image Artwork */}
            <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-2xl overflow-hidden border-2 border-[#fe8932]/50 shadow-[0_0_25px_rgba(254,137,50,0.5)] mb-3 relative">
              <img
                alt="Diwali Auspicious Lamp Centerpiece"
                className="w-full h-full object-cover"
                src="/src/assets/images/diwali_card_centerpiece_1794023815545.jpg"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#250015]/40 via-transparent to-transparent pointer-events-none" />
            </div>

            <span className="text-[11px] text-[#3ae441] font-bold uppercase tracking-widest mb-1">
              Shubh Deepavali Blessings
            </span>

            <h3 className={`font-headline text-2xl sm:text-3xl font-bold tracking-wide mb-3 ${getThemeTextColor()}`}>
              Dearest {to},
            </h3>

            <div className="max-w-md w-full px-5 py-3.5 rounded-xl bg-[#250015]/80 border border-[#fe8932]/25 backdrop-blur-sm mb-4 shadow-inner">
              <p className="font-headline italic text-base sm:text-lg text-[#ffd8e7] leading-relaxed">
                "{message}"
              </p>
            </div>

            <div className="flex flex-col items-center">
              <span className="text-[10px] text-[#ddc1b1] font-semibold uppercase tracking-wider">
                With Loving Prayers,
              </span>
              <span className="font-headline text-lg sm:text-xl font-bold text-[#fe8932] mt-0.5">
                {from}
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
          <button
            type="button"
            onClick={() => {
              playDiyaChime();
              onLightDiyaInReturn();
            }}
            className="w-full py-3 px-3 rounded-full bg-gradient-to-r from-[#ba0225] via-[#fe8932] to-[#ba0225] hover:opacity-95 text-[#311300] font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-1.5 active:scale-95 cursor-pointer"
          >
            <Flame className="w-4 h-4 text-[#ffd8e7]" />
            <span>Light Diya in Return</span>
          </button>

          <button
            type="button"
            onClick={handleDownloadCard}
            className="w-full py-3 px-3 rounded-full bg-[#510e35] hover:bg-[#641f45] text-[#ffd8e7] hover:text-[#ffb689] border border-[#fe8932]/30 font-semibold text-xs sm:text-sm transition-all flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Download Card</span>
          </button>

          <button
            type="button"
            onClick={() => {
              playKeyClickSound();
              onReply(from, to);
              onClose();
            }}
            className="w-full py-3 px-3 rounded-full bg-[#00530a] hover:bg-[#00700d] text-[#74ff6c] border border-[#3ae441]/40 font-semibold text-xs sm:text-sm transition-all flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <Send className="w-4 h-4" />
            <span>Send Blessing Back</span>
          </button>
        </div>
      </div>
    </div>
  );
};
