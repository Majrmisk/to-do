import { useSelector, useDispatch } from 'react-redux';
import { DndContext, closestCenter } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy, arrayMove } from "@dnd-kit/sortable";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import PropTypes from "prop-types";

import Task from './Task';
import AddTaskRow from './AddTaskRow';
import {
    deleteTask,
    toggleComplete,
    updateTaskName,
    startEditingTask,
    setTasksInPane
} from '../store/slices/tasksSlice';

const TaskList = ({ paneId }) => {
    const allTasks = useSelector(state => state.tasks.filter(task => task.paneId === paneId));
    const dispatch = useDispatch();

    const activeTasks = allTasks.filter(task => !task.completed);
    const completedTasks = allTasks.filter(task => task.completed);

    const onActiveDragEnd = (event) => {
        const { active, over } = event;
        if (!over) return;

        const oldIndex = activeTasks.findIndex(task => task.id === active.id);
        const newIndex = activeTasks.findIndex(task => task.id === over.id);
        if (oldIndex !== newIndex) {
            const updatedActive = arrayMove(activeTasks, oldIndex, newIndex);
            const updatedTasks = [...updatedActive, ...completedTasks];
            dispatch(setTasksInPane({ paneId, tasks: updatedTasks }));
        }
    };

    const onCompletedDragEnd = (event) => {
        const { active, over } = event;
        if (!over) return;

        const oldIndex = completedTasks.findIndex(task => task.id === active.id);
        const newIndex = completedTasks.findIndex(task => task.id === over.id);
        if (oldIndex !== newIndex) {
            const updatedCompleted = arrayMove(completedTasks, oldIndex, newIndex);
            const updatedTasks = [...activeTasks, ...updatedCompleted];
            dispatch(setTasksInPane({ paneId, tasks: updatedTasks }));
        }
    };

    return (
        <div className="task-list">
            <DndContext
                collisionDetection={closestCenter}
                onDragEnd={onActiveDragEnd}
                modifiers={[restrictToVerticalAxis]}
            >
                <SortableContext items={activeTasks.map(task => task.id)} strategy={verticalListSortingStrategy}>
                    <div>
                        {activeTasks.map(task => (
                            <Task
                                key={task.id}
                                task={task}
                                toggleComplete={() => dispatch(toggleComplete(task.id))}
                                deleteTask={() => dispatch(deleteTask(task.id))}
                                updateTaskName={(id, name) => dispatch(updateTaskName({ id, name }))}
                                startEditingTask={() => dispatch(startEditingTask(task.id))}
                            />
                        ))}
                        <AddTaskRow paneId={paneId} />
                    </div>
                </SortableContext>
            </DndContext>

            {completedTasks.length > 0 && <hr />}

            <DndContext
                collisionDetection={closestCenter}
                onDragEnd={onCompletedDragEnd}
                modifiers={[restrictToVerticalAxis]}
            >
                <SortableContext items={completedTasks.map(task => task.id)} strategy={verticalListSortingStrategy}>
                    <div>
                        {completedTasks.map(task => (
                            <Task
                                key={task.id}
                                task={task}
                                toggleComplete={() => dispatch(toggleComplete(task.id))}
                                deleteTask={() => dispatch(deleteTask(task.id))}
                                updateTaskName={(id, name) => dispatch(updateTaskName({ id, name }))}
                                startEditingTask={() => dispatch(startEditingTask(task.id))}
                            />
                        ))}
                    </div>
                </SortableContext>
            </DndContext>
        </div>
    );
};

TaskList.propTypes = {
    paneId: PropTypes.number.isRequired,
};

export default TaskList;
