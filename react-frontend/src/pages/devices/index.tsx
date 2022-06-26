import { Devices } from 'components/devices';
import { Header } from 'components/header';

export const DevicesPage = () => {
  return (
    <div>
      <Header title="Ваши устройства" />
      <div>
        <Devices />
      </div>
    </div>
  );
};
