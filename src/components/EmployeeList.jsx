import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]); // Employee list
  const [searchTerm, setSearchTerm] = useState(""); // Search term for filtering
  const [sortConfig, setSortConfig] = useState(null); // Sorting configuration

  // Sort the employee data based on the config
  const sortedEmployees = [...employees].sort((a, b) => {
    if (sortConfig !== null) {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === "ascending" ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === "ascending" ? 1 : -1;
      }
    }
    return 0;
  });

  // Handle sort
  const requestSort = (key) => {
    let direction = "ascending";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "ascending"
    ) {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  // Filter employees based on search term
  const filteredEmployees = sortedEmployees.filter((employee) =>
    Object.keys(employee).some((key) =>
      String(employee[key]).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  // Handle Edit (Placeholder)
  const handleEdit = (id) => {
    alert(`Editing employee with ID: ${id}`);
  };

  const handleDelete = (id) => {
    console.log(id);
    axios
      .delete("http://localhost:3001/deleteEmployee", {
        data: { id: String(id) }, // Convert ID to string
      })
      .then((response) => {
        console.log(response.data);
        setEmployees((prevEmployees) =>
          prevEmployees.filter((employee) => employee.id !== id)
        );
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };
  // Handle status toggle
  const toggleStatus = (id, currentStatus) => {
    // Determine the new status based on the current status
    const newStatus = currentStatus === "Active" ? "Inactive" : "Active";

    // Send a PUT request to update the status
    axios
      .put(
        `http://localhost:3001/edit/status/${id}`,
        { status: newStatus }, // Send status in the request body
        {
          headers: {
            "Content-Type": "application/json", // Use application/json for JSON data
          },
        }
      )
      .then((result) => {
        console.log(result);
        // Update the employee list after status update
        setEmployees((prevEmployees) =>
          prevEmployees.map((employee) =>
            employee.id === id ? { ...employee, status: newStatus } : employee
          )
        );
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    axios
      .get("http://localhost:3001/getEmployee")
      .then((response) => {
        setEmployees(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [employees]);

  return (
    <div className="container mx-auto p-6">
      <div className="header mb-6">
        <h1 className="text-3xl font-bold mb-4 text-center">Employee List</h1>
      </div>

      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          className="border p-2 w-full md:w-1/2 lg:w-1/3 rounded-md shadow-sm"
          placeholder="Enter Search Keyword"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <Link
          to="/create-employee"
          className="ml-4 bg-blue-500 text-white px-4 py-2 rounded-md shadow hover:bg-blue-600"
        >
          Create Employee
        </Link>
      </div>

      <table className="min-w-full table-auto bg-white shadow-md rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th
              className="px-6 py-3 cursor-pointer"
              onClick={() => requestSort("id")}
            >
              Unique ID
            </th>
            <th className="px-6 py-3">Image</th>
            <th
              className="px-6 py-3 cursor-pointer"
              onClick={() => requestSort("name")}
            >
              Name
            </th>
            <th
              className="px-6 py-3 cursor-pointer"
              onClick={() => requestSort("email")}
            >
              Email
            </th>
            <th className="px-6 py-3">Mobile No</th>
            <th
              className="px-6 py-3 cursor-pointer"
              onClick={() => requestSort("designation")}
            >
              Designation
            </th>
            <th className="px-6 py-3">Gender</th>
            <th className="px-6 py-3">Course</th>
            <th className="px-6 py-3">Create Date</th>
            <th className="px-6 py-3">Status</th>
            <th className="px-6 py-3">Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredEmployees.length > 0 ? (
            filteredEmployees.map((employee, index) => (
              <tr key={index} className="border-b">
                <td className="px-6 py-4">{index + 1}</td>
                <td className="px-6 py-4">
                  <img
                    src={employee.image}
                    alt={employee.name}
                    className="w-12 h-12 object-cover rounded-full"
                  />
                </td>
                <td className="px-6 py-4">{employee.name}</td>
                <td className="px-6 py-4">
                  <a
                    href={`mailto:${employee.email}`}
                    className="text-blue-500 hover:underline"
                  >
                    {employee.email}
                  </a>
                </td>
                <td className="px-6 py-4">{employee.mobileNo}</td>
                <td className="px-6 py-4">{employee.designation}</td>
                <td className="px-6 py-4">{employee.gender}</td>
                <td className="px-6 py-4">{employee.course}</td>
                <td className="px-4 py-4 sm:px-6">
                  {new Date(employee.updatedAt).toLocaleDateString("en-GB")}
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`px-2 py-1 rounded-full text-white ${
                      employee.status === "Active"
                        ? "bg-green-500"
                        : "bg-red-500"
                    }`}
                  >
                    {employee.status}
                  </span>
                </td>
                <td className="px-6 py-4 flex space-x-2">
                  <button
                    onClick={() => toggleStatus(employee._id, employee.status)}
                    className={`px-2 py-1 rounded-md text-white ${
                      employee.status === "Active"
                        ? "bg-red-500 hover:bg-red-600"
                        : "bg-green-500 hover:bg-green-600"
                    }`}
                  >
                    {employee.status === "Active" ? "Deactivate" : "Activate"}
                  </button>
                  <Link
                    to={`/edit/${employee._id}`}
                    className="px-2 py-1 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(employee._id)}
                    className="px-2 py-1 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="11" className="text-center py-4">
                No employees found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeList;
