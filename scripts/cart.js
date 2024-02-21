
const profileCartContainer = document.querySelector(".profile-cart") // contains all cart elements
const profileCartBtn = document.querySelector("#profile-cart-btn");
const productListContainer = document.querySelector("#product-list-container");
const productList = document.querySelector("#product-list");
const addToCart = document.querySelector("#add-to-cart-btn");
const quantitySelector = document.querySelector("#quantity-selector");
const carouselNavigation = document.querySelector(".carousel-navigation");
const productItemTemplate = document.querySelector(".product-item-template");
const productInformation = document.querySelector("#product-information");

const toggleProductList = () => {
    productListContainer.classList.toggle("hidden");
}


profileCartBtn.addEventListener("click", toggleProductList);


function updateProductCount() {
    // To display the number of products in the profile-cart button pseudo element.
    profileCartBtn.dataset.productAmount = productList.querySelectorAll(".product-item").length;
}


function ProductItem(template, name, price, quantity, thumbmail) {
    this.body = template.content.cloneNode(true);
    this.thumbmailElem = this.body.querySelector("#product-item-thumbmail");
    this.nameElem = this.body.querySelector("#product-item-name");
    this.priceElem = this.body.querySelector("#product-price");
    this.newPrice = parseInt(price.replace("$", "") * quantity);
    this.removeBtn = this.body.querySelector("#remove-product-btn");

    this.thumbmailElem.src = thumbmail;
    this.nameElem.textContent = name; 
    this.priceElem.innerHTML = `${price} x ${quantity} <span class="fw-bold">$${this.newPrice}</span>`;


    this.removeBtn.addEventListener("click", (e) => {
        e.target.closest(".product-item").remove();
        toggleCartState();
    });

    return this.body;
}


// Manipulation of product quantity
quantitySelector.addEventListener("click", (e) => {
    const target = e.target;
    const button = target.closest(".quantity-selector__button");
    let currentQuantity = parseInt(e.currentTarget.dataset.quantity);

    // If click target is NOT a button
    if (!button) {
        return;
    }

    if (button.id === "increase-quantity") {
        currentQuantity += 1;
    } else if (button.id === "decrease-quantity") {

        // Keeps the quantity from going below 1
        if (currentQuantity === 1) {
            return
        }

        currentQuantity -= 1;
    }

    e.currentTarget.dataset.quantity = currentQuantity;
    quantitySelector.querySelector("#quantity-display").textContent= currentQuantity;
})


// Displays either message for empty cart or enables the checkout button, called at every change in the cart.
function toggleCartState() {
    profileCartContainer.dataset.empty = !(productList.querySelector(".product-item"));
    updateProductCount();
}


// Get product information (quantity, preview).
function addProductToList(item) {

    // Show the cart when you add a new item.
    if (productListContainer.classList.contains("hidden")) {
        productListContainer.classList.remove("hidden")
    }

    productList.insertBefore(item, productList.firstChild);
    toggleCartState();
}


function getProductData() {
    const productName = productInformation.querySelector("#product-name").textContent;
    const productPrice = productInformation.querySelector("#product-price").textContent;
    const productQuantity = quantitySelector.dataset.quantity;
    const productThumbmail = carouselNavigation.querySelector("img").src;

    const productitem = new ProductItem(productItemTemplate, productName, productPrice, productQuantity, productThumbmail);
    
    addProductToList(productitem)
}


// Register a click on #add-to-cart-btn.
addToCart.addEventListener("click", getProductData);