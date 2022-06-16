import React, { useMemo } from 'react';
import classNames from 'classnames';

import { IconProps } from './types';

import { icons } from './icons';
import useStyles from './styles';

const getIconComponentByName = (name) => {
  return icons[name];
};

export const Icon: React.FC<IconProps> = ({ className, name, iconComponent, fill, ...props }) => {
  const classes = useStyles();

  const IconComponent: React.ComponentType<IconProps> = useMemo(() => {
    return iconComponent || getIconComponentByName(name);
  }, [iconComponent, name]);

  if (!IconComponent) {
    console.warn(`this icon name doesn't exist: ${name}`); // eslint-disable-line no-console

    return <span />;
  }

  return (
    <IconComponent
      className={classNames(classes.icon, { fill: fill }, { pointer: props.onClick }, className)}
      {...props}
    />
  );
};
