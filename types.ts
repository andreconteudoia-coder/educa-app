
export type Subject = 'Português' | 'Matemática' | 'Ciências' | 'História' | 'Geografia';

export interface Question {
  id?: string;
  type: 'multiple-choice' | 'input' | 'speech';
  text: string;
  options?: string[]; // Opcional para input/speech
  answer: string;
  explanation: string;
  hint: string;
  targetPhrase?: string; // Para exercícios de fala
}

export interface Lesson {
  id: string;
  title: string;
  subject: Subject;
  theory: string;
  questions: Question[];
  xpReward: number;
  conceptImageUrl?: string;
}

export interface UserState {
  name: string;
  xp: number;
  hearts: number;
  gems: number;
  streak: number;
  lastLessonDate: string | null;
  completedLessons: string[];
  level: number;
  achievements: string[];
}
