import { createSlice } from '@reduxjs/toolkit';

const loadTasks = () => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
};

const tasksSlice = createSlice({
    name: 'tasks',
    initialState: loadTasks(),
    reducers: {
        addTask: (state, action) => {
            const { paneId, name } = action.payload;
            state.push({
                id: Date.now(),
                name: name || '',
                completed: false,
                isEditing: false,
                paneId
            });
        },
        deleteTask: (state, action) => {
            return state.filter(task => task.id !== action.payload);
        },
        updateTaskName: (state, action) => {
            const task = state.find(t => t.id === action.payload.id);
            if (task) {
                task.name = action.payload.name;
                task.isEditing = false;
            }
        },
        toggleComplete: (state, action) => {
            const task = state.find(t => t.id === action.payload);
            if (task) {
                task.completed = !task.completed;
            }
        },
        startEditingTask: (state, action) => {
            const task = state.find(t => t.id === action.payload);
            if (task) {
                task.isEditing = true;
            }
        },
        setTasksInPane: (state, action) => {
            const { paneId, tasks: updatedTasks } = action.payload;
            return [
                ...state.filter(task => task.paneId !== paneId),
                ...updatedTasks
            ];
        }
    }
});

export const { addTask,
    deleteTask,
    updateTaskName,
    toggleComplete,
    startEditingTask,
    setTasksInPane } = tasksSlice.actions;
export default tasksSlice.reducer;
