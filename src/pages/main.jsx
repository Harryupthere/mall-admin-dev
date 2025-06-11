import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Master from "../components/layout/master";


function Main() {
  // Top To Scroll
  const routePath = useLocation();
  const onTop = () => {
    window.scrollTo(0, 0);
  };
  useEffect(() => {
    onTop();
  }, [routePath]);

  return <Master />;
}

export default Main;
