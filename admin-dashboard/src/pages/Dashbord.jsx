import React from "react";
import Button from "../components/ButtonComponent";
import Header from "../components/header";
import LateralNavigation from "../components/LateralNavigation";
function Dashboard() {
  return (
    <div className="admin-dashboard">
      <Header />
      <LateralNavigation />
      <h1>Admin Dashboard</h1>
      <p>Welcome to the admin dashboard!</p>
      <Button text="Créer un magasin" href="/" />
   
      {/* Add more admin functionalities here */}
    </div>
  );
}
export default Dashboard;