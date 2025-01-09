import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import axios from "axios";

const Team = ({ isActive, onClick }) => {
  const [formData, setFormData] = useState({
    name: "",
    designation: "",
    bio: "",
    profilePicture: "",
    skills: "",
    technologies: "",
    joinedAt: "",
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setErrors((prev) => ({ ...prev, [name]: "" })); // Clear errors on change
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];

    if (!file) {
      toast.error("Please select a file to upload.");
      return;
    }

    try {
      const formDataToUpload = new FormData();
      formDataToUpload.append("file", file);

      const { data } = await axios.post(
        "http://localhost:8000/api/auth/upload",
        formDataToUpload
      );

      setFormData((prev) => ({
        ...prev,
        profilePicture: data.fileUrl,
      }));

      toast.success("Profile picture uploaded successfully!");
    } catch (error) {
      console.error("File upload failed:", error);
      toast.error("File upload failed. Please try again.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        ...formData,
        skills: formData.skills.split(",").map((skill) => skill.trim()),
        technologies: formData.technologies.split(",").map((tech) => tech.trim()),
      };

      await axios.post("http://localhost:8000/api/team/team", payload);
      toast.success("Team member added successfully!");

      // Reset form
      setFormData({
        name: "",
        designation: "",
        bio: "",
        profilePicture: "",
        skills: "",
        technologies: "",
        joinedAt: "",
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
      <div className="flex justify-between mb-6">
        <Link to="/dashboard/view-teammembers">
          <button className="p-3 rounded-lg bg-green-600 text-white hover:bg-green-700 font-semibold">
            View Team Members
          </button>
        </Link>
        <button
          className={`p-3 rounded-lg transition-all font-semibold text-lg ${
            isActive ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-600"
          }`}
          onClick={onClick}
        >
          Add Team Member
        </button>
      </div>
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="p-6 bg-gray-50 rounded-lg shadow-md">
          <h2 className="text-xl font-bold text-gray-700 mb-4">Team Member Details</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block mb-2 text-sm font-bold uppercase text-gray-700">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                placeholder="Enter name"
              />
              {errors.name && (
                <p className="text-red-600 text-sm mt-1">{errors.name}</p>
              )}
            </div>
            <div>
              <label className="block mb-2 text-sm font-bold uppercase text-gray-700">
                Designation
              </label>
              <input
                type="text"
                name="designation"
                value={formData.designation}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                placeholder="Enter designation"
              />
              {errors.designation && (
                <p className="text-red-600 text-sm mt-1">{errors.designation}</p>
              )}
            </div>
          </div>
          <div>
            <label className="block mb-2 text-sm font-bold uppercase text-gray-700">
              Bio
            </label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              placeholder="Enter bio"
            ></textarea>
          </div>
        </div>

        <div className="p-6 bg-gray-50 rounded-lg shadow-md">
          <h2 className="text-xl font-bold text-gray-700 mb-4">Profile Picture</h2>
          <input
            type="file"
            onChange={uploadFileHandler}
            className="text-blue-500 text-sm mb-2 hover:underline"
          />
          {formData.profilePicture && (
            <img
              src={formData.profilePicture}
              alt="Profile"
              className="w-40 h-40 object-cover rounded-md mt-2"
            />
          )}
        </div>

        <div className="p-6 bg-gray-50 rounded-lg shadow-md">
          <h2 className="text-xl font-bold text-gray-700 mb-4">Skills & Technologies</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block mb-2 text-sm font-bold uppercase text-gray-700">
                Skills
              </label>
              <input
                type="text"
                name="skills"
                value={formData.skills}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., JavaScript, React, Node.js"
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-bold uppercase text-gray-700">
                Technologies
              </label>
              <input
                type="text"
                name="technologies"
                value={formData.technologies}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., MongoDB, AWS, Docker"
              />
            </div>
          </div>
        </div>

        <div className="p-6 bg-gray-50 rounded-lg shadow-md">
          <label className="block mb-2 text-sm font-bold uppercase text-gray-700">
            Joined At
          </label>
          <input
            type="date"
            name="joinedAt"
            value={formData.joinedAt}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className={`w-full p-3 text-lg font-medium rounded-lg text-white bg-blue-600 ${
            loading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"
          }`}
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit Team Member"}
        </button>
      </form>
    </div>
  );
};

export default Team;
