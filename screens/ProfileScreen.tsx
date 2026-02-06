
import React from 'react';
import { UserState } from '../types';
import { ZenOwl } from '../components/Mascot';

interface ProfileScreenProps {
  user: UserState;
  onBack: () => void;
  onLogout: () => void;
  onSave: () => void;
  isSaving: boolean;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({ user, onBack, onLogout, onSave, isSaving }) => {
  return (
    <div className="p-6 max-w-md mx-auto animate-in fade-in slide-in-from-bottom-6 duration-700 pb-32">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="text-4xl font-bold text-violet-600 transition-transform active:scale-75">←</button>
          <h1 className="text-2xl font-black text-violet-900 tracking-tighter italic uppercase">Meu Bioma</h1>
        </div>
        
        {/* Indicador de Salvamento */}
        <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full border-2 transition-all duration-500 ${isSaving ? 'bg-yellow-100 border-yellow-400 text-yellow-700' : 'bg-green-100 border-green-400 text-green-700'}`}>
          <span className={`text-xs font-black uppercase tracking-tighter`}>{isSaving ? 'Salvando...' : 'Protegido'}</span>
          <span className="text-sm">{isSaving ? '⏳' : '✅'}</span>
        </div>
      </div>

      <div className="bg-white rounded-[3rem] p-10 border-4 border-violet-50 shadow-xl flex flex-col items-center mb-10 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 bg-yellow-400 text-violet-900 font-black rounded-bl-3xl shadow-md uppercase text-[10px] tracking-widest">Semente da Vida</div>
        <ZenOwl size={140} level={user.level} />
        <h2 className="text-3xl font-black text-violet-900 mt-6">{user.name}</h2>
        <p className="text-violet-500 font-black uppercase tracking-widest text-xs">Explorador de Biomas • Nível {user.level}</p>
        
        <div className="grid grid-cols-2 gap-4 w-full mt-10">
          <div className="bg-yellow-50 p-4 rounded-[1.5rem] border-2 border-yellow-100 text-center">
            <span className="text-2xl block mb-1">🔥</span>
            <span className="font-black text-yellow-700 block text-lg">{user.streak}</span>
            <span className="text-[9px] font-black uppercase text-yellow-600">Dias Seguidos</span>
          </div>
          <div className="bg-violet-50 p-4 rounded-[1.5rem] border-2 border-violet-100 text-center">
            <span className="text-2xl block mb-1">⭐</span>
            <span className="font-black text-violet-700 block text-lg">{user.xp}</span>
            <span className="text-[9px] font-black uppercase text-violet-600">Pontos de Vida</span>
          </div>
        </div>
      </div>

      <div className="space-y-4 mb-10">
        <h3 className="text-xl font-black text-violet-900 px-2 flex items-center gap-3">
          <span className="text-2xl">⚙️</span> Gestão do Saber
        </h3>
        
        <div className="bg-white border-4 border-violet-50 rounded-[2rem] p-6 space-y-4 shadow-sm">
          <button 
            onClick={onSave}
            disabled={isSaving}
            className="w-full py-4 rounded-2xl bg-violet-600 text-white font-black text-sm uppercase tracking-widest flex items-center justify-center gap-3 shadow-[0_4px_0_0_#4C1D95] active:translate-y-1 active:shadow-none transition-all disabled:opacity-50"
          >
            <span>💾</span> {isSaving ? 'Sincronizando...' : 'Gravar Progresso Agora'}
          </button>
          
          <button 
            onClick={onLogout}
            className="w-full py-4 rounded-2xl border-2 border-red-100 text-red-500 font-black text-sm uppercase tracking-widest hover:bg-red-50 transition-colors flex items-center justify-center gap-3"
          >
            <span>🚪</span> Encerrar e Pousar
          </button>
        </div>
        <p className="text-center text-[10px] text-violet-300 font-bold px-4">
          O EDUKÁRDIA grava seu bioma automaticamente, mas você pode garantir o pouso seguro clicando em Gravar.
        </p>
      </div>

      <h3 className="text-xl font-black text-violet-900 mb-6 px-2 flex items-center gap-3">
        <span className="text-2xl">🎖️</span> Coleção de Papel
      </h3>
      <div className="grid grid-cols-3 gap-4">
        {['Sábio', 'Rápido', 'Perfeito', 'Mestre', 'Lenda', 'Fênix'].map((ach) => {
          const isUnlocked = user.level > (['Sábio', 'Rápido', 'Perfeito', 'Mestre', 'Lenda', 'Fênix'].indexOf(ach) * 2);
          return (
            <div key={ach} className={`flex flex-col items-center p-3 rounded-[1.5rem] border-2 transition-all ${isUnlocked ? 'bg-yellow-50 border-yellow-200 scale-105 shadow-md' : 'bg-gray-50 border-violet-50 grayscale opacity-30'}`}>
              <div className="text-3xl mb-1">🏅</div>
              <span className="text-[8px] font-black uppercase text-violet-800 text-center leading-tight">{ach}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
