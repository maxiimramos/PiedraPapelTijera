var posibilidades = ["piedra", "papel", "tijera"];

// Configuración de la aplicación: 

//Botones

document.querySelectorAll("button")[0].addEventListener("click", introducirUsuario); // Selecciona todos los elementos 'button' en el documento
document.querySelectorAll("button")[1].addEventListener("click", generarTirada);     // y elige el botón en la posición 0, 1 y 2 para agregar
document.querySelectorAll("button")[2].addEventListener("click", resetear);          // los event listeners


// Opciones del jugador

var opciones = document.getElementsByTagName("img");                                  // Selección de elementos
for (var i = 0; i < opciones.length-1; i++) {
	opciones[i].id = posibilidades[i];                                                // Recorre los elementos <img> seleccionados en el paso 
	opciones[i].src = crearRutaImagen(posibilidades[i], "Jugador");                   // anterior excepto el último y asigna un ID y la ruta de
	opciones[i].addEventListener("click", seleccionaTiradaJugador, false);            // la imagen al atributo src de cada elemento <img> basándose
}                                                                                     // en los elementos del array 'posibilidades' 


// Comienzo de la partida

var nombre = "";                                                                       // Almacenar el nombre de usuario        
function comprobarNombre(nombreAComprobar) {                                            
	if ((nombreAComprobar.length > 3) && (isNaN(nombreAComprobar[0]))) {               // Esta función verifica si el nombre almacenado cumple con
		return true;                                                                   // los criterios requeridos en el enunciado
	} else {
		return false;
	}
}

function introducirUsuario() {
    let nombreIntroducido = document.querySelector("input[name='nombre']");             // Utilizo document.querySelector para seleccionar los elementos
    let partidas = document.querySelector("input[name='partidas']");                    // de entrada ('input') por su atributo 'name'
    
    if (!comprobarNombre(nombreIntroducido.value)) {
        nombreIntroducido.classList.add("fondoRojo");
    } else if (partidas.value <= 0) {
        nombreIntroducido.classList.remove("fondoRojo");
        partidas.classList.add("fondoRojo");
    } else {
        nombreIntroducido.classList.remove("fondoRojo");
        partidas.classList.remove("fondoRojo");
        nombre = nombreIntroducido.value;
        total.innerHTML = partidas.value;
        nombreIntroducido.disabled = true;
        partidas.disabled = true;
    }
}


// Elección y tirada

var maquina = document.getElementsByTagName("img")[document.getElementsByTagName("img").length-1]; // Selección del último elemento <img> y lo almacena la variable'máquina'

function valorAleatorio(listaPosibilidades) {                                                      // Esta función toma una lista de posibilidades y devuelve 
	let aleatorio = Math.floor(Math.random() * listaPosibilidades.length);                         // un elemento aleatorio de esa lista
	return listaPosibilidades[aleatorio] ;
}

function crearRutaImagen(valor, tipo) {                                                             // Toma un valor y un tipo y devuelve la ruta de la imagen
	return "img/" + valor + tipo + ".png";                                                          // concatenando estos valores
}

function generarTirada() {
    if (Number(actual.innerHTML) < Number(total.innerHTML)) {                                       // Realiza una tirada de la máquina cuando se cumplen las         
        let tiradaMaquina = valorAleatorio(posibilidades);                                          // condiciones necesarias y actualiza la interfaz en consecuencia
        maquina.src = crearRutaImagen(tiradaMaquina, "Ordenador");
        maquina.id = tiradaMaquina;
        actual.innerHTML = Number(actual.innerHTML) + 1;
        calcularResultado(tiradaMaquina);
    }
}


function seleccionaTiradaJugador(e) {                                                                // Esta función se encarga de gestionar la apariencia visual               
	e.target.classList.add("seleccionado");                                                          // de las opciones del jugador. Cuando el jugador selecciona una 
	e.target.classList.remove("noSeleccionado");                                                     // opción, se le añaden las clases correspondientes para resaltarla
                                                                                                     // visualmente y las demás opciones se ajustan para reflejar que             
	for (var j = 0; j < opciones.length-1; j++) {                                                    // no están seleccionadas
		if (opciones[j] != e.target) {
			opciones[j].classList.remove("seleccionado");
			opciones[j].classList.add("noSeleccionado");
		}
	}
}

// Historial de partidas

function calcularResultado(tirada) {
	for (var i = 0; i < opciones.length-1; i++) {                                                      // Bucle sobre las opciones del jugador y encuentra la opción que               
		if (opciones[i].classList == "seleccionado") {                                                 // tiene la clase 'seleccionado', luego almacena el ID de esa misma
			var seleccionado = opciones[i].id;                                                         // opción en la variable 'seleccionado'
		}
	}

	if ((posibilidades.indexOf(maquina.id) == posibilidades.indexOf(seleccionado)-1) || ((posibilidades.indexOf(maquina.id) == posibilidades.length-1) && (posibilidades.indexOf(seleccionado) == 0))) {
		historial.innerHTML += "<li>Gana " + nombre +"</li>\n";
	} else if (posibilidades.indexOf(maquina.id) == posibilidades.indexOf(seleccionado)) {              // Para la determinación del resultado comparo las posiciones de la 
		historial.innerHTML += "<li>Empate</li>\n";                                                     // tirada de la máquina y la tirada del jugador en el array 'posibilidades'
	} else {                                                                                            // Si la tirada del jugador está en una posición anteso es la última        
		historial.innerHTML += "<li>Gana la máquina</li>\n";                                            // respecto a la tirada de la máquina, el jugador gana
	}
}

function resetear() {
	let nombreIntroducido = document.getElementsByTagName("input")[0];                                  // Para habilitar el campo de 'nombre'        
	let partidas = document.getElementsByTagName("input")[1];                                           // Para habilitar el campo de 'partidas'
	nombreIntroducido.disabled = false;
	partidas.disabled = false;
	partidas.value = 0;                                                                                 // Restablecer el valor del campo de partidas a 0
	total.innerHTML = "0";
	actual.innerHTML = "0";
	for (var j = 0; j < opciones.length-1; j++) {
		opciones[j].classList.remove("seleccionado");                                                    // Elimina las clases 'seleccionado y noSeleccionado' de todas las 
		opciones[j].classList.remove("noSeleccionado");                                                  // opciones del jugador
	}
	opciones[0].classList.add("seleccionado");                                                           // Añade la clase 'seleccionado' a la primera opción del jugador
	opciones[opciones.length-1].src = crearRutaImagen("", "defecto");;                                   // Utilizando la función 'crearRutaImagen configura la imagen de la 
	historial.innerHTML += "<li>Nueva partida</li>\n";                                                   // última opción del jugador
}
