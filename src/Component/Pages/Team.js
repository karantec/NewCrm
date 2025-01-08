import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const TeamMemberForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    designation: "",
    bio: "",
    profilePicture: "",
    socialLinks: {
      linkedin: "",
      portfolio: "",
      otherLinks: [""],
    },
    skills: [""],
    technologies: [""],
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
      await axios.post("https://your-backend-api-url/api/team", formData);
      toast.success("Team member added successfully!");

      setFormData({
        name: "",
        designation: "",
        bio: "",
        profilePicture: "",
        socialLinks: {
          linkedin: "",
          portfolio: "",
          otherLinks: [""],
        },
        skills: [""],
        technologies: [""],
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
      <h1 className="text-2xl font-bold mb-6">Add Team Member</h1>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block mb-2 font-semibold">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block mb-2 font-semibold">Designation</label>
          <input
            type="text"
            name="designation"
            value={formData.designation}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="md:col-span-2">
          <label className="block mb-2 font-semibold">Bio</label>
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          ></textarea>
        </div>
        <div>
          <label className="block mb-2 font-semibold">Profile Picture URL</label>
          <input
            type="text"
            name="profilePicture"
            value={formData.profilePicture}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="md:col-span-2">
          <label className="block mb-2 font-semibold">Social Links</label>
          <div>
            <label className="block mb-2">LinkedIn</label>
            <input
              type="text"
              name="socialLinks.linkedin"
              value={formData.socialLinks.linkedin}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block mb-2">Portfolio</label>
            <input
              type="text"
              name="socialLinks.portfolio"
              value={formData.socialLinks.portfolio}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block mb-2">Other Links</label>
            {formData.socialLinks.otherLinks.map((item, index) => (
              <div key={index} className="flex items-center space-x-2 mb-2">
                <input
                  type="text"
                  value={item}
                  onChange={(e) => handleArrayChange(e, index, "socialLinks.otherLinks")}
                  className="w-full p-2 border rounded"
                />
                <button
                  type="button"
                  onClick={() => removeArrayItem(index, "socialLinks.otherLinks")}
                  className="text-red-500"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => addArrayItem("socialLinks.otherLinks")}
              className="text-blue-500"
            >
              Add Other Link
            </button>
          </div>
        </div>
        <div className="md:col-span-2">
          <label className="block mb-2 font-semibold">Skills</label>
          {formData.skills.map((item, index) => (
            <div key={index} className="flex items-center space-x-2 mb-2">
              <input
                type="text"
                value={item}
                onChange={(e) => handleArrayChange(e, index, "skills")}
                className="w-full p-2 border rounded"
              />
              <button
                type="button"
                onClick={() => removeArrayItem(index, "skills")}
                className="text-red-500"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => addArrayItem("skills")}
            className="text-blue-500"
          >
            Add Skill
          </button>
        </div>
        <div className="md:col-span-2">
          <label className="block mb-2 font-semibold">Technologies</label>
          {formData.technologies.map((item, index) => (
            <div key={index} className="flex items-center space-x-2 mb-2">
              <input
                type="text"
                value={item}
                onChange={(e) => handleArrayChange(e, index, "technologies")}
                className="w-full p-2 border rounded"
              />
              <button
                type="button"
                onClick={() => removeArrayItem(index, "technologies")}
                className="text-red-500"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => addArrayItem("technologies")}
            className="text-blue-500"
          >
            Add Technology
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
            {loading ? "Submitting..." : "Submit Team Member"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TeamMemberForm;
