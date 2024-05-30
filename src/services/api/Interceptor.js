// import {getLoginCredentials, setLoginCredentials} from '../Keychain';
import { URIS } from '@/services/api/index';

export default (api) => {
  api.axiosInstance.interceptors.response.use(
    (response) => {
      return response;
    },

    async (error) => {
      let originalRequest = error.config;
      // console.log('LOG_got_error', originalRequest);
      if (
        error.response &&
        error.response.status == 401 &&
        !originalRequest._retry &&
        !originalRequest.headers._retry
      ) {
        // console.log('LOG_status_401_error', '-> refreshing now ');
        originalRequest._retry = true;
        //get refresh token
        const credentials = await getLoginCredentials();
        /* const credentials = {
                  refreshToken: 'some_token_lwncenSdfaefvarfSWeretg4234Asfd@4Afa',
                }; */
        if (credentials) {
          const { refreshToken } = credentials;
          // api call for access token using refresh token
          return new Promise(async (resolve, reject) => {
            const response = await api.post(
              URIS.AUTH + '/refresh',
              { refreshToken },
              { headers: { _retry: true } }
            );
            //store accessToken and data
            if (response.ok && response.status == 200) {
              api.setHeader('x-access-token', response.data.accessToken);
              originalRequest.headers['x-access-token'] =
                response.data.accessToken;
              await setLoginCredentials(JSON.stringify(response.data));
              resolve(api.axiosInstance(originalRequest));
            } else {
              return Promise.resolve(error);
            }
          });
        } else {
          return Promise.resolve(error);
        }
      } else {
        return Promise.resolve(error);
      }
    }
  );
};
