
import { useState, useEffect, useCallback } from 'react';
import { UserState, Lesson, Question, Subject } from './types';
import { INITIAL_LESSONS, OFFLINE_QUESTION_BANK } from './constants';
import { GoogleGenAI, Type } from "@google/genai";

export const useAppViewModel = () => {
  const [user, setUser] = useState<UserState>(() => {
    const saved = localStorage.getItem('edukardia_state_v1');
    return saved ? JSON.parse(saved) : {
      name: '',
      xp: 0,
      hearts: 5,
      gems: 50,
      streak: 0,
      lastLessonDate: null,
      completedLessons: [],
      level: 1,
      achievements: []
    };
  });

  const [currentScreen, setCurrentScreen] = useState<'home' | 'lesson' | 'profile'>('home');
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);
  const [isLoadingLesson, setIsLoadingLesson] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Persistência Automática: Grava sempre que o usuário mudar
  useEffect(() => {
    localStorage.setItem('edukardia_state_v1', JSON.stringify(user));
  }, [user]);

  const saveProgressManually = useCallback(() => {
    setIsSaving(true);
    localStorage.setItem('edukardia_state_v1', JSON.stringify(user));
    // Simula um delay de "sincronização" para feedback visual
    setTimeout(() => setIsSaving(false), 800);
  }, [user]);

  const logout = useCallback(() => {
    saveProgressManually();
    // Apenas limpa o nome para voltar ao Welcome, mas mantém os dados no localStorage
    setUser(prev => ({ ...prev, name: '' }));
  }, [saveProgressManually]);

  const generateAILesson = async (subject: Subject, title: string, lessonId: string) => {
    setIsLoadingLesson(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const prompt = `Você é o mentor da plataforma EDUKÁRDIA, especialista em ${subject} para o Ensino Fundamental.
      Crie uma jornada interativa de 10 passos (questões) sobre: "${title}".
      Misture tipos: 'multiple-choice', 'input', 'speech'.
      Retorne JSON: [{ type, text, options, answer, targetPhrase, explanation, hint }]`;

      const response = await ai.models.generateContent({
        model: "gemini-3-pro-preview",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                type: { type: Type.STRING },
                text: { type: Type.STRING },
                options: { type: Type.ARRAY, items: { type: Type.STRING } },
                answer: { type: Type.STRING },
                targetPhrase: { type: Type.STRING },
                explanation: { type: Type.STRING },
                hint: { type: Type.STRING },
              },
              required: ["type", "text", "answer", "explanation", "hint"]
            }
          }
        }
      });

      const questions = JSON.parse(response.text || "[]") as Question[];
      const newLesson: Lesson = {
        id: lessonId,
        subject,
        title,
        theory: `Pronto para explorar o bioma ${subject}? Vamos juntos aprender sobre "${title}"!`,
        questions: questions.slice(0, 10),
        xpReward: 50
      };
      setActiveLesson(newLesson);
      setCurrentScreen('lesson');
    } catch (error) {
      const localQuestions = [...OFFLINE_QUESTION_BANK[subject]];
      const shuffled = localQuestions.sort(() => 0.5 - Math.random());
      const offlineLesson: Lesson = {
        id: lessonId,
        subject,
        title: `${title} (Offline)`,
        theory: `Você está no modo offline! O conhecimento continua fluindo.`,
        questions: shuffled.slice(0, 10),
        xpReward: 40
      };
      setActiveLesson(offlineLesson);
      setCurrentScreen('lesson');
    } finally {
      setIsLoadingLesson(false);
    }
  };

  const setName = useCallback((name: string) => setUser(prev => ({ ...prev, name })), []);

  const completeLesson = useCallback((lessonId: string, performance: number) => {
    setUser(prev => {
      const earnedXp = Math.round(50 * performance) + 20;
      const isNew = !prev.completedLessons.includes(lessonId);
      const newCompleted = isNew ? [...prev.completedLessons, lessonId] : prev.completedLessons;
      return {
        ...prev,
        xp: prev.xp + earnedXp,
        level: Math.floor((prev.xp + earnedXp) / 400) + 1,
        completedLessons: newCompleted,
        gems: prev.gems + (performance === 1 ? 30 : 10),
      };
    });
  }, []);

  const loseHeart = useCallback(() => setUser(prev => ({ ...prev, hearts: Math.max(0, prev.hearts - 1) })), []);
  
  const refillHearts = useCallback(() => {
    if (user.gems >= 50) {
      setUser(prev => ({ ...prev, hearts: 5, gems: prev.gems - 50 }));
      return true;
    }
    return false;
  }, [user.gems]);

  return {
    user,
    setName,
    logout,
    saveProgressManually,
    isSaving,
    currentScreen,
    setCurrentScreen,
    activeLesson,
    setActiveLesson,
    completeLesson,
    loseHeart,
    refillHearts,
    generateAILesson,
    isLoadingLesson
  };
};
