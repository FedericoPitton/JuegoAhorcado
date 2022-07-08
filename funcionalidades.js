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


boton_jugar_nuevamente.addEventListener('click', function(e) {
    letras_bien=0;
    iniciar_palabras();
    modificador_display(2);
    
});

boton_iniciar.addEventListener('click', function(e) {
    iniciar_palabras();
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
        iniciar_palabras();
        modificador_display(0);
    }
    
});

boton_cancelar.addEventListener('click', function(e) {
    document.getElementById('textarea_nueva_palabra').value = "";
    modificador_display(2);
    
});

boton_nuevo_juego.addEventListener('click', function(e) {

    iniciar_palabras();

    modificador_display(0);
});

boton_desistir.addEventListener('click', function(e) {
    modificador_display(2);
});



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

function palabra_random () {
    var min = 0;
    var max = palabras_guardadas.length-1;

    var x = Math.floor(Math.random()*(max-min+1)+min);
    return palabras_guardadas[x]
}

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

function iniciar_palabras() {
    intentos=1;
    palabra_adivinar=palabra_random();
    mostrar_guiones_letras();
    detectar_letra_ingresada();
    ganar_perder();
    ocultar_letras();
    reiniciar_ahorcado();
    
}

function ocultar_letras() {
    for (var i = 1; i <= palabra_adivinar.length ; i++) {
        document.getElementById("Letra"+[i]).value = "";
    }
    document.getElementById("letras_mal").value ="";
    letras_mal="";
}

function mostrar_letras (letra) {
    for (var i = 1; i <= palabra_adivinar.length ; i++) {
        if (palabra_adivinar[i-1] == letra) {
            document.getElementById("Letra"+[i]).value = letra;
        }
    }
}

function detectar_letra_ingresada() {
    document.addEventListener("keydown", function(e) {
        var letra = e.key.toUpperCase();
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

function reiniciar_ahorcado() {
    document.getElementById("ahorcado1").style.display = "block";
    for (var i = 2; i <=10; i++) {
        document.getElementById("ahorcado"+[i]).style.display = "none";
    }
}

function mostrar_ahorcado() {
    for (var i = 1; i <=10 ; i++) {  
        if  (i != intentos) {
            document.getElementById("ahorcado"+[i]).style.display = "none";
        } else   {document.getElementById("ahorcado"+[i]).style.display = "block";}
    }
}

function ganar_perder() {
    if (intentos==10) {
        document.getElementById("ganaste_perdiste").style.display = "flex";
        document.getElementById("perder").style.display = "block";
        document.getElementById("ganaste_perdiste_label").innerHTML= "Perdiste";
        letras_bien = 0;
    } else if (validar_ganar()) {
        document.getElementById("ganaste_perdiste").style.display = "flex";
        document.getElementById("trofeo").style.display = "block";
        document.getElementById("ganaste_perdiste_label").innerHTML= "Ganaste";
    }
}

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