import React, { useState } from 'react';
import { 
  MessageSquare, 
  Send, 
  Copy, 
  Check, 
  Mail, 
  Linkedin, 
  Github, 
  Instagram,
  PhoneCall,
  MapPin,
  GraduationCap,
  Sparkles
} from 'lucide-react';
import { sound } from './AudioController';
import { PERSONAL_INFO } from '../data/portfolioData';

export default function ContactSection({ isDarkMode }) {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    topic: 'Tawaran Pekerjaan (Full-time / Remote)',
    message: ''
  });

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopiedEmail(true);
    sound.play('click');
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    sound.play('success');

    const text = `Halo Egydia Alfariza,%0A%0ASaya: ${encodeURIComponent(formData.name)} (${encodeURIComponent(formData.email)})%0ATopik: ${encodeURIComponent(formData.topic)}%0A%0APesan:%0A${encodeURIComponent(formData.message)}`;
    const url = `https://wa.me/6282227376330?text=${text}`;
    window.open(url, '_blank');
  };

  const socialLinks = [
    {
      id: 'wa',
      label: 'WhatsApp',
      icon: PhoneCall,
      href: PERSONAL_INFO.whatsappUrl,
      color: 'hover:border-emerald-500 hover:text-emerald-400 hover:bg-emerald-500/10 text-emerald-400',
      isExternal: true
    },
    {
      id: 'email',
      label: 'Email (Salin)',
      icon: Mail,
      onClick: handleCopyEmail,
      color: 'hover:border-indigo-500 hover:text-indigo-400 hover:bg-indigo-500/10 text-indigo-400',
      isCopy: true
    },
    {
      id: 'linkedin',
      label: 'LinkedIn',
      icon: Linkedin,
      href: PERSONAL_INFO.linkedin,
      color: 'hover:border-blue-500 hover:text-blue-400 hover:bg-blue-500/10 text-blue-400',
      isExternal: true
    },
    {
      id: 'github',
      label: 'GitHub',
      icon: Github,
      href: PERSONAL_INFO.github,
      color: 'hover:border-purple-500 hover:text-purple-400 hover:bg-purple-500/10 text-purple-400',
      isExternal: true
    },
    {
      id: 'instagram',
      label: 'Instagram',
      icon: Instagram,
      href: PERSONAL_INFO.instagram,
      color: 'hover:border-pink-500 hover:text-pink-400 hover:bg-pink-500/10 text-pink-400',
      isExternal: true
    }
  ];

  return (
    <section id="contact" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Direct Icon Links & Quick Bio */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            
            <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide border mb-4 self-start ${
              isDarkMode 
                ? 'bg-indigo-950/60 border-indigo-500/30 text-indigo-300' 
                : 'bg-indigo-50 border-indigo-200 text-indigo-700'
            }`}>
              <MessageSquare className="w-3.5 h-3.5 text-indigo-400" />
              <span>LET'S CONNECT</span>
            </div>

            <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight mb-4 leading-tight">
              <span className={isDarkMode ? 'text-white' : 'text-slate-900'}>
                Tertarik Berkolaborasi atau{' '}
              </span>
              <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-400 bg-clip-text text-transparent">
                Rekrutmen?
              </span>
            </h2>

            <p className={`text-sm sm:text-base leading-relaxed mb-6 ${
              isDarkMode ? 'text-slate-300' : 'text-slate-600'
            }`}>
              Saya siap berkontribusi sebagai <strong>Frontend Web Developer</strong> atau <strong>UI/UX Designer</strong> untuk mewujudkan produk digital yang berkualitas, cepat, dan nyaman digunakan.
            </p>

            {/* Icon Links Bar (Clean icon buttons without verbose redundant text) */}
            <div className="flex flex-wrap items-center gap-3 mb-6">
              {socialLinks.map((item) => {
                const Icon = item.icon;

                if (item.isCopy) {
                  return (
                    <button
                      key={item.id}
                      onClick={item.onClick}
                      title={copiedEmail ? "Email Berhasil Disalin!" : "Klik untuk salin email (egydiaalfariza74@gmail.com)"}
                      aria-label="Salin Email"
                      className={`relative p-3.5 rounded-2xl border transition-all duration-300 hover:scale-110 shadow-lg ${
                        isDarkMode 
                          ? 'bg-cosmos-900/80 border-indigo-900/50' 
                          : 'bg-white border-slate-200'
                      } ${item.color}`}
                    >
                      <Icon className="w-5 h-5" />
                      {copiedEmail && (
                        <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-md bg-emerald-600 text-white font-mono text-[10px] font-bold shadow-md whitespace-nowrap animate-bounce">
                          Tersalin!
                        </span>
                      )}
                    </button>
                  );
                }

                return (
                  <a
                    key={item.id}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => sound.play('click')}
                    title={item.label}
                    aria-label={item.label}
                    className={`p-3.5 rounded-2xl border transition-all duration-300 hover:scale-110 shadow-lg ${
                      isDarkMode 
                        ? 'bg-cosmos-900/80 border-indigo-900/50' 
                        : 'bg-white border-slate-200'
                    } ${item.color}`}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>

            {/* Subtle Location & Education Badges */}
            <div className="flex flex-wrap items-center gap-3 text-xs">
              <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border ${
                isDarkMode ? 'bg-cosmos-900/40 border-indigo-950 text-slate-400' : 'bg-slate-100 border-slate-200 text-slate-600'
              }`}>
                <MapPin className="w-3.5 h-3.5 text-indigo-400" />
                <span>Jambi, Indonesia</span>
              </div>
              <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border ${
                isDarkMode ? 'bg-cosmos-900/40 border-indigo-950 text-slate-400' : 'bg-slate-100 border-slate-200 text-slate-600'
              }`}>
                <GraduationCap className="w-3.5 h-3.5 text-amber-400" />
                <span>Universitas Jambi · Cum Laude (3.94)</span>
              </div>
            </div>

          </div>

          {/* Right Column: Quick WhatsApp Message Form */}
          <div className="lg:col-span-6">
            <div className={`p-6 sm:p-8 rounded-2xl border shadow-2xl transition-colors ${
              isDarkMode 
                ? 'bg-cosmos-900/80 border-indigo-900/40 text-white' 
                : 'bg-white border-slate-200 text-slate-900'
            }`}>
              
              {/* Form Window Header */}
              <div className="flex items-center justify-between border-b pb-4 mb-5 border-indigo-900/20">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-rose-500"></span>
                  <span className="w-3 h-3 rounded-full bg-amber-500"></span>
                  <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
                </div>
                <span className="font-mono text-xs text-indigo-400">
                  direct_message.js
                </span>
              </div>

              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold mb-1.5 opacity-80">
                    Nama Lengkap / Perusahaan
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Contoh: Budi Santoso (HR PT Tech...)"
                    className={`w-full px-4 py-2.5 rounded-xl border text-sm transition-colors outline-none focus:border-indigo-500 ${
                      isDarkMode 
                        ? 'bg-cosmos-950/60 border-indigo-900/40 text-white placeholder-slate-500' 
                        : 'bg-slate-50 border-slate-200 text-slate-800 placeholder-slate-400'
                    }`}
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-1.5 opacity-80">
                    Email / Nomor Telepon
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    placeholder="nama@perusahaan.com / 0812..."
                    className={`w-full px-4 py-2.5 rounded-xl border text-sm transition-colors outline-none focus:border-indigo-500 ${
                      isDarkMode 
                        ? 'bg-cosmos-950/60 border-indigo-900/40 text-white placeholder-slate-500' 
                        : 'bg-slate-50 border-slate-200 text-slate-800 placeholder-slate-400'
                    }`}
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-1.5 opacity-80">
                    Kategori Keperluan
                  </label>
                  <select
                    value={formData.topic}
                    onChange={e => setFormData({ ...formData, topic: e.target.value })}
                    className={`w-full px-4 py-2.5 rounded-xl border text-sm transition-colors outline-none focus:border-indigo-500 ${
                      isDarkMode 
                        ? 'bg-cosmos-950 border-indigo-900/40 text-white' 
                        : 'bg-slate-50 border-slate-200 text-slate-800'
                    }`}
                  >
                    <option value="Tawaran Pekerjaan (Full-time / Remote)">💼 Tawaran Pekerjaan (Full-time / Remote)</option>
                    <option value="Proyek Pembuatan Website / UI/UX">🚀 Proyek Pembuatan Website / UI/UX</option>
                    <option value="Kolaborasi Riset / Konsultasi">💡 Kolaborasi Riset / Konsultasi</option>
                    <option value="Lainnya">✨ Keperluan Lainnya</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-1.5 opacity-80">
                    Pesan Anda
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={formData.message}
                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tuliskan gambaran proyek, posisi kerja, atau topik diskusi..."
                    className={`w-full px-4 py-2.5 rounded-xl border text-sm transition-colors outline-none focus:border-indigo-500 resize-none ${
                      isDarkMode 
                        ? 'bg-cosmos-950/60 border-indigo-900/40 text-white placeholder-slate-500' 
                        : 'bg-slate-50 border-slate-200 text-slate-800 placeholder-slate-400'
                    }`}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-semibold text-sm shadow-xl shadow-emerald-600/30 transition-all duration-300 hover:scale-[1.01]"
                >
                  <span>Kirim Pesan Langsung ke WhatsApp</span>
                  <Send className="w-4 h-4" />
                </button>
              </form>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
