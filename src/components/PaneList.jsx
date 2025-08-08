import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { SortableContext, arrayMove } from '@dnd-kit/sortable';

import Pane from './Pane';
import {
    addPane,
    deletePane,
    updatePaneName,
    startEditingPane,
    setPanes,
} from '../store/slices/panesSlice';

const PaneList = () => {
    const panes = useSelector((state) => state.panes);
    const dispatch = useDispatch();

    const [isDragging, setIsDragging] = useState(false);

    const onDragStart = () => {
        setIsDragging(true);
    };

    const onDragEnd = (event) => {
        setIsDragging(false);

        const { active, over } = event;
        if (!over) return;

        const oldIndex = panes.findIndex((pane) => pane.id === active.id);
        const newIndex = panes.findIndex((pane) => pane.id === over.id);

        if (oldIndex !== newIndex) {
            dispatch(setPanes(arrayMove(panes, oldIndex, newIndex)));
        }
    };

    return (
        <DndContext
            collisionDetection={closestCenter}
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
        >
            <SortableContext items={panes.map((pane) => pane.id)}>
                <motion.div
                    className="pane-list"
                    layout={!isDragging}
                    transition={{ layout: { duration: 0.3, ease: 'easeInOut' } }}
                >
                    <AnimatePresence>
                        {panes.map((pane) => (
                            <motion.div
                                key={pane.id}
                                layout={!isDragging}
                                initial={{ opacity: 0, scale: 1 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 1 }}
                                transition={{ duration: 0.2 }}
                            >
                                <Pane
                                    pane={pane}
                                    deletePane={(id) => dispatch(deletePane(id))}
                                    updatePaneName={(id, name) => dispatch(updatePaneName({ id, name }))}
                                    startEditingPane={(id) => dispatch(startEditingPane(id))}
                                />
                            </motion.div>
                        ))}

                        <motion.div
                            key="add-button"
                            layout={!isDragging}
                            transition={{ layout: { duration: 0.2, ease: 'easeInOut' } }}
                            className="add-pane-btn"
                            onClick={() => dispatch(addPane())}
                        >
                            <svg
                                width="200"
                                height="200"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                            >
                                <line x1="12" y1="5" x2="12" y2="19" />
                                <line x1="5" y1="12" x2="19" y2="12" />
                            </svg>
                        </motion.div>
                    </AnimatePresence>
                </motion.div>
            </SortableContext>
        </DndContext>
    );
};

export default PaneList;
