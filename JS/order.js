const listCheckoutHTML = document.getElementById("checkout-list");
let cartItems = JSON.parse(localStorage.getItem('cart')) || [];

function displayCartItems() {
    cartItems.forEach(function(item) {
        const itemDiv = document.createElement("div");
        itemDiv.classList.add("item");

        const imgElement = document.createElement("img");
        imgElement.src = item.image;
        imgElement.alt = item.name;
        imgElement.classList.add("product-image");

        const detailsDiv = document.createElement("div");
        detailsDiv.classList.add("product-details");
        detailsDiv.innerHTML = `<h2>${item.name}</h2>
                                <p>Price: €${item.price.toFixed(2)}</p>
                                <p>Quantity: ${item.quantity}</p>
                                <p>Total: €${item.total.toFixed(2)}</p>`;

        itemDiv.appendChild(imgElement);
        itemDiv.appendChild(detailsDiv);

        listCheckoutHTML.appendChild(itemDiv);
    });
}

displayCartItems();

const totalQuantitySpan = document.getElementById("total-quantity");
const totalPriceSpan = document.getElementById("total-price");

let totalQuantity = 0;
let totalPrice = 0;

cartItems.forEach(item => {
    totalQuantity += item.quantity;
    totalPrice += item.total;
});

totalQuantitySpan.textContent = totalQuantity;
totalPriceSpan.textContent = `€${totalPrice.toFixed(2)}`;

const orderButton = document.getElementById("order-button");
const orderMessage = document.getElementById("order-message");

orderButton.addEventListener("click", () => {
    orderMessage.textContent = "Thank you for your order!";
    orderMessage.style.display = "block";
});
