import React, { useState, useEffect } from 'react';
import instance from '../axiosConfig';

const MembersCards = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await instance.get('/members');
        setMembers(response.data);
        setLoading(false);
      } catch (error) {
        console.error('حدث خطأ أثناء جلب الأعضاء', error);
        setLoading(false);
      }
    };

    fetchMembers();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
      </div>
    );
  }

  console.log(members);
  return (
    <div className="bg-gray-100 min-h-screen p-8 rtl" dir='rtl'>
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-center text-blue-800 mb-10">
أعضاء فريق زاركي        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {members.map((member) => (
                
                <div 
                key={member._id} 
                className="bg-white shadow-lg rounded-2xl overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                >
              <div className="relative h-64 ">
                <img 
                 src={`http://localhost:5000${member.image}`} 
                 alt={member.fullName} 
                 className="w-full h-full object-cover"
                 />
                <div className="absolute bottom-0 left-0 right-0 bg-blue-800 bg-opacity-75 text-white p-4">
                  <h2 className="text-xl font-bold " dir="rtl">{member.fullName}</h2>
                </div>
              </div>
              <div className="p-6">
                <p className="text-gray-700 text-base leading-relaxed" dir="rtl">
                  {member.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MembersCards;