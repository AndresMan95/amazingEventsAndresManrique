
const urlBase='https://aulamindhub.github.io/amazing-api/events.json'
import * as miModulo from "./index.js"
function cargarDatos(){
  fetch(urlBase).then(response =>response.json()).then(data=>{console.log(data);
     pintarTarjetas(data.events, padreTarjeta, data.currentDate) 
     
    miModulo.pintarChecks(data.events, chequeo)
    aplicarFiltros(data)
     //miModulo.crearTarjeta(padreTarjeta)
   /*  miModulo.pintarTarjetas(data.events,padreTarjeta) */
    
   /*  pintarChecks(data.events, chequeo) */
    /* aplicarFiltros(data) */
  
    /* habilitarFiltros() */
  

  })
}

console.log(urlBase);
document.addEventListener('DOMContentLoaded', function () {
  cargarDatos()
  
  //miModulo.crearCheck()
  
  
 //  miModulo.aplicarFiltros()
  //miModulo.crearTarjeta()
  //miModulo.pintarChecks(  )
 
})








function pintarTarjetas(arregloPintar, divPadre,arreglo) {
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
    if (arregloPintar[i].date >arreglo) {
      miModulo.crearTarjeta(divPadre, arregloPintar[i])
    }
  }
  }
}

let padreTarjeta = document.querySelector("#card")

/* function crearTarjeta(padreTarjeta, tarjeta) {
  let nuevaTarjeta = document.createElement("div")
  nuevaTarjeta.classList.add("card")
  nuevaTarjeta.innerHTML = `<div class="card" style="width: 18rem;">
    <img src="${tarjeta.image}" class="card-img-top" alt="..." height="150vh" width="50vh">
    <div class="card-body" >
      <h5 class="card-title">${tarjeta.name}</h5>
      <p class="card-text" >${tarjeta.description} </p>
      <div class="detalles">
        <p>$${tarjeta.price}</p>
        <a href="/details.html?value=${tarjeta._id}" class="btn btn-primary">Details</a>
      </div>
    </div>
  </div>`

  padreTarjeta.appendChild(nuevaTarjeta)

} */
 
/* function pintarChecks(arregloPinta, padre) {
    padre.innerHTML = ''
  
    let categoriasUnicas = new Set()
    arregloPinta.forEach(evento=>{
      categoriasUnicas.add(evento.category)
    })
  
    categoriasUnicas.forEach(categoria=> {
      miModulo.crearCheck(padre,categoria)
    })
  } */



 let chequeo = document.querySelector('.listCheck')

/* 
function crearCheck(padreCheck, categoria) {
  let checkBox = document.createElement('div')
  checkBox.classList.add('div')
  checkBox.innerHTML = ` <div class="form-check form-check-inline">
<input class="form-check-input" type="checkbox" value="${categoria}">
<label class="form-check-label" for="inlineCheckbox1">${categoria}</label>
</div>`
  padreCheck.appendChild(checkBox)
} */



function aplicarFiltros(data) {
  let checkbox = document.querySelector('.listCheck')
  let textoBusqueda = document.getElementById('buscar')

  function filtrarEventos(){
    let texto=textoBusqueda.value.toLowerCase()
    let checkboxesSeleccionado = document.querySelectorAll('input[type=checkbox]:checked')
    let categoriasSeleccionadas= Array.from(checkboxesSeleccionado).map(checkbox=>checkbox.value)

    let eventosFiltrados =data.events.filter(evento=>{
      let coincideTexto=evento.name.toLowerCase().includes(texto)
      let coincideCategoria= categoriasSeleccionadas.length===0 || categoriasSeleccionadas.includes(evento.category)
      let coincideFecha = evento.date>data.currentDate
      return coincideTexto && coincideCategoria && coincideFecha
    })

      pintarTarjetas(eventosFiltrados, padreTarjeta,data.currentDate)
    
   
  }
  checkbox.addEventListener('change', filtrarEventos)
  textoBusqueda.addEventListener('input', filtrarEventos)
}

/* crearTarjeta(padreTarjeta, data.events[0]) */
/* pintarTarjetas(data.events, padreTarjeta) */
