import { createContext, useReducer, useEffect } from "react";
import apiService from "../app/apiService";
import isValidToken from "../utils/jwt";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const initialState = {
  isInitialized: false,
  isAuthenticated: false,
  user: null,
};

const INITIALIZE = "AUTH.INITIALIZE";
const LOGIN_SUCCESS = "AUTH.LOGIN_SUCCESS";
const REGISTER_SUCCESS = "AUTH.REGISTER_SUCCESS";
const LOGOUT = "AUTH.LOGOUT";

const reducer = (state, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        user: {
          user: action.payload.user || null,
          creator: action.payload.creator || null,
        },
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
      };
    case LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };

    default:
      return state;
  }
};
const AuthContext = createContext({ ...initialState });

function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const navigate = useNavigate();

  const setSession = (accessToken) => {
    if (accessToken) {
      window.localStorage.setItem("accessToken", accessToken);
      apiService.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
    } else {
      window.localStorage.removeItem("accessToken");
      delete apiService.defaults.headers.common.Authorization;
    }
  };

  const login = async ({ email, password }, callback) => {
      const response = await apiService.post("/auth/login", {
        email,
        password,
      });
      const { creator, user, accessToken } = response.data;
      console.log("res", response.data);
      if (creator !== null) {
        navigate("/creator", { replace: true });
      } else if (user !== null) {
        navigate("/", { replace: true });

        setSession(accessToken);
        dispatch({
          type: LOGIN_SUCCESS,
          payload: {
            user: user ? user : null,
            creator: creator ? creator : null,
          },
        });
        callback();
      }
  };

  const register = async ({ name, email, password, role }, callback) => {
      const response = await apiService.post("/auth/register", {
        name,
        email,
        password,
        role,
      });
      const { user } = response.data;

      dispatch({
        type: REGISTER_SUCCESS,
        payload: { user },
      });
      callback();
  };

  const logout = async (callback) => {
      setSession(null);
      dispatch({
        type: LOGOUT,
      });
      callback();
  };

  return (
    <AuthContext.Provider value={{ ...state, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
