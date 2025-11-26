// src/components/Layout.jsx
import React from "react";
import { AppBar, Toolbar, Typography, Container, Box } from "@mui/material";
import OutdoorGrillIcon from "@mui/icons-material/OutdoorGrill";
import HistorialNav from "./HistorialNav.jsx";

const Layout = ({ children, historial, onRecalcular, onLimpiar }) => {
  return (
    <>
      <AppBar position="sticky" color="primary" elevation={2}>
        <Toolbar>
          <OutdoorGrillIcon sx={{ mr: 1 }} />
          <Typography variant="h6" className="logo-asado" sx={{ flexGrow: 1 }}>
            COTIZADOR DE ASADO ARGENTINO
          </Typography>

          {/* Icono de historial en navbar */}
          <HistorialNav
            historial={historial}
            onRecalcular={onRecalcular}
            onLimpiar={onLimpiar}
          />
        </Toolbar>
      </AppBar>

      <Box component="main" className="app-container">
        <Container maxWidth="lg">{children}</Container>
      </Box>
    </>
  );
};

export default Layout;
