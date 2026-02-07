
import { useState, useEffect, useCallback } from 'react';
import { UserState, Lesson, Question, Subject } from './types';
import { INITIAL_LESSONS, OFFLINE_QUESTION_BANK } from './constants';
import { GoogleGenAI, Type } from "@google/genai";

const EMPTY_USER: UserState = {
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

const cleanAIJson = (text: string) => {
  // Remove blocos de código markdown se existirem
  let cleaned = text.replace(/```json/g, '').replace(/```/g, '').trim();
  // Se ainda houver texto antes ou depois do array [], tenta extrair apenas o array
  const match = cleaned.match(/\[.*\]/s);
  return match ? match[0] : cleaned;
};

export const useAppViewModel = () => {
  const [allProfiles, setAllProfiles] = useState<Record<string, UserState>>(() => {
    const saved = localStorage.getItem('edukardia_global_profiles_v4');
    return saved ? JSON.parse(saved) : {};
  });

  const [user, setUser] = useState<UserState>(EMPTY_USER);
  const [currentScreen, setCurrentScreen] = useState<'home' | 'lesson' | 'profile'>('home');
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);
  const [isLoadingLesson, setIsLoadingLesson] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    localStorage.setItem('edukardia_global_profiles_v4', JSON.stringify(allProfiles));
  }, [allProfiles]);

  const syncProgress = useCallback((currentUser: UserState) => {
    if (!currentUser.name) return;
    setAllProfiles(prev => ({
      ...prev,
      [currentUser.name.trim().toLowerCase()]: currentUser
    }));
  }, []);

  const saveProgressManually = useCallback(() => {
    setIsSaving(true);
    syncProgress(user);
    setTimeout(() => setIsSaving(false), 800);
  }, [user, syncProgress]);

  const logout = useCallback(() => {
    syncProgress(user);
    setUser(EMPTY_USER);
    setCurrentScreen('home');
  }, [user, syncProgress]);

  const setName = useCallback((name: string) => {
    const key = name.trim().toLowerCase();
    if (allProfiles[key]) {
      setUser(allProfiles[key]);
    } else {
      const newUser = { ...EMPTY_USER, name: name.trim() };
      setUser(newUser);
      setAllProfiles(prev => ({ ...prev, [key]: newUser }));
    }
  }, [allProfiles]);

  const generateAILesson = async (subject: Subject, title: string, lessonId: string) => {
    setIsLoadingLesson(true);
    try {
      // Tenta IA se houver chave configurada e for válida
      if (process.env.API_KEY && process.env.API_KEY !== 'YOUR_API_KEY') {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const prompt = `Gere exatamente 10 questões didáticas para crianças (BNCC Fundamental 1) sobre: "${title}" na matéria de ${subject}.
        Tipos permitidos: 'multiple-choice', 'input'. Retorne APENAS um array JSON puro.`;
        
        const response = await ai.models.generateContent({
          model: "gemini-3-flash-preview",
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
                  explanation: { type: Type.STRING },
                  hint: { type: Type.STRING }
                },
                required: ["type", "text", "answer", "explanation", "hint"]
              }
            }
          }
        });

        const cleanedJson = cleanAIJson(response.text || "[]");
        const questions = JSON.parse(cleanedJson) as Question[];
        
        if (questions && questions.length > 0) {
          setActiveLesson({ id: lessonId, subject, title, theory: `Iniciando lição ${title}...`, questions, xpReward: 50 });
          setCurrentScreen('lesson');
          setIsLoadingLesson(false);
          return;
        }
      }
      throw new Error("AI Fallback triggered");
    } catch (error) {
      console.warn("AI falhou ou ausente, usando banco offline.", error);
      
      // FALLBACK SEGURO: Busca por ID específico primeiro, depois por matéria
      let fallbackPool = OFFLINE_QUESTION_BANK[lessonId] || OFFLINE_QUESTION_BANK[subject] || [];
      
      // Se ainda estiver vazio (segurança extra), usa uma questão de emergência
      if (fallbackPool.length === 0) {
        fallbackPool = [{
          type: 'multiple-choice',
          text: `Bem-vindo ao Bioma de ${subject}! Vamos começar?`,
          options: ['Sim!', 'Claro!', 'Com certeza!'],
          answer: 'Sim!',
          explanation: 'Isso aí! O aprendizado é uma aventura.',
          hint: 'Escolha qualquer uma!'
        }];
      }

      setActiveLesson({
        id: lessonId,
        subject,
        title: `${title}`,
        theory: `Bem-vindo ao módulo de ${title}. O conhecimento está em todo lugar no nosso bioma!`,
        questions: [...fallbackPool].sort(() => 0.5 - Math.random()),
        xpReward: 40
      });
      setCurrentScreen('lesson');
    } finally {
      setIsLoadingLesson(false);
    }
  };

  const completeLesson = useCallback((lessonId: string, performance: number) => {
    setUser(prev => {
      const earnedXp = Math.round(50 * performance) + 20;
      const isNew = !prev.completedLessons.includes(lessonId);
      const newCompleted = isNew ? [...prev.completedLessons, lessonId] : prev.completedLessons;
      
      const updatedUser = {
        ...prev,
        xp: prev.xp + earnedXp,
        level: Math.floor((prev.xp + earnedXp) / 400) + 1,
        completedLessons: newCompleted,
        gems: prev.gems + (performance === 1 ? 30 : 10),
      };

      setAllProfiles(all => ({ ...all, [updatedUser.name.trim().toLowerCase()]: updatedUser }));
      return updatedUser;
    });
  }, []);

  const loseHeart = useCallback(() => {
    setUser(prev => {
      const updated = { ...prev, hearts: Math.max(0, prev.hearts - 1) };
      setAllProfiles(all => ({ ...all, [updated.name.trim().toLowerCase()]: updated }));
      return updated;
    });
  }, []);
  
  const refillHearts = useCallback(() => {
    if (user.gems >= 50) {
      setUser(prev => {
        const updated = { ...prev, hearts: 5, gems: prev.gems - 50 };
        setAllProfiles(all => ({ ...all, [updated.name.trim().toLowerCase()]: updated }));
        return updated;
      });
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
