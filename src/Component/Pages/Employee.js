import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const EmployeeForm = () => {
  const [formData, setFormData] = useState({
    EmployeeName: "",
    Designation: "",
    Address: "",
    Skills: "",
    Salary: "",
    BankDetails: {
      AccountNumber: "",
      BankName: "",
      IFSC: "",
      Branch: "",
    },
    MonthlyPerformance: "",
    JoiningDate: "",
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Handle nested BankDetails
    if (name.startsWith("BankDetails.")) {
      const key = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        BankDetails: { ...prev.BankDetails, [key]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }

    setErrors((prev) => ({ ...prev, [name]: "" })); // Clear errors on change
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post(" http://localhost:8000/api/Employee/employees", formData);
      toast.success("Employee details added successfully!");

      // Reset form
      setFormData({
        EmployeeName: "",
        Designation: "",
        Address: "",
        Skills: "",
        Salary: "",
        BankDetails: {
          AccountNumber: "",
          BankName: "",
          IFSC: "",
          Branch: "",
        },
        MonthlyPerformance: "",
        JoiningDate: "",
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
        <h2 className="text-xl font-bold text-gray-700 mb-4">Employee Details</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {/* Employee Name */}
          <div className="col-span-1">
            <label className="block mb-2 text-sm font-bold text-gray-700">
              Employee Name
            </label>
            <input
              type="text"
              name="EmployeeName"
              value={formData.EmployeeName}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Enter employee name"
            />
          </div>

          {/* Designation */}
          <div className="col-span-1">
            <label className="block mb-2 text-sm font-bold text-gray-700">
              Designation
            </label>
            <input
              type="text"
              name="Designation"
              value={formData.Designation}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Enter designation"
            />
          </div>

          {/* Address */}
          <div className="col-span-1">
            <label className="block mb-2 text-sm font-bold text-gray-700">
              Address
            </label>
            <input
              type="text"
              name="Address"
              value={formData.Address}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Enter address"
            />
          </div>

          {/* Skills */}
          <div className="col-span-1">
            <label className="block mb-2 text-sm font-bold text-gray-700">
              Skills
            </label>
            <input
              type="text"
              name="Skills"
              value={formData.Skills}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Enter skills"
            />
          </div>

          {/* Salary */}
          <div className="col-span-1">
            <label className="block mb-2 text-sm font-bold text-gray-700">
              Salary
            </label>
            <input
              type="number"
              name="Salary"
              value={formData.Salary}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Enter salary"
            />
          </div>

          {/* Monthly Performance */}
          <div className="col-span-1">
            <label className="block mb-2 text-sm font-bold text-gray-700">
              Monthly Performance (0-10)
            </label>
            <input
              type="number"
              name="MonthlyPerformance"
              value={formData.MonthlyPerformance}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Enter monthly performance"
              min="0"
              max="10"
            />
          </div>

          {/* Joining Date */}
          <div className="col-span-1">
            <label className="block mb-2 text-sm font-bold text-gray-700">
              Joining Date
            </label>
            <input
              type="date"
              name="JoiningDate"
              value={formData.JoiningDate}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
        </div>

        <h2 className="text-xl font-bold text-gray-700 mt-6 mb-4">Bank Details</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {/* Account Number */}
          <div className="col-span-1">
            <label className="block mb-2 text-sm font-bold text-gray-700">
              Account Number
            </label>
            <input
              type="text"
              name="BankDetails.AccountNumber"
              value={formData.BankDetails.AccountNumber}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Enter account number"
            />
          </div>

          {/* Bank Name */}
          <div className="col-span-1">
            <label className="block mb-2 text-sm font-bold text-gray-700">
              Bank Name
            </label>
            <input
              type="text"
              name="BankDetails.BankName"
              value={formData.BankDetails.BankName}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Enter bank name"
            />
          </div>

          {/* IFSC */}
          <div className="col-span-1">
            <label className="block mb-2 text-sm font-bold text-gray-700">
              IFSC
            </label>
            <input
              type="text"
              name="BankDetails.IFSC"
              value={formData.BankDetails.IFSC}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Enter IFSC code"
            />
          </div>

          {/* Branch */}
          <div className="col-span-1">
            <label className="block mb-2 text-sm font-bold text-gray-700">
              Branch
            </label>
            <input
              type="text"
              name="BankDetails.Branch"
              value={formData.BankDetails.Branch}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Enter branch name"
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
          {loading ? "Submitting..." : "Submit Employee Details"}
        </button>
      </form>
    </div>
  );
};

export default EmployeeForm;
