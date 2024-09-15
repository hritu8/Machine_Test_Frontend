import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { AuthProvider } from "./components/store"; // Import the AuthProvider
import Signup from "./Signup";
import Login from "./Login";
import Home from "./Home";
import Edit from "./components/Edit";
import EmployeeList from "./components/EmployeeList";
import CreateEmployee from "./components/CreateEmployee";
import PrivateRoute from "./components/PrivateRoute"; // Import the PrivateRoute component

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/emp-list" element={<EmployeeList />} />
          <Route path="/create-employee" element={<CreateEmployee />} />
          <Route path="/edit/:id" element={<Edit />} />
          {/* Default route */}
          <Route path="/" element={<Navigate to={"/login"} />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
