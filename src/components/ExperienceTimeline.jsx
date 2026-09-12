import React from 'react';
import { 
  Briefcase, 
  Calendar, 
  Award, 
  ExternalLink, 
  Camera, 
  Sparkles,
  GraduationCap,
  Building
} from 'lucide-react';
import { EXPERIENCE_DATA } from '../data/portfolioData';

export default function ExperienceTimeline({ isDarkMode, onOpenLightbox }) {
  return (
    <section id="experience" className="py-24 relative z-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide border mb-4 ${
            isDarkMode 
              ? 'bg-indigo-950/60 border-indigo-500/30 text-indigo-300' 
              : 'bg-indigo-50 border-indigo-200 text-indigo-700'
          }`}>
            <Briefcase className="w-3.5 h-3.5 text-indigo-400" />
            <span>CAREER JOURNEY & MILESTONES</span>
          </div>

          <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight mb-4">
            <span className={isDarkMode ? 'text-white' : 'text-slate-900'}>
              EXPERIENCE &{' '}
            </span>
            <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-400 bg-clip-text text-transparent">
              MILESTONES
            </span>
          </h2>

          <p className={`text-sm sm:text-base leading-relaxed ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
            Jejak rekam profesional di industri teknologi, program magang bersertifikat, dan studi independen berprestasi.
          </p>
        </div>

        {/* Timeline Stack */}
        <div className="relative border-l-2 border-indigo-500/30 ml-4 sm:ml-8 space-y-12">
          {EXPERIENCE_DATA.map((item, idx) => (
            <div key={idx} className="relative pl-6 sm:pl-10 group">
              
              {/* Timeline Marker Dot */}
              <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-indigo-600 border-4 border-slate-950 group-hover:scale-125 transition-transform" />

              {/* Card Container */}
              <div className={`p-6 sm:p-8 rounded-2xl border transition-all duration-300 hover:border-indigo-500/50 ${
                isDarkMode 
                  ? 'bg-cosmos-900/80 border-indigo-900/30 shadow-xl' 
                  : 'bg-white border-slate-200 shadow-md'
              }`}>
                
                {/* Header Row: Badge & Period */}
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold font-mono border ${
                    item.badgeColor === 'blue'
                      ? 'bg-blue-500/10 border-blue-500/30 text-blue-400'
                      : item.badgeColor === 'purple'
                        ? 'bg-purple-500/10 border-purple-500/30 text-purple-400'
                        : item.badgeColor === 'emerald'
                          ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                          : 'bg-amber-500/10 border-amber-500/30 text-amber-400'
                  }`}>
                    {item.badge}
                  </span>

                  <div className="flex items-center gap-1.5 text-xs font-mono text-slate-400">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{item.period}</span>
                  </div>
                </div>

                {/* Role Title & Company */}
                <h3 className="font-display font-bold text-lg sm:text-xl mb-1">
                  {item.title}
                </h3>
                <h4 className="text-sm font-medium text-indigo-400 mb-3 flex items-center gap-1.5">
                  <Building className="w-3.5 h-3.5" />
                  <span>{item.institution}</span>
                </h4>

                {/* Description */}
                <p className={`text-xs sm:text-sm leading-relaxed mb-4 ${
                  isDarkMode ? 'text-slate-300' : 'text-slate-600'
                }`}>
                  {item.desc}
                </p>

                {/* Optional Documentation Photo */}
                {item.photo && (
                  <div className="mt-4 pt-4 border-t border-indigo-900/20">
                    <div 
                      onClick={() => onOpenLightbox(item.photo.src, item.photo.caption)}
                      className="inline-flex items-center gap-3 p-2 rounded-xl border border-indigo-900/30 bg-indigo-950/20 hover:border-indigo-500/40 cursor-pointer transition-colors group/photo"
                    >
                      <img 
                        src={item.photo.src} 
                        alt={item.photo.caption} 
                        className="w-16 h-12 rounded-lg object-cover group-hover/photo:scale-105 transition-transform" 
                      />
                      <div className="text-xs">
                        <div className="font-semibold text-indigo-300 flex items-center gap-1">
                          <Camera className="w-3.5 h-3.5" />
                          <span>Lihat Dokumentasi Kegiatan</span>
                        </div>
                        <div className="text-[10px] text-slate-400 truncate max-w-[280px]">
                          {item.photo.caption}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
