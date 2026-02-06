import { useState, useEffect, useCallback } from 'react';
import { UserState, Lesson, Question, Subject } from './types';
import { INITIAL_LESSONS } from './constants';
import { GoogleGenAI, Type } from "@google/genai";
import { OFFLINE_QUESTIONS } from './offline-questions';

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

  useEffect(() => {
    localStorage.setItem('edukardia_state_v1', JSON.stringify(user));
  }, [user]);

  const generateAILesson = async (subject: Subject, title: string, lessonId: string) => {
    setIsLoadingLesson(true);
    
    if (navigator.onLine) {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

      try {
        const prompt = `Você é o mentor da plataforma EDUKÁRDIA, especialista em ${subject} para o Ensino Fundamental.\
Crie uma jornada interativa de 10 passos (questões) sobre: \"${title}\".\
\
IMPORTANTE - Misture estes tipos de desafios:\
1. 'multiple-choice': 4 opções clássicas.\
2. 'input': O aluno digita a resposta curta.\
3. 'speech': Peça para o aluno pronunciar algo importante.\
\
Regras: Linguagem vibrante, pedagógica e cheia de incentivos.\
\
Retorne um array JSON:\
{ \
  \"type\": \"multiple-choice\" | \"input\" | \"speech\", \
  \"text\": \"Comando/Pergunta\", \
  \"options\": [\"...\", \"...\", \"...\", \"...\"], \
  \"answer\": \"Correção Exata\", \
  \"targetPhrase\": \"O que deve ser falado\", \
  \"explanation\": \"Pílula de conhecimento curta\", \
  \"hint\": \"Dica rápida\" \
}`;

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

        const imageResponse = await ai.models.generateContent({
          model: 'gemini-2.5-flash-image',
          contents: {
            parts: [{ text: `A vibrant, paper-craft or origami style educational 2D illustration for children about ${subject}: ${title}. Electric purple and bright yellow highlights, high quality vector.` }]
          }
        });
        
        let imageUrl = "";
        if (imageResponse.candidates?.[0]?.content?.parts) {
          for (const part of imageResponse.candidates[0].content.parts) {
            if (part.inlineData) {
              imageUrl = `data:image/png;base64,${part.inlineData.data}`;
              break;
            }
          }
        }

        const newLesson: Lesson = {
          id: lessonId,
          subject,
          title,
          theory: `Pronto para alçar voo em ${subject}? Vamos explorar \"${title}\" juntos!`,
          questions: questions.slice(0, 10),
          xpReward: 50,
          conceptImageUrl: imageUrl
        };

        setActiveLesson(newLesson);
        setCurrentScreen('lesson');
      } catch (error) {
        console.error("Erro EDUKÁRDIA AI:", error);
        alert("Nossa biblioteca de papel está sendo reorganizada. Tente de novo!");
      } finally {
        setIsLoadingLesson(false);
      }
    } else {
      // Offline mode
      const offlineQuestions = OFFLINE_QUESTIONS[lessonId];
      if (offlineQuestions) {
        const newLesson: Lesson = {
          id: lessonId,
          subject,
          title,
          theory: `Modo offline: Pronto para alçar voo em ${subject}? Vamos explorar \"${title}\" juntos!`,
          questions: offlineQuestions.slice(0, 10),
          xpReward: 50,
          conceptImageUrl: '' // No image for offline
        };
        setActiveLesson(newLesson);
        setCurrentScreen('lesson');
      } else {
        alert("Lição não disponível offline.");
      }
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