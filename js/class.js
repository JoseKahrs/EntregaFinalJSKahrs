/* CREACION OBJETO DE AUTOS */
class Auto {
    constructor (id, marca, modelo, ano, tipo, precio, imagen){
      this.id = id,
      this.marca = marca,
      this.modelo = modelo, 
      this.ano = ano, 
      this.tipo = tipo,
      this.precio = precio,
      this.imagen = imagen,
      this.cantidad = 1
    }
    mostrarInfoAuto () {
      console.log (`El auto ${i}, es marca ${marca}, su modelo es ${modelo}, del ano ${ano}, tipo ${tipo} y su precio es de $${precio}`)
    }
    catAuto () {
      console.log (this.id, this.marca, this.modelo, this.ano, this.tipo, this.precio)
    }
    sumarDias(){
      this.cantidad++
      return this.cantidad
    }
    restarDias(){
      this.cantidad = this.cantidad -1
      return this.cantidad
    }
  }

  const cargarGaraje = async () =>{
    const resp = await fetch("autos.json")
    const infoAutos = await resp.json()
    for(let auto of infoAutos){
        let autoNuevo = new Auto (auto.id, auto.marca, auto.modelo, auto.ano, auto.tipo, auto.precio, auto.imagen)
        garaje.push(autoNuevo)
    }
    localStorage.setItem("garaje", JSON.stringify(garaje))
}

let garaje = []
 if(localStorage.getItem("garaje")){
     
     for(let auto of JSON.parse(localStorage.getItem("garaje"))){
         let autoStorage = new Auto (auto.id, auto.marca, auto.modelo, auto.ano, auto.tipo, auto.precio, auto.imagen)
        garaje.push(autoStorage)
    }

}else{
    console.log("seteamos por primera vez")
    cargarGaraje()
    
}
let reservasCarrito = JSON.parse(localStorage.getItem("reservas")) ?? []