import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Navbar from './Navbar';
import Footer from './Footer';
import Login from './Login';
import Register from './Register';
import MainPage from './MainPage';

function App() {


  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="*" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/collections" element={<MainPage />}/>
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;
