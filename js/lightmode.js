let botonModos = document.getElementById("botonModos")

if(localStorage.getItem("modoOscuro") == "true") {
    document.body.classList.toggle("lightmode")
    botonModos.innerText = "Light Mode"
}


/* FUNCIONAMIENTO */
botonModos.addEventListener("click", () => {
    document.body.classList.toggle("lightmode")
    if(botonModos.innerText == "Dark Mode") {
        botonModos.innerText = "Light Mode"
        localStorage.setItem("modoOscuro", true)
    } else if (botonModos.innerText == "Light Mode") {
        botonModos.innerText = "Dark Mode"
        localStorage.setItem("modoOscuro", false)
    }
})
