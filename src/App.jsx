import { useState, useEffect } from "react";
import { AppBar, Toolbar, Container } from "@mui/material";
import OutdoorGrillIcon from "@mui/icons-material/OutdoorGrill";
import FormularioAsado from "./components/FormularioAsado.jsx";
import ResumenCotizacion from "./components/ResumenCotizacion.jsx";
import Historial from "./components/Historial.jsx";
import HeaderCotizador from "./components/HeaderCotizador.jsx";
import { calcularAsado } from "./utils/calculadoraAsado.js";

const STORAGE_KEY = "historial_cotizaciones_asado";

const App = () => {
  const [datosEntrada, setDatosEntrada] = useState({
    adultos: 0,
    ninos: 0,
    perfilComida: "normal",
    cortesSeleccionados: ["vacio"],
  });

  const [resultado, setResultado] = useState(null);
  const [historial, setHistorial] = useState([]);
 //cargar el historial
  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try {
        setHistorial(JSON.parse(raw));
      } catch {
        setHistorial([]);
      }
    }
  }, []);

  //guardar el historial
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(historial));
  }, [historial]);

  const manejarCalcular = (datos) => {
    const salida = calcularAsado(datos);
    setDatosEntrada(datos);
    setResultado(salida);

    const itemHistorial = {
      id: Date.now(),
      fecha: new Date().toLocaleString("es-AR"),
      entrada: datos,
      resultado: salida,
    };

    setHistorial((prev) => [itemHistorial, ...prev].slice(0, 20));
  };

  const manejarLimpiarHistorial = () => {
    setHistorial([]);
    localStorage.removeItem(STORAGE_KEY);
  };

  const manejarUsarCotizacion = (item) => {
    if (!item) return;
    setDatosEntrada(item.entrada);
    setResultado(item.resultado);
  };

  return (
    <>
      <AppBar position="sticky" className="navbar">
        <Toolbar className="navbar-inner">
          <OutdoorGrillIcon className="navbar-icon" />
          <span className="navbar-title">COTIZADOR DE CARNE PARA ASADOS</span>
          <span className="navbar-spacer" />
          <Historial
            historial={historial}
            onUseItem={manejarUsarCotizacion}
            onClear={manejarLimpiarHistorial}
          />
        </Toolbar>
      </AppBar>
      <HeaderCotizador />
      <div className="app-container">
        <Container maxWidth="lg" disableGutters>
          <div className="layout-dos-columnas">
            <div className="card">
              <h2 className="card-title">Datos del asado</h2>
              <p className="card-subtitle">
                Ingresa la cantidad de personas, el perfil de los comensales y
                elegí los tipos de carne para estimar cuántos kg vas a necesitar
              </p>
              <FormularioAsado
                datos={datosEntrada}
                onCalcular={manejarCalcular}
              />
            </div>
            <ResumenCotizacion datos={datosEntrada} resultado={resultado} />
          </div>
        </Container>
      </div>
    </>
  );
};

export default App;