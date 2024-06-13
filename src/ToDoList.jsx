// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import './assets/ToDoList.css'
import icon from "./assets/Master-Task-List.png";

function ToDoList() {
    const listStorage = localStorage.getItem('List');
    const [list, setList] = useState(listStorage ? JSON.parse(listStorage) : []);
    const [newTask, setNewTask] = useState("");

    useEffect(() => {
        localStorage.setItem('List', JSON.stringify(list));
    }, [list]);

    function addTask(form) {
        form.preventDefault();
        if (!newTask) {
            return;
        }
        setList([...list, { text: newTask, isCompleted: false }]);
        setNewTask("");
        document.getElementById('input-e').focus();
    }

    function click(index) {
        const listAux = [...list];
        listAux[index].isCompleted = !listAux[index].isCompleted;
        setList(listAux);
    }

    function deleteTask(index) {
        const listAux = [...list];
        listAux.splice(index, 1);
        setList(listAux);
    }

    function deleteAll() {
        setList([]);
    }

    return (
        <div>
            <h1>To do list</h1>
            <form onSubmit={addTask}>
                <input
                    id="input-e"
                    type="text"
                    value={newTask}
                    onChange={(e) => { setNewTask(e.target.value) }}
                    placeholder="Add a task"
                />
                <button className="add" type="submit">Add</button>
            </form>
            <div className="toDoList">
                <div style={{ textAlign: 'center' }}>
                    {
                        list.length < 1
                            ?
                            <img className="icon-central" src={icon} alt="icon" />
                            :
                            list.map((task, index) => (
                                <div
                                    key={index}
                                    className={task.isCompleted ? "task completed" : "task"}
                                >
                                    <span onClick={() => { click(index) }}>{task.text}</span>
                                    <button onClick={() => { deleteTask(index) }} className="del">Delete</button>
                                </div>
                            ))

                    }
                    {
                        list.length > 0 &&
                        <button onClick={() => { deleteAll() }} className="deleteAll">Delete All</button>
                    }
                </div>
            </div>
        </div>
    )
}

export default ToDoList;
