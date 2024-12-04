import React, { useState, useEffect } from 'react';
import instance from '../axiosConfig';
import { Calendar, MapPin, X } from 'lucide-react';

const AvailableEvents = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const [joinData, setJoinData] = useState({
    fullName: '',
    email: '',
    description: '',
    reason: '',
    commitment: false,
  });

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const availableResponse = await instance.get('/events/available');
        const upcomingResponse = await instance.get('/events/upcoming');
        
        setEvents([...availableResponse.data, ...upcomingResponse.data]);
      } catch (error) {
        console.error('تفاصيل الخطأ:', error.response || error.message);
        alert('خطأ في جلب الفعاليات: ' + (error.response?.data?.message || error.message));
      }
    };
    fetchEvents();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setJoinData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRadioChange = (e) => {
    setJoinData((prev) => ({ ...prev, commitment: e.target.value === 'true' }));
  };

  const handleJoinRequest = async (e) => {
    e.preventDefault();
    try {
      await instance.post('/events/join', {
        ...joinData,
        event: selectedEvent._id,
      });
      alert('تم إرسال طلب الانضمام');
      setSelectedEvent(null);
      setJoinData({ fullName: '', email: '', description: '', reason: '', commitment: false });
    } catch (error) {
      alert('خطأ في إرسال الطلب');
    }
  };

  const currentDate = new Date();
  const upcomingEvents = events.filter(event => new Date(event.startDate) > currentDate);
  const availableEvents = events.filter(event => new Date(event.startDate) <= currentDate && new Date(event.endDate) >= currentDate);

  const EventCard = ({ event, onClick, available }) => (
    <div 
      className={`
        transform transition-all duration-300 
        bg-white rounded-2xl shadow-lg 
        hover:shadow-2xl hover:-translate-y-2 
        ${available 
          ? 'border-4 border-black hover:border-blue-600 cursor-pointer' 
          : 'border-4 border-gray-200 hover:border-gray-300 cursor-not-allowed opacity-80'}
        overflow-hidden
      `}
      onClick={() => available && onClick && onClick(event)}
    >
      <div className="p-6">
        <h2 className={`
          text-xl font-bold mb-4 
          ${available ? 'text-blue-700' : 'text-gray-500'}
        `} dir='rtl'>{event.title}</h2>
        <p className={`
          text-gray-600 mb-4 line-clamp-3 
          ${!available ? 'text-opacity-70' : ''}
        `} dir='rtl'>{event.description}</p>
        <div className="flex flex-col space-y-2">
          <div className="flex items-center text-gray-500 space-x-2" dir='rtl'>
            <Calendar size={20} className={available ? 'text-blue-500 ml-[1rem]' : 'text-gray-400 ml-[1rem]'} />
            <span>من {new Date(event.startDate).toLocaleDateString()} إلى {new Date(event.endDate).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center text-gray-500 space-x-2" dir='rtl'>
            <MapPin size={20} className={available ? 'text-blue-500 ml-[1rem]' : 'text-gray-400 ml-[1rem]'} />
            <span>{event.location || 'موقع غير محدد'}</span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="px-4 py-8 bg-gray-50 min-h-screen w-screen" dir='rtl'>
      <div className="max-w-6xl mx-auto">        
        {availableEvents.length > 0 && (
          <div>
            <h2 className="text-3xl font-bold text-blue-700 mb-6 text-center">الفعاليات المتاحة حاليًا</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {availableEvents.map((event) => (
                <EventCard 
                  key={event._id} 
                  event={event} 
                  onClick={setSelectedEvent}
                  available={true}
                />
              ))}
            </div>
          </div>
        )}

        <h2 className="text-3xl font-bold text-blue-700 mt-12 mb-6 text-center">الفعاليات القادمة</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {upcomingEvents.map((event) => (
            <EventCard 
              key={event._id} 
              event={event} 
              available={false}
            />
          ))}
        </div>

        {selectedEvent && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
            <div className="bg-white rounded-2xl w-full max-w-4xl mx-4 my-8 relative overflow-hidden">
              <button 
                onClick={() => setSelectedEvent(null)} 
                className="absolute top-4 left-4 z-10 bg-gray-100 hover:bg-gray-200 rounded-full p-2"
              >
                <X size={24} className="text-gray-600" />
              </button>
              
              <div className="grid md:grid-cols-1 gap-6 p-8 max-h-[90vh] overflow-y-auto">
                <div>
                  <h2 className="text-2xl font-bold text-blue-600 mb-6" dir='rtl'>طلب الانضمام</h2>
                  <form onSubmit={handleJoinRequest} className="space-y-4">
                    <div>
                      <label className="block text-gray-700 mb-2" dir='rtl'>الاسم الكامل</label>
                      <input
                        type="text"
                        name="fullName"
                        value={joinData.fullName}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 transition" dir='rtl'
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-2" dir='rtl'>البريد الإلكتروني</label>
                      <input
                        type="email"
                        name="email"
                        value={joinData.email}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 transition" dir='rtl'
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-2" dir='rtl'>تحدث عن نفسك</label>
                      <textarea
                        name="description"
                        value={joinData.description}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 transition h-24" dir='rtl'
                        required
                      ></textarea>
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-2" dir='rtl'>لماذا تريد الانضمام لهذه الفعالية؟</label>
                      <textarea
                        name="reason"
                        value={joinData.reason}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 transition h-24" dir='rtl'
                        required
                      ></textarea>
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-2" dir='rtl'>هل أنت قادر على الالتزام؟</label>
                      <div className="flex items-center space-x-4 " dir='rtl'>
                        <label className="flex items-center ml-[1rem]">
                          <input
                            type="radio"
                            name="commitment"
                            value="true"
                            checked={joinData.commitment === true}
                            onChange={handleRadioChange}
                            className="ml-2 focus:ring-blue-500" dir='rtl'
                          />
                          نعم
                        </label>
                        <label className="flex items-center" dir='rtl'>
                          <input
                            type="radio"
                            name="commitment"
                            value="false"
                            checked={joinData.commitment === false}
                            onChange={handleRadioChange}
                            className="ml-2 focus:ring-blue-500" dir='rtl'
                          />
                          لا
                        </label>
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-300 transform hover:scale-105"
                    >
                      إرسال طلب الانضمام
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AvailableEvents;