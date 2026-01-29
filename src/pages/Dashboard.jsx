import React from "react";
import { Cards } from "../components/Cards/Cards";
import AppNavbar from "../components/nav/AppNavbar";
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

const Dashboard = () => {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;
  if (!user) return <Navigate to="/login" replace />;

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
