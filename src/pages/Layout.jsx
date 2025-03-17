import React from 'react'
import DrawerNavigation from '../components/DrawerNavigation'
import { Outlet } from 'react-router'

function Layout() {
  return (
    <div style={{ display: "flex", flex: 1, height: "100vh" }}>
      <DrawerNavigation />
      <div style={{ flex: 1}}>
        <Outlet />
      </div>
    </div>
  )
}

export default Layout