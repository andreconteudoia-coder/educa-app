
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
  'mat-1': [ // Contagem e Números 0-10
    { type: 'multiple-choice', text: 'Quantos dedos temos em uma mão?', options: ['3', '4', '5', '6'], answer: '5', explanation: 'Temos 5 dedos em cada mão.', hint: 'Conte agora!' },
    { type: 'input', text: 'Qual número vem depois do 2?', answer: '3', explanation: 'A sequência é 1, 2, 3...', hint: 'Conte: um, dois...' },
    { type: 'speech', text: 'Diga o número de sementes: 🍎🍎', targetPhrase: 'Dois', answer: 'Dois', explanation: 'Vimos duas maçãs!', hint: 'Um, dois.' },
    { type: 'multiple-choice', text: 'Qual número é maior?', options: ['2', '8', '5', '1'], answer: '8', explanation: 'O 8 representa a maior quantidade.', hint: 'Quem vem por último na contagem?' },
    { type: 'input', text: 'Escreva o número sete:', answer: '7', explanation: 'O número 7 vem depois do 6.', hint: 'Parece um machado invertido.' },
    { type: 'multiple-choice', text: 'Se você tem 3 doces e ganha 0, com quantos fica?', options: ['0', '1', '3', '6'], answer: '3', explanation: 'Somar zero não muda nada.', hint: 'Você não ganhou nada novo.' },
    { type: 'speech', text: 'Diga o número do meio: 4, _, 6', targetPhrase: 'Cinco', answer: 'Cinco', explanation: 'O 5 fica entre o 4 e o 6.', hint: 'Um a mais que 4.' },
    { type: 'input', text: 'Quantas cores tem o semáforo?', answer: '3', explanation: 'Verde, amarelo e vermelho.', hint: 'Conte as luzes.' },
    { type: 'multiple-choice', text: 'O que representa o Vazio?', options: ['1', '10', '0', '5'], answer: '0', explanation: 'Zero representa nada.', hint: 'A forma de um ovo vazio.' },
    { type: 'speech', text: 'Diga: Dez unidades é uma dezena', targetPhrase: 'Dez unidades é uma dezena', answer: 'Dez', explanation: '10 coisas formam uma dezena!', hint: 'Repita a frase.' }
  ],
  'mat-2': [ // Adição e Subtração Básica
    { type: 'multiple-choice', text: 'Quanto é 2 + 2?', options: ['3', '4', '5', '6'], answer: '4', explanation: '2 + 2 = 4.', hint: 'Use os dedos.' },
    { type: 'input', text: 'Quanto é 5 - 1?', answer: '4', explanation: 'Tirando um de cinco, sobram 4.', hint: 'Conte para trás.' },
    { type: 'speech', text: 'Diga o resultado de 1 + 1:', targetPhrase: 'Dois', answer: 'Dois', explanation: 'Parzinho!', hint: 'Um e um.' },
    { type: 'multiple-choice', text: 'Tinha 3 maçãs, comi 2. Sobraram:', options: ['0', '1', '2'], answer: '1', explanation: '3 menos 2 é 1.', hint: 'Sobra só uma.' },
    { type: 'input', text: '10 + 10 = ?', answer: '20', explanation: 'Duas dezenas formam 20.', hint: 'O dobro de 10.' },
    { type: 'multiple-choice', text: 'Qual sinal usamos para somar?', options: ['-', '+', 'x'], answer: '+', explanation: 'O sinal de mais (+) é para somar.', hint: 'Parece uma cruz.' },
    { type: 'speech', text: 'Fale: Três mais três é seis', targetPhrase: 'Três mais três é seis', answer: 'Seis', explanation: '3+3=6.', hint: 'Repita a conta.' },
    { type: 'input', text: 'Tenho 5 reais e ganhei 5. Agora tenho:', answer: '10', explanation: '5+5=10.', hint: 'Uma dezena.' },
    { type: 'multiple-choice', text: '9 - 9 é igual a:', options: ['0', '1', '9', '18'], answer: '0', explanation: 'Tirar tudo deixa nada.', hint: 'Quanto sobra?' },
    { type: 'input', text: 'Complete: 4 + _ = 5', answer: '1', explanation: 'Falta 1 para chegar em 5.', hint: 'Vizinho do 4.' }
  ],

  // --- PORTUGUÊS ---
  'por-1': [ // Vogais
    { type: 'multiple-choice', text: 'Qual letra inicia a palavra ABELHA?', options: ['E', 'I', 'A', 'O'], answer: 'A', explanation: 'A-belha começa com A.', hint: 'Primeira vogal.' },
    { type: 'speech', text: 'Diga a vogal da palavra OVO:', targetPhrase: 'O', answer: 'O', explanation: 'Ovo começa e termina com O.', hint: 'Letra redonda.' },
    { type: 'input', text: 'Complete a palavra: _LEFANTE', answer: 'E', explanation: 'Elefante começa com E.', hint: 'Vogal do meio.' },
    { type: 'multiple-choice', text: 'Quais são as vogais?', options: ['B, C, D', 'A, E, I, O, U', '1, 2, 3'], answer: 'A, E, I, O, U', explanation: 'Estas são as 5 vogais mágicas.', hint: 'São as letras que dão som.' },
    { type: 'speech', text: 'Diga: A de Amor', targetPhrase: 'A de Amor', answer: 'Amor', explanation: 'A é para Amor!', hint: 'Fale alto.' },
    { type: 'input', text: 'Vogal que falta em ILH_: ', answer: 'A', explanation: 'Ilha termina com A.', hint: 'Vogal final.' },
    { type: 'multiple-choice', text: 'Qual palavra começa com U?', options: ['Uva', 'Oca', 'Asa'], answer: 'Uva', explanation: 'U-va começa with U.', hint: 'Fruta roxa.' },
    { type: 'speech', text: 'Pronuncie: I de Igreja', targetPhrase: 'I de Igreja', answer: 'Igreja', explanation: 'I é a vogal de Igreja.', hint: 'Letra fininha.' },
    { type: 'input', text: 'Escreva a vogal da palavra URSO:', answer: 'U', explanation: 'U de Urso.', hint: 'Parece um balanço.' },
    { type: 'multiple-choice', text: 'O "E" de Escova é o mesmo de:', options: ['Ilha', 'Escola', 'Urubu'], answer: 'Escola', explanation: 'Escova e Escola começam com E.', hint: 'Lugar de estudar.' }
  ],

  // Fallbacks para outros módulos (Pool de Segurança)
  'Ciências': [
    { type: 'multiple-choice', text: 'As plantas precisam de que para crescer?', options: ['Refrigerante', 'Água e Luz', 'Escuridão'], answer: 'Água e Luz', explanation: 'Água e luz do Sol são essenciais.', hint: 'Natureza!' },
    { type: 'speech', text: 'Diga: O Sol é uma estrela', targetPhrase: 'O Sol é uma estrela', answer: 'Estrela', explanation: 'O Sol brilha como as outras estrelas!', hint: 'Repita.' },
    { type: 'input', text: 'Quantas pernas tem um gato?', answer: '4', explanation: 'Gatos são quadrúpedes.', hint: 'Conte as patinhas.' }
  ],
  'História': [
    { type: 'multiple-choice', text: 'Quem faz parte da sua família?', options: ['O padeiro', 'Seus pais', 'O motorista'], answer: 'Seus pais', explanation: 'Pais, avós e irmãos são família.', hint: 'Quem mora com você?' }
  ],
  'Geografia': [
    { type: 'multiple-choice', text: 'Onde tem mais carros e prédios?', options: ['Na floresta', 'Na cidade', 'Na fazenda'], answer: 'Na cidade', explanation: 'Cidades são cheias de construções.', hint: 'Lugar barulhento.' }
  ]
};

