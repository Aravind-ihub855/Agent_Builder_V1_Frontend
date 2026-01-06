import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface EditorDraft {
    id: string;
    content: string;
    lastModified: number;
    isDirty: boolean;
}

interface EditorState {
    drafts: Record<string, EditorDraft>;
    activeDraftId: string | null;
    autoSaveEnabled: boolean;
    autoSaveInterval: number;
}

const initialState: EditorState = {
    drafts: {},
    activeDraftId: null,
    autoSaveEnabled: true,
    autoSaveInterval: 30000,
};

const editorSlice = createSlice({
    name: 'editor',
    initialState,
    reducers: {
        createDraft: (state, action: PayloadAction<{ id: string; content?: string }>) => {
            const { id, content = '' } = action.payload;
            state.drafts[id] = { id, content, lastModified: Date.now(), isDirty: false };
            state.activeDraftId = id;
        },
        updateDraft: (state, action: PayloadAction<{ id: string; content: string }>) => {
            const { id, content } = action.payload;
            if (state.drafts[id]) {
                state.drafts[id].content = content;
                state.drafts[id].lastModified = Date.now();
                state.drafts[id].isDirty = true;
            }
        },
        saveDraft: (state, action: PayloadAction<string>) => {
            const id = action.payload;
            if (state.drafts[id]) {
                state.drafts[id].isDirty = false;
                state.drafts[id].lastModified = Date.now();
            }
        },
        deleteDraft: (state, action: PayloadAction<string>) => {
            delete state.drafts[action.payload];
            if (state.activeDraftId === action.payload) state.activeDraftId = null;
        },
        setActiveDraft: (state, action: PayloadAction<string | null>) => {
            state.activeDraftId = action.payload;
        },
        setAutoSave: (state, action: PayloadAction<boolean>) => {
            state.autoSaveEnabled = action.payload;
        },
        clearAllDrafts: (state) => {
            state.drafts = {};
            state.activeDraftId = null;
        },
    },
});

export const { createDraft, updateDraft, saveDraft, deleteDraft, setActiveDraft, setAutoSave, clearAllDrafts } = editorSlice.actions;
export default editorSlice.reducer;
