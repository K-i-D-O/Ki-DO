import { action, thunk } from 'easy-peasy';

import { ApiService } from '@/store/index';
import { STATUS } from '@/constants/index';
import BaseModel from './Base';

const checkAppVersion = thunk(async (actions, payload, { injections }) => {
  const { api } = injections;

  actions.updateStatus(STATUS.FETCHING);
  // let response = await api.checkAppVersion();
  // if (response.ok) {
  // let version = 9;
  // actions.setVersion(version);
  // }
  actions.updateStatus(STATUS.SUCCESS);
});

const getAreaSearchList = thunk(async (actions, payload) => {
  actions.setIsLoading();
  actions.updateStatus(STATUS.FETCHING);
  try {
    const response = await ApiService.areaSearchList();

    actions.updateStatus(response.status ? STATUS.SUCCESS : STATUS.FAILED);
    if (!response.status) {
      console.warn(response.error);
    } else {
      actions.setAreaSearchList(response.data);
    }
  } catch (error) {
    actions.setError(error);
  }
  actions.setIsLoading();
});

const getBookmarkList = thunk(async (actions, payload) => {
  actions.setIsLoading();
  actions.updateStatus(STATUS.FETCHING);
  try {
    const response = await ApiService.bookmarkList(payload);

    actions.updateStatus(response.status ? STATUS.SUCCESS : STATUS.FAILED);
    if (!response.status) {
      console.warn(response.error);
    } else {
      const temp = response.data.map((item) => {
        return { campId: item.camp_id, id: item.id };
      });
      actions.setBookmarkList(temp);
    }
  } catch (error) {
    actions.setError(error);
  }
  actions.setIsLoading();
});

const getCampList = thunk(async (actions, payload) => {
  actions.setIsLoading();
  actions.updateStatus(STATUS.FETCHING);
  try {
    let newPayload = Object.assign({}, payload);
    if (newPayload.preference) {
      let preferences = '';
      if (newPayload.preference.length > 0) {
        for (let i = 0; i < newPayload.preference.length; i++) {
          if (i == 0) {
            preferences =
              newPayload.preference[i].table_name +
              '-' +
              newPayload.preference[i].field_name +
              '-' +
              newPayload.preference[i].field_value;
          } else {
            preferences +=
              ',' +
              newPayload.preference[i].table_name +
              '-' +
              newPayload.preference[i].field_name +
              '-' +
              newPayload.preference[i].field_value;
          }
        }
      }
      newPayload.preference = preferences;
    }

    const response = await ApiService.campList(newPayload);

    actions.updateStatus(response.status ? STATUS.SUCCESS : STATUS.FAILED);
    if (!response.status) {
      console.warn(response.error);
    } else {
      if (newPayload.offset && newPayload.offset > 0) {
        actions.setMergedCampList(response.data);
      } else {
        actions.setFirstCampList(response.data);
      }
    }
  } catch (error) {
    actions.setError(error);
  }
  actions.setIsLoading();
});

const getCampDefaultInfo = thunk(async (actions, payload) => {
  actions.setIsLoading();
  actions.updateStatus(STATUS.FETCHING);
  try {
    const response = await ApiService.campDefaultInfo(payload);

    actions.updateStatus(response.status ? STATUS.SUCCESS : STATUS.FAILED);
    if (!response.status) {
      console.warn(response.error);
    } else {
      actions.setCampDefaultInfo(response.data);
    }
  } catch (error) {
    actions.setError(error);
  }
  actions.setIsLoading();
});

const getCampFacilityInfo = thunk(async (actions, payload) => {
  actions.updateStatus(STATUS.FETCHING);
  try {
    const response = await ApiService.campFacilityInfo(payload);

    actions.updateStatus(response.status ? STATUS.SUCCESS : STATUS.FAILED);
    if (!response.status) {
      console.warn(response.error);
    } else {
      actions.setCampFacilityInfo(response.data);
    }
  } catch (error) {
    actions.setError(error);
  }
});

const getCampPayInfo = thunk(async (actions, payload) => {
  actions.updateStatus(STATUS.FETCHING);
  try {
    const response = await ApiService.campPayInfo(payload);

    actions.updateStatus(response.status ? STATUS.SUCCESS : STATUS.FAILED);
    if (!response.status) {
      console.warn(response.error);
    } else {
      actions.setCampPayInfo(response.data);
    }
  } catch (error) {
    actions.setError(error);
  }
});

const getCampZoneInfo = thunk(async (actions, payload) => {
  actions.updateStatus(STATUS.FETCHING);
  try {
    const response = await ApiService.campZoneInfo(payload);

    actions.updateStatus(response.status ? STATUS.SUCCESS : STATUS.FAILED);
    if (!response.status) {
      console.warn(response.error);
    } else {
      actions.setCampZoneInfo(response.data);
    }
  } catch (error) {
    actions.setError(error);
  }
});

