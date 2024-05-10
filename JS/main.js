const listProductHTML = document.getElementById("product-list");
const listCartHTML = document.querySelector('.listCart');
const iconCart = document.querySelector('.icon-cart');
const cartCountSpan = document.querySelector('.cart-count');
const body = document.querySelector('body');
const closeCart = document.querySelector('.close');
const checkoutButton = document.querySelector('.checkOut');
let products = [];
let cart = [];

iconCart.addEventListener('click', () => {
    body.classList.toggle('showCart');
});

closeCart.addEventListener('click', () => {
    body.classList.remove('showCart');
});

function displayImages() {
    products = JSON.parse(localStorage.getItem("images")) || [];

    listProductHTML.innerHTML = "";
    if (products.length > 0) {
        products.forEach(function(imageData, index) {
            const imgElement = document.createElement("images");
            imgElement.alt = imageData.name;
            imgElement.setAttribute("data-id", index);
            listProductHTML.appendChild(imgElement);
        });
    }
}

displayImages();

const addDataToHTML = () => {
    products = JSON.parse(localStorage.getItem("images")) || [];

    if (products.length > 0) {
        products.forEach((product, index) => {
            let newProduct = document.createElement('div');
            newProduct.dataset.id = index;
            newProduct.classList.add('item');
            newProduct.innerHTML =
                `<div class="product-image"><img src="${product.image}" alt="" data-id="${index}"></div>
                <div class="product-details">
                    <h2>${product.name}</h2>
                    <div class="price">€${product.price}</div>
                    <button class="addCart" data-id="${index}" data-name="${product.name}" data-price="${product.price}">Add To Cart</button>
                </div>`;
            listProductHTML.appendChild(newProduct);

            newProduct.querySelector('.addCart').addEventListener('click', (event) => {
                const productId = event.target.dataset.id;
                const productName = event.target.dataset.name;
                const productPrice = parseFloat(event.target.dataset.price);
                const existingItemIndex = cart.findIndex(item => item.id == productId);
                if (existingItemIndex !== -1) {
                    cart[existingItemIndex].quantity++;
                    cart[existingItemIndex].total = cart[existingItemIndex].price * cart[existingItemIndex].quantity;
                } else {
                    cart.push({ id: productId, name: productName, price: productPrice, quantity: 1, total: productPrice });
                }
                localStorage.setItem('cart', JSON.stringify(cart));
                updateCartIcon();
                addCartToHTML();
            });
        });
    }
};

addDataToHTML();

function updateCartIcon() {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
    cartCountSpan.textContent = totalItems;
}

function addCartToHTML() {
    listCartHTML.innerHTML = "";
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    cartItems.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <div class="item-image"><img src="${getImageUrlById(item.id)}" alt="${item.name}"></div>
            <div class="item-details">
                <div class="item-name">${item.name}</div>
                <div class="item-price">Price: €${item.price}</div>
                <div class="item-quantity">Quantity: ${item.quantity}</div>
                <div class="item-total">Total: €${item.total}</div>
                <button class="remove-item" data-id="${item.id}">Remove</button>
            </div>
        `;
        listCartHTML.appendChild(cartItem);
        cartItem.querySelector('.remove-item').addEventListener('click', (event) => {
            const productId = event.target.dataset.id;
            const itemIndex = cart.findIndex(item => item.id === productId);
            cart.splice(itemIndex, 1);
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartIcon();
            addCartToHTML();
        });
    });
}

function getImageUrlById(productId) {
    const product = products.find(product => product.id == productId);
    return product ? product.image : '';
}

updateCartIcon();

checkoutButton.addEventListener('click', () => {
    cart = [];
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartIcon();
    addCartToHTML();
    alert("Dank u voor uw bestelling");
});
