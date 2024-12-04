import React, { useState } from 'react';
import instance from '../axiosConfig'

const AddMemberForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    description: '',
    image: null
  });
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData(prev => ({
      ...prev,
      image: file
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
      setError('الرجاء إدخال الاسم الكامل');
      setLoading(false);
      return;
    }

    if (!formData.description.trim()) {
      setError('الرجاء إدخال الوصف');
      setLoading(false);
      return;
    }

    if (!formData.image) {
      setError('الرجاء اختيار صورة');
      setLoading(false);
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append('fullName', formData.fullName);
    formDataToSend.append('description', formData.description);
    formDataToSend.append('image', formData.image);

    try {
      const response = await instance.post('/members', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      setSuccess('تمت إضافة العضو بنجاح');

      setFormData({
        fullName: '',
        description: '',
        image: null
      });
      setPreview(null);
    } catch (err) {
      setError('حدث خطأ أثناء إضافة العضو. يرجى المحاولة مرة أخرى.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8 rtl">
      <div className="max-w-md mx-auto bg-white shadow-lg rounded-xl p-8">
        <h2 className="text-center text-3xl font-extrabold text-blue-800 mb-8">
          إضافة عضو جديد
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">

          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700" dir='rtl'>
              الاسم الكامل
            </label>
            <input
              type="text"
              name="fullName"
              id="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 transition duration-300" dir='rtl'
            />
          </div>


          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700" dir='rtl'>
              الوصف
            </label>
            <textarea
              name="description"
              id="description"
              rows="4"
              value={formData.description}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 transition duration-300" dir='rtl'
            ></textarea>
          </div>

          <div>
            <label htmlFor="image" className="block text-sm font-medium text-gray-700" dir='rtl'>
              الصورة
            </label>
            <input
              type="file"
              name="image"
              id="image"
              accept="image/*"
              onChange={handleImageChange}
              className="mt-1 block w-full text-sm text-gray-500
                file:ml-4 file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-blue-50 file:text-blue-700
                hover:file:bg-blue-100" dir='rtl'
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
            <div className="bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
              {error}
            </div>
          )}


          {success && (
            <div className="bg-green-50 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
              {success}
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-300"
            >
              {loading ? (
                <div className="flex items-center">
                  <svg className="animate-spin h-5 w-5 ml-2" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  جاري الإرسال...
                </div>
              ) : (
                'إضافة العضو'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddMemberForm;