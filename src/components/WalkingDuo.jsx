import React, { useState, useRef } from 'react';
import { sound } from './AudioController';

const POSE_SEQUENCE = ['jump', 'wave', 'cuddle'];

export default function WalkingDuo({ isDarkMode }) {
  const [currentPose, setCurrentPose] = useState('walk');
  const [clickCount, setClickCount] = useState(0);
  const [showBubble, setShowBubble] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const timerRef = useRef(null);

  const handleClick = (e) => {
    e.stopPropagation();

    // 1x -> jump, 2x -> wave, 3x -> cuddle
    const nextPose = POSE_SEQUENCE[clickCount % POSE_SEQUENCE.length];
    setClickCount(prev => prev + 1);
    setCurrentPose(nextPose);
    setShowBubble(true);

    if (nextPose === 'jump') {
      sound.play('space');
    } else if (nextPose === 'wave') {
      sound.play('toggle');
    } else {
      sound.play('click');
    }

    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = setTimeout(() => {
      setCurrentPose('walk');
      setShowBubble(false);
    }, 2400);
  };

  const getBubbleText = () => {
    if (currentPose === 'jump') return 'Yaaay! 🐾 Jump!';
    if (currentPose === 'wave') return 'Halo dari Egydia & Kucing! 👋✨';
    if (currentPose === 'cuddle') return 'Meow! 🐾 Sayang anabul ❤️';
    return null;
  };

  return (
    <div className="fixed bottom-14 sm:bottom-16 left-0 right-0 h-16 pointer-events-none z-30 select-none overflow-hidden">
      
      {/* Clickable interactive container */}
      <div 
        onClick={handleClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        title="Klik 1x Lompat Depan, 2x Melambai, 3x Gendong Kucing!"
        className="w-full h-full relative"
      >
        
        {/* CASE A: CUDDLE POSE (Both united in arms) */}
        {currentPose === 'cuddle' ? (
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-auto cursor-pointer flex flex-col items-center">
            {showBubble && (
              <div className={`mb-1 px-2.5 py-1 rounded-xl text-[10px] font-mono shadow-xl whitespace-nowrap animate-bounce border ${
                isDarkMode 
                  ? 'bg-cosmos-950/95 border-indigo-500/40 text-indigo-300 shadow-indigo-950/80' 
                  : 'bg-white/95 border-slate-300 text-slate-800 shadow-md'
              }`}>
                <span>{getBubbleText()}</span>
              </div>
            )}
            <img
              src="/assets/images/egydia_cat_cuddle.gif"
              alt="Egydia Cuddling Cat"
              className="h-14 w-auto [image-rendering:pixelated] drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)] transition-transform hover:scale-110"
            />
          </div>
        ) : (
          /* CASE B: SEPARATE CHARACTERS (Cat follows behind Egy) */
          <>
            {/* 1. EGY (Leads the walk) */}
            <div 
              className={`absolute bottom-0 ${
                currentPose === 'walk'
                  ? 'animate-walk-egy' 
                  : 'animate-walk-egy [animation-play-state:paused]'
              } pointer-events-auto cursor-pointer flex flex-col items-center z-10`}
            >
              {/* Speech Bubble */}
              {showBubble && getBubbleText() && (
                <div className={`mb-1 px-2.5 py-1 rounded-xl text-[10px] font-mono shadow-xl whitespace-nowrap animate-bounce border ${
                  isDarkMode 
                    ? 'bg-cosmos-950/95 border-indigo-500/40 text-indigo-300 shadow-indigo-950/80' 
                    : 'bg-white/95 border-slate-300 text-slate-800 shadow-md'
                }`}>
                  <span>{getBubbleText()}</span>
                </div>
              )}

              {/* Egy Sprite */}
              <img
                src={
                  currentPose === 'jump'
                    ? '/assets/images/egy_jump_front.gif'
                    : currentPose === 'wave'
                      ? '/assets/images/egy_wave_front.gif'
                      : '/assets/images/egy_walk.gif'
                }
                alt="Egydia Pixel Art"
                className="h-14 w-auto [image-rendering:pixelated] drop-shadow-[0_4px_8px_rgba(0,0,0,0.4)] transition-transform hover:scale-110"
              />
            </div>

            {/* 2. CAT (Faithfully following behind Egy) */}
            <div 
              className={`absolute bottom-0 ${
                currentPose === 'walk'
                  ? 'animate-follow-cat' 
                  : 'animate-follow-cat [animation-play-state:paused]'
              } pointer-events-auto cursor-pointer flex flex-col items-center`}
            >
              {/* Cat Sprite */}
              <img
                src={
                  currentPose === 'jump'
                    ? '/assets/images/cat_jump.gif'
                    : isHovered || currentPose === 'wave'
                      ? '/assets/images/cat_sit.gif'
                      : '/assets/images/cat_walk.gif'
                }
                alt="Tabby Cat Following"
                className="h-9 w-auto [image-rendering:pixelated] drop-shadow-[0_4px_6px_rgba(0,0,0,0.3)] transition-transform hover:scale-110"
              />
            </div>
          </>
        )}

      </div>

    </div>
  );
}
