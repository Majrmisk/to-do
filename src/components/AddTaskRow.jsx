import { useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from "prop-types";

import { addTask } from '../store/slices/tasksSlice';

const AddTaskRow = ({ paneId }) => {
    const dispatch = useDispatch();
    const [taskName, setTaskName] = useState('');

    const confirmAdd = () => {
        if (taskName.trim()) {
            dispatch(addTask({ paneId, name: taskName.trim() }));
        }
        setTaskName('');
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            confirmAdd();
        }
    };

    const handleBlur = () => {
        confirmAdd();
    };

    return (
        <div className="new-task-row">
            <span>+</span>
            <input
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
                onBlur={handleBlur}
                onKeyDown={handleKeyDown}
                placeholder="Add Task"
            />
        </div>
    );
};

AddTaskRow.propTypes = {
    paneId: PropTypes.number.isRequired,
};

export default AddTaskRow;
