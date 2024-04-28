const imageForm = document.getElementById("image-form");
const imageList = document.getElementById("image-list");

imageForm.addEventListener("submit", function(e) {
    e.preventDefault();

    const name = document.getElementById("image-name").value;
    const file = document.getElementById("image-file").files[0];
    const price = parseFloat(document.getElementById("image-price").value);
    const quantity = parseInt(document.getElementById("image-quantity").value);

    const reader = new FileReader();
    reader.onload = function() {
        const imageData = {
            name: name,
            image: reader.result,
            price: price,
            quantity: quantity
        };

        let images = JSON.parse(localStorage.getItem("images")) || [];
        images.push(imageData);
        localStorage.setItem("images", JSON.stringify(images));

        renderImages(images);
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
            <span>Quantity: ${imageData.quantity}</span>
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
    }
});

window.addEventListener("load", () => {
    let images = JSON.parse(localStorage.getItem("images")) || [];
    renderImages(images);
});