import React, { useEffect, useRef, useState } from 'react';

export default function CustomCursor({ isDarkMode }) {
  const canvasRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only activate for non-touch mouse devices
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
    if (isTouchDevice) return;

    setIsVisible(true);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    const mouse = { x: -100, y: -100, isHovered: false, isMoving: false };
    let lastMouse = { x: -100, y: -100 };
    let lastMoveTime = Date.now();
    let starRotation = 0;

    const particles = [];

    const createSparkle = (x, y, isBurst = false) => {
      const colors = isDarkMode 
        ? ['#67e8f9', '#a5b4fc', '#e0e7ff', '#38bdf8', '#fef08a'] 
        : ['#6366f1', '#8b5cf6', '#a855f7', '#3b82f6', '#f59e0b'];

      const count = isBurst ? 8 : 1;
      for (let i = 0; i < count; i++) {
        const angle = isBurst ? (Math.PI * 2 * i) / count : Math.random() * Math.PI * 2;
        const speed = isBurst ? Math.random() * 2.5 + 1.5 : Math.random() * 0.8 + 0.2;

        particles.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - (isBurst ? 0 : 0.3), // gentle upward float
          size: isBurst ? Math.random() * 5 + 3 : Math.random() * 4 + 2,
          alpha: 1,
          decay: isBurst ? Math.random() * 0.03 + 0.02 : Math.random() * 0.025 + 0.015,
          rotation: Math.random() * Math.PI * 2,
          rotSpeed: (Math.random() - 0.5) * 0.1,
          color: colors[Math.floor(Math.random() * colors.length)]
        });
      }
    };

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.isMoving = true;
      lastMoveTime = Date.now();

      // Emit stardust trail particles as cursor travels
      const dist = Math.hypot(mouse.x - lastMouse.x, mouse.y - lastMouse.y);
      if (dist > 6) {
        createSparkle(mouse.x + (Math.random() - 0.5) * 6, mouse.y + (Math.random() - 0.5) * 6);
        lastMouse.x = mouse.x;
        lastMouse.y = mouse.y;
      }
    };

    const handleMouseDown = (e) => {
      createSparkle(e.clientX, e.clientY, true); // Star burst on click
    };

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
        mouse.isHovered = true;
      } else {
        mouse.isHovered = false;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseover', handleMouseOver);

    // Helper: Draw 4-point diamond star
    const drawStar = (x, y, radius, innerRadius, rotation, color, alpha, hasGlow = false) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);
      ctx.globalAlpha = alpha;

      if (hasGlow) {
        ctx.shadowColor = color;
        ctx.shadowBlur = 12;
      }

      ctx.fillStyle = color;
      ctx.beginPath();
      const points = 4;
      for (let i = 0; i < points * 2; i++) {
        const r = i % 2 === 0 ? radius : innerRadius;
        const a = (i * Math.PI) / points;
        const px = Math.cos(a) * r;
        const py = Math.sin(a) * r;
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    };

    // Animation Loop
    let animationFrameId;
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Check if mouse is idle
      if (Date.now() - lastMoveTime > 150) {
        mouse.isMoving = false;
      }

      // 1. Draw and update trailing stardust particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.rotation += p.rotSpeed;
        p.alpha -= p.decay;

        if (p.alpha <= 0) {
          particles.splice(i, 1);
          continue;
        }

        drawStar(p.x, p.y, p.size, p.size * 0.35, p.rotation, p.color, p.alpha, false);
      }

      // 2. Draw the Main Celestial Star Cursor at mouse position
      if (mouse.x > 0 && mouse.y > 0) {
        starRotation += mouse.isHovered ? 0.05 : 0.02;

        const starColor = isDarkMode ? '#67e8f9' : '#4f46e5';
        const innerColor = isDarkMode ? '#ffffff' : '#e0e7ff';
        const starSize = mouse.isHovered ? 14 : 9;

        // Outer sparkling radiant halo
        drawStar(
          mouse.x,
          mouse.y,
          starSize * 1.5,
          starSize * 0.35,
          starRotation + Math.PI / 4,
          isDarkMode ? '#818cf8' : '#7c3aed',
          mouse.isHovered ? 0.6 : 0.35,
          true
        );

        // Main 4-point star
        drawStar(
          mouse.x,
          mouse.y,
          starSize,
          starSize * 0.28,
          starRotation,
          starColor,
          0.95,
          true
        );

        // Core bright center point
        ctx.save();
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, starSize * 0.22, 0, Math.PI * 2);
        ctx.fillStyle = innerColor;
        ctx.shadowColor = innerColor;
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseover', handleMouseOver);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isDarkMode]);

  if (!isVisible) return null;

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-50 block w-full h-full"
    />
  );
}
