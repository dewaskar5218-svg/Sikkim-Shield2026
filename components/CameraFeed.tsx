import React, { useState, useRef } from 'react';
import { Video, Shield, RefreshCw, Smartphone, Square } from 'lucide-react';
import { getSecurityAssistantResponse } from '../services/geminiService';

const CameraFeed: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [statusText, setStatusText] = useState("Standby");
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const toggleFeed = () => setIsActive(!isActive);

  const analyzeCurrentFrame = async () => {
    setIsAnalyzing(true);
    setStatusText("Analyzing...");
    const analysis = await getSecurityAssistantResponse("Scan surroundings.");
    setStatusText(analysis || "Secure.");
    setIsAnalyzing(false);
  };

  return (
    <div className="space-y-4">
      <div className="relative aspect-video bg-black rounded-3xl overflow-hidden border border-white/10">
        {!isActive ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
             <Shield className="w-12 h-12 text-cyan-400" />
             <button onClick={toggleFeed} className="px-6 py-2 bg-cyan-600 rounded-full font-bold">Start Feed</button>
          </div>
        ) : (
          <img src="https://picsum.photos/seed/sikkim/1280/720" className="w-full h-full object-cover opacity-60" alt="Live" />
        )}
      </div>
      <div className="p-4 glass rounded-2xl flex items-center justify-between">
        <div className="flex items-center gap-3">
          {isAnalyzing ? <RefreshCw className="w-5 h-5 animate-spin" /> : <Video className="w-5 h-5 text-cyan-400" />}
          <p className="text-sm font-medium">{statusText}</p>
        </div>
        {isActive && (
          <div className="flex gap-2">
            <button onClick={analyzeCurrentFrame} className="p-2 glass rounded-lg"><Smartphone className="w-5 h-5" /></button>
            <button onClick={toggleFeed} className="p-2 bg-red-500/20 text-red-400 rounded-lg"><Square className="w-5 h-5" /></button>
          </div>
        )}
      </div>
    </div>
  );
};
export default CameraFeed;