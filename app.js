
 
 /* =========================================
   NOIRÉ — MOBILE MENU OPEN / CLOSE
========================================= */

document.addEventListener("DOMContentLoaded", function () {
    const menuButton = document.querySelector(".mobile-menu-toggle");
    const navbar = document.querySelector(".navbar");
    const menuLinks = document.querySelectorAll(".nav-links a");

    if (!menuButton || !navbar) return;

    function setMenuOpen(isOpen) {
        navbar.classList.toggle("mobile-menu-open", isOpen);

        menuButton.setAttribute("aria-expanded", String(isOpen));
        menuButton.setAttribute(
            "aria-label",
            isOpen ? "Close navigation menu" : "Open navigation menu"
        );

        menuButton.innerHTML = isOpen
            ? '<i class="fa-solid fa-xmark"></i>'
            : '<i class="fa-solid fa-bars"></i>';
    }

    setMenuOpen(false);

    menuButton.addEventListener("click", function (event) {
        event.preventDefault();
        setMenuOpen(!navbar.classList.contains("mobile-menu-open"));
    });

    menuLinks.forEach(function (link) {
        link.addEventListener("click", function () {
            setMenuOpen(false);
        });
    });

    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") setMenuOpen(false);
    });
});



/* =========================================
   NOIRÉ — MEN & WOMEN PRODUCT FILTER
   Works with dynamically loaded product cards
========================================= */

document.addEventListener("click", function (event) {
    const filterLink = event.target.closest(".nav-links a[data-filter]");

    if (filterLink) {
        const gender = (filterLink.dataset.filter || "").toLowerCase();

        if (!gender) return;

        event.preventDefault();

        document.querySelectorAll(".product-card").forEach(function (product) {
            const productGender = (product.dataset.gender || "").toLowerCase();

            product.style.display =
                gender === "all" || productGender === gender ? "" : "none";
        });

        const featured = document.querySelector("#featured");

        if (featured) {
            featured.scrollIntoView({ behavior: "smooth", block: "start" });
        }

        return;
    }

    const logo = event.target.closest(".logo");

    if (logo && document.querySelector("#collectionsProducts")) {
        document.querySelectorAll(".product-card").forEach(function (product) {
            product.style.display = "";
        });
    }
});



/* =========================================
   NOIRÉ — NAVBAR SEARCH BAR OPEN / CLOSE
========================================= */

document.addEventListener("DOMContentLoaded", function () {
    const searchToggle = document.querySelector(".search-toggle");
    const navIcons = document.querySelector(".nav-icons");
    const navbar = document.querySelector(".navbar");

    if (!searchToggle || !navIcons || !navbar) return;

    let searchBar = navIcons.querySelector(".navbar-search");

    if (!searchBar) {
        searchBar = document.createElement("div");
        searchBar.className = "navbar-search";

        searchBar.innerHTML = `
           
         
<form class="navbar-search-form">
    <input
        type="text"
        class="navbar-search-input"
        placeholder="Search products..."
        aria-label="Search products"
        autocomplete="off"
    >

    <button
        type="submit"
        class="navbar-search-button"
        aria-label="Search"
    >
        <i class="fa-solid fa-magnifying-glass"></i>
    </button>

    <button
        type="button"
        class="navbar-search-mic"
        aria-label="Search by voice"
        title="Search by voice"
    >
        <i class="fa-solid fa-microphone"></i>
    </button>
</form>


        `;

        navIcons.appendChild(searchBar);
    }

    const searchInput = searchBar.querySelector(".navbar-search-input");
    const searchForm = searchBar.querySelector(".navbar-search-form");

    function openSearch() {
        searchBar.classList.add("active");
        searchToggle.classList.add("search-icon-hidden");
        searchToggle.setAttribute("aria-expanded", "true");

        if (searchInput) {
            searchInput.focus({ preventScroll: true });
        }
    }

    function closeSearch() {
        searchBar.classList.remove("active");
        searchToggle.classList.remove("search-icon-hidden");
        searchToggle.setAttribute("aria-expanded", "false");
    }

    searchToggle.setAttribute("aria-expanded", "false");

    searchToggle.addEventListener("click", function (event) {
        event.preventDefault();

        if (searchBar.classList.contains("active")) {
            closeSearch();
        } else {
            openSearch();
        }
    });

    document.addEventListener("click", function (event) {
        if (
            searchBar.classList.contains("active") &&
            !searchBar.contains(event.target) &&
            !searchToggle.contains(event.target)
        ) {
            closeSearch();
        }
    });

    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") closeSearch();
    });

    if (searchForm) {
        searchForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const query = searchInput.value.trim();

            if (!query) {
                searchInput.focus();
                return;
            }

            window.location.href =
                "search.html?q=" + encodeURIComponent(query);
        });
    }
});



