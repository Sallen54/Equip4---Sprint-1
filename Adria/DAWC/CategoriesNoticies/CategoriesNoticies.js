// Cuando el DOM se carga completamente, se ejecuta la función main()
document.addEventListener("DOMContentLoaded", main)


function main(){
  // Se seleccionan los elementos del HTML necesarios
  const sendCategoryButton = document.querySelector("#btSend")
  const listCategoryButton = document.querySelector("#btList")
  const nameCategoryText = document.querySelector("#category")
  const categoryList = document.querySelector("#categoryList")
  const messageDebugg = document.querySelector("#message")

  // Se muestran las categorías guardadas al cargar la página
  displayCategory(categoryList)

  // Se añade un evento al botón para guardar una nueva categoría
  sendCategoryButton.addEventListener("click", () => {   // Se obtiene el valor del input
    addCategory(nameCategoryText, messageDebugg, categoryList)
          
    })

    listCategoryButton.addEventListener("click", () => {
      window.location.href = "./CategoriesLlistat.html"
    })
}

  function addCategory(input, message, container){
    const nameCategory = input.value.trim()

    // Validació del nom
    if(!validationName(nameCategory, message)){
      return false;
    }

          if (nameCategory) {
            // Si ya existen categorías en localStorage, se recuperan, sino se inicializa un array vacío
            const existingCategories = localStorage.getItem("category") ? JSON.parse(localStorage.getItem("category")) : [];
            // Se añade la nueva categoría al array
            existingCategories.push(nameCategory);
            // Se guarda el array actualizado en localStorage
            localStorage.setItem("category", JSON.stringify(existingCategories));
            message.innerHTML = "Categoria guardada correctament."  // Se muestra un mensaje confirmando el guardado
            input.value = ""
          } else {
              displayCategory(container)
              message.innerHTML = "No s'ha introduït cap categoria."  // Si no se ha escrito nada, se muestra un mensaje
              }
  }
  
  //Funcio per a la validacio del nom
  function validationName(categoria, messageElement) {
  const element = document.getElementById("category");

  if (!element.checkValidity()) {
    if (element.validity.valueMissing) {
      error(messageElement, "Has d'introduir una categoria");
    } else if (element.validity.patternMismatch) {
      error(messageElement, "La categoria ha de tindre entre 2 i 20 caracters i començar amb majúscula.");
    } else {
      error(messageElement, "Categoria no vàlida");
    }
    return false;
  }
  return true;
}
  function error (element, missatge){
    element.innerHTML = missatge;
  }

  // Función que se encarga de mostrar las categorías guardadas
  function displayCategory(container) {
    // Se obtienen las categorías de localStorage (si no existen, se usa un array vacío)
    const nameFromLocalStorage = localStorage.getItem("category") 
      ? JSON.parse(localStorage.getItem("category")) : []

    console.log("hola " + nameFromLocalStorage)  // Se imprime en consola para depuración

    if(nameFromLocalStorage.length > 0){
      container.innerHTML = "Caregoria correctamety introduida"
    } else {
      container.innerHTML = "No hi han dades"
    }
  }

  

