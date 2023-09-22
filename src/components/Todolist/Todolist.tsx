import { FilterValuesType } from "../../App"
import MyInput from "../MyInput"
import MyLi from "../MyLi"
import EditSpan from "../EditSpan"
import { Delete } from "@mui/icons-material"
import { Button, IconButton } from "@mui/material"

export type TasksType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: TasksType[]
    deletPost: (id: string, tlId: string) => void
    filteredTasks: (type: FilterValuesType, id: string) => void
    addItem: (title: string, tlId: string) => void
    changeStatusTask: (id: string, isDone: boolean, tlId: string) => void
    filter: FilterValuesType
    tlId: string
    deletTodolist: (id: string) => void
    changeTitleTask: (id: string, newTitle: string, tlId: string) => void
    changeTitleTodolist: (newTitle: string, tlId: string) => void
}


const Todolist = ({ title, tasks, deletPost, filteredTasks, addItem,
    changeStatusTask, filter, tlId, deletTodolist, changeTitleTask, changeTitleTodolist}: PropsType) => {


    const addTask = (value: string) => {
        addItem(value, tlId)
    }
    
    const changeTitle = (newTitle: string) => {
        changeTitleTodolist(newTitle, tlId)
    }

    return (
        <div className="Todolist">
            <div className="title">
                <EditSpan title={title} onChange={changeTitle}/>
                <IconButton>
                    <Delete onClick={() => deletTodolist(tlId)}/>
                </IconButton>
            </div>
            <MyInput
                addItem={addTask}
            />
            <ul className="Todolist__ul">
                {tasks.map(task => {
                    const changeTitle = (newTitle: string) => {
                        changeTitleTask(task.id, newTitle, tlId)
                    }
                    return <MyLi
                        task={task}
                        changeStatusTask={changeStatusTask}
                        tlId={tlId}
                        deletPost={deletPost}
                        changeTitle={changeTitle}
                    />
                })
                }
            </ul>
            <div className="Todolist__buttons">
                <Button
                    variant={filter === "all" ? "contained" : "text"}
                    onClick={() => filteredTasks("all", tlId)}
                >
                    All
                </Button>
                <Button
                    onClick={() => filteredTasks("actives", tlId)}
                    variant={filter === "actives" ? "contained" : "text"}
                >
                    Active
                </Button>
                <Button
                    onClick={() => filteredTasks("completed", tlId)}
                    variant={filter === "completed" ? "contained" : "text"}
                >
                    Completed
                </Button>
            </div>
        </div>
    );
}
export default Todolist;