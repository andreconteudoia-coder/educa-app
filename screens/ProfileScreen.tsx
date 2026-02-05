
import React from 'react';
import { UserState } from '../types';
import { ZenOwl } from '../components/Mascot';

interface ProfileScreenProps {
  user: UserState;
  onBack: () => void;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({ user, onBack }) => {
  return (
    <div className="p-6 max-w-md mx-auto animate-in fade-in slide-in-from-bottom-6 duration-700">
      <div className="flex items-center gap-4 mb-10">
        <button onClick={onBack} className="text-4xl font-bold text-violet-600 transition-transform active:scale-75">←</button>
        <h1 className="text-3xl font-black text-violet-900 tracking-tighter italic uppercase">Minhas Asas</h1>
      </div>

      <div className="bg-white rounded-[3rem] p-10 border-4 border-violet-50 shadow-xl flex flex-col items-center mb-10 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 bg-yellow-400 text-violet-900 font-black rounded-bl-3xl shadow-md uppercase text-xs tracking-widest">Explorador</div>
        <ZenOwl size={120} />
        <h2 className="text-3xl font-black text-violet-900 mt-6">{user.name}</h2>
        <p className="text-violet-500 font-black uppercase tracking-widest text-sm">Nível {user.level} Alcançado</p>
        
        <div className="grid grid-cols-2 gap-6 w-full mt-10">
          <div className="bg-yellow-50 p-5 rounded-[2rem] border-4 border-yellow-100 text-center shadow-inner">
            <span className="text-3xl block mb-2">🔥</span>
            <span className="font-black text-yellow-700 block text-lg">{user.streak}</span>
            <span className="text-[10px] font-black uppercase text-yellow-600">Dias</span>
          </div>
          <div className="bg-violet-50 p-5 rounded-[2rem] border-4 border-violet-100 text-center shadow-inner">
            <span className="text-3xl block mb-2">⭐</span>
            <span className="font-black text-violet-700 block text-lg">{user.xp}</span>
            <span className="text-[10px] font-black uppercase text-violet-600">XP Total</span>
          </div>
        </div>
      </div>

      <h3 className="text-2xl font-black text-violet-900 mb-6 px-2 flex items-center gap-3">
        <span className="text-3xl">🎖️</span> Insígnias de Papel
      </h3>
      <div className="grid grid-cols-3 gap-5">
        {['Sábio', 'Rápido', 'Perfeito', 'Persistente', 'Mestre', 'Lenda'].map((ach) => {
          const isUnlocked = user.achievements.includes(ach) || user.level > (['Sábio', 'Rápido', 'Perfeito', 'Persistente', 'Mestre', 'Lenda'].indexOf(ach) + 1);
          return (
            <div key={ach} className={`flex flex-col items-center p-4 rounded-[2rem] border-4 transition-all ${isUnlocked ? 'bg-yellow-50 border-yellow-200 scale-105 shadow-md' : 'bg-gray-50 border-violet-50 grayscale opacity-30'}`}>
              <div className="text-4xl mb-2">🏅</div>
              <span className="text-[10px] font-black uppercase text-violet-800 text-center leading-tight">{ach}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
