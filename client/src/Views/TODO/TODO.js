import { useEffect, useState } from 'react'
import Styles from './TODO.module.css'
import { dummy } from './dummy'
import axios from 'axios'

export function TODO(props) {

    const [newTodo, setNewTodo] = useState('')
    const [todoData, setTodoData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTodo = async () => {
            const apiData = await getTodo()
            setTodoData(apiData);
            setLoading(false)
        }
        fetchTodo();
    }, [])

    const getTodo = async () => {
        const options = {
            method: "GET",
            url: `http://localhost:8000/api/todo`,
            headers: {
                accept: "application/json"
            }
        }
        try {
            const response = await axios.request(options)
            return response.data;
        } catch (error) {
            console.log(error);
            return [];
        }
    }

    const addTodo = () => {
        const options = {
            method: "POST",
            url: `http://localhost:8000/api/todo`,
            headers: {
                accept: "application/json"
            },
            data: {
                title: newTodo
            }
        }
        axios
            .request(options)
            .then(response => {
                console.log(response.data);
                setTodoData(prevData => [...prevData, response.data])
            })
            .catch(error => {
                console.log(error)
            })
    }

    const deleteTodo = (id) => {
        const options = {
            method: "DELETE",
            url: `http://localhost:8000/api/todo/${id}`,
            headers: {
                accept: "application/json"
            }
        }
        axios
            .request(options)
            .then(response => {
                console.log(response.data);
                setTodoData(prevData => prevData.filter(todo => todo._id !== id))
            })
            .catch(error => {
                console.log(error)
            })
    };

    const updateTodo = (id) => {
        const todoToUpdate = todoData.find(todo => todo._id === id)
        const options = {
            method: "PATCH",
            url: `http://localhost:8000/api/todo/${id}`,
            headers: {
                accept: "application/json"
            },
            data: {
                ...todoToUpdate,
                done: !todoToUpdate.done
            }
        }
        axios
            .request(options)
            .then(response => {
                console.log(response.data);
                setTodoData (prevData => prevData.map(todo => todo._id === id ? response.data : todo))
            })
            .catch(error => {
                console.log(error)
            })
    };

    const editTodo = (id) => {
        const todoToEdit = todoData.find(todo => todo._id === id)
        const newTitle = prompt("Enter title:", todoToEdit.title);
        const newDescription = prompt("Enter description:", todoToEdit.description);
        const options = {
            method: "PATCH",
            url: `http://localhost:8000/api/todo/${id}`,
            headers: {
                accept: "application/json"
            },
            data: {
                ...todoToEdit,
                title: newTitle,
                description: newDescription
            }
        }
        axios
            .request(options)
            .then(response => {
                console.log(response.data);
                setTodoData (prevData => prevData.map(todo => todo._id === id ? response.data : todo))
            })
            .catch(error => {
                console.log(error)
            })
    };

    return (
        <div className={Styles.ancestorContainer}>
            <div className={Styles.headerContainer}>
                <h1>
                    Tasks
                </h1>
                <span>
                    <input
                        className={Styles.todoInput}
                        type='text'
                        name='New Todo'
                        value={newTodo}
                        onChange={(event) => {
                            setNewTodo(event.target.value)
                        }}
                    />
                    <button
                        id='addButton'
                        name='add'
                        className={Styles.addButton}
                        onClick={() => {
                            addTodo()
                            setNewTodo('')
                        }}
                    >
                        + New Todo
                    </button>
                </span>
            </div>
            <div id='todoContainer' className={Styles.todoContainer}>
                {loading ? (
                    <p style={{ color: 'white' }}>Loading...</p>
                ) : (
                    todoData.length > 0 ? (
                        todoData.map((entry, index) => (
                            <div key={entry._id} className={Styles.todo}>
                                <span className={Styles.infoContainer}>
                                    <input
                                        type='checkbox'
                                        checked={entry.done}
                                        onChange={() => {
                                            updateTodo(entry._id);
                                        }}
                                    />
                                    <span>{entry.title}</span>
                                    <div style={{ marginLeft: '32px', fontSize: '15px' }}>
                                        {entry.description}
                                    </div>

                                </span>
                                <div style={{ display: 'flex', gap: '10px' }}>
                                    <span
                                        style={{ cursor: 'pointer' }}
                                        onClick={() => {
                                            editTodo(entry._id);
                                        }}
                                    >
                                        Edit
                                    </span>
                                    <span
                                        style={{ cursor: 'pointer' }}
                                        onClick={() => {
                                            deleteTodo(entry._id);
                                        }}
                                    >
                                        Delete
                                    </span>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className={Styles.noTodoMessage}>No tasks available. Please add a new task.</p>
                    )
                )}
            </div>
        </div>
    )
}