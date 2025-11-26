import React, { useState } from "react";
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
} from "@mui/material";
import HistoryIcon from "@mui/icons-material/History";
import RestartAltIcon from "@mui/icons-material/RestartAlt";

const HistorialMenu = ({ historial, onSelectItem, onClear }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSelect = (item) => {
    onSelectItem(item);
    handleClose();
  };

  return (
    <>
      <IconButton color="inherit" onClick={handleOpen}>
        <Badge badgeContent={historial.length} color="secondary">
          <HistoryIcon />
        </Badge>
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        PaperProps={{
          className: "historial-menu-paper",
        }}
      >
        <Box px={2} pt={1} pb={1}>
          <Typography variant="subtitle1">
            Historial de cotizaciones
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Seleccioná una para ver el detalle.
          </Typography>
        </Box>
        <Divider />
        {historial.length === 0 ? (
          <Box px={2} py={2}>
            <Typography variant="body2" color="text.secondary">
              Aún no hay cotizaciones guardadas.
            </Typography>
          </Box>
        ) : (
          <>
            {historial.map((item) => (
              <MenuItem
                key={item.id}
                onClick={() => handleSelect(item)}
                sx={{ alignItems: "flex-start", whiteSpace: "normal" }}
              >
                <ListItemText
                  primary={
                    <Typography variant="body2">
                      {item.entrada.adultos} ad. / {item.entrada.ninos} niñxs ·{" "}
                      {item.resultado.totalKg.toFixed(2)} kg
                    </Typography>
                  }
                  secondary={
                    <Typography variant="caption" color="text.secondary">
                      {item.fecha}
                    </Typography>
                  }
                />
              </MenuItem>
            ))}
            <Divider />
            <Box px={2} py={1}>
              <Button
                size="small"
                color="secondary"
                startIcon={<RestartAltIcon />}
                onClick={() => {
                  onClear();
                  handleClose();
                }}
                fullWidth
              >
                Limpiar historial
              </Button>
            </Box>
          </>
        )}
      </Menu>
    </>
  );
};

export default HistorialMenu;