/* =========================================
   NOIRÉ — MOBILE MENU OPEN / CLOSE
========================================= */

document.addEventListener("DOMContentLoaded", function () {
    const menuButton = document.querySelector(".mobile-menu-toggle");
    const navbar = document.querySelector(".navbar");
    const navLinks = document.querySelector(".nav-links");

    if (!menuButton || !navbar || !navLinks) {
        console.error("NOIRÉ: Mobile menu HTML elements missing.");
        return;
    }

    function setMenuOpen(isOpen) {
        navbar.classList.toggle("mobile-menu-open", isOpen);

        menuButton.setAttribute("aria-expanded", String(isOpen));
        menuButton.setAttribute(
            "aria-label",
            isOpen ? "Close navigation menu" : "Open navigation menu"
        );

        menuButton.innerHTML = isOpen
            ? '<i class="fa-solid fa-xmark"></i>'
            : '<i class="fa-solid fa-bars"></i>';
    }

    menuButton.addEventListener("click", function (event) {
        event.preventDefault();
        event.stopPropagation();

        const isOpen = navbar.classList.contains("mobile-menu-open");
        setMenuOpen(!isOpen);
    });

    navLinks.querySelectorAll("a").forEach(function (link) {
        link.addEventListener("click", function () {
            setMenuOpen(false);
        });
    });

    document.addEventListener("click", function (event) {
        if (
            navbar.classList.contains("mobile-menu-open") &&
            !navbar.contains(event.target)
        ) {
            setMenuOpen(false);
        }
    });

    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") {
            setMenuOpen(false);
        }
    });

    setMenuOpen(false);
});



/* =========================================
   NOIRÉ — SMART SEARCH HELPERS
========================================= */

function noireNormalize(value) {
    return String(value || "")
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/&/g, " and ")
        .replace(/[^a-z0-9]+/g, " ")
        .trim()
        .replace(/\s+/g, " ");
}

const noireAliases = {
    blak: ["black"], blk: ["black"], kala: ["black"],
    whte: ["white"], wht: ["white"], safed: ["white"],
    greay: ["grey", "gray"], gry: ["grey", "gray"],
    beig: ["beige"], hodie: ["hoodie"], hoddie: ["hoodie"],
    hoodi: ["hoodie"], tshirt: ["t shirt", "tee"],
    tshirts: ["t shirt", "tee"], teee: ["tee", "t shirt"],
    blaktee: ["black", "tee"], oversizd: ["oversized"],
    oversize: ["oversized"], overzied: ["oversized"],
    mens: ["men", "male", "boys"], mans: ["men", "male", "boys"],
    boys: ["boy", "men", "male"], womens: ["women", "female", "girls"],
    ladies: ["women", "female", "girls"], girls: ["girl", "women", "female"],
    jogger: ["joggers", "lower", "track pants"],
    joggers: ["jogger", "lower", "track pants"],
    trouser: ["trousers", "pants", "lower"],
    pant: ["pants", "trouser", "lower"],
    pants: ["pant", "trouser", "lower"],
    lowers: ["lower", "jogger", "track pants"],
    lower: ["lowers", "jogger", "track pants"],
    essentials: ["essential"], gray: ["grey"], grey: ["gray"]
};

function noireExpandToken(token) {
    const result = [token];

    if (noireAliases[token]) {
        result.push(...noireAliases[token]);
    }

    if (token === "t") {
        result.push("tee", "tshirt", "t shirt");
    }

    return [...new Set(result.map(noireNormalize).filter(Boolean))];
}

