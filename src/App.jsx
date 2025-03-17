import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router'
import Layout from './pages/Layout'
import Dashboard from './pages/Dashboard'
import CompletedTasks from './pages/CompletedTasks'
import IncompleteTasks from './pages/IncompleteTasks'
import MyTask from './pages/MyTask'

function App() {
  return (
    <BrowserRouter>
       <Routes>
        <Route path="/" element={<Layout/>}>
          <Route index element={<Dashboard/>}/>
          <Route path='my_task' element={<MyTask/>}/>
          <Route path='completed_tasks' element={<CompletedTasks/>}/>
          <Route path='incomplete_tasks' element={<IncompleteTasks/>}/>
        </Route>
        </Routes> 
    </BrowserRouter>
  )
}

export default App