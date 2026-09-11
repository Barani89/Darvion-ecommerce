const API_URL = "http://localhost:8080/api";
const fallbackImages = {
    shirt: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=700&q=80",
    casual: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=700&q=80",
    jeans: "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=700&q=80",
    sneaker: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=700&q=80",
    default: "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=700&q=80"
};
let allProducts = [];
let activeCategory = "all";
let pendingCategory = "all";

function escapeHtml(value) {
    return String(value ?? "").replace(/[&<>'"]/g, character => ({
        "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", "\"": "&quot;"
    }[character]));
}

function productImage(product) {
    if (product.imageUrl) return product.imageUrl;
    const name = String(product.name || "").toLowerCase();
    if (name.includes("sneaker") || name.includes("shoe")) return fallbackImages.sneaker;
    if (name.includes("jean")) return fallbackImages.jeans;
    if (name.includes("casual") || name.includes("shirt")) return name.includes("casual") ? fallbackImages.casual : fallbackImages.shirt;
    return fallbackImages.default;
}

function toggleMenu() {
    const nav = document.getElementById("site-nav");
    const button = document.querySelector(".menu-toggle");
    const isOpen = nav.classList.toggle("open");
    button.setAttribute("aria-expanded", String(isOpen));
}

function getWishlist() {
    try {
        return JSON.parse(localStorage.getItem("darvion-wishlist") || "[]");
    } catch (error) {
        return [];
    }
}

function toggleWishlist(productId, button) {
    const wishlist = getWishlist();
    const index = wishlist.indexOf(productId);
    if (index === -1) {
        wishlist.push(productId);
        button.classList.add("is-liked");
        button.setAttribute("aria-label", "Remove from wishlist");
    } else {
        wishlist.splice(index, 1);
        button.classList.remove("is-liked");
        button.setAttribute("aria-label", "Add to wishlist");
    }
    localStorage.setItem("darvion-wishlist", JSON.stringify(wishlist));
}

function subscribeNewsletter() {
    const emailInput = document.getElementById("newsletter-email");
    const message = document.getElementById("newsletter-message");
    if (!emailInput.value.trim()) return;
    message.innerText = "You're on the list. Welcome to Darvion.";
    emailInput.value = "";
}

async function loadProducts(category = "all") {
    const token = localStorage.getItem("token");
    const productList = document.getElementById("product-list");
    if (!token) {
        productList.innerHTML = '<div class="empty-state"><h3>Sign in to view the collection</h3><p>Your next favorite piece is waiting.</p><a class="text-button" href="#login">Go to login <span>↗</span></a></div>';
        return;
    }
    productList.innerHTML = '<div class="loading-state"><span class="loader"></span><p>Loading the latest collection...</p></div>';
    try {
        const response = await fetch(`${API_URL}/products`, { method: "GET", headers: { "Authorization": "Bearer " + token } });
        if (!response.ok) throw new Error(response.status === 401 || response.status === 403 ? "Authentication failed" : "Failed to load products");
        allProducts = await response.json();
        activeCategory = category;
        pendingCategory = category;
        displayProducts(allProducts.filter(product => matchesCategory(product, category)));
    } catch (error) {
        console.error(error);
        productList.innerHTML = '<div class="empty-state"><h3>Collection unavailable</h3><p>Please sign in again to refresh your access.</p></div>';
    }
}

function matchesCategory(product, category) {
    if (category === "all") return true;
    const name = String(product.name || "").toLowerCase();
    const description = String(product.description || "").toLowerCase();
    const categoryName = String(product.category?.name || "").toLowerCase();
    const searchableText = `${name} ${description} ${categoryName}`;
    if (category === "tshirt") return /t[- ]?shirt|tee/.test(searchableText);
    if (category === "shirt") return /shirt/.test(searchableText) && !/t[- ]?shirt/.test(searchableText);
    if (category === "jeans") return /jean|denim/.test(searchableText);
    if (category === "sneakers") return /sneaker|shoe|trainer|footwear/.test(searchableText);
    return false;
}

function filterProducts(category) {
    if (!allProducts.length) {
        pendingCategory = category;
        loadProducts(category);
        return;
    }
    activeCategory = category;
    const productList = document.getElementById("product-list");
    productList.classList.add("is-filtering");
    window.setTimeout(() => {
        const filteredProducts = allProducts.filter(product => matchesCategory(product, category));
        displayProducts(filteredProducts);
        productList.classList.remove("is-filtering");
    }, 180);
}

