import { configureStore } from '@reduxjs/toolkit';
import panesReducer from './slices/panesSlice';
import tasksReducer from './slices/tasksSlice';

export const store = configureStore({
    reducer: {
        panes: panesReducer,
        tasks: tasksReducer,
    },
});

store.subscribe(() => {
    const { panes, tasks } = store.getState();
    localStorage.setItem('panes', JSON.stringify(panes));
    localStorage.setItem('tasks', JSON.stringify(tasks));
});

export default store;
