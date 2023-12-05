import React, { useState } from "react";
import { Container, Section, Bar } from '@column-resizer/react';
import { DragDropContext } from "react-beautiful-dnd";
import TopBottomPanes from "../components/TopBottomPanes";
import LeftPane from "../components/LeftPane";
import RightPane from "../components/RightPane";
import { reorder } from '../utils/utils';
import { useNavigate } from "react-router-dom";
const Todos = () => {
    const navigate = useNavigate();
    const [statuses, setStatuses] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [rightPaneColumns, setRightPaneColumns] = useState([]);
    const [disabledDropRight, setDisabledDropRight] = useState(false);
    const [disabledDropStatuses, setDisabledDropStatuses] = useState(false);
    const [disabledDropTop, setDisabledDropTop] = useState(false);
    const [disabledDropBottom, setDisabledDropBottom] = useState(false);
    const [newGroupName, setNewGroupName] = useState("");
    const [newItemName, setNewItemName] = useState("");
    function onDragEnd(result) {
        const { source, destination } = result;
        if (!destination) {
            return;
        }

        const sKey = source.droppableId;
        const dKey = destination.droppableId;

        if (sKey === dKey) {
            if (sKey === "tc-drop") {
                const updatedStatuses = reorder(statuses, source.index, destination.index);
                setStatuses(updatedStatuses);
            } else if (sKey === "bc-drop") {
                const updatedTasks = reorder(tasks, source.index, destination.index);
                setTasks(updatedTasks);
            }
            else if (sKey.includes("-rp-drop") && dKey.includes("-rp-drop")) {
                const destinationGroup = rightPaneColumns.find((val) => val.key == sKey);
                const updatedTasks = reorder(destinationGroup.items, source.index, destination.index)
                const newRightPaneColumns = rightPaneColumns?.map((el, index) => {
                    if (el.key === dKey) {
                        el.items = updatedTasks;
                    }
                    return el;
                });
                setRightPaneColumns(newRightPaneColumns)

            }
        }
        else if (sKey === "tc-drop" && dKey === "rc-drop") {
            const sourceGroup = statuses;
            const destinationGroup = rightPaneColumns;
            // Check if the destination group is a new group
            const isDestinationNewGroup = destinationGroup === undefined;

            // Create a copy of the source and destination groups
            const sourceItems = Array.from(sourceGroup);
            const destinationItems = isDestinationNewGroup
                ? [] // If the destination is a new group, start with an empty array
                : Array.from(destinationGroup);

            // Remove the item from the source group
            const [movedItem] = sourceItems.splice(source.index, 1);

            // Add the item to the destination group
            destinationItems.splice(destination.index, 0, movedItem);

            // Update the source and destination groups in the state
            setStatuses(sourceItems);
            setRightPaneColumns(destinationItems);
            if (isDestinationNewGroup) {
            } else {
                // newState[dInd].items = destinationItems;
            }
        } else if (sKey === "bc-drop") {
            // Moving item to a different group
            //   const sourceGroup = state[sInd];
            //   const destinationGroup = state[dInd];

            const sourceGroup = tasks;
            const destinationGroup = rightPaneColumns.find((val) => val.key == dKey);

            // Check if the destination group is a new group
            const isDestinationNewGroup = destinationGroup === undefined;

            // Create a copy of the source and destination groups
            const sourceItems = Array.from(sourceGroup);
            const destinationItems = isDestinationNewGroup
                ? [] // If the destination is a new group, start with an empty array
                : Array.from(destinationGroup.items);

            // Remove the item from the source group
            const [movedItem] = sourceItems.splice(source.index, 1);

            // Add the item to the destination group
            destinationItems.splice(destination.index, 0, movedItem);

            const newRightPaneColumns = rightPaneColumns?.map((el, index) => {
                if (el.key === dKey) {
                    el.items = destinationItems;
                }
            });

            // Update the source and destination groups in the state
            setTasks(sourceItems);
            if (isDestinationNewGroup) {
                setRightPaneColumns(newRightPaneColumns);
            } else {
                // newState[dInd].items = destinationItems;
            }

            // Filter out empty groups
            // setState(newState.filter(group => group.items.length > 0));
        } else if (sKey.includes("-rp-drop") && dKey.includes("-rp-drop")) {
            const sourceGroup = rightPaneColumns.find((val) => val.key == sKey);
            const destinationGroup = rightPaneColumns.find((val) => val.key == dKey);
            const isDestinationNewGroup = destinationGroup === undefined;
            const sourceItems = Array.from(sourceGroup.items);
            const destinationItems = isDestinationNewGroup
                ? []
                : Array.from(destinationGroup.items);
            const [movedItem] = sourceItems.splice(source.index, 1);
            destinationItems.splice(destination.index, 0, movedItem);
            const newRightPaneColumns = rightPaneColumns?.map((el, index) => {
                if (el.key === dKey) {
                    el.items = destinationItems;
                } else if (el.key === sKey) {
                    el.items = sourceItems;
                }
                return el;
            });
            if (isDestinationNewGroup) {
                setRightPaneColumns(newRightPaneColumns);
            }
        }
    }


    const onDragStart = (e) => {
        setDisabledDropRight(
            e.source?.droppableId === "bc-drop" ||
            e.source?.droppableId.includes("-rp-drop")
        );
        setDisabledDropTop(
            e.source?.droppableId === "bc-drop" ||
            e.source?.droppableId.includes("-rp-drop")
        );
        setDisabledDropBottom(
            e.source?.droppableId === "tc-drop" ||
            e.source?.droppableId.includes("-rp-drop")
        );
        setDisabledDropStatuses(e.source?.droppableId === "tc-drop");
    };
    const handleItemSubmit = () => {
        if (newItemName) {
            const newTasks = [...tasks];
            newTasks.push({
                key: `${new Date().getTime()}`,
                name: newItemName,
            });
            setTasks(newTasks);
            setNewItemName("");
        } // Call your submit function
    }
    const handleTaskSubmit = () => {
        if (newGroupName) {
            setStatuses([
                ...statuses,
                {
                    name: newGroupName,
                    items: [],
                    key: `${new Date().getTime()}-rp-drop`,
                },
            ]);
            setNewGroupName("");
        }
    }
    return (
        <div className='container'>
            <Container className="page">
                <button className="button" onClick={() => {
                    navigate('/graph', { state: rightPaneColumns })
                }}>Graph</button>
                <DragDropContext onDragEnd={onDragEnd} onDragStart={onDragStart}>
                    <Section maxSize={600} minSize={300} className="left-side">
                        <h5 className="column-head">LeftPane</h5>
                        <Container vertical={true} style={{ height: '100vh', background: '#80808080' }}>
                            <Section className="top-panel">
                                <h4 className="section-head">Top Pane</h4>
                                <LeftPane
                                    items={statuses}
                                    newGroupName={newGroupName}
                                    setNewGroupName={setNewGroupName}
                                    handleTaskSubmit={handleTaskSubmit}
                                    disabledDrop={disabledDropTop}
                                />
                            </Section>
                            <Bar size={10} className='bar' />
                            <Section className="bottom-panel">
                                <h4 className="section-head">Bottom Pane</h4>
                                <TopBottomPanes
                                    items={tasks}
                                    newItemName={newItemName}
                                    setNewItemName={setNewItemName}
                                    handleItemSubmit={handleItemSubmit}
                                    disabledDrop={disabledDropBottom}
                                />
                            </Section>
                        </Container>
                    </Section>
                    <Bar size={10} className='bar bar-col' />
                    <Section minSize={800}>
                        <div className="right-side">
                            <h5 className="column-head">Right Pane</h5>
                            <RightPane
                                columns={rightPaneColumns}
                                disabledDropStatuses={disabledDropStatuses}
                                disabledDropRight={disabledDropRight}
                            />
                        </div>
                    </Section>
                </DragDropContext>
            </Container>
        </div>
    );
}

export default Todos