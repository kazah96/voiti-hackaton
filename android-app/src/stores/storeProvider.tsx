import {createContext, useContext} from 'react';
import {RootStore} from './base.store';
import * as React from 'react';

const rootStoreContext = createContext<RootStore | null>(null);

export const useRootStore = () => {
  const context = useContext(rootStoreContext);
  if (context) {
    return context;
  }
  throw Error('Root store is not provided!');
};

const rootStore = new RootStore();

console.log(rootStore);
const RootStoreProvider: React.FC = ({children}) => {
  return (
    <rootStoreContext.Provider value={rootStore}>
      {children}
    </rootStoreContext.Provider>
  );
};

export {RootStoreProvider};
