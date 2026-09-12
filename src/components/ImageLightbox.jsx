import React, { useEffect } from 'react';
import { X, ZoomIn } from 'lucide-react';
import { sound } from './AudioController';

export default function ImageLightbox({ image, caption, isOpen, onClose }) {
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

  if (!isOpen || !image) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
      
      {/* Backdrop */}
      <div 
        onClick={() => {
          sound.play('click');
          onClose();
        }} 
        className="fixed inset-0"
      />

      {/* Close Button */}
      <button
        onClick={() => {
          sound.play('click');
          onClose();
        }}
        className="absolute top-6 right-6 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-20"
        title="Tutup (Esc)"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Content */}
      <div className="relative z-10 max-w-4xl max-h-[85vh] flex flex-col items-center">
        <div className="rounded-2xl overflow-hidden border border-white/20 shadow-2xl bg-black max-h-[75vh]">
          <img 
            src={image} 
            alt={caption || "Preview"} 
            className="w-full h-full object-contain max-h-[75vh]"
          />
        </div>
        {caption && (
          <p className="text-white/90 text-sm text-center mt-4 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/10">
            {caption}
          </p>
        )}
      </div>

    </div>
  );
}
