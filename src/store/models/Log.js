import { action, thunk } from 'easy-peasy';

import { ApiService } from '@/store/index';
import { STATUS } from '@/constants/index';
import BaseModel from './Base';

const getCampReadRecentLog = thunk(async (actions, payload) => {
  actions.setIsLoading();
  actions.updateStatus(STATUS.FETCHING);
  try {
    const response = await ApiService.getCampReadRecentLog(payload);

    actions.updateStatus(response.status ? STATUS.SUCCESS : STATUS.FAILED);
    if (!response.status) {
      console.warn(response.error);
    } else {
      actions.setCampReadRecentLog(response.data);
    }
  } catch (error) {
    actions.setError(error);
  }
  actions.setIsLoading();
});

const LogModel = {
  ...BaseModel(),
  isLoading: false,
  getCampReadRecentLog,
  setError: action((state, error) => {
    state.error = error.message;
  }),
  setIsLoading: action((state) => {
    state.isLoading = !state.isLoading;
  }),
  setCampReadRecentLog: action((state, campReadRecentLog) => {
    state.campReadRecentLog = campReadRecentLog;
  }),
};

export default LogModel;
