import React, { useEffect, useState, useRef } from 'react';

export default function CustomCursor({ isDarkMode }) {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const dotRef = useRef(null);
  const ringRef = useRef(null);

  const mousePos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });

  useEffect(() => {
    // Only enable for devices with fine pointer (mouse), not touch screens
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
    if (isTouchDevice) return;

    setIsVisible(true);

    const handleMouseMove = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }
    };

    const handleMouseDown = () => setIsClicked(true);
    const handleMouseUp = () => setIsClicked(false);

    const handleMouseOver = (e) => {
      const target = e.target;
      if (
        target.closest('a') ||
        target.closest('button') ||
        target.closest('input') ||
        target.closest('textarea') ||
        target.closest('select') ||
        target.closest('[role="button"]') ||
        window.getComputedStyle(target).cursor === 'pointer'
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mouseover', handleMouseOver);

    // Smooth Lerp loop for trailing outer ring
    let animationFrameId;
    const render = () => {
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * 0.18;
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * 0.18;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0)`;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mouseover', handleMouseOver);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {/* Inner Pin-Point Starlight Dot */}
      <div
        ref={dotRef}
        className={`fixed top-0 left-0 -ml-1 -mt-1 w-2 h-2 rounded-full pointer-events-none transition-opacity duration-200 ${
          isDarkMode 
            ? 'bg-cyan-300 shadow-[0_0_8px_rgba(103,232,249,0.9)]' 
            : 'bg-indigo-600 shadow-[0_0_6px_rgba(79,70,229,0.8)]'
        }`}
      />

      {/* Outer Smooth Trailing Halo Ring */}
      <div
        ref={ringRef}
        style={{
          width: isHovered ? '48px' : isClicked ? '24px' : '34px',
          height: isHovered ? '48px' : isClicked ? '24px' : '34px',
          marginLeft: isHovered ? '-24px' : isClicked ? '-12px' : '-17px',
          marginTop: isHovered ? '-24px' : isClicked ? '-12px' : '-17px',
          transition: 'width 0.2s ease-out, height 0.2s ease-out, margin 0.2s ease-out, background-color 0.2s ease-out, border-color 0.2s ease-out',
        }}
        className={`fixed top-0 left-0 rounded-full pointer-events-none border ${
          isHovered
            ? isDarkMode
              ? 'border-cyan-400/80 bg-cyan-400/10 shadow-[0_0_16px_rgba(34,211,238,0.4)]'
              : 'border-indigo-600/80 bg-indigo-600/10 shadow-[0_0_12px_rgba(79,70,229,0.3)]'
            : isDarkMode
              ? 'border-indigo-400/40 bg-indigo-500/5'
              : 'border-slate-400/50 bg-slate-400/5'
        }`}
      />
    </div>
  );
}
