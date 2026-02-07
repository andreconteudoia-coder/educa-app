
import React, { useState, useMemo } from 'react';
import { Subject, Lesson, UserState } from '../types';
import { INITIAL_LESSONS, SUBJECTS, BIOMES } from '../constants';
import { ZenOwl } from '../components/Mascot';

interface HomeScreenProps {
  user: UserState;
  onStartLesson: (lesson: Lesson) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ user, onStartLesson }) => {
  const [selectedSubject, setSelectedSubject] = useState<Subject>('Português');

  const currentSubjectLessons = useMemo(() => 
    INITIAL_LESSONS.filter(l => l.subject === selectedSubject),
    [selectedSubject]
  );

  const completedCount = useMemo(() => 
    currentSubjectLessons.filter(l => user.completedLessons.includes(l.id)).length,
    [currentSubjectLessons, user.completedLessons]
  );

  const progressPercent = (completedCount / currentSubjectLessons.length) * 100;

  const nextAvailableLesson = useMemo(() => {
    return currentSubjectLessons.find(l => !user.completedLessons.includes(l.id)) || currentSubjectLessons[0];
  }, [currentSubjectLessons, user.completedLessons]);

  const biome = BIOMES[selectedSubject];

  return (
    <div className={`pb-40 pt-6 px-4 max-w-md mx-auto min-h-screen bg-gradient-to-b ${biome.bg}`}>
      {/* Biome Selector */}
      <div className="flex overflow-x-auto gap-4 pb-8 mb-6 no-scrollbar -mx-4 px-4">
        {SUBJECTS.map((subject) => (
          <button
            key={subject}
            onClick={() => setSelectedSubject(subject)}
            className={`
              flex flex-col items-center min-w-[100px] p-4 rounded-3xl transition-all border-4
              ${selectedSubject === subject 
                ? `${BIOMES[subject].color} border-yellow-400 scale-110 shadow-xl` 
                : 'bg-white border-violet-50 text-violet-900 hover:bg-violet-50'}
            `}
          >
            <span className="text-3xl mb-1">{BIOMES[subject].icon}</span>
            <span className={`text-[9px] font-black uppercase tracking-tighter leading-tight text-center ${selectedSubject === subject ? 'text-white' : 'text-violet-400'}`}>
              {BIOMES[subject].name}
            </span>
          </button>
        ))}
      </div>

      <div className="flex flex-col items-center mb-10">
        <div className={`p-8 rounded-[3rem] w-full border-4 border-violet-100 shadow-xl bg-white/80 backdrop-blur-sm`}>
          <div className="flex items-center gap-6">
            <ZenOwl size={100} level={user.level} />
            <div className="flex-1">
              <h2 className="text-xl font-black text-violet-900 leading-tight">Explorador {user.name}</h2>
              <p className="text-xs text-violet-500 font-bold mb-3 italic">Estágio: {biome.name}</p>
              <button 
                onClick={() => onStartLesson(nextAvailableLesson)}
                className={`w-full ${biome.color} text-white text-[10px] font-black py-3 rounded-2xl shadow-[0_4px_0_0_rgba(0,0,0,0.2)] active:translate-y-1 active:shadow-none transition-all flex items-center justify-center gap-2 uppercase`}
              >
                <span>{progressPercent === 100 ? 'Revisar Bioma' : 'Próximo Desafio'}</span>
                <span>➜</span>
              </button>
            </div>
          </div>
          
          <div className="mt-8">
             <div className="flex justify-between text-[10px] font-black text-violet-800 mb-1.5 uppercase tracking-widest">
                <span>Progresso no Bioma</span>
                <span>{Math.round(progressPercent)}%</span>
             </div>
             <div className="h-4 bg-violet-50 rounded-full overflow-hidden border-2 border-violet-100">
                <div 
                  className={`h-full ${biome.color} transition-all duration-1000 ease-out`}
                  style={{ width: `${progressPercent}%` }}
                />
             </div>
          </div>
        </div>
      </div>

      {/* Unique Lesson Path */}
      <div className="space-y-12 relative pb-10">
        <div className="flex flex-col gap-14 items-center py-6 relative">
          <div className="absolute top-0 bottom-0 left-1/2 w-4 bg-violet-100/50 -translate-x-1/2 -z-10 rounded-full shadow-inner" />

          {currentSubjectLessons.map((lesson, idx) => {
            const isCompleted = user.completedLessons.includes(lesson.id);
            const isUnlocked = idx === 0 || user.completedLessons.includes(currentSubjectLessons[idx-1].id);
            const isCurrent = !isCompleted && isUnlocked;
            
            return (
              <div key={lesson.id} className="relative flex items-center justify-center w-full">
                <div className={`absolute -left-1 text-right pr-20 pointer-events-none transition-all w-1/2 ${isUnlocked ? 'opacity-100' : 'opacity-30'}`}>
                   <h4 className={`font-black text-xs leading-tight mb-1 ${isCompleted ? 'text-green-600' : isUnlocked ? 'text-violet-900' : 'text-gray-400'}`}>
                      {lesson.title}
                   </h4>
                   <p className="text-[8px] text-violet-400 font-black uppercase">Módulo {idx + 1}</p>
                </div>

                <button
                  disabled={!isUnlocked}
                  onClick={() => onStartLesson(lesson)}
                  className={`
                    group relative w-24 h-24 rounded-[2.2rem] flex items-center justify-center
                    border-b-[12px] transition-all active:translate-y-2 active:border-b-[2px]
                    ${isCompleted ? 'bg-green-400 border-green-600' : 
                      isUnlocked ? `${biome.color} border-black/10` : 'bg-gray-200 border-gray-300 grayscale opacity-60'}
                    ${isCurrent ? 'ring-[10px] ring-yellow-400/30 scale-110 shadow-2xl animate-pulse' : ''}
                  `}
                >
                  <div className="text-4xl text-white drop-shadow-md">
                    {isCompleted ? '✅' : isUnlocked ? biome.icon : '🔒'}
                  </div>
                  {isCompleted && (
                    <div className="absolute -top-3 -right-3 bg-yellow-400 rounded-full w-10 h-10 flex items-center justify-center border-4 border-white shadow-lg animate-bounce">
                      <span className="text-sm">⭐</span>
                    </div>
                  )}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
