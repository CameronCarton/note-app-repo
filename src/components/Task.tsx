import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { faPen } from '@fortawesome/free-solid-svg-icons'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { faChevronUp } from '@fortawesome/free-solid-svg-icons'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { faThumbTack } from '@fortawesome/free-solid-svg-icons'

interface TaskProps {
    listType: number;
    themeColors0: string;
    themeColors2: string;
    editTaskText: number[];
    tasks: string[][];
    listIndex: number;
    editRef;
    handleInputChange: () => void;
    selectTask: (list:number, index:number, task:string) => void;
    shiftTask: (listIndex:number, index:number, shiftAmount:number) => void;
    confirmEditTask: (list:number, index:number) => void;
    editTask: (list:number, index:number) => void;
    deleteTask: (list:number, index:number) => void;
}

function Task({listType, themeColors0, themeColors2, editTaskText, tasks, listIndex, editRef,
                handleInputChange, selectTask, shiftTask, confirmEditTask, editTask, deleteTask}: TaskProps) {


  
    return (
      <>
        {tasks[listIndex].map((task, index) => (
            <div
            key={index}
            className="task"
            style={{
                backgroundColor: themeColors0,
                color: themeColors2,
            }}
            >
                {editTaskText[0]==1 && editTaskText[1]==listIndex && editTaskText[2]==index ?(
                    <textarea className="edit-task-text" 
                    ref={editRef} 
                    defaultValue={task} 
                    rows={1}
                    style={{color: themeColors2, resize: "none", lineHeight: '1.5',overflow: 'hidden'}}
                    onChange={handleInputChange}></textarea>
                ) : (
                    <div className="task-text" 
                    style={{color: themeColors2}}>{task}</div>
                )}

                <div style={{display:"flex",position:"absolute", width:"230px", justifyContent:"left", paddingLeft:"5px"}}>
                    <div className="delete-button" style={{paddingTop:"1px"}}
                    onClick={() => selectTask(listIndex,index,task)}>
                        <FontAwesomeIcon icon={faThumbTack} />
                    </div>
                    <div style={{display:"flex", paddingLeft:"2px"}}>
                        <div className="delete-button" style={{paddingTop:"1px",paddingRight:"0px"}}
                        onClick={() => shiftTask(listIndex,index,-1)}>
                            <FontAwesomeIcon icon={faChevronUp} size="sm"/>
                        </div>
                        <div className="delete-button" style={{paddingRight:"1px"}}
                        onClick={() => shiftTask(listIndex,index,1)}>
                            <FontAwesomeIcon icon={faChevronDown} size="sm"/>
                        </div>
                    </div>
                </div>

                <div style={{display:"flex", position:"absolute", width:"232px", justifyContent:"right"}}>
                    
                    {listType==2 &&(
                        <>
                            {editTaskText[0]==1 && editTaskText[1]==listIndex && editTaskText[2]==index ?(
                            <div className="edit-button" 
                            onClick={() => confirmEditTask(listIndex,index)}><FontAwesomeIcon icon={faCheck} /></div>
                            ) : (
                                <div className="edit-button" 
                                onClick={() => editTask(listIndex,index)}><FontAwesomeIcon icon={faPen} size="xs"/></div>
                            )}
                        </>
                    )}

                    <div className="delete-button" 
                    onClick={() => deleteTask(listIndex,index)}>
                        <FontAwesomeIcon icon={faXmark} />
                    </div>
                </div>
            </div>
        ))}
      </>
    )
  }
  
export default Task
