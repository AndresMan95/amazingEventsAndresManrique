const urlBase='https://aulamindhub.github.io/amazing-api/events.json'
export function cargarDatos(){
  fetch(urlBase).then(response =>response.json()).then(data=>{console.log(data);
    pintarTarjetas(data.events, padreTarjeta)
    pintarChecks(data.events, chequeo)
    aplicarFiltros(data)
    mostrarDatos(data)
    /* crearTarjeta(padreTarjeta,tarjeta) */
    /* habilitarFiltros() */
  })
  .catch(error => console.error('Error fetching data:', error));
}

console.log(urlBase);
document.addEventListener('DOMContentLoaded', function () {
 
  cargarDatos(urlBase)
})
/* console.log(filtrarEventos(data1)); */

function mostrarDatos (data){
  let datos=data.events[0]._id
  return datos
}    

export function pintarTarjetas(arregloPintar, divPadre) {
  divPadre.innerHTML = ''

  if(arregloPintar.length===0){
    let mensaje= document.createElement('div')
    mensaje.classList.add('no-eventos')
    mensaje.innerHTML=`<div class="alert alert-primary" role="alert">
    No hay eventos que coincidan con la busqueda
  </div>`
    divPadre.appendChild(mensaje)
  }else{
    for (let i = 0; i < arregloPintar.length; i++) {
      crearTarjeta(divPadre, arregloPintar[i])
    }
  }
}
export let padreTarjeta = document.querySelector("#card")

/* crearTarjeta(padreTarjeta, data.events[0]) */


export function crearTarjeta(padreTarjeta, tarjeta) {
  let nuevaTarjeta = document.createElement("div")
  nuevaTarjeta.classList.add("card")
  nuevaTarjeta.innerHTML = `<div  class="card" style="width: 18rem;">
    <img src="${tarjeta.image}" class="card-img-top" alt="..." height="150vh" width="50vh">
    <div class="card-body" >
      <h5 class="card-title">${tarjeta.name}</h5>
      <p class="card-text" >${tarjeta.description} </p>
      <div class="detalles">
        <p>$${tarjeta.price}</p>
        <a href="/pages/details.html?value=${tarjeta._id}" id="${tarjeta._id}" class="btn btn-primary">Details</a>
      </div>
    </div>
  </div>`

  padreTarjeta.appendChild(nuevaTarjeta)

}


export function pintarChecks(arregloPinta, padre) {
  padre.innerHTML = ''

  let categoriasUnicas = new Set()
  arregloPinta.forEach(evento=>{
    categoriasUnicas.add(evento.category)
  })

  categoriasUnicas.forEach(categoria=> {
    crearCheck(padre,categoria)
  })
}
export let chequeo = document.querySelector('.listCheck')
//pintarChecks(data.events, chequeo)

export function crearCheck(padreCheck, categoria) {
  let checkBox = document.createElement('div')
  checkBox.classList.add('div')
  checkBox.innerHTML = ` <div  class="form-check form-check-inline">
<input class="form-check-input" type="checkbox" value="${categoria}">
<label class="form-check-label" for="inlineCheckbox1">${categoria}</label>
</div>`
  padreCheck.appendChild(checkBox)
}

/* document.addEventListener('DOMContentLoaded', function () {
  aplicarFiltros()
}
) */
export function aplicarFiltros(data) {
  let checkboxContainer = document.querySelector('.listCheck');
  let textoBusqueda = document.getElementById('buscar');

  function filtrarEventos() {
    let texto = textoBusqueda.value.toLowerCase();
    let checkboxesSeleccionados = document.querySelectorAll('input[type=checkbox]:checked');
    let categoriasSeleccionadas = Array.from(checkboxesSeleccionados).map(checkbox => checkbox.value);

    // Filtrar eventos basados en texto, categoría y fecha
    let eventosFiltrados = data.events.filter(evento => {
      let coincideTexto = evento.name.toLowerCase().includes(texto);
      let coincideCategoria = categoriasSeleccionadas.length === 0 || categoriasSeleccionadas.includes(evento.category);
      let coincideFecha = evento.date < data.currentDate; // Ajusta según sea necesario para eventos pasados o futuros

      return coincideTexto && coincideCategoria && coincideFecha;
    });

    pintarTarjetas(eventosFiltrados, padreTarjeta);
  }

/* 
  // Desactivar los elementos de entrada hasta que las tarjetas se carguen
  textoBusqueda.disabled = true;
  checkboxContainer.querySelectorAll('input[type=checkbox]').forEach(checkbox => {
    checkbox.disabled = true;
  });

  // Activar los elementos de entrada después de que las tarjetas se hayan cargado
  window.addEventListener('load', () => {
    textoBusqueda.disabled = false;
    checkboxContainer.querySelectorAll('input[type=checkbox]').forEach(checkbox => {
      checkbox.disabled = false;
    });
  }); */

  checkboxContainer.addEventListener('change', filtrarEventos);
  textoBusqueda.addEventListener('input', filtrarEventos);

}
/* function habilitarFiltros() {
  textoBusqueda.disabled = false;
  chequeo.querySelectorAll('input[type=checkbox]').forEach(checkbox => {
    checkbox.disabled = false;
  });
} */