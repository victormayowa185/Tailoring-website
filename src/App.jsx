import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Services from "./pages/Service";
import Footer from "./components/Footer";
// import About from "./pages/About";


function App() {
  return (
    <Router>

      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/about" element={<About />} /> */}
        <Route path="/services" element={<Services />} />
        {/* <Route path="/gallery" element={<Gallery />} /> */}
        {/* <Route path="/contact" element={<Contact />} /> */}
      </Routes>

      <Footer />
    </Router>

  );
}

export default App;