const getCampAllReservation = thunk(async (actions, payload) => {
  actions.updateStatus(STATUS.FETCHING);
  try {
    const response = await ApiService.campAllReservation(payload);

    actions.updateStatus(response.status ? STATUS.SUCCESS : STATUS.FAILED);
    if (!response.status) {
      console.warn(response.error);
    } else {
      actions.setCampAllReservation(response.data);
    }
  } catch (error) {
    actions.setError(error);
  }
});

const getReservationList = thunk(async (actions, payload) => {
  actions.setIsLoading();
  actions.updateStatus(STATUS.FETCHING);
  try {
    const response = await ApiService.reservationList(payload);
    actions.updateStatus(response.status ? STATUS.SUCCESS : STATUS.FAILED);
    if (!response.status) {
      console.warn(response.error);
    } else {
      if (payload.end_yn) {
        if (payload.end_yn == 'y') {
          actions.setReservationCompletionList(response.data);
        } else {
          actions.setReservationProceedingList(response.data);
        }
      } else {
        actions.setReservationAllList(response.data);
      }
    }
  } catch (error) {
    actions.setError(error);
  }
  actions.setIsLoading();
});

const getSystemNoticeList = thunk(async (actions, payload) => {
  actions.setIsLoading();
  actions.updateStatus(STATUS.FETCHING);
  try {
    const response = await ApiService.systemBoardList(payload);

    actions.updateStatus(response.status ? STATUS.SUCCESS : STATUS.FAILED);
    if (!response.status) {
      console.warn(response.error);
    } else {
      actions.setSystemNoticeList(response.data);
    }
  } catch (error) {
    actions.setError(error);
  }
  actions.setIsLoading();
});

const getSystemFaqList = thunk(async (actions, payload) => {
  actions.setIsLoading();
  actions.updateStatus(STATUS.FETCHING);
  try {
    const response = await ApiService.systemBoardList(payload);

    actions.updateStatus(response.status ? STATUS.SUCCESS : STATUS.FAILED);
    if (!response.status) {
      console.warn(response.error);
    } else {
      actions.setSystemFaqList(response.data);
    }
  } catch (error) {
    actions.setError(error);
  }
  actions.setIsLoading();
});

const AppModel = {
  ...BaseModel(),
  isLoading: false,
  searchOptions: {
    start_date: null,
    end_date: null,
    people: 2,
  },
  bookmarkList: [],
  checkAppVersion,
  getBookmarkList,
  getAreaSearchList,
  getCampList,
  getCampDefaultInfo,
  getCampFacilityInfo,
  getCampPayInfo,
  getCampZoneInfo,
  getCampAllReservation,
  getReservationList,
  getSystemNoticeList,
  getSystemFaqList,
  setError: action((state, error) => {
    state.error = error.message;
  }),
  setIsLoading: action((state) => {
    state.isLoading = !state.isLoading;
  }),
  setSearchOptions: action((state, options) => {
    state.searchOptions = options;
  }),
  setBookmarkList: action((state, list) => {
    state.bookmarkList = list;
  }),
  setVersion: action((state, version) => {
    state.version = version;
  }),
  setAreaSearchList: action((state, areaSearchList) => {
    state.areaSearchList = areaSearchList;
  }),
  setFirstCampList: action((state, campList) => {
    state.campList = campList;
  }),
  setMergedCampList: action((state, campList) => {
    const mergedList = state.campList.concat(campList);
    state.campList = mergedList.filter(
      (item, pos) => mergedList.indexOf(item) === pos
    );
  }),
  setCampDefaultInfo: action((state, campDefaultInfo) => {
    state.campDefaultInfo = campDefaultInfo;
  }),
  setCampFacilityInfo: action((state, campFacilityInfo) => {
    state.campFacilityInfo = campFacilityInfo;
  }),
  setCampPayInfo: action((state, campPayInfo) => {
    state.campPayInfo = campPayInfo;
  }),
  setCampZoneInfo: action((state, campZoneInfo) => {
    state.campZoneInfo = campZoneInfo;
  }),
  setCampAllReservation: action((state, campAllReservation) => {
    state.campAllReservation = campAllReservation;
  }),
  setReservationAllList: action((state, campReservationList) => {
    state.campReservationAllList = campReservationList;
  }),
  setReservationCompletionList: action((state, reservationList) => {
    state.reservationCompletionList = reservationList;
  }),
  setReservationProceedingList: action((state, reservationList) => {
    state.reservationProceedingList = reservationList;
  }),
  setSystemNoticeList: action((state, systemNoticeList) => {
    state.systemNoticeList = systemNoticeList;
  }),
  setSystemFaqList: action((state, systemFaqList) => {
    state.systemFaqList = systemFaqList;
  }),
  setSelectedReservationItem: action((state, reservationItem) => {
    state.selectedReservationItem = reservationItem;
  }),
};

export default AppModel;
