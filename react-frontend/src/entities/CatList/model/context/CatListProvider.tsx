import React, { createContext, useCallback, useMemo, useState } from 'react';
import { observer } from 'mobx-react';
import { CatListStore } from '../store/CatListStore';

export type IContext = {
  catListStore: CatListStore;
  changeState: (payload: Partial<IContext>) => void;
};

const initialState: IContext = {
  catListStore: new CatListStore(),
  changeState: () => {},
};

export const CatListContext = createContext(initialState);
const { Provider } = CatListContext;

export const CatListProvider: React.FC = observer(({ children }) => {
  const [state, setState] = useState<IContext>(initialState);

  const changeState = useCallback(
    (payload: Partial<IContext>) => {
      setState({ ...state, ...payload });
    },
    [state]
  );

  const contextValue = useMemo(() => ({ ...state, changeState }), [state, changeState]);

  return <Provider value={contextValue}>{children}</Provider>;
});
