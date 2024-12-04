import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const DebateCard = ({ debate }) => {
  const videoRef = useRef(null);

  const handleVideoError = (e) => {
    console.error("Video error:", e);
  };

  return (
    <motion.div
      className="bg-white rounded-lg shadow-md overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="relative h-48">
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          controls
          onError={handleVideoError}
          preload="metadata"
        >
          <source
            src={`http://localhost:4000${debate.video_path}`}
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
      </div>
      <div className="p-4">
        <h3 className="text-xl font-bold mb-2 text-gray-900">{debate.title}</h3>
        <p className="text-gray-600 mb-4">
          {debate.description.slice(0, 100)}...
        </p>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
            {debate.category}
          </span>
          <span className="text-sm text-gray-500">
            {new Date(debate.created_at).toLocaleDateString()}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

const DebateList = () => {
  const [debates, setDebates] = useState([]);
  const [filters, setFilters] = useState({
    category: "",
    search: "",
    page: 1,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchDebates = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`http://localhost:5000/api/debates`, {
        params: filters,
      });
      setDebates(response.data.debates);
      setError("");
    } catch (error) {
      console.error("Error fetching debates:", error);
      setError("Failed to load debates");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDebates();
  }, [filters]);

  const handleCategoryFilter = (category) => {
    setFilters((prev) => ({ ...prev, category, page: 1 }));
  };

  if (isLoading) return <div className="text-center py-10">Loading...</div>;
  if (error)
    return <div className="text-center text-red-500 py-10">{error}</div>;

  return (
    <div className="container mx-auto p-4 rtl">
      {/* Category Filters */}
      <div className="flex justify-between mb-6 flex-wrap gap-4">
        <div className="flex space-x-2 flex-wrap">
          {["", "ثقافي", "اجتماعي", "سياسي"].map((category) => (
            <button
              key={category}
              className={`
                px-4 py-2 rounded-md transition-colors duration-200
                ${
                  filters.category === category
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                }
              `}
              onClick={() => handleCategoryFilter(category)}
            >
              {category || "الكل"}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative">
          <input
            type="text"
            placeholder="البحث في المناظرات"
            className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
            value={filters.search}
            onChange={(e) =>
              setFilters((prev) => ({
                ...prev,
                search: e.target.value,
                page: 1,
              }))
            }
          />
        </div>
      </div>

      {/* Debates Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {debates.map((debate) => (
          <DebateCard key={debate._id} debate={debate} />
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-8 space-x-2">
        {[1, 2, 3, 4, 5].map((page) => (
          <button
            key={page}
            className={`
              px-4 py-2 rounded-md transition-colors duration-200
              ${
                filters.page === page
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-800 hover:bg-gray-300"
              }
            `}
            onClick={() => setFilters((prev) => ({ ...prev, page }))}
          >
            {page}
          </button>
        ))}
      </div>

      {debates.length === 0 && (
        <div className="text-center text-gray-500 py-10">
          لا توجد مناظرات متاحة
        </div>
      )}
    </div>
  );
};

export default DebateList;
