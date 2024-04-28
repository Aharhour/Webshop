const listProductHTML = document.getElementById("product-list"); 
const listCartHTML = document.querySelector('.listCart');
const iconCart = document.querySelector('.icon-cart');
const iconCartSpan = document.querySelector('.icon-cart span');
const body = document.querySelector('body');
const closeCart = document.querySelector('.close');
const checkoutButton = document.querySelector('.checkOut');
let products = [];
let cart = [];

iconCart.addEventListener('click', () => {
    body.classList.toggle('showCart');
});

closeCart.addEventListener('click', () => {
    body.classList.toggle('showCart');
});

checkoutButton.addEventListener('click', () => {
    cart = [];
    addCartToHTML();
    alert("Dank u voor uw bestelling");
});

function displayImages() {
    const products = JSON.parse(localStorage.getItem("images")) || [];

    listProductHTML.innerHTML = "";
    if (products.length > 0) {
        products.forEach(function(imageData) {
            const imgElement = document.createElement("img");
            imgElement.alt = imageData.name;
        });
    }
}

displayImages();


const addDataToHTML = () => {
    const products = JSON.parse(localStorage.getItem("images")) || [];

    if (products.length > 0) {
        products.forEach(product => {
            let newProduct = document.createElement('div');
            newProduct.dataset.id = product.id;
            newProduct.classList.add('item');
            newProduct.innerHTML =
                `<div class="product-image"><img src="${product.image}" alt=""></div>
                <div class="product-details">
                    <h2>${product.name}</h2>
                    <div class="price">€${product.price}</div>
                    <button class="addCart">Add To Cart</button>
                </div>`;
            listProductHTML.appendChild(newProduct);
        });
    }
};

addDataToHTML();