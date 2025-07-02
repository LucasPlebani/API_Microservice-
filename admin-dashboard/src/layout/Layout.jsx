// layout/Layout.jsx
import React, { useState } from "react";
import Header from "../components/header";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";


const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  // sidebar close by default
  
  

  return (
    <>
      <Header toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      <div className="main-container">
        <Sidebar isOpen={sidebarOpen} />
        <main className="content">
          <main
  className="content"
  style={{ marginLeft: sidebarOpen ? "240px" : "100px" }}
>
  <Outlet />
</main>
         
        </main>
      </div>
    </>
  );
};

export default Layout;
