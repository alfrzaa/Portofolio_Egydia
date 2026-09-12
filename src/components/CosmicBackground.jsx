import React, { useEffect, useRef } from 'react';

export default function CosmicBackground({ isDarkMode }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Stars & meteors configuration
    const starCount = Math.floor((width * height) / 5000);
    const stars = [];

    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.5 + 0.3,
        alpha: Math.random() * 0.8 + 0.2,
        speed: Math.random() * 0.02 + 0.005,
        twinkleSpeed: Math.random() * 0.03 + 0.01,
        color: Math.random() > 0.8 ? '#a5b4fc' : Math.random() > 0.9 ? '#38bdf8' : '#ffffff'
      });
    }

    // Meteors (shooting stars)
    const meteors = [];
    let lastMeteorTime = Date.now();

    const spawnMeteor = () => {
      meteors.push({
        x: Math.random() * width + 200,
        y: Math.random() * (height * 0.4),
        length: Math.random() * 120 + 80,
        speed: Math.random() * 10 + 12,
        angle: Math.PI / 4 + (Math.random() * 0.1 - 0.05),
        alpha: 1,
        thickness: Math.random() * 1.8 + 1
      });
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      if (isDarkMode) {
        // Render Deep Space Background
        // Twinkling stars
        stars.forEach(star => {
          star.alpha += Math.sin(Date.now() * star.twinkleSpeed) * 0.015;
          const currentAlpha = Math.max(0.1, Math.min(1, star.alpha));

          // Draw subtle glow for bigger stars
          if (star.radius > 1.2) {
            ctx.beginPath();
            ctx.arc(star.x, star.y, star.radius * 2.5, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(165, 180, 252, ${currentAlpha * 0.25})`;
            ctx.fill();
          }

          ctx.beginPath();
          ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
          ctx.fillStyle = star.color;
          ctx.globalAlpha = currentAlpha;
          ctx.fill();
          ctx.globalAlpha = 1;

          // Slow drift
          star.y -= star.speed * 15;
          if (star.y < 0) {
            star.y = height;
            star.x = Math.random() * width;
          }
        });

        // Spawn meteor every 3 to 6 seconds
        if (Date.now() - lastMeteorTime > 4500 && Math.random() > 0.3) {
          spawnMeteor();
          lastMeteorTime = Date.now();
        }

        // Render meteors
        for (let i = meteors.length - 1; i >= 0; i--) {
          const m = meteors[i];
          const tailX = m.x - Math.cos(m.angle) * m.length;
          const tailY = m.y + Math.sin(m.angle) * m.length;

          const grad = ctx.createLinearGradient(m.x, m.y, tailX, tailY);
          grad.addColorStop(0, `rgba(255, 255, 255, ${m.alpha})`);
          grad.addColorStop(0.3, `rgba(99, 102, 241, ${m.alpha * 0.8})`);
          grad.addColorStop(1, 'rgba(99, 102, 241, 0)');

          ctx.beginPath();
          ctx.moveTo(m.x, m.y);
          ctx.lineTo(tailX, tailY);
          ctx.strokeStyle = grad;
          ctx.lineWidth = m.thickness;
          ctx.lineCap = 'round';
          ctx.stroke();

          m.x -= Math.cos(m.angle) * m.speed;
          m.y += Math.sin(m.angle) * m.speed;
          m.alpha -= 0.015;

          if (m.alpha <= 0 || m.x < -100 || m.y > height + 100) {
            meteors.splice(i, 1);
          }
        }
      } else {
        // Light Mode: Subtle floating ambient nodes / soft particles
        stars.slice(0, Math.floor(stars.length * 0.35)).forEach(p => {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius * 1.5, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(99, 102, 241, 0.12)';
          ctx.fill();

          p.y -= p.speed * 8;
          if (p.y < 0) p.y = height;
        });
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isDarkMode]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden transition-colors duration-700">
      {/* Dynamic Cosmic Gradient Blobs */}
      {isDarkMode ? (
        <>
          <div className="absolute top-[-10%] left-[15%] w-[600px] h-[600px] rounded-full bg-indigo-900/20 blur-[140px] animate-pulse-slow" />
          <div className="absolute top-[40%] right-[-5%] w-[650px] h-[650px] rounded-full bg-purple-900/20 blur-[160px] animate-pulse-slow" />
          <div className="absolute bottom-[-10%] left-[30%] w-[700px] h-[700px] rounded-full bg-blue-950/30 blur-[150px]" />
          <div className="absolute top-[25%] left-[50%] w-[350px] h-[350px] rounded-full bg-cyan-950/15 blur-[120px]" />
        </>
      ) : (
        <>
          <div className="absolute top-[-5%] left-[10%] w-[500px] h-[500px] rounded-full bg-indigo-200/40 blur-[120px]" />
          <div className="absolute top-[35%] right-[5%] w-[600px] h-[600px] rounded-full bg-violet-200/35 blur-[140px]" />
          <div className="absolute bottom-[10%] left-[20%] w-[550px] h-[550px] rounded-full bg-sky-100/60 blur-[130px]" />
        </>
      )}

      {/* HTML5 Canvas for twinkling space stars and shooting stars */}
      <canvas ref={canvasRef} className="absolute inset-0 block w-full h-full" />
    </div>
  );
}
