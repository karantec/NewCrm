import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ViewTestimonial = () => {
  const [projectData, setProjectData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [projectsPerPage] = useState(9);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const API_URL = "https://admindashboardbackend-opa8.onrender.com/api/interior";

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error("Failed to fetch projects");
      const data = await response.json();
      console.log("Fetched data:", data);

      // Log projects missing the `Category` field
      data.data?.forEach((project, index) => {
        if (!project.Category) {
          console.warn(`Project at index ${index} is missing 'Category':`, project);
        }
      });

      setProjectData(Array.isArray(data.data) ? data.data : []);
    } catch (err) {
      console.error("Error fetching projects:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

 


  const filteredProjects = projectData.filter((project) =>
    project.Category?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalProjects = filteredProjects.length;
  const totalPages = Math.ceil(totalProjects / projectsPerPage);
  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = filteredProjects.slice(indexOfFirstProject, indexOfLastProject);



  const renderLoading = () => (
    <div className="flex justify-center items-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
    </div>
  );

  const renderError = () => (
    <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded">
      Error: {error}
    </div>
  );

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">Renderverse  PortFolio</h2>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by Category"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 border rounded-md"
        />
      </div>

      {loading && renderLoading()}
      {error && renderError()}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {currentProjects.map((project) => (
          <ProjectCard
            key={project._id}
            project={project}
            
          />
        ))}
      </div>

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
        />
      )}
    </div>
  );
};

const ProjectCard = ({ project, handleShowMore }) => (
  <div className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow flex flex-col justify-between h-full">
    <div className="p-6 flex-grow">
      <h3 className="text-lg font-bold mb-4 text-center">Title: {project.title || "Unknown"}</h3>
      <div className="space-y-2 text-gray-600 text-center">
        <p>
          <span className="font-medium">Product:</span>{" "}
          {project.productName || "Unknown"}
        </p>
        <p>
          <span className="font-medium">Category:</span>{" "}
          {project.Category || "Unknown"}
        </p>
        <p>
          <span className="font-medium">Product Deployed Link:</span>{" "}
          <button
            onClick={() => window.open(project.ProductDeployedLink, "_blank")}
            className="text-blue-500 underline hover:text-blue-700"
          >
            {project.ProductDeployedLink || "Unknown"}
          </button>
        </p>
      </div>
    </div>
   
  </div>
);

const Pagination = ({ currentPage, setCurrentPage, totalPages }) => (
  <div className="flex justify-between items-center mt-6">
    <button
      onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
      className={`px-4 py-2 bg-blue-500 text-white rounded ${
        currentPage === 1 && "opacity-50 cursor-not-allowed"
      }`}
      disabled={currentPage === 1}
    >
      Previous
    </button>
    <span>{`Page ${currentPage} of ${totalPages}`}</span>
    <button
      onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
      className={`px-4 py-2 bg-blue-500 text-white rounded ${
        currentPage === totalPages && "opacity-50 cursor-not-allowed"
      }`}
      disabled={currentPage === totalPages}
    >
      Next
    </button>
  </div>
);

export default ViewTestimonial;
