import React, { useState, useEffect } from 'react';
import styles from "./CompletedTasks.module.css";
import Card from '../components/Card';

function CompletedTasks() {
  const [completedTodos, setCompletedTodos] = useState([]);
  const [selectedTodo, setSelectedTodo] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const [error, setError] = useState(null);

  // Fetch all todos and filter the completed ones
  useEffect(() => {
    const fetchCompletedTodos = async () => {
      try {
        const response = await fetch(`${import.meta.env.API_URL}/alltodos`);
        const data = await response.json();
        
        // Filter tasks where the status is 'Complete'
        const completed = data.filter(todo => todo.status === 'Complete');
        setCompletedTodos(completed);
      } catch (error) {
        console.error("Error fetching todos:", error);
        setError("Error while fetching completed tasks");
      }
    };

    fetchCompletedTodos();
  }, [refresh]);

  // Handle click on a completed todo item to display its full details in the right section
  const handleTodoClick = (todo) => {
    setSelectedTodo(todo);
  };

  return (
    <div style={{ display: "flex", width: "100%", height: "100%", gap: "8px", padding: "5px" }}>
      {/* Left Section (List of completed todos) */}
      <div className={styles.left}>
        <h2 style={{ textAlign: "left", paddingLeft: "10px",color:"#FF6767" }}>Completed Tasks</h2>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", paddingBottom: "20px" }}>
          {error && <p style={{ color: 'red' }}>{error}</p>}

          {completedTodos.length > 0 ? (
            completedTodos.map((todo, index) => (
              <div key={index} className={styles.todo_container} onClick={() => handleTodoClick(todo)}>
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
              <p style={{ fontWeight: "600", fontSize: "20px" }}>No Completed Tasks Available</p>
            </div>
          )}
        </div>
      </div>

      {/* Right Section (Full Todo View) */}
      <div className={styles.right}>
        {selectedTodo ? (
          <div style={{ color: "rgb(88, 88, 88)", width: "100%" }}>
            {/* Task Title */}
            <h2
              style={{
                color: "black",
                maxWidth: "100%",
                wordWrap: "break-word",
                whiteSpace: "normal",
                marginTop: "10px",
                wordBreak: "break-word",
                overflowWrap: "break-word"
              }}
            >
              Task Title: {selectedTodo.title}
            </h2>

            {/* Priority */}
            <p>
              <strong style={{ color: "black" }}>Priority:</strong>{" "}
              {Object.keys(selectedTodo.priority)
                .filter((key) => selectedTodo.priority[key])
                .join(", ")}
            </p>

            {/* Status */}
            <p>
              <strong style={{ color: "black" }}>Status:</strong> {selectedTodo.status}
            </p>

            {/* Due Date */}
            <p>
              <strong style={{ color: "black" }}>Due Date:</strong> {selectedTodo.date}
            </p>

            {/* Task Description */}
            <p
              style={{
                color: "black",
                maxWidth: "100%",
                wordWrap: "break-word",
                whiteSpace: "normal",
                marginTop: "10px",
                wordBreak: "break-word",
                overflowWrap: "break-word"
              }}
            >
              <strong style={{ color: "black" }}>Task Description:</strong>{" "}
              {selectedTodo.description}
            </p>
          </div>
        ) : (
          <p>Select a task to see the details.</p>
        )}
      </div>
    </div>
  );
}

export default CompletedTasks;
