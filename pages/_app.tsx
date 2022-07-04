import '../styles/globals.css'
import type {AppProps} from 'next/app'
import { ThemeProvider } from "@mui/material/styles";
import jwt_decode from "jwt-decode";
import Router from "next/router";
import { createContext, useReducer} from "react";

import theme from "../styles/theme";

const AuthContext = createContext(null);
const initialState = {
    id: null,
    isAuthenticated: false,
    role: null,
    token: null,
    username: null,
};

async function checkJwt() {
    const ISSERVER = typeof window === "undefined";
    if (!ISSERVER) {
        const authInfo = await JSON.parse(localStorage.getItem("jwt") );
        if (authInfo ) {
            const jwt_Token_decoded: any = jwt_decode(authInfo);
            if (jwt_Token_decoded.exp * 1000 < Date.now()) {
                initialState.isAuthenticated = false;
                initialState.username = null;
                initialState.role = null;
                initialState.token = null;
                initialState.id = null;
                localStorage.clear(); // this runs only when I refresh the page or reload on route change it dosent work
            } else {
                initialState.isAuthenticated = true;
                initialState.username = jwt_Token_decoded.username;
                initialState.role = jwt_Token_decoded.role;
                initialState.token = authInfo;
                initialState.id = jwt_Token_decoded.id;
            }
        }
    }
    return initialState;
}

const clearCacheData = () => {
    caches.keys().then((names) => {
        names.forEach((name) => {
            caches.delete(name);
        });
    });
    alert("Complete Cache Cleared");
};

const reducer = (state: any, action: { type: any; payload: { _id: any; role: any; token: any; user: any; aboutMe: any; city: any; education: any; employmentType: any; expectedSalary: any; isRelocation: any; jobs: any; langData: any; location: any; opportunity: any; prefStartDate: any; preferredRole: any; profileVideo: any; referral: any; socialLink: any; skillData: any; visa: any; }; }) => {
    switch (action.type) {
        case "LOGIN":
            return {
                ...state,
                id: action.payload._id,
                isAuthenticated: true,
                role: action.payload.role,
                token: action.payload.token,
                user: action.payload.user,
            };
        case "LOGOUT":
            localStorage.clear();
            initialState.isAuthenticated = false;
            initialState.username = null;
            initialState.role = null;
            initialState.token = null;
            initialState.id = null;
            caches.keys().then((names) => {
                names.forEach((name) => {
                    caches.delete(name).then((r) => alert("Complete Cache Cleared"));
                });
            });
            Router.push("/login").then(r => {});
            return {
                ...state,
                id: null,
                isAuthenticated: false,
                role: null,
                token: null,
                user: null,
            };
        default:
            return state;
    }
};

function MyApp({Component, pageProps}: AppProps) {
    const [state, dispatch] = useReducer(reducer, initialState);
    // console.log("app, stat", state)
    checkJwt().then((r) => "");
    return (
        <ThemeProvider theme={theme}>
            <AuthContext.Provider
                value={{
                    dispatch,
                    state,
                }}
            >
                <Component {...pageProps} />
            </AuthContext.Provider>
        </ThemeProvider>
    );
}

export { AuthContext, checkJwt };


export default MyApp
