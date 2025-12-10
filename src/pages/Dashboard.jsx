import React from "react";
import { Cards } from "../components/Cards/Cards";
import AppNavbar from "../components/nav/AppNavbar";
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

const Dashboard = () => {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>; // wait until fetchUser finishes
  if (!user) return <Navigate to="/login" replace />; // only redirect if truly not logged in

  return (
    <>
      <AppNavbar />
      <div>
        <Cards />
      </div>
    </>
  );
};

export default Dashboard;
