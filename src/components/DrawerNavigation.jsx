// import React from 'react'
// import styles from "./DrawerNavigation.module.css"
// import { MdCancel, MdDashboard, MdLogout, MdTaskAlt} from "react-icons/md";
// import { BiTask } from "react-icons/bi";
// import { useNavigate } from 'react-router';

// function DrawerNavigation() {
// const navigate = useNavigate();

//   // State to track the selected navigation item
//   const [selected, setSelected] = useState(null);

//     // Function to handle navigation and setting the selected item
//     const handleNavigation = (path, item) => {
//         setSelected(item); // Set the selected item
//         navigate(path); // Navigate to the corresponding path
//       };

//   return (
//     <div className={styles.container}>
//         <div className={styles.header}>
//             Jatin Rawat
//         </div>
//         <div className={styles.nav_menu}>
//             <div style={{display:"flex", gap:"4px",flexDirection:"column"}} >
//                 <div className={styles.nav_item} onClick={()=>navigate("/")}>
//                     <div style={{marginRight:"3%"}}><MdDashboard/></div>
//                     <p>Dashboard</p>
//                 </div>
//                 <div className={styles.nav_item} onClick={()=>navigate("/my_task")}>
//                     <div style={{marginRight:"3%"}}><BiTask/></div>
//                     <p>My Task</p>
//                 </div>
//                 <div className={styles.nav_item} onClick={()=>navigate("/completed_tasks")}>
//                     <div style={{marginRight:"3%"}}><MdTaskAlt/></div>
//                     <p>Completed Tasks</p>
//                 </div>
//                 <div className={styles.nav_item} onClick={()=>navigate("/incomplete_tasks")}>
//                     <div style={{marginRight:"3%"}}><MdCancel/></div>
//                     <p>Incomplete Tasks</p>
//                 </div>
//             </div>
//             <div>
//             <div className={styles.nav_item}>
//                     <div style={{marginRight:"2%"}}><MdLogout/></div>
//                     <p>Log Out</p>
//                 </div>
//             </div>
//         </div>
//     </div>
//   )
// }

// export default DrawerNavigation


import React, { useState } from 'react';
import styles from "./DrawerNavigation.module.css";
import { MdCancel, MdDashboard, MdLogout, MdTaskAlt } from "react-icons/md";
import { BiTask } from "react-icons/bi";
import { useNavigate } from 'react-router';

function DrawerNavigation() {
  const navigate = useNavigate();
  
  // State to track the selected navigation item
  const [selected, setSelected] = useState("dashboard");

  // Function to handle navigation and setting the selected item
  const handleNavigation = (path, item) => {
    setSelected(item); // Set the selected item
    navigate(path); // Navigate to the corresponding path
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <p style={{fontSize:"large"}}>Jatin Rawat</p>
        <p style={{fontSize:"large"}}>abc@gmail.com</p>
      </div>
      <div className={styles.nav_menu}>
        <div style={{ display: "flex", gap: "4px", flexDirection: "column" }}>
          <div
            className={`${styles.nav_item} ${selected === "dashboard" ? styles.selected : ""}`}
            onClick={() => handleNavigation("/", "dashboard")}
          >
            <div style={{ marginRight: "3%" }}><MdDashboard /></div>
            <p>Dashboard</p>
          </div>
          <div
            className={`${styles.nav_item} ${selected === "my_task" ? styles.selected : ""}`}
            onClick={() => handleNavigation("/my_task", "my_task")}
          >
            <div style={{ marginRight: "3%" }}><BiTask /></div>
            <p>My Task</p>
          </div>
          <div
            className={`${styles.nav_item} ${selected === "completed_tasks" ? styles.selected : ""}`}
            onClick={() => handleNavigation("/completed_tasks", "completed_tasks")}
          >
            <div style={{ marginRight: "3%" }}><MdTaskAlt /></div>
            <p>Completed Tasks</p>
          </div>
          <div
            className={`${styles.nav_item} ${selected === "incomplete_tasks" ? styles.selected : ""}`}
            onClick={() => handleNavigation("/incomplete_tasks", "incomplete_tasks")}
          >
            <div style={{ marginRight: "3%" }}><MdCancel /></div>
            <p>Incomplete Tasks</p>
          </div>
        </div>
        <div>
          {/* <div className={styles.nav_item}>
            <div style={{ marginRight: "2%" }}><MdLogout /></div>
            <p>Log Out</p>
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default DrawerNavigation;
