//Declaración de variables
var numeroCuentaPersonal = 1234;//Numero de cuenta.
var nombreUsuario = "Cristian"; //El nombre del usuario.
var saldoCuenta = 7000;         //El saldo de la cuenta.
var limiteExtraccion = 2000;    //El limite de extraccion.
//Servicios generales
var agua = 350;                 //Servicio de Agua.
var telefono = 450;             //Servicio Teléfono.
var luz = 210;                  //Servicio de luz.
var internet = 570;              //Servicio de internet.

//Cuentas amigas
var cuentaAmiga1 = 2345;
var cuentaAmiga2 = 6789;

//Ejecución de las funciones que actualizan los valores de las variables en el HTML.
window.onload = function () {
    iniciarSesion();                                   //Incluyo la función para el inicio de sesion 
    cargarNombreEnPantalla();
    actualizarSaldoEnPantalla();
    actualizarLimiteEnPantalla();
}


//Funciones que tenes que completar

//funcion para sumar dinero depositado
function sumarDinero(monto) {
    saldoCuenta += monto;
    return saldoCuenta;
}
//Funcion para restar dinero
function restarDinero(monto) {
    saldoCuenta -= monto;
    return saldoCuenta;
}
// Funciones de validación de inicio de sesion

//Inicio de sesion
function iniciarSesion() {
    let ingresarACuenta = prompt("ingrese su numero de cuenta");
    if (ingresarACuenta == numeroCuentaPersonal) {
        alert("Bienvenida/o " + nombreUsuario + ".\n Ya puedes comenzar a realizar operaciones");
    } else {
        evaluarSesion(ingresarACuenta);
        sesionIncorrecta();
    }
}

function sesionIncorrecta() {
    nombreUsuario = " "; //El nombre del usuario.
    saldoCuenta = 0;         //El saldo de la cuenta.
    limiteExtraccion = 0;
}

function evaluarSesion(sesion) {
    let sesionIngresada = sesion;
    var codigoForzado = parseInt(sesionIngresada);
    if (sesionIngresada != codigoForzado) {    //EVALUAR ESTA SESION!!!!!!
        alert("clave forzada");
    } else if (sesionIngresada === null || sesionIngresada == false) {
        alert("No ingresó ninguna clave");
    } else if (isNaN(sesionIngresada)) {
        alert("Ingrese su clave numérica");
    }
}

//Estableciendo limite de extraccion.

function cambiarLimiteDeExtraccion() {
    let esteEsElNuevoLimite = prompt("ingrese su nuevo limite de extracción");
    let limiteIncorrecto = parseInt(esteEsElNuevoLimite)
    if (isNaN(esteEsElNuevoLimite) || esteEsElNuevoLimite == null || esteEsElNuevoLimite <= 0 || esteEsElNuevoLimite != limiteIncorrecto) {                   //Modifiqué la variable para verificar que el valor ingresado sea un número.
        alert('ingrese un monto válido');
    } else {
        limiteExtraccion = esteEsElNuevoLimite;
        alert("Este es su nuevo limite de extracción= $" + limiteExtraccion);

        actualizarLimiteEnPantalla();
    }
}

//Condiciones para extraer dinero.

function extraerDinero() {
    let dineroExtraccion = prompt("monto a extraer");
    let dineroExtraido = parseInt(dineroExtraccion);
    if ((isNaN(dineroExtraido)) || (dineroExtraido == null) || (dineroExtraido <= 0) || (dineroExtraccion != dineroExtraido)) {
        alert("ingrese un monto válido");
    }
    else if (dineroExtraido > limiteExtraccion) {                     //se verifica que la extracción no supere al limite
        alert("La cantidad de dinero que deseas extraer es mayor a tu límite de extracción")
    } else if (dineroExtraido > saldoCuenta) {                   //se verifica que la extracción no supere al saldo en cuenta
        alert("No hay saldo disponible en tu cuenta para extraer esa cantidad de dinero.")
    } else if (dineroExtraido % 100 !== 0) {                     //Solo otorga billetes de 100
        alert("Solo puedes extraer billetes de 100");
    } else {

        alert("Saldo anterior= $" + saldoCuenta + "\nDinero extraido= $" + dineroExtraido + "\nNuevo saldo= $" + restarDinero(dineroExtraido));
        actualizarSaldoEnPantalla();
    }
}



