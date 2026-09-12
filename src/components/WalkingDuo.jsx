import React, { useState, useRef } from 'react';
import { sound } from './AudioController';

const CLICK_BUBBLES = [
  "Yaaay! 🐾",
  "Halo! 👋✨",
  "Meow! ❤️",
  "Semangat! 🚀"
];

export default function WalkingDuo({ isDarkMode }) {
  const [clickCount, setClickCount] = useState(0);
  const [egyJumping, setEgyJumping] = useState(false);
  const [catJumping, setCatJumping] = useState(false);
  const [bubbleText, setBubbleText] = useState('');
  const [showBubble, setShowBubble] = useState(false);
  const bubbleTimer = useRef(null);

  const handleClick = (e) => {
    e.stopPropagation();

    // Play retro chime
    sound.play('space');

    // Natural physical jump: Egy jumps first, Cat reacts with a natural 90ms delay!
    setEgyJumping(true);
    setTimeout(() => {
      setCatJumping(true);
    }, 90);

    setTimeout(() => setEgyJumping(false), 380);
    setTimeout(() => setCatJumping(false), 460);

    // Show cheerful reaction bubble without changing the character
    const text = CLICK_BUBBLES[clickCount % CLICK_BUBBLES.length];
    setClickCount(prev => prev + 1);
    setBubbleText(text);
    setShowBubble(true);

    if (bubbleTimer.current) {
      clearTimeout(bubbleTimer.current);
    }
    bubbleTimer.current = setTimeout(() => {
      setShowBubble(false);
    }, 1800);
  };

  return (
    <div 
      onClick={handleClick}
      title="Klik untuk melompat bersama!"
      className="relative w-full h-11 pointer-events-auto cursor-pointer select-none overflow-visible -mb-1 z-20"
    >
      
      {/* 1. EGY (Leads the stroll along navbar) */}
      <div className="absolute bottom-0 animate-walk-nav-egy flex flex-col items-center z-10">
        
        {/* Reaction Bubble */}
        {showBubble && (
          <div className={`absolute -top-7 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full text-[10px] font-mono shadow-lg whitespace-nowrap animate-bounce border ${
            isDarkMode 
              ? 'bg-cosmos-950/95 border-indigo-500/40 text-indigo-300 shadow-indigo-950/80' 
              : 'bg-white/95 border-slate-300 text-slate-800 shadow-md'
          }`}>
            <span>{bubbleText}</span>
          </div>
        )}

        {/* Egy Sprite (Consistent single character, smooth natural jump) */}
        <img
          src="/assets/images/egy_walk.gif"
          alt="Egydia Pixel Character"
          className={`h-11 w-auto [image-rendering:pixelated] drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)] transition-transform duration-200 ${
            egyJumping ? '-translate-y-4 scale-105' : 'hover:scale-105'
          }`}
        />
      </div>

      {/* 2. TABBY CAT (Faithfully follows behind Egy, natural delayed hop) */}
      <div className="absolute bottom-0 animate-follow-nav-cat flex flex-col items-center">
        <img
          src="/assets/images/cat_walk.gif"
          alt="Tabby Cat Following"
          className={`h-6 w-auto [image-rendering:pixelated] drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)] transition-transform duration-200 ${
            catJumping ? '-translate-y-3 scale-105' : 'hover:scale-105'
          }`}
        />
      </div>

    </div>
  );
}
