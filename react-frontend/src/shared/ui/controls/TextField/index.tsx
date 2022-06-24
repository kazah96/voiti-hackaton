import React, { useEffect } from 'react';
import clsx from 'clsx';
import MaterialTextField from '@mui/material/TextField';
import { useEnsuredForwardedRef } from 'react-use';
import { debounce } from 'lodash';

import InputAdornment from '../InputAdornment';

import { Icon } from '../..';

import { TextFieldProps } from './types';

import { useStyles } from './styles';
import { Tooltip } from 'shared/ui/Tooltip';

export const TextField: React.FC<TextFieldProps> = React.forwardRef(
  (
    {
      className,
      variant,
      classes,
      error,
      children,
      InputProps,
      FormHelperTextProps,
      helperText,
      tooltip,
      dark,
      inputRef,
      ...props
    },
    ref
  ) => {
    const styles = useStyles();
    const _inputRef = useEnsuredForwardedRef(inputRef);

    // note: это позволяет пользователю кастомизировать стили, которые уже определены здесь
    const mergeInputPropsClasses = (inputClasses) => {
      const {
        root,
        input,
        notchedOutline,
        multiline,
        focused,
        adornedStart,
        adornedEnd,
        ...restClasses
      } = inputClasses;

      return {
        root: clsx(
          styles.root,
          dark && styles.rootDark,
          { [styles.error]: error, [styles.errorDark]: error && dark },
          root
        ),
        input: clsx(styles.input, dark && styles.inputDark, input),
        notchedOutline: clsx(styles.notchedOutline, notchedOutline),
        multiline: clsx(styles.multiline, multiline),
        focused: clsx(styles.focused, dark && styles.focusedDark, focused),
        adornedStart: clsx(styles.adornedStart, adornedStart),
        adornedEnd: clsx(styles.adornedEnd, adornedEnd),
        ...restClasses,
      };
    };

    const mergeHelperPropsClasses = (helperClasses) => {
      const { root, ...restClasses } = helperClasses;

      return {
        root: clsx(styles.rootHelper, root),
        ...restClasses,
      };
    };

    const { classes: inputPropsClasses, endAdornment, ...restInputProps } = InputProps;
    const { classes: helperPropsClasses, ...restHelperProps } = FormHelperTextProps;

    const renderTooltip = () => {
      if (!tooltip) {
        return null;
      }

      return (
        <InputAdornment position="end">
          <Tooltip title={tooltip} placement="top" arrow>
            <span className={styles.tooltipIcon}>
              <Icon name="cross" />
            </span>
          </Tooltip>
        </InputAdornment>
      );
    };

    // note: this manipulation let us to prevent incrementing/decrementing
    // value with mouse wheel on <input type="number" /> without losing focus
    useEffect(() => {
      const current: HTMLInputElement = _inputRef.current;

      if (
        !current ||
        props.disabled ||
        props.type !== 'number' ||
        current.hasAttribute('readonly')
      ) {
        return;
      }

      const handleScrollingHasEnded = debounce((input: HTMLInputElement) => {
        input.removeAttribute('readonly');
      }, 50);

      const scrollListener = (event: WheelEvent) => {
        const input = event.target as HTMLInputElement;

        if (document.activeElement === current) {
          input.setAttribute('readonly', '');
          handleScrollingHasEnded(input);
        }
      };

      current.addEventListener('wheel', scrollListener);

      return () => current.removeEventListener('wheel', scrollListener);
    }, [props.disabled, props.type, _inputRef]);

    return (
      <MaterialTextField
        className={className}
        classes={classes}
        variant={variant}
        InputProps={{
          classes: mergeInputPropsClasses(inputPropsClasses || {}),
          endAdornment: endAdornment ? endAdornment : renderTooltip(),
          ...restInputProps,
        }}
        FormHelperTextProps={{
          classes: mergeHelperPropsClasses(helperPropsClasses || {}),
          ...restHelperProps,
        }}
        helperText={typeof helperText !== 'undefined' ? helperText || ' ' : helperText}
        error={error}
        {...props}
        ref={ref}
        inputRef={_inputRef}
      >
        {children}
      </MaterialTextField>
    );
  }
);

TextField.displayName = 'TextField';

TextField.defaultProps = {
  variant: 'outlined',
  color: 'primary',
  error: false,
  classes: {},
  InputProps: { classes: {} },
  FormHelperTextProps: { classes: {} },
  helperText: undefined,
};
