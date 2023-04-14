export type GameStage = 'setup' | 'in-game' | 'post-game';

export interface Answer {
  answer: string;
  score: number;
}

export interface Question {
  question: string;
  id: number;
  answers: Answer[];
  multiplier: number;
}

export interface MainRound {
  question: number;
  multiplier: number;
}

export interface Game {
  questions: Record<number, Question>;
  teamNames: string[];
  teamScores: number[];
  rounds: MainRound[];
  bonusRoundQuestions: number[];
  currentRound: number | 'bonus' | 'intro';
  currentRoundScore: number;
  currentShownAnswers: number[];
  currentRoundMistakes: number[];
}

export interface Action<Type extends string, Payload = unknown> {
  type: Type;
  payload: Payload;
}

export type ActionOptions =
  | Action<'add-question', Question>
  | Action<'update-question', { id: number; question: Partial<Question> }>
  | Action<'delete-question', number>
  | Action<'update-rounds', MainRound[]>
  | Action<'set-current-round', Game['currentRound']>
  | Action<'show-answer', number>
  | Action<'add-mistake', number>
  | Action<'give-score', number>;