function noireEditDistance(a, b) {
    if (Math.abs(a.length - b.length) > 2) return 3;

    let previous = Array.from(
        { length: b.length + 1 },
        function (_, index) {
            return index;
        }
    );

    for (let i = 1; i <= a.length; i++) {
        const current = [i];

        for (let j = 1; j <= b.length; j++) {
            current[j] = Math.min(
                current[j - 1] + 1,
                previous[j] + 1,
                previous[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1)
            );
        }

        previous = current;
    }

    return previous[b.length];
}

function noireTokenMatches(token, haystack, words, compactHaystack) {
    const alternatives = noireExpandToken(token);

    for (const alternative of alternatives) {
        if (
            haystack.includes(alternative) ||
            compactHaystack.includes(alternative.replace(/\s/g, ""))
        ) {
            return true;
        }

        if (alternative.length < 4) continue;

        const maxDistance = alternative.length >= 8 ? 2 : 1;

        for (const word of words) {
            if (
                word.length >= 4 &&
                noireEditDistance(alternative, word) <= maxDistance
            ) {
                return true;
            }
        }
    }

    return false;
}


function noireProductMatches(card, query) {
    const productName = noireNormalize(
        card.dataset.name ||
        card.querySelector("h2, h3, h4")?.textContent ||
        ""
    );

    const category = noireNormalize(card.dataset.category || "");
    const type = noireNormalize(card.dataset.type || "");
    const gender = noireNormalize(card.dataset.gender || "");
    const color = noireNormalize(card.dataset.color || "");
    const fit = noireNormalize(card.dataset.fit || "");
    const tags = noireNormalize(card.dataset.tags || "");

    const searchableText = noireNormalize([
        productName,
        category,
        type,
        gender,
        color,
        fit,
        tags
    ].join(" "));

    const normalizedQuery = noireNormalize(query);
    if (!normalizedQuery) return false;

    const queryTokens = normalizedQuery
        .replace(/\bt shirts?\b/g, " tshirt ")
        .replace(/\btees?\b/g, " tshirt ")
        .replace(/\btshirts?\b/g, " tshirt ")
        .split(" ")
        .filter(Boolean);

    // Strict category matching: use data-type, not product names.
    const asksForTshirt = queryTokens.includes("tshirt");
    const asksForHoodie = queryTokens.some(token =>
        ["hoodie", "hoodies"].includes(token)
    );
    const asksForLower = queryTokens.some(token =>
        ["lower", "lowers", "jogger", "joggers",
         "trouser", "trousers", "pants"].includes(token)
    );

    if (asksForTshirt && type !== "tshirt") return false;
    if (asksForHoodie && type !== "hoodie") return false;
    if (asksForLower && type !== "lowers") return false;

    // Every remaining search word must match.
    return queryTokens.every(function (token) {
        if (["tshirt", "hoodie", "hoodies", "lower", "lowers",
             "jogger", "joggers", "trouser", "trousers",
             "pants"].includes(token)) {
            return true;
        }

        const alternatives = noireExpandToken(token);

        return alternatives.some(function (alternative) {
            if (searchableText.includes(alternative)) return true;

            if (alternative.length < 4) return false;

            return searchableText.split(" ").some(function (word) {
                return word.length >= 4 &&
                    noireEditDistance(alternative, word) <= 1;
            });
        });
    });
}



/* =========================================
   NOIRÉ — SEARCH RESULTS PAGE
   Requires #search-results and #search-status
========================================= */

document.addEventListener("DOMContentLoaded", async function () {
    const resultsContainer = document.querySelector("#search-results");
    const status = document.querySelector("#search-status");

    if (!resultsContainer || !status) return;

    const params = new URLSearchParams(window.location.search);
    const query = params.get("q") || "";
    const resultsInput = document.querySelector("#results-search-input");
    const resultsForm = document.querySelector("#results-search-form");

    if (resultsInput) resultsInput.value = query;

    if (resultsForm) {
        resultsForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const value = resultsInput ? resultsInput.value.trim() : "";

            if (!value) {
                if (resultsInput) resultsInput.focus();
                return;
            }

            window.location.href =
                "search.html?q=" + encodeURIComponent(value);
        });
    }

    
