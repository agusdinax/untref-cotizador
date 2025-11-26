//KG DE CARNE POR ADULTO SEGUN SU TIPO DE COMER
const CARNE_POR_ADULTO = {
  light: 0.4,
  normal: 0.6,
  buen_comer: 0.8,
};

//NIÑOS COMEN LA MITAD
const FACTOR_NINIOS = 0.5;

//CORTES DISPONIBLES
export const CORTES_DISPONIBLES = [
  { id: "asadoTira", nombre: "Asado de tira" },
  { id: "vacio", nombre: "Vacio" },
  { id: "entraña", nombre: "Entraña" },
  { id: "chorizo", nombre: "Chorizo" },
  { id: "morcilla", nombre: "Morcilla" },
  { id: "matambre", nombre: "Matambre" },
  { id: "pollo", nombre: "Pollo a la parrilla" },
  { id: "chichulines", nombre: "Chinchulines" },
];

//X CORTE PESOS RELATIVOS
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

export const perfiles = [
  { id: "light", label: "Comen poco (light)" },
  { id: "normal", label: "Normal" },
  { id: "buen_comer", label: "De buen comer" },
];

export function calcularAsado(datos) {
  const { adultos, ninos, perfilComida, cortesSeleccionados } = datos;
  const adultosNum = Number(adultos) || 0;
  const ninosNum = Number(ninos) || 0;
  const factorBase = CARNE_POR_ADULTO[perfilComida] || CARNE_POR_ADULTO.normal;
  const equivalentes = adultosNum + ninosNum * FACTOR_NINIOS;
  const totalKg = equivalentes * factorBase;
  if (totalKg <= 0 || !cortesSeleccionados || cortesSeleccionados.length === 0) {
    return {
      totalKg: 0,
      kgPorPersona: 0,
      detalles: [],
    };
  }

  const pesosSeleccionados = cortesSeleccionados.map((id) => ({
    id,
    peso: DISTRIBUCION_CORTES[id] ?? 1,
  }));

  const sumaPesos = pesosSeleccionados.reduce((acc, c) => acc + c.peso, 0);

  const detalles = pesosSeleccionados.map((c) => {
    const proporcion = c.peso / sumaPesos;
    const kgCorte = totalKg * proporcion;
    return {
      id: c.id,
      kg: kgCorte,
    };
  });

  return {
    totalKg,
    kgPorPersona: equivalentes ? totalKg / equivalentes : 0,
    detalles,
  };
}
