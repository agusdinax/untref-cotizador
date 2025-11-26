import React from "react";
import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Stack,
  Button,
  Chip,
} from "@mui/material";
import HistoryIcon from "@mui/icons-material/History";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import ReplayIcon from "@mui/icons-material/Replay";

const HistorialCotizaciones = ({ historial, onLimpiar, onRecalcular }) => {
  return (
    <Card elevation={3} sx={{ boxShadow: "var(--sombra-suave)" }}>
      <CardHeader
        avatar={<HistoryIcon color="primary" />}
        title="Historial de cotizaciones"
        action={
          <Button
            size="small"
            color="secondary"
            startIcon={<RestartAltIcon />}
            onClick={onLimpiar}
            disabled={historial.length === 0}
          >
            Limpiar historial
          </Button>
        }
      />
      <CardContent>
        {historial.length === 0 ? (
          <Typography variant="body2" color="text.secondary">
            Todavía no hay cotizaciones guardadas. Cada vez que calcules un asado, se
            guardará automáticamente acá.
          </Typography>
        ) : (
          <List dense>
            {historial.map((item) => (
              <ListItem
                key={item.id}
                secondaryAction={
                  <IconButton
                    edge="end"
                    aria-label="recalcular"
                    onClick={() => onRecalcular(item)}
                  >
                    <ReplayIcon />
                  </IconButton>
                }
              >
                <ListItemText
                  primary={
                    <Stack
                      direction="row"
                      spacing={1}
                      alignItems="center"
                      flexWrap="wrap"
                    >
                      <Typography variant="body2">
                        {item.entrada.nombre || "Asado sin nombre"}
                      </Typography>
                      <Chip
                        size="small"
                        label={`${item.entrada.adultos} ad. / ${item.entrada.ninos} niñxs`}
                      />
                      <Chip
                        size="small"
                        variant="outlined"
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
              </ListItem>
            ))}
          </List>
        )}
      </CardContent>
    </Card>
  );
};

export default HistorialCotizaciones;
