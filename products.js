
/* =====================================
   NOIRÉ — CENTRAL PRODUCT DATABASE
===================================== */

const NOIRE_PRODUCTS = [

    {
        id: 17,
        name: "Essential Black Tee",
        price: 499,

        category: "CORE",
        type: "tshirt",
        gender: "men",

        color: "black",
        fit: "oversized",

       image: "images/tshirt1.jpg",

images: [
    "images/tshirts1-side.jpg",
    "images/tshirts1-back.jpg"
],

        tags: "black tshirt tee oversized men premium casual",

        sizes: ["S", "M", "L", "XL"],

        description: "Premium everyday essential."
    },

    {
        id: 21,
        name: "Classic White Tee",
        price: 599,

        category: "ESSENTIALS",
        type: "tshirt",
        gender: "women",

        color: "white",
        fit: "regular",

       image: "images/tshirt2.jpg",

images: [
    "images/tshirts2-side.jpg",
    "images/tshirts2-back.jpg"
],

        tags: "white tshirt tee women regular casual",

        sizes: ["S", "M", "L", "XL"],

        description: "A clean and minimal everyday tee."
    }

];


/* =====================================
   NOIRÉ — PRODUCT CARD GENERATOR
===================================== */

function noireCreateProductCard(product) {

    const card = document.createElement("article");

    card.className = "product-card";

    card.dataset.id = product.id;
    card.dataset.name = product.name;
    card.dataset.type = product.type;
    card.dataset.gender = product.gender;
    card.dataset.color = product.color;
    card.dataset.fit = product.fit;
    card.dataset.category = product.category;
    card.dataset.tags = product.tags;
    card.dataset.images = (product.images || []).join(",");

    card.innerHTML = `
        <div class="product-image">
            <img src="${product.image}" alt="${product.name}" loading="lazy">

            <button class="quick-add" type="button">
                Buy Now
            </button>
        </div>

        <div class="product-info">
            <p class="category">${product.category}</p>
            <h3>${product.name}</h3>

            <div class="product-bottom">
                <span>₹${product.price}</span>

                <button class="heart" type="button" aria-label="Add to wishlist">
                    <i class="fa-regular fa-heart"></i>
                </button>
            </div>
        </div>
    `;

    return card;
}


/* =====================================
   RENDER PRODUCTS
===================================== */

function noireRenderProducts(container, productList) {

    if (!container) return;

    container.replaceChildren();

    productList.forEach(function(product) {
        container.appendChild(noireCreateProductCard(product));
    });

}



/* =====================================
   NOIRÉ — HOME PAGE PRODUCT DISPLAY
===================================== */

document.addEventListener("DOMContentLoaded", function () {

    const container = document.querySelector(
        "#featured .products"
    );

    if (!container) return;

    NOIRE_PRODUCTS.forEach(function (product) {

        container.appendChild(
            noireCreateProductCard(product)
        );

    });

});
