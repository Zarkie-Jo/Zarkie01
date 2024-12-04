import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import Header from "../components/common/Header";

const API_BASE_URL = "http://localhost:4000/api";

const DebateCard = ({ debate }) => {
  const videoRef = useRef(null);

  const handleVideoError = (e) => {
    console.error("Video error:", e);
  };

  return (
    <motion.div
      className="bg-gray-800 rounded-lg shadow-md overflow-hidden"
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
        <h3 className="text-lg font-semibold text-gray-100 mb-2">
          {debate.title}
        </h3>
        <p className="text-sm text-gray-300 mb-2">
          Category: {debate.category}
        </p>
        <p className="text-sm text-gray-300 mb-4">{debate.description}</p>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-400">
            {new Date(debate.created_at).toLocaleDateString()}
          </span>
          <span
            className={`px-2 py-1 rounded-full text-xs ${
              debate.isApproved
                ? "bg-green-500/20 text-green-400"
                : "bg-red-500/20 text-red-400"
            }`}
          >
            {debate.isApproved ? "Approved" : "Not Approved"}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

const AllDebatesPage = () => {
  const [debates, setDebates] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchDebates = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/products`);
      if (!response.ok) throw new Error("Failed to fetch debates");
      const data = await response.json();
      setDebates(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDebates();
  }, []);

  const filteredDebates = debates.filter(
    (debate) =>
      debate.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      debate.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading)
    return <div className="text-center text-gray-300">Loading...</div>;
  if (error) return <div className="text-center text-red-400">{error}</div>;

  return (
    <div className="flex-1 overflow-auto relative z-10">
      <Header title="All Debates" />

      <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
        <div className="bg-gray-800 bg-opacity-50 backdrop-blur-md rounded-xl p-6 border border-gray-700">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-100">All Debates</h2>
            <div className="relative">
              <input
                type="text"
                placeholder="Search debates..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-gray-700 text-gray-100 px-4 py-2 pl-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Search
                className="absolute left-3 top-2.5 text-gray-400"
                size={18}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDebates.map((debate) => (
              <DebateCard key={debate._id} debate={debate} />
            ))}
          </div>

          {filteredDebates.length === 0 && (
            <div className="text-center text-gray-400 py-10">
              No debates found
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AllDebatesPage;
