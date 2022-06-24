import { useContext } from 'react';

import { CatListContext } from './CatListProvider';

export const useCatListContext = () => {
  return useContext(CatListContext);
};
