const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Colores para la consola
const RESET = "\x1b[0m";
const BLANCO = "\x1b[97m";
const ROJO = "\x1b[91m";
const VERDE = "\x1b[92m";
const AMARILLO = "\x1b[93m";
const CIAN = "\x1b[96m";
const MAGENTA = "\x1b[95m";

const FONDO_AZUL = "\x1b[48;5;24m";
const FONDO_VERDE = "\x1b[48;5;22m";
const FONDO_ROJO = "\x1b[48;5;52m";
const FONDO_AMARILLO = "\x1b[48;5;58m";

// ==========================================
// SUPERCLASE: PERSONA
// ==========================================
class Persona {
    #nombre;
    #apellidos;
    #telefono;
    #correo;

    constructor(nombre, apellidos, telefono, correo) {
        this.#nombre = nombre;
        this.#apellidos = apellidos;
        this.#telefono = telefono;
        this.#correo = correo;
    }

    getNombreCompleto() {
        return `${this.#nombre} ${this.#apellidos}`;
    }

    getTelefono() {
        return this.#telefono;
    }

    getCorreo() {
        return this.#correo;
    }

    mostrarInformacion() {
        console.log(`Nombre: ${CIAN}${this.getNombreCompleto()}${RESET}`);
        console.log(`Teléfono: ${CIAN}${this.#telefono}${RESET}`);
        console.log(`Correo: ${CIAN}${this.#correo}${RESET}`);
    }
}

// ==========================================
// SUBCLASE: HUESPED (HERENCIA DE PERSONA)
// ==========================================
class Huesped extends Persona {
    #tipoDocumento;
    #documento;
    #fechaNacimiento;
    #edad;

    constructor(tipoDocumento, documento, fechaNacimiento, edad, nombre, apellidos, telefono, correo) {
        super(nombre, apellidos, telefono, correo);
        this.#tipoDocumento = tipoDocumento;
        this.#documento = documento;
        this.#fechaNacimiento = fechaNacimiento;
        this.#edad = edad;
    }

    mostrarInformacion() {
        console.log(`${BLANCO}DATOS DEL HUÉSPED${RESET}`);
        console.log(`Documento: ${CIAN}${this.#tipoDocumento} - ${this.#documento}${RESET}`);
        super.mostrarInformacion();
        console.log(`Edad: ${CIAN}${this.#edad} años${RESET}`);
    }
}

// ==========================================
// SUPERCLASE: HABITACION
// ==========================================
class Habitacion {
    #numero;
    #tipo;
    #capacidad;
    #precio;
    #estado;

    constructor(numero, tipo, capacidad, precio) {
        this.#numero = numero;
        this.#tipo = tipo;
        this.#capacidad = capacidad;
        this.#precio = precio;
        this.#estado = "Disponible";
    }

