// AQUI EL JAVASCRIPT PARA MANIPULAR EL HTML
// ============================================================
// VALIDACIONES
// ============================================================
 
function mostrarError(campoId, wrapperId, mensaje) {
    let span = document.getElementById(campoId);
    let wrap = document.getElementById(wrapperId);
 
    span.textContent = mensaje;
    span.style.display = "block";
    wrap.classList.add("input-error");
}
 
function limpiarError(campoId, wrapperId) {
    let span = document.getElementById(campoId);
    let wrap = document.getElementById(wrapperId);
 
    span.textContent = "";
    span.style.display = "none";
    wrap.classList.remove("input-error");
}
 
function limpiarTodosLosErrores() {
    limpiarError("err-ingresos",    "wrap-ingresos");
    limpiarError("err-arriendo",    "wrap-arriendo");
    limpiarError("err-alimentacion","wrap-alimentacion");
    limpiarError("err-varios",      "wrap-varios");
    limpiarError("err-monto",       "wrap-monto");
    limpiarError("err-plazo",       "wrap-plazo");
    limpiarError("err-tasa",        "wrap-tasa");
}
 
function validarFormulario(ingresos, arriendo, alimentacion, varios, monto, plazo, tasa) {
 
    let formularioValido = true;
 
    let txtIngresos = document.getElementById("txtIngresos").value.trim();
 
    if (txtIngresos === "") {
        mostrarError("err-ingresos", "wrap-ingresos", "El campo ingresos es obligatorio.");
        formularioValido = false;
    } else if (isNaN(ingresos)) {
        mostrarError("err-ingresos", "wrap-ingresos", "Ingresa un número válido.");
        formularioValido = false;
    } else if (ingresos < 100) {
        mostrarError("err-ingresos", "wrap-ingresos", "Los ingresos deben ser mínimo $100.");
        formularioValido = false;
    } else if (ingresos > 99999) {
        mostrarError("err-ingresos", "wrap-ingresos", "Los ingresos no pueden superar $99,999.");
        formularioValido = false;
    }
 
    let txtArriendo = document.getElementById("txtArriendo").value.trim();
 
    if (txtArriendo === "") {
        mostrarError("err-arriendo", "wrap-arriendo", "El campo arriendo es obligatorio.");
        formularioValido = false;
    } else if (isNaN(arriendo)) {
        mostrarError("err-arriendo", "wrap-arriendo", "Ingresa un número válido.");
        formularioValido = false;
    } else if (arriendo < 0) {
        mostrarError("err-arriendo", "wrap-arriendo", "El arriendo no puede ser negativo.");
        formularioValido = false;
    } else if (arriendo > 99999) {
        mostrarError("err-arriendo", "wrap-arriendo", "El arriendo no puede superar $99,999.");
        formularioValido = false;
    }
 
    let txtAlimentacion = document.getElementById("txtAlimentacion").value.trim();
 
    if (txtAlimentacion === "") {
        mostrarError("err-alimentacion", "wrap-alimentacion", "El campo alimentación es obligatorio.");
        formularioValido = false;
    } else if (isNaN(alimentacion)) {
        mostrarError("err-alimentacion", "wrap-alimentacion", "Ingresa un número válido.");
        formularioValido = false;
    } else if (alimentacion < 0) {
        mostrarError("err-alimentacion", "wrap-alimentacion", "La alimentación no puede ser negativa.");
        formularioValido = false;
    } else if (alimentacion > 99999) {
        mostrarError("err-alimentacion", "wrap-alimentacion", "La alimentación no puede superar $99,999.");
        formularioValido = false;
    }
 
    let txtVarios = document.getElementById("txtVarios").value.trim();
 
    if (txtVarios === "") {
        mostrarError("err-varios", "wrap-varios", "El campo varios es obligatorio.");
        formularioValido = false;
    } else if (isNaN(varios)) {
        mostrarError("err-varios", "wrap-varios", "Ingresa un número válido.");
        formularioValido = false;
    } else if (varios < 0) {
        mostrarError("err-varios", "wrap-varios", "El campo varios no puede ser negativo.");
        formularioValido = false;
    } else if (varios > 99999) {
        mostrarError("err-varios", "wrap-varios", "El campo varios no puede superar $99,999.");
        formularioValido = false;
    }
 
    if (!isNaN(ingresos) && !isNaN(arriendo) && !isNaN(alimentacion) && !isNaN(varios)) {
        let totalGastos = arriendo + alimentacion + varios;
 
        if (totalGastos >= ingresos) {
            mostrarError("err-varios", "wrap-varios", "El total de gastos debe ser menor a los ingresos.");
            formularioValido = false;
        }
    }
 
    let txtMonto = document.getElementById("txtMonto").value.trim();
 
    if (txtMonto === "") {
        mostrarError("err-monto", "wrap-monto", "El campo monto es obligatorio.");
        formularioValido = false;
    } else if (!Number.isInteger(monto) || isNaN(monto)) {
        mostrarError("err-monto", "wrap-monto", "El monto debe ser un número entero.");
        formularioValido = false;
    } else if (monto < 500) {
        mostrarError("err-monto", "wrap-monto", "El monto mínimo es $500.");
        formularioValido = false;
    } else if (monto > 100000) {
        mostrarError("err-monto", "wrap-monto", "El monto máximo es $100,000.");
        formularioValido = false;
    }
 
    let txtPlazo = document.getElementById("txtPlazo").value.trim();
 
    if (txtPlazo === "") {
        mostrarError("err-plazo", "wrap-plazo", "El campo plazo es obligatorio.");
        formularioValido = false;
    } else if (!Number.isInteger(plazo) || isNaN(plazo)) {
        mostrarError("err-plazo", "wrap-plazo", "El plazo debe ser un número entero.");
        formularioValido = false;
    } else if (plazo < 1) {
        mostrarError("err-plazo", "wrap-plazo", "El plazo mínimo es 1 año.");
        formularioValido = false;
    } else if (plazo > 30) {
        mostrarError("err-plazo", "wrap-plazo", "El plazo máximo es 30 años.");
        formularioValido = false;
    }
 
    let txtTasa = document.getElementById("txtTasaInteres").value.trim();
 
    if (txtTasa === "") {
        mostrarError("err-tasa", "wrap-tasa", "El campo tasa de interés es obligatorio.");
        formularioValido = false;
    } else if (!Number.isInteger(tasa) || isNaN(tasa)) {
        mostrarError("err-tasa", "wrap-tasa", "La tasa debe ser un número entero.");
        formularioValido = false;
    } else if (tasa < 1) {
        mostrarError("err-tasa", "wrap-tasa", "La tasa mínima es 1%.");
        formularioValido = false;
    } else if (tasa > 50) {
        mostrarError("err-tasa", "wrap-tasa", "La tasa máxima es 50%.");
        formularioValido = false;
    }
 
    return formularioValido;
}
 
