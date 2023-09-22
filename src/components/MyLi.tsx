import { useState } from "react"
import { TasksType } from "./Todolist/Todolist"
import EditSpan from "./EditSpan"
import { Delete } from "@mui/icons-material"
import { Checkbox, IconButton } from "@mui/material"

type PropsType = {
    task: TasksType
    changeStatusTask: (id: string, status: boolean, tlId: string) => void
    tlId: string
    deletPost: (id: string, tlId: string) => void
    changeTitle: (newTitle: string) => void
}
const MyLi = ({task,
    changeStatusTask,
    tlId,
    deletPost, changeTitle}:PropsType) => {
        
    return (
        <li
            key={task.id}
            className={task.isDone ? "isDone" : ""}
        >
            <Checkbox 
                checked={task.isDone}
                onChange={(e) => changeStatusTask(task.id, e.currentTarget.checked, tlId)}
            />
            <EditSpan title={task.title} onChange={changeTitle}/>
            <IconButton>
                <Delete onClick={() => deletPost(task.id, tlId)}/>
            </IconButton>
        </li>
    );
}
export default MyLi;