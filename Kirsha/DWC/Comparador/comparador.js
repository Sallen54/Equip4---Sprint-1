document.addEventListener("DOMContentLoaded", main)

let compare = localStorage.getItem('comparar') ? JSON.parse(localStorage.getItem('comparar')) : {};
let compareProduct = localStorage.getItem('compararProductes') ? JSON.parse(localStorage.getItem('compararProductes')) : [];
let productes = localStorage.getItem('productes') ? JSON.parse(localStorage.getItem('productes')) : [];

function main() {
    // Obtenir l'index del producte a través de la URL
    const params = new URLSearchParams(window.location.search);
    const index = params.get('index');

    if (index !== null && productes[index]) {
        const product = productes[index]

        // Crear objecte compararador
        const compare = {
            "sessionId": obtindreSessionId(),
            "userAgent": navigator.userAgent,
            "dateStart": new Date().toISOString()
        };

        // Comprovar si ja existeix ja comparador
        if (!localStorage.getItem('comparar')) {
            localStorage.setItem('comparar', JSON.stringify(compare))
        }
        // SI no existeix el producte afegir
        let Existeix = compareProduct.some(p => p.product == index);
        if (!Existeix) {
            // Afegir producte a comparar
            compareProduct.push({
                "sessionId": compare.sessionId,
                "product": index
            });
            localStorage.setItem('compararProductes', JSON.stringify(compareProduct));

        }
        //Neteja el comparador si lleves tots els productes encara que recàrregues la pàgina
        window.history.replaceState({}, document.title, "comparador.html");

    }
    mostrarComparador();

}

//Crear un ID de sessió aleatori
function obtindreSessionId() {
    return crypto.randomUUID();

}
// Mostrar productes a comparar
function mostrarComparador() {
    const compararDiv = document.getElementById('compararDiv');
    compararDiv.innerHTML = "";

    //Si no hi ha productes a comparar
    if (!compareProduct || compareProduct.length === 0) {
        alert("No tens productes per a comparar"); 
        return;
    }

    //Si hi ha productes a comparar
    compareProduct.forEach((item) => {
        const product = productes[item.product];
        if (product) {
            const productHtml = `
        <div style="border:1px solid #000; margin:10px; padding:10px;">
            <p>${product.descripton}</p>
            <p>Preu: ${product.price}€</p>
            <img src="${product.img}" alt="${product.name}" style="max-width:100px;">
            <hr>
            <button onclick="eliminarProducteComparador(${item.product})">Eliminar</button>

        </div>
        `;
            compararDiv.innerHTML += productHtml;
        }
    })
}
 
//Eliminar producte del comparador
function eliminarProducteComparador(index) {
    // Llig l'array dels productes comparats
    let currentCompareProduct = localStorage.getItem('compararProductes')
        ? JSON.parse(localStorage.getItem('compararProductes'))
        : [];

    // Eliminar el producte seleccionat
    const nouCompareProduct = currentCompareProduct.filter(item => item.product != index);
    //Guardar en localStorage
    localStorage.setItem('compararProductes', JSON.stringify(nouCompareProduct));

    // Actualizar la variable global
    compareProduct = nouCompareProduct;

    mostrarComparador();  //Actualitza la vista del comparador
}