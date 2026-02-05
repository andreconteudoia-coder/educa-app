
import { Lesson, Subject } from './types';

export const SUBJECTS: Subject[] = ['Português', 'Matemática', 'Ciências', 'História', 'Geografia'];

export const BIOMES: Record<Subject, { name: string, color: string, icon: string, light: string, text: string, bg: string }> = {
  'Português': { name: 'Vale das Letras', color: 'bg-violet-600', icon: '✍️', light: 'bg-violet-50', text: 'text-violet-700', bg: 'from-violet-500/10 to-transparent' },
  'Matemática': { name: 'Floresta dos Números', color: 'bg-yellow-500', icon: '🌲', light: 'bg-yellow-50', text: 'text-yellow-700', bg: 'from-yellow-500/10 to-transparent' },
  'Ciências': { name: 'Oceano da Vida', color: 'bg-indigo-600', icon: '🌊', light: 'bg-indigo-50', text: 'text-indigo-700', bg: 'from-indigo-500/10 to-transparent' },
  'História': { name: 'Cânion do Tempo', color: 'bg-fuchsia-600', icon: '🏜️', light: 'bg-fuchsia-50', text: 'text-fuchsia-700', bg: 'from-fuchsia-500/10 to-transparent' },
  'Geografia': { name: 'Planície do Mundo', color: 'bg-purple-600', icon: '🗺️', light: 'bg-purple-50', text: 'text-purple-700', bg: 'from-purple-500/10 to-transparent' },
};

// Mantendo para compatibilidade de tipos se necessário, mas BIOMES será o foco visual
export const SUBJECT_THEMES = BIOMES;

export const INITIAL_LESSONS: Lesson[] = [
  // LINGUAGENS (Vale das Letras)
  { id: 'por-1', subject: 'Português', title: 'O Voo das Vogais', theory: 'As vogais A, E, I, O, U são as sementes de todas as palavras!', xpReward: 30, questions: [] },
  { id: 'por-2', subject: 'Português', title: 'Sussurros do Texto', theory: 'Ler é ouvir o que o papel tem a dizer. Vamos decifrar a mensagem!', xpReward: 30, questions: [] },
  { id: 'por-3', subject: 'Português', title: 'Nomes de Tudo', theory: 'Tudo o que existe no Vale tem um nome, e chamamos de substantivo.', xpReward: 30, questions: [] },
  
  // MATEMÁTICA (Floresta dos Números)
  { id: 'mat-1', subject: 'Matemática', title: 'Raízes da Soma', theory: 'Somar é como plantar: você junta sementes para colher um número maior.', xpReward: 30, questions: [] },
  { id: 'mat-2', subject: 'Matemática', title: 'Geometria das Folhas', theory: 'Formas perfeitas se escondem na natureza. Vamos encontrá-las!', xpReward: 30, questions: [] },
  { id: 'mat-3', subject: 'Matemática', title: 'Trilhas Lógicas', theory: 'A floresta segue padrões. Se temos 2, 4, 6... qual o próximo passo?', xpReward: 30, questions: [] },

  // CIÊNCIAS (Oceano da Vida)
  { id: 'cie-1', subject: 'Ciências', title: 'Mergulho no Corpo', theory: 'Seu corpo é um oceano de vida! Vamos conhecer cada engrenagem.', xpReward: 30, questions: [] },
  { id: 'cie-2', subject: 'Ciências', title: 'Correntes de Energia', theory: 'A energia flui como a água, mudando de forma e dando vida ao mundo.', xpReward: 30, questions: [] },

  // HISTÓRIA (Cânion do Tempo)
  { id: 'his-1', subject: 'História', title: 'Ecos do Passado', theory: 'As paredes do cânion guardam as histórias de quem veio antes de nós.', xpReward: 30, questions: [] },
  { id: 'his-2', subject: 'História', title: 'Cores de Nossa Gente', theory: 'Nossa história é pintada com a força de muitos povos diferentes.', xpReward: 30, questions: [] },
  
  // GEOGRAFIA (Planície do Mundo)
  { id: 'geo-1', subject: 'Geografia', title: 'Visão do Horizonte', theory: 'Mapas são os olhos que nos permitem ver toda a planície de cima.', xpReward: 30, questions: [] },
  { id: 'geo-2', subject: 'Geografia', title: 'Ventos e Relevos', theory: 'O chão que pisamos e o ar que respiramos mudam de lugar para lugar.', xpReward: 30, questions: [] },
];

export const FAKE_LEADERBOARD: Record<string, number> = {
  'Sofia Fênix': 3500,
  'Mateus Águia': 3100,
  'Leo Falcão': 2800,
  'Ana Beija-Flor': 2400,
  'Gabriel Condor': 2100,
};
