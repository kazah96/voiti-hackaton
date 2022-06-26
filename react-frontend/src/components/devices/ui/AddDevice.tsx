import { useOrganizationContext } from 'components/organization';
import { observer } from 'mobx-react';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Button, Dialog, TextField } from 'shared/ui';
import { useDevicesContext } from '../model';

export const AddDevice = observer(() => {
  const [open, setOpen] = useState(false);
  const { control, handleSubmit } = useForm();

  const {
    organization: { organizationId },
  } = useOrganizationContext();
  const {
    devices: { getAllDevices, createDevice },
  } = useDevicesContext();

  const toggleDialog = () => setOpen(!open);

  const handleClose = () => setOpen(false);

  const onSubmit = (data) => {
    const result = {
      ...data,
      organizationId: organizationId,
    };

    createDevice(result).then(() => {
      handleClose();
      getAllDevices(organizationId);
    });
  };

  return (
    <div>
      <Button color="primary" variant="outlined" onClick={toggleDialog}>
        Добавить устройство
      </Button>
      <Dialog
        open={open}
        title="Добавить"
        onOk={handleSubmit(onSubmit)}
        okText="Создать"
        onClose={handleClose}
      >
        <form>
          <Controller
            name="name"
            control={control}
            render={({ field }) => <TextField {...field} fullWidth placeholder="Название точки" />}
          />
        </form>
      </Dialog>
    </div>
  );
});
