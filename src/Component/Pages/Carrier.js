import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const Carrier = () => {
  const [formData, setFormData] = useState({
    jobTitle: "",
    jobDescription: "",
    location: "",
    salary: "",
    jobType: "",
    applicationDeadline: "",
    responsibilities: [""],
    requirements: [""],
    toolsAndTechnologies: [""],
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
      [field]: [...prev[field], ""],
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
      await axios.post("http://localhost:8000/api/carrier/careers", formData);
      toast.success("Carrier job added successfully!");

      setFormData({
        jobTitle: "",
        jobDescription: "",
        location: "",
        salary: "",
        jobType: "",
        applicationDeadline: "",
        responsibilities: [""],
        requirements: [""],
        toolsAndTechnologies: [""],
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Error submitting form: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-8 bg-gray-50 rounded-lg shadow-md">
      <ToastContainer />
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-700">
        Add Career Job
      </h1>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {/* Job Details */}
        <div className="md:col-span-2">
          <label className="block mb-2 font-semibold">Job Title</label>
          <input
            type="text"
            name="jobTitle"
            value={formData.jobTitle}
            onChange={handleInputChange}
            className="w-full p-3 border rounded-lg"
            placeholder="Enter job title"
          />
        </div>
        <div className="md:col-span-2">
          <label className="block mb-2 font-semibold">Job Description</label>
          <textarea
            name="jobDescription"
            value={formData.jobDescription}
            onChange={handleInputChange}
            className="w-full p-3 border rounded-lg"
            placeholder="Enter job description"
            rows={4}
          ></textarea>
        </div>

        {/* Location and Salary */}
        <div>
          <label className="block mb-2 font-semibold">Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            className="w-full p-3 border rounded-lg"
            placeholder="Enter job location"
          />
        </div>
        <div>
          <label className="block mb-2 font-semibold">Salary</label>
          <input
            type="number"
            name="salary"
            value={formData.salary}
            onChange={handleInputChange}
            className="w-full p-3 border rounded-lg"
            placeholder="Enter salary"
          />
        </div>

        {/* Job Type and Deadline */}
        <div>
          <label className="block mb-2 font-semibold">Job Type</label>
          <select
            name="jobType"
            value={formData.jobType}
            onChange={handleInputChange}
            className="w-full p-3 border rounded-lg"
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
            className="w-full p-3 border rounded-lg"
          />
        </div>

        {/* Dynamic Lists */}
        {["responsibilities", "requirements", "toolsAndTechnologies"].map(
          (field) => (
            <div className="md:col-span-2" key={field}>
              <label className="block mb-2 font-semibold capitalize">
                {field.replace(/([A-Z])/g, " $1")}
              </label>
              {formData[field].map((item, index) => (
                <div key={index} className="flex items-center space-x-3 mb-2">
                  <input
                    type="text"
                    value={item}
                    onChange={(e) => handleArrayChange(e, index, field)}
                    className="w-full p-3 border rounded-lg"
                    placeholder={`Enter ${field.slice(0, -1)}`}
                  />
                  <button
                    type="button"
                    onClick={() => removeArrayItem(index, field)}
                    className="text-red-500"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => addArrayItem(field)}
                className="text-blue-500 font-semibold"
              >
                Add {field.slice(0, -1)}
              </button>
            </div>
          )
        )}

        {/* Submit Button */}
        <div className="md:col-span-2">
          <button
            type="submit"
            className={`w-full py-3 px-5 font-semibold text-white rounded-lg ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
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
