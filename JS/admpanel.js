const imageForm = document.getElementById("image-form");
const imageList = document.getElementById("image-list");
const listProductHTML = document.getElementById("product-list");
const listCartHTML = document.querySelector('.listCart');
const cartCountSpan = document.querySelector('.cart-count');
let products = [];
let cart = [];
let productIdCounter = 0;

imageForm.addEventListener("submit", function(e) {
    e.preventDefault();

    const name = document.getElementById("image-name").value;
    const file = document.getElementById("image-file").files[0];
    const price = parseFloat(document.getElementById("image-price").value);

    const reader = new FileReader();
    reader.onload = function() {
        const productId = generateProductId();
        const imageData = {
            id: productId,
            name: name,
            image: reader.result,
            price: price
        };

        let images = JSON.parse(localStorage.getItem("images")) || [];
        images.push(imageData);
        localStorage.setItem("images", JSON.stringify(images));

        renderImages(images);
        renderProducts(images);
    }
    reader.readAsDataURL(file);
    imageForm.reset();
});

function renderImages(images) {
    imageList.innerHTML = "";
    images.forEach((imageData, index) => {
        const imageDiv = document.createElement("div");
        imageDiv.classList.add("image-item");
        imageDiv.innerHTML = `
            <img src="${imageData.image}" alt="${imageData.name}">
            <span>Name: ${imageData.name}</span>
            <span>Price: €${imageData.price}</span>
            <button class="delete-button" data-index="${index}">Delete</button>
        `;
        imageList.appendChild(imageDiv);
    });
}

imageList.addEventListener("click", (e) => {
    if (e.target.classList.contains("delete-button")) {
        const index = e.target.getAttribute("data-index");
        let images = JSON.parse(localStorage.getItem("images")) || [];
        images.splice(index, 1);
        localStorage.setItem("images", JSON.stringify(images));
        renderImages(images);
        renderProducts(images);
    }
});

function renderProducts(images) {
    listProductHTML.innerHTML = "";
    products = images;
    if (products.length > 0) {
        products.forEach(product => {
            let newProduct = document.createElement('div');
            newProduct.dataset.id = product.id;
            newProduct.classList.add('item');
            newProduct.innerHTML =
                `<div class="product-image"><img src="${product.image}" alt=""></div>
                <div class="product-details">
                    <h2>${product.name}</h2>
                    <div class="price">€${product.price.toFixed(2)}</div> <!-- Display price with 2 decimal places -->
                    <button class="addCart" data-id="${product.id}" data-name="${product.name}" data-price="${product.price}">Add To Cart</button>
                </div>`;
            listProductHTML.appendChild(newProduct);

            newProduct.querySelector('.addCart').addEventListener('click', (event) => {
                const productId = event.target.dataset.id;
                const productName = event.target.dataset.name;
                const productPrice = parseFloat(event.target.dataset.price);
                const existingItemIndex = cart.findIndex(item => item.id === productId);
                if (existingItemIndex !== -1) {
                    cart[existingItemIndex].quantity++;
                    cart[existingItemIndex].total = cart[existingItemIndex].price * cart[existingItemIndex].quantity;
                } else {
                    cart.push({ id: productId, name: productName, price: productPrice, total: productPrice });
                }
                localStorage.setItem('cart', JSON.stringify(cart));
                updateCartIcon();
                addCartToHTML();
            });
        });
    }
}

function updateCartIcon() {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
    cartCountSpan.textContent = totalItems;
}

function generateProductId() {
    return String(productIdCounter++).padStart(9, '0');
}

function getImageUrlById(productId) {
    const product = products.find(product => product.id === productId);
    return product ? product.image : '';
}

window.addEventListener("load", () => {
    let images = JSON.parse(localStorage.getItem("images")) || [];
    renderImages(images);
    renderProducts(images);
});