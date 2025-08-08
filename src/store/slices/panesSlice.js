import { createSlice } from '@reduxjs/toolkit';

const loadPanes = () => {
    const savedPanes = localStorage.getItem('panes');
    return savedPanes ? JSON.parse(savedPanes) : [];
};

const panesSlice = createSlice({
    name: 'panes',
    initialState: loadPanes(),
    reducers: {
        addPane: (state) => {
            state.push({ id: Date.now(), name: '', isEditing: true });
        },
        deletePane: (state, action) => {
            return state.filter((pane) => pane.id !== action.payload);
        },
        updatePaneName: (state, action) => {
            const { id, name } = action.payload;
            const pane = state.find((p) => p.id === id);
            if (pane) {
                pane.name = name;
                pane.isEditing = false;
            }
        },
        startEditingPane: (state, action) => {
            const pane = state.find((p) => p.id === action.payload);
            if (pane) {
                pane.isEditing = true;
            }
        },
        setPanes: (state, action) => {
            return action.payload;
        },
    },
});

export const {
    addPane,
    deletePane,
    updatePaneName,
    startEditingPane,
    setPanes,
} = panesSlice.actions;

export default panesSlice.reducer;
