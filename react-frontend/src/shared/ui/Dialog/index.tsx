import { FC } from 'react';
import clsx from 'clsx';
import MaterialDialog from '@mui/material/Dialog';

import { Button } from '../controls/Button';

import useStyles from './styles';
import { DialogProps } from './types';
import { Icon } from '../Icon';

export const Dialog: FC<DialogProps> = ({
  children,
  open,
  onClose,
  title,
  onOk,
  renderFooter,
  okText,
  closeText,
  className,
  classes = {},
  width,
  fullScreen,
  fullWidth,
  dark,
  okButtonProps,
  ...props
}) => {
  const isCloseButton = closeText && closeText !== '';
  const { title: titleClasses, body, closeButton, okButton, ...DialogClasses } = classes;

  const styles = useStyles({ width });

  const handleClose: DialogProps['onClose'] = (e, reason) => {
    onClose(e, reason);
  };

  const handleClickCloseButton = (e) => {
    onClose(e, null);
  };

  const customFooterRender = () => {
    if (renderFooter === false) {
      return null;
    }

    return renderFooter();
  };

  return (
    <MaterialDialog
      open={open}
      classes={{
        root: classes.wrapper,
        paperWidthSm: clsx(
          classes.root,
          styles.dialog,
          { [styles.dialogSize]: !fullScreen && !fullWidth },
          className
        ),
        paperFullScreen: clsx(styles.fullScreen, classes.paperFullScreen),
        paperFullWidth: clsx(styles.fullWidth),
        ...DialogClasses,
      }}
      onClose={onClose ? handleClose : undefined}
      fullScreen={fullScreen}
      fullWidth={fullWidth}
      {...props}
    >
      <div className={clsx(styles.dialogContent, classes.content)}>
        {onClose && (
          <div className={clsx(styles.closeButton, closeButton)} onClick={handleClickCloseButton}>
            <Icon name="cross" />
          </div>
        )}

        {title && <div className={clsx(styles.title, titleClasses)}>{title}</div>}

        <div className={clsx(styles.body, body)}>{children}</div>

        {renderFooter || renderFooter === false ? (
          customFooterRender()
        ) : (
          <div
            className={clsx(styles.footer, classes.footer)}
            style={{ justifyContent: isCloseButton ? 'space-between' : 'flex-end' }}
          >
            {isCloseButton && (
              <Button variant="text" onClick={handleClickCloseButton}>
                {closeText || 'Cancel'}
              </Button>
            )}

            {onOk && (
              <Button className={clsx(styles.okButton, okButton)} onClick={onOk} {...okButtonProps}>
                {okText || 'Ok'}
              </Button>
            )}
          </div>
        )}
      </div>
    </MaterialDialog>
  );
};