function displayProducts(products) {
    const productList = document.getElementById("product-list");
    productList.innerHTML = "";
    if (!products.length) {
        productList.innerHTML = '<div class="empty-state"><h3>No products available</h3><p>Check back soon for the next drop.</p></div>';
        return;
    }
    products.forEach((product, index) => {
        const card = document.createElement("article");
        card.className = "product-card";
        card.style.animationDelay = `${index * 70}ms`;
        const stockLabel = product.stock > 0 ? `${product.stock} in stock` : "Sold out";
        const isLiked = getWishlist().includes(Number(product.id));
        card.innerHTML = `
            <div class="product-image"><img src="${escapeHtml(productImage(product))}" alt="${escapeHtml(product.name)}" loading="lazy" onerror="this.src='${fallbackImages.default}'"><span class="product-tag">New in</span><button class="wishlist-button${isLiked ? " is-liked" : ""}" type="button" aria-label="${isLiked ? "Remove from wishlist" : "Add to wishlist"}" onclick="toggleWishlist(${Number(product.id)}, this)">${isLiked ? "♥" : "♡"}</button></div>
            <div class="product-info"><h3>${escapeHtml(product.name)}</h3><p class="product-description">${escapeHtml(product.description || "A considered everyday essential.")}</p><div class="product-bottom"><span class="price">₹${Number(product.price).toLocaleString("en-IN")}</span><span class="stock">${stockLabel}</span></div><button class="add-button" type="button" onclick="addToCart(${Number(product.id)})" ${product.stock <= 0 ? "disabled" : ""}>${product.stock > 0 ? "Add to bag" : "Out of stock"}</button></div>`;
        productList.appendChild(card);
    });
}

async function addToCart(productId) {
    const token = localStorage.getItem("token");
    if (!token) { alert("Please login first."); return; }
    try {
        const response = await fetch(`${API_URL}/cart/add?userId=1&productId=${productId}&quantity=1`, { method: "POST", headers: { "Authorization": "Bearer " + token } });
        if (!response.ok) throw new Error("Unable to add product to cart");
        alert("Product added to cart!");
        loadCart();
    } catch (error) { console.error(error); alert("Unable to add product to cart."); }
}

async function loadCart() {
    const token = localStorage.getItem("token");
    if (!token) return;
    try {
        const response = await fetch(`${API_URL}/cart/1`, { method: "GET", headers: { "Authorization": "Bearer " + token } });
        if (!response.ok) throw new Error("Failed to load cart");
        displayCart(await response.json());
    } catch (error) {
        console.error(error);
        document.getElementById("cart-items").innerHTML = '<div class="empty-state"><h3>Unable to load your bag</h3><p>Please try again in a moment.</p></div>';
    }
}

function displayCart(cartItems) {
    const cartContainer = document.getElementById("cart-items");
    const cartCount = document.getElementById("cart-count");
    cartCount.textContent = cartItems.reduce((total, item) => total + item.quantity, 0);
    if (!cartItems.length) {
        cartContainer.innerHTML = '<div class="empty-state"><span class="empty-icon">＋</span><h3>Your bag is waiting</h3><p>Add a few pieces from the collection to see them here.</p><a href="#products" class="text-button">Browse products <span>↗</span></a></div>';
        return;
    }
    cartContainer.innerHTML = cartItems.map(item => `<div class="cart-item"><div><h3>${escapeHtml(item.product.name)}</h3><p>₹${Number(item.product.price).toLocaleString("en-IN")} × ${item.quantity} · Total ₹${(item.product.price * item.quantity).toLocaleString("en-IN")}</p></div><button class="remove-button" type="button" onclick="removeFromCart(${Number(item.id)})">Remove</button></div>`).join("");
}

async function removeFromCart(cartItemId) {
    const token = localStorage.getItem("token");
    if (!token) { alert("Please login first."); return; }
    try {
        const response = await fetch(`${API_URL}/cart/remove/${cartItemId}`, { method: "DELETE", headers: { "Authorization": "Bearer " + token } });
        if (!response.ok) throw new Error("Unable to remove cart item");
        alert("Product removed from cart!");
        loadCart();
    } catch (error) { console.error(error); alert("Unable to remove product."); }
}

async function loginUser() {
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const message = document.getElementById("login-message");
    if (!email || !password) { message.innerText = "Please enter email and password."; return; }
    message.innerText = "Signing you in...";
    try {
        const response = await fetch(`${API_URL}/users/login`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email, password }) });
        const result = await response.text();
        if (!response.ok || result === "Invalid email or password") throw new Error(result);
        localStorage.setItem("token", result);
        message.innerText = "Login successful.";
        alert("Login successful!");
        loadProducts();
        loadCart();
    } catch (error) {
        console.error(error);
        message.innerText = "Invalid email or password.";
    }
}

document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".site-nav a").forEach(link => link.addEventListener("click", () => document.getElementById("site-nav").classList.remove("open")));
    const sections = document.querySelectorAll("main > section");
    if ("IntersectionObserver" in window) {
        sections.forEach(section => section.classList.add("reveal-on-scroll"));
        const observer = new IntersectionObserver(entries => entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
                observer.unobserve(entry.target);
            }
        }), { threshold: 0.12 });
        sections.forEach(section => observer.observe(section));
    }
    loadProducts();
    if (localStorage.getItem("token")) loadCart();
});