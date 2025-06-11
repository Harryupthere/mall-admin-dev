import React, { useState } from "react";
import { motion } from "framer-motion";
import { Outlet } from "react-router-dom";
import SidebarDashboard from "./sidebar";

const Master = () => {
      const [isCollapsed, setIsCollapsed] = useState(false);
    
      const togggleSidebar = () => {
        setIsCollapsed(!isCollapsed)
      }
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2 }}
        >
            <div className="main-layout" >
                <div className="dashboard-sidebar">
                    <SidebarDashboard isCollapsed={isCollapsed} togggleSidebar={togggleSidebar}/>
                </div>
                <div className={`dashbord-page-content ${isCollapsed ? 'minus80' : 'minus200' }`}>
                    <div className="all-router-data">
                        <Outlet />
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default Master;
