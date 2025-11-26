// src/components/HistorialNav.jsx
import React, { useState } from "react";
import {
  IconButton,
  Badge,
  Menu,
  MenuItem,
  ListItemText,
  Typography,
  Stack,
  Divider,
  Button,
  Chip,
} from "@mui/material";
import HistoryIcon from "@mui/icons-material/History";

const HistorialNav = ({ historial, onRecalcular, onLimpiar }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => setAnchorEl(null);

  const handleRecalcular = (item) => {
    onRecalcular(item);
    handleClose();
  };

  return (
    <>
      <IconButton
        color="inherit"
        onClick={handleOpen}
        aria-label="Historial de cotizaciones"
      >
        <Badge
          badgeContent={historial.length}
          color="secondary"
          overlap="circular"
        >
          <HistoryIcon />
        </Badge>
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        PaperProps={{ sx: { minWidth: 280, maxWidth: 360 } }}
      >
        <Stack direction="row" justifyContent="space-between" px={2} py={1}>
          <Typography variant="subtitle2">Historial de cotizaciones</Typography>
          <Button
            size="small"
            color="secondary"
            onClick={() => {
              onLimpiar();
              handleClose();
            }}
            disabled={historial.length === 0}
          >
            Limpiar
          </Button>
        </Stack>
        <Divider />
        {historial.length === 0 ? (
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ px: 2, py: 1.5 }}
          >
            No hay cotizaciones guardadas.
          </Typography>
        ) : (
          historial.map((item) => (
            <MenuItem key={item.id} onClick={() => handleRecalcular(item)}>
              <ListItemText
                primary={
                  <Stack
                    direction="row"
                    spacing={1}
                    alignItems="center"
                    flexWrap="wrap"
                  >
                    <Typography variant="body2">
                      {item.entrada.adultos} ad. / {item.entrada.ninos} niñxs
                    </Typography>
                    <Chip
                      size="small"
                      label={`${item.resultado.totalKg.toFixed(2)} kg`}
                    />
                  </Stack>
                }
                secondary={
                  <Typography variant="caption" color="text.secondary">
                    {item.fecha}
                  </Typography>
                }
              />
            </MenuItem>
          ))
        )}
      </Menu>
    </>
  );
};

export default HistorialNav;
