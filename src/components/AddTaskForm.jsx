import React, { useState } from 'react';
import styles from './AddTaskForm.module.css';

const AddTaskForm = ({setDisplayForm,setRefresh}) => {
    const [error,setError] = useState(null);

    const [task, setTask] = useState({
        title: '',
        date: '',
        priority: {
            Extreme: false,
            Moderate: false,
            Low: false,
        },
        description: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setTask({
            ...task,
            [name]: value
        });
    };

    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;
        setTask({
            ...task,
            priority: {
                ...task.priority,
                [name]: checked
            }
        });
    };

 // Function to check if at least one priority checkbox is selected
 const isPrioritySelected = () => {
    return task.priority.Extreme || task.priority.Moderate || task.priority.Low;
};

const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if at least one priority is selected
    if (!isPrioritySelected()) {
        setError('Please select at least one priority.');
        return;
    }

    setError(null); // Clear any previous errors

    // Handle form submission, send data to the backend
    console.log('Task submitted:', task);

    try {
        const res = await fetch(`${import.meta.env.API_URL}/todos`, {
            method: "POST",
            body: JSON.stringify(task),
            headers: {
                "Content-Type": "application/json", 
            },
        });

        if (res.ok) {
            alert("Task Submitted Successfully");
            const response = await res.json(); // Get the response body
            console.log(response);
            setTask({
                title: '',
                date: '',
                priority: {
                    Extreme: false,
                    Moderate: false,
                    Low: false,
                },
                description: ''
            });
            setRefresh(prev=>!prev)
        } else {
            const response = await res.json(); // Get error details
            setError(response.detail || "Something went wrong");
        }
    } catch (error) {
        setError("Retry sending task");
    }
};

    return (
        <div className={styles.container}>
        <div className={styles.formContainer}>
            <div className={styles.header}>
            <p>Add New Task</p>
            <p style={{cursor:"pointer"}}
            onClick={()=>setDisplayForm(prev=>!prev)}>
                Go Back
            </p>
            </div>
            <form onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                    <label htmlFor="title">Title</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={task.title}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="date">Date</label>
                    <input
                        type="date"
                        id="date"
                        name="date"
                        value={task.date}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className={styles.formGroup}>
                    <label>Priority</label>
                    <label className={styles.priorityOption}>
                        <input
                            type="checkbox"
                            name="Extreme"
                            checked={task.priority.Extreme}
                            onChange={handleCheckboxChange}
                        /> Extreme
                    </label>
                    <label className={styles.priorityOption}>
                        <input
                            type="checkbox"
                            name="Moderate"
                            checked={task.priority.Moderate}
                            onChange={handleCheckboxChange}
                        /> Moderate
                    </label>
                    <label className={styles.priorityOption}>
                        <input
                            type="checkbox"
                            name="Low"
                            checked={task.priority.Low}
                            onChange={handleCheckboxChange}
                        /> Low
                    </label>
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="description">Task Description</label>
                    <textarea
                        id="description"
                        name="description"
                        rows="4"
                        value={task.description}
                        onChange={handleInputChange}
                        required
                    ></textarea>
                </div>

                                {/* Display error message if no priority is selected */}
                                {error && <p className={styles.error}>{error}</p>}

                <button type="submit" className={styles.btnDone}>Done</button>
            </form>
        </div>
        </div>
    );
};

export default AddTaskForm;
