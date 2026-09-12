import React, { useState } from 'react';
import { 
  MessageSquare, 
  Send, 
  Copy, 
  Check, 
  ExternalLink, 
  Mail, 
  Linkedin, 
  Github, 
  Instagram,
  Sparkles,
  PhoneCall
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

  return (
    <section id="contact" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Direct Contact Info */}
          <div className="lg:col-span-6">
            <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide border mb-4 ${
              isDarkMode 
                ? 'bg-indigo-950/60 border-indigo-500/30 text-indigo-300' 
                : 'bg-indigo-50 border-indigo-200 text-indigo-700'
            }`}>
              <MessageSquare className="w-3.5 h-3.5 text-indigo-400" />
              <span>LET'S CONNECT & COLLABORATE</span>
            </div>

            <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight mb-4">
              <span className={isDarkMode ? 'text-white' : 'text-slate-900'}>
                TERTARIK BERKOLABORASI ATAU{' '}
              </span>
              <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-400 bg-clip-text text-transparent">
                REKRUTMEN?
              </span>
            </h2>

            <p className={`text-sm sm:text-base leading-relaxed mb-8 ${
              isDarkMode ? 'text-slate-300' : 'text-slate-600'
            }`}>
              Saya siap berkontribusi sebagai <strong>Frontend Web Developer</strong> atau <strong>UI/UX Designer</strong> untuk mewujudkan produk digital yang berorientasi pengguna, modern, dan scalable.
            </p>

            {/* Direct Cards List */}
            <div className="space-y-3">
              
              {/* WhatsApp Direct */}
              <a
                href={PERSONAL_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sound.play('click')}
                className={`flex items-center justify-between p-4 rounded-xl border transition-all duration-200 hover:-translate-x-1 ${
                  isDarkMode 
                    ? 'bg-emerald-950/20 border-emerald-500/30 hover:border-emerald-400 text-slate-200' 
                    : 'bg-emerald-50/50 border-emerald-200 hover:border-emerald-300 text-slate-800'
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <div className="p-2.5 rounded-lg bg-emerald-500/20 text-emerald-400">
                    <PhoneCall className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[11px] font-mono text-emerald-400 font-semibold">WhatsApp Direct</div>
                    <div className="text-sm font-bold">{PERSONAL_INFO.whatsapp}</div>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-emerald-400" />
              </a>

              {/* Email Card (Click to Copy) */}
              <div
                onClick={handleCopyEmail}
                className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all duration-200 hover:-translate-x-1 ${
                  isDarkMode 
                    ? 'bg-cosmos-900/60 border-indigo-900/40 hover:border-indigo-500 text-slate-200' 
                    : 'bg-white border-slate-200 hover:border-indigo-300 text-slate-800'
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <div className="p-2.5 rounded-lg bg-indigo-500/20 text-indigo-400">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[11px] font-mono text-indigo-400 font-semibold">Email (Klik untuk Salin)</div>
                    <div className="text-sm font-bold">{PERSONAL_INFO.email}</div>
                  </div>
                </div>
                {copiedEmail ? (
                  <span className="inline-flex items-center gap-1 text-xs text-emerald-400 font-semibold">
                    <Check className="w-4 h-4" />
                    <span>Tersalin!</span>
                  </span>
                ) : (
                  <Copy className="w-4 h-4 text-slate-400" />
                )}
              </div>

              {/* LinkedIn Card */}
              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sound.play('click')}
                className={`flex items-center justify-between p-4 rounded-xl border transition-all duration-200 hover:-translate-x-1 ${
                  isDarkMode 
                    ? 'bg-cosmos-900/60 border-indigo-900/40 hover:border-blue-500 text-slate-200' 
                    : 'bg-white border-slate-200 hover:border-blue-300 text-slate-800'
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <div className="p-2.5 rounded-lg bg-blue-500/20 text-blue-400">
                    <Linkedin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[11px] font-mono text-blue-400 font-semibold">LinkedIn Profile</div>
                    <div className="text-sm font-bold">linkedin.com/in/egydiaalfariza</div>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-blue-400" />
              </a>

              {/* GitHub Card */}
              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sound.play('click')}
                className={`flex items-center justify-between p-4 rounded-xl border transition-all duration-200 hover:-translate-x-1 ${
                  isDarkMode 
                    ? 'bg-cosmos-900/60 border-indigo-900/40 hover:border-purple-500 text-slate-200' 
                    : 'bg-white border-slate-200 hover:border-purple-300 text-slate-800'
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <div className="p-2.5 rounded-lg bg-purple-500/20 text-purple-400">
                    <Github className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[11px] font-mono text-purple-400 font-semibold">GitHub Repository</div>
                    <div className="text-sm font-bold">github.com/alfrzaa</div>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-purple-400" />
              </a>

              {/* Instagram Card */}
              <a
                href={PERSONAL_INFO.instagram}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sound.play('click')}
                className={`flex items-center justify-between p-4 rounded-xl border transition-all duration-200 hover:-translate-x-1 ${
                  isDarkMode 
                    ? 'bg-cosmos-900/60 border-indigo-900/40 hover:border-pink-500 text-slate-200' 
                    : 'bg-white border-slate-200 hover:border-pink-300 text-slate-800'
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <div className="p-2.5 rounded-lg bg-pink-500/20 text-pink-400">
                    <Instagram className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[11px] font-mono text-pink-400 font-semibold">Instagram</div>
                    <div className="text-sm font-bold">@alfrrza</div>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-pink-400" />
              </a>

            </div>
          </div>

          {/* Right Column: Interactive Quick Message Form */}
          <div className="lg:col-span-6">
            <div className={`p-6 sm:p-8 rounded-2xl border shadow-2xl transition-colors ${
              isDarkMode 
                ? 'bg-cosmos-900/80 border-indigo-900/40 text-white' 
                : 'bg-white border-slate-200 text-slate-900'
            }`}>
              
              {/* Window Header */}
              <div className="flex items-center justify-between border-b pb-4 mb-6 border-indigo-900/20">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-rose-500"></span>
                  <span className="w-3 h-3 rounded-full bg-amber-500"></span>
                  <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
                </div>
                <span className="font-mono text-xs text-indigo-400">
                  quick_message.js // direct_wa
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
                    className={`w-full px-4 py-3 rounded-xl border text-sm transition-colors outline-none focus:border-indigo-500 ${
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
                    className={`w-full px-4 py-3 rounded-xl border text-sm transition-colors outline-none focus:border-indigo-500 ${
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
                    className={`w-full px-4 py-3 rounded-xl border text-sm transition-colors outline-none focus:border-indigo-500 ${
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
                    rows={4}
                    required
                    value={formData.message}
                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tuliskan gambaran proyek, posisi kerja, atau topik diskusi..."
                    className={`w-full px-4 py-3 rounded-xl border text-sm transition-colors outline-none focus:border-indigo-500 resize-none ${
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
