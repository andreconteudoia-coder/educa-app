import { Question } from './types';

export const OFFLINE_QUESTIONS: Record<string, Question[]> = {
  'matematica-1': [
    {
      type: 'multiple-choice',
      text: 'Quanto é 2 + 2?',
      options: ['3', '4', '5', '6'],
      answer: '4',
      explanation: 'A soma de 2 e 2 é 4.',
      hint: 'Tente contar nos dedos.',
    },
    {
      type: 'input',
      text: 'Qual o resultado de 5 x 3?',
      answer: '15',
      explanation: 'Multiplicar 5 por 3 é o mesmo que somar 5 três vezes.',
      hint: 'Começa com 1 e termina com 5.',
    },
    // Adicione mais 8 questões para matemática-1
  ],
  'portugues-1': [
    {
      type: 'multiple-choice',
      text: 'Qual a letra que vem depois do A?',
      options: ['B', 'C', 'D', 'E'],
      answer: 'B',
      explanation: 'O alfabeto segue uma ordem sequencial.',
      hint: 'É a segunda letra do alfabeto.',
    },
    {
      type: 'speech',
      text: 'Diga a palavra "CASA"',
      answer: 'CASA',
      targetPhrase: 'CASA',
      explanation: 'C-A-S-A formam a palavra CASA.',
      hint: 'Começa com a letra C.',
    },
    // Adicione mais 8 questões para portugues-1
  ],
  // Adicione mais matérias e lições conforme necessário
};
