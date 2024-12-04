import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import instance from "../../axiosConfig";
import { Check, X } from "lucide-react";

const JoinRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const response = await instance.get("/join-requests");
      setRequests(response.data);
    } catch (error) {
      setError("Error fetching requests");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  const handleStatusUpdate = async (id, isAccept) => {
    try {
      await instance.put(
        `http://localhost:4000/api/join-requests/${id}/status`,
        {
          isAccept,
        }
      );
      // Update local state
      setRequests(
        requests.map((request) =>
          request._id === id ? { ...request, isAccept } : request
        )
      );
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Error updating status");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 text-center p-4">{error}</div>;
  }

  return (
    <motion.div
      className="bg-gray-800 bg-opacity-50 backdrop-blur-md rounded-xl p-6 border border-gray-700"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <h2 className="text-xl font-semibold text-gray-100 mb-6" dir="rtl">
        طلبات الانضمام للفعاليات
      </h2>

      <div className="overflow-x-auto">
        <table className="w-full text-gray-300">
          <thead>
            <tr className="text-right border-b border-gray-700">
              <th className="py-3 px-4">الاسم</th>
              <th className="py-3 px-4">البريد الإلكتروني</th>
              <th className="py-3 px-4">الفعالية</th>
              <th className="py-3 px-4">الوصف</th>
              <th className="py-3 px-4">السبب</th>
              <th className="py-3 px-4">الالتزام</th>
              <th className="py-3 px-4">الحالة</th>
              <th className="py-3 px-4">الإجراءات</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((request) => (
              <motion.tr
                key={request._id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="border-b border-gray-700 hover:bg-gray-700/50"
              >
                <td className="py-3 px-4" dir="rtl">
                  {request.fullName}
                </td>
                <td className="py-3 px-4">{request.email}</td>
                <td className="py-3 px-4" dir="rtl">
                  {request.event?.title}
                </td>
                <td className="py-3 px-4" dir="rtl">
                  {request.description}
                </td>
                <td className="py-3 px-4" dir="rtl">
                  {request.reason}
                </td>
                <td className="py-3 px-4" dir="rtl">
                  {request.commitment ? "ملتزم" : "غير ملتزم"}
                </td>
                <td className="py-3 px-4" dir="rtl">
                  <span
                    className={`px-2 py-1 rounded-full text-sm ${
                      request.isAccept
                        ? "bg-green-900 text-green-100"
                        : "bg-red-900 text-red-100"
                    }`}
                  >
                    {request.isAccept ? "مقبول" : "معلق"}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <div className="flex gap-2 justify-end">
                    {!request.isAccept && (
                      <button
                        onClick={() => handleStatusUpdate(request._id, true)}
                        className="p-2 bg-green-600 rounded-lg hover:bg-green-700 transition-colors"
                        title="قبول"
                      >
                        <Check size={16} />
                      </button>
                    )}
                    {request.isAccept && (
                      <button
                        onClick={() => handleStatusUpdate(request._id, false)}
                        className="p-2 bg-red-600 rounded-lg hover:bg-red-700 transition-colors"
                        title="رفض"
                      >
                        <X size={16} />
                      </button>
                    )}
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default JoinRequests;
