var socket = io.connect('http://172.16.12.4:8081', { 'forceNew': true });

socket.on('messages', function (data) {
  console.log(data);
  render(data);
})

function render(data) {
  var html = data.map(function (elem, index) {
    let mostrar_expresiones = cadena_expresion(elem.text);
    return (`<div class="container-elements">
              <div id="expresiones">Usuario</div>
              <strong class="autor">${elem.author}</strong> 
              <div id="expresiones">Mensaje</div>
              <p class="message">${elem.text}</p>
              <p>----------------------------------------</p>
            </div> ${mostrar_expresiones}`);

  }).join(" ");

  document.getElementById('messages').innerHTML = html;
}

function addMessage(e) {
  var message = {
    author: document.getElementById('username').value,
    text: document.getElementById('texto').value
  };

  socket.emit('new-message', message);
  return false;
}

let cadena_expresion = (date) => {
  let numerosvocales;
  let numerospalabras;
  let cantidadnumeros;
  let numerosmayusculas;
  let novovales;

  let num_vocales = date.match(/[aeiouAEIOUáéíóú]/gi, "");
  let num_palabras = date.match(/[a-zA-Z]\S+/g, "");
  let cant_numeros = date.match(/[0-9]/g, "");
  let num_mayusculas = date.match(/(\b[A-Z|ÁÉÍÓÚ])[a-z|áéíóú|A-Z|ÁÉÍÓÚ]*/g, "");
  let no_vovales = date.match(/[^aeiou\W\d]\b/g, "");
  
//cantidad de vocales 
  if (num_vocales === null) {
    numerosvocales = 0;
  } else {
    numerosvocales = num_vocales.length;
  }
//cantiidad de palabras
  if (num_palabras === null) {
    numerospalabras = 0;
  } else {
    numerospalabras = num_palabras.length;
  }
//cantidad de numeros
  if (cant_numeros === null) {
    cantidadnumeros = 0;
  } else {
    cantidadnumeros = cant_numeros.length;
  }
//cantidad de mayusculas
  if (num_mayusculas === null) {
    numerosmayusculas = 0;
  } else {
    numerosmayusculas = num_mayusculas.length;
  }
//cantidad no vocales
  if (no_vovales === null) {
    novovales = 0;
  } else {
    novovales = no_vovales.length;
  }
  
  return `<p class="results"> 
          <div id="expresiones">Expresiones<div>
          num.vocales---> ${numerosvocales}<br> 
          num.palabras---> ${numerospalabras}<br>
          num.encontrados---> ${cantidadnumeros}<br>
          num.mayusculas---> ${numerosmayusculas}<br>  
          no vocales---> ${novovales}
          </p>`;
}
