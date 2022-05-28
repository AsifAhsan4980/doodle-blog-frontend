import jwt_decode from 'jwt-decode';
import {createContext, ProviderProps, useReducer} from "react";
import moment from "moment";

export const authenticate = (token: any, cb: () => void) => {

    if (typeof window !== 'undefined') {
        localStorage.setItem('jwt', JSON.stringify(token));
        cb();
    }
}

export const isAuthenticated = () => {
    if (typeof window === 'undefined') return false;
    if (localStorage.getItem('jwt')) {
        const exp : any = jwt_decode(JSON.parse(localStorage.getItem('jwt') || '{}'));
        if ((new Date()).getTime() < exp * 1000) {
            return true;
        } else {
            localStorage.removeItem('jwt');
            return false
        }

    } else return false;
}

export const userInfo = () => {
    const jwt = JSON.parse(localStorage.getItem('jwt') || '{}') ;
    const decoded : any = jwt_decode(jwt);
    return {...decoded, token: jwt}
}


const initialState = {
    user: null,
};
if (typeof window !== 'undefined'){
    const item = localStorage.getItem("jwt")
    if (item) {
        const jwt_Token_decoded : any = jwt_decode(localStorage.getItem("jwt") || '{}');
        console.log(jwt_Token_decoded.exp * 1000);
        console.log(Date.now());
        if (jwt_Token_decoded.exp * 1000 < Date.now()) {
            localStorage.clear(); // this runs only when I refresh the page or reload on route change it doesn't work
        } else {
            initialState.user = jwt_Token_decoded;
        }
    }
}


const AuthContext = createContext({
    user: null,
});
const AuthReducer = (state: any, action: { type: any; payload: any; }) => {
    switch (action.type) {
        case "LOGIN":
            return {
                ...state,
                user: action.payload,
            };
        case "LOGOUT":
            return {
                ...state,
                user: null,
            };
        default:
            return state;
    }
};

const clearCacheData = () => {
    if (typeof window !== 'undefined'){
        const timer = localStorage.getItem("timer")
        if (timer) {
            if (moment(parseInt(timer)).add(6, "hours").unix() > moment().unix()) {
                cleaner()
                localStorage.setItem("timer", String(Date.now()))
            }
        } else {
            localStorage.setItem("timer", String(Date.now()))
        }
    }

};

const cleaner = () => {
    caches.keys().then((names) => {
        names.forEach((name) => {
            caches.delete(name).then(r => alert('Complete Cache Cleared'));
        });
    });
}

export const AuthProvider = (props: JSX.IntrinsicAttributes & ProviderProps<{ user: null; login: (userData: any) => void; logout: () => void; }>) => {
    const [state, dispatch] = useReducer(AuthReducer, initialState);
    clearCacheData()
    const login = (userData: { token: string; }) => {
        localStorage.setItem("JWT_Token", userData.token);
        dispatch({
            type: "LOGIN",
            payload: userData,
        });
    };
    const logout = () => {
        localStorage.clear();
        dispatch({ type: 'LOGOUT', payload : null});
    };

    return (
        <AuthContext.Provider
            // value={{ user: state.user, login, logout }}
            {...props}
        />
    );
};

export {AuthContext};