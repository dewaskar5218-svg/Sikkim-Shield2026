import React, { useState } from 'react';
import { X, Smartphone, Globe, Copy, Check } from 'lucide-react';

interface MobileDemoModalProps { isOpen: boolean; onClose: () => void; }

const MobileDemoModal: React.FC<MobileDemoModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  const url = window.location.href;
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(url)}&bgcolor=0f172a&color=06b6d4`;

  const copy = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md">
      <div className="glass w-full max-w-lg rounded-[2.5rem] p-8 space-y-6">
        <div className="flex justify-between items-center">
          <h3 className="text-2xl font-black">Sync Mobile</h3>
          <button onClick={onClose}><X className="w-6 h-6" /></button>
        </div>
        <div className="flex flex-col items-center gap-6">
           <img src={qrUrl} className="w-48 h-48 rounded-xl" alt="QR" />
           <div className="w-full flex gap-2">
             <input readOnly value={url} className="flex-1 bg-slate-900 border border-white/10 p-3 rounded-xl text-xs" />
             <button onClick={copy} className="p-3 glass rounded-xl">
               {copied ? <Check className="text-green-400" /> : <Copy />}
             </button>
           </div>
        </div>
      </div>
    </div>
  );
};
export default MobileDemoModal;