resultsContainer.style.display = "grid";
resultsContainer.style.gridTemplateColumns =
    "repeat(4, minmax(0, 1fr))";
resultsContainer.style.gap = "24px";
resultsContainer.style.alignItems = "start";

    resultsContainer.replaceChildren();

    if (!query.trim()) {
        status.textContent = "Search for a product to see results.";
        return;
    }

    status.textContent = "Searching products...";

    try {
        const response = await fetch("index.html", { cache: "no-store" });

        if (!response.ok) {
            throw new Error("Could not load the shop products.");
        }

        const html = await response.text();
        const parser = new DOMParser();
        const shopDocument = parser.parseFromString(html, "text/html");
        const shopProducts = [
            ...shopDocument.querySelectorAll(".product-card")
        ];

        const matches = shopProducts.filter(function (card) {
            return noireProductMatches(card, query);
        });

        if (matches.length === 0) {
            status.textContent =
                'No products found for "' + query +
                '". Try another name, category, colour or spelling.';
            return;
        }

        status.textContent =
            matches.length +
            (matches.length === 1 ? " product found" : " products found") +
            ' for "' + query + '".';

        matches.forEach(function (card) {
            const product = card.cloneNode(true);
            product.style.display = "";
            product.removeAttribute("id");

            product.querySelectorAll("img").forEach(function (img) {
                const source = img.getAttribute("src");

                if (
                    source &&
                    !/^(https?:|data:|blob:|\/|#)/i.test(source)
                ) {
                    img.setAttribute(
                        "src",
                        new URL(source, window.location.href).href
                    );
                }
            });

            resultsContainer.appendChild(product);
        });
    } catch (error) {
        console.error("NOIRÉ Smart Search:", error);

        status.textContent =
            "Products could not be loaded. Please check your connection and try again.";
    }
});


function noireProductMatches(card, query) {
    const productName = noireNormalize(
        card.dataset.name || card.querySelector("h2, h3, h4")?.textContent || ""
    );

    const category = noireNormalize(card.dataset.category || "");
    const type = noireNormalize(card.dataset.type || "");
    const gender = noireNormalize(card.dataset.gender || "");
    const color = noireNormalize(card.dataset.color || "");
    const fit = noireNormalize(card.dataset.fit || "");
    const tags = noireNormalize(card.dataset.tags || "");

    const searchableText = noireNormalize([
        productName,
        category,
        type,
        gender,
        color,
        fit,
        tags
    ].join(" "));

    const normalizedQuery = noireNormalize(query);

    if (!normalizedQuery) return false;

    // Normalize T-shirt search variations.
    const queryTokens = normalizedQuery
        .replace(/\bt shirts?\b/g, " tshirt ")
        .replace(/\btees?\b/g, " tshirt ")
        .replace(/\btshirts?\b/g, " tshirt ")
        .split(" ")
        .filter(Boolean);

    const productType = [
        productName,
        category,
        type,
        tags
    ].join(" ");

    // Detect product category from the search query
const asksForTshirt = queryTokens.includes("tshirt");

const asksForHoodie = queryTokens.some(token =>
    ["hoodie", "hoodies"].includes(token)
);

const asksForLower = queryTokens.some(token =>
    ["lower", "lowers", "jogger", "joggers",
     "trouser", "trousers", "pants"].includes(token)
);

// Strict category filtering using data-type
if (asksForTshirt && type !== "tshirt") {
    return false;
}

if (asksForHoodie && type !== "hoodie") {
    return false;
}

if (asksForLower && type !== "lowers") {
    return false;
}
    
    // Explicit lower / jogger / track-pants search.
    if (
        queryTokens.some(token =>
            ["lower", "lowers", "jogger", "joggers", "trouser", "trousers"].includes(token)
        )
    ) {
        if (!/\b(lower|lowers|jogger|joggers|trouser|trousers|pants|track pants)\b/i.test(productType)) {
            return false;
        }
    }

    // Every remaining query word must match the product.
    return queryTokens.every(function (token) {
        if (token === "tshirt") return true;

        const alternatives = noireExpandToken(token);

        return alternatives.some(function (alternative) {
            if (searchableText.includes(alternative)) return true;

            // Fuzzy matching only for longer words.
            if (alternative.length < 4) return false;

            return searchableText.split(" ").some(function (word) {
                return word.length >= 4 &&
                    noireEditDistance(alternative, word) <= 1;
            });
        });
    });
}

