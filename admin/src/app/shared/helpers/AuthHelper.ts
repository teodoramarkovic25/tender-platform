import { Token } from "../interfaces/login-response.interface";

// const ACCESS_TOKEN_STORAGE_KEY = "token";
//
// const getAccessToken = (): Token | undefined => {
//   if (!localStorage) {
//     return;
//   }
//
//   const value: string | null = localStorage.getItem(ACCESS_TOKEN_STORAGE_KEY);
//   if (!value) {
//     return;
//   }
//
//   try {
//     const token: Token = JSON.parse(value) as Token;
//     if (token) {
//       return token;
//     }
//   } catch (error) {
//     console.error("AUTH LOCAL STORAGE PARSE ERROR", error);
//   }
// };
//
// const setAuth = (auth: AuthModel) => {
//   if (!localStorage) {
//     return;
//   }
//
//   try {
//     const lsValue = JSON.stringify(auth);
//     localStorage.setItem(AUTH_LOCAL_STORAGE_KEY, lsValue);
//   } catch (error) {
//     console.error("AUTH LOCAL STORAGE SAVE ERROR", error);
//   }
// };
//
// const removeAuth = () => {
//   if (!localStorage) {
//     return;
//   }
//
//   try {
//     localStorage.removeItem(AUTH_LOCAL_STORAGE_KEY);
//   } catch (error) {
//     console.error("AUTH LOCAL STORAGE REMOVE ERROR", error);
//   }
// };
//
// export function setupAxios(axios: any) {
//   axios.defaults.headers.Accept = "application/json";
//   axios.interceptors.request.use(
//     (config: { headers: { Authorization: string } }) => {
//       const auth = getAuth();
//       if (auth && auth.api_token) {
//         config.headers.Authorization = `Bearer ${auth.api_token}`;
//       }
//
//       return config;
//     },
//     (err: any) => Promise.reject(err)
//   );
// }
//
// export { getAuth, setAuth, removeAuth, AUTH_LOCAL_STORAGE_KEY };
export {}