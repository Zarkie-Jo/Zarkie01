//////////////

import React, { useState, useEffect } from "react";
import { Mail, Search, Trash2, ChevronLeft, ChevronRight } from "lucide-react";
import axios from "axios";

const رسائلالتواصل = () => {
  const [مصطلحالبحث, تعيينمصطلحالبحث] = useState("");
  const [الرسائل, تعيينالرسائل] = useState([]);
  const [الرسائلالمفلترة, تعيينالرسائلالمفلترة] = useState([]);
  const [فتحنافذةالرد, تعيينفتحنافذةالرد] = useState(false);
  const [الردالرسالة, تعيينالردالرسالة] = useState("");
  const [البريدالإلكترونيالمحدد, تعيينالبريدالإلكترونيالمحدد] = useState("");
  const [الموضوعالمحدد, تعيينالموضوعالمحدد] = useState("");
  const [الصفحةالحالية, تعيينالصفحةالحالية] = useState(1);
  const [الرسائلفيالصفحة] = useState(10);

  useEffect(() => {
    جلبالرسائل();
  }, []);

  const جلبالرسائل = async () => {
    try {
      const الاستجابة = await axios.get(
        "http://localhost:4000/api/contact/contact-messages"
      );
      تعيينالرسائل(الاستجابة.data);
      تعيينالرسائلالمفلترة(الاستجابة.data);
    } catch (خطأ) {
      console.error("خطأ في جلب الرسائل:", خطأ);
    }
  };

  const معالجةالبحث = (e) => {
    const المصطلح = e.target.value.toLowerCase();
    تعيينمصطلحالبحث(المصطلح);
    const مفلترة = الرسائل.filter(
      (رسالة) =>
        رسالة.name.toLowerCase().includes(المصطلح) ||
        رسالة.email.toLowerCase().includes(المصطلح) ||
        رسالة.subject.toLowerCase().includes(المصطلح)
    );
    تعيينالرسائلالمفلترة(مفلترة);
    تعيينالصفحةالحالية(1);
  };

  const معالجةالرد = (البريدالإلكتروني, الموضوع) => {
    تعيينالبريدالإلكترونيالمحدد(البريدالإلكتروني);
    تعيينالموضوعالمحدد(الموضوع);
    تعيينفتحنافذةالرد(true);
  };

  const معالجةإرسالالرد = async () => {
    try {
      await axios.post("http://localhost:4000/api/contact/send-email", {
        email: البريدالإلكترونيالمحدد,
        subject: الموضوعالمحدد,
        message: الردالرسالة,
      });
      alert("تم إرسال الرد بنجاح!");
      تعيينفتحنافذةالرد(false);
      تعيينالردالرسالة("");
    } catch (خطأ) {
      console.error("خطأ في إرسال الرد:", خطأ);
      alert("فشل إرسال الرد. يرجى المحاولة مرة أخرى.");
    }
  };

  const معالجةالحذف = async (المعرف) => {
    try {
      await axios.delete(
        `http://localhost:4000/api/contact/contact-messages/${المعرف}`
      );
      جلبالرسائل();
    } catch (خطأ) {
      console.error("خطأ في حذف الرسالة:", خطأ);
      alert("فشل حذف الرسالة. يرجى المحاولة مرة أخرى.");
    }
  };

  // منطق الصفحات
  const فهرسآخررسالة = الصفحةالحالية * الرسائلفيالصفحة;
  const فهرسأولرسالة = فهرسآخررسالة - الرسائلفيالصفحة;
  const الرسائلالحالية = الرسائلالمفلترة.slice(فهرسأولرسالة, فهرسآخررسالة);
  const إجماليالصفحات = Math.ceil(الرسائلالمفلترة.length / الرسائلفيالصفحة);

  const الصفحات = (رقمالصفحة) => {
    if (رقمالصفحة > 0 && رقمالصفحة <= إجماليالصفحات) {
      تعيينالصفحةالحالية(رقمالصفحة);
    }
  };

  return (
    <div
      className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-4 sm:p-6 border border-gray-700 mb-8"
      dir="rtl"
    >
      {/* قسم الرأس المستجيب */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h2 className="text-xl font-semibold text-gray-100">رسائل التواصل</h2>
        <div className="relative w-full sm:w-auto min-w-[200px] sm:min-w-[300px]">
          <input
            type="text"
            placeholder="البحث في الرسائل..."
            className="w-full bg-gray-700 text-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={معالجةالبحث}
            value={مصطلحالبحث}
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-700">
          <thead>
            <tr>
              <th className="px-4 sm:px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">
                الاسم
              </th>
              <th className="px-4 sm:px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">
                البريد الإلكتروني
              </th>
              <th className="px-4 sm:px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">
                الموضوع
              </th>
              <th className="px-4 sm:px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">
                الرسالة
              </th>
              <th className="px-4 sm:px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">
                الإجراءات
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {الرسائلالحالية.map((رسالة) => (
              <tr key={رسالة._id}>
                <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-100">
                  {رسالة.name}
                </td>
                <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  {رسالة.email}
                </td>
                <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  {رسالة.subject}
                </td>
                <td className="px-4 sm:px-6 py-4 text-sm text-gray-300">
                  {رسالة.message}
                </td>
                <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  <button
                    onClick={() => معالجةالرد(رسالة.email, رسالة.subject)}
                    className="text-blue-400 hover:text-blue-300 ml-2"
                  >
                    <Mail size={18} />
                  </button>
                  <button
                    onClick={() => معالجةالحذف(رسالة._id)}
                    className="text-red-400 hover:text-red-300"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* أدوات الصفحات */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6">
        <div className="text-sm text-gray-400 order-2 sm:order-1">
          عرض {فهرسأولرسالة + 1} إلى{" "}
          {Math.min(فهرسآخررسالة, الرسائلالمفلترة.length)} من{" "}
          {الرسائلالمفلترة.length} رسالة
        </div>
        <div className="flex items-center space-x-2 order-1 sm:order-2">
          <button
            onClick={() => الصفحات(الصفحةالحالية - 1)}
            disabled={الصفحةالحالية === 1}
            className={`p-2 rounded-md ${
              الصفحةالحالية === 1
                ? "text-gray-500 cursor-not-allowed"
                : "text-gray-300 hover:bg-gray-700"
            }`}
          >
            <ChevronLeft size={20} />
          </button>
          <span className="text-gray-300 min-w-[100px] text-center">
            صفحة {الصفحةالحالية} من {إجماليالصفحات}
          </span>
          <button
            onClick={() => الصفحات(الصفحةالحالية + 1)}
            disabled={الصفحةالحالية === إجماليالصفحات}
            className={`p-2 rounded-md ${
              الصفحةالحالية === إجماليالصفحات
                ? "text-gray-500 cursor-not-allowed"
                : "text-gray-300 hover:bg-gray-700"
            }`}
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      {/* نافذة الرد */}
      {فتحنافذةالرد && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-gray-800 p-6 rounded-lg w-full max-w-md">
            <h2 className="text-xl font-semibold text-gray-100 mb-4">
              الرد على الرسالة
            </h2>
            <textarea
              className="w-full bg-gray-700 text-white rounded-lg p-2 mb-4"
              placeholder="اكتب ردك هنا..."
              value={الردالرسالة}
              onChange={(e) => تعيينالردالرسالة(e.target.value)}
              rows={5}
            />
            <div className="flex justify-end space-x-2">
              <button
                className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-500"
                onClick={() => تعيينفتحنافذةالرد(false)}
              >
                إلغاء
              </button>
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500"
                onClick={معالجةإرسالالرد}
              >
                إرسال الرد
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default رسائلالتواصل;
