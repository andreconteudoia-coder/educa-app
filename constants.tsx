
import { Lesson, Subject, Question } from './types';

export const SUBJECTS: Subject[] = ['Português', 'Matemática', 'Ciências', 'História', 'Geografia'];

export const BIOMES: Record<Subject, { name: string, color: string, icon: string, light: string, text: string, bg: string }> = {
  'Português': { name: 'Vale das Letras', color: 'bg-violet-600', icon: '✍️', light: 'bg-violet-50', text: 'text-violet-700', bg: 'from-violet-500/10 to-transparent' },
  'Matemática': { name: 'Floresta dos Números', color: 'bg-yellow-500', icon: '🌲', light: 'bg-yellow-50', text: 'text-yellow-700', bg: 'from-yellow-500/10 to-transparent' },
  'Ciências': { name: 'Oceano da Vida', color: 'bg-indigo-600', icon: '🌊', light: 'bg-indigo-50', text: 'text-indigo-700', bg: 'from-indigo-500/10 to-transparent' },
  'História': { name: 'Cânion do Tempo', color: 'bg-fuchsia-600', icon: '🏜️', light: 'bg-fuchsia-50', text: 'text-fuchsia-700', bg: 'from-fuchsia-500/10 to-transparent' },
  'Geografia': { name: 'Planície do Mundo', color: 'bg-purple-600', icon: '🗺️', light: 'bg-purple-50', text: 'text-purple-700', bg: 'from-purple-500/10 to-transparent' },
};

export const OFFLINE_QUESTION_BANK: Record<string, Question[]> = {
  // --- MATEMÁTICA ---
  'mat-1': [
    { type: 'multiple-choice', text: 'Quantos dedos temos em uma mão?', options: ['3', '4', '5', '6'], answer: '5', explanation: 'Temos 5 dedos em cada mão!', hint: 'Conte agora mesmo!' },
    { type: 'input', text: 'Quanto é 2 + 1?', answer: '3', explanation: '2 e mais 1 formam 3.', hint: 'Dois patinhos e mais um.' }
  ],
  'mat-2': [
    { type: 'multiple-choice', text: 'Quanto é 10 - 2?', options: ['7', '8', '9', '6'], answer: '8', explanation: 'Se tirarmos 2 de 10, sobram 8.', hint: 'Use os dedos.' }
  ],
  'mat-3': [
    { type: 'multiple-choice', text: 'Qual forma parece uma fatia de pizza?', options: ['Círculo', 'Quadrado', 'Triângulo'], answer: 'Triângulo', explanation: 'O triângulo tem 3 lados, como a fatia de pizza.', hint: 'Tem 3 pontas.' }
  ],
  'mat-4': [
    { type: 'input', text: 'Quantos minutos tem uma hora?', answer: '60', explanation: 'Uma hora tem 60 minutos.', hint: 'Seis dezenas.' }
  ],
  'mat-5': [
    { type: 'multiple-choice', text: 'Qual animal é mais pesado?', options: ['Passarinho', 'Elefante', 'Gato'], answer: 'Elefante', explanation: 'O elefante pesa toneladas!', hint: 'É o maior animal terrestre.' }
  ],

  // --- PORTUGUÊS ---
  'por-1': [
    { type: 'multiple-choice', text: 'Qual dessas é uma VOGAL?', options: ['B', 'C', 'D', 'A'], answer: 'A', explanation: 'A, E, I, O, U são as vogais.', hint: 'É a primeira letra.' }
  ],
  'por-2': [
    { type: 'input', text: 'Complete a palavra: B_LA', answer: 'O', explanation: 'A palavra é BOLA.', hint: 'Objeto redondo.' }
  ],
  'por-3': [
    { type: 'multiple-choice', text: 'Qual palavra rima com CHÃO?', options: ['Pão', 'Cama', 'Casa'], answer: 'Pão', explanation: 'Chão e Pão terminam com ÃO.', hint: 'Som final igual.' }
  ],
  'por-4': [
    { type: 'multiple-choice', text: 'Qual letra vem depois do M no alfabeto?', options: ['L', 'N', 'O'], answer: 'N', explanation: 'M, N, O...', hint: 'Letra do navio.' }
  ],
  'por-5': [
    { type: 'input', text: 'Qual o contrário de ALTO?', answer: 'Baixo', explanation: 'O oposto de alto é baixo.', hint: 'Pequeno.' }
  ],

  // --- CIÊNCIAS ---
  'cie-1': [
    { type: 'multiple-choice', text: 'O que a planta precisa para viver?', options: ['Água e Luz', 'Sombra', 'Gelo'], answer: 'Água e Luz', explanation: 'Plantas precisam de sol e água.', hint: 'Elas bebem e tomam sol.' }
  ],
  'cie-2': [
    { type: 'multiple-choice', text: 'Qual parte do corpo usamos para ver?', options: ['Nariz', 'Olhos', 'Ouvidos'], answer: 'Olhos', explanation: 'A visão é feita pelos olhos.', hint: 'Ficam no rosto.' }
  ],
  'cie-3': [
    { type: 'input', text: 'Em qual planeta nós moramos?', answer: 'Terra', explanation: 'Nós vivemos no Planeta Terra.', hint: 'O planeta azul.' }
  ],
  'cie-4': [
    { type: 'multiple-choice', text: 'A água no congelador fica...', options: ['Líquida', 'Sólida', 'Gasosa'], answer: 'Sólida', explanation: 'A água vira gelo (estado sólido).', hint: 'Vira gelo.' }
  ],
  'cie-5': [
    { type: 'multiple-choice', text: 'Qual animal vive na água?', options: ['Leão', 'Peixe', 'Macaco'], answer: 'Peixe', explanation: 'Peixes respiram debaixo da água.', hint: 'Tem escamas.' }
  ],

  // Fallbacks Gerais (Pool por Matéria)
  'Matemática': [
    { type: 'multiple-choice', text: 'Quanto é 5 + 5?', options: ['9', '10', '11'], answer: '10', explanation: '5 + 5 = 10.', hint: 'Mãos cheias.' }
  ],
  'Português': [
    { type: 'multiple-choice', text: 'A palavra GATO tem quantas letras?', options: ['3', '4', '5'], answer: '4', explanation: 'G-A-T-O tem 4 letras.', hint: 'Conte as letras.' }
  ],
  'Ciências': [
    { type: 'multiple-choice', text: 'O Sol é uma...', options: ['Estrela', 'Planeta', 'Lua'], answer: 'Estrela', explanation: 'O Sol é a estrela mais próxima da Terra.', hint: 'Nos dá calor.' }
  ],
  'História': [
    { type: 'multiple-choice', text: 'Quem cuida da saúde na escola?', options: ['Médico', 'Enfermeiro', 'Professor'], answer: 'Professor', explanation: 'Na escola, o professor cuida do seu aprendizado.', hint: 'Ele ensina.' }
  ],
  'Geografia': [
    { type: 'multiple-choice', text: 'Onde tem mais árvores?', options: ['Cidade', 'Floresta', 'Shopping'], answer: 'Floresta', explanation: 'Florestas são biomas cheios de árvores.', hint: 'Lugar verde.' }
  ]
};

