import { ReactComponent as Cross } from './assets/common/cross.svg';
import { ReactComponent as Key } from './assets/common/key.svg';
import { ReactComponent as Delete } from './assets/common/delete.svg';
import { ReactComponent as CheckMark } from './assets/common/check-mark.svg';
import { ReactComponent as Logi } from './assets/common/logi.svg';
import { ReactComponent as Devices } from './assets/common/ustroistva.svg';
import { ReactComponent as Cabinet } from './assets/common/kabinet.svg';
import { ReactComponent as Org } from './assets/common/organizaciya.svg';

const commonIcon = {
  'cross': Cross,
  'organization': Org,
  'key': Key,
  'delete': Delete,
  'check-mark': CheckMark,
  'logi': Logi,
  'devices': Devices,
  'rrom': Cabinet,
};

export const common = {
  ...commonIcon,
};
