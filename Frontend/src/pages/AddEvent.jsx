import React, { useState, useEffect } from 'react';
import instance from '../axiosConfig';

const CreateEventForm = () => {
    const [eventData, setEventData] = useState({
        title: '',
        description: '',
        startDate: '',
        endDate: '',
        location: '', 
    });

    const today = new Date().toISOString().split('T')[0];

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await instance.post('/events/create', eventData);
            alert('تم إضافة فعالية بنجاح');
        } catch (error) {
            alert('خطأ في إضافة فعالية');
        }
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
            <h2 className="flex justify-center text-2xl font-bold mb-4 text-blue-600">إضافة فعالية جديدة</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    placeholder="عنوان الفعالية"
                    value={eventData.title}
                    onChange={(e) => setEventData({ ...eventData, title: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-blue-500"
                    dir="rtl"
                    required
                />
                <textarea
                    placeholder="وصف الفعالية"
                    value={eventData.description}
                    onChange={(e) => setEventData({ ...eventData, description: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-blue-500"
                    dir="rtl"
                    required
                />
                <input
                    type="text"
                    placeholder="مكان الفعالية"
                    value={eventData.location}
                    onChange={(e) => setEventData({ ...eventData, location: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-blue-500"
                    dir="rtl"
                    required
                />
                <div className="flex space-x-2">
                    <input
                        type="date"
                        min={today}
                        value={eventData.startDate}
                        onChange={(e) => setEventData({ ...eventData, startDate: e.target.value })}
                        className="w-1/2 px-3 py-2 border rounded-lg focus:outline-blue-500"
                        required
                    />
                    <input
                        type="date"
                        min={eventData.startDate || today}
                        value={eventData.endDate}
                        onChange={(e) => setEventData({ ...eventData, endDate: e.target.value })}
                        className="w-1/2 px-3 py-2 border rounded-lg focus:outline-blue-500"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                >
                    إضافة فعالية
                </button>
            </form>
        </div>
    );
};

export default CreateEventForm;
