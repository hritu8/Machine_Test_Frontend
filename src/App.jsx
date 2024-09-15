import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Signup from "./Signup";
import Login from "./login";
import Home from "./Home";
import Edit from "./components/Edit";
import EmployeeList from "./components/EmployeeList";
import CreateEmployee from "./components/CreateEmployee";
import PrivateRoute from "./components/PrivateRoute"; // Import the PrivateRoute component

function App() {
  const [token, setToken] = useState();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setToken(token);
    }
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/home"
          element={<PrivateRoute element={<Home />} token={token} />}
        />
        <Route
          path="/emp-list"
          element={<PrivateRoute element={<EmployeeList />} token={token} />}
        />
        <Route
          path="/create-employee"
          element={<PrivateRoute element={<CreateEmployee />} token={token} />}
        />
        <Route
          path="/edit/:id"
          element={<PrivateRoute element={<Edit />} token={token} />}
        />
        {/* Default route */}
        <Route
          path="/"
          element={<Navigate to={token ? "/home" : "/login"} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
