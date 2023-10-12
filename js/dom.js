  /* CAPTURAS DE ID */
  let garajeAutos = document.getElementById("garaje")
  let formAddCar= document.getElementById("formAddCar")
  let addCarBtn = document.getElementById("addCarBtn")
  let selectOrden = document.getElementById("selectOrden")
  let buscador = document.getElementById("buscador")
  let coincidenciasDiv = document.getElementById("coincidenciasDiv")
  let formCoti = document.getElementById("formCoti")
  let resultCot = document.getElementById("resultCot")
  let cotizarBtn = document.getElementById("cotizarBtn")
  let formEliminar = document.getElementById("formEliminar");
  let autosReservadosModal = document.getElementById("autosReservadosModal")
  let reservasBtn = document.getElementById("reservasBtn")
  let precioTotal = document.getElementById("precioTotal")
  let reservarBtn = document.getElementById("reservarBtn")
  let finalizarReservaBtn = document.getElementById("finalizarReserva")
  let feachaDiv = document.getElementById("fechaDiv")
  let eliminarBtnModal = document.getElementById("eliminarBtnModal")
  /* FUNCIONES */

  /* MOSTRAR GARAJE */
  function mostrarGarajeDOM(array) {
    garajeAutos.innerHTML = "";
    for (let auto of array) {
      let autoNuevoDiv = document.createElement("div");
      autoNuevoDiv.className = "col-12 col-md-3 col-lg-3 m-2";
      autoNuevoDiv.innerHTML = `
        <div id="${auto.id}" class="card text-center text-bg-dark border border-light" style="width: 18rem;">
          <img src="./img/${auto.imagen}" class="card-img-top" alt="${auto.marca} ${auto.modelo}">
          <div class="card-body">
            <h4 class="card-title">${auto.marca} ${auto.modelo}</h4>
            <p class="card-text">ID: ${auto.id}</p>
            <p class="card-text">Año: ${auto.ano}</p>
            <p class="card-text">Tipo: ${auto.tipo}</p>
            <p class="card-text text-danger fs-5 text fw-semibold">Precio / Dia: $${auto.precio}</p>
            <p class="card-text">Precio Total: $<span id="precioTotal${auto.id}">${auto.precio}</span></p>
            <div class="input-group mb-3">
              <button class="btn btn-outline-secondary" type="button" id="restarDias${auto.id}">-</button>
              <input type="number" class="form-control text-center" id="diasInput${auto.id}" value="1" min="1">
              <button class="btn btn-outline-secondary" type="button" id="sumarDias${auto.id}">+</button>
            </div>
            <button class="btn btn-success" type="submit" id="reservarBtn${auto.id}">Reservar</button>
          </div>
        </div>
      `;
  
      garajeAutos.append(autoNuevoDiv);
  
      let diasInput = document.getElementById(`diasInput${auto.id}`);
      let sumarDiasBtn = document.getElementById(`sumarDias${auto.id}`);
      let restarDiasBtn = document.getElementById(`restarDias${auto.id}`);
      let precioTotalSpan = document.getElementById(`precioTotal${auto.id}`);
      let precioOriginal = auto.precio
  
      // Función para actualizar el precio total cuando cambia la cantidad de días
      const actualizarPrecioTotal = () => {
        const cantidadDias = parseInt(diasInput.value);
        const precioPorDia = precioOriginal
        const total = cantidadDias * precioPorDia;
        precioTotalSpan.textContent = total;
      };
  
      diasInput.addEventListener("input", actualizarPrecioTotal);
      sumarDiasBtn.addEventListener("click", () => {
        diasInput.value = parseInt(diasInput.value) + 1;
        actualizarPrecioTotal();
      });
  
      restarDiasBtn.addEventListener("click", () => {
        const currentDias = parseInt(diasInput.value);
        if (currentDias > 1) {
          diasInput.value = currentDias - 1;
          actualizarPrecioTotal();
        }
      });
  
      let reservarBtn = document.getElementById(`reservarBtn${auto.id}`);
      reservarBtn.addEventListener("click", () => {
        agregarReserva(auto, parseInt(diasInput.value));
        diasInput.value = 1;
        precioTotalSpan.textContent = precioOriginal;
      });
    }
  }
    
  // Función para agregar una reserva al carrito
  function agregarReserva(elemento, cantidadDias) {
    let autoReservado = reservasCarrito.find((auto) => auto.id == elemento.id);
  
    if (autoReservado === undefined) {
      elemento.cantidad = cantidadDias;
      elemento.precioTotal = elemento.precio * cantidadDias;
      reservasCarrito.push(elemento);
      localStorage.setItem("reservas", JSON.stringify(reservasCarrito));
  
      Toastify({
        text: `Has reservado el auto ${elemento.marca} ${elemento.modelo} por ${cantidadDias} día(s).`,
        duration: 1500,
        gravity: "bottom",
        position: "right",
        style: {
          background: "linear-gradient(to right, #00b09b, #96c93d)",
        },
      }).showToast();
    } else {
      Toastify({
        text: "Ya has reservado este vehículo",
        duration: 1500,
        gravity: "bottom",
        position: "right",
        style: {
          background: "linear-gradient(to right, red, orange)",
        },
      }).showToast();
    }
  }
  
  /* AGREGAR RESERVA */
  function agregarReserva (elemento, cantidadDias) {
    let autoReservado = reservasCarrito.find ((auto) => auto.id == elemento.id)
      if (autoReservado === undefined) {
      elemento.cantidad = cantidadDias;
      reservasCarrito.push(elemento);
      localStorage.setItem("reservas", JSON.stringify(reservasCarrito));
  
      Toastify({
        text: `Has reservado el auto ${elemento.marca} ${elemento.modelo} por ${cantidadDias} día(s).`,
        duration: 1500,
        gravity: "bottom",
        position: "right",
        style: {
          background: "linear-gradient(to right, #00b09b, #96c93d)",
        },
      }).showToast();
    } else {
      Toastify({
        text: "Ya has reservado este vehículo",
        duration: 1500,
        gravity: "bottom",
        position: "right",
        style: {
          background: "linear-gradient(to right, red, orange)",
        },
      }).showToast();
    }
    totalReservas(reservasCarrito)
  }
        
        
  /* AGREGAR NUEVO AUTO A CATALOGO */
  function agregarNuevoAuto (array) {
    let marca = document.getElementById("marcaInput")
    let modelo = document.getElementById("modeloInput")
    let ano = document.getElementById("anoInput")
    let tipo = document.getElementById("tipoInput")
    let precio = document.getElementById("precioInput")
    let tipoSeleccionado = tipo.options[tipo.selectedIndex].text;
      if (marca.value.trim() === "" || modelo.value.trim() === "" || ano.value.trim() === "" || tipoSeleccionado === "" || precio.value.trim() === ""){
        Swal.fire({
          title: "Aviso!",
          text: "Por favor complete todos los campos solicitados",
          icon: "info"
        });
        return;
      }
      Swal.fire({
        title: "Agregado!",
        text: `Se ha añadido el auto: ${marca.value} ${modelo.value}`,
        icon: "success"
      })
      const nuevoAuto = new Auto (array.length+1, marca.value, modelo.value, ano.value, tipoSeleccionado, precio.value, "prox.jpg")
      console.log(nuevoAuto)
    array.push(nuevoAuto)
    formAddCar.reset ()
    localStorage.setItem("garaje", JSON.stringify(garaje))
}

