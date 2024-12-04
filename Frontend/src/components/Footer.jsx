// import React from "react";
// import { Link } from "react-router-dom";

// const Footer = () => {
//   return (
//     <footer className="bg-gray-800 text-white">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
//           {/* Company Info */}
//           <div>
//             <h3 className="text-xl font-bold mb-4">Zarkie</h3>
//             <p className="text-gray-300">
//               Your trusted partner for electric vehicle services and solutions.
//             </p>
//           </div>

//           {/* Quick Links */}
//           <div>
//             <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
//             <ul className="space-y-2">
//               <li>
//                 <Link to="/" className="text-gray-300 hover:text-white">
//                   Home
//                 </Link>
//               </li>
//               <li>
//                 <Link to="/services" className="text-gray-300 hover:text-white">
//                   Services
//                 </Link>
//               </li>
//               <li>
//                 <Link to="/about" className="text-gray-300 hover:text-white">
//                   About Us
//                 </Link>
//               </li>
//             </ul>
//           </div>

//           {/* Services */}
//           <div>
//             <h3 className="text-lg font-semibold mb-4">Services</h3>
//             <ul className="space-y-2">
//               <li className="text-gray-300">Zarkie</li>
//               <li className="text-gray-300">Maintenance</li>
//               <li className="text-gray-300">Repairs</li>
//               <li className="text-gray-300">Consultancy</li>
//             </ul>
//           </div>

//           {/* Contact Info */}
//           <div>
//             <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
//             <ul className="space-y-2">
//               <li className="text-gray-300">Email: info@Zarkie.com</li>
//               <li className="text-gray-300">Phone: (123) 456-7890</li>
//               <li className="text-gray-300">Address: 123 EV Street, City</li>
//             </ul>
//           </div>
//         </div>

//         <div className="border-t border-gray-700 mt-8 pt-8 text-center">
//           <p className="text-gray-300">
//             © {new Date().getFullYear()} Zarkie. All rights reserved.
//           </p>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;

/////////////

import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12" dir="rtl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">زاركي</h3>
            <p className="text-gray-300">
              شريكك الموثوق به لخدمات وحلول المركبات الكهربائية.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">روابط سريعة</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white">
                  الرئيسية
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-300 hover:text-white">
                  الخدمات
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-white">
                  معلومات عنا
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">الخدمات</h3>
            <ul className="space-y-2">
              <li className="text-gray-300">زاركي</li>
              <li className="text-gray-300">الصيانة</li>
              <li className="text-gray-300">الإصلاحات</li>
              <li className="text-gray-300">الاستشارات</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">اتصل بنا</h3>
            <ul className="space-y-2">
              <li className="text-gray-300">
                البريد الإلكتروني: info@Zarkie.com
              </li>
              <li className="text-gray-300">الهاتف: (123) 456-7890</li>
              <li className="text-gray-300">
                العنوان: 123 شارع المركبات الكهربائية، المدينة
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-300">
            © {new Date().getFullYear()} زاركي. جميع الحقوق محفوظة.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
