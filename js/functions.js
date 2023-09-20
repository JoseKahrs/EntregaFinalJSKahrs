let nameUser = prompt("Ingrese su nombre")
while (nameUser == "" || nameUser >= 0) {
  nameUser = prompt("Por favor, ingrese su nombre")
}

let horario = parseInt(prompt("Por favor ingrese su hora local"))

while (horario > 24 || isNaN(horario)) {
    horario = parseInt(prompt("Por favor ingrese su hora local, entre las 0h y 24hs"))
}

if (horario >= 6 && horario <= 12){
  alert (`✋Buenos dias ${nameUser}! Bienvenido/a al simulador`)
  console.log (`El nombre del usuario es ${nameUser} y ha ingresado a las ${horario}hs`)
}else if (horario >= 13 && horario <= 19){
  alert (`✋Buenas tardes ${nameUser}! Bienvenido/a al simulador`)
  console.log (`El nombre del usuario es ${nameUser} y ha ingresado a las ${horario}hs`)
}else{
  alert (`Buenas noches ${nameUser}! Bienvenido/a al simulador`)
  console.log (`✋El nombre del usuario es ${nameUser} y ha ingresado a las ${horario}hs`)
}
/* OBJETOS */
//Autos
class Auto {
  constructor (id, marca, modelo, ano, tipo, precio){
    this.id = id,
    this.marca = marca,
    this.modelo = modelo, 
    this.ano = ano, 
    this.tipo = tipo,
    this.precio = precio
  }
  mostrarInfoAuto () {
    console.log (`El auto ${i}, es marca ${marca}, su modelo es ${modelo}, del ano ${ano}, tipo ${tipo} y su precio es de $${precio}`)
  }
  catAuto () {
    console.log (this.id, this.marca, this.modelo, this.ano, this.tipo, this.precio)
  }

}

const auto1 = new Auto (1, "Bmw", "Serie 3", 2022, "sedan", 1000)
const auto2 = new Auto (2, "Bmw", "X6", 2021, "suv", 2000)
const auto3 = new Auto (3, "Audi", "A3", 2021, "sedan", 800)
const auto4 = new Auto (4, "Audi", "R8", 2020, "coupe", 3500)
const auto5 = new Auto (5, "Mercedes-benz", "Clase a", 2020, "berlina", 900)
const auto6 = new Auto (6, "Mercedes-benz", "Sl", 2023, "cabrio", 3000)
const auto7 = new Auto (7, "Porsche", "Macan", 2022, "suv", 2300)
const auto8 = new Auto (8, "Porsche", "Cayenne", 2023, "suv", 2500)
const auto9 = new Auto (9, "Ford", "Mustang", 2020, "coupe", 2600)
const auto10 = new Auto (10, "Ford", "Raptor", 2022, "4x4", 1800)

/* ARRAYS */
//Autos
const garaje = []
garaje.push (auto1, auto2, auto3, auto4, auto5, auto6, auto7, auto8, auto9, auto10)

/* FUNCIONES */

/* MOSTRAR CATALOGO */
function mostrarGaraje (array) {
  let catalogo = ``
  for (let auto of array) {
    console.log (auto.id, auto.marca, auto.modelo, auto.ano, auto.tipo, auto.precio)
    catalogo += `${auto.id} ${auto.marca} ${auto.modelo} ${auto.ano} ${auto.tipo} ${auto.precio} \n`
  }
  alert (catalogo)
}

