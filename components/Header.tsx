
import React from 'react';
import { UserState } from '../types';

interface HeaderProps {
  user: UserState;
  onLeaderboardClick: () => void;
  onRefillHearts: () => void;
}

export const Header: React.FC<HeaderProps> = ({ user, onLeaderboardClick, onRefillHearts }) => {
  return (
    <div className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b-4 border-violet-100 px-6 py-4 flex items-center justify-between shadow-sm">
      <div className="flex gap-5">
        {/* Streak */}
        <div className="flex items-center gap-1.5 bg-yellow-50 px-3 py-1 rounded-2xl border-2 border-yellow-100">
          <span className="text-2xl">🔥</span>
          <span className="font-black text-yellow-700 text-lg">{user.streak}</span>
        </div>
        
        {/* Gems */}
        <div className="flex items-center gap-1.5 bg-violet-50 px-3 py-1 rounded-2xl border-2 border-violet-100">
          <span className="text-2xl">💎</span>
          <span className="font-black text-violet-700 text-lg">{user.gems}</span>
        </div>
        
        {/* Hearts */}
        <button 
          onClick={onRefillHearts}
          className={`flex items-center gap-1.5 px-3 py-1 rounded-2xl border-2 transition-all active:scale-90 ${user.hearts > 0 ? 'bg-red-50 border-red-100' : 'bg-gray-50 border-gray-200'}`}
        >
          <span className="text-2xl">{user.hearts > 0 ? '⚡' : '💀'}</span>
          <span className={`font-black text-lg ${user.hearts > 0 ? 'text-red-600' : 'text-gray-400'}`}>
            {user.hearts}
          </span>
        </button>
      </div>

      <button 
        onClick={onLeaderboardClick}
        className="bg-yellow-400 hover:bg-yellow-500 p-3 rounded-2xl transition-all shadow-md active:translate-y-1"
      >
        <span className="text-2xl">🏆</span>
      </button>
    </div>
  );
};
