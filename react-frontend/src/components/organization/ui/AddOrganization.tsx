import { useAuthContext } from 'components/user/auth';
import { observer } from 'mobx-react';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Button, Dialog, TextField } from 'shared/ui';
import { useOrganizationContext } from '../model/context';
import { useStyles } from './styles';

export const AddOrganization = observer(() => {
  const [open, setOpen] = useState(false);
  const classes = useStyles();

  const { organization } = useOrganizationContext();
  const { auth } = useAuthContext();
  const { control, handleSubmit } = useForm();

  useEffect(() => {
    auth.getUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleDialog = () => {
    setOpen(!open);
  };

  const handleClose = () => setOpen(false);

  const onSubmit = (data) => {
    const result = {
      ...data,
      admins: [auth.user._id],
    };

    organization.createOrganization(result).then(() => {
      handleClose();
      auth.getUser();
    });
  };

  return (
    <div className={classes.addOrg}>
      <div className={classes.addTitle}>У вас пока нет организации</div>
      <Button color="primary" variant="contained" onClick={toggleDialog}>
        Добавить организацию
      </Button>
      <Dialog open={open} title="Добавить" onOk={handleSubmit(onSubmit)} onClose={handleClose}>
        <form>
          <Controller
            name="name"
            control={control}
            render={({ field }) => <TextField {...field} fullWidth placeholder="Name" />}
          />
        </form>
      </Dialog>
    </div>
  );
});
