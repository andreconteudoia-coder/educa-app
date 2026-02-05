
import React from 'react';

export const ZenOwl: React.FC<{ size?: number, mood?: 'happy' | 'thinking' | 'sad', level?: number }> = ({ size = 120, mood = 'happy', level = 1 }) => {
  // Evolução baseada no nível
  const stage = level < 5 ? 'seed' : level < 10 ? 'sprout' : level < 15 ? 'bird' : 'phoenix';

  return (
    <div className="flex flex-col items-center">
      <div className="relative group transition-transform duration-500 hover:scale-110" style={{ width: size, height: size }}>
        <svg width="100%" height="100%" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          {stage === 'seed' && (
            <g className="animate-pulse">
              <path d="M70 130L100 70L130 130L100 160L70 130Z" fill="#F3F4F6" stroke="#D1D5DB" strokeWidth="3" />
              <line x1="85" y1="130" x2="115" y2="130" stroke="#BFDBFE" strokeWidth="1" strokeDasharray="2 2" />
            </g>
          )}

          {stage === 'sprout' && (
            <g>
              <path d="M60 120L100 60L140 120L100 160L60 120Z" fill="#F3F4F6" stroke="#D1D5DB" strokeWidth="2" />
              <path d="M40 80L70 110L100 80L40 80Z" fill="#E5E7EB" stroke="#D1D5DB" strokeWidth="1" /> {/* Pequena asa */}
              <path d="M160 80L130 110L100 80L160 80Z" fill="#E5E7EB" stroke="#D1D5DB" strokeWidth="1" />
            </g>
          )}

          {stage === 'bird' && (
            <g>
              <path d="M40 100L100 40L160 100L100 160L40 100Z" fill="#F3F4F6" stroke="#D1D5DB" strokeWidth="2" />
              <path d="M100 40L130 100L100 130L70 100L100 40Z" fill="white" stroke="#D1D5DB" strokeWidth="1" />
              <path d="M40 100L20 60L70 90L40 100Z" fill="#E5E7EB" stroke="#D1D5DB" strokeWidth="2" />
              <path d="M160 100L180 60L130 90L160 100Z" fill="#E5E7EB" stroke="#D1D5DB" strokeWidth="2" />
            </g>
          )}

          {stage === 'phoenix' && (
            <g className="animate-pulse">
              {/* Glow Effect */}
              <circle cx="100" cy="100" r="80" fill="url(#phoenixGlow)" fillOpacity="0.2" />
              <defs>
                <radialGradient id="phoenixGlow">
                  <stop offset="0%" stopColor="#7C3AED" />
                  <stop offset="100%" stopColor="transparent" />
                </radialGradient>
              </defs>
              {/* Phoenix Body */}
              <path d="M40 100L100 20L160 100L100 180L40 100Z" fill="#7C3AED" stroke="#FACC15" strokeWidth="3" />
              {/* Grand Wings */}
              <path d="M40 100L0 20L80 80L40 100Z" fill="#8B5CF6" stroke="#FACC15" strokeWidth="2" />
              <path d="M160 100L200 20L120 80L160 100Z" fill="#8B5CF6" stroke="#FACC15" strokeWidth="2" />
              {/* Fire Tail */}
              <path d="M100 180L80 200L120 200L100 180Z" fill="#FACC15" />
            </g>
          )}

          {/* Eyes & Beak - Common to stages with heads */}
          {stage !== 'seed' && (
            <>
              <path d="M100 40L92 25L108 25L100 40Z" fill="#FACC15" />
              {mood === 'happy' ? (
                <>
                  <circle cx="92" cy="50" r="3" fill="#4B5563" />
                  <circle cx="108" cy="50" r="3" fill="#4B5563" />
                </>
              ) : mood === 'sad' ? (
                <>
                  <path d="M88 55Q92 50 96 55" stroke="#4B5563" strokeWidth="2" fill="none" />
                  <path d="M104 55Q108 50 112 55" stroke="#4B5563" strokeWidth="2" fill="none" />
                </>
              ) : (
                <>
                  <rect x="88" y="50" width="8" height="2" fill="#4B5563" rx="1" />
                  <rect x="104" y="50" width="8" height="2" fill="#4B5563" rx="1" />
                </>
              )}
            </>
          )}
        </svg>
      </div>
      
      <div className={`mt-2 font-black bg-white px-4 py-1.5 rounded-2xl shadow-md border-b-4 text-xs tracking-tighter transition-colors ${mood === 'sad' ? 'text-red-600 border-red-100' : 'text-violet-700 border-violet-100'}`}>
        {stage === 'seed' && "UMA SEMENTE SURGE..."}
        {stage === 'sprout' && "ALGO ESTÁ CRESCENDO!"}
        {stage === 'bird' && (mood === 'happy' ? "PRONTO PARA VOAR!" : "ASAS CANSADAS...")}
        {stage === 'phoenix' && "MESTRE DOS BIOMAS! 🔥"}
      </div>
    </div>
  );
};
