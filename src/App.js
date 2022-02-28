import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./componentes/navbar/Navbar";
import Inicio from "./paginas/inicio/Inicio";
import Moneda from "./paginas/moneda/Moneda";
import Footer from "./componentes/footer/Footer";

import "./App.css";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/monedas/:monedaId" element={<Moneda />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
