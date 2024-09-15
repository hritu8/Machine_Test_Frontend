import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="d-flex justify-content-between navbar navbar-expand-lg navbar-light bg-light shadow-sm">
      <div className="">
        <Link to="/home">Home</Link>
      </div>
      <div>
        <Link to="/emp-list">EmployeeList</Link>
      </div>
      <div>User</div>
      <div>
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
