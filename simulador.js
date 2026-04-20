// AQUI EL JAVASCRIPT PARA MANIPULAR EL HTML
// ============================================================
// VALIDACIONES
// ============================================================
 
// Muestra un error debajo del campo y pone borde rojo
function mostrarError(campoId, wrapperId, mensaje) {
    let span = document.getElementById(campoId);
    let wrap = document.getElementById(wrapperId);
 
    span.textContent = mensaje;
    span.style.display = "block";
    wrap.classList.add("input-error");
}
 
// Limpia el error de un campo
function limpiarError(campoId, wrapperId) {
    let span = document.getElementById(campoId);
    let wrap = document.getElementById(wrapperId);
 
    span.textContent = "";
    span.style.display = "none";
    wrap.classList.remove("input-error");
}
 
// Limpia todos los errores del formulario
function limpiarTodosLosErrores() {
    limpiarError("err-ingresos", "wrap-ingresos");
    limpiarError("err-egresos",  "wrap-egresos");
    limpiarError("err-monto",    "wrap-monto");
    limpiarError("err-plazo",    "wrap-plazo");
    limpiarError("err-tasa",     "wrap-tasa");
}
 
// Valida todos los campos y retorna true si todo está correcto
function validarFormulario(ingresos, egresos, monto, plazo, tasa) {
 
    let formularioValido = true;
 
    // --- VALIDAR INGRESOS ---
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
 
    // --- VALIDAR EGRESOS ---
    let txtEgresos = document.getElementById("txtEgresos").value.trim();
 
    if (txtEgresos === "") {
        mostrarError("err-egresos", "wrap-egresos", "El campo egresos es obligatorio.");
        formularioValido = false;
    } else if (isNaN(egresos)) {
        mostrarError("err-egresos", "wrap-egresos", "Ingresa un número válido.");
        formularioValido = false;
    } else if (egresos < 0) {
        mostrarError("err-egresos", "wrap-egresos", "Los egresos no pueden ser negativos.");
        formularioValido = false;
    } else if (egresos > 99999) {
        mostrarError("err-egresos", "wrap-egresos", "Los egresos no pueden superar $99,999.");
        formularioValido = false;
    } else if (egresos >= ingresos) {
        mostrarError("err-egresos", "wrap-egresos", "Los egresos deben ser menores a los ingresos.");
        formularioValido = false;
    }
 
    // --- VALIDAR MONTO ---
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
 
    // --- VALIDAR PLAZO ---
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
 
    // --- VALIDAR TASA ---
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
 
// ============================================================
// FUNCIÓN PRINCIPAL
// ============================================================
 
function calcular() {
 
    // Limpiar errores anteriores
    limpiarTodosLosErrores();
 
    // Leer valores
    let ingresos = parseFloat(document.getElementById("txtIngresos").value);
    let egresos  = parseFloat(document.getElementById("txtEgresos").value);
    let monto    = parseInt(document.getElementById("txtMonto").value);
    let plazo    = parseInt(document.getElementById("txtPlazo").value);
    let tasa     = parseInt(document.getElementById("txtTasaInteres").value);
 
    // Si hay errores, detener la ejecución
    let formularioValido = validarFormulario(ingresos, egresos, monto, plazo, tasa);
 
    if (!formularioValido) {
        return;
    }
 
    // --- Calcular y mostrar disponible ---
    let disponible = calcularDisponible(ingresos, egresos);
    document.getElementById("spnDisponible").textContent = "USD " + disponible;
 
    // --- Calcular y mostrar capacidad de pago ---
    let capacidadPago = calcularCapacidadPago(disponible);
    document.getElementById("spnCapacidadPago").textContent = "USD " + capacidadPago;
 
    // --- Calcular y mostrar interés ---
    let interes = calcularInteresSimple(monto, tasa, plazo);
    document.getElementById("spnInteresPagar").textContent = "USD " + interes;
 
    // --- Calcular y mostrar total ---
    let totalPagar = calcularTotalPagar(monto, interes);
    document.getElementById("spnTotalPrestamo").textContent = "USD " + totalPagar;
 
    // --- Calcular y mostrar cuota mensual ---
    let cuotaMensual = calcularCuotaMensual(totalPagar, plazo);
    document.getElementById("spnCuotaMensual").textContent = "USD " + cuotaMensual;
 
    // --- Aprobar o rechazar el crédito ---
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
 
// ============================================================
// REINICIAR
// ============================================================
 
function reiniciar() {
    document.getElementById("txtIngresos").value    = "";
    document.getElementById("txtEgresos").value     = "";
    document.getElementById("txtMonto").value       = "";
    document.getElementById("txtPlazo").value       = "";
    document.getElementById("txtTasaInteres").value = "";
 
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