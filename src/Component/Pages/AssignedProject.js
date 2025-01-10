import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const AssignedForm = () => {
  const [formData, setFormData] = useState({
    ProjectName: "",
    ClientName: "",
    AssignedEmployees: "",
    StartDate: "",
    DeadLine: "",
    BudgetOfProject: "",
    NetRevenue: "",
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" })); // Clear errors on change
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post("http://localhost:8000/api/assigned/assignment", formData);
      toast.success("Project details added successfully!");

      // Reset form
      setFormData({
        ProjectName: "",
        ClientName: "",
        AssignedEmployees: "",
        StartDate: "",
        DeadLine: "",
        BudgetOfProject: "",
        NetRevenue: "",
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Error submitting form: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-8 bg-white rounded-lg shadow-lg">
      <ToastContainer />
      <form onSubmit={handleSubmit} className="space-y-8">
        <h2 className="text-xl font-bold text-gray-700 mb-4">Project Details</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {/* Project Name */}
          <div className="col-span-1">
            <label className="block mb-2 text-sm font-bold text-gray-700">
              Project Name
            </label>
            <input
              type="text"
              name="ProjectName"
              value={formData.ProjectName}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Enter project name"
            />
          </div>

          {/* Client Name */}
          <div className="col-span-1">
            <label className="block mb-2 text-sm font-bold text-gray-700">
              Client Name
            </label>
            <input
              type="text"
              name="ClientName"
              value={formData.ClientName}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Enter client name"
            />
          </div>

          {/* Assigned Employees */}
          <div className="col-span-1">
            <label className="block mb-2 text-sm font-bold text-gray-700">
              Assigned Employees
            </label>
            <input
              type="text"
              name="AssignedEmployees"
              value={formData.AssignedEmployees}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Enter assigned employees"
            />
          </div>

          {/* Start Date */}
          <div className="col-span-1">
            <label className="block mb-2 text-sm font-bold text-gray-700">
              Start Date
            </label>
            <input
              type="date"
              name="StartDate"
              value={formData.StartDate}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          {/* DeadLine */}
          <div className="col-span-1">
            <label className="block mb-2 text-sm font-bold text-gray-700">
              Deadline
            </label>
            <input
              type="date"
              name="DeadLine"
              value={formData.DeadLine}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          {/* Budget of Project */}
          <div className="col-span-1">
            <label className="block mb-2 text-sm font-bold text-gray-700">
              Budget of Project
            </label>
            <input
              type="text"
              name="BudgetOfProject"
              value={formData.BudgetOfProject}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Enter project budget"
            />
          </div>

          {/* Net Revenue */}
          <div className="col-span-1">
            <label className="block mb-2 text-sm font-bold text-gray-700">
              Net Revenue
            </label>
            <input
              type="text"
              name="NetRevenue"
              value={formData.NetRevenue}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Enter net revenue"
            />
          </div>
        </div>

        <button
          type="submit"
          className={`w-full p-3 text-lg font-medium rounded-lg text-white bg-blue-600 ${
            loading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"
          }`}
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit Project Details"}
        </button>
      </form>
    </div>
  );
};

export default AssignedForm;