/* AGREGAR UN AUTO */
function agregarAuto (array) {
  let marca = prompt(`Ingrese la marca del vehiculo`)
  while (marca == "") {
    marca = prompt(`Por favor. ingrese la marca del vehiculo`)
  }
  let modelo = prompt(`Ingrese el modelo del vehiculo ${marca}`)
  while (modelo == "") {
    modelo = prompt(`Por favor. ingrese el modelo del vehiculo`)
  }
  let ano = parseInt(prompt(`Ingrese el ano del vehiculo ${marca} ${modelo}`))
  while (isNaN(ano) || ano <= 2000) {
    ano = parseInt(prompt(`Ingrese el ano (con valores numericos y mayor al ano 2000) del vehiculo ${marca} ${modelo}`))
  }
  let tipo = prompt(`Ingrese el tipo de vehiculo \n sedan, suv, coupe, deportivo, cabrio, berlina`)
  let newCar = (`auto agregado: \n Marca:${marca}\n Modelo:${modelo}\n Ano: ${ano}\n Tipo: ${tipo}`)
  let precio = parseInt(prompt(`Ingrese el precio del ${newCar}`))
  while (isNaN(precio)) {
    precio = parseInt(prompt(`Ingrese el precio del ${newCar}`))
  }
  
  const nuevoAuto = new Auto (garaje.length+1, marca, modelo, ano, tipo, precio)
  console.log (nuevoAuto)
  garaje.push (nuevoAuto)
  alert (`Se agrego el siguiente vehiculo: \n Marca:${marca}\n Modelo:${modelo}\n Ano: ${ano}\n Tipo: ${tipo}\n Precio: $${precio}`)
}
/* ELIMINAR UN AUTO */
function borrarAuto (array) {
  
  mostrarGaraje (array)
  let idEliminar = parseInt(prompt(`Observar el catalogo en consola y seleccionar ID a eliminar`))
  let coincidencia = false 
  for (let auto of array) {
    if (auto.id == idEliminar) {
      let indice = array.indexOf (auto)
      array.splice (indice, 1)
      mostrarGaraje (array)
    }
  }
    if (!coincidencia) {
      console.log (`El id ${idEliminar} no coincide con el id de ningun auto. No se pudo eliminar`)
    }
}

/* MENU PARA BUSCADOR */
function menuBusqueda () {
  let exitMenu = false

  do{
    let opcionIngresada = parseInt(prompt(`Seleccione una opcion de busqueda \n
    1 - Busqueda por marca
    2 - Busqueda por ano
    0 - Volver a menu principal`))
    switch(opcionIngresada){
      case 1:
        console.log (`Opcion uno: Busqueda por marca`)
        buscarMarca (garaje)
      break
      case 2: 
        console.log (`Opcion dos: Busqueda por ano`)
        buscarAno (garaje)
      break
      case 0:
        console.log(`Atras: Menu principal`)
        exitMenu = true
      break
      default:
        console.log("Opción no válida, ingrese alguna presente en el menu")
        alert (`Opción no válida, ingrese alguna presente en el menu`)
      break
    }
  }while(!exitMenu)
}

/* BUSCAR UN AUTO */

// POR MARCA
function buscarMarca (array) {
  let marcaBuscada = prompt(`Ingrese la marca que desea buscar`)
  console.log (`La busqueda del usuario fue: ${marcaBuscada}`)
  let busquedaMarca = array.filter (
    (auto) => auto.marca.toLowerCase () == marcaBuscada.toLowerCase ()
  )
  if (busquedaMarca.length == 0) {
    console.log (`No hay coincidencias con ${marcaBuscada}`)
    alert (`No hay coincidencia con su busqueda: ${marcaBuscada}`)
  }
  else {
    mostrarGaraje(busquedaMarca)
  }
}

//POR ANO
function buscarAno (array) {
  let anoBuscado = parseInt(prompt(`Ingrese el ano que desea buscar`))
  while (isNaN(anoBuscado)) {
    anoBuscado = parseInt(prompt(`Ingrese el ano (de forma numerica) que desea buscar`))
  }
  let busquedaAno = array.filter (
    (auto) => auto.ano == anoBuscado
    )
    if (busquedaAno.length == 0) {
    console.log (`No hay coincidencias para el ano ${anoBuscado} que se busca`)
    alert (`No hay coincidencias para el ano ${anoBuscado} que usted busca`)
  }
  else {
    mostrarGaraje(busquedaAno)
  }
}

/* ORDENAR ALFABETICAMENTE */
function ordenAlfabetico (array) {
  let ordenAlfa = array.concat ()
  ordenAlfa.sort (
    (a,b) => {
      if (a.marca > b.marca) {
        return 1
      }
      if (a.marca < b.marca) {
        return -1
      }
      return 0
    }
    )
    mostrarGaraje (ordenAlfa)
  }

  /* ORDENAR POR ANO */
  function ordenarMenorMayor (array) {
    let arrayMenorMayor = array.concat ()
    arrayMenorMayor.sort (
      (ano1, ano2) => ano1.ano - ano2.ano
      )
      mostrarGaraje (arrayMenorMayor)
}

