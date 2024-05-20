import { action, thunk } from 'easy-peasy';

import { ApiService } from '@/store/index';
import { STATUS } from '@/constants/index';
import BaseModel from './Base';

const getSystemCode = thunk(async (actions, payload) => {
  actions.setIsLoading();
  actions.updateStatus(STATUS.FETCHING);
  try {
    if (payload) {
      const response = await ApiService.systemCodeList();
      if (!response.status) {
        console.warn(response.error);
      } else {
        actions.setSystemCode(response.data);
      }
    } else {
      const cptpCodes = await ApiService.systemCodeList({ upper_code: 'CPTP' });
      actions.updateStatus(cptpCodes.status ? STATUS.SUCCESS : STATUS.FAILED);
      if (!cptpCodes.status) {
        console.warn(cptpCodes.error);
      } else {
        actions.setSystemCptpCode(cptpCodes.data);
      }

      const grtpCodes = await ApiService.systemCodeList({ upper_code: 'GRTP' });
      actions.updateStatus(grtpCodes.status ? STATUS.SUCCESS : STATUS.FAILED);
      if (!grtpCodes.status) {
        console.warn(grtpCodes.error);
      } else {
        actions.setSystemGrtpCode(grtpCodes.data);
      }

      const lcdvCodes = await ApiService.systemCodeList({ upper_code: 'LCDV' });
      actions.updateStatus(lcdvCodes.status ? STATUS.SUCCESS : STATUS.FAILED);
      if (!lcdvCodes.status) {
        console.warn(lcdvCodes.error);
      } else {
        actions.setSystemLcdvCode(lcdvCodes.data);
      }

      const amfcCodes = await ApiService.systemCodeList({ upper_code: 'AMFC' });
      actions.updateStatus(amfcCodes.status ? STATUS.SUCCESS : STATUS.FAILED);
      if (!amfcCodes.status) {
        console.warn(amfcCodes.error);
      } else {
        actions.setSystemAmfcCode(amfcCodes.data);
      }

      const nbfcCodes = await ApiService.systemCodeList({ upper_code: 'NBFC' });
      actions.updateStatus(nbfcCodes.status ? STATUS.SUCCESS : STATUS.FAILED);
      if (!nbfcCodes.status) {
        console.warn(nbfcCodes.error);
      } else {
        actions.setSystemNbfcCode(nbfcCodes.data);
      }

      const thdvCodes = await ApiService.systemCodeList({ upper_code: 'THDV' });
      actions.updateStatus(thdvCodes.status ? STATUS.SUCCESS : STATUS.FAILED);
      if (!thdvCodes.status) {
        console.warn(thdvCodes.error);
      } else {
        actions.setSystemThdvCode(thdvCodes.data);
      }

      const ptacCodes = await ApiService.systemCodeList({ upper_code: 'PTAC' });
      actions.updateStatus(ptacCodes.status ? STATUS.SUCCESS : STATUS.FAILED);
      if (!ptacCodes.status) {
        console.warn(ptacCodes.error);
      } else {
        actions.setSystemPtacCode(ptacCodes.data);
      }

      const bkdvCodes = await ApiService.systemCodeList({ upper_code: 'BKDV' });
      actions.updateStatus(bkdvCodes.status ? STATUS.SUCCESS : STATUS.FAILED);
      if (!bkdvCodes.status) {
        console.warn(bkdvCodes.error);
      } else {
        actions.setSystemBkdvCode(bkdvCodes.data);
      }
    }
  } catch (error) {
    actions.setError(error);
  }
  actions.setIsLoading();
});

const CodeModel = {
  ...BaseModel(),
  isLoading: false,
  getSystemCode,
  setError: action((state, error) => {
    state.error = error.message;
  }),
  setIsLoading: action((state) => {
    state.isLoading = !state.isLoading;
  }),
  setSystemCode: action((state, systemCode) => {
    state.temp = systemCode;
  }),
  setSystemCptpCode: action((state, systemCode) => {
    state.cptp = systemCode;
  }),
  setSystemGrtpCode: action((state, systemCode) => {
    state.grtp = systemCode;
  }),
  setSystemLcdvCode: action((state, systemCode) => {
    state.lcdv = systemCode;
  }),
  setSystemAmfcCode: action((state, systemCode) => {
    state.amfc = systemCode;
  }),
  setSystemNbfcCode: action((state, systemCode) => {
    state.nbfc = systemCode;
  }),
  setSystemThdvCode: action((state, systemCode) => {
    state.thdv = systemCode;
  }),
  setSystemPtacCode: action((state, systemCode) => {
    state.ptac = systemCode;
  }),
  setSystemBkdvCode: action((state, systemCode) => {
    state.bkdv = systemCode;
  }),
};

export default CodeModel;
