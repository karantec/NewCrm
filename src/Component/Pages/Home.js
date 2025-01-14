import React, { useState, useEffect } from "react";

const Home = () => {
  // State to store the count of blogs and news
  const [blogs, setBlogs] = useState([]);
  const [news, setNews] = useState([]);

  // Fetch data from the API and update state
  useEffect(() => {
    // Fetch blog data
    fetch("https://bbc-newsbackend.onrender.com/api/blog")
      .then((response) => response.json())
      .then((data) => {
        // Assuming 'data' is an object with a 'data' field that holds the blog array
        setBlogs(data.data); // Store blog data
      })
      .catch((error) => console.error("Error fetching blogs:", error));

    // Fetch news data
    fetch("https://bbc-newsbackend.onrender.com/api/news/News")
      .then((response) => response.json())
      .then((data) => {
        // Assuming 'data' is an object with a 'data' field that holds the news array
        setNews(data.data); // Store news data
      })
      .catch((error) => console.error("Error fetching news:", error));
  }, []); // Empty dependency array to run only once when the component mounts

  // Helper function to count posts by tags
  const countByTags = (data) => {
    return data.reduce((counts, item) => {
      item.tags.forEach((tag) => {
        if (counts[tag]) {
          counts[tag] += 1;
        } else {
          counts[tag] = 1;
        }
      });
      return counts;
    }, {});
  };

  // Group blogs and news by tags
  const blogCounts = countByTags(blogs);
  const newsCounts = countByTags(news);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Home Component</h1>
      <p>Welcome to the dashboard home!</p>

      {/* Blog Counts */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-2">Blog Post </h2>
        <div className="grid grid-cols-2 gap-4">
          {Object.entries(blogCounts).map(([tag, count]) => (
            <div key={tag} className="bg-blue-600 text-white p-6 rounded-lg shadow-lg">
              <h3 className="text-lg font-semibold">{tag}</h3>
              <p className="text-2xl">{count}</p>
            </div>
          ))}
        </div>
      </div>

      {/* News Counts */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-2">News Post</h2>
        <div className="grid grid-cols-2 gap-4">
          {Object.entries(newsCounts).map(([tag, count]) => (
            <div key={tag} className="bg-green-600 text-white p-6 rounded-lg shadow-lg">
              <h3 className="text-lg font-semibold">{tag}</h3>
              <p className="text-2xl">{count}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Blog Data List */}
      

      {/* News Data List */}
      
    </div>
  );
};

export default Home;
