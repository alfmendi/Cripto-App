import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./componentes/navbar/Navbar";
import Inicio from "./paginas/inicio/Inicio";

import "./App.css";
import Moneda from "./paginas/moneda/Moneda";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/monedas/:monedaId" element={<Moneda />} />
      </Routes>
    </Router>
  );
}

export default App;