export const INITIAL_LESSONS: Lesson[] = [
  // Português (5 módulos)
  { id: 'por-1', subject: 'Português', title: 'O Reino das Vogais', theory: 'As vogais são as bases de todas as palavras.', xpReward: 30, questions: [] },
  { id: 'por-2', subject: 'Português', title: 'Ponte das Sílabas', theory: 'Juntar sons cria pedaços mágicos chamados sílabas.', xpReward: 30, questions: [] },
  { id: 'por-3', subject: 'Português', title: 'Baile das Rimas', theory: 'Palavras que combinam dão ritmo ao bioma.', xpReward: 30, questions: [] },
  { id: 'por-4', subject: 'Português', title: 'Trilha do Alfabeto', theory: 'Conhecer a ordem das letras ajuda a encontrar tesouros.', xpReward: 30, questions: [] },
  { id: 'por-5', subject: 'Português', title: 'Mestre das Frases', theory: 'Unir palavras cria mensagens poderosas.', xpReward: 30, questions: [] },
  
  // Matemática (5 módulos)
  { id: 'mat-1', subject: 'Matemática', title: 'Jardim dos Números', theory: 'Os números representam quantidades no nosso mundo.', xpReward: 30, questions: [] },
  { id: 'mat-2', subject: 'Matemática', title: 'Montanha da Adição', theory: 'Somar é como plantar: tudo aumenta!', xpReward: 30, questions: [] },
  { id: 'mat-3', subject: 'Matemática', title: 'Vale das Formas', theory: 'O mundo é feito de formas geométricas incríveis.', xpReward: 30, questions: [] },
  { id: 'mat-4', subject: 'Matemática', title: 'Templo do Tempo', theory: 'Saber as horas nos ajuda a organizar o bioma.', xpReward: 30, questions: [] },
  { id: 'mat-5', subject: 'Matemática', title: 'Peso e Medidas', theory: 'Descobrir o tamanho e o peso das coisas é essencial.', xpReward: 30, questions: [] },

  // Ciências (5 módulos)
  { id: 'cie-1', subject: 'Ciências', title: 'Vida das Plantas', theory: 'Toda vida começa pequena e precisa de cuidado.', xpReward: 30, questions: [] },
  { id: 'cie-2', subject: 'Ciências', title: 'Máquina Humana', theory: 'Nosso corpo é um laboratório maravilhoso.', xpReward: 30, questions: [] },
  { id: 'cie-3', subject: 'Ciências', title: 'Viagem Espacial', theory: 'A Terra é nosso lar no vasto universo.', xpReward: 30, questions: [] },
  { id: 'cie-4', subject: 'Ciências', title: 'Estados da Água', theory: 'A água muda de forma como mágica.', xpReward: 30, questions: [] },
  { id: 'cie-5', subject: 'Ciências', title: 'Mundo Animal', theory: 'Cada animal tem seu lugar especial no bioma.', xpReward: 30, questions: [] },

  // História (2 módulos base)
  { id: 'his-1', subject: 'História', title: 'Minha História', theory: 'Você é o protagonista da sua própria jornada.', xpReward: 30, questions: [] },
  { id: 'his-2', subject: 'História', title: 'Minha Família', theory: 'As raízes nos sustentam e nos dão amor.', xpReward: 30, questions: [] },

  // Geografia (2 módulos base)
  { id: 'geo-1', subject: 'Geografia', title: 'Meu Lugar', theory: 'Onde moramos faz parte de quem somos.', xpReward: 30, questions: [] },
  { id: 'geo-2', subject: 'Geografia', title: 'Paisagens', theory: 'A natureza muda de lugar para lugar.', xpReward: 30, questions: [] },
];

export const FAKE_LEADERBOARD: Record<string, number> = {
  'Mestre Zen': 5000,
  'Explorador Bio': 3200,
  'Guia da Natureza': 2100,
  'Semeador': 1500,
  'Amigo da Floresta': 800
};
