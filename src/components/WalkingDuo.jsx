import React, { useState, useEffect, useRef } from 'react';
import { sound } from './AudioController';

// ROUTINE TIMELINE:
// 1. walk_right: Jalan pelan ke kanan (8s)
// 2. pet_cat: Berhenti & mengelus kucing kesayangan (4s)
// 3. walk_further: Lanjut jalan pelan sedikit ke kanan (4s)
// 4. listen_music: Berhenti santai mendengarkan musik di headphone (4s)
// 5. walk_left: Berbalik dan jalan pelan ke kiri (8s)
// 6. wave_greet: Berhenti menyapa melambaikan tangan (3s)

const ROUTINES = [
  { type: 'walk', targetX: 65, duration: 8000, facing: 1, label: 'Jalan pelan' },
  { type: 'pet_cat', targetX: 65, duration: 4500, facing: 1, bubble: 'Sayang anabul ❤️' },
  { type: 'walk', targetX: 82, duration: 4000, facing: 1, label: 'Lanjut jalan' },
  { type: 'listen_music', targetX: 82, duration: 4500, facing: 1, bubble: 'Listening to lo-fi beats 🎧' },
  { type: 'walk', targetX: 18, duration: 9000, facing: -1, label: 'Jalan balik' },
  { type: 'wave_greet', targetX: 18, duration: 4000, facing: 1, bubble: 'Hai! Senang bertemu! 👋✨' },
];

export default function WalkingDuo({ isDarkMode }) {
  const [routineIndex, setRoutineIndex] = useState(0);
  const [posX, setPosX] = useState(15); // Percentage across navbar (0% to 85%)
  const [facing, setFacing] = useState(1); // 1 = right, -1 = left
  const [currentAction, setCurrentAction] = useState('walk');
  const [speechBubble, setSpeechBubble] = useState('');
  const [isJumping, setIsJumping] = useState(false);
  const [catJumping, setCatJumping] = useState(false);
  const timeoutRef = useRef(null);

  const CLICK_RESPONSES = [
    'Hup! 🐾',
    'Semangat koding! 💻✨',
    'Meoww~ ❤️',
    'Halo! Senang kamu mampir 👋'
  ];
  const clickCountRef = useRef(0);

  // Behavioral Routine Loop
  useEffect(() => {
    const step = ROUTINES[routineIndex];
    setCurrentAction(step.type);
    setFacing(step.facing);
    setSpeechBubble(step.bubble || '');

    // Update position smoothly
    if (step.type === 'walk') {
      setPosX(step.targetX);
    }

    timeoutRef.current = setTimeout(() => {
      setRoutineIndex((prev) => (prev + 1) % ROUTINES.length);
    }, step.duration);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [routineIndex]);

  // Click Interaction: Natural joyful hop together with fun dialog
  const handleClick = (e) => {
    e.stopPropagation();
    sound.play('space');

    setIsJumping(true);
    setTimeout(() => setCatJumping(true), 80);
    setTimeout(() => setIsJumping(false), 400);
    setTimeout(() => setCatJumping(false), 480);

    const reply = CLICK_RESPONSES[clickCountRef.current % CLICK_RESPONSES.length];
    clickCountRef.current += 1;
    setSpeechBubble(reply);

    setTimeout(() => {
      // Revert to current routine bubble if present, or clear
      const currentStep = ROUTINES[routineIndex];
      setSpeechBubble(currentStep.bubble || '');
    }, 2200);
  };

  // Determine Sprite for Egy
  const getEgySprite = () => {
    if (currentAction === 'pet_cat') return '/assets/images/egy_pet_cat.gif';
    if (currentAction === 'listen_music') return '/assets/images/egy_idle_music.gif';
    if (currentAction === 'wave_greet') return '/assets/images/egy_wave_front.gif';
    return '/assets/images/egy_walk.gif';
  };

  // Determine Sprite for Cat
  const getCatSprite = () => {
    if (currentAction === 'pet_cat') return '/assets/images/cat_purr.gif';
    if (currentAction === 'listen_music' || currentAction === 'wave_greet') return '/assets/images/cat_sit.gif';
    return '/assets/images/cat_walk.gif';
  };

  // Cat follows behind Egy based on facing direction
  // When facing right (1), cat is to the left (-26px)
  // When facing left (-1), cat is to the right (+26px)
  const catOffset = facing === 1 ? -26 : 26;

  // Move duration for smooth CSS transition
  const transitionSpeed = currentAction === 'walk' ? '7.5s' : '0.4s';

  return (
    <div 
      onClick={handleClick}
      title="Klik untuk melompat bersama!"
      className="relative w-full h-12 pointer-events-auto cursor-pointer select-none overflow-visible -mb-1 z-20"
    >
      {/* 1. EGY CHARACTER (Leads the stroll) */}
      <div 
        style={{ 
          left: `${posX}%`,
          transition: `left ${transitionSpeed} linear`
        }}
        className="absolute bottom-0 -translate-x-1/2 flex flex-col items-center z-20"
      >
        {/* Speech Bubble - Strictly locked directly above Egy's head & NEVER inverted */}
        {speechBubble && (
          <div 
            style={{ 
              transform: 'none',
              direction: 'ltr',
              unicodeBidi: 'isolate'
            }}
            className="absolute -top-9 left-1/2 -translate-x-1/2 z-30 pointer-events-none flex flex-col items-center"
          >
            <div className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono shadow-xl whitespace-nowrap animate-bounce border ${
              isDarkMode 
                ? 'bg-cosmos-950/95 border-indigo-500/50 text-indigo-300 shadow-indigo-950/80' 
                : 'bg-white/95 border-slate-300 text-slate-800 shadow-md'
            }`}>
              <span className="inline-block select-none">{speechBubble}</span>
            </div>
            {/* Cute Speech Bubble Tail pointing straight to Egy's head */}
            <div className={`w-1.5 h-1.5 -mt-0.5 rotate-45 border-r border-b ${
              isDarkMode 
                ? 'bg-cosmos-950 border-indigo-500/50' 
                : 'bg-white border-slate-300'
            }`} />
          </div>
        )}

        {/* Egy Sprite (Only image gets scaled horizontally for direction, NEVER parent or bubble) */}
        <img
          src={getEgySprite()}
          alt="Egydia Pixel Character"
          style={{
            transform: `scaleX(${facing}) ${isJumping ? 'translateY(-14px)' : 'translateY(0)'}`,
            transition: 'transform 0.2s ease-out'
          }}
          className="h-11 w-auto [image-rendering:pixelated] drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)] hover:scale-105"
        />
      </div>

      {/* 2. TABBY CAT (Faithfully trailing behind Egy) */}
      <div 
        style={{ 
          left: `calc(${posX}% + ${catOffset}px)`,
          transition: `left ${transitionSpeed} linear`
        }}
        className="absolute bottom-0 -translate-x-1/2 flex flex-col items-center z-10"
      >
        <img
          src={getCatSprite()}
          alt="Tabby Cat Following"
          style={{
            transform: `scaleX(${facing}) ${catJumping ? 'translateY(-10px)' : 'translateY(0)'}`,
            transition: 'transform 0.2s ease-out'
          }}
          className="h-6 w-auto [image-rendering:pixelated] drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)] hover:scale-105"
        />
      </div>

    </div>
  );
}
