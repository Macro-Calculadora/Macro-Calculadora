const formulario = document.getElementById("formulario");

formulario.addEventListener("submit", function (evento) {
  evento.preventDefault();

  // 1. Obtener los datos ingresados
  const edad = Number(document.getElementById("edad").value);
  const peso = Number(document.getElementById("peso").value);
  const altura = Number(document.getElementById("altura").value);
  const sexo = document.getElementById("sexo").value;
  const actividad = Number(
    document.getElementById("actividad").value
  );

let proteinaKg;

if (actividad === 1.2) {
  proteinaKg = 0.8;
} else if (actividad === 1.375) {
  proteinaKg = 1.3;
} else if (actividad === 1.55) {
  proteinaKg = 1.9;
} else if (actividad === 1.725) {
  proteinaKg = 2.2;
} else if (actividad === 1.9) {
  proteinaKg = 2.4;
}

  // 2. Validar los datos
  if (
    !Number.isFinite(edad) ||
    !Number.isFinite(peso) ||
    !Number.isFinite(altura) ||
    !Number.isFinite(actividad) ||
    !Number.isFinite(proteinaKg) ||
    edad < 10 || edad > 100 ||
    peso < 25 || peso > 350 ||
    altura < 100 || altura > 250 ||
    !sexo ||
    ![1.2, 1.375, 1.55, 1.725, 1.9].includes(actividad) ||
    ![0.8, 1.3, 1.9, 2.2, 2.4].includes(proteinaKg)
  ) {
    alert("Revisá los datos ingresados.");
    return;
  }

  // 3. Calcular el metabolismo basal (Harris-Benedict)
  let mb;

  if (sexo === "varon") {
    mb =
      66 +
      (13.7 * peso) +
      (5 * altura) -
      (6.8 * edad);
  } else {
    mb =
      655 +
      (9.6 * peso) +
      (1.8 * altura) -
      (4.7 * edad);
  }

  // 4. Calcular el gasto energético total (GET)
  const get = mb * actividad;

  // Calcular el IMC
const alturaMetros = altura / 100;
const imc = peso / (alturaMetros * alturaMetros);

// Mostrar el IMC
document.getElementById("imcValor").textContent =
  imc.toFixed(1);

// Clasificar el resultado
const categoria = document.getElementById("imcCategoria");
const mensaje = document.getElementById("imcMensaje");

if (edad < 18) {
  categoria.textContent = "Clasificación no disponible";
  mensaje.textContent =
    "En menores de 18 años, el IMC se interpreta según la edad y el sexo mediante curvas de crecimiento.";
} else if (imc < 18.5) {
  categoria.textContent = "Peso bajo";
  mensaje.textContent =
    "El resultado está por debajo del rango de referencia para adultos.";
} else if (imc < 25) {
  categoria.textContent = "Peso adecuado";
  mensaje.textContent =
    "El resultado se encuentra dentro del rango de referencia para adultos.";
} else if (imc < 30) {
  categoria.textContent = "Sobrepeso";
  mensaje.textContent =
    "El resultado está por encima del rango de referencia para adultos.";
} else {
  categoria.textContent = "Obesidad";
  mensaje.textContent =
    "El resultado se encuentra en el rango de obesidad según la clasificación del IMC para adultos.";
}

  // 5. Calcular las proteínas según el peso corporal
  const proteinas = peso * proteinaKg;
  const kcalProteinas = proteinas * 4;

// Calcular las grasas a partir del 30% de las calorías
const kcalGrasas = get * 0.30;

// Convertir las calorías en gramos
const grasas = kcalGrasas / 9;


  // 7. Calcular los carbohidratos con las kcal restantes
  const kcalCarbohidratos =
    get - kcalProteinas - kcalGrasas;

  // Evitar resultados imposibles
  if (kcalCarbohidratos < 0) {
    alert(
      "La combinación elegida supera las calorías estimadas. " +
      "Revisá los valores y consultá con un profesional."
    );
    return;
  }

  const carbohidratos = kcalCarbohidratos / 4;


// 8. Calcular los porcentajes de cada macronutriente
const porcentajeProteinas = (kcalProteinas / get) * 100;
const porcentajeGrasas = (kcalGrasas / get) * 100;
const porcentajeCarbohidratos = (kcalCarbohidratos / get) * 100;

// Mostrar los porcentajes
document.getElementById("porcentajeProteinas").textContent =
  Math.round(porcentajeProteinas) + "%";

document.getElementById("porcentajeGrasas").textContent =
  Math.round(porcentajeGrasas) + "%";

document.getElementById("porcentajeCarbohidratos").textContent =
  Math.round(porcentajeCarbohidratos) + "%";

// Llenar las barras
document.getElementById("barraProteinas").style.width =
  porcentajeProteinas + "%";

document.getElementById("barraGrasas").style.width =
  porcentajeGrasas + "%";

document.getElementById("barraCarbohidratos").style.width =
  porcentajeCarbohidratos + "%";


  // 9. Mostrar el metabolismo basal y el GET
  document.getElementById("mb").textContent =
    Math.round(mb).toLocaleString("es-AR");

  document.getElementById("get").textContent =
    Math.round(get).toLocaleString("es-AR");

  // 10. Mostrar los macronutrientes en gramos por día
  document.getElementById("proteinas").textContent =
    proteinas.toFixed(1) + " g/día";

  document.getElementById("grasas").textContent =
    grasas.toFixed(1) + " g/día";

  document.getElementById("carbohidratos").textContent =
    carbohidratos.toFixed(1) + " g/día";

  // 11. Mostrar los resultados
  const resultados = document.getElementById("resultados");
  resultados.hidden = false;
  resultados.scrollIntoView({ behavior: "smooth" });
});