// POR PRECIO
function ordenarPrecio (array) {
  let salirMenu = false
  do {
    let opcionIngresada = parseInt(prompt(`Seleccione en que orden desea ordenar los precios \n
    1 - Menor a mayor
    2 - Mayor a menor
    0 - Volver a menu principal`))
      switch(opcionIngresada){
        case 1:
          console.log ("Opcion uno: Menor a mayor")
          precioMenor (garaje)
        break
        case 2:
          console.log ("Opcion dos: Mayor a menor")
          precioMayor (garaje)
        break
        case 0:
          console.log ("Opcion 0: Atras")
          salirMenu = true
        break
        default:
          console.log("Opción no válida, ingrese alguna presente en el menu")
          alert (`Opción no válida, ingrese alguna presente en el menu`)
        break
      }
    }while(!salirMenu)
}

//Precio menor a mayor
function precioMenor (array) {
  let precioMenorMayor = array.concat ()
  precioMenorMayor.sort (
    (precio1, precio2) => precio1.precio - precio2.precio
  )
  mostrarGaraje (precioMenorMayor)
}

//Precio mayor a menor
function precioMayor (array) {
  let precioMenorMayor = array.concat ()
  precioMenorMayor.sort (
    (precio1, precio2) => precio2.precio - precio1.precio
  )
  mostrarGaraje (precioMenorMayor)
}

//Calculo Alquiler
function calculoAlquiler (auto) {
  mostrarGaraje (auto)
  let idAlquiler = parseInt(prompt(`Mire la consola y ingrese el id del auto que desea alquilar`))
  while (isNaN(idAlquiler)) {
    idAlquiler = parseInt(prompt(`Mire la consola y ingrese el id del auto que desea alquilar`))
  }
  let autoAlquilado = auto.find (
    (auto) => auto.id == idAlquiler
  )
  let dias = parseInt(prompt(`Ingrese la cantidad de dias que desea alquilar el vehiculo`))
  while (isNaN(dias)) {
    dias = parseInt(prompt(`Ingrese la cantidad de dias que desea alquilar el vehiculo`))
  }
  let total = 0
  total = dias * autoAlquilado.precio
  console.log (`Desea alquilar el auto ${autoAlquilado.id}, marca ${autoAlquilado.marca}, modelo ${autoAlquilado.modelo}, durante ${dias} dias y el costo total es de $${total}`)
  alert (`Desea alquilar el auto ${autoAlquilado.id}, marca ${autoAlquilado.marca}, modelo ${autoAlquilado.modelo}, durante ${dias} dias y el costo total es de $${total}`)
}

//MENU do while y switch 
let salirMenu = false

do{
let opcionIngresada = parseInt(prompt(`Bienvenido/a a nuestro simulador! \nIngrese la opción deseada \n
   1 - Ver catalogo de autos
   2 - Agregar un Auto
   3 - Eliminar un Auto
   4 - Buscar un Auto
   5 - Ordenar alfabeticamente
   6 - Ordenar por ano
   7 - Ordenar por precio
   8 - Calcular alquiler
   0 - Salir del menu`))
   switch(opcionIngresada){
      case 1:
        console.log("Opción uno: Autos")
        mostrarGaraje (garaje)
      break
      case 2:
        console.log("Opción dos: Agregar un auto")
        agregarAuto (garaje)
      break
      case 3:
        console.log("Opción tres: Eliminar un auto")
        borrarAuto (garaje)
      break         
      case 4:
        console.log("Opción cuatro: Buscar un auto")
        menuBusqueda(garaje)
      break         
      case 5:
        console.log("Opción cinco: Ordenar Alfabeticamente")
        ordenAlfabetico (garaje)
      break         
      case 6:
        console.log("Opción seis: Ordenar por ano")
        ordenarMenorMayor (garaje)
      break         
      case 7:
        console.log("Opción siete: Ordenar por precio")
        ordenarPrecio (garaje)
      break         
      case 8:
        console.log("Opción ocho: Calcular alquiler")
        calculoAlquiler (garaje)
      break         
      case 0:
        console.log(`Gracias por utilizar nuestra app. Saludos!`)
        alert (`Gracias por utilizar nuestra app. Saludos!`)
        salirMenu = true
      break   
      default:
        console.log("Opción no válida, ingrese alguna presente en el menu")
        alert (`Opción no válida, ingrese alguna presente en el menu`)
      break
   }
}while(!salirMenu)