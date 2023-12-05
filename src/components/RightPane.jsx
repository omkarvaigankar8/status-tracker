import React from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { getItemStyle } from "../utils/utils";

const RightPane = ({ columns, disabledDropStatuses, disabledDropRight }) => {
    return (
        <div
            id="tsd-container"
            onDragOver={(e) => {
                const rightPane = document.getElementById("right-pane");
                rightPane.style.display = "flex";
            }}
        >
            <Droppable
                droppableId={`rc-drop`}
                isDropDisabled={disabledDropRight}
            >
                {(provided, snapshot) => (
                    <div
                        ref={provided.innerRef}
                        className="right-drop-area"
                        {...provided.droppableProps}
                    >
                        {columns?.map((el, ind) => (
                            <Draggable key={el.key} draggableId={el.key} index={ind}>
                                {(provided, snapshot) => (
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        className="status-task-add-area"
                                    >
                                        <Droppable
                                            droppableId={el.key}
                                            isDropDisabled={disabledDropStatuses}
                                        >
                                            {(provided, snapshot) => (
                                                <div
                                                    ref={provided.innerRef}
                                                    className="drop-area"
                                                    {...provided.droppableProps}
                                                >
                                                    <h4>{el.name}</h4>
                                                    {el?.items?.map((item, index) => (
                                                        <Draggable
                                                            key={item.key}
                                                            draggableId={item.key}
                                                            index={index}
                                                        >
                                                            {(provided, snapshot) => (
                                                                <div
                                                                    ref={provided.innerRef}
                                                                    {...provided.draggableProps}
                                                                    {...provided.dragHandleProps}
                                                                    style={getItemStyle(
                                                                        snapshot.isDragging,
                                                                        provided.draggableProps.style
                                                                    )}
                                                                    className="drag-card"
                                                                >
                                                                    <div
                                                                        style={{
                                                                            display: "flex",
                                                                            justifyContent: "space-around",
                                                                        }}
                                                                    >
                                                                        {item.name}
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </Draggable>
                                                    ))}
                                                    {provided.placeholder}
                                                </div>
                                            )}
                                        </Droppable>
                                    </div>
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </div>
    );
};

export default RightPane;
