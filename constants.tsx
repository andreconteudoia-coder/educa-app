
import { Lesson, Subject, Question } from './types';

export const SUBJECTS: Subject[] = ['Português', 'Matemática', 'Ciências', 'História', 'Geografia'];

export const BIOMES: Record<Subject, { name: string, color: string, icon: string, light: string, text: string, bg: string }> = {
  'Português': { name: 'Vale das Letras', color: 'bg-violet-600', icon: '✍️', light: 'bg-violet-50', text: 'text-violet-700', bg: 'from-violet-500/10 to-transparent' },
  'Matemática': { name: 'Floresta dos Números', color: 'bg-yellow-500', icon: '🌲', light: 'bg-yellow-50', text: 'text-yellow-700', bg: 'from-yellow-500/10 to-transparent' },
  'Ciências': { name: 'Oceano da Vida', color: 'bg-indigo-600', icon: '🌊', light: 'bg-indigo-50', text: 'text-indigo-700', bg: 'from-indigo-500/10 to-transparent' },
  'História': { name: 'Cânion do Tempo', color: 'bg-fuchsia-600', icon: '🏜️', light: 'bg-fuchsia-50', text: 'text-fuchsia-700', bg: 'from-fuchsia-500/10 to-transparent' },
  'Geografia': { name: 'Planície do Mundo', color: 'bg-purple-600', icon: '🗺️', light: 'bg-purple-50', text: 'text-purple-700', bg: 'from-purple-500/10 to-transparent' },
};

export const SUBJECT_THEMES = BIOMES;

// Banco de dados local para funcionamento OFFLINE
export const OFFLINE_QUESTION_BANK: Record<Subject, Question[]> = {
  'Matemática': [
    { type: 'multiple-choice', text: 'Quanto é 7 + 8?', options: ['13', '14', '15', '16'], answer: '15', explanation: '7 e 7 são 14, mais um dá 15!', hint: 'Conte nos dedos se precisar!' },
    { type: 'input', text: 'Qual o resultado de 10 menos 4?', answer: '6', explanation: 'Se você tira 4 de 10, sobram 6.', hint: 'Pense em doces sendo comidos!' },
    { type: 'speech', text: 'Diga o nome desta forma: 📐', targetPhrase: 'Triângulo', answer: 'Triângulo', explanation: 'O triângulo tem 3 lados e 3 pontas!', hint: 'Começa com TRI' },
    { type: 'multiple-choice', text: 'Qual número vem depois do 99?', options: ['90', '100', '101', '110'], answer: '100', explanation: 'Depois do 99, entramos na casa das centenas!', hint: 'É o primeiro número de 3 dígitos.' }
  ],
  'Português': [
    { type: 'multiple-choice', text: 'Qual destas letras é uma VOGAL?', options: ['B', 'F', 'E', 'G'], answer: 'E', explanation: 'As vogais são A, E, I, O, U.', hint: 'A primeira letra de Elefante.' },
    { type: 'speech', text: 'Pronuncie a palavra: AMIZADE', targetPhrase: 'Amizade', answer: 'Amizade', explanation: 'Amizade é um dos sentimentos mais bonitos!', hint: 'Diga com clareza.' },
    { type: 'input', text: 'Complete a palavra: G_TO', answer: 'A', explanation: 'Gato se escreve com a vogal A.', hint: 'O animal que faz miau.' }
  ],
  'Ciências': [
    { type: 'multiple-choice', text: 'Qual órgão usamos para RESPIRAR?', options: ['Coração', 'Estômago', 'Pulmão', 'Cérebro'], answer: 'Pulmão', explanation: 'Os pulmões levam o ar para o nosso sangue.', hint: 'Fica dentro do peito.' },
    { type: 'speech', text: 'Como se chama o satélite natural da Terra?', targetPhrase: 'Lua', answer: 'Lua', explanation: 'A Lua brilha no céu à noite!', hint: 'Aparece à noite.' }
  ],
  'História': [
    { type: 'multiple-choice', text: 'Quem descobriu o Brasil para os portugueses?', options: ['D. Pedro', 'Pedro Álvares Cabral', 'Pelé', 'Zico'], answer: 'Pedro Álvares Cabral', explanation: 'Cabral chegou aqui em 1500!', hint: 'O primeiro nome é Pedro.' }
  ],
  'Geografia': [
    { type: 'speech', text: 'Diga o nome do nosso país:', targetPhrase: 'Brasil', answer: 'Brasil', explanation: 'O Brasil é o maior país da América do Sul!', hint: 'Nossa bandeira é verde e amarela.' }
  ]
};

export const INITIAL_LESSONS: Lesson[] = [
  { id: 'por-1', subject: 'Português', title: 'O Voo das Vogais', theory: 'As vogais A, E, I, O, U são as sementes de todas as palavras!', xpReward: 30, questions: [] },
  { id: 'por-2', subject: 'Português', title: 'Sussurros do Texto', theory: 'Ler é ouvir o que o papel tem a dizer. Vamos decifrar a mensagem!', xpReward: 30, questions: [] },
  { id: 'mat-1', subject: 'Matemática', title: 'Raízes da Soma', theory: 'Somar é como plantar: você junta sementes para colher um número maior.', xpReward: 30, questions: [] },
  { id: 'mat-2', subject: 'Matemática', title: 'Geometria das Folhas', theory: 'Formas perfeitas se escondem na natureza. Vamos encontrá-las!', xpReward: 30, questions: [] },
  { id: 'cie-1', subject: 'Ciências', title: 'Mergulho no Corpo', theory: 'Seu corpo é um oceano de vida! Vamos conhecer cada engrenagem.', xpReward: 30, questions: [] },
  { id: 'his-1', subject: 'História', title: 'Ecos do Passado', theory: 'As paredes do cânion guardam as histórias de quem veio antes de nós.', xpReward: 30, questions: [] },
  { id: 'geo-1', subject: 'Geografia', title: 'Visão do Horizonte', theory: 'Mapas são os olhos que nos permitem ver toda a planície de cima.', xpReward: 30, questions: [] },
];

export const FAKE_LEADERBOARD: Record<string, number> = {
  'Sofia Fênix': 3500,
  'Mateus Águia': 3100,
  'Leo Falcão': 2800,
  'Ana Beija-Flor': 2400,
  'Gabriel Condor': 2100,
};
