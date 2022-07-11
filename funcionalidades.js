var boton_iniciar = document.querySelector('#boton_iniciar');
var boton_agregar = document.querySelector('#boton_agregar');
var boton_guardar = document.querySelector('#boton_guardar');
var boton_cancelar = document.querySelector('#boton_cancelar');
var boton_nuevo_juego = document.querySelector('#boton_nuevo_juego');   
var boton_desistir = document.querySelector('#boton_desistir');
var boton_jugar_nuevamente = document.querySelector('#boton_jugar_nuevamente');

const palabras_guardadas =  ["HOLA","AMIGO","PERRO","PELOTA"];
var palabra_adivinar = "";
var intentos = 1;
var letras_mal = "";
var letras_bien=0;

/*Variable y funcion para detectar ancho de ventana y
activar funciones responsive para celular y tablet*/
var anchoVentana = window.innerWidth;
window.onresize = function () {
    anchoVentana = window.innerWidth;
}
/*---------------------------------BOTONES---------------------------------*/

boton_jugar_nuevamente.addEventListener('click', function(e) {
    letras_bien=0;
    if (responsive_769px()) {
        iniciar_palabras_769px();
        } else {
            iniciar_palabras();
        }
    modificador_display(2);
    
});

boton_iniciar.addEventListener('click', function(e) {
    if (responsive_769px()) {
        iniciar_palabras_769px();
        } else {
            iniciar_palabras();
        }
    modificador_display(0);
    
});

boton_agregar.addEventListener('click', function(e) {
    modificador_display(1);
    
});

boton_guardar.addEventListener('click', function(e) {
    var palabra = document.getElementById('textarea_nueva_palabra').value;
    if (validar_palabras(palabra)) {
        palabras_guardadas.push(palabra.toUpperCase());
        document.getElementById('textarea_nueva_palabra').value = "";
        if (responsive_769px()) {
            iniciar_palabras_769px();
            } else {
                iniciar_palabras();
            }
        modificador_display(0);
    }
    
});

boton_cancelar.addEventListener('click', function(e) {
    document.getElementById('textarea_nueva_palabra').value = "";
    modificador_display(2);
    
});

boton_nuevo_juego.addEventListener('click', function(e) {
    if (responsive_769px()) {
        iniciar_palabras_769px();
        } else {
            iniciar_palabras();
        }

    modificador_display(0);
});

boton_desistir.addEventListener('click', function(e) {
    modificador_display(2);
});

/*---------------------------------FUNCIONES---------------------------------*/

function modificador_display (num) {
    if  (num == 0) {
        document.getElementById("botones_iniciales").style.display = "none";
        document.getElementById("ganaste_perdiste").style.display = "none";
        document.getElementById("palabras_nuevas").style.display = "none";
        document.getElementById("juego").style.display = "flex";
    }else if (num == 1) {
        document.getElementById("botones_iniciales").style.display = "none";
        document.getElementById("ganaste_perdiste").style.display = "none";
        document.getElementById("palabras_nuevas").style.display = "flex";
        document.getElementById("juego").style.display = "none";
    } else if  (num == 2)  {
        document.getElementById("botones_iniciales").style.display = "flex";
        document.getElementById("ganaste_perdiste").style.display = "none";
        document.getElementById("palabras_nuevas").style.display = "none";
        document.getElementById("juego").style.display = "none";
        document.getElementById("perder").style.display = "none";
        document.getElementById("trofeo").style.display = "none"; 
    }
}

function responsive_769px() {
    if  (anchoVentana<769) {
        document.getElementById("ingresar_letras").style.display = "flex";
        return true;
    } else  {
        document.getElementById("ingresar_letras").style.display = "none";
        return false;
    }

}
function validar_palabras(palabra) {
    if (palabra.length == 0) {
        alert("Debe ingresar una palabra");
        return false;
    } else if (palabra.length >8) {
        alert("Debe ingresar una palabra de maximo 8 letras");
        return  false;
    } else  {
        return true;
    }
}

/**
 * Funcion para sortear un numero alteatorio y 
 * obtener un indice de las palabras almacenadas
 * @returns una palabra almacenada para ser adivinada
 */
function palabra_random () {
    var min = 0;
    var max = palabras_guardadas.length-1;

    var x = Math.floor(Math.random()*(max-min+1)+min);
    return palabras_guardadas[x]
}

/**
 * Funcion para mostrar la cantidad de guiones correspondientes
 * al largo de la palabra
 */
function mostrar_guiones_letras() {
    for (var i = 1; i <= 8; i++) {
        document.getElementById("guion"+[i]).style.display = "block";
        document.getElementById("Letra"+[i]).style.display = "block";
    }
    for (var i = (8); i >=(palabra_adivinar.length+1) ; i--) {
        document.getElementById("guion"+[i]).style.display = "none";
        document.getElementById("Letra"+[i]).style.display = "none";
    }

}

