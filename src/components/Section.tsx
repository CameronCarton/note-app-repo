import { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { faPen } from '@fortawesome/free-solid-svg-icons'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import React, { useRef } from "react";

interface SectionProps {
    themeColors: string[];
}

function Section({themeColors}: SectionProps) {

    const toDoColor: string = themeColors[3];
    const [editTaskText,setEditTaskText] = useState([0,0,0]);
    const [selectedTaskText,setSelectedTaskText] = useState("");
    const [tasks, setTasks] = useState([
        [],
        [],
        ["Task 1", "Task 2"],
    ]);
    const editRef = useRef(null);


    
    // add a new task to a list
    const addTask = (list:number) => {
        const newTasks = [...tasks];
        newTasks[list].push("");
        setTasks(newTasks);
        setEditTaskText([1,list,tasks[list].length-1]);
    }

    // add task from existing list to another list
    const addTaskFromList = (list:number) => {
        // check if the selected task is empty
        if(selectedTaskText!=""){
            const newTasks = [...tasks];
            newTasks[list].push(selectedTaskText);
            setTasks(newTasks);
            setSelectedTaskText("");
        }
    }

    // delete task from a list
    const deleteTask = (list:number, index:number) => {
        const newTasks = [...tasks];
        newTasks[list].splice(index, 1);
        setTasks(newTasks);
    }

    // edit the text of a task
    const editTask = (list:number, index:number) => {
        setEditTaskText([1,list,index]);
    }

    // edit the text of a task
    const confirmEditTask = (list:number, index:number, newEdit:string) => {
        setEditTaskText([0,list,index]);

        const newTasks = [...tasks];
        newTasks[list][index] = newEdit;
        setTasks(newTasks);
    }

    // select a task to move
    const selectTask = (list:number, index:number, task:string) => {
        // check if the selected task is empty
        if(selectedTaskText==""){
            setSelectedTaskText(task);
            deleteTask(list,index);
        }
    }



    return (
        <>
            <div className="background-container" 
                style={{background: `linear-gradient(to bottom right, ${themeColors[0]}, ${themeColors[1]})`}}>
                    
                <div className="section-container">

                    <div className="list-container">
                        <div className="list-holder">
                            <div className="list" 
                            style={{ width: '200px', borderColor: toDoColor, 
                            background: `linear-gradient(to bottom right, ${themeColors[0]}, ${themeColors[1]})`}}
                            onClick={() => addTaskFromList(0)}>
                                <div className="list-bar" style={{backgroundColor:toDoColor}}></div>
                                <div className="list-title" style={{color:toDoColor}}>Completed</div>
                                <div className="task-list-holder">

                                    {tasks[0].map((task, index) => (
                                        <div
                                        key={index}
                                        className="task"
                                        style={{
                                            borderColor: themeColors[0],
                                            backgroundColor: themeColors[0],
                                            color: themeColors[2],
                                        }}
                                        onClick={() => selectTask(0,index,task)}
                                        >
                                        {task}
                                        </div>
                                    ))}

                                </div>
                            </div>
                        </div>

                        <div className="list-holder">
                            <div className="list" 
                            style={{borderColor: themeColors[2], 
                            background: `linear-gradient(to bottom right, ${themeColors[0]}, ${themeColors[1]})`}}
                            onClick={() => addTaskFromList(1)}>
                                <div className="list-bar" style={{backgroundColor:themeColors[2]}}></div>
                                <div className="list-title" style={{color:themeColors[2]}}>Active Tasks</div>
                                <div className="task-list-holder">

                                    {tasks[1].map((task, index) => (
                                        <div
                                        key={index}
                                        className="task"
                                        style={{
                                            borderColor: themeColors[0],
                                            backgroundColor: themeColors[0],
                                            color: themeColors[2],
                                        }}
                                        onClick={() => selectTask(1,index,task)}
                                        >
                                        {task}
                                        </div>
                                    ))}

                                </div>
                            </div>
                        </div>

                    </div>

                    <div className="list-container">

                        <div className="list-holder">
                            <div className="list" 
                            style={{borderColor: toDoColor, 
                            background: `linear-gradient(to bottom right, ${themeColors[0]}, ${themeColors[1]})`}}
                            onClick={() => addTaskFromList(2)}>
                                <div className="list-bar" style={{backgroundColor:toDoColor}}></div>
                                <div className="list-title" style={{color:toDoColor}}>To Do</div>
                                <div className="task-list-holder">

                                    {tasks[2].map((task, index) => (
                                        <div
                                        key={index}
                                        className="task"
                                        style={{
                                            borderColor: themeColors[0],
                                            backgroundColor: themeColors[0],
                                            color: themeColors[2],
                                        }}
                                        >
                                            {editTaskText[0]==1 && editTaskText[1]==2 && editTaskText[2]==index ?(
                                                <div className="edit-task-text" contentEditable="true" ref={editRef}>{task}</div>
                                            ) : (
                                                <div className="task-text" onClick={() => selectTask(2,index,task)}>{task}</div>
                                            )}

                                            <div style={{display:"flex"}}>
                                                
                                                {editTaskText[0]==1 && editTaskText[1]==2 && editTaskText[2]==index ?(
                                                    <div className="edit-button" 
                                                    onClick={() => confirmEditTask(2,index,editRef.current.innerText)}><FontAwesomeIcon icon={faCheck} /></div>
                                                ) : (
                                                    <div className="edit-button" 
                                                    onClick={() => editTask(2,index)}><FontAwesomeIcon icon={faPen} size="xs"/></div>
                                                )}

                                                <div className="delete-button" 
                                                onClick={() => deleteTask(2,index)}><FontAwesomeIcon icon={faXmark} /></div>
                                            </div>
                                        </div>
                                    ))}

                                    <div className="add-task" 
                                    style={{color: themeColors[3], backgroundColor:themeColors[0]}}
                                    onClick={() => addTask(2)}
                                    >+</div>

                                </div>
                            </div>
                        </div>


                    </div>

                </div>
            </div>
        </>
    )
  }
  
  export default Section