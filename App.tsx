
import React, { useCallback, useState } from 'react';
import { useAppViewModel } from './AppViewModel';
import { Header } from './components/Header';
import { HomeScreen } from './screens/HomeScreen';
import { LessonScreen } from './screens/LessonScreen';
import { ProfileScreen } from './screens/ProfileScreen';
import { WelcomeScreen } from './screens/WelcomeScreen';
import { Subject } from './types';

const App: React.FC = () => {
  const {
    user,
    setName,
    currentScreen,
    setCurrentScreen,
    activeLesson,
    setActiveLesson,
    completeLesson,
    loseHeart,
    refillHearts,
    generateAILesson,
    isLoadingLesson
  } = useAppViewModel();

  const [loadingSubject, setLoadingSubject] = useState<Subject | null>(null);

  const playSuccess = () => new Audio('https://assets.mixkit.co/active_storage/sfx/2000/2000-preview.mp3').play().catch(() => {});
  const playError = () => new Audio('https://assets.mixkit.co/active_storage/sfx/2003/2003-preview.mp3').play().catch(() => {});

  const handleStartLesson = useCallback((subject: Subject, title: string, id: string) => {
    setLoadingSubject(subject);
    generateAILesson(subject, title, id);
  }, [generateAILesson]);

  const handleLessonFinish = useCallback((performance: number) => {
    if (activeLesson) {
      completeLesson(activeLesson.id, performance);
      setActiveLesson(null);
      setCurrentScreen('home');
      playSuccess();
    }
  }, [activeLesson, completeLesson, setActiveLesson, setCurrentScreen]);

  const handleWrongAnswer = useCallback(() => {
    loseHeart();
    playError();
  }, [loseHeart]);

  if (!user.name) {
    return <WelcomeScreen onNameSubmit={setName} />;
  }

  return (
    <div className="min-h-screen bg-[#F5F3FF] flex flex-col font-nunito select-none">
      {isLoadingLesson && (
        <div className="fixed inset-0 z-[100] bg-white/95 flex flex-col items-center justify-center p-8 animate-in fade-in duration-300">
          <div className="w-20 h-20 border-[6px] border-violet-600 border-t-yellow-400 rounded-full animate-spin mb-8 shadow-2xl"></div>
          <h2 className="text-2xl font-black text-violet-900 text-center uppercase tracking-tighter">
            {loadingSubject 
              ? `Evoluindo o ${loadingSubject}...` 
              : "Buscando Sabedoria..."}
          </h2>
          <p className="text-violet-400 mt-3 font-black animate-pulse italic">A semente está germinando...</p>
        </div>
      )}

      {currentScreen !== 'lesson' && (
        <Header 
          user={user} 
          onLeaderboardClick={() => setCurrentScreen('profile')} 
          onRefillHearts={refillHearts}
        />
      )}

      <main className="flex-1 overflow-x-hidden">
        {currentScreen === 'home' && (
          <HomeScreen 
            user={user} 
            onStartLesson={(lesson) => handleStartLesson(lesson.subject, lesson.title, lesson.id)} 
          />
        )}

        {currentScreen === 'lesson' && activeLesson && (
          <LessonScreen 
            lesson={activeLesson}
            hearts={user.hearts}
            level={user.level}
            onFinish={handleLessonFinish}
            onWrong={handleWrongAnswer}
            onCorrect={playSuccess}
            onQuit={() => {
              setActiveLesson(null);
              setCurrentScreen('home');
            }}
          />
        )}

        {currentScreen === 'profile' && (
          <ProfileScreen 
            user={user} 
            onBack={() => setCurrentScreen('home')} 
          />
        )}
      </main>

      {currentScreen !== 'lesson' && (
        <nav className="fixed bottom-0 left-0 right-0 bg-white border-t-4 border-violet-100 flex justify-around py-4 pb-8 shadow-[0_-8px_20px_rgba(124,58,237,0.05)] z-40">
          <button onClick={() => setCurrentScreen('home')} className={`flex flex-col items-center gap-1.5 transition-all ${currentScreen === 'home' ? 'text-violet-600 scale-110' : 'text-gray-300 opacity-60'}`}>
            <span className="text-3xl">🧭</span>
            <span className="text-[10px] font-black uppercase tracking-widest">Explorar</span>
          </button>
          <button onClick={() => setCurrentScreen('profile')} className={`flex flex-col items-center gap-1.5 transition-all ${currentScreen === 'profile' ? 'text-violet-600 scale-110' : 'text-gray-300 opacity-60'}`}>
            <span className="text-3xl">🌱</span>
            <span className="text-[10px] font-black uppercase tracking-widest">Evolução</span>
          </button>
        </nav>
      )}
    </div>
  );
};

export default App;
