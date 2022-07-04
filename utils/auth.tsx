import jwt_decode from "jwt-decode";
import {checkJwt} from "../pages/_app";


const authenticate = (token: any, cb: { (): void; (): void; (): void; }) => {
    if (typeof window !== "undefined") {
        localStorage.setItem("jwt", JSON.stringify(token));
        cb();
    }
};

const isAuthenticated = async () => {
    const info = await checkJwt()
    return info.isAuthenticated;
}


const authData = () => {
    const ISSERVER = typeof window === "undefined";
    // if (typeof window !== "undefined") {
    if (!ISSERVER) {
        const authInfo = JSON.parse(localStorage.getItem("jwt"));
        const jwt = authInfo.token;

        const decoded: any = jwt_decode(jwt);

        return { ...decoded, token: jwt };
    } else return false;
};

const userInfo = async () => {
    const ISSERVER = typeof window === "undefined";
    // if (typeof window !== "undefined") {
    if (!ISSERVER) {
        const authInfo = JSON.parse(localStorage.getItem("jwt") );
        const jwt = authInfo.token;

        const decoded: any = jwt_decode(jwt);

        return { ...decoded, token: jwt };
    } else return false;
};

export { authData, authenticate, isAuthenticated, userInfo };

// import jwt_decode from 'jwt-decode';
// import {createContext, ProviderProps, useReducer} from "react";
// import moment from "moment";
//
// export const authenticate = (token: any, cb: () => void) => {
//
//     if (typeof window !== 'undefined') {
//         localStorage.setItem('jwt', JSON.stringify(token));
//         cb();
//     }
// }
//
//
// export const isAuthenticated = () => {
//     if (typeof window === 'undefined') return false;
//     if (localStorage.getItem('jwt')) {
//         const exp : any = jwt_decode(JSON.parse(localStorage.getItem('jwt') || '{}'));
//         if ((new Date()).getTime() < exp.exp*1000 ) {
//             console.log('a true')
//             return true;
//         } else {
//             localStorage.removeItem('jwt');
//             console.log('b false')
//             return false
//         }
//
//     } else {
//         return false
//     };
// }
//
// export const userInfo = () => {
//     const jwt = JSON.parse(localStorage.getItem('jwt') || '{}') ;
//     const decoded : any = jwt_decode(jwt);
//     return {...decoded, token: jwt}
// }
//
//
// if (typeof window !== 'undefined'){
//     const item = localStorage.getItem("jwt")
//     if (item) {
//         const jwt_Token_decoded : any = jwt_decode(localStorage.getItem("jwt") || '{}');
//         // console.log(jwt_Token_decoded.exp * 1000);
//         // console.log(Date.now());
//         // if (jwt_Token_decoded.exp * 1000 < Date.now()) {
//         //     localStorage.clear(); // this runs only when I refresh the page or reload on route change it doesn't work
//         // } else {
//         //     initialState.user = jwt_Token_decoded;
//         // }
//     }
// }
//
//
// const AuthContext = createContext({
//     user: null,
// });
// const AuthReducer = (state: any, action: { type: any; payload: any; }) => {
//     switch (action.type) {
//         case "LOGIN":
//             return {
//                 ...state,
//                 user: action.payload,
//             };
//         case "LOGOUT":
//             return {
//                 ...state,
//                 user: null,
//             };
//         default:
//             return state;
//     }
// };
//
// const clearCacheData = () => {
//     if (typeof window !== 'undefined'){
//         const timer = localStorage.getItem("timer")
//         if (timer) {
//             if (moment(parseInt(timer)).add(6, "hours").unix() > moment().unix()) {
//                 cleaner()
//                 localStorage.setItem("timer", String(Date.now()))
//             }
//         } else {
//             localStorage.setItem("timer", String(Date.now()))
//         }
//     }
//
// };
//
// const cleaner = () => {
//     caches.keys().then((names) => {
//         names.forEach((name) => {
//             caches.delete(name).then(r => alert('Complete Cache Cleared'));
//         });
//     });
// }
//
// const initialState = {
//     isAuthenticated: false,
//     user: null,
//     email: null,
//     token: null,
// };
// const reducer = (state: any, action: { type: any; payload: { user: any; token: any; }; }) => {
//     switch (action.type) {
//         case "LOGIN":
//             localStorage.setItem("user", JSON.stringify(action.payload.user));
//             localStorage.setItem("token", JSON.stringify(action.payload.token));
//             return {
//                 ...state,
//                 isAuthenticated: true,
//                 user: action.payload.user,
//                 token: action.payload.token
//             };
//         case "LOGOUT":
//             localStorage.clear();
//             return {
//                 ...state,
//                 isAuthenticated: false,
//                 user: null
//             };
//         default:
//             return state;
//     }
// };
//
// export const AuthProvider = (props: JSX.IntrinsicAttributes & ProviderProps<{ user: null; login: (userData: any) => void; logout: () => void; }>) => {
//     // const [state, dispatch] = useReducer(AuthReducer, initialState);
//
//     const [state, dispatch] = useReducer(reducer, initialState);
//
//     clearCacheData()
//
//
//     return (
//         <AuthContext.Provider
//
//
//             // value={{ user: state.user, login, logout }}
//             {...props}
//         />
//     );
// };
//
// export {AuthContext};