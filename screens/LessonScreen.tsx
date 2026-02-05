
import React, { useState } from 'react';
import { Lesson, Question } from '../types';
import { ZenOwl } from '../components/Mascot';

interface LessonScreenProps {
  lesson: Lesson;
  hearts: number;
  level: number; // Adicionado nível do usuário
  onFinish: (performance: number) => void;
  onWrong: () => void;
  onCorrect: () => void;
  onQuit: () => void;
}

export const LessonScreen: React.FC<LessonScreenProps> = ({ lesson, hearts, level, onFinish, onWrong, onCorrect, onQuit }) => {
  const [stage, setStage] = useState<'theory' | 'quiz'>('theory');
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState('');
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [isVerifyingSpeech, setIsVerifyingSpeech] = useState(false);
  const [score, setScore] = useState(0);
  
  const currentQuestion = lesson.questions[currentQuestionIdx];

  const handleCheck = async () => {
    const normalize = (s: string) => s.trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, ' ');
    
    let isCorrect = false;

    if (currentQuestion.type === 'multiple-choice') {
      if (!selectedOption) return;
      isCorrect = normalize(selectedOption) === normalize(currentQuestion.answer);
    } else if (currentQuestion.type === 'input') {
      if (!inputValue.trim()) return;
      isCorrect = normalize(inputValue) === normalize(currentQuestion.answer);
    }

    if (isCorrect) {
      setFeedback('correct');
      setScore(s => s + 1);
      onCorrect();
    } else {
      setFeedback('wrong');
      onWrong();
    }
  };

  const handleSpeechRecord = async () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert("Microfone não disponível.");
      return;
    }

    setIsRecording(true);
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = 'pt-BR';
    recognition.interimResults = false;

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setIsRecording(false);
      setIsVerifyingSpeech(true);
      
      const normalize = (s: string) => s.trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, ' ');
      const target = normalize(currentQuestion.targetPhrase || currentQuestion.answer);
      const userSaid = normalize(transcript);
      
      if (userSaid.includes(target) || target.includes(userSaid)) {
        setFeedback('correct');
        setScore(s => s + 1);
        onCorrect();
      } else {
        setFeedback('wrong');
        onWrong();
      }
      setIsVerifyingSpeech(false);
    };

    recognition.onerror = () => {
      setIsRecording(false);
      alert("O bioma não te ouviu. Tente de novo!");
    };

    recognition.start();
  };

  const handleNext = () => {
    setFeedback(null);
    setSelectedOption(null);
    setInputValue('');
    if (currentQuestionIdx < lesson.questions.length - 1) {
      setCurrentQuestionIdx(prev => prev + 1);
    } else {
      onFinish(score / lesson.questions.length);
    }
  };

  if (hearts <= 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen px-8 text-center bg-white">
        <ZenOwl mood="sad" size={160} level={level} />
        <h2 className="text-3xl font-black text-violet-900 mt-8 leading-tight">Bioma em Repouso...</h2>
        <p className="text-violet-500 font-bold mt-4 mb-10 text-lg">Suas sementes de energia acabaram. Volte em breve!</p>
        <button onClick={onQuit} className="w-full max-w-xs bg-violet-600 text-white font-black py-5 rounded-[2rem] shadow-[0_8px_0_0_#4C1D95] active:translate-y-1 active:shadow-none transition-all text-xl">
          VOLTAR PARA A VILA
        </button>
      </div>
    );
  }

  return (
    <div className="p-4 max-w-md mx-auto flex flex-col min-h-screen bg-white">
      {/* ProgressBar */}
      <div className="flex items-center gap-4 mb-8 pt-4">
        <button onClick={onQuit} className="text-3xl text-gray-300 font-black hover:text-violet-500 transition-colors">✕</button>
        <div className="flex-1 h-5 bg-violet-50 rounded-full overflow-hidden border-2 border-violet-100 shadow-inner">
          <div className="h-full bg-yellow-400 transition-all duration-700 ease-out" style={{ width: `${(currentQuestionIdx / lesson.questions.length) * 100}%` }} />
        </div>
        <div className="flex items-center gap-1 bg-yellow-50 px-4 py-1.5 rounded-full border-2 border-yellow-200">
          <span className="text-lg">⚡</span>
          <span className="font-black text-violet-900">{hearts}</span>
        </div>
      </div>

      {stage === 'theory' ? (
        <div className="flex-1 flex flex-col animate-in slide-in-from-bottom-6">
          <div className="flex-1 overflow-y-auto pb-10">
            <h1 className="text-3xl font-black text-violet-900 mb-2 leading-tight">{lesson.title}</h1>
            <p className="text-violet-500 font-black mb-6 tracking-widest text-xs uppercase bg-violet-50 inline-block px-4 py-1.5 rounded-2xl">{lesson.subject}</p>
            
            {lesson.conceptImageUrl && (
              <div className="w-full aspect-video bg-violet-50 rounded-[2.5rem] overflow-hidden mb-8 border-4 border-white shadow-2xl flex items-center justify-center">
                <img src={lesson.conceptImageUrl} className="w-full h-full object-cover" alt="Theory" />
              </div>
            )}

            <div className="bg-white border-4 border-violet-50 p-8 rounded-[2.5rem] mb-10 shadow-sm relative">
              <div className="absolute -top-4 left-8 bg-yellow-400 text-violet-900 px-6 py-1.5 rounded-full text-xs font-black uppercase tracking-widest shadow-md">Sussurros do Bioma</div>
              <p className="text-violet-900 text-xl font-bold leading-relaxed pt-2">{lesson.theory}</p>
            </div>
            
            <div className="flex justify-center mb-6">
              <ZenOwl size={150} level={level} />
            </div>
          </div>
          <button onClick={() => setStage('quiz')} className="w-full bg-violet-600 text-white font-black text-2xl py-6 rounded-[2.5rem] shadow-[0_10px_0_0_#4C1D95] active:translate-y-2 active:shadow-none transition-all mb-8 uppercase tracking-tighter">
            INICIAR DESAFIO 🚀
          </button>
        </div>
      ) : (
        <div className="flex-1 flex flex-col animate-in fade-in slide-in-from-right-8">
          <div className="mb-8">
            <h2 className="text-2xl font-black text-violet-900 leading-tight bg-violet-50/50 p-6 rounded-[2rem] border-2 border-violet-100/50">
              {currentQuestion.text}
            </h2>
          </div>

          <div className="flex-1">
            {currentQuestion.type === 'multiple-choice' && (
              <div className="flex flex-col gap-4">
                {currentQuestion.options?.map((option, idx) => (
                  <button
                    key={`${option}-${idx}`}
                    disabled={!!feedback}
                    onClick={() => setSelectedOption(option)}
                    className={`p-5 rounded-[2rem] border-4 font-black text-left transition-all relative ${selectedOption === option ? 'border-yellow-400 bg-yellow-50 text-violet-900 ring-4 ring-yellow-100 shadow-md translate-y-[-4px]' : 'border-violet-50 text-violet-800 hover:border-violet-200'}`}
                  >
                    <div className="flex items-center gap-4">
                      <span className={`w-10 h-10 rounded-2xl border-4 flex items-center justify-center text-sm font-black transition-colors ${selectedOption === option ? 'border-yellow-400 bg-yellow-400 text-violet-900' : 'border-violet-100 bg-white text-violet-300'}`}>{idx + 1}</span>
                      <span className="text-lg">{option}</span>
                    </div>
                  </button>
                ))}
              </div>
            )}

            {currentQuestion.type === 'input' && (
              <div className="flex flex-col gap-6 pt-4">
                <input
                  disabled={!!feedback}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Escreva aqui..."
                  className="w-full p-8 rounded-[2.5rem] border-4 border-violet-100 text-2xl font-black text-violet-900 focus:border-yellow-400 outline-none shadow-inner text-center placeholder:text-violet-200"
                />
              </div>
            )}

            {currentQuestion.type === 'speech' && (
              <div className="flex flex-col items-center justify-center gap-10 pt-10">
                <div className="p-10 bg-white rounded-full border-4 border-yellow-100 shadow-xl relative">
                  <span className="text-6xl">🎙️</span>
                </div>
                <div className="text-center">
                  <p className="text-sm font-black text-violet-400 uppercase tracking-widest mb-3">Diga agora:</p>
                  <p className="text-4xl font-black text-violet-900 italic">"{currentQuestion.targetPhrase || currentQuestion.answer}"</p>
                </div>
                <button 
                  disabled={!!feedback || isRecording || isVerifyingSpeech}
                  onClick={handleSpeechRecord}
                  className={`w-28 h-28 rounded-full flex items-center justify-center text-5xl shadow-2xl transition-all transform active:scale-90 ${isRecording ? 'bg-red-500 animate-bounce' : 'bg-violet-600 hover:bg-violet-700'}`}
                >
                  {isRecording ? '⏹️' : '🎤'}
                </button>
              </div>
            )}
          </div>

          {/* Feedback Overlay */}
          <div className={`fixed bottom-0 left-0 right-0 p-8 pt-10 pb-14 rounded-t-[3.5rem] transition-all duration-700 z-[100] shadow-[0_-10px_40px_rgba(124,58,237,0.1)] ${feedback ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'} ${feedback === 'correct' ? 'bg-green-50 border-t-[12px] border-green-500' : 'bg-red-50 border-t-[12px] border-red-500'}`}>
            <div className="max-w-md mx-auto">
              <div className="flex gap-6 mb-10">
                <div className={`w-20 h-20 rounded-[2rem] flex items-center justify-center text-5xl shadow-lg transform rotate-3 ${feedback === 'correct' ? 'bg-green-500' : 'bg-red-500'}`}>{feedback === 'correct' ? '🌱' : '🪨'}</div>
                <div className="flex-1">
                  <h3 className={`font-black text-3xl mb-2 ${feedback === 'correct' ? 'text-green-900' : 'text-red-900'}`}>{feedback === 'correct' ? 'Vida Nova!' : 'Tente de Novo!'}</h3>
                  <p className="text-lg font-bold text-gray-800 leading-tight">{currentQuestion.explanation}</p>
                </div>
              </div>
              <button onClick={handleNext} className={`w-full py-6 rounded-[2.5rem] font-black text-2xl text-white shadow-xl transform active:translate-y-1 transition-all ${feedback === 'correct' ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600'}`}>
                {currentQuestionIdx === lesson.questions.length - 1 ? 'CONCLUIR JORNADA' : 'CONTINUAR'}
              </button>
            </div>
          </div>

          {!feedback && currentQuestion.type !== 'speech' && (
            <div className="mt-8 pb-8">
              <button 
                disabled={currentQuestion.type === 'multiple-choice' ? !selectedOption : !inputValue.trim()}
                onClick={handleCheck}
                className={`w-full py-6 rounded-[2.5rem] font-black text-2xl text-white shadow-[0_10px_0_0_rgba(0,0,0,0.1)] transition-all uppercase tracking-tighter ${((currentQuestion.type === 'multiple-choice' && selectedOption) || (currentQuestion.type === 'input' && inputValue)) ? 'bg-violet-600' : 'bg-gray-100 text-gray-300'}`}
              >
                VERIFICAR
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
