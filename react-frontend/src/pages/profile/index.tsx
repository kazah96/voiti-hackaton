import { Header } from 'components/header';
import { UserInformation } from 'components/profile';
import { useAuthContext } from 'components/user/auth';
import { observer } from 'mobx-react';

export const ProfilePage = observer(() => {
  const {
    auth: { user },
  } = useAuthContext();
  return (
    <div>
      <Header />
      {user && <UserInformation />}
    </div>
  );
});
