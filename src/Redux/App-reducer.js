import {getAuthUserDataThunk} from "./Auth-reducer";

const INITIALIZED_SUCCESS = "INITIALIZED_SUCCESS";


let initialState = {
    initialized: false
};


const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case INITIALIZED_SUCCESS: {
            return {
                ...state,
                initialized: true,
            }
        }
        default:
            return state;
    }
};


export const initializedSuccess = () => ({type: INITIALIZED_SUCCESS});

export const initializedApp = () => (dispatch) => {
    dispatch(getAuthUserDataThunk())
}
//     let promise = dispatch(getAuthUserDataThunk());
//     // dispatch(somethengelse());
//     // dispatch(somethengelse());
//     Promise.all([promise])
//         .then(() => {
//             dispatch(initializedSuccess())
//         })
// }

export default appReducer