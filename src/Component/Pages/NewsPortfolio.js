import React, { useState, useRef } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import axios from "axios";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const NewsPortfolio = ({ isActive, onClick }) => {
  const quillRef = useRef(null);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "",
    tags: "", // Keep it as a string for easy input (later split it to array)
    thumbnailUrl: "",
    newImage: [],
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      [{ 'font': [] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'align': [] }],
      ['link', 'image'],
      ['clean'],
      [{ 'color': [] }, { 'background': [] }],
      ['blockquote', 'code-block'],
    ],
  };

  const formats = [
    'header', 'font',
    'bold', 'italic', 'underline', 'strike',
    'list', 'bullet',
    'align',
    'link', 'image',
    'color', 'background',
    'blockquote', 'code-block',
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setErrors((prev) => ({ ...prev, [name]: "" }));
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleQuillChange = (content) => {
    setFormData((prev) => ({ ...prev, content }));
    setErrors((prev) => ({ ...prev, content: "" }));
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
            "https://bbc-newsbackend.onrender.com/api/auth/upload",
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

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title) newErrors.title = "Title is required.";
    if (!formData.content) newErrors.content = "Content is required.";
    if (!formData.category) newErrors.category = "Category is required.";
    

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Ensure tags are handled as an array if they are entered as a string
    const updatedFormData = {
      ...formData,
      tags: formData.tags ? formData.tags.split(',').map(tag => tag.trim()) : [],
    };

    // Validate form before submission
    if (!validateForm()) {
      toast.error("Please fix the errors before submitting.");
      setLoading(false);
      return;
    }

    try {
      await axios.post("https://bbc-newsbackend.onrender.com/api/news/createNews", updatedFormData);
      toast.success("News added successfully!");

      // Reset form after successful submission
      setFormData({
        title: "",
        content: "",
        category: "",
        tags: "",
        thumbnailUrl: "",
        newImage: [],
      });
      if (quillRef.current) {
        quillRef.current.getEditor().setText('');
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Error submitting form: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const renderFormInput = (label, name, placeholder, type = "text") => (
    <div className="col-span-1">
      <label className="block mb-2 text-sm font-medium text-gray-700">{label}</label>
      <input
        type={type}
        name={name}
        value={formData[name]}
        onChange={handleInputChange}
        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
        placeholder={placeholder}
      />
      {errors[name] && <p className="text-red-600 text-sm mt-1">{errors[name]}</p>}
    </div>
  );

  const renderSelectInput = (label, name, options) => (
    <div className="col-span-1">
      <label className="block mb-2 text-sm font-medium text-gray-700">{label}</label>
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
      {errors[name] && <p className="text-red-600 text-sm mt-1">{errors[name]}</p>}
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
            <img
              src={fileUrl}
              alt={`Uploaded file ${index + 1}`}
              className="w-20 h-20 object-cover rounded-md"
            />
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <div className="w-full max-w-6xl mx-auto p-8 bg-white rounded-lg shadow-lg">
      <ToastContainer />
      <div className="flex justify-between mb-6">
        <Link to="/dashboard/view-news">
          <button className="p-3 rounded-lg bg-green-600 text-white hover:bg-green-700 font-semibold">
            View News
          </button>
        </Link>
        <button
          className={`p-3 rounded-lg transition-all font-semibold text-lg ${
            isActive ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-600"
          }`}
          onClick={onClick}
        >
          Add News
        </button>
      </div>
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="p-6 bg-gray-50 rounded-lg shadow-md">
          <h2 className="text-xl font-bold text-gray-700 mb-4">News Details</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {renderFormInput("Title", "title", "News Title")}
            <div className="col-span-2">
              <label className="block mb-2 text-sm font-medium text-gray-700">Content</label>
              <div className="h-64">
                <ReactQuill
                  ref={quillRef}
                  theme="snow"
                  value={formData.content}
                  onChange={handleQuillChange}
                  modules={modules}
                  formats={formats}
                  className="h-48 mb-12"
                />
              </div>
              {errors.content && <p className="text-red-600 text-sm mt-1">{errors.content}</p>}
            </div>
            {renderSelectInput("Category", "category", [
              "भारत",
              "विदेश",
              "मनोरंजन",
              "खेल",
              "विज्ञान-टेक्नॉलॉजी",
              "सोशल",
              "वीडियो",
              "पॉडकास्ट",
            ])}
            {renderFormInput("Tags", "tags", "Tags (comma-separated)")}
          </div>
        </div>

        <div className="p-6 bg-gray-50 rounded-lg shadow-md">
          <h2 className="text-xl font-bold text-gray-700 mb-4">Media</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {renderFormInput("Thumbnail URL", "thumbnailUrl", "Thumbnail URL")}
            {renderFileInputs("newImage", "Upload Images")}
          </div>
        </div>

        <button
          type="submit"
          className={`w-full p-3 text-lg font-medium rounded-lg text-white bg-blue-600 ${
            loading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"
          }`}
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit News"}
        </button>
      </form>
    </div>
  );
};

export default NewsPortfolio;
