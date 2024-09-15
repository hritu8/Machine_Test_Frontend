import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="d-flex justify-content-between navbar navbar-expand-lg navbar-light bg-light shadow-sm">
      <div className="ml-6">
        <Link to="/home">Home</Link>
      </div>
      <div>
        <Link to="/emp-list">EmployeeList</Link>
      </div>
      <div>Hritu Raj</div>
      <div className="mr-6">
        <button
          onClick={() => {
            localStorage.removeItem("token");
            window.location.href = "/login";
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;
