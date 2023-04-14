import { createContext, Dispatch, PropsWithChildren, useContext } from 'react';

import { ActionOptions, Game } from './game';
import useGameReducer from './reducer';

export const GameContext = createContext<Game>({} as Game);
export const GameDispatchContext = createContext<Dispatch<ActionOptions>>(
  {} as Dispatch<ActionOptions>
);

export const GameProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [game, dispatch] = useGameReducer();

  return (
    <GameContext.Provider value={game}>
      <GameDispatchContext.Provider value={dispatch}>
        {children}
      </GameDispatchContext.Provider>
    </GameContext.Provider>
  );
};

export const useGame = () => useContext(GameContext);
export const useGameDispatch = () => useContext(GameDispatchContext);
