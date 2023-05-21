import { createContext, useReducer, useEffect } from "react";
import apiService from "../app/apiService";
import { toast } from "react-toastify";
import isValidToken from "../utils/jwt";
import { useNavigate } from "react-router-dom";



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
    switch(action.type) {
        case LOGIN_SUCCESS:
         return {
            ...state,
            isAuthenticated: true,
            payload: { 
                user: action.payload.user || null,
                creator: action.payload.creator || null,
            }
         }; 
         case REGISTER_SUCCESS: 
          return {
            ...state,
            isAuthenticated: true,
            user: action.payload.user
         };
        default:
        return state;
    } 
}
const AuthContext = createContext({ ...initialState});



function AuthProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, initialState);
    const navigate = useNavigate();

    const login = async({ email, password }, callback ) => {
        try {
            const response = await apiService.post("/auth/login", {email, password});
            const { creator, user, accessToken } = response.data;
            console.log("res", response.data);
            if (creator !== null) {
                navigate("/creator", { replace: true });
            } else if ( user !== null) {
                navigate("/", { replace: true })
            }

            const setSession = (accessToken) => {
                if (accessToken) {
                    window.localStorage.setItem("accessToken", accessToken);
                    apiService.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
                } else {
                    window.localStorage.removeItem("accessToken");
                    delete apiService.defaults.headers.common.Authorization;
                }
            }

        setSession(accessToken);
        dispatch({
            type: LOGIN_SUCCESS,
            payload: { 
                user: user ? user : null,
                creator: creator ? creator : null 
            }
        });
        callback();

       }
        catch (error) {
            toast.error(error.message);
       }
    };

    const register = async ({ name, email, password, role }, callback) => {
            const response = await apiService.post("/auth/register", {
                name,
                email,
                password,
                role
            });
            const { user } = response.data;

            dispatch({ 
                type: REGISTER_SUCCESS,
                payload: { user },
            });
            callback();
    };



    return (
        <AuthContext.Provider value={{...state, login, register }}>
            {children}
        </AuthContext.Provider>
    )
}

export { AuthContext, AuthProvider};