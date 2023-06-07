import { createContext, useReducer, useEffect } from "react";
import apiService from "../app/apiService";
import isValidToken from "../utils/jwt";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const initialState = {
  isInitialized: false,
  isAuthenticated: false,
  user: null,
  creator: null,
};

const INITIALIZE = "AUTH.INITIALIZE";
const LOGIN_SUCCESS = "AUTH.LOGIN_SUCCESS";
const REGISTER_SUCCESS = "AUTH.REGISTER_SUCCESS";
const LOGOUT = "AUTH.LOGOUT";
const UPDATED_PROFILE = "AUTH.UPDATED_PROFILE";

const reducer = (state, action) => {
  switch (action.type) {
    case INITIALIZE:
      return {
        ...state,
        isInitialized: true,
        isAuthenticated: action.payload,
        user: action.payload.user || null,
        creator: action.payload.creator || null,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user || null,
        creator: action.payload.creator || null,
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
        creator: null,
      };
      case UPDATED_PROFILE: {
        const { name, avatarUrl, bio } = action.payload;
        return {
          ...state,
          user: { ...state.user, name, avatarUrl, bio} || null,
          creator: { ...state.creator, name, avatarUrl, bio } || null
        }
      }

    default:
      return state;
  }
};

const setSession = (accessToken) => {
  if (accessToken) {
    window.localStorage.setItem("accessToken", accessToken);
    apiService.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  } else {
    window.localStorage.removeItem("accessToken");
    delete apiService.defaults.headers.common.Authorization;
  }
};

const AuthContext = createContext({ ...initialState });

function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const navigate = useNavigate();
  const updatedProfile = useSelector((state) => state.user.updatedProfile);
  const updatedCreatorProfile = useSelector((state) => state.creator.updatedCreatorProfile)

  useEffect(() => {
    const initialize = async () => {
      try {
        const accessToken = window.localStorage.getItem("accessToken");

        if (accessToken && isValidToken(accessToken)) {
          setSession(accessToken);
          const response = await apiService.get("/auth/me");

          const { creator, user } = response.data;
          if (user) {
            const userResponse = await apiService.get("/users/me");
            dispatch({
              type: INITIALIZE,
              payload: { isAuthenticated: true, user: userResponse.data },
            });
          } else if (creator) {
            const creatorResponse = await apiService.get("/creators/me");
            dispatch({
              type: INITIALIZE,
              payload: { isAuthenticated: true, creator: creatorResponse.data },
            });
          } else {
            setSession(null);
            dispatch({
              type: INITIALIZE,
              payload: { isAuthenticated: false, user: null, creator: null },
            });
          }
        }
      } catch (error) {
        setSession(null);
        dispatch({
          type: INITIALIZE,
          payload: { isAuthenticated: false, user: null, creator: null },
        });
      }
    };
    initialize();
  }, []);

  useEffect(() => {
    if (updatedProfile) 
      dispatch({ type: UPDATED_PROFILE, payload: updatedProfile});
    if (updatedCreatorProfile)
    dispatch({ type: UPDATED_PROFILE, payload: updatedCreatorProfile})
  }, [updatedCreatorProfile, updatedProfile]);

  const login = async ({ email, password }, callback) => {
    const response = await apiService.post("/auth/login", {
      email,
      password,
    });
    const { creator, user, accessToken } = response.data;

    if (creator !== null) {
      navigate("/creators", { replace: true });
      setSession(accessToken);
    } else if (user !== null) {
      navigate("/", { replace: true });
      setSession(accessToken);
    }
    dispatch({
      type: LOGIN_SUCCESS,
      payload: {
        user: user ? user : null,
        creator: creator ? creator : null,
      },
    });
    callback();
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

  const logout = async () => {
    setSession(null);
    dispatch({
      type: LOGOUT,
    });
  };

  return (
    <AuthContext.Provider value={{ ...state, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
