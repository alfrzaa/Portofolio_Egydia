import React, { useState } from 'react';
import { 
  FolderGit2, 
  Layers, 
  ArrowRight, 
  ExternalLink, 
  Eye, 
  Sparkles, 
  Award,
  Smartphone,
  Globe,
  FileCode2,
  Building
} from 'lucide-react';
import { sound } from './AudioController';
import { PROJECTS_DATA } from '../data/portfolioData';
import ProjectModal from './ProjectModal';

export default function ProjectsSection({ isDarkMode }) {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);

  const filters = [
    { id: 'all', label: 'Semua Proyek (6)' },
    { id: 'web-app', label: 'Web Apps & SaaS' },
    { id: 'mobile', label: 'Mobile Apps' },
    { id: 'thesis', label: 'Skripsi & Riset' },
    { id: 'corporate', label: 'Corporate' },
  ];

  const filteredProjects = activeFilter === 'all' 
    ? PROJECTS_DATA 
    : PROJECTS_DATA.filter(p => p.category === activeFilter);

  const handleOpenModal = (project) => {
    sound.play('click');
    setSelectedProject(project);
  };

  return (
    <section id="projects" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide border mb-4 ${
            isDarkMode 
              ? 'bg-indigo-950/60 border-indigo-500/30 text-indigo-300' 
              : 'bg-indigo-50 border-indigo-200 text-indigo-700'
          }`}>
            <Layers className="w-3.5 h-3.5 text-indigo-400" />
            <span>FEATURED PORTFOLIO WORK</span>
          </div>

          <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight mb-4">
            <span className={isDarkMode ? 'text-white' : 'text-slate-900'}>
              FEATURED{' '}
            </span>
            <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-400 bg-clip-text text-transparent">
              PROJECTS
            </span>
          </h2>

          <p className={`text-sm sm:text-base leading-relaxed ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
            Kompilasi 6 proyek unggulan yang mencakup perancangan antarmuka pengguna interaktif di Figma, implementasi frontend modern dengan React.js dan Tailwind CSS, hingga pengujian kegunaan berskala empiris.
          </p>

          {/* Filter Bar */}
          <div className="flex flex-wrap justify-center gap-2 mt-8">
            {filters.map(f => (
              <button
                key={f.id}
                onClick={() => {
                  sound.play('click');
                  setActiveFilter(f.id);
                }}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200 ${
                  activeFilter === f.id
                    ? isDarkMode
                      ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 scale-105'
                      : 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20 scale-105'
                    : isDarkMode
                      ? 'bg-cosmos-900/70 border border-indigo-950 text-slate-300 hover:bg-cosmos-800'
                      : 'bg-slate-100 border border-slate-200 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProjects.map((project) => (
            <article
              key={project.id}
              className={`group rounded-2xl border overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-1.5 ${
                isDarkMode
                  ? 'bg-cosmos-900/80 border-indigo-900/30 hover:border-indigo-500/50 shadow-xl shadow-cosmos-950/50'
                  : 'bg-white border-slate-200 hover:border-indigo-300 shadow-lg shadow-slate-200/50'
              }`}
            >
              
              {/* Card Image Banner */}
              <div 
                onClick={() => handleOpenModal(project)}
                className="relative h-52 sm:h-56 overflow-hidden cursor-pointer bg-slate-950"
              >
                <img 
                  src={project.heroImage} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                
                {/* Artboard Tag */}
                <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-md text-[10px] font-mono text-indigo-300 border border-white/10">
                  {project.artboard}
                </div>

                {/* Award Badge if any */}
                {project.featuredAward && (
                  <div className={`absolute bottom-3 left-3 flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold backdrop-blur-md shadow-lg ${
                    project.featuredAward.type === 'gold'
                      ? 'bg-amber-500/90 text-slate-950'
                      : project.featuredAward.type === 'emerald'
                        ? 'bg-emerald-500/90 text-white'
                        : project.featuredAward.type === 'purple'
                          ? 'bg-purple-600/90 text-white'
                          : 'bg-blue-600/90 text-white'
                  }`}>
                    <Award className="w-3.5 h-3.5" />
                    <span>{project.featuredAward.title}</span>
                  </div>
                )}

                {/* Hover Overlay with Inspect Action */}
                <div className="absolute inset-0 bg-indigo-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                  <span className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white text-slate-900 font-semibold text-xs shadow-xl">
                    <Eye className="w-4 h-4 text-indigo-600" />
                    <span>Lihat Detail & Specs</span>
                  </span>
                </div>

              </div>

              {/* Card Content Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  
                  {/* Tech Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {project.techStack.map((tech, i) => (
                      <span
                        key={i}
                        className={`px-2.5 py-0.5 rounded-md text-[11px] font-mono font-medium border ${
                          isDarkMode
                            ? 'bg-indigo-950/50 border-indigo-900/40 text-indigo-300'
                            : 'bg-slate-100 border-slate-200 text-slate-700'
                        }`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Title */}
                  <h3 
                    onClick={() => handleOpenModal(project)}
                    className="font-display font-bold text-lg leading-snug mb-2.5 cursor-pointer hover:text-indigo-400 transition-colors line-clamp-1"
                  >
                    {project.title}
                  </h3>

                  {/* Short Description */}
                  <p className={`text-xs leading-relaxed line-clamp-3 mb-4 ${
                    isDarkMode ? 'text-slate-300' : 'text-slate-600'
                  }`}>
                    {project.shortDesc}
                  </p>
                </div>

                {/* Card Footer */}
                <div className={`pt-4 border-t flex items-center justify-between mt-auto ${
                  isDarkMode ? 'border-indigo-900/30' : 'border-slate-100'
                }`}>
                  <div className="text-[11px] font-mono text-slate-400 truncate max-w-[170px]">
                    {project.role}
                  </div>

                  <button
                    onClick={() => handleOpenModal(project)}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-400 hover:text-indigo-300 group/btn"
                  >
                    <span>Detail</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-1" />
                  </button>
                </div>

              </div>

            </article>
          ))}
        </div>

      </div>

      {/* Detail Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
        isDarkMode={isDarkMode}
      />
    </section>
  );
}
