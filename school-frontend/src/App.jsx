import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard"; 
import Teachers from "./pages/Teacher"; 
import Students from "./pages/Student"; 
import TestForm from "./pages/TestForm";




function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/teachers" element={<Teachers/>} />
        <Route path="/students" element={<Students />} />
        <Route path="/test-form" element={<TestForm />} />

      </Routes>
    </Router>
  );
}

export default App;
