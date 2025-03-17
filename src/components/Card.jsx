import React, { useState } from 'react'
import styles from "./Card.module.css"
import { BsThreeDots } from "react-icons/bs";
import EditTaskForm from './EditTaskForm';

function Card({ title, desc, priority, date, status,id,setRefresh }) {
  // Create an variable to hold the priority label that have a value of true
  const activePriority = Object.keys(priority).filter(key => priority[key]);

  // State to toggle dropdown menu visibility
  const [dropdownVisible, setDropdownVisible] = useState(false);

      const [displayEditForm, setDisplayEditForm] = useState(false);

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setDropdownVisible(prevState => !prevState);
  };

  // Handle task completion
  const completeTask = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/todo_complete/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: 'Complete' }), // Update status to 'Complete'
      });
      if (res.ok) {
        // alert('Task marked as complete');
        setRefresh(prev=>!prev); // Trigger refresh to reload tasks
      } else {
        alert('Failed to mark task as complete');
      }
    } catch (err) {
      alert('Error completing task');
    }
  };

  // Handle task editing (e.g., open an edit form or modal)
  const editTask = () => {
    // Logic for editing task (can open a form, etc.)
    // alert('Edit task functionality (Open form/modal)');
    setDisplayEditForm(prev=>!prev)

  };

  // Handle task deletion
  const deleteTask = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/todos/${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        // alert('Task deleted');
        setRefresh(prev=>!prev) // Trigger refresh to reload tasks
      } else {
        alert('Failed to delete task');
      }
    } catch (err) {
      alert('Error deleting task');
    }
  };

   // Function to get color for priority
   const getPriorityColor = (priority) => {
    switch (priority) {
      case 'Extreme':
        return 'red'; // Red for extreme priority
      case 'Moderate':
        return 'orange'; // Orange for moderate priority
      case 'Low':
        return 'green'; // Green for low priority
      default:
        return 'black'; // Default color
    }
  };

  // Function to get color for status
  const getStatusColor = (status) => {
    switch (status) {
      case 'Complete':
        return 'green'; // Green for complete status
      case 'Incomplete':
        return 'red'; // Red for incomplete status
      default:
        return 'black'; // Default color
    }
  };

  return (
    <div className={styles.container}>
      {displayEditForm && <EditTaskForm existTask={{title, description:desc, priority, date, status,id}} setRefresh={setRefresh} setEditDisplayForm={setDisplayEditForm}/>}
      <div className={styles.header}>
        <p>{title}</p>
        <div style={{ cursor: "pointer",position:"relative"}} onClick={toggleDropdown}>
          <BsThreeDots />
          {/* Dropdown Menu */}
          {dropdownVisible && (
            <div className={styles.dropdownMenu}>
              <ul>
                <li onClick={completeTask}>Complete Task</li>
                <li onClick={editTask}>Edit Task</li>
                <li onClick={deleteTask}>Delete Task</li>
              </ul>
            </div>
          )}
        </div>
      </div>
      <div className={styles.body}>
        <p>{desc}</p>
      </div>
      <div className={styles.footer}>
        <div style={{display:"flex",gap:2}}>
          Priority: <p style={{ color: getPriorityColor(activePriority[0]) }}>{activePriority}</p>
          </div>
        <div style={{display:"flex",gap:2}}>Status: <p style={{ color: getStatusColor(status) }}>{status}</p></div>
      </div>
    </div>
  )
}

export default Card