export const INITIAL_LESSONS: Lesson[] = [
  // PORTUGUÊS (5 Módulos)
  { id: 'por-1', subject: 'Português', title: 'O Reino das Vogais', theory: 'Vogais são os sons mais importantes! A, E, I, O, U são as chaves das palavras.', xpReward: 30, questions: [] },
  { id: 'por-2', subject: 'Português', title: 'Ponte das Sílabas', theory: 'Juntar uma consoante com uma vogal cria uma sílaba, como BA, BE, BI...', xpReward: 30, questions: [] },
  { id: 'por-3', subject: 'Português', title: 'Baile das Rimas', theory: 'Palavras que terminam com o mesmo som rimam, como GATO e RATO.', xpReward: 30, questions: [] },
  { id: 'por-4', subject: 'Português', title: 'Trilha do Alfabeto', theory: 'O alfabeto tem 26 letras que juntas escrevem tudo no mundo!', xpReward: 30, questions: [] },
  { id: 'por-5', subject: 'Português', title: 'Mestre das Frases', theory: 'Uma frase é um conjunto de palavras que conta uma ideia completa.', xpReward: 30, questions: [] },

  // MATEMÁTICA (5 Módulos)
  { id: 'mat-1', subject: 'Matemática', title: 'Jardim dos Números', theory: 'Números servem para contar tudo: flores, dedos e estrelas!', xpReward: 30, questions: [] },
  { id: 'mat-2', subject: 'Matemática', title: 'Montanha da Adição', theory: 'Somar é juntar! Se você tem um e ganha outro, agora tem dois.', xpReward: 30, questions: [] },
  { id: 'mat-3', subject: 'Matemática', title: 'Vale das Formas', theory: 'Círculos, Quadrados e Triângulos estão em todo lugar no bioma.', xpReward: 30, questions: [] },
  { id: 'mat-4', subject: 'Matemática', title: 'Templo do Tempo', theory: 'O relógio e o calendário nos dizem quando o sol vai nascer.', xpReward: 30, questions: [] },
  { id: 'mat-5', subject: 'Matemática', title: 'Medir e Comparar', theory: 'Algumas coisas são pesadas, outras leves. Algumas são longas, outras curtas.', xpReward: 30, questions: [] },

  // CIÊNCIAS (5 Módulos)
  { id: 'cie-1', subject: 'Ciências', title: 'Vida das Plantas', theory: 'Plantas nascem, crescem e precisam de água e luz solar.', xpReward: 30, questions: [] },
  { id: 'cie-2', subject: 'Ciências', title: 'Corpo Humano', theory: 'Nossos sentidos (visão, audição, tato, olfato e paladar) nos mostram o mundo.', xpReward: 30, questions: [] },
  { id: 'cie-3', subject: 'Ciências', title: 'Céu e Estrelas', theory: 'A Terra gira em torno do Sol e a Lua ilumina nossa noite.', xpReward: 30, questions: [] },
  { id: 'cie-4', subject: 'Ciências', title: 'Estados da Água', theory: 'A água pode ser líquida, gelo (sólido) ou vapor (gás).', xpReward: 30, questions: [] },
  { id: 'cie-5', subject: 'Ciências', title: 'Animais do Bioma', theory: 'Existem animais que voam, que nadam e que caminham na terra.', xpReward: 30, questions: [] },

  // HISTÓRIA (5 Módulos)
  { id: 'his-1', subject: 'História', title: 'Quem sou Eu?', theory: 'Sua história começa com seu nome e o dia que você nasceu.', xpReward: 30, questions: [] },
  { id: 'his-2', subject: 'História', title: 'Minha Família', theory: 'Famílias podem ser de muitos jeitos, mas todas têm amor.', xpReward: 30, questions: [] },
  { id: 'his-3', subject: 'História', title: 'Vida na Escola', theory: 'A escola é onde aprendemos e fazemos amigos para a vida.', xpReward: 30, questions: [] },
  { id: 'his-4', subject: 'História', title: 'Profissões', theory: 'Cada trabalho ajuda a nossa comunidade a funcionar melhor.', xpReward: 30, questions: [] },
  { id: 'his-5', subject: 'História', title: 'Festas e Tradições', theory: 'Comemoramos datas especiais para lembrar da nossa cultura.', xpReward: 30, questions: [] },

  // GEOGRAFIA (5 Módulos)
  { id: 'geo-1', subject: 'Geografia', title: 'Minha Casa', theory: 'Cada moradia é um lugar de proteção e carinho.', xpReward: 30, questions: [] },
  { id: 'geo-2', subject: 'Geografia', title: 'Rua e Bairro', theory: 'Sua rua faz parte de um lugar maior chamado bairro.', xpReward: 30, questions: [] },
  { id: 'geo-3', subject: 'Geografia', title: 'Meios de Transporte', theory: 'Carros, ônibus e aviões nos levam para longe.', xpReward: 30, questions: [] },
  // Fix: changed 'geography' to 'questions' to match Lesson interface
  { id: 'geo-4', subject: 'Geografia', title: 'Natureza e Cidade', theory: 'Existem paisagens naturais e paisagens criadas pelas pessoas.', xpReward: 30, questions: [] },
  { id: 'geo-5', subject: 'Geografia', title: 'Mapas Simples', theory: 'Mapas são desenhos que mostram os lugares vistos de cima.', xpReward: 30, questions: [] },
];

export const FAKE_LEADERBOARD: Record<string, number> = {
  'Mestre Zen': 5000,
  'Explorador Bio': 3200,
  'Guia da Natureza': 2100,
  'Semeador': 1500,
  'Amigo da Floresta': 800
};
