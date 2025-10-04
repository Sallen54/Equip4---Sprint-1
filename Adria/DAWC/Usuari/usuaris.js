// Cuando el DOM se carga completamente, se ejecuta la función main()
document.addEventListener("DOMContentLoaded", main)


function main(){
// Se seleccionan los elementos del HTML necesarios
const sendUsuariButton = document.querySelector("#btSend")
const editUseriButton = document.querySelector("#btEdit")
const nomText = document.querySelector("#nom")
const nameUsuariText = document.querySelector("#nomUsuari")
const nomUsuariList = document.querySelector("#nomUsuariList")
const passwordUsuariText = document.querySelector("#contrasenya")
const emailUsuariText = document.querySelector("#email")
const messageDebugg = document.querySelector("#message")

// Se muestran los usuario guardadas al cargar la página
displayUsuari()

// Se añade un evento al botón para guardar un nuevo usuario
sendUsuariButton.addEventListener("click", () => {   // Se obtiene el valor del input
        const nom = nomText.value.trim()
        const nameUsuari = nameUsuariText.value.trim()
        const passwordUsuari = passwordUsuariText.value.trim()
        const emailUsuari = emailUsuariText.value.trim()
        // Validacio dels camps
        if (!validateNombreReal(nom)) return;
        if (!validateNickname(nameUsuari)) return;
        if (!validatePassword(passwordUsuari)) return;
        if (!validateEmail(emailUsuari)) return;
        
        // Si ya existen categorías en localStorage, se recuperan, sino se inicializa un array vacío
        const existingNom = localStorage.getItem("nom") ? JSON.parse(localStorage.getItem("nom")) : [];
        const existingNomUsuari = localStorage.getItem("nomUsuari") ? JSON.parse(localStorage.getItem("nomUsuari")) : [];
        const existingcontrasenya = localStorage.getItem("contrasenya") ? JSON.parse(localStorage.getItem("contrasenya")) : [];
        const existingEmailUsuari = localStorage.getItem("email") ? JSON.parse(localStorage.getItem("email")) : [];

        // Se añaden los nuevos datos al array
        existingNom.push(nom)
        existingNomUsuari.push(nameUsuari);
        existingcontrasenya.push(passwordUsuari);
        existingEmailUsuari.push(emailUsuari);
        // Se guarda el array actualizado en localStorage
        localStorage.setItem("nom", JSON.stringify(existingNom))
        localStorage.setItem("nomUsuari", JSON.stringify(existingNomUsuari));
        localStorage.setItem("contrasenya", JSON.stringify(existingcontrasenya));
        localStorage.setItem("email", JSON.stringify(existingEmailUsuari));

        //Misssatge de debug
        messageDebugg.innerHTML = "Usuari guardada correctament."  // Se muestra un mensaje confirmando el guardado

        nomText.value = "";
        nameUsuariText.value = "";
        passwordUsuariText.value = "";
        emailUsuariText.value = "";
  })

  editUseriButton.addEventListener("click", () => {
    window.location.href = "./editarUsuaris.html"
  })
}

// Función que se encarga de mostrar los usuarios guardados
function displayUsuari() {
  // Se obtienen los usuarios de localStorage (si no existen, se usa un array vacío)
  const nomFromLocalStorage = localStorage.getItem("nom") ? JSON.parse(localStorage.getItem("nom")) : []
  const nameFromLocalStorage = localStorage.getItem("nomUsuari") ? JSON.parse(localStorage.getItem("nomUsuari")) : []
  const passwordFromLocalStorage = localStorage.getItem("contrasenya") ? JSON.parse(localStorage.getItem("contrasenya")) : []
  const emailFromLocalStorage = localStorage.getItem("email") ? JSON.parse(localStorage.getItem("email")) : []

  console.log("hola " + nameFromLocalStorage)  // Se imprime en consola para depuración

  if (nameFromLocalStorage.length > 0) {
    // Si existen categorías, se muestran en el contenedor
    nomUsuariList.innerHTML = nameFromLocalStorage
  } else {
    // Si no hay categorías, se muestra un mensaje en el contenedor
    nomUsuariList.innerHTML = "No hi han dades"
  }
}

// Validacio de la informacio
function validateNombreReal(name) {
    const pattern = /^[A-Z][a-zA-Z]{1,19}$/;
    if (!pattern.test(name.trim())) {
        alert("Nom real: 2-20 lletres, comença amb majúscula, sense números.");
        return false;
    }
    return true;
}

function validateNickname(name) {
    const pattern = /^[A-Z][a-zA-Z0-9]{1,19}$/;
    if (!pattern.test(name.trim())) {
        alert("Nom usuari: 2-20 caràcters, comença amb majúscula, números permesos.");
        return false;
    }
    return true;
}

function validatePassword(password) {
    const pattern = /^(?=.*[A-Z])(?=.*[\W_]).+$/;
    if (!pattern.test(password)) {
        alert("Contrasenya: ha de contenir almenys una majúscula i un símbol.");
        return false;
    }
    return true;
}

function validateEmail(email) {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!pattern.test(email.trim())) {
        alert("Email: format invàlid, ha de contenir '@' i domini.");
        return false;
    }
    return true;
}