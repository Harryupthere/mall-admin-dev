import { useState } from "react";

const useSidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const togggleSidebar = ()=>{
    setIsCollapsed(!isCollapsed)
  }
  return {
    isCollapsed,
    togggleSidebar,
  };
};

export default useSidebar;