    getNumero() { return this.#numero; }
    getTipo() { return this.#tipo; }
    getCapacidad() { return this.#capacidad; }
    getPrecio() { return this.#precio; }
    getEstado() { return this.#estado; }

    reservar() {
        this.#estado = "Reservada";
    }

    estaDisponible() {
        return this.#estado === "Disponible";
    }

    mostrarInformacion() {
        console.log(`${CIAN}Habitación ${this.#numero}${RESET}`);
        console.log(`   Tipo: ${this.#tipo}`);
        console.log(`   Capacidad: ${this.#capacidad} persona(s)`);
        console.log(`   Precio: ${VERDE}$${this.#precio.toLocaleString("es-CO")}${RESET} por noche`);
        console.log(`   Estado: ${this.#estado === "Disponible" ? VERDE : ROJO}${this.#estado}${RESET}`);
    }
}

// ==========================================
// SUBCLASES DE HABITACION (HERENCIA DE HABITACION)
// ==========================================
class HabitacionSencilla extends Habitacion {
    constructor(numero, precio) {
        super(numero, "Sencilla", 1, precio);
    }
}

class HabitacionDoble extends Habitacion {
    constructor(numero, precio) {
        super(numero, "Doble", 2, precio);
    }
}

class HabitacionFamiliar extends Habitacion {
    constructor(numero, precio) {
        super(numero, "Familiar", 4, precio);
    }
}

class HabitacionSuite extends Habitacion {
    constructor(numero, precio) {
        super(numero, "Suite", 4, precio);
    }
}

// ==========================================
// CLASE: ALIMENTACION
// ==========================================
class Alimentacion {
    #nombre;
    #precio;

    constructor(nombre, precio) {
        this.#nombre = nombre;
        this.#precio = precio;
    }

    getNombre() { return this.#nombre; }
    getPrecio() { return this.#precio; }

    mostrarInformacion() {
        console.log(`Plan: ${CIAN}${this.#nombre}${RESET}`);
        console.log(`Precio: ${VERDE}$${this.#precio.toLocaleString("es-CO")}${RESET} por persona/noche`);
    }
}

// ==========================================
// CLASE: RESERVA
// ==========================================
class Reserva {
    #numeroReserva;
    #huesped;
    #habitacion;
    #personas;
    #fechaEntrada;
    #fechaSalida;
    #noches;
    #alimentacion;
    #total;

    constructor(numeroReserva, huesped, habitacion, personas, fechaEntrada, fechaSalida, noches, alimentacion) {
        this.#numeroReserva = numeroReserva;
        this.#huesped = huesped;
        this.#habitacion = habitacion;
        this.#personas = personas;
        this.#fechaEntrada = fechaEntrada;
        this.#fechaSalida = fechaSalida;
        this.#noches = noches;
        this.#alimentacion = alimentacion;
        this.#total = this.calcularTotal();
    }

    calcularTotal() {
        const valorHabitacion = this.#habitacion.getPrecio() * this.#noches;
        const valorAlimentacion = this.#alimentacion.getPrecio() * this.#personas * this.#noches;
        return valorHabitacion + valorAlimentacion;
    }

    getNumeroReserva() { return this.#numeroReserva; }
    getTotal() { return this.#total; }

    mostrarInformacion() {
        console.log(`${MAGENTA}RESERVA #${this.#numeroReserva}${RESET}`);
        separador();
        this.#huesped.mostrarInformacion();
        separador();

        console.log(`${BLANCO}HABITACIÓN${RESET}`);
        console.log(`Número: ${CIAN}${this.#habitacion.getNumero()}${RESET}`);
        console.log(`Tipo: ${CIAN}${this.#habitacion.getTipo()}${RESET}`);
        console.log(`Personas: ${CIAN}${this.#personas}${RESET}`);
        console.log(`Precio por noche: ${VERDE}$${this.#habitacion.getPrecio().toLocaleString("es-CO")}${RESET}`);
        separador();

        console.log(`${BLANCO}FECHAS DE LA RESERVA${RESET}`);
        console.log(`Entrada: ${CIAN}${this.#fechaEntrada}${RESET}`);
        console.log(`Salida: ${CIAN}${this.#fechaSalida}${RESET}`);
        console.log(`Noches: ${CIAN}${this.#noches}${RESET}`);
        separador();

        console.log(`${BLANCO}ALIMENTACIÓN${RESET}`);
        this.#alimentacion.mostrarInformacion();
        separador();

        console.log(`${BLANCO}VALORES${RESET}`);
        const valorHabitacion = this.#habitacion.getPrecio() * this.#noches;
        const valorAlimentacion = this.#alimentacion.getPrecio() * this.#personas * this.#noches;

        console.log(`Habitación: ${VERDE}$${valorHabitacion.toLocaleString("es-CO")}${RESET}`);
        console.log(`Alimentación: ${VERDE}$${valorAlimentacion.toLocaleString("es-CO")}${RESET}`);
        console.log(`\n${FONDO_AMARILLO}\x1b[30m TOTAL A PAGAR: $${this.#total.toLocaleString("es-CO")} ${RESET}`);
    }
}

// ==========================================
// CLASE: HOTEL
// ==========================================
class Hotel {
    #nombre;
    #habitaciones;
    #reservas;

    constructor(nombre) {
        this.#nombre = nombre;
        this.#habitaciones = [];
        this.#reservas = [];
    }

    agregarHabitacion(habitacion) {
        this.#habitaciones.push(habitacion);
    }

    agregarReserva(reserva) {
        this.#reservas.push(reserva);
    }

    obtenerHabitacionesDisponibles() {
        return this.#habitaciones.filter(habitacion => habitacion.estaDisponible());
    }

    obtenerNumeroReserva() {
        return this.#reservas.length + 1;
    }

    mostrarHabitaciones() {
        titulo("HABITACIONES DEL HOTEL");
        if (this.#habitaciones.length === 0) {
            mensajeError("No existen habitaciones registradas.");
            return;
        }
        this.#habitaciones.forEach(habitacion => {
            habitacion.mostrarInformacion();
            console.log();
        });
    }

    mostrarReservas() {
        titulo("RESERVAS REGISTRADAS");
        if (this.#reservas.length === 0) {
            console.log(`${AMARILLO}No existen reservas registradas.${RESET}`);
            return;
        }
        this.#reservas.forEach(reserva => {
            reserva.mostrarInformacion();
            console.log("\n");
            separador();
        });
    }

    mostrarInformacion() {
        console.log(`${BLANCO}Hotel: ${CIAN}${this.#nombre}${RESET}`);
        console.log(`Habitaciones registradas: ${this.#habitaciones.length}`);
        console.log(`Reservas registradas: ${this.#reservas.length}`);
    }
}

// ==========================================
// FUNCIONES AUXILIARES
// ==========================================
function preguntar(mensaje) {
    return new Promise((resolve) => rl.question(mensaje, resolve));
}

function limpiar() { console.clear(); }

function titulo(texto) {
    console.log(`\n${FONDO_AZUL}${BLANCO}==============================================${RESET}`);
    console.log(`${FONDO_AZUL}${BLANCO}              ${texto}${RESET}`);
    console.log(`${FONDO_AZUL}${BLANCO}==============================================${RESET}\n`);
}

function separador() {
    console.log(`${CIAN}----------------------------------------------${RESET}`);
}

function mensajeError(texto) {
    console.log(`\n${FONDO_ROJO}${BLANCO}  ERROR: ${texto}  ${RESET}\n`);
}

function mensajeCorrecto(texto) {
    console.log(`\n${FONDO_VERDE}${BLANCO}  ${texto}  ${RESET}\n`);
}

async function pedirTexto(mensaje) {
    while (true) {
        let dato = await preguntar(`${AMARILLO}${mensaje}${RESET}`);
        if (dato.trim() !== "") return dato.trim();
        mensajeError("Este campo no puede quedar vacío.");
    }
}

async function pedirNumero(mensaje) {
    while (true) {
        let numero = Number(await preguntar(`${AMARILLO}${mensaje}${RESET}`));
        if (!isNaN(numero) && numero > 0) return numero;
        mensajeError("Debe ingresar un número válido.");
    }
}

async function seleccionarDocumento() {
    while (true) {
        titulo("TIPO DE DOCUMENTO");
        console.log(`${CIAN}1.${RESET} Cédula de ciudadanía`);
        console.log(`${CIAN}2.${RESET} Cédula de extranjería`);
        console.log(`${CIAN}3.${RESET} Pasaporte`);

        let opcion = Number(await preguntar(`\n${AMARILLO}Seleccione el tipo de documento: ${RESET}`));
        if (opcion === 1) return "Cédula de ciudadanía";
        if (opcion === 2) return "Cédula de extranjería";
        if (opcion === 3) return "Pasaporte";

        mensajeError("Seleccione una opción entre 1 y 3.");
    }
}

async function pedirFechaNacimiento() {
    while (true) {
        let fecha = await pedirTexto("Fecha de nacimiento (AAAA-MM-DD): ");
        let nacimiento = new Date(fecha);
        let hoy = new Date();

        if (isNaN(nacimiento.getTime())) {
            mensajeError("La fecha no es válida.");
            continue;
        }

        if (nacimiento >= hoy) {
            mensajeError("La fecha de nacimiento no puede ser futura.");
            continue;
        }

        let edad = hoy.getFullYear() - nacimiento.getFullYear();
        let mes = hoy.getMonth() - nacimiento.getMonth();

        if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
            edad--;
        }

        if (edad < 18) {
            mensajeError(`El huésped debe ser mayor de edad. Edad registrada: ${edad} años.`);
            continue;
        }

        return { fecha: fecha, edad: edad };
    }
}

async function seleccionarHabitacion(hotel) {
    while (true) {
        titulo("HABITACIONES DISPONIBLES");
        let disponibles = hotel.obtenerHabitacionesDisponibles();

        if (disponibles.length === 0) {
            mensajeError("No hay habitaciones disponibles.");
            return null;
        }

        disponibles.forEach((habitacion, index) => {
            console.log(`${CIAN}${index + 1}.${RESET} Habitación ${habitacion.getNumero()}`);
            console.log(`    Tipo: ${habitacion.getTipo()}`);
            console.log(`    Capacidad: ${habitacion.getCapacidad()} persona(s)`);
            console.log(`    Precio: ${VERDE}$${habitacion.getPrecio().toLocaleString("es-CO")}${RESET} por noche\n`);
        });

        let opcion = Number(await preguntar(`${AMARILLO}Seleccione una habitación (1-${disponibles.length}): ${RESET}`));

        if (!isNaN(opcion) && opcion >= 1 && opcion <= disponibles.length) {
            return disponibles[opcion - 1];
        }

        mensajeError("Seleccione una habitación válida.");
    }
}

async function seleccionarAlimentacion() {
    while (true) {
        titulo("PLAN DE ALIMENTACIÓN");
        console.log(`${CIAN}1.${RESET} Desayuno - ${VERDE}$20.000${RESET}`);
        console.log(`${CIAN}2.${RESET} Almuerzo - ${VERDE}$25.000${RESET}`);
        console.log(`${CIAN}3.${RESET} Cena - ${VERDE}$25.000${RESET}`);
        console.log(`${CIAN}4.${RESET} Combo - ${VERDE}$60.000${RESET}`);

        let opcion = Number(await preguntar(`\n${AMARILLO}Seleccione el plan: ${RESET}`));

        if (opcion === 1) return new Alimentacion("Desayuno", 20000);
        if (opcion === 2) return new Alimentacion("Almuerzo", 25000);
        if (opcion === 3) return new Alimentacion("Cena", 25000);
        if (opcion === 4) return new Alimentacion("Combo", 60000);

        mensajeError("Seleccione una opción entre 1 y 4.");
    }
}

async function pedirFechas() {
    while (true) {
        titulo("FECHAS DE LA RESERVA");
        let fechaEntrada = await pedirTexto("Fecha de entrada (AAAA-MM-DD): ");
        let fechaSalida = await pedirTexto("Fecha de salida (AAAA-MM-DD): ");

        let entrada = new Date(fechaEntrada);
        let salida = new Date(fechaSalida);

        if (isNaN(entrada.getTime()) || isNaN(salida.getTime())) {
            mensajeError("Una de las fechas no es válida.");
            continue;
        }

        if (salida <= entrada) {
            mensajeError("La fecha de salida debe ser posterior a la entrada.");
            continue;
        }

        let diferencia = salida - entrada;
        let noches = diferencia / (1000 * 60 * 60 * 24);

        return { entrada: fechaEntrada, salida: fechaSalida, noches: noches };
    }
}

async function registrarReserva(hotel) {
    limpiar();
    titulo("HOTEL PARAÍSO REAL");

    let numeroReserva = hotel.obtenerNumeroReserva();
    console.log(`${MAGENTA}Nueva reserva #${numeroReserva}${RESET}\n`);

    titulo("DATOS DEL HUÉSPED");
    let tipoDocumento = await seleccionarDocumento();
    let documento = await pedirTexto("\nNúmero de documento: ");
    let fechaNacimiento = await pedirFechaNacimiento();
    let nombre = await pedirTexto("Nombre: ");
    let apellidos = await pedirTexto("Apellidos: ");
    let telefono = await pedirTexto("Teléfono: ");
    let correo = await pedirTexto("Correo electrónico: ");

    let huesped = new Huesped(
        tipoDocumento, documento, fechaNacimiento.fecha, fechaNacimiento.edad,
        nombre, apellidos, telefono, correo
    );

    let habitacion = await seleccionarHabitacion(hotel);
    if (habitacion === null) return null;

    let personas;
    if (habitacion.getCapacidad() === 1) {
        personas = 1;
        mensajeCorrecto("Habitación sencilla: 1 persona automáticamente.");
    } else {
        while (true) {
            personas = await pedirNumero(`Número de personas (máximo ${habitacion.getCapacidad()}): `);
            if (personas <= habitacion.getCapacidad()) break;
            mensajeError(`Esta habitación permite máximo ${habitacion.getCapacidad()} personas.`);
        }
    }

    let fechas = await pedirFechas();
    let alimentacion = await seleccionarAlimentacion();

    let reserva = new Reserva(
        numeroReserva, huesped, habitacion, personas,
        fechas.entrada, fechas.salida, fechas.noches, alimentacion
    );

    habitacion.reservar();
    hotel.agregarReserva(reserva);

    limpiar();
    titulo("RESUMEN DE RESERVA");
    reserva.mostrarInformacion();
    console.log(`\n${FONDO_VERDE}${BLANCO}       RESERVA REGISTRADA       ${RESET}\n`);

    return reserva;
}

async function menu(hotel) {
    let salir = false;

    while (!salir) {
        limpiar();
        titulo("HOTEL PARAÍSO REAL");
        hotel.mostrarInformacion();
        console.log();
        separador();
        console.log(`${CIAN}1.${RESET} Registrar reserva`);
        console.log(`${CIAN}2.${RESET} Mostrar habitaciones`);
        console.log(`${CIAN}3.${RESET} Mostrar reservas`);
        console.log(`${CIAN}4.${RESET} Salir`);
        separador();

        let opcion = Number(await preguntar(`\n${AMARILLO}Seleccione una opción: ${RESET}`));

        switch (opcion) {
            case 1:
                await registrarReserva(hotel);
                await preguntar(`\n${AMARILLO}Presione ENTER para continuar...${RESET}`);
                break;
            case 2:
                limpiar();
                hotel.mostrarHabitaciones();
                await preguntar(`\n${AMARILLO}Presione ENTER para continuar...${RESET}`);
                break;
            case 3:
                limpiar();
                hotel.mostrarReservas();
                await preguntar(`\n${AMARILLO}Presione ENTER para continuar...${RESET}`);
                break;
            case 4:
                salir = true;
                break;
            default:
                mensajeError("Seleccione una opción entre 1 y 4.");
                await preguntar(`\n${AMARILLO}Presione ENTER para continuar...${RESET}`);
        }
    }

    limpiar();
    titulo("HOTEL PARAÍSO REAL");
    console.log(`${FONDO_VERDE}${BLANCO}       SISTEMA FINALIZADO       ${RESET}\n`);
    rl.close();
}

// Instanciación utilizando clases hijas (Herencia)
const hotel = new Hotel("Hotel Paraíso Real");
hotel.agregarHabitacion(new HabitacionSencilla(101, 100000));
hotel.agregarHabitacion(new HabitacionDoble(102, 150000));
hotel.agregarHabitacion(new HabitacionFamiliar(201, 220000));
hotel.agregarHabitacion(new HabitacionSuite(301, 350000));

menu(hotel);