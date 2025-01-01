

import {configureStore} from "@reduxjs/toolkit";
import rootReducer from './reducers'; // Импортируйте ваш корневой редюсер

const store = configureStore({
    reducer: rootReducer,
});

window.store = store;


export default store;
