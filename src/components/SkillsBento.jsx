import React from 'react';
import { 
  Sparkles, 
  Figma, 
  Code2, 
  GraduationCap, 
  Wrench, 
  Users, 
  Check, 
  Award,
  Terminal,
  Cpu,
  Layers
} from 'lucide-react';
import { SKILLS_DATA, PERSONAL_INFO } from '../data/portfolioData';

export default function SkillsBento({ isDarkMode }) {
  return (
    <section id="skills" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide border mb-4 ${
            isDarkMode 
              ? 'bg-indigo-950/60 border-indigo-500/30 text-indigo-300' 
              : 'bg-indigo-50 border-indigo-200 text-indigo-700'
          }`}>
            <Cpu className="w-3.5 h-3.5 text-indigo-400" />
            <span>CORE COMPETENCY RADAR</span>
          </div>

          <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight mb-4">
            <span className={isDarkMode ? 'text-white' : 'text-slate-900'}>
              SKILLS &{' '}
            </span>
            <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-400 bg-clip-text text-transparent">
              TECH RADAR
            </span>
          </h2>

          <p className={`text-sm sm:text-base leading-relaxed ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
            Kombinasi kemampuan mendesain sistem antarmuka berbasis bukti (user research & usability scale) dengan kemampuan mengimplementasikannya ke dalam arsitektur kode frontend yang tangguh dan modular.
          </p>
        </div>

        {/* Master Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-12 gap-6">
          
          {/* Card 1: UI/UX Disciplines (Span 6) */}
          <div className={`lg:col-span-6 p-6 sm:p-8 rounded-2xl border flex flex-col justify-between transition-all duration-300 hover:border-indigo-500/50 ${
            isDarkMode 
              ? 'bg-cosmos-900/80 border-indigo-900/30 shadow-xl' 
              : 'bg-white border-slate-200 shadow-md'
          }`}>
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-400">
                  <Figma className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-mono tracking-widest text-purple-400 font-bold uppercase">
                  DESIGN DISCIPLINES
                </span>
              </div>

              <h3 className="font-display font-bold text-xl sm:text-2xl mb-3">
                UI/UX & Interactive Design
              </h3>
              <p className={`text-xs sm:text-sm leading-relaxed mb-6 ${
                isDarkMode ? 'text-slate-300' : 'text-slate-600'
              }`}>
                Berpengalaman merancang alur pengguna dari hulu ke hilir menggunakan metodologi User-Centered Design, Wireframing, Hi-Fi Prototyping di Figma, hingga pengujian System Usability Scale (SUS) dengan hasil Grade A (87.50).
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {SKILLS_DATA.design.map((skill, i) => (
                <span
                  key={i}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                    isDarkMode
                      ? 'bg-purple-950/40 border-purple-800/30 text-purple-300'
                      : 'bg-purple-50 border-purple-200 text-purple-700'
                  }`}
                >
                  <Check className="w-3.5 h-3.5 text-purple-400" />
                  <span>{skill}</span>
                </span>
              ))}
            </div>
          </div>

          {/* Card 2: Frontend Engineering (Span 6) */}
          <div className={`lg:col-span-6 p-6 sm:p-8 rounded-2xl border flex flex-col justify-between transition-all duration-300 hover:border-cyan-500/50 ${
            isDarkMode 
              ? 'bg-cosmos-900/80 border-indigo-900/30 shadow-xl' 
              : 'bg-white border-slate-200 shadow-md'
          }`}>
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
                  <Code2 className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-mono tracking-widest text-cyan-400 font-bold uppercase">
                  ENGINEERING STACK
                </span>
              </div>

              <h3 className="font-display font-bold text-xl sm:text-2xl mb-3">
                Frontend Web Development
              </h3>
              <p className={`text-xs sm:text-sm leading-relaxed mb-6 ${
                isDarkMode ? 'text-slate-300' : 'text-slate-600'
              }`}>
                Menerjemahkan ide dan desain visual menjadi aplikasi web berperforma tinggi, ramah SEO, dan responsif di seluruh ukuran layar dengan clean code & modular architecture.
              </p>
            </div>

            <div className="space-y-3.5">
              {SKILLS_DATA.engineering.map((item, i) => (
                <div key={i} className="text-xs">
                  <div className="flex justify-between font-semibold mb-1">
                    <span className={isDarkMode ? 'text-slate-200' : 'text-slate-700'}>{item.name}</span>
                    <span className="font-mono text-cyan-400">{item.level}%</span>
                  </div>
                  <div className={`w-full h-2 rounded-full overflow-hidden ${
                    isDarkMode ? 'bg-indigo-950/80' : 'bg-slate-200'
                  }`}>
                    <div 
                      className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-cyan-400"
                      style={{ width: `${item.level}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Card 3: Academic Excellence (Span 4) */}
          <div className={`lg:col-span-4 p-6 sm:p-8 rounded-2xl border flex flex-col justify-between transition-all duration-300 ${
            isDarkMode 
              ? 'bg-cosmos-900/80 border-indigo-900/30 shadow-xl' 
              : 'bg-white border-slate-200 shadow-md'
          }`}>
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-mono tracking-widest text-amber-400 font-bold uppercase">
                  ACADEMIC EXCELLENCE
                </span>
              </div>

              <h3 className="font-display font-bold text-xl mb-1">
                {PERSONAL_INFO.university}
              </h3>
              <div className="text-xs text-indigo-400 font-medium mb-3">
                {PERSONAL_INFO.major}
              </div>

              <div className="flex items-baseline gap-2 mb-3">
                <span className="font-display font-extrabold text-4xl text-amber-400">
                  {PERSONAL_INFO.gpa}
                </span>
                <span className="font-mono text-xs text-slate-400">/ 4.00 Max GPA</span>
              </div>

              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-xs font-bold text-amber-400 mb-3">
                <Award className="w-3.5 h-3.5" />
                <span>Cum Laude (With Honors)</span>
              </div>
            </div>

            <p className={`text-xs leading-relaxed ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
              Skripsi: Analisis & Perancangan Frontend SIMTA-UM dengan Metode Prototype (SUS Score 87.50).
            </p>
          </div>

          {/* Card 4: Tooling Ecosystem (Span 4) */}
          <div className={`lg:col-span-4 p-6 sm:p-8 rounded-2xl border flex flex-col justify-between transition-all duration-300 ${
            isDarkMode 
              ? 'bg-cosmos-900/80 border-indigo-900/30 shadow-xl' 
              : 'bg-white border-slate-200 shadow-md'
          }`}>
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/30 text-blue-400">
                  <Wrench className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-mono tracking-widest text-blue-400 font-bold uppercase">
                  TOOLING WORKFLOW
                </span>
              </div>

              <h3 className="font-display font-bold text-xl mb-2">
                Workflow & Ecosystem
              </h3>
              <p className={`text-xs leading-relaxed mb-4 ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                Tooling harian yang digunakan dalam merancang dan mengembangkan produk web interaktif.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center">
              {SKILLS_DATA.tools.map((tool, i) => (
                <div
                  key={i}
                  className={`p-2.5 rounded-xl border text-xs ${
                    isDarkMode ? 'bg-cosmos-950/60 border-indigo-950' : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  <div className="font-bold text-xs text-indigo-400 truncate">{tool.name}</div>
                  <div className="text-[10px] text-slate-400 truncate mt-0.5">{tool.desc}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Card 5: Soft Skills & Team Leadership (Span 4) */}
          <div className={`lg:col-span-4 p-6 sm:p-8 rounded-2xl border flex flex-col justify-between transition-all duration-300 ${
            isDarkMode 
              ? 'bg-cosmos-900/80 border-indigo-900/30 shadow-xl' 
              : 'bg-white border-slate-200 shadow-md'
          }`}>
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                  <Users className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-mono tracking-widest text-emerald-400 font-bold uppercase">
                  COLLABORATION
                </span>
              </div>

              <h3 className="font-display font-bold text-xl mb-3">
                Team Leadership
              </h3>
            </div>

            <div className="space-y-3 text-xs">
              {SKILLS_DATA.softSkills.map((item, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className={isDarkMode ? 'text-slate-200' : 'text-slate-800'}>{item.title}: </strong>
                    <span className={isDarkMode ? 'text-slate-400' : 'text-slate-600'}>{item.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
