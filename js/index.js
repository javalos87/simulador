let terminar = true;
let nombre;

const presentacion = "🏛️ Bienvenido a sistema de simulacion Bank Simulator 🏛️";
const opciones = " 1️⃣ Seguro de vida \n 2️⃣ Prestamos Personales \n 0️⃣ Terminar";

function validar(valor) {
  if (arMenu.includes(valor)) {
    console.log("opcion valida");
  } else {
    console.log("opcion invalida");
  }
}

function validarNombre(nombre) {
  if (nombre.trim().length > 0) {
    console.log("👌 Bienvenido", nombre.toUpperCase());
    return true;
  } else {
    alert("❌ El nombre no puede quedar vacio");
    return false;
  }
}

function menu() {
  let salir = true;
  while (salir) {
    let opcion = prompt(opciones);
    switch (opcion) {
      case "1":
        seguroVida();
        console.log("⬅️ Menu Principal");
        break;
      case "2":
        let capital = prompt("Ingrese el monto del prestamo a solicitar");
        let tiempo = prompt("Ingrese la cantidad de cuotas");
        let tasa = prompt("Ingrese la tasa del credito");
        calcularPrestamo(capital, tiempo, tasa);
        console.log("⬅️ Menu Principal");
        break;
      case "0":
        console.warn("👋 Hasta la vista baby!!!");
        salir = false;
        break;
      default:
        console.error("❌ Debe ingresar un valor del 1 al 4 o 0 para salir!!!");
        break;
    }
  }
}

function cotizacion(monto, prima, factorRiesgo) {
  let cotizacion = monto * prima * factorRiesgo;
  return cotizacion;
}

function seguroVida() {
  console.log(
    "*******************************************************************************"
  );
  console.log("🤵‍♂️ COTIZACION DE SEGURO DE VIDA");
  let presupuesto;
  let prima = 0.045;
  let monto = prompt("Por Favor ingrese el monto de vida a asegurar");
  let enfermedad = prompt("Tiene alguna enfermedad cronica, ingrese si o no");
  if (enfermedad.toLowerCase() === "no" && !isNaN(monto)) {
    console.log(
      "✅ Cotizacion de seguro de vida de:",
      monto,
      "sin preexistencia de enfermedad"
    );
    console.log(
      "⏩ Su seguro de vida sale: ",
      cotizacion(monto, prima, 1),
      "\n"
    );
  } else if (enfermedad.toLowerCase() === "si" && !isNaN(monto)) {
    console.log(
      "✅ Cotizacion de seguro de vida de:",
      monto,
      "con preexistencia de enfermedad"
    );
    console.log(
      "⏩ Su seguro de vida sale: ",
      cotizacion(monto, prima, 1.3),
      "\n"
    );
  } else {
    console.error(
      "❌ Los Datos ingresados son incorrectos\n",
      "Debe ingresar si o no\n",
      "El monto debe ser un numero"
    );
  }
}

function calcularPrestamo(capital, tiempo, tasa) {
  if (!isNaN(capital) && !isNaN(tiempo) && !isNaN(tasa)) {
    let cuotaAmortizada = 0;
    let capitalActivo = capital;
    let interesNominal = parseFloat(tasa / 100 / 12);
    let interesCapital = parseFloat(capital - cuotaAmortizada) * interesNominal;
    let base = 1 + parseFloat(interesNominal);
    let x = Math.pow(base, parseInt(tiempo));
    let cuota = capital / ((1 - 1 / x) / parseFloat(interesNominal));
    cuotaAmortizada = cuota - interesCapital;
    console.log(
      "*******************************************************************************"
    );
    console.log("COTIZACION DE PRESTAMO PERSSONAL");
    console.log(
      "💵Monto: ",
      capital,
      "\n🕐Cuotas:",
      tiempo,
      "\n📈Interes:",
      tasa
    );
    console.log("   Detalle del credito cotizado");
    console.log("   Cuota ", "   Interes", "   Amortizada");
    for (i = 1; i <= tiempo; i++) {
      console.log(
        i,
        cuota.toFixed(2),
        interesCapital.toFixed(2),
        cuotaAmortizada.toFixed(2)
      );
      capitalActivo = capitalActivo - cuotaAmortizada;
      interesCapital = parseFloat(capitalActivo) * interesNominal;
      cuotaAmortizada = cuota - interesCapital;
    }
  } else {
    console.error("Los datos ingresados no son validos");
  }
}

function iniciar() {
  alert(presentacion);
  let nombre = prompt("Por favor ingrese su nombre");
  validarNombre(nombre);
  if (nombre) {
    console.log("Por favor seleccione que operacion quiere realizar");
    menu();
  } else {
    iniciar();
  }
}
