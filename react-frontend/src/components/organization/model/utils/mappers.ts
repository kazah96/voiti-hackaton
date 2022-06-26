import { User } from 'components/user/auth';

export const OrganizationUsersMap = (data: User[]) => {
  const result = data.map((item) => ({
    name: item.name,
    email: item.email,
    phone: item.phone,
    isActivateToken: item.deviceId,
    _id: item._id,
  }));
  return result;
};
