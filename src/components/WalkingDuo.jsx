import React, { useState, useRef } from 'react';
import { sound } from './AudioController';

const POSE_CONFIGS = {
  walk: {
    src: '/assets/images/duo_walk_calm.gif',
    bubble: null,
    sound: null,
    duration: 0
  },
  jump: {
    src: '/assets/images/duo_jump_front.gif',
    bubble: 'Yaaay! 🐾 Jump!',
    sound: 'space',
    duration: 2200
  },
  wave: {
    src: '/assets/images/duo_wave_front.gif',
    bubble: 'Halo dari Egydia & Anabul! 👋✨',
    sound: 'toggle',
    duration: 2500
  },
  cuddle: {
    src: '/assets/images/egydia_cat_cuddle.gif',
    bubble: 'Meow! 🐾 Sayang anabul kesayangan ❤️',
    sound: 'click',
    duration: 2500
  }
};

const CLICK_SEQUENCE = ['jump', 'wave', 'cuddle'];

export default function WalkingDuo({ isDarkMode }) {
  const [currentPose, setCurrentPose] = useState('walk');
  const [clickCount, setClickCount] = useState(0);
  const [showBubble, setShowBubble] = useState(false);
  const timerRef = useRef(null);

  const handleClick = (e) => {
    e.stopPropagation();

    // Determine next pose in sequence: 1x -> jump, 2x -> wave, 3x -> cuddle, etc.
    const nextPose = CLICK_SEQUENCE[clickCount % CLICK_SEQUENCE.length];
    const config = POSE_CONFIGS[nextPose];

    setClickCount(prev => prev + 1);
    setCurrentPose(nextPose);
    setShowBubble(true);

    if (config.sound) {
      sound.play(config.sound);
    }

    // Reset back to calm walking after the pose finishes
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = setTimeout(() => {
      setCurrentPose('walk');
      setShowBubble(false);
    }, config.duration);
  };

  const activeConfig = POSE_CONFIGS[currentPose] || POSE_CONFIGS.walk;

  return (
    <div className="fixed bottom-14 sm:bottom-16 left-0 right-0 h-14 pointer-events-none z-30 select-none overflow-hidden">
      
      {/* Walking Track directly above BottomNav */}
      <div 
        onClick={handleClick}
        title="Klik 1x Lompat, 2x Melambai, 3x Gendong Kucing!"
        className={`absolute bottom-0 ${currentPose === 'walk' ? 'animate-walk-across' : 'animate-walk-across [animation-play-state:paused]'} pointer-events-auto cursor-pointer flex flex-col items-center transition-all duration-300`}
      >
        {/* Interactive Speech Bubble */}
        {showBubble && activeConfig.bubble && (
          <div className={`mb-1 px-2.5 py-1 rounded-xl text-[10px] font-mono shadow-xl whitespace-nowrap animate-bounce border ${
            isDarkMode 
              ? 'bg-cosmos-950/95 border-indigo-500/40 text-indigo-300 shadow-indigo-950/80' 
              : 'bg-white/95 border-slate-300 text-slate-800 shadow-md'
          }`}>
            <span>{activeConfig.bubble}</span>
          </div>
        )}

        {/* Transparent Pixel Character Sprite (Egydia & Cat) */}
        <img
          src={activeConfig.src}
          alt={`Egydia & Tabby Cat - ${currentPose}`}
          className="h-14 w-auto [image-rendering:pixelated] drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)] transition-transform duration-200 hover:scale-110 active:scale-95"
        />
      </div>

    </div>
  );
}