/* =========================================
   NOIRÉ — BAG + HEART ADD / REMOVE
   Existing app.js code ko replace mat karna
========================================= */

document.addEventListener("DOMContentLoaded", function () {
    const bagKey = "noireBagItems";
    const bagLink = document.querySelector(".bag");

    if (!bagLink) return;

    let bagItems = [];

    try {
        const savedItems = JSON.parse(localStorage.getItem(bagKey) || "[]");
        bagItems = Array.isArray(savedItems) ? savedItems : [];
    } catch (error) {
        bagItems = [];
    }

    // Keep only valid, unique products
    bagItems = bagItems.filter(function (item, index, items) {
        return item && item.id != null &&
            items.findIndex(function (other) {
                return String(other.id) === String(item.id);
            }) === index;
    });

    function saveBag() {
        try {
            localStorage.setItem(bagKey, JSON.stringify(bagItems));
        } catch (error) {
            console.error("NOIRÉ Bag could not be saved:", error);
        }
    }

    function getBagCount() {
        return bagItems.length;
    }

    function getBagTotal() {
        return bagItems.reduce(function (total, item) {
            return total + (Number(item.price) || 0);
        }, 0);
    }

    function formatPrice(price) {
        return "₹" + Number(price || 0).toLocaleString("en-IN");
    }

    function escapeHTML(value) {
        return String(value ?? "").replace(/[&<>"']/g, function (char) {
            const entities = {
                "&": "&amp;",
                "<": "&lt;",
                ">": "&gt;",
                '"': "&quot;",
                "'": "&#39;"
            };

            return entities[char];
        });
    }

    function updateBagCount() {
        const countElement = bagLink.querySelector("span");

        if (countElement) {
            countElement.textContent = getBagCount();
        }

        bagLink.setAttribute(
            "aria-label",
            "Shopping Bag, " + getBagCount() + " products"
        );
    }

    function updateHearts() {
        document.querySelectorAll(".product-card").forEach(function (card) {
            const productId = card.dataset.id;
            if (!productId) return;

            const heart = card.querySelector(".heart");
            if (!heart) return;

            const isAdded = bagItems.some(function (item) {
                return String(item.id) === String(productId);
            });

            const heartIcon = heart.querySelector("i");

            heart.classList.toggle("is-liked", isAdded);
            heart.setAttribute(
                "aria-label",
                isAdded ? "Remove from bag" : "Add to bag"
            );
            heart.setAttribute("aria-pressed", String(isAdded));

            if (heartIcon) {
                heartIcon.classList.toggle("fa-solid", isAdded);
                heartIcon.classList.toggle("fa-regular", !isAdded);
            }
        });
    }

    // Create the Bag window
    const bagOverlay = document.createElement("div");
    bagOverlay.className = "noire-bag-overlay";

    bagOverlay.innerHTML = `
        <section
            class="noire-bag-panel"
            role="dialog"
            aria-modal="true"
            aria-labelledby="noire-bag-title"
        >
            <div class="noire-bag-header">
                <div>
                    <p class="noire-bag-eyebrow">NOIRÉ COLLECTION</p>
                    <h2 id="noire-bag-title">Your Bag</h2>
                </div>

                <button
                    type="button"
                    class="noire-bag-close"
                    aria-label="Close bag"
                >
                    <i class="fa-solid fa-xmark"></i>
                </button>
            </div>

            <div class="noire-bag-items"></div>

            <div class="noire-bag-footer">
                <div class="noire-bag-total">
                    <span>Total</span>
                    <strong class="noire-bag-total-price">₹0</strong>
                </div>

                <button type="button" class="noire-bag-checkout">
                    Checkout — Coming Soon
                </button>

                <p class="noire-bag-note">
                    Shipping and taxes, if applicable, are calculated later.
                </p>
            </div>
        </section>
    `;

    document.body.appendChild(bagOverlay);

    const bagItemsContainer = bagOverlay.querySelector(".noire-bag-items");
    const bagTotalElement = bagOverlay.querySelector(".noire-bag-total-price");
    const closeBagButton = bagOverlay.querySelector(".noire-bag-close");

    // Add Bag styles without editing style.css
    const bagStyle = document.createElement("style");

    bagStyle.textContent = `
        .heart.is-liked {
            color: #e63946 !important;
        }

        .heart.is-liked i {
            color: #e63946 !important;
        }

        .noire-bag-overlay {
            position: fixed;
            inset: 0;
            z-index: 99999;
            display: flex;
            justify-content: flex-end;
            background: rgba(0, 0, 0, 0.48);
            opacity: 0;
            visibility: hidden;
            pointer-events: none;
            transition: opacity 0.25s ease, visibility 0.25s ease;
        }

        .noire-bag-overlay.active {
            opacity: 1;
            visibility: visible;
            pointer-events: auto;
        }

       .noire-bag-panel {
    width: min(440px, 100%);
    height: 100%;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    background: #f7f6f2;
    color: #171717;
    padding: 28px;
    box-sizing: border-box;
    transform: translateX(100%);
    transition: transform 0.25s ease;
}

        .noire-bag-overlay.active .noire-bag-panel {
            transform: translateX(0);
        }

        .noire-bag-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 16px;
            padding-bottom: 22px;
            border-bottom: 1px solid #deddd8;
        }

        .noire-bag-eyebrow {
            margin: 0 0 7px;
            font-size: 10px;
            letter-spacing: 2px;
        }

        .noire-bag-header h2 {
            margin: 0;
            font-family: "Playfair Display", Georgia, serif;
            font-size: 30px;
            font-weight: 500;
        }

        .noire-bag-close {
            width: 40px;
            height: 40px;
            flex-shrink: 0;
            border: 1px solid #deddd8;
            border-radius: 50%;
            background: transparent;
            color: inherit;
            font-size: 18px;
            cursor: pointer;
        }

       .noire-bag-items {
    flex: 1;
    min-height: 0;
    overflow-y: auto;
    padding: 10px 0 22px;
}

        .noire-bag-empty {
            padding: 45px 8px;
            text-align: center;
            color: #686868;
            line-height: 1.7;
        }

        .noire-bag-item {
            display: grid;
            grid-template-columns: 82px minmax(0, 1fr) auto;
            gap: 13px;
            align-items: center;
            padding: 16px 0;
            border-bottom: 1px solid #deddd8;
        }

        .noire-bag-item img {
            display: block;
            width: 82px;
            height: 100px;
            object-fit: cover;
            background: #e9e7e1;
        }

        .noire-bag-item h3 {
            margin: 0 0 8px;
            font-size: 13px;
            line-height: 1.5;
            font-weight: 600;
        }

        .noire-bag-item-price {
            font-size: 13px;
            font-weight: 600;
        }

        .noire-bag-remove {
            margin-top: 10px;
            padding: 0;
            border: 0;
            background: transparent;
            color: #777;
            font-size: 11px;
            text-decoration: underline;
            cursor: pointer;
        }

        .noire-bag-footer {
            padding-top: 18px;
            border-top: 1px solid #deddd8;
        }

        .noire-bag-total {
            display: flex;
            justify-content: space-between;
            gap: 12px;
            margin-bottom: 20px;
            font-size: 15px;
        }

        .noire-bag-total strong {
            font-size: 17px;
        }

        .noire-bag-checkout {
            width: 100%;
            min-height: 48px;
            padding: 12px;
            border: 1px solid #171717;
            background: #171717;
            color: white;
            font-size: 12px;
            letter-spacing: 0.5px;
            cursor: pointer;
        }

        .noire-bag-note {
            margin: 12px 0 0;
            color: #777;
            font-size: 10px;
            line-height: 1.6;
            text-align: center;
        }

        body.noire-bag-open {
            overflow: hidden;
        }

        @media (max-width: 480px) {
            .noire-bag-panel {
                padding: 22px 18px;
            }

            .noire-bag-item {
                grid-template-columns: 70px minmax(0, 1fr) auto;
                gap: 10px;
            }

            .noire-bag-item img {
                width: 70px;
                height: 88px;
            }
        }
    `;

    document.head.appendChild(bagStyle);

    function renderBag() {
        if (bagItems.length === 0) {
            bagItemsContainer.innerHTML = `
                <div class="noire-bag-empty">
                    <p>Your bag is waiting.</p>
                    <p>Tap a heart on any product to add it here.</p>
                </div>
            `;
        } else {
            bagItemsContainer.innerHTML = bagItems.map(function (item) {
                return `
                    <article class="noire-bag-item">
                        <img
                            src="${escapeHTML(item.image)}"
                            alt="${escapeHTML(item.name)}"
                        >

                        <div>
                            <h3>${escapeHTML(item.name)}</h3>
                            <div class="noire-bag-item-price">
                                ${formatPrice(item.price)}
                            </div>

                            <button
                                type="button"
                                class="noire-bag-remove"
                                data-remove-id="${escapeHTML(item.id)}"
                            >
                                Remove
                            </button>
                        </div>
                    </article>
                `;
            }).join("");
        }

        bagTotalElement.textContent = formatPrice(getBagTotal());
        updateBagCount();
        updateHearts();
    }

    function openBag() {
        renderBag();
        bagOverlay.classList.add("active");
        document.body.classList.add("noire-bag-open");
        closeBagButton.focus({ preventScroll: true });
    }

    function closeBag() {
        bagOverlay.classList.remove("active");
        document.body.classList.remove("noire-bag-open");
    }

    // Clicking the Bag icon opens the Bag panel
    bagLink.addEventListener("click", function (event) {
        event.preventDefault();
        openBag();
    });

    closeBagButton.addEventListener("click", closeBag);

    bagOverlay.addEventListener("click", function (event) {
        if (event.target === bagOverlay) {
            closeBag();
        }
    });

    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") {
            closeBag();
        }
    });

    // Heart clicks work on product cards and search result clones
    document.addEventListener("click", function (event) {
        const heart = event.target.closest(".product-card .heart");

        if (!heart) return;

        const card = heart.closest(".product-card");
        if (!card || !card.dataset.id) return;

        event.preventDefault();

        const productId = String(card.dataset.id);
        const existingIndex = bagItems.findIndex(function (item) {
            return String(item.id) === productId;
        });

        if (existingIndex !== -1) {
            bagItems.splice(existingIndex, 1);
        } else {
            const nameElement = card.querySelector(".product-info h3");
            const priceElement = card.querySelector(".product-bottom > span");
            const imageElement = card.querySelector(".product-image img");

            const priceText = priceElement
                ? priceElement.textContent.replace(/[^\d.]/g, "")
                : "0";

            bagItems.push({
                id: productId,
                name: nameElement
                    ? nameElement.textContent.trim()
                    : "NOIRÉ Product",
                price: Number(priceText) || 0,
                image: imageElement ? imageElement.getAttribute("src") : ""
            });
        }

        saveBag();
        renderBag();
    });

    // Remove products directly from the Bag panel
    bagItemsContainer.addEventListener("click", function (event) {
        const removeButton = event.target.closest("[data-remove-id]");

        if (!removeButton) return;

        const productId = removeButton.dataset.removeId;

        bagItems = bagItems.filter(function (item) {
            return String(item.id) !== String(productId);
        });

        saveBag();
        renderBag();
    });

    // Search results may add cloned product cards after page load
    const productObserver = new MutationObserver(function () {
        updateHearts();
    });

    productObserver.observe(document.body, {
        childList: true,
        subtree: true
    });

    saveBag();
    renderBag();
});


