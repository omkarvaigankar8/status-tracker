import React from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import Input from "./Input";
import { getItemStyle } from "../utils/utils";

const LeftPane = ({ items, newGroupName, setNewGroupName, handleTaskSubmit, disabledDrop }) => {
    return (
        <div>
            <form onSubmit={(e) => {
                e.preventDefault();
                handleTaskSubmit()
            }}>
                <Input
                    type="text"
                    value={newGroupName}
                    onChange={(e) => setNewGroupName(e.target.value)}
                    placeholder={"+ Add Task Status"}
                />
            </form>
            <Droppable
                droppableId={`tc-drop`}
                isDropDisabled={disabledDrop}
            >
                {(provided, snapshot) => (
                    <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                    >
                        {items.map((item, index) => (
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
    );
};

export default LeftPane;
