import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ContactForm from "./ContactForm/ContactForm";
import Debate from "./pages/Debate";
import About from "./pages/About";
import MembersCards from "./pages/Members";
import AddMemberForm from "./pages/AddMember";
import AvailableEvents from "./pages/Events";
import CreateEventForm from "./pages/AddEvent";

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
            <Route path="/members" element={<MembersCards />} />
            <Route path="/add_member" element={<AddMemberForm />} />
            <Route path="/available_events" element={<AvailableEvents />} />
            <Route path="/create_event" element={<CreateEventForm />} />

            {/* Add other routes here */}
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
