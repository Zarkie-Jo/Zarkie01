import React, { useState } from "react";
import { motion } from "framer-motion";
import instance from "../../axiosConfig";

const ShopOwner = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    description: "",
    image: null,
  });
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData((prev) => ({
      ...prev,
      image: file,
    }));

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    if (!formData.fullName.trim()) {
      setError("الرجاء إدخال الاسم الكامل");
      setLoading(false);
      return;
    }

    if (!formData.description.trim()) {
      setError("الرجاء إدخال الوصف");
      setLoading(false);
      return;
    }

    if (!formData.image) {
      setError("الرجاء اختيار صورة");
      setLoading(false);
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append("fullName", formData.fullName);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("image", formData.image);

    try {
      const response = await instance.post("/members", formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setSuccess("تمت إضافة العضو بنجاح");
      setFormData({
        fullName: "",
        description: "",
        image: null,
      });
      setPreview(null);
    } catch (err) {
      setError("حدث خطأ أثناء إضافة العضو. يرجى المحاولة مرة أخرى.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="bg-gray-800 bg-opacity-50 backdrop-blur-md rounded-xl p-6 border border-gray-700"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="max-w-md mx-auto">
        <h2 className="text-xl font-semibold text-gray-100 mb-6" dir="rtl">
          إضافة عضو جديد
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="fullName"
              className="block text-gray-300 mb-2"
              dir="rtl"
            >
              الاسم الكامل
            </label>
            <input
              type="text"
              name="fullName"
              id="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              className="w-full bg-gray-700 text-gray-100 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              dir="rtl"
            />
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-gray-300 mb-2"
              dir="rtl"
            >
              الوصف
            </label>
            <textarea
              name="description"
              id="description"
              rows="4"
              value={formData.description}
              onChange={handleInputChange}
              className="w-full bg-gray-700 text-gray-100 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              dir="rtl"
            ></textarea>
          </div>

          <div>
            <label
              htmlFor="image"
              className="block text-gray-300 mb-2"
              dir="rtl"
            >
              الصورة
            </label>
            <input
              type="file"
              name="image"
              id="image"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:bg-blue-600 file:text-white hover:file:bg-blue-700"
              dir="rtl"
            />

            {preview && (
              <div className="mt-4 flex justify-center">
                <img
                  src={preview}
                  alt="معاينة الصورة"
                  className="h-32 w-32 object-cover rounded-full shadow-md"
                />
              </div>
            )}
          </div>

          {error && (
            <div
              className="bg-red-900 bg-opacity-50 border border-red-700 text-red-100 px-4 py-3 rounded relative"
              role="alert"
            >
              {error}
            </div>
          )}

          {success && (
            <div
              className="bg-green-900 bg-opacity-50 border border-green-700 text-green-100 px-4 py-3 rounded relative"
              role="alert"
            >
              {success}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200 disabled:opacity-50"
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                جاري الإرسال...
              </div>
            ) : (
              "إضافة العضو"
            )}
          </button>
        </form>
      </div>
    </motion.div>
  );
};

export default ShopOwner;
