import { action, thunk } from 'easy-peasy';

import { STATUS } from '@/constants/index';

const BaseModel = () => ({
  status: STATUS.NOT_STARTED,
  updateStatus: action((state, status) => {
    state.status = status;
  }),
  mergeState: action((state, extra) => {
    Object.assign(state, extra);
  }),
});

export default BaseModel;
