// ZarqiDebateClubHomepage.jsx
import React, { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  Users,
  TrophyIcon,
  Globe,
  Target,
} from "lucide-react";
import pic1 from "../assets/zerpic.png";
import pic2 from "../assets/zerpic2.png";
import pic3 from "../assets/zerpic3.png";
import pic4 from "../assets/zerpic4.png";
import heroImage from "../assets/ZerHero.jpg";

// Import partner images
import partner1 from "../assets/orangelogo.png";
import partner2 from "../assets/walyahdlogo.png";
import partner3 from "../assets/nayalogo.jpg";
import { Link } from "react-router-dom";
// Import additional partner images here

const ZarqiDebateClubHomepage = () => {
  // State to manage which sections are expanded
  const [expandedSections, setExpandedSections] = useState({
    "من نحن": false,
    "لماذا نحن بحاجة الى نادي مناظرات": false,
    "المبادئ العامة": false,
    أهدافنا: false,
  });

  // State to manage which FAQ items are expanded
  const [faqExpanded, setFaqExpanded] = useState({});

  // Function to toggle the expanded state of a section
  const toggleSection = (sectionTitle) => {
    setExpandedSections((prev) => ({
      ...prev,
      [sectionTitle]: !prev[sectionTitle],
    }));
  };

  // Function to toggle the expanded state of an FAQ item
  const toggleFaq = (index) => {
    setFaqExpanded((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  // Data for the sections
  const sections = [
    {
      title: "من نحن",
      content:
        "انطلاقًا من دور تمكين الشباب من المشاركة في الحياة المجتمعية وإيصال صوت الشباب إلى صناع القرار وترسيخ ثقافة الحوار وتقبل الرأي والرأي الآخر",
      icon: <Users className="w-12 h-12 text-blue-600" />,
      image: pic1,
      detailedContent: (
        <>
          <p className="text-gray-700 leading-relaxed text-lg">
            إيمانًا بأهمية تمكين الشباب من المشاركة الفاعلة في الحياة المجتمعية،
            وإيصال أصواتهم إلى صناع القرار، يسعى النادي إلى ترسيخ ثقافة الحوار
            وتقبل الآراء المختلفة، والمساهمة في إثراء النقاشات العلمية والسياسية
            والمجتمعية، لا سيما بين الشباب عمومًا وشباب الزرقاء خصوصًا.
          </p>
          <p className="text-gray-700 leading-relaxed text-lg">
            يعتمد النادي على فن المناظرة كأداة رئيسية لتعزيز هذه الثقافة، من
            خلال تدريب الشباب واليافعين على أسس المناظرة ومبادئها، مما يساعدهم
            على التعبير عن أفكارهم بطرق منظمة ومبنية على المعرفة والبحث العلمي.
            كما يهدف إلى صقل مهاراتهم في التواصل، وتعزيز التفكير النقدي،
            وتمكينهم من التحدث بثقة أمام الجمهور، بما يفتح آفاقًا جديدة أمامهم
            لتقديم أفكار مبتكرة تخدم مجتمعهم.
          </p>
        </>
      ),
    },
    {
      title: "لماذا نحن بحاجة الى نادي مناظرات",
      content:
        "دائمًا ما كنا حريصين على بناء صرح متكامل يحمل داخله شتّى أنواع المعرفة وكافة مهارات التناظر",
      icon: <Globe className="w-12 h-12 text-blue-600" />,
      image: pic2,
      detailedContent: (
        <>
          <p className="text-gray-700 leading-relaxed text-lg">
            تأسيس نادي المناظرات يأتي في إطار رؤية شاملة لتعزيز دور الشباب في
            المجتمع من خلال تطوير مهاراتهم في الحوار والتفكير النقدي. النادي
            يسعى إلى خلق بيئة تعليمية تحفز الأعضاء على البحث والتحليل والمناقشة،
            مما يسهم في بناء جيل قادر على مواجهة التحديات المجتمعية بثقة
            وفعالية.
          </p>
          <p className="text-gray-700 leading-relaxed text-lg">
            بالإضافة إلى ذلك، يوفر النادي منصة للتبادل الثقافي والمعرفي بين
            الشباب، مما يعزز من قدراتهم على التواصل الفعال والتعاون المثمر. هذا
            النهج يسهم في تعزيز الوحدة والتضامن بين الشباب، ويمهد الطريق
            لمشاركتهم الفعّالة في مختلف المجالات الحيوية.
          </p>
        </>
      ),
    },
    {
      title: "المبادئ العامة",
      content:
        "نستمد هذا المبدأ المهم وهو وجود الأشخاص سواء من المدربين أو المتطوعين للوصول إلى أفضل الاختصاص والمعرفة",
      icon: <TrophyIcon className="w-12 h-12 text-blue-600" />,
      image: pic3,
      detailedContent: (
        <>
          <p className="text-gray-700 leading-relaxed text-lg">
            يقوم النادي على مبادئ أساسية تضمن تحقيق أهدافه بنجاح، من أبرزها
            التنافسية الشريفة، حيث يتم تشجيع الأعضاء على التنافس بشكل إيجابي
            يسهم في رفع مستوى الأداء والإبداع. كما يُعزز النادي مبدأ الاختصاص،
            مما يضمن اختيار الأعضاء بناءً على مهاراتهم وكفاءاتهم في مجال
            المناظرات.
          </p>
          <p className="text-gray-700 leading-relaxed text-lg">
            بالإضافة إلى ذلك، يؤمن النادي بأن الشباب هم شركاء فعّالون في بناء
            المجتمع، ولذلك يسعى لإشراكهم في جميع مراحل العملية، مما يعزز من روح
            القيادة والمسؤولية لديهم. هذه المبادئ تضع الأساس لبيئة تعليمية محفزة
            وداعمة تسهم في تطوير قدرات الأعضاء بشكل شامل.
          </p>
        </>
      ),
    },
    {
      title: "أهدافنا",
      content:
        "نهدف إلى بناء جيل قادر على التناظر والحوار البناء وتمكين الشباب من المشاركة الفعالة",
      icon: <Target className="w-12 h-12 text-blue-600" />,
      image: pic4,
      detailedContent: (
        <>
          <p className="text-gray-700 leading-relaxed text-lg">
            يهدف نادي المناظرات إلى تحقيق مجموعة من الأهداف التي تسهم في تطوير
            مهارات الشباب وتمكينهم من المشاركة الفعّالة في المجتمع. من بين هذه
            الأهداف عقد مناظرات منتظمة تغطي مواضيع متنوعة تساهم في توسيع آفاق
            الأعضاء وتعميق فهمهم للقضايا المختلفة.
          </p>
          <p className="text-gray-700 leading-relaxed text-lg">
            كما يسعى النادي إلى تأسيس فريق متكامل مدرب على فن المناظرات، وتنظيم
            ورش تدريبية مستمرة لتطوير مهارات الأعضاء في التواصل والإقناع
            والتفكير النقدي. الهدف النهائي هو تمكين الشباب من التحدث بثقة أمام
            الجمهور، وتقديم أفكار مبتكرة تخدم مجتمعهم وتعزز من دورهم كفاعلين في
            العملية المجتمعية.
          </p>
        </>
      ),
    },
  ];

  // Array of partner images
  const partners = [
    partner1,
    partner2,
    partner3,
    // Add more partner images here
  ];

  // Data for the FAQ section
  const faqs = [
    {
      question: "ما هو نادي مناظرات زاركي؟",
      answer:
        "نادي مناظرات زاركي هو منصة رائدة تهدف إلى تمكين الشباب من خلال تطوير مهاراتهم في الحوار والتناظر والمشاركة الفعالة في المجتمع.",
    },
    {
      question: "كيف يمكنني الانضمام إلى النادي؟",
      answer:
        "يمكنك الانضمام إلى النادي من خلال التسجيل عبر موقعنا الإلكتروني أو حضور إحدى جلسات التعريف التي نقيمها بانتظام.",
    },
    {
      question: "ما هي فوائد الانضمام إلى نادي المناظرات؟",
      answer:
        "الانضمام إلى النادي يتيح لك تطوير مهارات التفكير النقدي، التواصل الفعال، الإقناع، وبناء الثقة بالنفس، بالإضافة إلى فرص المشاركة في مسابقات ومناظرات محلية ودولية.",
    },
    {
      question: "هل هناك رسوم للانضمام إلى النادي؟",
      answer:
        "لا، الانضمام إلى نادي مناظرات زاركي مجاني. ومع ذلك، قد تكون هناك بعض التكاليف المرتبطة بالأنشطة الخاصة أو الفعاليات الخارجية.",
    },
    {
      question: "كيف يتم تنظيم جلسات التدريب والمناظرات؟",
      answer:
        "يتم تنظيم جلسات التدريب بشكل دوري حيث نقدم ورش عمل تغطي مختلف جوانب فن المناظرة، تليها جلسات مناظرات عملية لتطبيق ما تم تعلمه.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 text-right font-sans">
      {/* Header (Hero Section) */}
      <header className="relative bg-gray-800 h-[30rem] md:h-[50rem]">
        <img
          src={heroImage}
          alt="نادي مناظرات زاركي"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center px-4">
          <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-4 drop-shadow-lg">
            نادي مناظرات زاركي
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 mb-4 text-center max-w-2xl drop-shadow-lg">
            منصة رائدة لتمكين الشباب وتعزيز ثقافة الحوار والتناظر في المجتمع
          </p>
          <Link
            to="/debates"
            className="inline-flex items-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-primary-900"
          >
            شاهد أبرز المناظرات
            <svg
              className="ml-2 -mr-1 w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </Link>
          {/* Removed Buttons from Hero Section */}
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-20 space-y-20">
        {sections.map((section, index) => (
          <section
            key={index}
            className={`grid md:grid-cols-2 gap-16 items-center bg-white rounded-3xl shadow-xl p-12 hover:shadow-2xl transition-shadow`}
          >
            <div className={`${index % 2 === 1 ? "md:order-2" : ""} space-y-6`}>
              <div className="flex items-center space-x-4">
                <div className="bg-blue-50 p-4 rounded-full">
                  {section.icon}
                </div>
                <h2 className="text-3xl font-bold text-gray-900">
                  {section.title}
                </h2>
              </div>
              <p className="text-gray-700 mb-8 leading-relaxed text-lg">
                {section.content}
              </p>

              {/* Dropdown for Each Section */}
              <div>
                <button
                  onClick={() => toggleSection(section.title)}
                  className="flex items-center text-blue-600 hover:text-blue-800 bg-blue-50 px-6 py-3 rounded-full shadow-sm hover:bg-blue-100 transition-colors text-md font-medium"
                  aria-expanded={expandedSections[section.title]}
                  aria-controls={`section-content-${index}`}
                >
                  {expandedSections[section.title] ? "إخفاء" : "المزيد"}
                  {expandedSections[section.title] ? (
                    <ChevronUp className="ml-2 w-5 h-5" />
                  ) : (
                    <ChevronDown className="ml-2 w-5 h-5" />
                  )}
                </button>
                {expandedSections[section.title] && (
                  <div
                    id={`section-content-${index}`}
                    className="mt-6 space-y-4"
                    role="region"
                    aria-labelledby={`section-title-${index}`}
                  >
                    {section.detailedContent}
                  </div>
                )}
              </div>
            </div>
            <div
              className={`${
                index % 2 === 1 ? "md:order-1" : ""
              } flex justify-center`}
            >
              <img
                src={section.image}
                alt={section.title}
                loading="lazy"
                className="w-full max-w-md rounded-3xl shadow-2xl object-cover"
              />
            </div>
          </section>
        ))}

        {/* Partners Section */}
        <section className="py-12 bg-gray-100 rounded-3xl shadow-xl p-12 hover:shadow-2xl transition-shadow">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
            شركائنا
          </h2>
          <div className="container mx-auto px-6">
            <div className="flex flex-wrap justify-center items-center gap-8">
              {partners.map((partner, index) => (
                <div
                  key={index}
                  className="flex justify-center items-center m-4"
                >
                  <img
                    src={partner}
                    alt={`شريك ${index + 1}`}
                    className="h-24 w-auto object-contain transition-transform transform hover:scale-105 shadow-md rounded-lg"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-12 bg-white rounded-3xl shadow-xl p-12 hover:shadow-2xl transition-shadow">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
            الأسئلة الأكثر تكرارًا
          </h2>
          <div className="max-w-4xl mx-auto space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-gray-200 pb-4">
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full flex justify-between items-center text-left text-xl font-medium text-gray-800 focus:outline-none"
                  aria-expanded={faqExpanded[index] || false}
                  aria-controls={`faq-answer-${index}`}
                >
                  <span>{faq.question}</span>
                  {faqExpanded[index] ? (
                    <ChevronUp className="w-6 h-6 text-blue-600" />
                  ) : (
                    <ChevronDown className="w-6 h-6 text-blue-600" />
                  )}
                </button>
                {faqExpanded[index] && (
                  <div
                    id={`faq-answer-${index}`}
                    className="mt-4 text-gray-700 text-lg"
                  >
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-6 text-center">
        <div className="container mx-auto">
          <p className="text-gray-400 text-lg">
            © 2024 نادي مناظرات زاركي. جميع الحقوق محفوظة
          </p>
        </div>
      </footer>
    </div>
  );
};

export default ZarqiDebateClubHomepage;
