import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PaginaLogin from "./paginas/PaginaLogin";
import PaginaPeliculas from "./paginas/PaginaPeliculas";
import PaginaSeleccion from "./paginas/PaginaSeleccion";
import PaginaFunciones from "./paginas/PaginaFunciones";
import PaginaReservas from "./paginas/PaginaReservas";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PaginaLogin />} />
        <Route path="/PaginaPeliculas" element={<PaginaPeliculas />} />
        <Route path="/PaginaSeleccion" element={<PaginaSeleccion />} />
        <Route path="/PaginaFunciones" element={<PaginaFunciones/>}/>
        <Route path="/PaginaLogin" element={<PaginaLogin/>}/>
        <Route path="/PaginaReservas" element={<PaginaReservas/>}/>
      </Routes>
    </Router>
  );
}

export default App;
