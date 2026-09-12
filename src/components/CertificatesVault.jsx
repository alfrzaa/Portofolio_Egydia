import React from 'react';
import { 
  Award, 
  ZoomIn, 
  CheckCircle2, 
  ShieldCheck, 
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { sound } from './AudioController';
import { CERTIFICATES_DATA } from '../data/portfolioData';

export default function CertificatesVault({ isDarkMode, onOpenLightbox }) {
  return (
    <section id="certifications" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide border mb-4 ${
            isDarkMode 
              ? 'bg-indigo-950/60 border-indigo-500/30 text-indigo-300' 
              : 'bg-indigo-50 border-indigo-200 text-indigo-700'
          }`}>
            <Award className="w-3.5 h-3.5 text-indigo-400" />
            <span>VERIFIED PROFESSIONAL CREDENTIALS</span>
          </div>

          <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight mb-4">
            <span className={isDarkMode ? 'text-white' : 'text-slate-900'}>
              VERIFIED{' '}
            </span>
            <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-400 bg-clip-text text-transparent">
              CERTIFICATIONS
            </span>
          </h2>

          <p className={`text-sm sm:text-base leading-relaxed ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
            Kredensial resmi dan sertifikasi kompetensi keahlian yang telah divalidasi oleh Badan Nasional Sertifikasi Profesi (BNSP), Kementerian Komunikasi dan Digital (Komdigi), Google, dan lembaga pelatihan nasional.
          </p>
        </div>

        {/* Certificates Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CERTIFICATES_DATA.map((cert) => (
            <div
              key={cert.id}
              onClick={() => {
                sound.play('click');
                onOpenLightbox(cert.image, `${cert.title} — ${cert.issuer}`);
              }}
              className={`group rounded-2xl border overflow-hidden cursor-pointer flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 ${
                isDarkMode 
                  ? 'bg-cosmos-900/80 border-indigo-900/30 hover:border-indigo-500/50 shadow-lg' 
                  : 'bg-white border-slate-200 hover:border-indigo-300 shadow-md'
              }`}
            >
              
              {/* Thumbnail Container */}
              <div className="relative h-44 overflow-hidden bg-slate-950">
                <img 
                  src={cert.image} 
                  alt={cert.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />

                {/* Badge Tag */}
                <div className="absolute top-3 right-3 bg-indigo-950/80 backdrop-blur-md px-2.5 py-0.5 rounded-full text-[10px] font-mono text-indigo-300 border border-indigo-500/30">
                  {cert.badge}
                </div>

                {/* Hover Zoom Overlay */}
                <div className="absolute inset-0 bg-indigo-950/70 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white text-slate-900 text-xs font-semibold shadow-lg">
                    <ZoomIn className="w-3.5 h-3.5 text-indigo-600" />
                    <span>Lihat Sertifikat</span>
                  </span>
                </div>
              </div>

              {/* Info Body */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[11px] font-mono text-indigo-400 font-semibold block mb-1">
                    {cert.issuer}
                  </span>
                  <h3 className="font-display font-bold text-sm leading-snug line-clamp-2 mb-2 group-hover:text-indigo-400 transition-colors">
                    {cert.title}
                  </h3>
                  <p className={`text-xs leading-relaxed line-clamp-2 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                    {cert.desc}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-indigo-900/20 flex items-center justify-between text-[11px] font-mono text-indigo-400">
                  <span className="flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Terverifikasi</span>
                  </span>
                  <span className="text-slate-400 group-hover:text-indigo-300">Klik untuk zoom</span>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
