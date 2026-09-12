import React, { useState, useEffect } from 'react';
import { 
  X, 
  ExternalLink, 
  Monitor, 
  Smartphone, 
  Award, 
  Sparkles, 
  CheckCircle2, 
  Layers, 
  Code2, 
  Palette,
  RotateCw
} from 'lucide-react';
import { sound } from './AudioController';

export default function ProjectModal({ project, isOpen, onClose, isDarkMode }) {
  const [deviceMode, setDeviceMode] = useState('desktop'); // 'desktop' or 'mobile'
  const [activeTab, setActiveTab] = useState('overview'); // 'overview', 'design', 'code'
  const [selectedImage, setSelectedImage] = useState('');

  useEffect(() => {
    if (project) {
      // Default to mobile for TripIn, desktop for others
      if (project.category === 'mobile') {
        setDeviceMode('mobile');
        setSelectedImage(project.mobileScreens?.[0]?.src || project.heroImage);
      } else {
        setDeviceMode('desktop');
        setSelectedImage(project.desktopScreens?.[0]?.src || project.heroImage);
      }
      setActiveTab('overview');
    }
  }, [project]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose]);

  if (!isOpen || !project) return null;

  const currentScreens = deviceMode === 'desktop' ? project.desktopScreens : project.mobileScreens;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      
      {/* Backdrop */}
      <div 
        onClick={() => {
          sound.play('click');
          onClose();
        }}
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
      />

      {/* Modal Dialog */}
      <div className={`relative w-full max-w-5xl max-h-[90vh] flex flex-col rounded-2xl border shadow-2xl overflow-hidden z-10 transition-colors ${
        isDarkMode 
          ? 'bg-cosmos-950/95 border-indigo-500/30 text-white' 
          : 'bg-white/95 border-slate-200 text-slate-900'
      }`}>
        
        {/* Modal Header */}
        <div className={`flex items-center justify-between px-6 py-4 border-b ${
          isDarkMode ? 'border-indigo-900/30 bg-cosmos-900/60' : 'border-slate-200 bg-slate-50'
        }`}>
          <div>
            <span className="text-[11px] font-mono tracking-widest text-indigo-400 font-bold uppercase">
              {project.artboard}
            </span>
            <h3 className="font-display font-bold text-lg sm:text-xl tracking-tight mt-0.5 line-clamp-1">
              {project.title}
            </h3>
          </div>

          <div className="flex items-center gap-2">
            
            {/* Device Switcher */}
            <div className={`flex items-center rounded-lg p-1 border text-xs font-semibold ${
              isDarkMode ? 'bg-cosmos-950 border-indigo-900/50' : 'bg-slate-200/70 border-slate-300'
            }`}>
              <button
                onClick={() => {
                  sound.play('click');
                  setDeviceMode('desktop');
                  setSelectedImage(project.desktopScreens?.[0]?.src || project.heroImage);
                }}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-md transition-colors ${
                  deviceMode === 'desktop' 
                    ? isDarkMode ? 'bg-indigo-600 text-white' : 'bg-white text-indigo-700 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
                title="Tampilan Desktop"
              >
                <Monitor className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Desktop</span>
              </button>

              <button
                onClick={() => {
                  sound.play('click');
                  setDeviceMode('mobile');
                  setSelectedImage(project.mobileScreens?.[0]?.src || project.heroImage);
                }}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-md transition-colors ${
                  deviceMode === 'mobile' 
                    ? isDarkMode ? 'bg-indigo-600 text-white' : 'bg-white text-indigo-700 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
                title="Tampilan Mobile"
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Mobile</span>
              </button>
            </div>

            {/* Close Button */}
            <button
              onClick={() => {
                sound.play('click');
                onClose();
              }}
              className={`p-2 rounded-lg border transition-colors ${
                isDarkMode 
                  ? 'border-indigo-900/50 text-slate-400 hover:text-white hover:bg-white/5' 
                  : 'border-slate-200 text-slate-500 hover:text-slate-900 hover:bg-slate-100'
              }`}
              title="Tutup (Esc)"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {/* Interactive Mockup Container */}
          <div className={`p-4 rounded-xl border flex flex-col items-center justify-center ${
            isDarkMode ? 'bg-cosmos-900/40 border-indigo-950/80' : 'bg-slate-100/70 border-slate-200'
          }`}>
            
            {deviceMode === 'desktop' ? (
              /* Desktop Browser Mockup Frame */
              <div className={`w-full max-w-3xl rounded-xl border overflow-hidden shadow-2xl ${
                isDarkMode ? 'bg-slate-900 border-slate-700' : 'bg-white border-slate-300'
              }`}>
                {/* Browser Top Bar */}
                <div className="px-4 py-2.5 bg-slate-800 flex items-center gap-2 border-b border-slate-700 text-xs text-slate-300">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                  </div>
                  <div className="flex-1 max-w-sm mx-auto px-3 py-1 rounded bg-slate-900/80 text-[11px] font-mono text-slate-400 truncate text-center">
                    {project.url}
                  </div>
                  <RotateCw className="w-3.5 h-3.5 text-slate-400" />
                </div>
                {/* Screen Preview */}
                <div className="max-h-[380px] overflow-y-auto bg-slate-950">
                  <img 
                    src={selectedImage || project.heroImage} 
                    alt={project.title} 
                    className="w-full object-cover"
                  />
                </div>
              </div>
            ) : (
              /* Mobile Phone Mockup Frame */
              <div className="w-[260px] sm:w-[280px] rounded-[36px] p-3 bg-slate-900 border-4 border-slate-800 shadow-2xl">
                <div className="w-16 h-4 bg-slate-800 rounded-full mx-auto mb-2"></div>
                <div className="rounded-[24px] overflow-hidden max-h-[440px] overflow-y-auto bg-slate-950">
                  <img 
                    src={selectedImage || project.heroImage} 
                    alt={project.title} 
                    className="w-full object-cover"
                  />
                </div>
                <div className="w-24 h-1 bg-slate-700 rounded-full mx-auto mt-2"></div>
              </div>
            )}

            {/* Thumbnail Carousel */}
            {currentScreens && currentScreens.length > 1 && (
              <div className="flex items-center gap-2 mt-4 overflow-x-auto max-w-full pb-2">
                {currentScreens.map((s, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      sound.play('click');
                      setSelectedImage(s.src);
                    }}
                    className={`relative w-16 h-12 rounded-lg overflow-hidden border-2 transition-all shrink-0 ${
                      selectedImage === s.src
                        ? 'border-indigo-500 scale-105 shadow-md shadow-indigo-500/30'
                        : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={s.src} alt={s.caption} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info Tabs Navigation */}
          <div className={`flex border-b text-sm font-semibold ${
            isDarkMode ? 'border-indigo-900/30' : 'border-slate-200'
          }`}>
            <button
              onClick={() => {
                sound.play('click');
                setActiveTab('overview');
              }}
              className={`pb-3 px-4 border-b-2 transition-colors ${
                activeTab === 'overview'
                  ? 'border-indigo-500 text-indigo-400'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              Overview & Impact
            </button>
            <button
              onClick={() => {
                sound.play('click');
                setActiveTab('design');
              }}
              className={`pb-3 px-4 border-b-2 transition-colors ${
                activeTab === 'design'
                  ? 'border-indigo-500 text-indigo-400'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              Design & UX Specs
            </button>
            <button
              onClick={() => {
                sound.play('click');
                setActiveTab('code');
              }}
              className={`pb-3 px-4 border-b-2 transition-colors ${
                activeTab === 'code'
                  ? 'border-indigo-500 text-indigo-400'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              Engineering & Stack
            </button>
          </div>

          {/* Tab Content */}
          {activeTab === 'overview' && (
            <div className="space-y-4 text-sm">
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech, i) => (
                  <span 
                    key={i} 
                    className={`px-3 py-1 rounded-full text-xs font-mono font-medium border ${
                      isDarkMode ? 'bg-indigo-950/60 border-indigo-800/40 text-indigo-300' : 'bg-indigo-50 border-indigo-200 text-indigo-700'
                    }`}
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div>
                <h4 className="font-semibold text-base mb-1">Deskripsi Proyek</h4>
                <p className={`leading-relaxed ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                  {project.fullDesc}
                </p>
              </div>

              {project.highlights && project.highlights.length > 0 && (
                <div className={`p-4 rounded-xl border ${
                  isDarkMode ? 'bg-cosmos-900/60 border-indigo-900/30' : 'bg-slate-50 border-slate-200'
                }`}>
                  <div className="flex items-center gap-2 font-semibold text-indigo-400 mb-2">
                    <Sparkles className="w-4 h-4" />
                    <span>Capaian Utama & Metrik</span>
                  </div>
                  <ul className="space-y-2">
                    {project.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span className={isDarkMode ? 'text-slate-300' : 'text-slate-700'}>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {activeTab === 'design' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              {project.designSpecs?.map((spec, i) => (
                <div 
                  key={i} 
                  className={`p-4 rounded-xl border ${
                    isDarkMode ? 'bg-cosmos-900/50 border-indigo-900/30' : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-2 font-semibold text-purple-400 mb-1.5">
                    <Palette className="w-4 h-4" />
                    <span>{spec.title}</span>
                  </div>
                  <p className={`text-xs leading-relaxed ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                    {spec.content}
                  </p>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'code' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              {project.codeSpecs?.map((spec, i) => (
                <div 
                  key={i} 
                  className={`p-4 rounded-xl border ${
                    isDarkMode ? 'bg-cosmos-900/50 border-indigo-900/30' : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-2 font-semibold text-cyan-400 mb-1.5">
                    <Code2 className="w-4 h-4" />
                    <span>{spec.title}</span>
                  </div>
                  <p className={`text-xs leading-relaxed ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                    {spec.content}
                  </p>
                </div>
              ))}
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className={`flex items-center justify-between px-6 py-4 border-t ${
          isDarkMode ? 'border-indigo-900/30 bg-cosmos-900/70' : 'border-slate-200 bg-slate-50'
        }`}>
          <div className="text-xs font-mono text-slate-400">
            Peran: <strong className={isDarkMode ? 'text-white' : 'text-slate-800'}>{project.role}</strong>
          </div>

          <div className="flex items-center gap-3">
            {project.url && project.url !== '#' && (
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 text-white font-semibold text-xs hover:bg-indigo-500 transition-colors shadow-lg shadow-indigo-600/30"
              >
                <span>Buka Demo Live</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
            <button
              onClick={() => {
                sound.play('click');
                onClose();
              }}
              className={`px-4 py-2 rounded-xl border font-semibold text-xs transition-colors ${
                isDarkMode ? 'border-indigo-900/50 text-slate-300 hover:bg-white/5' : 'border-slate-300 text-slate-700 hover:bg-slate-100'
              }`}
            >
              Tutup
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}
