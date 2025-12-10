import './App.css';
import React, { Fragment } from "react";
import Navbar from './components/nav/Navbar'; 
import { Hero } from './components/Hero/Hero';
import { Features } from './components/Features/Features';
import { featData } from './data/featData';
import { Preview } from './components/Preview/Preview';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute'; 
import Signup from './pages/Signup';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import About from './components/About/About';

function HomePage() {
  return (
    <>
      <Navbar />
      <Hero />
      <div className='feat-container'>
        {featData.map((feat, index) => (
          <Features
            key={index}
            title={feat.title}
            description={feat.description}
            icon={feat.icon}
          />
        ))}
      </div>
      <Preview />
      <About/>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
    </ProtectedRoute>
  }
/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;