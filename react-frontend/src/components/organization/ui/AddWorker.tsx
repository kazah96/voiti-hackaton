import { Controller } from 'react-hook-form';
import { TextField } from 'shared/ui';

export const AddWorker = ({ control }) => {
  return (
    <form>
      <Controller
        name="name"
        control={control}
        render={({ field }) => <TextField {...field} fullWidth placeholder="Имя" />}
      />
      <Controller
        name="email"
        control={control}
        render={({ field }) => <TextField {...field} fullWidth type="email" placeholder="Email" />}
      />
      <Controller
        name="phone"
        control={control}
        render={({ field }) => <TextField {...field} fullWidth type="tel" placeholder="Телефон" />}
      />
    </form>
  );
};
