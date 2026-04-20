//AQUI EL JAVASCRIPT PARA MANIPULAR EL HTML

function calcular() {
    let ingresos = parseFloat(document.getElementById("txtIngresos").value);
    let egresos  = parseFloat(document.getElementById("txtEgresos").value);
 
    let disponible = calcularDisponible(ingresos, egresos);
    document.getElementById("spnDisponible").textContent = "USD " + disponible;

    let capacidadPago = calcularCapacidadPago(disponible);
    document.getElementById("spnCapacidadPago").textContent = "USD " + capacidadPago;

    let monto = parseInt(document.getElementById("txtMonto").value);
    let plazo = parseInt(document.getElementById("txtPlazo").value);
    let tasa  = parseInt(document.getElementById("txtTasaInteres").value);

    let interes = calcularInteresSimple(monto, tasa, plazo);
    document.getElementById("spnInteresPagar").textContent = "USD " + interes;

    let totalPagar = calcularTotalPagar(monto, interes);
    document.getElementById("spnTotalPrestamo").textContent = "USD " + totalPagar;

    let cuotaMensual = calcularCuotaMensual(totalPagar, plazo);
    document.getElementById("spnCuotaMensual").textContent = "USD " + cuotaMensual;

    let aprobado = aprobarCredito(capacidadPago, cuotaMensual);
 
    let spnEstado = document.getElementById("spnEstadoCredito");
 
    if (aprobado) {
        spnEstado.textContent = "CREDITO APROBADO";
        spnEstado.style.color = "green";
    } else {
        spnEstado.textContent = "CREDITO RECHAZADO";
        spnEstado.style.color = "red";
    }
}