function calcular() {
 
    limpiarTodosLosErrores();
 
    let ingresos     = parseFloat(document.getElementById("txtIngresos").value);
    let arriendo     = parseFloat(document.getElementById("txtArriendo").value);
    let alimentacion = parseFloat(document.getElementById("txtAlimentacion").value);
    let varios       = parseFloat(document.getElementById("txtVarios").value);
    let monto        = parseInt(document.getElementById("txtMonto").value);
    let plazo        = parseInt(document.getElementById("txtPlazo").value);
    let tasa         = parseInt(document.getElementById("txtTasaInteres").value);
 
    let formularioValido = validarFormulario(ingresos, arriendo, alimentacion, varios, monto, plazo, tasa);
 
    if (!formularioValido) {
        return;
    }
 
    let totalGastos = arriendo + alimentacion + varios;
    document.getElementById("spnTotalGastos").textContent = "USD " + totalGastos.toFixed(2);
 
    let disponible = calcularDisponible(ingresos, totalGastos);
    document.getElementById("spnDisponible").textContent = "USD " + disponible.toFixed(2);
 
    let capacidadPago = calcularCapacidadPago(disponible);
    document.getElementById("spnCapacidadPago").textContent = "USD " + capacidadPago.toFixed(2);
 
    let interes = calcularInteresSimple(monto, tasa, plazo);
    document.getElementById("spnInteresPagar").textContent = "USD " + interes.toFixed(2);
 
    let totalPagar = calcularTotalPagar(monto, interes);
    document.getElementById("spnTotalPrestamo").textContent = "USD " + totalPagar.toFixed(2);
 
    let cuotaMensual = calcularCuotaMensual(totalPagar, plazo);
    document.getElementById("spnCuotaMensual").textContent = "USD " + cuotaMensual.toFixed(2);
 
    let aprobado = aprobarCredito(capacidadPago, cuotaMensual);
 
    let spnEstado = document.getElementById("spnEstadoCredito");
 
    if (aprobado) {
        spnEstado.textContent = "CREDITO APROBADO";
        spnEstado.style.color = "#4CAF50";
    } else {
        spnEstado.textContent = "CREDITO RECHAZADO";
        spnEstado.style.color = "#e74c3c";
    }
}
 
function reiniciar() {
    document.getElementById("txtIngresos").value     = "";
    document.getElementById("txtArriendo").value     = "";
    document.getElementById("txtAlimentacion").value = "";
    document.getElementById("txtVarios").value       = "";
    document.getElementById("txtMonto").value        = "";
    document.getElementById("txtPlazo").value        = "";
    document.getElementById("txtTasaInteres").value  = "";
 
    document.getElementById("spnTotalGastos").textContent  = "—";
    document.getElementById("spnDisponible").textContent    = "—";
    document.getElementById("spnCapacidadPago").textContent = "—";
    document.getElementById("spnInteresPagar").textContent  = "—";
    document.getElementById("spnTotalPrestamo").textContent = "—";
    document.getElementById("spnCuotaMensual").textContent  = "—";
 
    let spnEstado = document.getElementById("spnEstadoCredito");
    spnEstado.textContent = "ANALIZANDO...";
    spnEstado.style.color = "#C9A84C";
 
    limpiarTodosLosErrores();
}