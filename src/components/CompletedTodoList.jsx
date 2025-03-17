import React, { useEffect, useState } from 'react';
import Card from './Card';

const CompletedTodoList = ({refresh,setRefresh}) => {
  const [completedTodos, setCompletedTodos] = useState([]);
  const [error,setError] = useState(null);

  // Fetch all todos on component mount or when refresh changes
  useEffect(() => {
    const fetchCompletedTodos = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/alltodos`);
        const data = await response.json();
        
        // Filter todos to get only the ones with status 'Complete'
        const filteredTodos = data.filter(todo => todo.status === 'Complete');
        setCompletedTodos(filteredTodos);
      } catch (e) {
        console.error('Error fetching todos:', e);
        setError("Error fetching Completed Tasks")
      }
    };

    fetchCompletedTodos();
  }, [refresh]);

  return (
    <div style={{ height: "100%" ,display:"flex",flexDirection:"column",alignItems:"center"}}>
            {error && <p style={{ color: 'red' }}>{error}</p>}

            {completedTodos.length > 0 ? (
                completedTodos.slice(0,2).map((todo, index) => (
                    <div key={index} style={{
                        width: "100%",
                        margin: "8px 0",
                        cursor: "pointer",
                        display: "flex",
                        justifyContent: "center"
                    }}>
                    <Card
                        key={index}
                        title={todo.title}
                        desc={todo.description}
                        priority={todo.priority}
                        date={todo.date}
                        status = {todo.status}
                        id = {todo.id}
                        setRefresh = {setRefresh}
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
                    <p style={{ fontWeight: "600", fontSize: "20px" }}>No Completed Todo Yet</p>
                </div>
            )}

            {/* Show message if there are more completed tasks */}
            {completedTodos.length > 2 && (
                <div
                    style={{
                        marginTop: '20px',
                        fontWeight: 'bold',
                        fontSize: '16px',
                        color: '#FF6767',
                    }}
                >
                    <p>To view all completed tasks go to Completed Tasks</p>
                </div>
            )}
        </div>
  );
};

export default CompletedTodoList;
