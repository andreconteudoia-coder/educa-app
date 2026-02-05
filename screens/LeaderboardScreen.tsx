
import React from 'react';
import { FAKE_LEADERBOARD } from '../constants';
import { UserState } from '../types';

interface LeaderboardScreenProps {
  user: UserState;
  onBack: () => void;
}

export const LeaderboardScreen: React.FC<LeaderboardScreenProps> = ({ user, onBack }) => {
  const entries = [
    ...Object.entries(FAKE_LEADERBOARD).map(([name, xp]) => ({ name, xp, isUser: false })),
    { name: user.name || 'Você', xp: user.xp, isUser: true }
  ].sort((a, b) => b.xp - a.xp);

  return (
    <div className="p-6 max-w-md mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <button onClick={onBack} className="text-3xl font-bold text-teal-600">←</button>
        <h1 className="text-2xl font-black text-teal-900">Ranking Zen</h1>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border-2 border-teal-100 overflow-hidden">
        {entries.map((entry, idx) => (
          <div 
            key={`${entry.name}-${idx}`}
            className={`
              flex items-center gap-4 p-4 border-b border-teal-50 last:border-none
              ${entry.isUser ? 'bg-teal-50' : ''}
            `}
          >
            <div className={`
              w-8 h-8 rounded-full flex items-center justify-center font-black 
              ${idx < 3 ? 'bg-yellow-100 text-yellow-700' : 'bg-teal-100 text-teal-700'}
            `}>
              {idx + 1}
            </div>
            <div className={`flex-1 font-bold ${entry.isUser ? 'text-teal-800' : 'text-gray-700'}`}>
              {entry.name} {entry.isUser && '(Eu)'}
            </div>
            <div className="font-black text-teal-600">{entry.xp} XP</div>
          </div>
        ))}
      </div>
      
      <div className="mt-10 text-center">
        <div className="text-4xl mb-4">🏆</div>
        <p className="text-teal-600 font-bold italic">
          O ranking reinicia toda semana.<br/>Continue aprendendo para subir!
        </p>
      </div>
    </div>
  );
};
