import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface Notification {
    id: string;
    type: 'success' | 'error' | 'warning' | 'info';
    title?: string;
    message: string;
    duration?: number;
}

interface UIState {
    sidebarOpen: boolean;
    theme: 'light' | 'dark' | 'system';
    activeModal: string | null;
    notifications: Notification[];
    isLoading: boolean;
    loadingMessage: string | null;
}

const initialState: UIState = {
    sidebarOpen: true,
    theme: 'dark',
    activeModal: null,
    notifications: [],
    isLoading: false,
    loadingMessage: null,
};

const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        toggleSidebar: (state) => {
            state.sidebarOpen = !state.sidebarOpen;
        },
        setSidebarOpen: (state, action: PayloadAction<boolean>) => {
            state.sidebarOpen = action.payload;
        },
        setTheme: (state, action: PayloadAction<'light' | 'dark' | 'system'>) => {
            state.theme = action.payload;
        },
        openModal: (state, action: PayloadAction<string>) => {
            state.activeModal = action.payload;
        },
        closeModal: (state) => {
            state.activeModal = null;
        },
        showNotification: (state, action: PayloadAction<Omit<Notification, 'id'>>) => {
            const id = `notification-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
            state.notifications.push({ ...action.payload, id, duration: action.payload.duration ?? 5000 });
        },
        dismissNotification: (state, action: PayloadAction<string>) => {
            state.notifications = state.notifications.filter((n) => n.id !== action.payload);
        },
        clearAllNotifications: (state) => {
            state.notifications = [];
        },
        setLoading: (state, action: PayloadAction<{ isLoading: boolean; message?: string }>) => {
            state.isLoading = action.payload.isLoading;
            state.loadingMessage = action.payload.message ?? null;
        },
    },
});

export const {
    toggleSidebar,
    setSidebarOpen,
    setTheme,
    openModal,
    closeModal,
    showNotification,
    dismissNotification,
    clearAllNotifications,
    setLoading,
} = uiSlice.actions;

export default uiSlice.reducer;
