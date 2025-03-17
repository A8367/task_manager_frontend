import React, { useEffect, useState } from 'react';
import Card from './Card';

const TodoList = ({ refresh, setRefresh }) => {
    const [todos, setTodos] = useState([]);
    const [error, setError] = useState(null);

    // Fetch todos when the component mounts or refresh state changes
    useEffect(() => {
        const fetchTodos = async () => {
            try {
                const res = await fetch(`${import.meta.env.API_URL}/alltodos`);
                if (res.ok) {
                    const data = await res.json();
                    setTodos(data);
                } else {
                    setError('Failed to fetch todos');
                }
            } catch (err) {
                setError('Error fetching todos');
            }
        };

        fetchTodos();
    }, [refresh]); // Dependency array having refersh state to run every time when the <AddTaskForm/> Component submits a task

    return (
        <div style={{ height: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>
            {error && <p style={{ color: 'red' }}>{error}</p>}

            {todos.length > 0 ? (
                todos.slice(0, 2).map((todo, index) => (
                    <div key={index} style={{
                        width: "100%",
                        margin: "8px 0",
                        cursor: "pointer",
                        display: "flex",
                        justifyContent: "center"
                    }}>
            <Card
                title={todo.title}
                desc={todo.description}
                priority={todo.priority}
                date={todo.date}
                status={todo.status}
                id={todo.id}
                setRefresh={setRefresh}
            />
        </div>
    ))
            ) : (
    <div
        style={{
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
        }}
    >
        <p style={{ fontWeight: "600", fontSize: "20px" }}>No Todos Available</p>
    </div>
)}

{/* Show message if there are more tasks */ }
{
    todos.length > 2 && (
        <div
            style={{
                marginTop: '20px',
                fontWeight: 'bold',
                fontSize: '16px',
                color: '#FF6767',
            }}
        >
            <p>To view all tasks go to My Task</p>
        </div>
    )
}
        </div >
    );
};

export default TodoList;