/* =========================================
   NOIRÉ — MOBILE MENU OPEN / CLOSE
========================================= */

document.addEventListener("DOMContentLoaded", function () {
    const menuButton = document.querySelector(".mobile-menu-toggle");
    const navbar = document.querySelector(".navbar");
    const navLinks = document.querySelector(".nav-links");

    if (!menuButton || !navbar || !navLinks) {
        console.error("NOIRÉ: Mobile menu HTML elements missing.");
        return;
    }

    function setMenuOpen(isOpen) {
        navbar.classList.toggle("mobile-menu-open", isOpen);

        menuButton.setAttribute("aria-expanded", String(isOpen));
        menuButton.setAttribute(
            "aria-label",
            isOpen ? "Close navigation menu" : "Open navigation menu"
        );

        menuButton.innerHTML = isOpen
            ? '<i class="fa-solid fa-xmark"></i>'
            : '<i class="fa-solid fa-bars"></i>';
    }

    menuButton.addEventListener("click", function (event) {
        event.preventDefault();
        event.stopPropagation();

        const isOpen = navbar.classList.contains("mobile-menu-open");
        setMenuOpen(!isOpen);
    });

    navLinks.querySelectorAll("a").forEach(function (link) {
        link.addEventListener("click", function () {
            setMenuOpen(false);
        });
    });

    document.addEventListener("click", function (event) {
        if (
            navbar.classList.contains("mobile-menu-open") &&
            !navbar.contains(event.target)
        ) {
            setMenuOpen(false);
        }
    });

    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") {
            setMenuOpen(false);
        }
    });

    setMenuOpen(false);
});



