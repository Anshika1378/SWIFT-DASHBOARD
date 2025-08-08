import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import Dashboard from "./Components/Dashboard";
import Profile from "./Components/Profile";

const App = () => {
  return (
    <Router>
      <nav className="p-4 bg-gray-200 flex gap-4">
        <Link to="/dashboard" className="font-semibold hover:underline">
          Dashboard
        </Link>
        <Link to="/profile" className="font-semibold hover:underline">
          Profile
        </Link>
      </nav>

      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
