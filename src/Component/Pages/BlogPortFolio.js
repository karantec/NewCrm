import React, { useState, useRef } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import axios from "axios";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const BlogPortFolio = ({ isActive, onClick }) => {
  const quillRef = useRef(null);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    author: "Anonymous",
    tags: [],
    thumbnailUrl: "",
    BlogImages: [],
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
    setFormData(prev => ({ ...prev, content }));
    setErrors(prev => ({ ...prev, content: "" }));
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post(
        "https://bbc-newsbackend.onrender.com/api/blog/createblogs",
        formData
      );
      toast.success("Blog added successfully!");

      // Reset form
      setFormData({
        title: "",
        content: "",
        author: "Anonymous",
        tags: [],
        thumbnailUrl: "",
        BlogImages: [],
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

  return (
    <div className="w-full max-w-6xl mx-auto p-8 bg-white rounded-lg shadow-lg">
      <ToastContainer />
      <div className="flex justify-between mb-6">
        <Link to="/dashboard/view-blogs">
          <button className="p-3 rounded-lg bg-green-600 text-white hover:bg-green-700 font-semibold">
            View Blogs
          </button>
        </Link>
        <button
          className={`p-3 rounded-lg transition-all font-semibold text-lg ${
            isActive ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-600"
          }`}
          onClick={onClick}
        >
          Add Blog
        </button>
      </div>
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="p-6 bg-gray-50 rounded-lg shadow-md">
          <h2 className="text-xl font-bold text-gray-700 mb-4">Blog Details</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="col-span-1">
              <label className="block mb-2 text-sm font-bold uppercase text-gray-700">
                Title
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                placeholder="Enter blog title"
              />
              {errors.title && (
                <p className="text-red-600 text-sm mt-1">{errors.title}</p>
              )}
            </div>
            <div className="col-span-2">
              <label className="block mb-2 text-sm font-bold uppercase text-gray-700">
                Content
              </label>
              <div className="h-64">
                <ReactQuill
                  ref={quillRef}
                  theme="snow"
                  value={formData.content}
                  onChange={handleQuillChange}
                  modules={modules}
                  formats={formats}
                  className="h-48 mb-12 bg-white"
                />
              </div>
              {errors.content && (
                <p className="text-red-600 text-sm mt-1">{errors.content}</p>
              )}
            </div>
          </div>
        </div>

        <div className="p-6 bg-gray-50 rounded-lg shadow-md">
          <h2 className="text-xl font-bold text-gray-700 mb-4">Tags & Media</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="col-span-1">
              <label className="block mb-2 text-sm font-bold uppercase text-gray-700">
                Tags
              </label>
              <input
                type="text"
                name="tags"
                value={formData.tags.join(", ")}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    tags: e.target.value.split(",").map((tag) => tag.trim()),
                  }))
                }
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                placeholder="Enter tags separated by commas"
              />
            </div>
            <div className="col-span-1">
              <label className="block mb-2 text-sm font-bold uppercase text-gray-700">
                Thumbnail URL
              </label>
              <input
                type="text"
                name="thumbnailUrl"
                value={formData.thumbnailUrl}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                placeholder="Enter thumbnail URL"
              />
            </div>
          </div>
          <div className="mt-4">
            <label className="block mb-2 text-sm font-bold uppercase text-gray-700">
              Blog Images
            </label>
            <input
              type="file"
              multiple
              onChange={(e) => uploadFileHandler(e, "BlogImages")}
              className="text-blue-500 text-sm hover:underline"
            />
            <div className="flex flex-wrap mt-2 gap-2">
              {formData.BlogImages.map((url, index) => (
                <img
                  key={url}
                  src={url}
                  alt={`Blog ${index + 1}`}
                  className="w-20 h-20 object-cover rounded-md"
                />
              ))}
            </div>
          </div>
        </div>

        <button
          type="submit"
          className={`w-full p-3 text-lg font-medium rounded-lg text-white bg-blue-600 ${
            loading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"
          }`}
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit Blog"}
        </button>
      </form>
    </div>
  );
};

export default BlogPortFolio;