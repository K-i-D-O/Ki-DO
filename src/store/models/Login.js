import { action, thunk } from 'easy-peasy';

import { ApiService } from '@/store/index';
import { APP_STATE, STATUS } from '@/constants';
import BaseModel from './Base';
import { utf8HexStringToString } from '@/utils/Common';
const checkLogin = thunk(async (actions, payload, { dispatch, injections }) => {
  const { api } = injections;
  const credentials = localStorage.getItem('rg_auth');

  if (credentials) {
    let apiResponse = await ApiService.loginUser({
      username: utf8HexStringToString(credentials).split('|')[0],
      password: utf8HexStringToString(credentials).split('|')[1],
    });
    if (apiResponse.status === 200 || apiResponse.status === 201) {
      if (apiResponse.data && apiResponse.data.accessToken) {
        api.setAuthorizationHeader(apiResponse.data.accessToken);
      }

      let userInfo = {};
      if (apiResponse.data) {
        userInfo.nickname = apiResponse.data.nickname;
        userInfo.id = apiResponse.data.id;
        userInfo.name = apiResponse.data.name;
        userInfo.cellphone = apiResponse.data.cellphone_number;
        userInfo.email = apiResponse.data.email;
        userInfo.address = apiResponse.data.address;
        userInfo.detailaddress = apiResponse.data.detail_address;
        userInfo.pushyn = apiResponse.data.alert_push_yn;
        userInfo.messageyn = apiResponse.data.alert_message_yn;
        userInfo.logintype = apiResponse.data.login_type;
        userInfo.vehicle_number = apiResponse.data.vehicle_number;
        userInfo.preferencelist = apiResponse.data.rg_user_prfns;
        userInfo.vacancynotificationlist = apiResponse.data.rg_user_vcnfs;
      }
      actions.changeAppState(APP_STATE.PRIVATE);
      actions.mergeState(userInfo);
    } else {
      const reset = resetLoginCredentials();
      if (reset) {
        actions.changeAppState(APP_STATE.PUBLIC);
      }
    }
  } else {
    actions.changeAppState(APP_STATE.PUBLIC);
  }
});

const loginUser = thunk(async (actions, payload, { dispatch }) => {
  if (!payload.username || !payload.password) {
    return;
  }
  actions.updateStatus(STATUS.FETCHING);
  let apiResponse = await ApiService.loginUser(payload);

  setTimeout(async () => {
    if (apiResponse.status == 200 || apiResponse.status == 201) {
      actions.updateStatus(STATUS.SUCCESS);
      let keyResponse = await setLoginCredentials(
        payload.username,
        payload.password
      );

      let userInfo = {};
      if (apiResponse.data) {
        userInfo.nickname = apiResponse.data.nickname;
        userInfo.id = apiResponse.data.id;
        userInfo.name = apiResponse.data.name;
        userInfo.cellphone = apiResponse.data.cellphone_number;
        userInfo.email = apiResponse.data.email;
        userInfo.address = apiResponse.data.address;
        userInfo.detailaddress = apiResponse.data.detail_address;
        userInfo.pushyn = apiResponse.data.alert_push_yn;
        userInfo.messageyn = apiResponse.data.alert_message_yn;
        userInfo.logintype = apiResponse.data.login_type;
        userInfo.vehicle_number = apiResponse.data.vehicle_number;
        userInfo.preferencelist = apiResponse.data.rg_user_prfns;
        userInfo.vacancynotificationlist = apiResponse.data.rg_user_vcnfs;
      }

      actions.changeAppState(APP_STATE.PRIVATE);
      actions.mergeState(userInfo);
    } else {
      actions.updateStatus(STATUS.FAILED);
      if (apiResponse.status === 404) {
        alert('이메일 확인');
      } else if (apiResponse.status === 401) {
        if (apiResponse.data && apiResponse.data.login_fail_count) {
          alert('비밀번호 확인');
        } else {
          alert('비밀번호 5회 이상 오류\n비밀번호 찾기 이동');
        }
      }
    }
  }, 1000);

  ApiService.setAuthorizationHeader(apiResponse.data.accessToken);
  //dispatch.user.requestUserProfile();
});

