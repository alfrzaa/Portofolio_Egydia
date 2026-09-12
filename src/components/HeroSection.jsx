import React from 'react';
import { 
  ArrowDown, 
  Terminal as TerminalIcon, 
  MessageCircle, 
  Award, 
  MapPin, 
  FolderGit2, 
  GraduationCap, 
  Linkedin,
  Github,
  Mail,
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import { sound } from './AudioController';
import { PERSONAL_INFO, QUICK_STATS } from '../data/portfolioData';

export default function HeroSection({ isDarkMode, onOpenTerminal }) {
  return (
    <section id="hero" className="relative min-h-[90vh] pt-32 pb-20 flex items-center overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          
          {/* Left Column: Natural & Authentic Introduction */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            
            {/* Status Pill */}
            <div className={`inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full text-xs font-medium border mb-5 transition-all ${
              isDarkMode 
                ? 'bg-indigo-950/60 border-indigo-500/30 text-indigo-300' 
                : 'bg-indigo-50/80 border-indigo-200 text-indigo-700'
            }`}>
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-indigo-400" />
                <span>Jambi, Indonesia · Terbuka untuk Peluang Kerja & Freelance</span>
              </span>
            </div>

            {/* Headline */}
            <div className="mb-6">
              <div className="text-sm font-semibold font-mono text-indigo-400 mb-2">
                Halo, salam kenal! Saya
              </div>
              
              <h1 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight leading-[1.18] mb-3">
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

            {/* Natural & Human Bio */}
            <p className={`text-sm sm:text-base leading-relaxed mb-8 max-w-2xl ${
              isDarkMode ? 'text-slate-300' : 'text-slate-600'
            }`}>
              Lulusan Sistem Informasi dengan predikat <strong className={isDarkMode ? 'text-amber-300' : 'text-indigo-700 font-bold'}>Cum Laude (IPK 3.94)</strong> dari Universitas Jambi. Saya fokus merancang antarmuka pengguna yang intuitif di <strong>Figma</strong> dan mengembangkannya menjadi website interaktif, cepat, dan responsif menggunakan <strong>React.js</strong>, <strong>Tailwind CSS</strong>, dan <strong>JavaScript modern</strong>.
            </p>

            {/* CTA Buttons */}
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

            {/* Key Metrics Bar */}
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

          {/* Right Column: Clean & Elegant Profile Card */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center">
            <div className={`relative w-full max-w-[340px] sm:max-w-[370px] rounded-2xl border p-4 sm:p-5 shadow-2xl transition-all duration-300 ${
              isDarkMode 
                ? 'bg-cosmos-900/90 border-indigo-500/30 text-white shadow-indigo-950/40' 
                : 'bg-white border-slate-200 text-slate-900 shadow-xl shadow-slate-200/50'
            }`}>
              
              {/* Photo Frame (Full natural portrait of graduation) */}
              <div className="relative w-full h-[360px] sm:h-[390px] rounded-xl overflow-hidden bg-slate-900 mb-4 border border-indigo-900/30">
                <img 
                  src={PERSONAL_INFO.avatarOutdoor} 
                  alt={PERSONAL_INFO.name} 
                  className="w-full h-full object-cover object-top"
                />
                
                {/* Subtle Gradient at Bottom of Photo */}
                <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                {/* Cum Laude Tag on Photo */}
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between bg-black/60 backdrop-blur-md px-3 py-2 rounded-lg border border-white/10 text-xs text-white">
                  <div className="flex items-center gap-1.5 font-bold text-amber-300">
                    <Award className="w-4 h-4" />
                    <span>Cum Laude · IPK 3.94</span>
                  </div>
                  <span className="text-[11px] text-slate-300 font-medium">Universitas Jambi</span>
                </div>
              </div>

              {/* Profile Details */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-display font-bold text-lg leading-tight">
                      {PERSONAL_INFO.name}
                    </h3>
                    <div className="text-xs text-indigo-400 font-medium mt-0.5">
                      S.Kom. · Sistem Informasi
                    </div>
                  </div>

                  <div className="flex items-center gap-1">
                    <a
                      href={PERSONAL_INFO.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`p-2 rounded-lg border transition-colors ${
                        isDarkMode ? 'border-indigo-900/50 hover:bg-white/5 text-slate-300 hover:text-white' : 'border-slate-200 hover:bg-slate-100 text-slate-700'
                      }`}
                      title="GitHub"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                    <a
                      href={PERSONAL_INFO.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`p-2 rounded-lg border transition-colors ${
                        isDarkMode ? 'border-indigo-900/50 hover:bg-white/5 text-slate-300 hover:text-white' : 'border-slate-200 hover:bg-slate-100 text-slate-700'
                      }`}
                      title="LinkedIn"
                    >
                      <Linkedin className="w-4 h-4" />
                    </a>
                    <a
                      href={`mailto:${PERSONAL_INFO.email}`}
                      className={`p-2 rounded-lg border transition-colors ${
                        isDarkMode ? 'border-indigo-900/50 hover:bg-white/5 text-slate-300 hover:text-white' : 'border-slate-200 hover:bg-slate-100 text-slate-700'
                      }`}
                      title="Email"
                    >
                      <Mail className="w-4 h-4" />
                    </a>
                  </div>
                </div>

                {/* Tech Chips */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {['React.js', 'Tailwind CSS', 'Figma UI/UX', 'JavaScript', 'Responsive Web'].map((skill, idx) => (
                    <span 
                      key={idx}
                      className={`px-2.5 py-1 rounded-md text-[11px] font-mono border ${
                        isDarkMode 
                          ? 'bg-cosmos-950 border-indigo-950 text-indigo-300' 
                          : 'bg-slate-100 border-slate-200 text-slate-700'
                      }`}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
