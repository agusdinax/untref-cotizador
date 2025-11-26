import React from "react";
import { Chip } from "@mui/material";
import { CORTES_DISPONIBLES, perfiles } from "../utils/calculadoraAsado.js";

const mapPerfilLabel = perfiles.reduce((acc, p) => {
  acc[p.id] = p.label;
  return acc;
}, {});

const ResumenCotizacion = ({ datos, resultado }) => {
  if (!resultado) {
    return (
      <div className="card">
        <h2 className="card-title">Resumen de cotización</h2>
        <p className="card-subtitle">
          Completá el formulario y calculá para ver cuántos kg de carne
          se recomiendan para tu asado.
        </p>
      </div>
    );
  }

  const { totalKg, kgPorPersona, detalles } = resultado;
  const totalPersonasEq =
    Number(datos.adultos || 0) + Number(datos.ninos || 0) * 0.5;

  const getNombreCorte = (id) =>
    CORTES_DISPONIBLES.find((c) => c.id === id)?.nombre || id;

  return (
    <div className="card">
      <div className="resumen-header">
        <div className="resumen-header-main">
          <h2 className="card-title">Resumen de cotización</h2>
          <p className="card-subtitle">
            Estimación de carne total y por tipo de corte.
          </p>
        </div>
        <Chip
          label={mapPerfilLabel[datos.perfilComida] || "Perfil desconocido"}
          size="small"
          className="badge-perfil"
        />
      </div>

      <div className="resumen-info">
        <p>
          Personas adultas: <strong>{datos.adultos}</strong> · Niñxs:{" "}
          <strong>{datos.ninos}</strong> (equivalente aprox:{" "}
          <strong>{totalPersonasEq.toFixed(1)} personas</strong>)
        </p>
        <p>
          Total estimado de carne:{" "}
          <strong>{totalKg.toFixed(2)} kg</strong>
        </p>
        <p>
          Carne por persona equivalente:{" "}
          <strong>{kgPorPersona.toFixed(2)} kg</strong>
        </p>
      </div>

      <h3 className="resumen-section-title">
        Distribución por tipo de carne
      </h3>

      <table className="tabla-resumen">
        <thead>
          <tr>
            <th>Corte / achura</th>
            <th>Kg totales</th>
            <th>Kg por persona eq.</th>
          </tr>
        </thead>
        <tbody>
          {detalles.map((d) => {
            const kgPorPersonaCorte = totalPersonasEq
              ? d.kg / totalPersonasEq
              : 0;
            return (
              <tr key={d.id}>
                <td>{getNombreCorte(d.id)}</td>
                <td>{d.kg.toFixed(2)} kg</td>
                <td>{kgPorPersonaCorte.toFixed(2)} kg</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <p className="resumen-footnote">
        * Los valores son estimados y suponen un asado típico argentino con
        ensaladas y acompañamientos.
      </p>
    </div>
  );
};

export default ResumenCotizacion;