/* ORDEN */
/* ALFABETICO */
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
    mostrarGarajeDOM (ordenAlfa)
  }
  
  /* MENOR A MAYOR */
  function precioMenor (array) {
    let precioMenorMayor = array.concat ()
    precioMenorMayor.sort (
      (precio1, precio2) => precio1.precio - precio2.precio
      )
      mostrarGarajeDOM (precioMenorMayor)
    }
    
    /* MAYOR MENOR */
    function precioMayor (array) {
      let precioMenorMayor = array.concat ()
      precioMenorMayor.sort (
        (precio1, precio2) => precio2.precio - precio1.precio
        )
        mostrarGarajeDOM (precioMenorMayor)
      }
      
      /* CALCULAR TOTAL CARRITO */
      function totalReservas(array) {
        const totalReduce = array.reduce((acumulador, reserva) => {
          const precioTotalReserva = reserva.precio * reserva.cantidad;
          return acumulador + precioTotalReserva;
        }, 0);
      
        if (totalReduce !== 0) {
          precioTotal.innerHTML = `El total de su reserva es de: $${totalReduce}`;
        } else {
          precioTotal.innerHTML = `No hay productos reservados`;
        }
      
        return totalReduce;
      }
      
        
        /* BUSCAR POR MARCA */
        function buscarAuto (buscador, array) {
          let coincidencias = array.filter (
            (auto) => {
      return auto.marca.toLowerCase().startsWith(buscador.toLowerCase()) || auto.modelo.toLowerCase().startsWith(buscador.toLowerCase())}
      )
      coincidencias.length > 0 ? (console.log(coincidencias), mostrarGarajeDOM (coincidencias)) : (mostrarGarajeDOM (array), coincidenciasDiv.innerHTML = `<h3>No hay coincidencias con su busqueda</h3>`)
    }
    
    /* ELIMINAR AUTO DE CATALOGO */
    function eliminarAuto(array) {
      let idEliminar = document.getElementById("idEliminar").value;
      let coincidencia = false;
      for (let auto of array) {
        if (auto.id == idEliminar) {
          let indice = array.indexOf(auto);
          array.splice(indice, 1);
          coincidencia = true;
          mostrarGarajeDOM(array);
          Swal.fire({
            title: "Se ha eliminado",
            text: `El auto ${auto.marca} ${auto.modelo} se ha eliminado de la lista`,
            icon: "error"
          })
        }
      }
      if (!coincidencia){
        Swal.fire({
          title: "Atencion!",
          text: "El ID ingresado no existe en el garaje",
        })
        formEliminar.reset ()
        return;
      }

    
    formEliminar.reset();
    localStorage.setItem("garaje", JSON.stringify(garaje))
  }
  
  /* CARD ADD RESERVAS */
  function cargarReservaModal(array) {
    autosReservadosModal.innerHTML = "";
    
    array.forEach((reserva) => {
      const precioTotal = reserva.precio * reserva.cantidad;
      const reservaDiv = document.createElement("div");
      reservaDiv.id = `reserva${reserva.id}`;
      reservaDiv.className = "card text-center text-bg-dark border border-light";
      reservaDiv.style.width = "13rem";
      reservaDiv.innerHTML = `
        <img src="./img/${reserva.imagen}" class="card-img-top">
        <div class="card-body">
          <h4 class="card-title">${reserva.marca} ${reserva.modelo}</h4>
          <p class="card-text">Precio/Día: $${reserva.precio}</p>
          <p class="card-text">Cantidad de días: ${reserva.cantidad}</p>
          <p class="card-text">Precio Total: $${precioTotal}</p>
          <div class="btn-group" role="group" aria-label="Modificar días">
            <button type="button" class="btn btn-outline-secondary btn-sm" id="restarDias${reserva.id}">-</button>
            <button type="button" class="btn btn-outline-secondary btn-sm" id="sumarDias${reserva.id}">+</button>
          </div>
          <button class="btn btn-outline-danger mt-1" type="submit" id="reservarBtn${reserva.id}">Quitar reserva</button>
        </div>`;
      
      autosReservadosModal.appendChild(reservaDiv);
  
      const sumarDiasBtn = document.getElementById(`sumarDias${reserva.id}`);
      const restarDiasBtn = document.getElementById(`restarDias${reserva.id}`);
      const cantidadDiasElement = reservaDiv.querySelector(`p.card-text:nth-child(3)`);
  
      sumarDiasBtn.addEventListener("click", () => {
        reserva.cantidad++;
        cantidadDiasElement.textContent = `Cantidad de días: ${reserva.cantidad}`;
        const nuevoPrecioTotal = reserva.precio * reserva.cantidad;
        reservaDiv.querySelector("p.card-text:nth-child(4)").textContent = `Precio Total: $${nuevoPrecioTotal}`;
        totalReservas(array)
      });
  
      restarDiasBtn.addEventListener("click", () => {
        if (reserva.cantidad > 1) {
          reserva.cantidad--;
          cantidadDiasElement.textContent = `Cantidad de días: ${reserva.cantidad}`;
          const nuevoPrecioTotal = reserva.precio * reserva.cantidad;
          reservaDiv.querySelector("p.card-text:nth-child(4)").textContent = `Precio Total: $${nuevoPrecioTotal}`;
        }
        totalReservas(array)
      })
      totalReservas(array)
    });
  
    array.forEach((reserva) => {
      document.getElementById(`reservarBtn${reserva.id}`).addEventListener("click", () => {
        let reservaDiv = document.getElementById(`reserva${reserva.id}`);
        reservaDiv.remove();
        let posicion = array.indexOf(reserva);
        array.splice(posicion, 1);
        localStorage.setItem("reservas", JSON.stringify(array));
        totalReservas(array);
  
        Toastify({
          text: "Se ha eliminado la reserva",
          duration: 1500,
          gravity: "bottom",
          position: "left",
          style: {
            background: "#ffe65d",
            color: "black",
          },
        }).showToast();
      });
    });
  
    totalReservas(array);
  }

    /* CONFIRMAR RESERVA */
    function finalizarReserva (array) {
      let total = totalReservas (array)
      if (total === 0){
        Swal.fire({
          title: "Atención!",
          text: "El carrito de reserva está vacío. Realiza la reserva de al menos un vehiculo para finalizar.",
          icon: "warning"
        });
        return;
      }
      const horaActual = luxon.DateTime.now();
      const horaAlert = horaActual.toLocaleString({
        month: 'long',
        day: 'numeric',
        year: 'numeric'
      });
      Swal.fire ({
        title: "Gracias por su reserva!",
        text: `El monto total de su reserva es de $${total}.\nMonto para la fecha ${horaAlert} `,
        icon: "success"
      })
      reservasCarrito = []
      localStorage.removeItem("reservas")
    }

    
    /* EVENTOS */
    finalizarReservaBtn.addEventListener("click", () => {
      finalizarReserva(reservasCarrito)
    })
    
    eliminarBtnModal.addEventListener("click", () => {
      eliminarAuto(garaje);
    })
   
    buscador.addEventListener("input", () => {
      console.log(buscador.value)
      buscarAuto(buscador.value, garaje)
    })
    
    reservasBtn.addEventListener("click", () => {
      cargarReservaModal(reservasCarrito)
    })
    
    addCarBtn.addEventListener ("click", () =>{
      agregarNuevoAuto(garaje)
      mostrarGarajeDOM (garaje)
    })
    
    selectOrden.addEventListener("change", () => {
      switch(selectOrden.value){
        case "1":
          precioMayor (garaje)
        break
        case "2":
          precioMenor (garaje)
        break
        case "3":
          ordenAlfabetico (garaje)
        break
        default:
          mostrarGarajeDOM (garaje)
        }
    })
            
mostrarGarajeDOM (garaje)

  /* LUXON */
const DateTime = luxon.DateTime
setInterval(()=>{
  let fechaAhora = DateTime.now()
  feachaDiv.innerHTML = `${fechaAhora.toLocaleString(DateTime.DATETIME_MED)}`
},1000)