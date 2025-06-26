import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './features/counter/counterSlice'; //this was a default export, we can rename exports like this when imporitng

export const store = configureStore({
    reducer: {
        counter: counterReducer
    }
});
