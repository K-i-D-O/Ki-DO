import { create } from "apisauce";
import apiMonitor from "./Monitor";
import setInterceptor from "./Interceptor";

export const URIS = {
  VERSION: "about",
  AUTH: "auth",
  CAMPS: "camps",
  USERS: "users",
  LOGS: "logs",
  BOARDS: "boards",
  CODES: "codes",
  LOGOUT: "logout",
  PAYMENTS: "payments",
  ADMIN: "admin",
};

const createApiClient = () => {
  let api = create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL,
    // baseURL: 'http://localhost:9001/api/camping/v2',
    // baseURL: 'http://3.36.110.78:9001/api/camping/v2',
    headers: {
      Accept: "application/json",
      "Cache-Control": "no-cache",
      "Content-Type": "application/json",
    },
    timeout: 15000,
  });

  api.addMonitor(apiMonitor);
  // use interceptor if using oAuth for authentication
  // setInterceptor(api);

  const setAuthorizationHeader = (accessToken) => api.setHeader("x-access-token", accessToken);

  return {
    // client modifiers
    setAuthorizationHeader,
    // checkAppVersion,
  };
};

export default { createApiClient };
