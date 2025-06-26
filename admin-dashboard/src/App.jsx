import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashbord';
// import Users from './pages/Users';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        {/* <Route path="/users" element={<Users />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