/**
 * Funcion para iniciar el juego en su totalidad llamando
 * a las diferentes funciones que lo componen
 */
function iniciar_palabras() {
    intentos=1;
    palabra_adivinar=palabra_random();
    mostrar_guiones_letras();
    detectar_letra_ingresada();
    ganar_perder();
    reiniciar_ahorcado();
}

function iniciar_palabras_769px() {
    intentos=1;
    palabra_adivinar=palabra_random();
    mostrar_guiones_letras();
    detectar_letra_769px();
    ganar_perder();
    reiniciar_ahorcado();
}



/**
 * Funcion que recibe una letra y la mostrara en el lugar
 * correspondiente de los espacios textarea
 * @param {*} letra 
 */
function mostrar_letras (letra) {
    for (var i = 1; i <= palabra_adivinar.length ; i++) {
        if (palabra_adivinar[i-1] == letra) {
            document.getElementById("Letra"+[i]).value = letra;
        }
    }
}
/**
 * Funcion para detectar eventos del teclado y ver si la letra
 * esta o no en la palabra_adivinar
 */
function detectar_letra_ingresada() {
    document.addEventListener("keydown", function(e) {
        var letra = e.key.toUpperCase();
        document.getElementById("ingresar_letras").value ="";
        if (palabra_adivinar.includes(letra)) {
            mostrar_letras(letra);
            ganar_perder();
        } else if (!letras_mal.includes(letra)) {
            intentos +=1;
            mostrar_ahorcado();
            letras_mal = letras_mal+"  "+letra;
            document.getElementById("letras_mal").value = letras_mal;}
            ganar_perder();
        })
    }

function detectar_letra_769px() {
    var txt_ingresar_letras = document.getElementById("ingresar_letras");
    txt_ingresar_letras.addEventListener('input', () => {
        let input = txt_ingresar_letras.value;
        if ( input.length <=1 ) {
            var letra =  txt_ingresar_letras.value.toUpperCase();
            if (palabra_adivinar.includes(letra)) {
                mostrar_letras(letra);
                ganar_perder();
            } else if (!letras_mal.includes(letra)) {
                intentos +=1;
                mostrar_ahorcado();
                letras_mal = letras_mal+"  "+letra;
                document.getElementById("letras_mal").value = letras_mal;
                ganar_perder();
            }
            setTimeout(() => {
                txt_ingresar_letras.value = input.slice( 0, -1 );
            }, 100)
        }
    });   
}
/**
 * Funcion para reiniciar imagenes del ahorcado a 1 de las 10
 * y reiniciar letras a null
 */
function reiniciar_ahorcado() {
    document.getElementById("ingresar_letras").value ="";

    document.getElementById("ahorcado1").style.display = "block";
    for (var i = 2; i <=10; i++) {
        document.getElementById("ahorcado"+[i]).style.display = "none";
    }

    for (var i = 1; i <= palabra_adivinar.length ; i++) {
        document.getElementById("Letra"+[i]).value = "";
    }
    document.getElementById("letras_mal").value ="";
    letras_mal="";
}
/**
 * Funcion para mostrar ahorcado correspondiente a los intentos realizados
 */
function mostrar_ahorcado() {
    for (var i = 1; i <=10 ; i++) {  
        if  (i != intentos) {
            document.getElementById("ahorcado"+[i]).style.display = "none";
        } else   {document.getElementById("ahorcado"+[i]).style.display = "block";}
    }
}

/**
 * Funcion para verificar si se gana o se pierde y mostrar
 * resultado correspondiente
 */
function ganar_perder() {
    if (intentos==10) {
        document.getElementById("ganaste_perdiste").style.display = "flex";
        document.getElementById("perder").style.display = "block";
        document.getElementById("ganaste_perdiste_label").innerHTML= "La palabra era "+palabra_adivinar;
        letras_bien = 0;
    } else if (validar_ganar()) {
        document.getElementById("ganaste_perdiste").style.display = "flex";
        document.getElementById("trofeo").style.display = "block";
        document.getElementById("ganaste_perdiste_label").innerHTML= "Ganaste";
    }
}

/**
 * Funcion para validar si se gano o aun no
 * @returns true si se gano
 */
function validar_ganar() {
    var palabra = ""

    for(var i = 1; i <= palabra_adivinar.length ; i++) {
        var letra =""
        letra = document.getElementById("Letra"+[i]).value
        palabra = palabra+letra;
        
    }

    if  (palabra==palabra_adivinar) {
        return true
    }

}

