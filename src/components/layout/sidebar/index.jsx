import React from "react";
import MenuItems from "../menuitems";
import { Sidebar } from "react-pro-sidebar";
import './sidebar.scss'
import { DownIcon } from "../../../icons/icons";


const SidebarDashboard = ({isCollapsed,togggleSidebar}) => {

  return (
    <>
      <div className="main-sidebar">
        <Sidebar collapsed={isCollapsed}>
          <MenuItems />
        </Sidebar>
        <main>
          <button className="toggle-button" onClick={togggleSidebar}>
            <DownIcon />
          </button>
        </main>
      </div>

    </>
  );
}
export default SidebarDashboard;