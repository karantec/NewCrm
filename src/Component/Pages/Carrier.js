import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const Carrier = () => {
  const [formData, setFormData] = useState({
    jobTitle: "",
    jobDescription: "",
    company: "",
    location: "",
    salary: "",
    jobType: "",
    applicationDeadline: "",
    responsibilities: [""],
    requirements: [""],
    toolsAndTechnologies: [""]
  });

  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleArrayChange = (e, index, field) => {
    const { value } = e.target;
    setFormData((prev) => {
      const updatedArray = [...prev[field]];
      updatedArray[index] = value;
      return { ...prev, [field]: updatedArray };
    });
  };

  const addArrayItem = (field) => {
    setFormData((prev) => ({
      ...prev,
      [field]: [...prev[field], ""]
    }));
  };

  const removeArrayItem = (index, field) => {
    setFormData((prev) => {
      const updatedArray = [...prev[field]];
      updatedArray.splice(index, 1);
      return { ...prev, [field]: updatedArray };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post("https://your-backend-api-url/api/carrier", formData);
      toast.success("Carrier job added successfully!");

      setFormData({
        jobTitle: "",
        jobDescription: "",
        company: "",
        location: "",
        salary: "",
        jobType: "",
        applicationDeadline: "",
        responsibilities: [""],
        requirements: [""],
        toolsAndTechnologies: [""]
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
      <h1 className="text-2xl font-bold mb-6">Add Carrier Job</h1>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block mb-2 font-semibold">Job Title</label>
          <input
            type="text"
            name="jobTitle"
            value={formData.jobTitle}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block mb-2 font-semibold">Company</label>
          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="md:col-span-2">
          <label className="block mb-2 font-semibold">Job Description</label>
          <textarea
            name="jobDescription"
            value={formData.jobDescription}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          ></textarea>
        </div>
        <div>
          <label className="block mb-2 font-semibold">Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block mb-2 font-semibold">Salary</label>
          <input
            type="number"
            name="salary"
            value={formData.salary}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block mb-2 font-semibold">Job Type</label>
          <select
            name="jobType"
            value={formData.jobType}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          >
            <option value="">Select Job Type</option>
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Contract">Contract</option>
          </select>
        </div>
        <div>
          <label className="block mb-2 font-semibold">Application Deadline</label>
          <input
            type="date"
            name="applicationDeadline"
            value={formData.applicationDeadline}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="md:col-span-2">
          <label className="block mb-2 font-semibold">Responsibilities</label>
          {formData.responsibilities.map((item, index) => (
            <div key={index} className="flex items-center space-x-2 mb-2">
              <input
                type="text"
                value={item}
                onChange={(e) => handleArrayChange(e, index, "responsibilities")}
                className="w-full p-2 border rounded"
              />
              <button
                type="button"
                onClick={() => removeArrayItem(index, "responsibilities")}
                className="text-red-500"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => addArrayItem("responsibilities")}
            className="text-blue-500"
          >
            Add Responsibility
          </button>
        </div>
        <div className="md:col-span-2">
          <label className="block mb-2 font-semibold">Requirements</label>
          {formData.requirements.map((item, index) => (
            <div key={index} className="flex items-center space-x-2 mb-2">
              <input
                type="text"
                value={item}
                onChange={(e) => handleArrayChange(e, index, "requirements")}
                className="w-full p-2 border rounded"
              />
              <button
                type="button"
                onClick={() => removeArrayItem(index, "requirements")}
                className="text-red-500"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => addArrayItem("requirements")}
            className="text-blue-500"
          >
            Add Requirement
          </button>
        </div>
        <div className="md:col-span-2">
          <label className="block mb-2 font-semibold">Tools and Technologies</label>
          {formData.toolsAndTechnologies.map((item, index) => (
            <div key={index} className="flex items-center space-x-2 mb-2">
              <input
                type="text"
                value={item}
                onChange={(e) => handleArrayChange(e, index, "toolsAndTechnologies")}
                className="w-full p-2 border rounded"
              />
              <button
                type="button"
                onClick={() => removeArrayItem(index, "toolsAndTechnologies")}
                className="text-red-500"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => addArrayItem("toolsAndTechnologies")}
            className="text-blue-500"
          >
            Add Tool/Technology
          </button>
        </div>
        <div className="md:col-span-2">
          <button
            type="submit"
            className={`w-full p-3 text-lg font-medium rounded-lg text-white bg-blue-600 ${
              loading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"
            }`}
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit Job"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Carrier;
