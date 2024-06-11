
const urlBase='https://aulamindhub.github.io/amazing-api/events.json'
import * as miModulo from "./index.js"
function cargarDatos(){
  fetch(urlBase).then(response =>response.json()).then(data=>{console.log(data);
     pintarTarjetas(data.events, padreTarjeta,data.currentDate) 
     aplicarFiltros(data)
     miModulo.pintarChecks(data.events, chequeo)
  })
}

console.log(urlBase);
document.addEventListener('DOMContentLoaded', function () {
  cargarDatos() 
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
    if (arregloPintar[i].date <arreglo) {
      miModulo.crearTarjeta(divPadre, arregloPintar[i])
    }
  }}}

let padreTarjeta = document.querySelector("#card")
let chequeo = document.querySelector('.listCheck')

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
      let coincideFecha = evento.date<data.currentDate
      return coincideTexto && coincideCategoria && coincideFecha
    })

      pintarTarjetas(eventosFiltrados, padreTarjeta,data.currentDate)
    
   
  }
  checkbox.addEventListener('change', filtrarEventos)
  textoBusqueda.addEventListener('input', filtrarEventos)
}