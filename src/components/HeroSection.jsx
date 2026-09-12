import React, { useState, useRef } from 'react';
import { 
  ArrowDown, 
  Terminal as TerminalIcon, 
  MessageCircle, 
  Award, 
  Sparkles, 
  CheckCircle2, 
  FolderGit2, 
  GraduationCap, 
  RotateCcw,
  ShieldCheck,
  QrCode,
  Layers,
  Cpu
} from 'lucide-react';
import { sound } from './AudioController';
import { PERSONAL_INFO, QUICK_STATS } from '../data/portfolioData';

export default function HeroSection({ isDarkMode, onOpenTerminal }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const cardRef = useRef(null);
  const [tiltStyle, setTiltStyle] = useState({});

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -12;
    const rotateY = ((x - centerX) / centerX) * 12;

    setTiltStyle({
      transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`,
      transition: 'transform 0.1s ease-out'
    });
  };

  const handleMouseLeave = () => {
    setTiltStyle({
      transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
      transition: 'transform 0.5s ease-out'
    });
  };

  const handleFlipCard = () => {
    setIsFlipped(!isFlipped);
    sound.play('click');
  };

  return (
    <section id="hero" className="relative min-h-screen pt-32 pb-20 flex items-center overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Introductions & CTAs */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            
            {/* Pill Tag */}
            <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide border mb-6 transition-all ${
              isDarkMode 
                ? 'bg-indigo-950/60 border-indigo-500/30 text-indigo-300 shadow-lg shadow-indigo-950/50' 
                : 'bg-indigo-50 border-indigo-200 text-indigo-700 shadow-sm'
            }`}>
              <Sparkles className="w-3.5 h-3.5 text-indigo-400 animate-spin-slow" />
              <span>Bridging Figma Precision with Clean Frontend Engineering</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight leading-[1.15] mb-6">
              <span className={isDarkMode ? 'text-white' : 'text-slate-900'}>
                Crafting{' '}
              </span>
              <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-400 bg-clip-text text-transparent">
                Pixel-Perfect
              </span>
              <br />
              <span className={isDarkMode ? 'text-slate-100' : 'text-slate-800'}>
                Digital Experiences
              </span>
              <span className="text-cyan-400 font-mono">.</span>
            </h1>

            {/* Description */}
            <p className={`text-base sm:text-lg leading-relaxed mb-8 max-w-2xl ${
              isDarkMode ? 'text-slate-300' : 'text-slate-600'
            }`}>
              Halo! Saya <strong className={isDarkMode ? 'text-white' : 'text-slate-900'}>{PERSONAL_INFO.name}</strong> — Lulusan Sistem Informasi <em className="text-indigo-400 font-semibold">{PERSONAL_INFO.honors} (IPK {PERSONAL_INFO.gpa})</em> {PERSONAL_INFO.university}. Berfokus pada <strong className={isDarkMode ? 'text-cyan-300' : 'text-indigo-600'}>Frontend Web Development</strong> (React.js, Tailwind CSS, Modern JS) dan <strong className={isDarkMode ? 'text-purple-300' : 'text-purple-600'}>UI/UX Design</strong> (User Research, Prototyping Figma, Design Systems).
            </p>

            {/* CTA Group */}
            <div className="flex flex-wrap items-center gap-3.5 mb-12">
              
              <a
                href="#projects"
                onClick={() => sound.play('click')}
                className={`inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl font-semibold text-sm transition-all duration-300 shadow-xl ${
                  isDarkMode
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-500 hover:to-purple-500 shadow-indigo-600/30 hover:scale-[1.02]'
                    : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-indigo-600/20 hover:scale-[1.02]'
                }`}
              >
                <span>Jelajahi 6 Proyek</span>
                <ArrowDown className="w-4 h-4 animate-bounce" />
              </a>

              <button
                onClick={() => {
                  sound.play('toggle');
                  onOpenTerminal();
                }}
                className={`inline-flex items-center gap-2 px-5 py-3.5 rounded-xl font-semibold text-sm border transition-all ${
                  isDarkMode
                    ? 'bg-cosmos-900/80 border-indigo-900/60 text-indigo-200 hover:bg-indigo-950 hover:border-indigo-500'
                    : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-50'
                }`}
              >
                <TerminalIcon className="w-4 h-4 text-cyan-400" />
                <span>Buka Terminal CLI</span>
              </button>

              <a
                href={PERSONAL_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sound.play('click')}
                className={`inline-flex items-center gap-2 px-5 py-3.5 rounded-xl font-semibold text-sm transition-all ${
                  isDarkMode
                    ? 'bg-emerald-950/50 border border-emerald-500/40 text-emerald-300 hover:bg-emerald-900/50'
                    : 'bg-emerald-50 border border-emerald-300 text-emerald-700 hover:bg-emerald-100'
                }`}
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>Hubungi Saya</span>
              </a>

            </div>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full max-w-2xl">
              {QUICK_STATS.map((stat, i) => (
                <div
                  key={i}
                  className={`p-3.5 rounded-xl border transition-all ${
                    isDarkMode
                      ? 'bg-cosmos-900/50 border-indigo-950/80 hover:border-indigo-500/30'
                      : 'bg-slate-50/80 border-slate-200 hover:border-indigo-200'
                  }`}
                >
                  <div className="font-display font-extrabold text-2xl bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
                    {stat.value}
                  </div>
                  <div className={`font-semibold text-xs mt-0.5 ${isDarkMode ? 'text-slate-200' : 'text-slate-800'}`}>
                    {stat.label}
                  </div>
                  <div className={`text-[10px] mt-0.5 ${isDarkMode ? 'text-indigo-300/70' : 'text-slate-500'}`}>
                    {stat.sub}
                  </div>
                </div>
              ))}
            </div>

          </div>

          {/* Right Column: 3D Tilt Holographic ID Card */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center">
            
            <div 
              ref={cardRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              onClick={handleFlipCard}
              style={tiltStyle}
              className="relative w-full max-w-[340px] sm:max-w-[360px] cursor-pointer select-none group"
            >
              
              {/* Outer Cosmic Glow Border */}
              <div className={`absolute -inset-1 rounded-3xl blur-xl opacity-60 transition duration-500 group-hover:opacity-100 ${
                isDarkMode 
                  ? 'bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-400' 
                  : 'bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300'
              }`} />

              {/* Card Main Body */}
              <div className={`relative rounded-2xl border p-6 overflow-hidden transition-colors duration-300 ${
                isDarkMode 
                  ? 'bg-cosmos-900/95 border-indigo-500/30 shadow-2xl text-white' 
                  : 'bg-white/95 border-slate-200 shadow-xl text-slate-900'
              }`}>
                
                {/* Holographic Shimmer Effect */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

                {!isFlipped ? (
                  /* FRONT FACE */
                  <div className="flex flex-col gap-4">
                    
                    {/* Card Header Bar */}
                    <div className="flex justify-between items-center border-b pb-3 border-indigo-900/20">
                      <div className="flex items-center gap-2">
                        <Cpu className="w-4 h-4 text-indigo-400" />
                        <span className="font-mono text-xs font-bold tracking-widest text-indigo-400">CREATIVE PASS</span>
                      </div>
                      <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-[10px] font-semibold text-emerald-400">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                        <span>VERIFIED DEV</span>
                      </div>
                    </div>

                    {/* Photo Container */}
                    <div className="relative w-full h-56 rounded-xl overflow-hidden border border-indigo-900/30 group-hover:border-indigo-500/50 transition-colors">
                      <img 
                        src={PERSONAL_INFO.avatarGraduation} 
                        alt={PERSONAL_INFO.name} 
                        className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                      
                      {/* Honors Ribbon */}
                      <div className="absolute bottom-3 left-3 right-3 flex justify-between items-center bg-indigo-950/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-indigo-500/30 text-xs">
                        <div className="flex items-center gap-1.5 text-amber-300 font-bold">
                          <Award className="w-3.5 h-3.5" />
                          <span>CUM LAUDE · 3.94</span>
                        </div>
                        <span className="text-[10px] font-mono text-indigo-300">S.Kom. 2026</span>
                      </div>
                    </div>

                    {/* Meta Info */}
                    <div>
                      <h3 className="font-display font-bold text-xl tracking-tight">
                        Egydia Alfariza R.
                      </h3>
                      <div className="flex flex-wrap gap-2 mt-2">
                        <span className={`px-2.5 py-1 rounded-md text-[11px] font-mono font-medium border ${
                          isDarkMode ? 'bg-indigo-950/80 border-indigo-800/40 text-indigo-300' : 'bg-indigo-50 border-indigo-200 text-indigo-700'
                        }`}>
                          💻 Frontend Developer
                        </span>
                        <span className={`px-2.5 py-1 rounded-md text-[11px] font-mono font-medium border ${
                          isDarkMode ? 'bg-purple-950/80 border-purple-800/40 text-purple-300' : 'bg-purple-50 border-purple-200 text-purple-700'
                        }`}>
                          🎨 UI/UX Designer
                        </span>
                      </div>
                      <p className={`text-xs mt-2.5 flex items-center gap-1.5 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                        <GraduationCap className="w-3.5 h-3.5 text-indigo-400" />
                        <span>Universitas Jambi · Sistem Informasi</span>
                      </p>
                    </div>

                    {/* Footer Strip with Barcode and QR */}
                    <div className="pt-3 border-t border-indigo-900/20 flex justify-between items-center text-xs">
                      <div>
                        <div className="font-mono text-[10px] tracking-wider opacity-60">ID // UNJA-SI-2026</div>
                        <div className="font-mono font-bold text-[11px] text-cyan-400">#ANTIMAINSTREAM</div>
                      </div>
                      <div className="p-1.5 rounded-lg border border-indigo-500/30 bg-indigo-500/10">
                        <QrCode className="w-5 h-5 text-indigo-400" />
                      </div>
                    </div>

                  </div>
                ) : (
                  /* BACK FACE */
                  <div className="flex flex-col gap-4 min-h-[380px] justify-between">
                    <div>
                      <div className="flex justify-between items-center border-b pb-2 border-indigo-900/20">
                        <span className="font-mono text-xs font-bold tracking-wider text-indigo-400">
                          SECURITY & CREDENTIALS
                        </span>
                        <button className="text-xs p-1 text-slate-400 hover:text-white">
                          <RotateCcw className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Barcode Strip */}
                      <div className="mt-4 p-3 rounded-lg border border-dashed border-indigo-500/30 bg-indigo-950/20 text-center font-mono text-xs">
                        <div className="h-6 flex items-center justify-center tracking-[0.35em] text-sm opacity-80 font-bold">
                          ||| | |||| || ||| |||| |
                        </div>
                        <span className="text-[10px] text-slate-400">0822-2737-6330 // alfrzaa</span>
                      </div>

                      {/* Credentials List */}
                      <div className="mt-4 space-y-2.5">
                        <div className="p-2.5 rounded-lg border border-indigo-500/20 bg-indigo-950/30 flex items-start gap-2.5 text-xs">
                          <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                          <div>
                            <div className="font-semibold text-slate-200">BNSP Keamanan Siber Muda</div>
                            <div className="text-[11px] text-slate-400">Certified Junior Cyber Security</div>
                          </div>
                        </div>

                        <div className="p-2.5 rounded-lg border border-amber-500/20 bg-amber-950/20 flex items-start gap-2.5 text-xs">
                          <Award className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                          <div>
                            <div className="font-semibold text-slate-200">Best Group MSIB Batch 7</div>
                            <div className="text-[11px] text-slate-400">PT Rakamin Kolektif Madani (TripIn)</div>
                          </div>
                        </div>

                        <div className="p-2.5 rounded-lg border border-indigo-500/20 bg-indigo-950/30 flex items-start gap-2.5 text-xs">
                          <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                          <div>
                            <div className="font-semibold text-slate-200">Google Analytics Certified</div>
                            <div className="text-[11px] text-slate-400">Data & User Behavior Tracking</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Authorized Signature */}
                    <div className="pt-3 border-t border-indigo-900/20 flex justify-between items-end">
                      <div>
                        <div className="font-display font-medium italic text-indigo-300">Egydia Alfariza R.</div>
                        <div className="text-[10px] text-slate-500 font-mono">Authorized Signature</div>
                      </div>
                      <div className="text-[10px] text-cyan-400 font-mono">
                        VERIFIED 2026
                      </div>
                    </div>

                  </div>
                )}

              </div>
            </div>

            {/* Hint below Card */}
            <div className={`mt-4 text-xs flex items-center gap-1.5 ${isDarkMode ? 'text-indigo-300/60' : 'text-slate-400'}`}>
              <RotateCcw className="w-3 h-3" />
              <span>Klik kartu untuk membalik · Gerakkan kursor untuk efek 3D Tilt</span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
