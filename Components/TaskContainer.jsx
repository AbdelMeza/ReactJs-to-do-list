import { useEffect, useState } from "react";
import { InputContainer, TaskList } from "./Components.jsx";
import "./TaskContainer.css";

export default function TaskContainer () {
    const [tasks, setTasks] = useState([]);

    useEffect(() =>{
        const getTasks = localStorage.getItem('tasks-list')

        if(getTasks){
            setTasks(JSON.parse(getTasks))
        }
    }, [])

    const addTask = (taskTitle) =>{
        const newTask = {
            id: tasks.length ? tasks[tasks.length - 1].id + 1 : 1,
            title: taskTitle,
            completed: false
        }

        const updatedList = [...tasks, newTask]
        setTasks(updatedList)
        localStorage.setItem('tasks-list', JSON.stringify(updatedList))
    }

    const deleteTask = (taskId) => {
        const updatedList = tasks.filter((task) => task.id !== taskId)
        setTasks(updatedList)
        localStorage.setItem('tasks-list', JSON.stringify(updatedList))
    }
    
    const completeTask = (taskId) => {
        const updatedList = tasks.map((task) =>
            task.id === taskId ? { ...task, completed: !task.completed } : task
        );

        setTasks(updatedList)
        localStorage.setItem('tasks-list', JSON.stringify(updatedList))
    }
    
    return <>
        <div className="task-container">
            <InputContainer addTask={addTask}/>
            <TaskList tasks={tasks} completeTask={completeTask} deleteTask={deleteTask}/>
        </div>
    </>
}