import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Navbar from './Navbar';
import Footer from './Footer';

function App() {
  const [count, setCount] = useState(0);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="*" element={<Home />} />
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;
