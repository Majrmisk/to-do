import { useState } from 'react';
import PropTypes from "prop-types";
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import TaskList from './TaskList';

const Pane = ({ pane, deletePane, updatePaneName, startEditingPane }) => {
    const [newName, setNewName] = useState(pane.name);

    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({ id: pane.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    const handleBlur = () => {
        updatePaneName(pane.id, newName);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            updatePaneName(pane.id, newName);
        }
    };

    return (
        <div ref={setNodeRef} style={style} className="pane">
            <div {...listeners} {...attributes} className="pane-drag-handle"></div>

            <div className="pane-header">
                {pane.isEditing ? (
                    <input
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                        onBlur={handleBlur}
                        onKeyDown={handleKeyPress}
                        maxLength={16}
                        autoFocus
                    />
                ) : (
                    <h2 onClick={() => startEditingPane(pane.id)}>{pane.name || 'Pane'}</h2>
                )}
                <button className="delete-pane" onClick={() => deletePane(pane.id)}>✕</button>
            </div>

            <div className="task-container">
                <TaskList paneId={pane.id}/>
            </div>
        </div>
    );
};

Pane.propTypes = {
    pane: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string,
        isEditing: PropTypes.bool,
    }).isRequired,
    deletePane: PropTypes.func.isRequired,
    updatePaneName: PropTypes.func.isRequired,
    startEditingPane: PropTypes.func.isRequired,
};

export default Pane;
