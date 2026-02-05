
import React, { useState } from 'react';
import { ZenOwl } from '../components/Mascot';

interface WelcomeScreenProps {
  onNameSubmit: (name: string) => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onNameSubmit }) => {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim().length >= 2) {
      onNameSubmit(inputValue.trim());
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F3FF] p-8 flex flex-col items-center justify-center animate-in fade-in duration-1000">
      <div className="relative mb-10">
        <div className="absolute inset-0 bg-violet-400 rounded-full blur-3xl opacity-10 scale-150 animate-pulse"></div>
        <ZenOwl size={180} level={1} />
      </div>
      
      <div className="text-center w-full max-w-sm relative z-10">
        <h1 className="text-5xl font-black text-violet-900 mb-2 tracking-tighter italic">EDUKÁRDIA</h1>
        <p className="text-violet-600 font-extrabold mb-12 text-lg">Seu Bioma de Sabedoria Offline</p>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <input
              autoFocus
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Como você se chama?"
              className="w-full bg-white border-4 border-violet-100 rounded-[2.5rem] px-8 py-6 text-xl font-black text-violet-900 outline-none focus:border-yellow-400 focus:ring-8 focus:ring-yellow-100 transition-all text-center shadow-lg placeholder:text-violet-200"
              maxLength={15}
            />
          </div>
          
          <button
            type="submit"
            disabled={inputValue.trim().length < 2}
            className={`
              w-full py-6 rounded-[2.5rem] font-black text-2xl text-white transition-all transform active:scale-95
              ${inputValue.trim().length >= 2 
                ? 'bg-violet-600 shadow-[0_8px_0_0_#4C1D95] hover:bg-violet-700' 
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'}
            `}
          >
            DECOLAR! 🚀
          </button>
        </form>
      </div>
    </div>
  );
};
