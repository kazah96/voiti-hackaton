import { DialogProps as MaterialDialogProps } from '@mui/material/Dialog';
import { ButtonProps } from '../controls/Button';

export type DialogProps = Merge<
  MaterialDialogProps,
  {
    dti?: string;
    okDti?: string;
    okText?: string;
    closeText?: string;
    width?: number | string;
    onOk?: (e: any) => void;
    renderFooter?: (() => React.ReactNode) | false;
    className?: string;
    dark?: boolean;
    classes?: MaterialDialogProps['classes'] & {
      wrapper?: string;
      root?: string;
      closeButton?: string;
      content?: string;
      title?: string;
      body?: string;
      footer?: string;
      cancelButton?: string;
      okButton?: string;
      body?: string;
    };
    okButtonProps?: ButtonProps;
    disableBackdropClick?: boolean;
  }
>;
