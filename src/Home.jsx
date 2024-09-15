import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import CreateEmployee from "./components/CreateEmployee";
import EmployeeList from "./components/EmployeeList";

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Dashboard</h1>
        <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
          <p className="text-lg text-gray-700">Welcome to the Admin Panel</p>
        </div>
      </main>
    </div>
  );
};

export default Home;
