const urlBase='https://aulamindhub.github.io/amazing-api/events.json'
//import * as miModulo from "./index.js"

  fetch(urlBase).then(response =>response.json()).then(data=>{console.log(data);
      pintarTarjetas(data.events, padreTarjeta, data.currentDate) 
  })

let value = window.location.href
value = new URL(value).searchParams.get('value')
console.log(value);
document.getElementById('tarjet').addEventListener('DOMContentLoaded', function () {
    pintarTarjetas()
}
)
function pintarTarjetas(arregloPintar, divPadre) {

    for (let i = 0; i < arregloPintar.length; i++) {
        if (arregloPintar[i]._id == value) {
            console.log(arregloPintar[i])
            crearTarjeta(divPadre,arregloPintar[i])
        }

    }

}
let padreTarjeta=document.querySelector('#tarjet')

//pintarTarjetas(data.events,padreTarjeta)

function crearTarjeta(padreTarjeta,tarjeta){
    let nuevaTarjeta = document.createElement("div")
            nuevaTarjeta.classList.add("tarjet")
            nuevaTarjeta.innerHTML = `
            <div class="row">
              <div id='col' class="col bg-white ">
                <img class="img-fluid object-fit-cover " src=${tarjeta.image} alt="cine">
              </div>
              <div class="col bg-white "  >
                <h3 class="text-center">
                  ${tarjeta.name}
                </h3>
                <p class="text-start">
                  Date:  ${tarjeta.date}
                </p>
                <p class="text-start">
                  Description: ${tarjeta.description}
                </p>
                <p class="text-start">
                Category: ${tarjeta.category}
                </p>
                <p class="text-start">
                  Place: ${tarjeta.place}
                </p>
                <p class="text-start">
                  Capacity: ${tarjeta.capacity}
                </p>
                <p class="text-start">
                ${tarjeta.assistance? 'Assistance':'Estimate'} : ${tarjeta.assistance? tarjeta.assistance:tarjeta.estimate}
                </p>
                <p class="text-start">
                  Price: $${tarjeta.price}
                </p>
              </div>
            </div>`

        padreTarjeta.appendChild(nuevaTarjeta)
}

/* function pintarTarjeta(arregloPintar, divPadre) {
    for (let i = 0; i < arregloPintar.length; i++) {

        if (data.events[i]._id) {
            crearDetalle(divPadre, arregloPintar[i])
        }

    }
}



let details = document.querySelector(".table")
crearDetalle(details, data.events[0])
function crearDetalle(details, tarjeta) {
    let detalle = document.createElement("tarjet")
    detalle.classList.add("row")
    detalle.innerHTML = `<div class="tarjet">
    <div class="row">
      <div class="col bg-white ">
        <img class="img-fluid object-fit-cover " src="${tarjeta.image}" alt="cine">
      </div>
      <div class="col bg-white " >
        <h3 class="text-center">
          ${tarjeta.name}
        </h3>
        <p class="text-start">
          Event data...
        </p>
        <p class="text-start">
          Event data...
        </p>
        <p class="text-start">
          Event data...
        </p>
        <p class="text-start">
          Event data...
        </p>
        
      </div>
    </div>
  </div>`
    details.appendChild(detalle)
}
document.addEventListener('DOMContentLoaded', function() {
    // Obtener el ID del parámetro de la URL
    var urlParams = new URLSearchParams(window.location.search);
    var eventId = urlParams.get('id');
  
    // Ahora puedes usar el ID en la página "details.html"
    console.log(eventId); // Esto mostrará el ID en la consola
  
    // Aquí puedes hacer lo que necesites con el ID, como cargar los detalles del evento correspondiente
  }); */