import React, { useState } from 'react';
import { sound } from './AudioController';

const MESSAGES = [
  "Meow! 🐾 Senang bertemu denganmu!",
  "Egydia & Anabul sedang jalan-jalan ✨",
  "Semangat ngoding & berkreasi! 💻",
  "Siap mewujudkan website impianmu! 🚀"
];

export default function WalkingDuo({ isDarkMode }) {
  const [bubbleText, setBubbleText] = useState('');
  const [showBubble, setShowBubble] = useState(false);
  const [jump, setJump] = useState(false);
  const [msgIdx, setMsgIdx] = useState(0);

  const handleClick = (e) => {
    e.stopPropagation();
    sound.play('space');
    setJump(true);
    setTimeout(() => setJump(false), 350);

    setBubbleText(MESSAGES[msgIdx % MESSAGES.length]);
    setMsgIdx(prev => prev + 1);
    setShowBubble(true);

    setTimeout(() => {
      setShowBubble(false);
    }, 3200);
  };

  return (
    <div className="relative w-full h-16 overflow-hidden pointer-events-none z-20 select-none">
      
      {/* Walking Track */}
      <div 
        onClick={handleClick}
        title="Klik Egydia & Kucing!"
        className={`absolute bottom-0 animate-walk-across pointer-events-auto cursor-pointer flex flex-col items-center transition-transform duration-200 ${
          jump ? '-translate-y-3' : ''
        }`}
      >
        {/* Interactive Speech Bubble */}
        {showBubble && (
          <div className={`mb-1 px-2.5 py-1 rounded-lg text-[10px] font-mono shadow-lg whitespace-nowrap animate-bounce border ${
            isDarkMode 
              ? 'bg-cosmos-950/95 border-indigo-500/40 text-indigo-300 shadow-indigo-950/80' 
              : 'bg-white border-slate-300 text-slate-800 shadow-md'
          }`}>
            <span>{bubbleText}</span>
          </div>
        )}

        {/* Seamless Transparent Sprite (Egydia with glasses + Tabby Cat) */}
        <img
          src="/assets/images/egydia_cat_walking_duo.gif"
          alt="Egydia & Tabby Cat Walking"
          className="h-14 w-auto [image-rendering:pixelated] drop-shadow-[0_4px_8px_rgba(0,0,0,0.4)]"
        />
      </div>

    </div>
  );
}
