import React from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import Input from "./Input";
import { getItemStyle } from "../utils/utils";

const TopBottomPanes = ({ items, newItemName, setNewItemName, handleItemSubmit, disabledDrop }) => {
    return (
        <div>
            <form onSubmit={(e) => {
                e.preventDefault();
                handleItemSubmit();
            }}>
                <Input
                    value={newItemName}
                    onChange={(e) => setNewItemName(e.target.value)}
                    placeholder={"+ Add Task Item"}
                />
            </form>
            <Droppable
                droppableId={`bc-drop`}
                isDropDisabled={disabledDrop}
            >
                {(provided, snapshot) => (
                    <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                    >
                        {items?.map((item, index) => (
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
                                        draggable={true}
                                        id="tsd-container"
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

export default TopBottomPanes;
