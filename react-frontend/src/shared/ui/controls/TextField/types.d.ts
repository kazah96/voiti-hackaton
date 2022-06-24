import { TextFieldProps as MuiProps } from '@mui/material/TextField';

export type TextFieldProps = Merge<
  Omit<MuiProps, 'label'>,
  {
    dti?: string;
    tooltip?: React.ReactNode;
    className?: string;
    helperText?: string;
    dark?: boolean;
    variant?: 'filled' | 'outlined' | 'standard';
    inputRef?: React.MutableRefObject<any>;
  }
>;
