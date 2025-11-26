import { useState, useEffect } from "react";
import {
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  FormHelperText,
  Button,
  Stack,
  Checkbox,
  ListItemText,
} from "@mui/material";
import { CORTES_DISPONIBLES, perfiles } from "../utils/calculadoraAsado.js";

const FormularioAsado = ({ datos, onCalcular }) => {
  const [form, setForm] = useState(datos);
  const [errores, setErrores] = useState({});

  useEffect(() => {
    setForm(datos);
  }, [datos]);

  const manejarCambio = (campo) => (e) => {
    setForm((prev) => ({ ...prev, [campo]: e.target.value }));
  };

  const manejarCortesSelect = (event) => {
    const value = event.target.value;
    setForm((prev) => ({
      ...prev,
      cortesSeleccionados: typeof value === "string" ? value.split(",") : value,
    }));
  };

  const validar = () => {
    const err = {};
    if (!form.adultos || Number(form.adultos) <= 0) {
      err.adultos = "Debe haber al menos 1 adulto.";
    }
    if (Number(form.ninos) < 0) {
      err.ninos = "No puede ser negativo.";
    }
    if (!form.perfilComida) {
      err.perfilComida = "Seleccioná un perfil.";
    }
    if (!form.cortesSeleccionados || form.cortesSeleccionados.length === 0) {
      err.cortes = "Elegí al menos un tipo de carne.";
    }
    setErrores(err);
    return Object.keys(err).length === 0;
  };

  const manejarSubmit = (e) => {
    e.preventDefault();
    if (!validar()) return;
    onCalcular(form);
  };

  const renderCortes = (selected) => {
    if (!selected || selected.length === 0) return "";
    const nombres = selected
      .map(
        (id) => CORTES_DISPONIBLES.find((c) => c.id === id)?.nombre || id
      )
      .join(", ");
    return nombres;
  };

  return (
    <form onSubmit={manejarSubmit}>
      <Stack spacing={2}>
        <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
          <TextField
            label="Adultos"
            type="number"
            fullWidth
            value={form.adultos}
            onChange={manejarCambio("adultos")}
            inputProps={{ min: 1 }}
            error={!!errores.adultos}
            helperText={errores.adultos}
          />
          <TextField
            label="Niños"
            type="number"
            fullWidth
            value={form.ninos}
            onChange={manejarCambio("ninos")}
            inputProps={{ min: 0 }}
            error={!!errores.ninos}
            helperText={errores.ninos}
          />
        </Stack>

        <FormControl fullWidth error={!!errores.perfilComida}>
          <InputLabel id="perfil-label">Perfil de los comensales</InputLabel>
          <Select
            labelId="perfil-label"
            label="Perfil de los comensales"
            value={form.perfilComida}
            onChange={manejarCambio("perfilComida")}
          >
            {perfiles.map((p) => (
              <MenuItem key={p.id} value={p.id}>
                {p.label}
              </MenuItem>
            ))}
          </Select>
          {errores.perfilComida && (
            <FormHelperText>{errores.perfilComida}</FormHelperText>
          )}
        </FormControl>

        <FormControl fullWidth error={!!errores.cortes}>
          <InputLabel id="cortes-label">Tipos de carne</InputLabel>
          <Select
            labelId="cortes-label"
            multiple
            label="Tipos de carne"
            value={form.cortesSeleccionados}
            onChange={manejarCortesSelect}
            renderValue={renderCortes}
          >
            {CORTES_DISPONIBLES.map((c) => (
              <MenuItem key={c.id} value={c.id}>
                <Checkbox
                  checked={form.cortesSeleccionados.includes(c.id)}
                />
                <ListItemText primary={c.nombre} />
              </MenuItem>
            ))}
          </Select>
          {errores.cortes && (
            <FormHelperText>{errores.cortes}</FormHelperText>
          )}
        </FormControl>

        <Button type="submit" variant="contained" size="large">
          Calcular
        </Button>
      </Stack>
    </form>
  );
};

export default FormularioAsado;
