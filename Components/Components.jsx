import { useState } from "react";
import "./Components.css";

export const InputContainer = ({ addTask }) => {
    const [taskTitle, setTaskTitle] = useState("");

    const updateChange = (e) => {
        setTaskTitle(e.target.value);
    }

    const sendTitle = () => {
        if (taskTitle.trim() !== "") {
            addTask(taskTitle);
            setTaskTitle("");
        }
    }

    window.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            sendTitle()
        }
    })

    return <div className="input-container">
        <h2>🎯 Add your next task!</h2>
        <div className="inputs-container">
            <input type="text" placeholder="Enter your task..." value={taskTitle} onChange={updateChange} />
            <button className="add-task-btn" onClick={sendTitle}>Add Task</button>
        </div>
    </div>
}

export const TaskList = ({ tasks, completeTask, deleteTask }) => {
    return (
        <div className="tasks-list">
            {tasks.length > 0 ? tasks.map((task) => {

                return (<div key={task.id} className={`task-item ${task.completed ? "completed" : "default"}`} onClick={() => completeTask(task.id)}>
                    <div className="content">
                        <div className="task-id-container">
                            <span className="task-id">{task.id}</span>
                        </div>
                        <div className="task-title-container">
                            <span className="task-title">{task.title}</span>
                        </div>
                    </div>
                    <button
                        className="delete-task"
                        onClick={(e) => {
                            e.stopPropagation()
                            deleteTask(task.id)
                        }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width={15} fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                        </svg>
                    </button>
                </div>)
            }) : <span className="empty-tasks"><code>No tasks available</code></span>}
        </div>
    )
}