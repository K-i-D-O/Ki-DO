import React, { useEffect, useCallback, useContext } from 'react';
import { useStoreActions, useStoreState } from 'easy-peasy';

import { APP_STATE } from '@/constants';
import * as common from '@/utils/Common';

const AppStateContext = React.createContext();

export const useAppContext = () => {
  return useContext(AppStateContext);
};

export default function AppContextProvider(props) {
  const {
    loginUser,
    setState,
    checkLogin,
    signupUser,
    updateUser,
    withdrawalUser,
    resetPassword,
    getSystemCode,
    getAreaSearchList,
    setSearchOptions,
  } = useStoreActions((actions) => ({
    loginUser: actions.login.loginUser,
    setState: actions.login.changeAppState,
    checkLogin: actions.login.checkLogin,
    signupUser: actions.login.signupUser,
    updateUser: actions.login.updateUser,
    withdrawalUser: actions.login.withdrawalUser,
    resetPassword: actions.login.resetPassword,
    getSystemCode: actions.code.getSystemCode,
    getAreaSearchList: actions.app.getAreaSearchList,
    setSearchOptions: actions.app.setSearchOptions,
  }));
  const state = useStoreState((store) => store.login.appstate);

  const logout = useCallback(async () => {
    setState(APP_STATE.PUBLIC);
  }, [setState]);

  const login = useCallback(
    (reqData) => {
      loginUser(reqData);
    },
    [loginUser]
  );

  const signup = useCallback(
    (reqData) => {
      signupUser(reqData);
    },
    [signupUser]
  );

  const update = useCallback(
    (reqData) => {
      updateUser(reqData);
    },
    [updateUser]
  );

  const withdrawal = useCallback(
    (reqData) => {
      withdrawalUser(reqData);
    },
    [withdrawalUser]
  );

  const reset = useCallback(
    (reqData) => {
      resetPassword(reqData);
    },
    [resetPassword]
  );

  // check loggedin on mount
  useEffect(() => {
    state === APP_STATE.UNKNOWN && checkLogin();
    getSystemCode();
    getAreaSearchList();

    // const initSearchCondition = {
    //   start_date: common.checkWeekend(6),
    //   end_date: common.checkWeekend(7),
    //   people: 2,
    // };
    // setSearchOptions(initSearchCondition);
  }, []);

  return (
    <AppStateContext.Provider
      value={{
        state,
        logout,
        login,
        signup,
        update,
        withdrawal,
        reset,
      }}
    >
      {props.children}
    </AppStateContext.Provider>
  );
}

// export default AppStateContext;
