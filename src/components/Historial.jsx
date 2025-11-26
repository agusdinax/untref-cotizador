import { useState } from "react";
import {
  IconButton,
  Badge,
  Menu,
  MenuItem,
  Typography,
  Divider,
  Box,
  Button,
  ListItemText,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import HistoryIcon from "@mui/icons-material/History";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import ResumenCotizacion from "./ResumenCotizacion.jsx";

const Historial = ({ historial, onUseItem, onClear }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);

  const [detalleAbierto, setDetalleAbierto] = useState(false);
  const [cotizacionSeleccionada, setCotizacionSeleccionada] = useState(null);

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleVerDetalle = (item) => {
    setCotizacionSeleccionada(item);
    setDetalleAbierto(true);
    handleCloseMenu();
  };

  const handleCerrarDetalle = () => {
    setDetalleAbierto(false);
  };

  const handleUsarCotizacion = () => {
    if (cotizacionSeleccionada && onUseItem) {
      onUseItem(cotizacionSeleccionada);
    }
    setDetalleAbierto(false);
  };

  return (
    <>
      <IconButton color="inherit" onClick={handleOpenMenu}>
        <Badge badgeContent={historial.length} color="secondary">
          <HistoryIcon />
        </Badge>
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={openMenu}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        PaperProps={{
          className: "historial-menu-paper",
        }}
      >
        <Box className="historial-menu-header">
          <Typography
            variant="subtitle1"
            className="historial-menu-title"
          >
            Historial de cotizaciones
          </Typography>
          <Typography
            variant="caption"
            color="text.secondary"
            className="historial-menu-subtitle"
          >
            Selecciona para ver el detalle
          </Typography>
        </Box>
        <Divider className="historial-menu-divider" />
        {historial.length === 0 ? (
          <Box className="historial-menu-empty">
            <Typography
              variant="body2"
              color="text.secondary"
              className="historial-menu-empty-text"
            >
              Todavía no hay cotizaciones guardadas
            </Typography>
          </Box>
        ) : (
          [
            ...historial.map((item) => (
              <MenuItem
                key={item.id}
                onClick={() => handleVerDetalle(item)}
                className="historial-menu-item"
              >
                <ListItemText
                  primary={
                    <Typography
                      variant="body2"
                      className="historial-menu-item-main"
                    >
                      {item.entrada.adultos} adultos / {item.entrada.ninos} niños ||{" "}
                      {item.resultado.totalKg.toFixed(2)} kg
                    </Typography>
                  }
                  secondary={
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      className="historial-menu-item-date"
                    >
                      {item.fecha}
                    </Typography>
                  }
                />
              </MenuItem>
            )),
            <Divider
              key="historial-divider-footer"
              className="historial-menu-divider"
            />,
            <Box
              key="historial-footer"
              className="historial-menu-footer"
            >
              <Button
                size="small"
                color="secondary"
                startIcon={<RestartAltIcon />}
                onClick={() => {
                  onClear?.();
                  handleCloseMenu();
                }}
                fullWidth
                className="historial-menu-clear-btn"
              >
                Limpiar historial
              </Button>
            </Box>,
          ]
        )}
      </Menu>
      <Dialog
        open={detalleAbierto && !!cotizacionSeleccionada}
        onClose={handleCerrarDetalle}
        fullWidth
        maxWidth="md"
        className="historial-dialog-root"
      >
        <DialogTitle className="historial-dialog-title">
          Detalle de cotización
        </DialogTitle>
        <DialogContent dividers className="historial-dialog-content">
          {cotizacionSeleccionada && (
            <>
              <Typography
                variant="caption"
                color="text.secondary"
                className="historial-dialog-date"
              >
                {cotizacionSeleccionada.fecha}
              </Typography>
              <ResumenCotizacion
                datos={cotizacionSeleccionada.entrada}
                resultado={cotizacionSeleccionada.resultado}
              />
            </>
          )}
        </DialogContent>
        <DialogActions className="historial-dialog-actions">
          <Button
            onClick={handleCerrarDetalle}
            className="historial-dialog-btn-primary"
            variant="contained"
          >
            CERRAR
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Historial;