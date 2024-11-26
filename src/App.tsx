import { Route, Routes } from 'react-router-dom';
import './index.css';
import Homepage from './components/pages/Homepage/Homepage';

function App() {
  return (
    <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/homepage" element={<Homepage />} />
      </Routes>
    </div>
  );
}

export default App;
