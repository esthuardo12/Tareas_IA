function obtenerValorParametro(sParametroNombre) {
    var sPaginaURL = window.location.search.substring(1);
     var sURLVariables = sPaginaURL.split('&');
      for (var i = 0; i < sURLVariables.length; i++) {
        var sParametro = sURLVariables[i].split('=');
        if (sParametro[0] == sParametroNombre) {
          return sParametro[1];
        }
      }
     return null;
}
var turno = obtenerValorParametro('turno');
var estado = obtenerValorParametro('estado');
body = document.body.innerText = turno;
console.log("Turno: " + turno);
console.log("Estado: " + estado);
//body=document.body.innerTex = " Estado" + estado;
//body = document.body.innerText = 35;