import { Route, Routes } from 'react-router-dom';
import './index.css';
import Homepage from './components/Homepage';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/homepage" element={<Homepage />} />
      </Routes>
    </div>
  );
}

export default App;
