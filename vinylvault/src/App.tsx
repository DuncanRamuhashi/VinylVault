import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import { ClipLoader } from 'react-spinners'; // Import the spinner component

const Home = lazy(() => import('./Home'));
const Login = lazy(() => import('./Login'));
const Register = lazy(() => import('./Register'));
const MainPage = lazy(() => import('./MainPage'));
const UploadCard = lazy(() => import('./UploadCard'));

function App() {
  return (
    <Router>
      <Navbar />
      <Suspense
        fallback={
          <div className="flex justify-center items-center h-screen bg-gray-200">
            <ClipLoader color="#36d7b7" size={50} />
          </div>
        }
      >
        <Routes>
          <Route path="*" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/collections" element={<MainPage />} />
          <Route path="/upload" element={<UploadCard />} />
        </Routes>
      </Suspense>
      <Footer />
    </Router>
  );
}

export default App;
