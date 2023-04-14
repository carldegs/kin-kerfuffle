import { useReducer } from 'react';

import { Game, ActionOptions } from './game';

const initialCurrentRoundData: Pick<
  Game,
  | 'currentRound'
  | 'currentRoundScore'
  | 'currentShownAnswers'
  | 'currentRoundMistakes'
> = {
  currentRound: 'intro',
  currentRoundScore: 0,
  currentShownAnswers: [],
  currentRoundMistakes: [0, 0],
};

const initialGameData: Game = {
  questions: {},
  teamNames: ['', ''],
  teamScores: [0, 0],
  rounds: [],
  bonusRoundQuestions: [],
  ...initialCurrentRoundData,
};

const gameReducer = (game: Game, { type, payload }: ActionOptions): Game => {
  switch (type) {
    case 'add-question':
      return {
        ...game,
        questions: {
          ...game.questions,
          [new Date().getTime()]: payload,
        },
      };
    case 'update-question':
      return {
        ...game,
        questions: {
          ...game.questions,
          [payload.id]: {
            ...game.questions[payload.id],
            ...payload.question,
          },
        },
      };
    case 'delete-question':
      return {
        ...game,
        questions: Object.fromEntries(
          Object.entries(game.questions).filter(([key]) => +key !== payload)
        ),
      };
    case 'update-rounds':
      return {
        ...game,
        rounds: payload,
      };
    case 'set-current-round':
      return {
        ...game,
        ...initialCurrentRoundData,
        currentRound: payload,
      };
    case 'show-answer': {
      const currScore = game.currentRoundScore;
      const currRound = game.rounds[game.currentRound as number];
      const currQuestionAnswers = game.questions[currRound.question].answers;

      return {
        ...game,
        currentShownAnswers: [...game.currentShownAnswers, payload],
        currentRoundScore:
          currScore + currQuestionAnswers[payload].score * currRound.multiplier,
      };
    }
    case 'add-mistake':
      return {
        ...game,
        currentRoundMistakes: [
          game.currentRoundMistakes[0] + +(payload === 0),
          game.currentRoundMistakes[1] + +(payload === 1),
        ],
      };
    case 'give-score':
      return {
        ...game,
        teamScores: [
          game.teamScores[0] + (payload === 0 ? game.currentRoundScore : 0),
          game.teamScores[1] + (payload === 1 ? game.currentRoundScore : 0),
        ],
      };
    default:
      return game;
  }
};

const useGameReducer = (initialData: Game = initialGameData) =>
  useReducer(gameReducer, initialData);

export default useGameReducer;
