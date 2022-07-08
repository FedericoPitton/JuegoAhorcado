var boton_iniciar = document.querySelector('#boton_iniciar');
var boton_agregar = document.querySelector('#boton_agregar');
var boton_guardar = document.querySelector('#boton_guardar');
var boton_cancelar = document.querySelector('#boton_cancelar');
var boton_nuevo_juego = document.querySelector('#boton_nuevo_juego');   
var boton_desistir = document.querySelector('#boton_desistir');

boton_iniciar.addEventListener('click', function(e) {
    modificador_display(0);
});
boton_agregar.addEventListener('click', function(e) {
    modificador_display(1);
});
boton_guardar.addEventListener('click', function(e) {
    modificador_display(0);
});
boton_cancelar.addEventListener('click', function(e) {
    modificador_display(2);
});
boton_nuevo_juego.addEventListener('click', function(e) {
    alert("Empezando nuevo juego");
    modificador_display(0);
});
boton_desistir.addEventListener('click', function(e) {
    modificador_display(2);
});

/* --------------------------------*/
function modificador_display (num) {
    if  (num == 0) {
        document.getElementById("botones_iniciales").style.display = "none";
        document.getElementById("palabras_nuevas").style.display = "none";
        document.getElementById("juego").style.display = "grid";
    }else if (num == 1) {
        document.getElementById("botones_iniciales").style.display = "none";
        document.getElementById("palabras_nuevas").style.display = "grid";
        document.getElementById("juego").style.display = "none";
    } else if  (num == 2)  {
        document.getElementById("botones_iniciales").style.display = "block";
        document.getElementById("palabras_nuevas").style.display = "none";
        document.getElementById("juego").style.display = "none"; 
    }
}