// import React, { useState } from 'react';
// import styles from './EditTaskForm.module.css';

// const EditTaskForm = ({setEditDisplayForm,setRefresh,existTask}) => {
//     const [error,setError] = useState(null);

//     const [task, setTask] = useState(existTask);

//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setTask({
//             ...task,
//             [name]: value
//         });
//     };

//     const handleCheckboxChange = (e) => {
//         const { name, checked } = e.target;
//         setTask({
//             ...task,
//             priority: {
//                 ...task.priority,
//                 [name]: checked
//             }
//         });
//     };

//  // Function to check if at least one priority checkbox is selected
//  const isPrioritySelected = () => {
//     return task.priority.extreme || task.priority.moderate || task.priority.low;
// };

// const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Check if at least one priority is selected
//     if (!isPrioritySelected()) {
//         setError('Please select at least one priority.');
//         return;
//     }

//     setError(null); // Clear any previous errors

//     // Handle form submission, send data to the backend
//     console.log('Task submitted:', task);

//     try {
//         const res = await fetch("http://127.0.0.1:8000/todos", {
//             method: "POST",
//             body: JSON.stringify(task),
//             headers: {
//                 "Content-Type": "application/json", 
//             },
//         });

//         if (res.ok) {
//             alert("Task Submitted Successfully");
//             const response = await res.json(); // Get the response body
//             console.log(response);
//             setTask({
//                 title: '',
//                 date: '',
//                 priority: {
//                     extreme: false,
//                     moderate: false,
//                     low: false,
//                 },
//                 description: ''
//             });
//             setRefresh(prev=>!prev)
//         } else {
//             const response = await res.json(); // Get error details
//             setError(response.detail || "Something went wrong");
//         }
//     } catch (error) {
//         setError("Retry sending task");
//     }
// };

//     return (
//         <div className={styles.container}>
//         <div className={styles.formContainer}>
//             <div className={styles.header}>
//             <p>Edit Task</p>
//             <p style={{cursor:"pointer"}}
//             onClick={()=>setEditDisplayForm(prev=>!prev)}>
//                 Go Back
//             </p>
//             </div>
//             <form onSubmit={handleSubmit}>
//                 <div className={styles.formGroup}>
//                     <label htmlFor="title">Title</label>
//                     <input
//                         type="text"
//                         id="title"
//                         name="title"
//                         value={task.title}
//                         onChange={handleInputChange}
//                         required
//                     />
//                 </div>

//                 <div className={styles.formGroup}>
//                     <label htmlFor="date">Date</label>
//                     <input
//                         type="date"
//                         id="date"
//                         name="date"
//                         value={task.date}
//                         onChange={handleInputChange}
//                         required
//                     />
//                 </div>

//                 <div className={styles.formGroup}>
//                     <label>Priority</label>
//                     <label className={styles.priorityOption}>
//                         <input
//                             type="checkbox"
//                             name="extreme"
//                             checked={task.priority.extreme}
//                             onChange={handleCheckboxChange}
//                         /> Extreme
//                     </label>
//                     <label className={styles.priorityOption}>
//                         <input
//                             type="checkbox"
//                             name="moderate"
//                             checked={task.priority.moderate}
//                             onChange={handleCheckboxChange}
//                         /> Moderate
//                     </label>
//                     <label className={styles.priorityOption}>
//                         <input
//                             type="checkbox"
//                             name="low"
//                             checked={task.priority.low}
//                             onChange={handleCheckboxChange}
//                         /> Low
//                     </label>
//                 </div>

//                 <div className={styles.formGroup}>
//                     <label htmlFor="description">Task Description</label>
//                     <textarea
//                         id="description"
//                         name="description"
//                         rows="4"
//                         value={task.description}
//                         onChange={handleInputChange}
//                         required
//                     ></textarea>
//                 </div>

//                                 {/* Display error message if no priority is selected */}
//                                 {error && <p className={styles.error}>{error}</p>}

//                 <button type="submit" className={styles.btnDone}>Done</button>
//             </form>
//         </div>
//         </div>
//     );
// };

// export default EditTaskForm;



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
    return task.priority.extreme || task.priority.moderate || task.priority.low;
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
      const res = await fetch(`${import.meta.env.API_URL}/todos/${task.id}`, {
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
                name="extreme"
                checked={task.priority.extreme}
                onChange={handleCheckboxChange}
              />{' '}
              Extreme
            </label>
            <label className={styles.priorityOption}>
              <input
                type="checkbox"
                name="moderate"
                checked={task.priority.moderate}
                onChange={handleCheckboxChange}
              />{' '}
              Moderate
            </label>
            <label className={styles.priorityOption}>
              <input
                type="checkbox"
                name="low"
                checked={task.priority.low}
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
