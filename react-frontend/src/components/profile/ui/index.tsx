import { useAuthContext } from 'components/user/auth';
import { observer } from 'mobx-react';
import { useCallback, useState } from 'react';
import { GenerateAvatar } from 'shared/lib/GenerateAvatar';
import { useStyles } from './styles';

export const UserInformation = observer(() => {
  const [uri, setUri] = useState(null);
  const classes = useStyles();

  const {
    auth: { user },
  } = useAuthContext();

  const { name, email, roles, organizations } = user;

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
        <div>{name}</div>
        <div>{email}</div>
        <div>
          {roles.map((item) => (
            <span>{item}</span>
          ))}
        </div>
        <div>
          {organizations.map((item) => (
            <span>{item}</span>
          ))}
        </div>
      </div>
    </div>
  );
});
