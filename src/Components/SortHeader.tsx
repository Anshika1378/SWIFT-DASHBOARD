import React from "react";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
  return (
    <nav className="p-4 bg-gray-200 flex gap-4">
      <Link to="/dashboard" className="font-semibold hover:underline">
        Dashboard
      </Link>
      <Link to="/profile" className="font-semibold hover:underline">
        Profile
      </Link>
    </nav>
  );
};

export default Header;
