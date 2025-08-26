import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Navbar } from "./components/Navbar.jsx";
import Home from "./pages/Home.jsx";
import '../styles/App.css'

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  )
}

export default App;