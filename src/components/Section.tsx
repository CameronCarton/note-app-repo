import Task from "./Task";
import { useEffect, useState, useRef} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { faPen } from '@fortawesome/free-solid-svg-icons'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'

interface SectionProps {
    themeColors: string[];
}

function Section({themeColors}: SectionProps) {

    const toDoColor: string = themeColors[3];
    const [editTaskText,setEditTaskText] = useState([0,0,0]);
    const [editListText,setEditListText] = useState([0,0]);
    const [selectedTaskText,setSelectedTaskText] = useState("");
    const [tasks, setTasks] = useState<string[][]>([
        [],
        ["Add a task in the To Do List"],
        [],
    ]);
    const [toDoList, setToDoList] = useState(["To Do"]);
    const [gridDisplay, setGridDisplay] = useState("flex");
    const editRef = useRef<HTMLTextAreaElement>(null);
    const followerRef = useRef<HTMLDivElement>(null);


    //update local storag
    const updateLocalStorage = () =>{
        localStorage.setItem("taskList",JSON.stringify(tasks));
        localStorage.setItem("toDoList",JSON.stringify(toDoList));
    }

    
    // add a new task to a list
    const addTask = (list:number) => {
        const newTasks = [...tasks];
        newTasks[list].push("");
        setTasks(newTasks);
        console.log("New Task added");

        setEditTaskText([1,list,tasks[list].length-1]);

        updateLocalStorage();
    }

    // add task from existing list to another list
    const addTaskFromList = (list:number) => {
        // check if the selected task is empty
        if(selectedTaskText!=""){
            const newTasks: string[][] = [...tasks];
            newTasks[list].push(selectedTaskText);
            setTasks(newTasks);
            setSelectedTaskText("");
            console.log("Task added from list");
        }

        updateLocalStorage();
    }

    // delete task from a list
    const deleteTask = (list:number, index:number) => {
        const newTasks = [...tasks];
        newTasks[list].splice(index, 1);
        setTasks(newTasks);
        console.log("Task deleted");

        updateLocalStorage();
    }

    // delete list
    const deleteList = (list:number) => {
        //remove list from tasks
        const newTasks = [...tasks];
        newTasks.splice(list, 1);
        setTasks(newTasks);

        //remove list from toDo list
        const newLists = [...toDoList];
        newLists.splice(list-2, 1);
        setToDoList(newLists);
        console.log("List deleted");

        //change grid display when many lists added
        if(newLists.length >=3){
            setGridDisplay("inline-grid");
        }else{
            setGridDisplay("flex");
        }

        updateLocalStorage();
    }

    // edit the text of a task
    const editTask = (list:number, index:number) => {
        setEditTaskText([1,list,index]);

        updateLocalStorage();
    }

    // edit the text of a task
    const confirmEditTask = (list:number, index:number) => {
        setEditTaskText([0,list,index]);

        let newTaskText = "";
        if(editRef.current!=null){
            newTaskText = editRef.current.value;
        }

        if(newTaskText!=""){
            //confirm edit
            const newTasks = [...tasks];
            if(editRef.current!=null){
                newTasks[list][index] = editRef.current.value;
            }
            setTasks(newTasks);
            console.log("Task edit confirmed");
        }else{
            //if task text is blank (""), then delete
            deleteTask(list, index);
        }
        
        updateLocalStorage();
    }

    // edit the text of a List
    const confirmEditList = (list:number) => {
        setEditListText([0,list]);

        let newListText = "To Do";
        if(editRef.current!=null){
            newListText = editRef.current.value;
        }

        //confirm edit
        const newLists = [...toDoList];
        if(editRef.current!=null){
            newLists[list-2] = editRef.current.value;
        }
        setToDoList(newLists);
        console.log("Task edit confirmed");
        
        updateLocalStorage();
    }

    // select a task to move
    const selectTask = (list:number, index:number, task:string) => {
        // check if the selected task is empty
        if(selectedTaskText==""){
            setSelectedTaskText(task);
            deleteTask(list,index);
        }

        updateLocalStorage();
    }

    // add a new toDo list
    const addToDoList = () => {
        // new toDoList name entry
        const newToDoList = [...toDoList];
        newToDoList.push("To Do");
        setToDoList(newToDoList);

        // adding a new string[] to the tasks[][]
        const newTasks = [...tasks];
        newTasks.push([]);
        setTasks(newTasks);

        console.log("New ToDo list added");

        //change grid display when many lists added
        if(newToDoList.length >=3){
            setGridDisplay("inline-grid");
        }else{
            setGridDisplay("flex");
        }

        updateLocalStorage();
    }

    // shift list position
    const shiftList = (listIndex:number, shiftAmount:number) => {
        const newTasks = [...tasks];
        const newLists = [...toDoList];
        const listToShift = newTasks[listIndex];
        const listNameToShift = newLists[listIndex-2];
    
        if(listIndex>2 || shiftAmount>0){
            //shift tasks
            newTasks.splice(listIndex, 1); // Remove from current position
            newTasks.splice(listIndex + shiftAmount, 0, listToShift); // Insert at new position

            //shift list name
            newLists.splice(listIndex-2, 1); // Remove from current position
            newLists.splice(listIndex-2 + shiftAmount, 0, listNameToShift); // Insert at new position

            console.log("List Shifted position");
        }
        
        setTasks(newTasks);
        setToDoList(newLists);

        updateLocalStorage();
    };

    // shift task position
    const shiftTask = (listIndex:number, index:number, shiftAmount:number) => {
        const newTasks = [...tasks];
        const taskToShift = newTasks[listIndex][index];
    
        if(index>0 || shiftAmount>0){
            newTasks[listIndex].splice(index, 1); // Remove from current position
            newTasks[listIndex].splice(index + shiftAmount, 0, taskToShift); // Insert at new position
            console.log("Task Shifted position");
        }
        
        setTasks(newTasks);

        updateLocalStorage();
    };

    // edit the text of a list
    const editList = (list:number) => {
        setEditListText([1,list]);

        updateLocalStorage();
    }


    //update edit box size automatically
    const handleInputChange = () => {
        if (editRef.current) {
          editRef.current.style.height = 'auto';
          editRef.current.style.height = `${editRef.current.scrollHeight}px`;
        }
    };

    useEffect(() => {
        handleInputChange();
        if(editRef.current!=null && (editTaskText[0]==1 || editListText[0]==1)){
            editRef.current.focus();
        }
        
    }, [editTaskText,editListText]);

    useEffect(() => {

        //load local storage data
        let taskData = localStorage.getItem("taskList");
        if(taskData!=null){
            setTasks(JSON.parse(taskData));
        }
        let toDoData = localStorage.getItem("toDoList");
        if(toDoData!=null){
            setToDoList(JSON.parse(toDoData));
        }

        //follower
        const follower = followerRef.current;

        const handleMouseMove = (e: MouseEvent) => {
            if (follower) {
                const x = e.clientX;
                const y = e.clientY;

                // set the follower's position to the mouse position
                follower.style.left = (x+5) + 'px';
                follower.style.top = (y+5) + 'px';
            }
        };

        document.addEventListener('mousemove', handleMouseMove);
        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
        };

    }, []);


    return (
        <>
            <div className="background-container" 
                style={{background: `linear-gradient(to bottom right, ${themeColors[0]}, ${themeColors[1]})`}}>
                    
                <div className="section-container">

                    <div className="list-container">
                        <div className="list-holder">
                            <div className="list" 
                            style={{borderColor: toDoColor, 
                            background: `linear-gradient(to bottom right, ${themeColors[0]}, ${themeColors[1]})`}}
                            onClick={() => addTaskFromList(0)}>
                                <div className="list-bar" style={{backgroundColor:toDoColor}}></div>
                                <div className="list-title" 
                                style={{color:toDoColor,display:"flex",textAlign:"center",justifyContent:"center"}}>
                                    Completed</div>
                                <div className="task-list-holder">

                                    <Task 
                                    listType={0}
                                    themeColors0={themeColors[0]} 
                                    themeColors2={themeColors[3]} 
                                    editTaskText={editTaskText} 
                                    tasks={tasks} 
                                    listIndex={0} 
                                    editRef={editRef}
                                    handleInputChange={handleInputChange} 
                                    selectTask={selectTask} 
                                    shiftTask={shiftTask} 
                                    confirmEditTask={confirmEditTask} 
                                    editTask={editTask} 
                                    deleteTask={deleteTask}/>

                                </div>
                            </div>
                        </div>

                        <div className="list-holder">
                            <div className="list" 
                            style={{borderColor: themeColors[2], 
                            background: `linear-gradient(to bottom right, ${themeColors[0]}, ${themeColors[1]})`}}
                            onClick={() => addTaskFromList(1)}>
                                <div className="list-bar" style={{backgroundColor:themeColors[2]}}></div>
                                <div className="list-title" 
                                style={{color:themeColors[2],display:"flex",textAlign:"center",justifyContent:"center"}}>
                                    Active Tasks</div>
                                <div className="task-list-holder">

                                    <Task 
                                    listType={1}
                                    themeColors0={themeColors[0]} 
                                    themeColors2={themeColors[2]} 
                                    editTaskText={editTaskText} 
                                    tasks={tasks} 
                                    listIndex={1} 
                                    editRef={editRef}
                                    handleInputChange={handleInputChange} 
                                    selectTask={selectTask} 
                                    shiftTask={shiftTask} 
                                    confirmEditTask={confirmEditTask} 
                                    editTask={editTask} 
                                    deleteTask={deleteTask}/>

                                </div>
                            </div>
                        </div>

                    </div>

                    
                    <div className="list-container" 
                    style={{display: gridDisplay,
                            gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
                            gap: "10px",
                            alignContent: "start"}}>
                        
                        {toDoList.map((list, listIndex) => (
                        <div className="list-holder" key={listIndex}>
                            <div className="list" 
                            style={{borderColor: toDoColor, 
                            background: `linear-gradient(to bottom right, ${themeColors[0]}, ${themeColors[1]})`}}
                            onClick={() => addTaskFromList(listIndex+2)}>
                                <div className="list-bar" style={{backgroundColor:toDoColor}}></div>
                                <div className="list-title" 
                                style={{color:toDoColor}}>
                                    <div style={{display:"flex"}}>
                                        <div className="edit-button-list" style={{paddingTop:"1px",paddingRight:"0px",paddingLeft:"10px"}}
                                        onClick={() => shiftList(listIndex+2,-1)}>
                                            <FontAwesomeIcon icon={faChevronLeft} size="sm"/>
                                        </div>
                                        <div className="edit-button-list" style={{paddingTop:"1px"}}
                                        onClick={() => shiftList(listIndex+2,1)}>
                                            <FontAwesomeIcon icon={faChevronRight} size="sm"/>
                                        </div>
                                    </div>

                                    <div>
                                        {editListText[0]==1 && editListText[1]==listIndex+2 ?(
                                            <textarea  className="edit-list-text"
                                            ref={editRef} 
                                            defaultValue={list} 
                                            rows={1}
                                            style={{color: themeColors[2], fontWeight: "bold", 
                                            resize: "none",marginTop:"4px",overflow: "hidden",
                                            padding:"0px",textAlign:"center"}}
                                            onChange={handleInputChange}></textarea>
                                        ) : (
                                            <div style={{maxHeight:"30px",overflow: "hidden"}}>{list}</div>
                                        )}
                                    </div>
                                    
                                    <div style={{display:"flex"}}>
                                        {editListText[0]==1 && editListText[1]==listIndex+2 ?(
                                            <div className="edit-button-list" style={{paddingLeft:"5px",paddingRight:"0px"}}
                                            onClick={() => confirmEditList(listIndex+2)}><FontAwesomeIcon icon={faCheck} /></div>
                                        ) : (
                                            <div className="edit-button-list" style={{paddingRight:"0px"}}
                                            onClick={() => editList(listIndex+2)}><FontAwesomeIcon icon={faPen} size="xs"/></div>
                                        )}
                                        <div className="edit-button-list" style={{paddingRight:"10px"}}
                                        onClick={() => deleteList(listIndex+2)}>
                                            <FontAwesomeIcon icon={faXmark} />
                                        </div>
                                    </div>
                                </div>         
                                <div className="task-list-holder">

                                    <Task 
                                        listType={2}
                                        themeColors0={themeColors[0]} 
                                        themeColors2={themeColors[2]} 
                                        editTaskText={editTaskText} 
                                        tasks={tasks} 
                                        listIndex={listIndex+2} 
                                        editRef={editRef}
                                        handleInputChange={handleInputChange} 
                                        selectTask={selectTask} 
                                        shiftTask={shiftTask} 
                                        confirmEditTask={confirmEditTask} 
                                        editTask={editTask} 
                                        deleteTask={deleteTask}/>

                                    <div className="add-task" 
                                    style={{color: themeColors[3], backgroundColor:themeColors[0]}}
                                    onClick={() => addTask(listIndex+2)}
                                    ><FontAwesomeIcon icon={faPlus} size="sm"/></div>

                                </div>
                            </div>
                        </div>
                        ))}
                        {toDoList.length<10 &&(
                            <div className="add-list" 
                            style={{color: themeColors[0], backgroundColor:themeColors[3]}}
                            onClick={() => addToDoList()}
                            ><FontAwesomeIcon icon={faPlus} size="sm"/>
                        </div>
                        )}
                    </div>
                    

                </div>
            </div>
            <div className="follower" ref={followerRef}>
                {selectedTaskText!="" &&(
                    <div className="task" 
                    style={{cursor:"auto",pointerEvents: "none",backgroundColor: themeColors[0],
                    color: themeColors[2],border: '1px solid #0C75FF',maxWidth:"235px"}}>
                        <div className="task-text" style={{cursor:"auto",pointerEvents: "none",color: themeColors[2],paddingTop:"0px"}}>{selectedTaskText}</div>
                    </div>
                )}
            </div>
        </>
    )
  }
  
  export default Section