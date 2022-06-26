import { useContext } from 'react';

import { LogsContext } from './LogsProvider';

export const useLogsContext = () => {
  return useContext(LogsContext);
};
