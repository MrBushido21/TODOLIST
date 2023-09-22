import React, { useState } from 'react';
import './App.css';
import Todolist, { TasksType } from './components/Todolist/Todolist';
import { v1 } from 'uuid';
import MyInput from './components/MyInput';
import { AppBar, Button, Container, Grid, IconButton, Toolbar, } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

export type FilterValuesType = "all" | "actives" | "completed"

type TodolistType = {
  id: string
  title: string
  filter: FilterValuesType
}

type TaskStateType = {
  [key: string]: TasksType[]
}

function App() {

  let tlId1 = v1()
  let tlId2 = v1()

  let [todolist, setTodolist] = useState<TodolistType[]>([
    { id: tlId1, title: "What to learn", filter: "all" },
    { id: tlId2, title: "What to buy", filter: "all" },
  ])

  let [tasksCopy, setTasksCopy] = useState<TaskStateType>({
    [tlId1]: [
      { id: v1(), title: "HTML", isDone: true },
      { id: v1(), title: "CSS", isDone: true },
      { id: v1(), title: "React", isDone: true },
      { id: v1(), title: "Next.js", isDone: false },
    ],
    [tlId2]: [
      { id: v1(), title: "Meat", isDone: false },
      { id: v1(), title: "Bread", isDone: true },
    ]
  })




  const changeStatusTask = (id: string, isDone: boolean, tlId: string) => {
    let tasks = tasksCopy[tlId]
    let task = tasks.find(t => t.id === id)
    if (task) {
      task.isDone = isDone
      setTasksCopy({ ...tasksCopy })
    }
  }

  const changeTitleTask = (id: string, newTitle: string, tlId: string) => {
    let tasks = tasksCopy[tlId]
    let task = tasks.find(t => t.id === id)
    if (task) {
      task.title = newTitle
      setTasksCopy({ ...tasksCopy })
    }
  }
  const changeTitleTodolist = (newTitle: string, tlId: string) => {
    let todList = todolist.find(t => t.id === tlId)
    if (todList) {
      todList.title = newTitle
      setTodolist([...todolist])
    }
  }



  const filteredTasks = (type: FilterValuesType, id: string) => {
    let todolistCopy = todolist.find(tl => tl.id === id)
    if (todolistCopy) {
      todolistCopy.filter = type
      setTodolist([...todolist])
    }
  }

  const deletPost = (id: string, tlId: string) => {
    let tasks = tasksCopy[tlId]
    let filteredTasks = tasks.filter(t => t.id !== id)
    tasksCopy[tlId] = filteredTasks
    setTasksCopy({ ...tasksCopy })
  }

  const deletTodolist = (id: string) => {
    let filteredTodList = todolist.filter(t => t.id !== id)
    setTodolist([...filteredTodList])
    delete tasksCopy[id]
    setTasksCopy({ ...tasksCopy })
  }

  const addItem = (title: string, tlId: string) => {
    let task = { id: v1(), title: title, isDone: false }
    let tasks = tasksCopy[tlId]
    let newTasks = [...tasks, task]
    tasksCopy[tlId] = newTasks
    setTasksCopy({ ...tasksCopy })
  }

  const creacteNewTodolist = (title: string) => {
    let newTodolist: TodolistType = {
      id: v1(),
      title: title,
      filter: "all"
    }
    setTodolist([newTodolist, ...todolist])
    setTasksCopy({
      ...tasksCopy,
      [newTodolist.id]: []
    })
  }


  return (
    <div className="App">

      <AppBar position="static">
        <Toolbar style={{display: 'flex', justifyContent: "space-between"}}>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>

      <Container fixed>
        <Grid container style={{marginBottom: "50px"}}>
          <div>
            <h1>Add new Todolist:</h1>
            <MyInput addItem={creacteNewTodolist} />
          </div>
        </Grid>
        <Grid container spacing={5}>
          {
            todolist.map(tl => {
              let tasksForTodolist = tasksCopy[tl.id];

              if (tl.filter === "actives") {
                tasksForTodolist = tasksCopy[tl.id].filter(t => t.isDone === false)
              } else if (tl.filter === "completed") {
                tasksForTodolist = tasksCopy[tl.id].filter(t => t.isDone === true)
              }
              return <Grid item>
                <Todolist
                  key={tl.id}
                  title={tl.title}
                  deletPost={deletPost}
                  tasks={tasksForTodolist}
                  filteredTasks={filteredTasks}
                  addItem={addItem}
                  changeStatusTask={changeStatusTask}
                  filter={tl.filter}
                  tlId={tl.id}
                  deletTodolist={deletTodolist}
                  changeTitleTask={changeTitleTask}
                  changeTitleTodolist={changeTitleTodolist}
                />
              </Grid>

            })
          }
        </Grid>
      </Container>

    </div>
  );
}

export default App;
