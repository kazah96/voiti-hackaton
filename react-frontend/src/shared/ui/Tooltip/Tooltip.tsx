import React, { FC } from 'react';
import clsx from 'clsx';
import MaterialTooltip from '@mui/material//Tooltip';

import { TooltipProps } from './types';
import useStyles from './styles';

export const Tooltip: FC<TooltipProps> = ({ disabled, classes, ...props }) => {
  const styles = useStyles();

  const mergeInputPropsClasses = (inputClasses) => {
    const { tooltip, arrow, ...restClasses } = inputClasses;

    return {
      tooltip: clsx(styles.tooltip, tooltip),
      arrow: clsx(styles.arrow, arrow),

      ...restClasses,
    };
  };

  if (disabled) {
    return props.children;
  }

  return (
    <MaterialTooltip
      classes={mergeInputPropsClasses(classes || {})}
      enterTouchDelay={100}
      arrow
      {...props}
    />
  );
};
