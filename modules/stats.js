const urlBase = 'https://aulamindhub.github.io/amazing-api/events.json'

//import * as miModulo from "./index.js"
fetch(urlBase).then(response => response.json()).then(data => {

    console.log(filtrarCategorias(data.events, data.currentDate));
    categoriasPorGrupo = filtrarCategorias(data.events, data.currentDate)
    categoriasPast=filtrarCategoriasPast(data.events, data.currentDate)

    eventHighestPercentage(data.events, data.currentDate)
    pintar(padrePintar)
    filtrarCategorias(data.events, data.currentDate)
    pintarUpcomingEvents(padrePintar, categoriasPorGrupo)
    filtrarCategoriasPast(data.events, data.currentDate)
    pintarPastEvents(padrePintar, categoriasPast)
})
let categoriasPorGrupo = [];
let mayorPorcentaje = 0
let menorPorcentaje = 100
let mayorCapacidad = 0
let categoriasPast=[]

function eventHighestPercentage(array, data) {

    for (let i = 0; i < array.length; i++) {

        if (array[i].date < data) {
            let porcentajeAsistencia = (array[i].assistance * 100) / array[i].capacity
            /*  if(array[i].date<data || array[i].assistance>array[i++].assistance){
                 console.log(array[i].assistance);
             } */
            //console.log(porcentajeAsistencia);
            if (porcentajeAsistencia > mayorPorcentaje) {
                mayorPorcentaje = porcentajeAsistencia

                //console.log(mayorPorcentaje);
            }
            if (porcentajeAsistencia < menorPorcentaje) {
                menorPorcentaje = porcentajeAsistencia
                //console.log(menorPorcentaje);
            }
        }
        if (array[i].capacity > mayorCapacidad) {
            mayorCapacidad = array[i].capacity
        }
        if (array[i].date > data) {
            console.log(array[i].category);
            let categorias = new Set()
            categorias.add(array[i].estimate)
            categorias.add(array[i].capacity)
            console.log(categorias);
        }
    }
}
function pintar(divPadre) {
    let pintar = document.createElement('tbody')
    pintar.classList.add('tbody')
    pintar.innerHTML = `
    <tr >
                <th colspan="3" class="bg-secondary">
                  Event Statistics
                </th>
              </tr>
    <tr>
        <td>Events with highest % of assistance</td>
        <td>Events with lowest & of assistance</td>
        <td>Events with larger capacity</td>
    </tr>
    <tr>
    <td>${mayorPorcentaje.toFixed(2)}% </td>
    <td>${menorPorcentaje.toFixed(2)}% </td>
    <td>${mayorCapacidad}</td>
    </tr>
   `
    divPadre.appendChild(pintar)
}
let padrePintar = document.querySelector('.table')

function filtrarCategorias(data, currentDate) {
    let filtrarEventos = data.filter(evento => evento.date > currentDate)

    let conteo = filtrarEventos.reduce((acc, evento) => {
        let { category, capacity, estimate, price } = evento
        if (!acc[category]) {
            acc[category] = { capacity: 0, estimate: 0, ingresos: 0 }
        }
        acc[category].capacity += capacity
        acc[category].estimate += estimate
        acc[category].ingresos += estimate * price
        return acc;
    }, {})
    return Object.keys(conteo).map(categoria => ({
        categoria,
        capacidad: conteo[categoria].capacity,
        estimacion: conteo[categoria].estimate,
        ingresos: conteo[categoria].ingresos
    }))
}

function pintarUpcomingEvents(divPadre, categorias) {

    let pintarPast = document.createElement('tbody')
    pintarPast.classList.add('categories')
    pintarPast.innerHTML = `
        <tr >
                    <th colspan="3" class="bg-secondary">
                      Upcoming Events
                    </th>
                  </tr>
        <tr>
            <td>categories</td>
            <td>Revenues</td>
            <td>Percentage of assistance </td>
        </tr>
       `
    categorias.forEach(categoria => {
        let row = document.createElement('tr')
        row.innerHTML = `
        <td>${categoria.categoria}</td>
        <td>$ ${categoria.ingresos}</td>
        <td>${(categoria.estimacion * 100 / categoria.capacidad).toFixed(2)}%</td>
        `
        pintarPast.appendChild(row)
    })
    divPadre.appendChild(pintarPast)
}

function filtrarCategoriasPast(data, currentDate) {
    let filtrarEventosPast = data.filter(evento => evento.date < currentDate)

    let conteo = filtrarEventosPast.reduce((acc, evento) => {
        let { category, capacity, assistance, price } = evento
        if (!acc[category]) {
            acc[category] = { capacity: 0, assistance: 0, ingresos: 0 }
        }
        acc[category].capacity += capacity
        acc[category].assistance += assistance
        acc[category].ingresos += assistance * price
        return acc;
    }, {})
    return Object.keys(conteo).map(categoria => ({
        categoria,
        capacidad: conteo[categoria].capacity,
        assistance: conteo[categoria].assistance,
        ingresos: conteo[categoria].ingresos
    }))
}

function pintarPastEvents(divPadre, categorias) {

    let pintarPast = document.createElement('tbody')
    pintarPast.classList.add('categoriesPast')
    pintarPast.innerHTML = `
        <tr >
                    <th colspan="3" class="bg-secondary">
                      Past Events Statistics by Category
                    </th>
                  </tr>
        <tr>
            <td>categories</td>
            <td>Revenues</td>
            <td>Percentage of assistance </td>
        </tr>
       `
    categorias.forEach(categoria => {
        let row = document.createElement('tr')
        row.innerHTML = `
        <td>${categoria.categoria}</td>
        <td>$ ${categoria.ingresos}</td>
        <td>${(categoria.assistance*100 / categoria.capacidad).toFixed(2)}%</td>
        `
        pintarPast.appendChild(row)
    })
    divPadre.appendChild(pintarPast)
}
/* function pintarMayor(divPadre){
    let calculoMayor= document.createElement('td')
    calculoMayor.classList.add('mayorPorcentaje')
    calculoMayor.innerHTML=`<td>${mayorPorcentaje.toFixed(2)}% </td>
    
   `
    divPadre.appendChild(calculoMayor)
}
let padreMayor= document.querySelector('.eventHighest')


function pintarMenor(divPadre){
    let calculoMenor= document.createElement('td')
    calculoMenor.classList.add('menorPorcentaje')
    calculoMenor.innerHTML=`<td>${menorPorcentaje.toFixed(2)}% </td>
   `
    divPadre.appendChild(calculoMenor)

}
function pintarCapacity(divPadre){
    let calculoCapacidad= document.createElement('td')
    calculoCapacidad.classList.add('Capacidad')
    calculoCapacidad.innerHTML=`<td>${mayorCapacidad} </td>
   `
    divPadre.appendChild(calculoCapacidad)
} */