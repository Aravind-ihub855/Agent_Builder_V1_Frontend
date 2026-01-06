import { configureStore } from '@reduxjs/toolkit';
import uiReducer from './slices/uiSlice';
import editorReducer from './slices/editorSlice';

export const store = configureStore({
    reducer: {
        ui: uiReducer,
        editor: editorReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ['ui/showNotification'],
            },
        }),
    devTools: import.meta.env.DEV,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