/* =========================================
   NOIRÉ — PRODUCT DETAILS PAGE CONNECTION
   Home + Collections + Search
========================================= */

document.addEventListener("click", function (event) {
    const card = event.target.closest(".product-card");

    if (!card || !card.dataset.id) {
        return;
    }

    // Existing buttons and links ko disturb mat karo.
    if (
        event.target.closest(
            ".heart, .quick-add, button, a, input, select, textarea, label"
        )
    ) {
        return;
    }

    const productId = card.dataset.id.trim();

    if (!productId) {
        return;
    }

    window.location.href =
        "product.html?id=" + encodeURIComponent(productId);
});


/* =========================================
   NOIRÉ — BUY NOW TO PRODUCT DETAILS
========================================= */

document.addEventListener("click", function (event) {
    const buyButton = event.target.closest(
        ".product-card .quick-add"
    );

    if (!buyButton) return;

    const productCard = buyButton.closest(".product-card");

    if (!productCard) return;

    const productId = productCard.dataset.id;

    if (!productId) {
        console.error("NOIRÉ: Product ID is missing.");
        return;
    }

    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();

    window.location.href =
        "product.html?id=" + encodeURIComponent(productId);

}, true);



/* =========================================
   NOIRÉ — VOICE SEARCH
========================================= */

