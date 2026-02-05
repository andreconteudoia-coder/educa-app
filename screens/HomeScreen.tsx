
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
    <div className={`pb-32 pt-6 px-4 max-w-md mx-auto min-h-screen bg-gradient-to-b ${biome.bg}`}>
      {/* Biome Selector Tabs */}
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

      <div className="flex flex-col items-center mb-12">
        <div className={`p-8 rounded-[3rem] w-full border-4 border-violet-100 shadow-xl relative overflow-hidden bg-white/80 backdrop-blur-sm`}>
          <div className="flex items-center gap-6 relative z-10">
            <ZenOwl size={110} level={user.level} />
            <div className="flex-1">
              <h2 className="text-xl font-black text-violet-900 leading-tight">Bioma: {biome.name}</h2>
              <p className="text-xs text-violet-500 font-bold mb-3 italic">"Dê vida a esta região!"</p>
              <button 
                onClick={() => onStartLesson(nextAvailableLesson)}
                className={`mt-2 ${biome.color} text-white text-xs font-black px-5 py-3 rounded-[1.5rem] shadow-[0_4px_0_0_rgba(0,0,0,0.2)] active:shadow-none active:translate-y-1 transition-all flex items-center gap-2 uppercase`}
              >
                <span>Explorar</span>
                <span className="text-sm font-bold">➜</span>
              </button>
            </div>
          </div>
          
          <div className="mt-8 relative z-10">
             <div className="flex justify-between text-[11px] font-black text-violet-800 mb-2 uppercase tracking-widest">
                <span>Vitalidade do Bioma</span>
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

      {/* Lesson List - Learning Trail */}
      <div className="space-y-8 relative">
        <div className="flex items-center justify-between px-2 mb-4">
            <h3 className="font-black text-violet-900 flex items-center gap-3 text-lg">
              <span className="text-2xl">🛤️</span> Caminho de Papel
            </h3>
        </div>
        
        <div className="flex flex-col gap-12 items-center py-6 relative">
          <div className="absolute top-0 bottom-0 left-1/2 w-3 bg-violet-100 -translate-x-1/2 -z-10 rounded-full" />

          {currentSubjectLessons.map((lesson, idx) => {
            const isCompleted = user.completedLessons.includes(lesson.id);
            const isUnlocked = idx === 0 || user.completedLessons.includes(currentSubjectLessons[idx-1].id);
            const isCurrent = !isCompleted && isUnlocked;
            
            return (
              <div key={lesson.id} className="relative flex items-center justify-center w-full">
                <button
                  disabled={!isUnlocked}
                  onClick={() => onStartLesson(lesson)}
                  className={`
                    group relative w-20 h-20 rounded-[1.8rem] flex items-center justify-center
                    border-b-[10px] transition-all active:translate-y-2 active:border-b-[2px]
                    ${isCompleted ? 'bg-yellow-400 border-yellow-600' : 
                      isUnlocked ? `${biome.color} border-black/10` : 'bg-gray-200 border-gray-300 grayscale opacity-60'}
                    ${isCurrent ? 'ring-[8px] ring-yellow-400/30 scale-110 shadow-2xl animate-pulse' : ''}
                  `}
                >
                  <div className="text-3xl text-white">
                    {isCompleted ? '🌱' : isUnlocked ? biome.icon : '🔒'}
                  </div>
                </button>

                <div className={`absolute left-1/2 ml-16 text-left pointer-events-none transition-all ${isUnlocked ? 'opacity-100' : 'opacity-40'}`}>
                   <h4 className={`font-black text-sm leading-tight mb-1 max-w-[120px] ${isUnlocked ? 'text-violet-900' : 'text-gray-400'}`}>
                      {lesson.title}
                   </h4>
                   <p className="text-[9px] text-violet-400 font-black uppercase">Fase {idx + 1}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
