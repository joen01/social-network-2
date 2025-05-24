"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializedApp = exports.initializedSuccess = void 0;
var Auth_reducer_1 = require("./Auth-reducer");
var INITIALIZED_SUCCESS = "INITIALIZED_SUCCESS";
var initialState = {
    initialized: false
};
var appReducer = function (state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case INITIALIZED_SUCCESS: {
            return __assign(__assign({}, state), { initialized: true });
        }
        default:
            return state;
    }
};
var initializedSuccess = function () { return ({ type: INITIALIZED_SUCCESS }); };
exports.initializedSuccess = initializedSuccess;
var initializedApp = function () { return function (dispatch) {
    dispatch((0, Auth_reducer_1.getAuthUserDataThunk)());
}; };
exports.initializedApp = initializedApp;
exports.default = appReducer;
// import { getAuthUserDataThunk } from "./Auth-reducer";
//
// const INITIALIZED_SUCCESS = "INITIALIZED_SUCCESS";
//
// interface InitialStateType {
//     initialized: boolean;
// }
//
// let initialState: InitialStateType = {
//     initialized: false,
// };
//
// type ActionType =
//     | ReturnType<typeof initializedSuccess>;
//
// const appReducer = (state = initialState, action: ActionType): InitialStateType => {
//     switch (action.type) {
//         case INITIALIZED_SUCCESS: {
//             return {
//                 ...state,
//                 initialized: true,
//             };
//         }
//         default:
//             return state;
//     }
// };
//
// export const initializedSuccess = () => ({ type: INITIALIZED_SUCCESS });
//
// export const initializedApp = () => (dispatch: any) => {
//     dispatch(getAuthUserDataThunk());
// };
//
// export default appReducer;