const signupUser = thunk(async (actions, payload) => {
  actions.updateStatus(STATUS.FETCHING);
  let apiResponse = await ApiService.signupUser(payload);

  if (apiResponse.status === 201) {
    actions.updateStatus(STATUS.SUCCESS);
    alert('회원가입 성공');
  } else {
    actions.updateStatus(STATUS.FAILED);
    if (apiResponse.status === 400) {
      if (apiResponse.data && apiResponse.data.message) {
        if (apiResponse.data.message.indexOf('Email') > 0) {
          alert('이메일 중복');
        } else {
          alert('휴대전화번호 중복');
        }
      } else {
        alert('사용자 정보 중복');
      }
    } else {
      alert('회원가입 오류');
    }
  }
});

const updateUser = thunk(async (actions, payload, { dispatch }) => {
  if (
    !payload.id ||
    !payload.username ||
    !payload.password ||
    !payload.cellphone_number ||
    !payload.email
  ) {
    return;
  }
  actions.updateStatus(STATUS.FETCHING);
  let apiResponse = await ApiService.updateUser(payload);

  //setTimeout(async () => {
  if (apiResponse.status == 200) {
    actions.updateStatus(STATUS.SUCCESS);
    let keyResponse = await setLoginCredentials(
      payload.username,
      payload.password
    );

    let userInfo = {};
    if (apiResponse.data) {
      userInfo.nickname = apiResponse.data.nickname;
      userInfo.name = apiResponse.data.name;
      userInfo.cellphone = apiResponse.data.cellphone_number;
      userInfo.email = apiResponse.data.email;
      userInfo.username = payload.username;
      userInfo.password = payload.password;
      userInfo.address = apiResponse.data.address;
      userInfo.vehicle_number = apiResponse.data.vehicle_number;
      userInfo.detailaddress = apiResponse.data.detail_address;
      userInfo.pushyn = apiResponse.data.alert_push_yn;
      userInfo.messageyn = apiResponse.data.alert_message_yn;
    }
    actions.mergeState(userInfo);

    alert('프로필 수정 성공');
  } else {
    actions.updateStatus(STATUS.FAILED);
    if (apiResponse.status == 400) {
      if (apiResponse.message.indexOf('Email')) {
        alert('이메일 중복');
      } else {
        alert('전화번호 중복');
      }
    } else if (apiResponse.status == 404) {
      alert('프로필 수정 오류');
    }
  }
  //}, 1000);
});

const withdrawalUser = thunk(async (actions, payload) => {
  if (
    !payload.id ||
    !payload.cellphone_number ||
    !payload.email ||
    !payload.withdrawal_yn
  ) {
    return;
  }
  actions.updateStatus(STATUS.FETCHING);
  let apiResponse = await ApiService.updateUser(payload);

  setTimeout(async () => {
    if (apiResponse.status == 200) {
      actions.updateStatus(STATUS.SUCCESS);
      const reset = resetLoginCredentials();
      if (reset) {
        actions.changeAppState(APP_STATE.PUBLIC);

        actions.onLoginInputChange({ key: 'username', value: null });
        actions.onLoginInputChange({ key: 'password', value: null });
        actions.deleteState([
          'id',
          'name',
          'cellphone',
          'email',
          'address',
          'detailaddress',
          'pushyn',
          'messageyn',
          'logintype',
          'preferencelist',
          'vacancynotificationlist',
        ]);
      }
    }
  }, 1000);
});

const resetPassword = thunk(async (actions, payload) => {
  if (
    !payload.id ||
    !payload.cellphone_number ||
    !payload.email ||
    !payload.password
  ) {
    return;
  }
  actions.updateStatus(STATUS.FETCHING);
  let apiResponse = await ApiService.updateUser(payload);

  if (apiResponse.status == 200) {
    actions.updateStatus(STATUS.SUCCESS);
  } else {
    actions.updateStatus(STATUS.FAILED);
  }
});

const LoginModel = {
  ...BaseModel(),
  loginUser,
  checkLogin,
  signupUser,
  updateUser,
  withdrawalUser,
  resetPassword,
  resetPasswordData: {
    dump_id: null,
    user_id: '',
    email: '',
    cellphone_number: '',
  },
  appstate: APP_STATE.UNKNOWN,
  changeAppState: action((state, payload) => {
    state.appstate = payload;
  }),
  onLoginInputChange: action((state, { key, value }) => {
    state[key] = value;
  }),
  deleteState: action((state, keys) => {
    for (let key of keys) {
      delete state[key];
    }
  }),
  setResetPasswordData: action((state, payload) => {
    state.resetPasswordData = payload;
  }),
};

export default LoginModel;
