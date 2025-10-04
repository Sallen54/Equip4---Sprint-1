// Creació de productes en array
let Product = [
    {name:"Televisor", price:500, img:"img/tv.png", descripton:"Televisor 4K UHD"},
    {name:"Portàtil", price:700, img:"img/portatil.png", descripton:"Portàtil 15.6'' i7"},
    {name:"Tablet", price:300, img:"img/tablet.png", descripton:"Tablet 10'' 64GB"},
    {name:"Smartphone", price:400, img:"img/movil.png", descripton:"Smartphone 6.5'' 128GB"},
    {name:"Smartwatch", price:200, img:"img/reloj.png", descripton:"Smartwatch GPS"}
]




document.addEventListener("DOMContentLoaded", main)

function main(){
    const productListTable = document.getElementById('productListTable')
    productListTable.innerHTML = '<p>Carregant productes...</p>'

    // llegir productes del localStorage
    let storedProducts = localStorage.getItem('productes')? JSON.parse(localStorage.getItem('productes')) : Product
    localStorage.setItem('productes', JSON.stringify(storedProducts));
    let auxHtml = '';
        storedProducts.forEach( (product, index) => {
            let auxIndex = index +1;
            auxHtml += "<tr><td> <button onclick='obrirComparador("+index +")''>Comp</button></td><td> "+ auxIndex +"</td><td> "+ product.name +"</td><td> "+ product.descripton +"</td><td> "+ product.price +"</td></tr>"
        });
        productListTable.innerHTML = auxHtml;
    }
 

function obrirComparador(index){
   window.location.href = "comparador.html?index="+index;}
