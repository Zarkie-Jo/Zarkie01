import { useState } from "react";
import { motion } from "framer-motion";
import instance from "../../axiosConfig";

const Users = () => {
  const [eventData, setEventData] = useState({
    title: "",
    description: "",
    startDate: "",
    endDate: "",
    location: "",
  });

  const today = new Date().toISOString().split("T")[0];

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await instance.post("/events/create", eventData);
      alert("تم إضافة فعالية بنجاح");
      setEventData({
        title: "",
        description: "",
        startDate: "",
        endDate: "",
        location: "",
      });
    } catch (error) {
      console.error("Error creating event:", error);
      alert("خطأ في إضافة فعالية");
    }
  };

  return (
    <motion.div
      className="bg-gray-800 bg-opacity-50 backdrop-blur-md rounded-xl p-6 border border-gray-700"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <h2 className="text-xl font-semibold text-gray-100 mb-6" dir="rtl">
        إضافة فعالية جديدة
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4" dir="rtl">
        <div>
          <label className="block text-gray-300 mb-2">عنوان الفعالية</label>
          <input
            type="text"
            placeholder="عنوان الفعالية"
            value={eventData.title}
            onChange={(e) =>
              setEventData({ ...eventData, title: e.target.value })
            }
            className="w-full bg-gray-700 text-gray-100 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            dir="rtl"
            required
          />
        </div>

        <div>
          <label className="block text-gray-300 mb-2">وصف الفعالية</label>
          <textarea
            placeholder="وصف الفعالية"
            value={eventData.description}
            onChange={(e) =>
              setEventData({ ...eventData, description: e.target.value })
            }
            className="w-full bg-gray-700 text-gray-100 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            dir="rtl"
            rows="4"
            required
          />
        </div>

        <div>
          <label className="block text-gray-300 mb-2">موقع الفعالية</label>
          <input
            type="text"
            placeholder="مكان الفعالية"
            value={eventData.location}
            onChange={(e) =>
              setEventData({ ...eventData, location: e.target.value })
            }
            className="w-full bg-gray-700 text-gray-100 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            dir="rtl"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-300 mb-2">تاريخ البداية</label>
            <input
              type="date"
              min={today}
              value={eventData.startDate}
              onChange={(e) =>
                setEventData({ ...eventData, startDate: e.target.value })
              }
              className="w-full bg-gray-700 text-gray-100 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-gray-300 mb-2">تاريخ النهاية</label>
            <input
              type="date"
              min={eventData.startDate || today}
              value={eventData.endDate}
              onChange={(e) =>
                setEventData({ ...eventData, endDate: e.target.value })
              }
              className="w-full bg-gray-700 text-gray-100 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200"
        >
          إضافة فعالية
        </button>
      </form>
    </motion.div>
  );
};

export default Users;