//Condiciones para depositar dinero
function depositarDinero() {
    let dineroIngresado = prompt("monto a depositar");
    let dineroDepositado = parseInt(dineroIngresado);
    if ((isNaN(dineroDepositado)) || (dineroDepositado == null) || (dineroDepositado <= 0) || (dineroIngresado != dineroDepositado)) {
        alert("ingreso incorrecto");
    } else {
        alert("Saldo anterior= $" + saldoCuenta + "\nDinero depositado= $" + dineroDepositado + "\nNuevo saldo= $" + sumarDinero(parseInt(dineroDepositado)));
        actualizarSaldoEnPantalla();
    }
}

//Abonar servicios
function abonarServicio(nombreServicio, servicio) {
    if (servicio > saldoCuenta) {
        alert("saldo insuficiente");
    } else {
        alert("Has pagado el servicio de " + nombreServicio + "\nSaldo anterior: " + saldoCuenta + "\nDinero descontado: " + servicio + "\nSaldo actual:" + (saldoCuenta -= servicio));
    }
    return;
}

function pagarServicio() {
    let seleccionServicio = parseInt(prompt("Seleccione el numero correspondiente con el servicio que desee pagar. \n1 - Agua \n2 = Luz \n3 - Internet \n4 - Teléfono"));

    switch (seleccionServicio) {
        case 1:
            abonarServicio("agua", agua);
            break;
        case 2:
            abonarServicio("luz", luz);
            break;
        case 3:
            abonarServicio("internet", internet);
            break;
        case 4:
            abonarServicio("telefono", telefono);
            break;
        default:
            alert("número inválido")
            break;
    }

    actualizarSaldoEnPantalla();
}

//Funcion de transferencia de montos

function transferirDinero() {
    var montoATransferir = prompt("Ingrese el monto a transferir:");
    if (saldoCuenta < montoATransferir) {
        alert("No puede transferirse esa cantidad de dinero.");
    } else if ((montoATransferir <= 0) || (isNaN(montoATransferir))) {
        alert("el monto ingresado es inválido");
    } else if (montoATransferir === null) {
        alert("No ingreso monto.");
    } else {
        var cuentaATransferir = prompt("Ingrese su cuenta amiga:");
        cuentaAmiga = parseInt(cuentaATransferir);
        if (cuentaAmiga === null || cuentaAmiga == false) {
            alert("No ingreso cuenta para la transferencia.");
        } else if ((cuentaAmiga != cuentaAmiga1 && cuentaAmiga != cuentaAmiga2)||(cuentaATransferir != cuentaAmiga)) {
            alert("ingrese una cuenta amiga válida");
        } else {
            restarDinero(montoATransferir);

            transferirACuentaAmiga(cuentaAmiga, montoATransferir);

        }
    }
}

function transferirACuentaAmiga(cuenta, monto) {
    alert("Monto transferido $" + monto + "\n" +
        "a la cuenta amiga: " + cuenta
    );
    actualizarSaldoEnPantalla();
}

//Funciones que actualizan el valor de las variables en el HTML
function cargarNombreEnPantalla() {
    document.getElementById("nombre").innerHTML = "Bienvenido/a " + nombreUsuario;
}

function actualizarSaldoEnPantalla() {
    document.getElementById("saldo-cuenta").innerHTML = "$" + saldoCuenta;
}

function actualizarLimiteEnPantalla() {
    document.getElementById("limite-extraccion").innerHTML = "Tu límite de extracción es: $" + limiteExtraccion;
}


