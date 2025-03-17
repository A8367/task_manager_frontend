import React, { useState } from 'react'
import Card from '../components/Card'
import styles from "./Dashboard.module.css"
import AddTaskForm from '../components/AddTaskForm'
import { CiCirclePlus } from "react-icons/ci";
import TodoList from '../components/TodoList';
import CompletedTodoList from '../components/CompletedTodoList';
import { PiHandWavingFill } from "react-icons/pi";
import { CiMemoPad } from "react-icons/ci";

function Dashboard() {
  const [displayForm, setDisplayForm] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const handleAddTask = () => {
    setDisplayForm((prev) => !prev);
  }
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <div style={{display:"flex", gap:10,margin:10,fontWeight:600}}>
        <p style={{fontSize:30}}>Welcome back, Jatin</p>
        <PiHandWavingFill size={40} color="rgb(249, 246, 57)"/>
      </div>

      <div style={{ display: "flex", width: "100%", height: "100%", gap: "8px", padding: "5px" }}>
        {displayForm && <AddTaskForm setDisplayForm={setDisplayForm} setRefresh={setRefresh} />}
        <div className={styles.left}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div style={{display:"flex",gap:3}}>
            <CiMemoPad size={30} color='gray'/>
            <p style={{ color: "#FF6767",fontSize:"large" }}>To-Do</p>
            </div>
            <div style={{ cursor: "pointer", color: "#FF6767",display:"flex",alignItems:"center"}} onClick={handleAddTask}>
              <CiCirclePlus size={28}/>
              <p style={{fontSize:"large" }}>Add task</p>
            </div>
          </div>
          <TodoList refresh={refresh} setRefresh={setRefresh} />
        </div>
        <div className={styles.right}>
          <p style={{ color: "#FF6767" ,fontSize:"large"}}>Completed Tasks</p>
          <CompletedTodoList refresh={refresh} setRefresh={setRefresh} />
        </div>
      </div>
    </div>
  )
}

export default Dashboard