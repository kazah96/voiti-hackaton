import { createStyles, makeStyles as makeMaterialStyles } from '@mui/styles';

type IStylesConfiguration = object | (() => any);

export const makeStyles: typeof makeMaterialStyles = (stylesCfg: IStylesConfiguration) => {
  return makeMaterialStyles(() =>
    createStyles(typeof stylesCfg === 'function' ? stylesCfg() : stylesCfg)
  );
};
