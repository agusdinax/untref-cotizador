import React from "react";
import "../styles/styles.css";

const HeaderCotizador = ({
  titulo = "Cotizador de cantidad de carne por persona",
  subtitulo = "Con está calculadora podrás calcular la cantidad de carne perfecta por persona para tu asado, según la cantidad de personas y el perfil de consumo.",
  descripcion = "Ingresa los datos del asado y el cotizador te devuelve recomendaciones de compra de cantidad de carne por persona estimado por diferentes cortes"
}) => {
  return (
    <header className="header-cotizador">
      <div className="header-cotizador-overlay">
        <div className="header-cotizador-content">
          <h1 className="header-cotizador-title">{titulo}</h1>
          <p className="header-cotizador-subtitle">{subtitulo}</p>
          <p className="header-cotizador-description">
            {descripcion}
          </p>
          <ul className="header-cotizador-lista">
            <li>✔ No te quedas corto</li>
            <li>✔ No compras demás</li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default HeaderCotizador;
