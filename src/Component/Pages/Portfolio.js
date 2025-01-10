import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import axios from "axios";

const Portfolio = ({ isActive, onClick }) => {
  
  const [formData, setFormData] = useState({
    title: "",
    productName: "",
    Category: "",
    Description: "",
    ClientName:"",
    ProductDeployedLink: "",
    ProductVideo: [],
    productImage: [],
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let newErrors = { ...errors };

    setErrors(newErrors);
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const uploadFileHandler = async (e, field) => {
    const files = e.target.files;

    if (!files.length) {
      toast.error("Please select files to upload.");
      return;
    }

    try {
      const uploadedUrls = await Promise.all(
        Array.from(files).map(async (file) => {
          const formDataToUpload = new FormData();
          formDataToUpload.append("file", file);

          const { data } = await axios.post(
            "https://admindashboardbackend-opa8.onrender.com/api/auth/upload",
            formDataToUpload
          );

          return data.fileUrl;
        })
      );

      setFormData((prev) => ({
        ...prev,
        [field]: [...prev[field], ...uploadedUrls],
      }));

      toast.success("Files uploaded successfully!");
    } catch (error) {
      console.error("File upload failed:", error);
      toast.error("File upload failed. Please try again.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (Object.keys(errors).length > 0) {
      toast.error("Please fix the errors before submitting.");
      setLoading(false);
      return;
    }

    try {
      await axios.post("https://admindashboardbackend-opa8.onrender.com/api/interior/interiors", formData);
      toast.success("Portfolio added successfully!");

      // Reset form
      setFormData({
        title: "",
        productName: "",
        Category: "",
        Description: "",
        ProductDeployedLink: "",
        ProductVideo: [],
        productImage: [],
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Error submitting form: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const renderFormInput = (label, name, placeholder, type = "text") => (
    <div className="col-span-1">
      <label className="block mb-2 text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        type={type}
        name={name}
        value={formData[name]}
        onChange={handleInputChange}
        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
        placeholder={placeholder}
      />
      {errors[name] && (
        <p className="text-red-600 text-sm mt-1">{errors[name]}</p>
      )}
    </div>
  );

  const renderSelectInput = (label, name, options) => (
    <div className="col-span-1">
      <label className="block mb-2 text-sm font-medium text-gray-700">
        {label}
      </label>
      <select
        name={name}
        value={formData[name]}
        onChange={handleInputChange}
        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
      >
        <option value="">Select category</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      {errors[name] && (
        <p className="text-red-600 text-sm mt-1">{errors[name]}</p>
      )}
    </div>
  );

  const renderFileInputs = (fieldName, label) => (
    <div className="p-4 bg-blue-100 rounded-lg shadow-md">
      <h3 className="font-semibold text-gray-700 mb-2">{label}</h3>
      <input
        type="file"
        multiple
        onChange={(e) => uploadFileHandler(e, fieldName)}
        className="text-blue-500 text-sm mb-2 hover:underline"
      />
      <ul>
        {formData[fieldName].map((fileUrl, index) => (
          <li key={index} className="text-sm text-gray-600 truncate">
            <span className="p-1 font-semibold">{index + 1}.</span>
            {fileUrl.endsWith(".pdf") ? (
              <a
                href={fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-600"
              >
                View PDF
              </a>
            ) : (
              <img
                src={fileUrl}
                alt={`Uploaded file ${index + 1}`}
                className="w-20 h-20 object-cover rounded-md"
              />
            )}
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <div className="w-full max-w-6xl mx-auto p-8 bg-white rounded-lg shadow-lg">
      <ToastContainer />
      <div className="flex justify-between mb-6">
         <Link to="/dashboard/view-portfolio" ><button
         
          className="p-3 rounded-lg bg-green-600 text-white hover:bg-green-700 font-semibold"
        >
          View Portfolio
        </button>
        </Link>
        <button
          className={`p-3 rounded-lg transition-all font-semibold text-lg ${
            isActive ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-600"
          }`}
          onClick={onClick}
        >
          Add Portfolio
        </button>
      </div>
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="p-6 bg-gray-50 rounded-lg shadow-md">
          <h2 className="text-xl font-bold text-gray-700 mb-4">Project Details</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {renderFormInput("Title", "title", "Project Title")}
            {renderFormInput("Product Name", "productName", "Product Name")}
            {renderSelectInput("Category", "Category", [
              "Web Dev",
              "App Dev",
              "Software Dev",
              "Editing",
              "2D & 3D Modeling",
              "Animation",
              "GamiFication"
            ])}
            {renderFormInput("Description", "Description", "Description")}
            {renderFormInput("ClientName", "ClientName", "ClientName")}
            {renderFormInput("Product Deployed Link", "ProductDeployedLink", "Product Deployed Link")}
          </div>
        </div>

        <div className="p-6 bg-gray-50 rounded-lg shadow-md">
          <h2 className="text-xl font-bold text-gray-700 mb-4">Product Media</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {renderFileInputs("ProductVideo", "Product Video Files")}
            {renderFileInputs("productImage", "Product Image Files")}
          </div>
        </div>

        <button
          type="submit"
          className={`w-full p-3 text-lg font-medium rounded-lg text-white bg-blue-600 ${
            loading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"
          }`}
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit Project"}
        </button>
      </form>
    </div>
  );
};

export default Portfolio;
