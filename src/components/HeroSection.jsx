import React, { useState, useRef } from 'react';
import { 
  ArrowDown, 
  Terminal as TerminalIcon, 
  MessageCircle, 
  Award, 
  MapPin, 
  GraduationCap, 
  RotateCcw,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  Github,
  Linkedin,
  Mail,
  Code2,
  Figma
} from 'lucide-react';
import { sound } from './AudioController';
import { PERSONAL_INFO, QUICK_STATS } from '../data/portfolioData';

export default function HeroSection({ isDarkMode, onOpenTerminal }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [cardMode, setCardMode] = useState('photo'); // 'photo' | 'pixel'
  const [pixelAction, setPixelAction] = useState('cuddle'); // 'cuddle' | 'walk' | 'run' | 'wave'
  const cardRef = useRef(null);
  const [tiltStyle, setTiltStyle] = useState({});

  // 3D Perspective Tilt Effect
  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;

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
    <section id="hero" className="relative min-h-[90vh] pt-28 sm:pt-36 pb-24 flex items-center overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Natural, human, and well-structured introduction */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            
            {/* Status Pill */}
            <div className={`inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full text-xs font-medium border mb-5 transition-all ${
              isDarkMode 
                ? 'bg-indigo-950/60 border-indigo-500/30 text-indigo-300' 
                : 'bg-indigo-50 border-indigo-200 text-indigo-700'
            }`}>
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-indigo-400" />
                <span>Jambi, Indonesia · Terbuka untuk Full-time & Freelance</span>
              </span>
            </div>

            {/* Main Greeting & Role */}
            <div className="mb-6">
              <span className="text-sm sm:text-base font-medium text-indigo-400 block mb-2">
                Halo, saya
              </span>
              
              <h1 className="font-display font-extrabold text-3xl sm:text-5xl lg:text-6xl tracking-tight leading-[1.15] mb-3">
                <span className={isDarkMode ? 'text-white' : 'text-slate-900'}>
                  {PERSONAL_INFO.name}
                </span>
                <span className="text-indigo-400 font-sans text-2xl sm:text-3xl lg:text-4xl font-semibold ml-1.5">
                  , {PERSONAL_INFO.degree}
                </span>
              </h1>

              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                Frontend Web Developer & UI/UX Designer
              </h2>
            </div>

            {/* Well-structured, readable paragraphs (avoiding dense AI-bracket lists) */}
            <div className={`space-y-3.5 text-sm sm:text-base leading-relaxed mb-8 max-w-2xl ${
              isDarkMode ? 'text-slate-300' : 'text-slate-600'
            }`}>
              <p>
                Saya lulusan Sistem Informasi dengan predikat <strong className={isDarkMode ? 'text-amber-300' : 'text-indigo-700'}>Cum Laude (IPK 3.94)</strong> dari Universitas Jambi.
              </p>
              <p>
                Fokus utama saya adalah merancang antarmuka produk digital di <strong>Figma</strong> yang berorientasi pada kemudahan pengguna nyata, lalu mengembangkannya menjadi aplikasi web modern yang cepat, rapi, dan responsif menggunakan <strong>React.js</strong> dan <strong>Tailwind CSS</strong>.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 mb-10">
              <a
                href="#projects"
                onClick={() => sound.play('click')}
                className={`inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl font-semibold text-sm transition-all duration-300 shadow-xl ${
                  isDarkMode
                    ? 'bg-indigo-600 text-white hover:bg-indigo-500 shadow-indigo-600/30 hover:scale-[1.02]'
                    : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-indigo-600/20 hover:scale-[1.02]'
                }`}
              >
                <span>Lihat Proyek Saya</span>
                <ArrowDown className="w-4 h-4" />
              </a>

              <a
                href={PERSONAL_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sound.play('click')}
                className={`inline-flex items-center gap-2 px-5 py-3.5 rounded-xl font-semibold text-sm transition-all border ${
                  isDarkMode
                    ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300 hover:bg-emerald-900/40'
                    : 'bg-emerald-50 border-emerald-300 text-emerald-700 hover:bg-emerald-100'
                }`}
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>Hubungi via WhatsApp</span>
              </a>

              <button
                onClick={() => {
                  sound.play('toggle');
                  onOpenTerminal();
                }}
                className={`inline-flex items-center gap-2 px-4 py-3.5 rounded-xl font-semibold text-sm border transition-all ${
                  isDarkMode
                    ? 'bg-cosmos-900/80 border-indigo-900/50 text-indigo-300 hover:bg-indigo-950 hover:border-indigo-500'
                    : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-50'
                }`}
                title="Buka Terminal CLI"
              >
                <TerminalIcon className="w-4 h-4 text-cyan-400" />
                <span>CLI Terminal</span>
              </button>
            </div>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full max-w-2xl">
              {QUICK_STATS.map((stat, i) => (
                <div
                  key={i}
                  className={`p-3.5 rounded-xl border transition-all ${
                    isDarkMode
                      ? 'bg-cosmos-900/50 border-indigo-950 hover:border-indigo-500/30'
                      : 'bg-white border-slate-200 hover:border-indigo-200 shadow-sm'
                  }`}
                >
                  <div className="font-display font-extrabold text-2xl text-indigo-400">
                    {stat.value}
                  </div>
                  <div className={`font-semibold text-xs mt-0.5 ${isDarkMode ? 'text-slate-200' : 'text-slate-800'}`}>
                    {stat.label}
                  </div>
                  <div className={`text-[10px] mt-0.5 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                    {stat.sub}
                  </div>
                </div>
              ))}
            </div>

          </div>

          {/* Right Column: 3D Interactive Tilt & Flip Card */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center">
            
            <div
              ref={cardRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              onClick={handleFlipCard}
              style={tiltStyle}
              className="relative w-full max-w-[340px] sm:max-w-[370px] cursor-pointer select-none group"
            >
              {/* Outer Cosmic Glow */}
              <div className={`absolute -inset-1 rounded-3xl blur-xl opacity-50 transition duration-500 group-hover:opacity-90 ${
                isDarkMode 
                  ? 'bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-400' 
                  : 'bg-gradient-to-r from-indigo-200 via-purple-200 to-sky-200'
              }`} />

              {/* Card Container */}
              <div className={`relative rounded-2xl border p-5 overflow-hidden transition-all duration-300 ${
                isDarkMode 
                  ? 'bg-cosmos-900/95 border-indigo-500/30 text-white shadow-2xl' 
                  : 'bg-white/95 border-slate-200 text-slate-900 shadow-xl'
              }`}>

                {!isFlipped ? (
                  /* FRONT FACE: Clean Graduation Portrait & Verified Badges */
                  <div className="flex flex-col gap-4">
                    
                    {/* Top Status Bar with Photo / Pixel Art Switcher */}
                    <div className="flex items-center justify-between border-b pb-3 border-indigo-900/20">
                      <div className="flex items-center gap-2">
                        <GraduationCap className="w-4 h-4 text-indigo-400" />
                        <span className="font-mono text-xs font-bold text-indigo-400">UNIVERSITAS JAMBI</span>
                      </div>
                      
                      {/* Mode Toggle: Foto vs Pixel Art */}
                      <div 
                        onClick={(e) => e.stopPropagation()} 
                        className={`flex items-center gap-1 p-0.5 rounded-lg border text-[10px] font-semibold ${
                          isDarkMode ? 'bg-slate-950/80 border-indigo-900/50' : 'bg-slate-100 border-slate-300'
                        }`}
                      >
                        <button
                          type="button"
                          onClick={() => {
                            sound.play('click');
                            setCardMode('photo');
                          }}
                          className={`px-2 py-0.5 rounded transition-all ${
                            cardMode === 'photo' 
                              ? 'bg-indigo-600 text-white shadow-sm' 
                              : isDarkMode ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'
                          }`}
                        >
                          📷 Foto
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            sound.play('space');
                            setCardMode('pixel');
                          }}
                          className={`px-2 py-0.5 rounded transition-all ${
                            cardMode === 'pixel' 
                              ? 'bg-gradient-to-r from-amber-500 to-indigo-600 text-white shadow-sm' 
                              : isDarkMode ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'
                          }`}
                        >
                          👾 Pixel Art
                        </button>
                      </div>
                    </div>

                    {/* Photo / Pixel Art Display with natural framing */}
                    {cardMode === 'photo' ? (
                      <div className="relative w-full h-[320px] rounded-xl overflow-hidden bg-slate-900 border border-indigo-900/30">
                        <img 
                          src={PERSONAL_INFO.avatarOutdoor} 
                          alt={PERSONAL_INFO.name} 
                          className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                        
                        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white">
                          <span className="font-medium bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/10">
                            Sistem Informasi (S.Kom.)
                          </span>
                          <span className="text-amber-300 font-bold flex items-center gap-1">
                            <Award className="w-3.5 h-3.5" />
                            <span>Lulusan 2026</span>
                          </span>
                        </div>
                      </div>
                    ) : (
                      <div className="relative w-full h-[320px] rounded-xl overflow-hidden bg-[#070a14] border border-indigo-500/40 flex flex-col items-center justify-between p-3.5">
                        {/* Retro Arcade Grid Background */}
                        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:16px_16px] opacity-40" />
                        
                        {/* Top Badges */}
                        <div className="w-full flex items-center justify-between text-[10px] font-mono z-20">
                          <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center gap-1">
                            <Sparkles className="w-3 h-3 text-amber-400" />
                            <span>EGYDIA & CAT</span>
                          </span>
                          <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold">
                            LVL 99 COMPANION
                          </span>
                        </div>

                        {/* Animated Pixel Art Character with Cat */}
                        <div className="relative z-10 flex items-center justify-center my-auto">
                          <img 
                            src={`/assets/images/egydia_cat_${pixelAction}.gif`} 
                            alt={`Egydia & Cat - ${pixelAction}`} 
                            className="w-56 h-auto [image-rendering:pixelated] drop-shadow-[0_8px_20px_rgba(99,102,241,0.6)] transition-transform duration-300 group-hover:scale-105"
                          />
                        </div>

                        {/* Motion Buttons & Stats */}
                        <div className="w-full z-20 flex flex-col gap-1.5">
                          {/* Motion Action Tabs */}
                          <div 
                            onClick={(e) => e.stopPropagation()}
                            className="grid grid-cols-4 gap-1 p-1 rounded-lg bg-black/60 backdrop-blur-md border border-indigo-500/30 text-[10px] font-mono"
                          >
                            {[
                              { id: 'cuddle', label: '🐱 Gendong' },
                              { id: 'walk', label: '🚶 Jalan' },
                              { id: 'run', label: '🏃 Lari' },
                              { id: 'wave', label: '👋 Lambai' },
                            ].map((act) => (
                              <button
                                key={act.id}
                                type="button"
                                onClick={() => {
                                  sound.play('space');
                                  setPixelAction(act.id);
                                }}
                                className={`py-1 rounded text-center transition-all ${
                                  pixelAction === act.id
                                    ? 'bg-indigo-600 text-white font-bold shadow-sm'
                                    : 'text-slate-400 hover:text-white hover:bg-white/10'
                                }`}
                              >
                                {act.label}
                              </button>
                            ))}
                          </div>

                          {/* Retro Game Stats Bar */}
                          <div className="flex items-center justify-between text-[10px] font-mono text-white/90 bg-black/80 backdrop-blur-md px-3 py-1 rounded-lg border border-indigo-500/30">
                            <span className="text-emerald-400 font-bold">HP: 100/100</span>
                            <span className="text-cyan-400 font-bold">CAT: HAPPY</span>
                            <span className="text-amber-400 font-bold">IPK: 3.94</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Info & Tech Stack */}
                    <div>
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-display font-bold text-lg">
                            {PERSONAL_INFO.name}
                          </h3>
                          <p className="text-xs text-indigo-400 font-medium mt-0.5">
                            Frontend Developer & UI/UX Designer
                          </p>
                        </div>
                        <div className="p-2 rounded-lg border border-indigo-500/30 bg-indigo-500/10 text-indigo-400">
                          <RotateCcw className="w-4 h-4" />
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {['React.js', 'Tailwind CSS', 'Figma UI/UX', 'JavaScript'].map((tech, i) => (
                          <span 
                            key={i}
                            className={`px-2 py-0.5 rounded text-[11px] font-mono border ${
                              isDarkMode ? 'bg-cosmos-950 border-indigo-950 text-indigo-300' : 'bg-slate-100 border-slate-200 text-slate-700'
                            }`}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                  </div>
                ) : (
                  /* BACK FACE: Credentials & Achievements */
                  <div className="flex flex-col justify-between min-h-[460px]">
                    <div>
                      <div className="flex items-center justify-between border-b pb-3 border-indigo-900/20 mb-4">
                        <span className="font-mono text-xs font-bold text-indigo-400 tracking-wider">
                          KREDENSIAL & PRESTASI
                        </span>
                        <div className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-300">
                          <RotateCcw className="w-4 h-4" />
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="p-3 rounded-xl border border-cyan-500/30 bg-cyan-950/20 text-xs">
                          <div className="flex items-center gap-2 font-semibold text-cyan-300 mb-1">
                            <ShieldCheck className="w-4 h-4 text-cyan-400" />
                            <span>BNSP Keamanan Siber Muda</span>
                          </div>
                          <p className="text-[11px] text-slate-300">
                            Sertifikasi profesi resmi dari Badan Nasional Sertifikasi Profesi (BNSP).
                          </p>
                        </div>

                        <div className="p-3 rounded-xl border border-amber-500/30 bg-amber-950/20 text-xs">
                          <div className="flex items-center gap-2 font-semibold text-amber-300 mb-1">
                            <Award className="w-4 h-4 text-amber-400" />
                            <span>Pemenang Best Group MSIB Batch 7</span>
                          </div>
                          <p className="text-[11px] text-slate-300">
                            Proyek aplikasi shuttle bus "TripIn" di PT Rakamin Kolektif Madani.
                          </p>
                        </div>

                        <div className="p-3 rounded-xl border border-indigo-500/30 bg-indigo-950/20 text-xs">
                          <div className="flex items-center gap-2 font-semibold text-indigo-300 mb-1">
                            <CheckCircle2 className="w-4 h-4 text-indigo-400" />
                            <span>1st Best Project RajaPharma</span>
                          </div>
                          <p className="text-[11px] text-slate-300">
                            Pharmacy Management & POS System dengan skor pengujian 91.67%.
                          </p>
                        </div>

                        <div className="p-3 rounded-xl border border-purple-500/30 bg-purple-950/20 text-xs">
                          <div className="flex items-center gap-2 font-semibold text-purple-300 mb-1">
                            <Sparkles className="w-4 h-4 text-purple-400" />
                            <span>SIMTA-UM SUS Score: 87.50</span>
                          </div>
                          <p className="text-[11px] text-slate-300">
                            Pengujian usability sistem tugas akhir dengan predikat Grade A.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-indigo-900/20 flex justify-between items-center text-xs text-slate-400">
                      <span className="font-mono text-[11px]">Egydia Alfariza Ramadhani</span>
                      <span className="text-indigo-400 font-semibold">Klik untuk balik</span>
                    </div>
                  </div>
                )}

              </div>
            </div>

            <div className={`mt-3 text-xs flex items-center gap-1.5 ${isDarkMode ? 'text-indigo-300/60' : 'text-slate-400'}`}>
              <RotateCcw className="w-3 h-3" />
              <span>Klik kartu untuk membalik · Gerakkan kursor untuk efek 3D Tilt</span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
