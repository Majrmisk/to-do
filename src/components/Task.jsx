import { useState } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import PropTypes from "prop-types";

const Task = ({ task, toggleComplete, deleteTask, updateTaskName, startEditingTask }) => {
    const [newName, setNewName] = useState(task.name);

    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition
    } = useSortable({ id: task.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    const handleBlur = () => {
        if (task.isEditing) updateTaskName(task.id, newName);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            updateTaskName(task.id, newName);
        }
    };

    return (
        <div ref={setNodeRef} style={style} className="task">
            <div {...listeners} {...attributes} className="task-drag-handle"></div>
            <input
                type="checkbox"
                checked={task.completed}
                onChange={(e) => {
                    e.stopPropagation();
                    toggleComplete(task.id);
                }}
            />
            {task.isEditing ? (
                <input
                    type="text"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    onBlur={handleBlur}
                    onKeyDown={handleKeyPress}
                    autoFocus
                />
            ) : (
                <span
                    className="flex-grow mx-2 cursor-pointer"
                    style={{ textDecoration: task.completed ? 'line-through' : 'none' }}
                    onClick={() => startEditingTask(task.id)}
                >
                    {task.name || 'Untitled'}
                </span>
            )}
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    deleteTask(task.id);
                }}
                className="text-white"
            >
                ✕
            </button>
        </div>
    );
};

Task.propTypes = {
    task: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string,
        completed: PropTypes.bool,
        isEditing: PropTypes.bool,
        paneId: PropTypes.number,
    }).isRequired,
    toggleComplete: PropTypes.func.isRequired,
    deleteTask: PropTypes.func.isRequired,
    updateTaskName: PropTypes.func.isRequired,
    startEditingTask: PropTypes.func.isRequired,
};

export default Task;
