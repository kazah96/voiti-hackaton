import { useAuthContext } from 'components/user/auth';
import { observer } from 'mobx-react';
import { useCallback, useEffect, useState } from 'react';
import { GenerateAvatar } from 'shared/lib/GenerateAvatar';
import { useStyles } from './styles';

export const UserInformation = observer(() => {
  const [uri, setUri] = useState(null);
  const classes = useStyles();

  const {
    auth: { user, userOrgs, getOrganizations },
  } = useAuthContext();

  useEffect(() => {
    getOrganizations(user.organizations);
  }, [getOrganizations, user]);

  const { name, email } = user;

  const handleGenerateUri = useCallback((data) => setUri(data), []);

  const renderPic = useCallback(
    () => <img src={uri} className={classes.avatar} alt="avatar" />,
    [classes.avatar, uri]
  );

  return (
    <div className={classes.container}>
      <div className={classes.img}>
        {renderPic()}
        <GenerateAvatar name={name} onGenerateUri={handleGenerateUri} />
      </div>
      <div className={classes.information}>
        <p>Имя: {name}</p>
        <p>Электронная почта: {email}</p>
        {userOrgs && userOrgs.length ? (
          <div>
            <p>Организации:</p>
            {userOrgs.map(({ _id, name }, i) => (
              <span key={_id}>
                {i + 1}. {name}
              </span>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
});
