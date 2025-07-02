import React from "react";
import Button from "../components/ButtonComponent";

function Dashboard() {
  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      <p>Welcome to the admin dashboard!</p>
      <Button text="Créer un magasin" href="/" />
   
    </div>
  );
}
export default Dashboard;