# Cotizador de carne para asados
Trabajo Práctico Final - UNTREF
React + Vite + JavaScript + MaterialUI

Este proyecto es un cotizador interactivo de carne para asados, donde el usuario puede ingresar cantidad de adultos y niños, seleccionar perfil de consumo y elegir diferentes cortes de carne. El sistema calcula automáticamente cuántos kilos se necesitan en total, cómo se distribuyen según los cortes seleccionados y permite guardar un historial persistido en localStorage. Se utiliza MaterialUI (MUI) para los componentes visuales.

## Instalación y ejecución del proyecto
-tener instalado node js.
1. Instalar dependencias
   ```bash
   npm install
   ```

2. Ejecutar el proyecto 
   ```bash
   npm run dev
   ```

## Explicación calculo de asado 
En la funcion calculadoraAsado.js se encuentra la lógica de la cotización
Esta función permite estimar la cantidad total de carne necesaria considerando diferentes factores como:

-Cantidad de adultos y niños
* Los adultos consumen según su perfil.
* Los niño se consideran al 50%

-Perfiles de consumo
Representan cuanto come cada adulto:
```js
const CARNE_POR_ADULTO = {
  light: 0.4,      
  normal: 0.6,    
  buen_comer: 0.8, 
};
```
Según el perfil, se calcula cuántos kilos aporta cada una de las personas equivalentes

-Seleccion de cortes y distribución
Cada corte tiene un peso relativo que determina qué porcentaje del total representa:

```js
const DISTRIBUCION_CORTES = {
  asadoTira: 0.3,
  vacio: 0.2,
  entraña: 0.15,
  chorizo: 0.15,
  morcilla: 0.1,
  matambre: 0.05,
  pollo: 0.05,
  chinchulines: 0.2,
};
```
