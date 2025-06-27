import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './features/counter/counterSlice'; //this was a default export, we can rename exports like this when importing
import logger from './middlewares/logger';

export const store = configureStore({
    reducer: {
        counter: counterReducer
    },
    // middleware
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger)
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch