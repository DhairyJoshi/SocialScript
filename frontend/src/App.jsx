import { BrowserRouter as Router, Routes, Route } from 'react-router';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Generator from './pages/Generator';
import './App.css'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/generator" element={<Generator />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;