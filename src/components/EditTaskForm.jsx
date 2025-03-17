import React, { useState, useEffect } from 'react';
import styles from './EditTaskForm.module.css';

const EditTaskForm = ({ setEditDisplayForm, setRefresh, existTask }) => {
  const [error, setError] = useState(null);
  const [task, setTask] = useState(existTask);

  // Update the task state when the existing task changes
  useEffect(() => {
    setTask(existTask);
  }, [existTask]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTask({
      ...task,
      [name]: value,
    });
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    // Reset all other priorities before setting the clicked one
    setTask((prevTask) => ({
      ...prevTask,
      priority: {
        Extreme: false,
        Moderate: false,
        Low: false,
        [name]: checked, // Set only the clicked one to true
      },
    }));
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
      const res = await fetch(`${import.meta.env.VITE_API_URL}/todos/${task.id}`, {
        method: 'PATCH', // Use PATCH for updating existing tasks
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(task),
      });

      if (res.ok) {
        alert('Task updated successfully');
        const response = await res.json(); // Get the response body
        console.log(response);
        setRefresh((prev) => !prev); // Refresh the tasks
        setEditDisplayForm(false); // Close the edit form
      } else {
        const response = await res.json(); // Get error details
        setError(response.detail || 'Something went wrong');
      }
    } catch (error) {
      setError('Error updating task, please try again');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <div className={styles.header}>
          <p>Edit Task</p>
          <p
            style={{ cursor: 'pointer' }}
            onClick={() => setEditDisplayForm(false)}
          >
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
              />{' '}
              Extreme
            </label>
            <label className={styles.priorityOption}>
              <input
                type="checkbox"
                name="Moderate"
                checked={task.priority.Moderate}
                onChange={handleCheckboxChange}
              />{' '}
              Moderate
            </label>
            <label className={styles.priorityOption}>
              <input
                type="checkbox"
                name="Low"
                checked={task.priority.Low}
                onChange={handleCheckboxChange}
              />{' '}
              Low
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

          <button type="submit" className={styles.btnDone}>
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditTaskForm;
