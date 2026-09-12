import React, { useState, useEffect, useRef } from 'react';
import { Terminal, X, Minus, Square, CornerDownLeft } from 'lucide-react';
import { sound } from './AudioController';
import { PERSONAL_INFO, PROJECTS_DATA } from '../data/portfolioData';

export default function InteractiveTerminal({ isOpen, onClose, isDarkMode, setIsDarkMode }) {
  const [history, setHistory] = useState([
    {
      type: 'banner',
      content: `
   ___ _____   ______ ___    _      ___  ___ ___ _____  ___ 
  | __/ __\\ \\ / /   \\_ _|  /_\\    / _ \\/ __|_ _| __\\ \\/ / |
  | _| (_ |\\ V /| |) | |  / _ \\  | (_) \\__ \\| || _| >  <|_|
  |___\\___| |_| |___/___|/_/ \\_\\  \\___/|___/___|___/_/\\_(_)
      
Selamat datang di Egydia Terminal CLI v3.94!
Ketik 'help' untuk daftar perintah, atau 'projects' untuk melihat portfolio.`
    }
  ]);
  const [inputVal, setInputVal] = useState('');
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommand = (cmdStr) => {
    const cmd = cmdStr.trim().toLowerCase();
    sound.play('click');

    const newHistory = [...history, { type: 'input', content: cmdStr }];

    switch (cmd) {
      case 'help':
        newHistory.push({
          type: 'output',
          content: `Perintah yang tersedia:
  • help       : Menampilkan panduan perintah
  • projects   : Menampilkan daftar 6 proyek unggulan
  • bio        : Profil lengkap & latar belakang pendidikan
  • skills     : Keahlian utama frontend & UI/UX
  • theme      : Mengganti tema (Cosmic Space / Daylight)
  • contact    : Info kontak & sosial media
  • hire       : Hubungi langsung ke WhatsApp
  • clear      : Membersihkan layar terminal
  • exit       : Menutup terminal ini`
        });
        break;

      case 'projects':
        const projList = PROJECTS_DATA.map((p, i) => `  ${i + 1}. [${p.categoryName}] ${p.title}`).join('\n');
        newHistory.push({
          type: 'output',
          content: `Daftar Proyek Unggulan:\n${projList}\n\nKetik nama proyek untuk melihat di halaman web!`
        });
        break;

      case 'bio':
        newHistory.push({
          type: 'output',
          content: `Profil:
  Nama      : ${PERSONAL_INFO.name}, ${PERSONAL_INFO.degree}
  Gelar     : ${PERSONAL_INFO.honors} (IPK ${PERSONAL_INFO.gpa})
  Kampus    : ${PERSONAL_INFO.university} · ${PERSONAL_INFO.major}
  Fokus     : ${PERSONAL_INFO.title}
  Status    : ${PERSONAL_INFO.status}`
        });
        break;

      case 'skills':
        newHistory.push({
          type: 'output',
          content: `Keahlian Inti:
  [UI/UX]    : User Research, Wireframing, Hi-Fi Prototyping (Figma), SUS Usability Testing
  [Frontend] : React.js (Hooks, Routing), Tailwind CSS, JavaScript ES6+, HTML5/CSS3
  [Tools]    : Figma, VS Code, Git/GitHub, Postman, MySQL, Node.js`
        });
        break;

      case 'theme':
        setIsDarkMode(!isDarkMode);
        sound.play('space');
        newHistory.push({
          type: 'output',
          content: `Mode visual telah diubah ke: ${!isDarkMode ? '🌌 Cosmic Space Dark Mode' : '☀️ Daylight Luxury Mode'}`
        });
        break;

      case 'contact':
        newHistory.push({
          type: 'output',
          content: `Kontak Langsung:
  WhatsApp : ${PERSONAL_INFO.whatsapp}
  Email    : ${PERSONAL_INFO.email}
  LinkedIn : ${PERSONAL_INFO.linkedin}
  GitHub   : ${PERSONAL_INFO.github}`
        });
        break;

      case 'hire':
        window.open(PERSONAL_INFO.whatsappUrl, '_blank');
        newHistory.push({
          type: 'output',
          content: `Membuka WhatsApp untuk percakapan rekrutmen...`
        });
        break;

      case 'clear':
        setHistory([]);
        setInputVal('');
        return;

      case 'exit':
      case 'quit':
        onClose();
        return;

      case '':
        break;

      default:
        newHistory.push({
          type: 'error',
          content: `Perintah '${cmd}' tidak dikenali. Ketik 'help' untuk bantuan.`
        });
    }

    setHistory(newHistory);
    setInputVal('');
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!inputVal.trim()) return;
    handleCommand(inputVal);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 w-[95vw] sm:w-[540px] max-h-[480px] h-[440px] flex flex-col rounded-2xl border shadow-2xl z-50 overflow-hidden font-mono text-xs backdrop-blur-xl transition-all duration-300 bg-slate-950/95 border-indigo-500/40 text-slate-200">
      
      {/* Terminal Title Bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900 border-b border-indigo-950/80">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <button onClick={onClose} className="w-3 h-3 rounded-full bg-rose-500 hover:opacity-80" />
            <button onClick={onClose} className="w-3 h-3 rounded-full bg-amber-500 hover:opacity-80" />
            <div className="w-3 h-3 rounded-full bg-emerald-500 opacity-60" />
          </div>
          <span className="text-[11px] font-semibold text-indigo-300 ml-2 flex items-center gap-1.5">
            <Terminal className="w-3.5 h-3.5" />
            <span>egydia-cli // zsh v3.94</span>
          </span>
        </div>

        {/* Quick Buttons */}
        <div className="flex items-center gap-1">
          {['help', 'projects', 'theme', 'clear'].map(q => (
            <button
              key={q}
              onClick={() => handleCommand(q)}
              className="px-2 py-0.5 rounded bg-white/5 hover:bg-white/10 text-[10px] text-slate-400 hover:text-white"
            >
              {q}
            </button>
          ))}
          <button onClick={onClose} className="p-1 hover:text-white text-slate-400 ml-1">
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Terminal Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2 select-text">
        {history.map((item, idx) => (
          <div key={idx}>
            {item.type === 'banner' && (
              <pre className="text-cyan-400 font-mono text-[10px] leading-tight mb-2 whitespace-pre-wrap">
                {item.content}
              </pre>
            )}
            {item.type === 'input' && (
              <div className="flex items-center gap-1 text-indigo-400">
                <span className="text-emerald-400 font-bold">guest@egydia:~$</span>
                <span className="text-white">{item.content}</span>
              </div>
            )}
            {item.type === 'output' && (
              <pre className="text-slate-300 whitespace-pre-wrap font-mono pl-2 border-l border-indigo-500/30 my-1">
                {item.content}
              </pre>
            )}
            {item.type === 'error' && (
              <div className="text-rose-400 pl-2 border-l border-rose-500/30">
                {item.content}
              </div>
            )}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input Prompt Line */}
      <form onSubmit={onSubmit} className="flex items-center px-4 py-2.5 bg-slate-900/80 border-t border-indigo-950/80">
        <span className="text-emerald-400 font-bold mr-2">guest@egydia:~$</span>
        <input
          ref={inputRef}
          type="text"
          value={inputVal}
          onChange={e => setInputVal(e.target.value)}
          placeholder="Ketik 'help', 'projects', 'theme'..."
          className="flex-1 bg-transparent text-white outline-none border-none placeholder-slate-600 font-mono"
        />
        <button type="submit" className="text-indigo-400 hover:text-white">
          <CornerDownLeft className="w-3.5 h-3.5" />
        </button>
      </form>

    </div>
  );
}
