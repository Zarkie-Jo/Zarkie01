import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ContactForm from "./ContactForm/ContactForm";
import Debate from "./pages/Debate";
import About from "./pages/About";

const App = () => {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/ContactForm" element={<ContactForm />} />
            <Route path="/debates" element={<Debate />} />
            <Route path="/about" element={<About />} />

            {/* Add other routes here */}
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
