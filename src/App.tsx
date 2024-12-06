import { Route, Routes } from 'react-router-dom';
import './index.css';
import Homepage from './components/pages/Homepage/Homepage';
import Navbar from './components/common/Navbar';

function App() {
  return (
    <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/homepage" element={<Homepage />} />
      </Routes>
    </div>
  );
}

export default App;
