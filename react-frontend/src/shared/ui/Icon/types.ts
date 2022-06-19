import { ReactEventHandler, ReactNode } from 'react';
import { icons } from './icons';

export type IconsType = typeof icons;
export type IconNamesType = keyof IconsType;

export type IconProps = {
  iconComponent?: ReactNode;
  name?: IconNamesType;
  className?: string;
  onClick?: ReactEventHandler;
  fill?: boolean;
};
