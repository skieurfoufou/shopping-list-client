import { useReducer } from "react";
import { login as loginApi } from "../apis/auth.api";
import jwt_decode from "jwt-decode";

const initialState = { token: "" };

enum AuthActions {
  SET_TOKEN = "LOGIN",
  LOAD_TOKEN = "INIT",
  CLEAR_TOKEN = "CLEAR",
}
const LOCAL_STORAGE_TOKEN = "token";

function reducer(
  state: typeof initialState,
  action: { type: AuthActions; [key: string]: any }
): typeof initialState {
  const clearToken = () => {
    console.log("token expired -- remove from storage");
    localStorage.removeItem(LOCAL_STORAGE_TOKEN);
    return { token: "" };
  };

  switch (action.type) {
    case AuthActions.SET_TOKEN:
      try {
        const { token } = action;

        localStorage.setItem(LOCAL_STORAGE_TOKEN, token);

        return { token: token };
      } catch (error) {
        return { token: "" };
      }

    case AuthActions.LOAD_TOKEN:
      const tokenFromStorage = localStorage.getItem(LOCAL_STORAGE_TOKEN);

      if (!tokenFromStorage) {
        console.log("token not found");

        return { ...state };
      }

      const decoded = jwt_decode<{ exp: number }>(tokenFromStorage);
      const isTokenExpired = decoded.exp * 1000 < Date.now();

      if (isTokenExpired) {
        return clearToken();
      }
      console.log("token is valid");
      return { token: tokenFromStorage };

    case AuthActions.CLEAR_TOKEN:
      return clearToken();

    default:
      throw new Error();
  }
}

export function useAuth() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const loginAction = async (email: string, password: string) => {
    try {
      const res = await loginApi({
        email: email,
        password: password,
      });

      console.log(res);
      console.log("got token baby!");

      dispatch({ type: AuthActions.SET_TOKEN, token: res.token });
    } catch (error) {
      console.log(error);
    }
  };

  return {
    token: state.token,
    isLoggedIn: !!state.token,
    login: loginAction,
    init: () => dispatch({ type: AuthActions.LOAD_TOKEN }),
    clear: () => dispatch({ type: AuthActions.CLEAR_TOKEN }),
    foo: "foo",
  };
}