document.addEventListener("DOMContentLoaded", function () {
    const micButton = document.querySelector(".navbar-search-mic");
    const searchInput = document.querySelector(".navbar-search-input");

    if (!micButton || !searchInput) return;

    const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
        micButton.addEventListener("click", function () {
            alert("Voice search is not supported in this browser. Please try Google Chrome.");
        });
        return;
    }

    const recognition = new SpeechRecognition();

    recognition.lang = "en-IN";
    recognition.continuous = false;
    recognition.interimResults = false;

    micButton.addEventListener("click", function () {
        try {
            recognition.start();
        } catch (error) {
            console.log("Voice search is already active.");
        }
    });

    recognition.addEventListener("start", function () {
        micButton.classList.add("listening");
        micButton.title = "Listening...";
    });

    recognition.addEventListener("result", function (event) {
        const spokenText = event.results[0][0].transcript.trim();

        searchInput.value = spokenText;

        const searchForm = searchInput.closest("form");

        if (searchForm) {
            searchForm.requestSubmit();
        }
    });

    recognition.addEventListener("end", function () {
        micButton.classList.remove("listening");
        micButton.title = "Search by voice";
    });

    recognition.addEventListener("error", function (event) {
        micButton.classList.remove("listening");
        micButton.title = "Search by voice";

        if (event.error === "not-allowed") {
            alert("Please allow microphone access to use voice search.");
        } else if (event.error !== "no-speech" && event.error !== "aborted") {
            alert("Voice search failed. Please try again.");
        }
    });
});
