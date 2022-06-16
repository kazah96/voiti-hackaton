import MaterialTextField from '@mui/material/TextField';

export const TextField = ({
  className,
  variant,
  classes,
  error,
  children,
  helperText,
  ...props
}) => {
  return (
    <MaterialTextField
      className={className}
      classes={classes}
      variant={variant}
      helperText={typeof helperText !== 'undefined' ? helperText || ' ' : helperText}
      error={error}
      {...props}
    >
      {children}
    </MaterialTextField>
  );
};

TextField.displayName = 'TextField';

TextField.defaultProps = {
  variant: 'outlined',
  color: 'primary',
  error: false,
  classes: {},
  helperText: undefined,
};
