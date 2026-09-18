const API_URL = "http://localhost:8080/api";

// Every named product has its own image. API imageUrl is used only for unknown products.
const productImages = {
  "Oversized Black T-Shirt": "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=85",
  "Premium White Shirt": "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=900&q=85",
  "Relaxed Fit Jeans": "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=900&q=85",
  "Cargo Pants": "https://images.unsplash.com/photo-1517438476312-10d79c077509?auto=format&fit=crop&w=900&q=85",
  "Linen Shirt": "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=900&q=85",
  "Bomber Jacket": "https://images.unsplash.com/photo-1523398002811-999ca8dec234?auto=format&fit=crop&w=900&q=85",
  "Polo T-Shirt": "https://images.unsplash.com/photo-1625910513413-5fc45a37b6c8?auto=format&fit=crop&w=900&q=85",
  "Denim Jacket": "https://images.unsplash.com/photo-1578681994506-b8f463449011?auto=format&fit=crop&w=900&q=85",
  "Hoodie": "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=900&q=85",
  "Formal Shirt": "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=900&q=85",
  "Satin Dress": "https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=900&q=85",
  "Oversized Blazer": "https://images.unsplash.com/photo-1591369822096-ffd140ec948f?auto=format&fit=crop&w=900&q=85",
  "Wide Leg Jeans": "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=900&q=85",
  "Crop Top": "https://images.unsplash.com/photo-1566206091558-7f218b696731?auto=format&fit=crop&w=900&q=85",
  "Linen Dress": "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=900&q=85",
  "Co-ord Set": "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=900&q=85",
  "Maxi Dress": "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?auto=format&fit=crop&w=900&q=85",
  "Knit Top": "https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=900&q=85",
  "Graphic T-Shirt": "https://images.unsplash.com/photo-1627225924765-552d49cf47ad?auto=format&fit=crop&w=900&q=85",
  "Denim Shirt": "https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&w=900&q=85",
  "Cargo Joggers": "https://images.unsplash.com/photo-1552902865-b72c031ac5ea?auto=format&fit=crop&w=900&q=85",
  "Casual Shorts": "https://images.unsplash.com/photo-1565084888279-aca607ecce0c?auto=format&fit=crop&w=900&q=85",
  "Checked Shirt": "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?auto=format&fit=crop&w=900&q=85",
  "Floral Dress": "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=900&q=85",
  "Party Dress": "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=900&q=85",
  "Denim Skirt": "https://images.unsplash.com/photo-1583496661160-fb5886a13d27?auto=format&fit=crop&w=900&q=85",
  "Crop Jacket": "https://images.unsplash.com/photo-1543076447-215ad9ba6923?auto=format&fit=crop&w=900&q=85",
  "Casual Top": "https://images.unsplash.com/photo-1564257577054-3e2c9a3f9c6c?auto=format&fit=crop&w=900&q=85",
  "Baby Romper": "https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&w=900&q=85",
  "Cotton Bodysuit": "https://images.unsplash.com/photo-1596870230751-ebdfce98ec42?auto=format&fit=crop&w=900&q=85",
  "Baby Dress": "https://images.unsplash.com/photo-1607453998774-d533f65dac99?auto=format&fit=crop&w=900&q=85",
  "Baby T-Shirt": "https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?auto=format&fit=crop&w=900&q=85",
  "Baby Shorts": "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&w=900&q=85",
  "Newborn Set": "https://images.unsplash.com/photo-1544126592-807ade215a0b?auto=format&fit=crop&w=900&q=85",
  "Kids Hoodie": "https://images.unsplash.com/photo-1503919545889-aef636e10ad4?auto=format&fit=crop&w=900&q=85",
  "Kids Jeans": "https://images.unsplash.com/photo-1519457431-44ccd64a579b?auto=format&fit=crop&w=900&q=85",
  "Kids T-Shirt": "https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=900&q=85",
  "Kids Dress": "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=900&q=85",
  "Kids Jacket": "https://images.unsplash.com/photo-1602030028438-4cf153cbae9e?auto=format&fit=crop&w=900&q=85",
  "Kids Co-ord Set": "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=900&q=85"
};

const categoryProductImages = {
  "women:denim jacket": "https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?auto=format&fit=crop&w=900&q=85",
  "women:casual shirt": "https://images.unsplash.com/photo-1490114538077-0a7f8cb49891?auto=format&fit=crop&w=900&q=85",
  "boys:hoodie": "https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?auto=format&fit=crop&w=900&q=85",
  "girls:co-ord set": "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&w=900&q=85"
};

const fallbackCategoryOverrides = {
  "Women's Denim Jacket": "women",
  "Women's Casual Shirt": "women",
  "Boys Hoodie": "boys",
  "Girls Co-ord Set": "girls"
};

productImages["Women's Denim Jacket"] = categoryProductImages["women:denim jacket"];
productImages["Women's Casual Shirt"] = categoryProductImages["women:casual shirt"];
productImages["Boys Hoodie"] = categoryProductImages["boys:hoodie"];
productImages["Girls Co-ord Set"] = categoryProductImages["girls:co-ord set"];

const uniqueFallbackImages = [
  "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&w=900&q=85",
  "https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?auto=format&fit=crop&w=900&q=85",
  "https://images.unsplash.com/photo-1490114538077-0a7f8cb49891?auto=format&fit=crop&w=900&q=85",
  "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=900&q=85",
  "https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?auto=format&fit=crop&w=900&q=85"
];

const categoryImages = {
  men: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=85",
  women: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=900&q=85",
  boys: "https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?auto=format&fit=crop&w=900&q=85",
  girls: "https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?auto=format&fit=crop&w=900&q=85",
  baby: "https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&w=900&q=85",
  kids: "https://images.unsplash.com/photo-1503919545889-aef636e10ad4?auto=format&fit=crop&w=900&q=85"
};

const collectionMeta = {
  essentials: { title: "Essentials", description: "Quiet foundations for a wardrobe that works harder.", image: "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=1200&q=85" },
  urban: { title: "Urban Edit", description: "Utility, texture, and a little after-hours energy.", image: "https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?auto=format&fit=crop&w=1200&q=85" },
  weekend: { title: "Weekend Wear", description: "Relaxed textures and easy layers for unplanned days.", image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=85" },
  party: { title: "Party Edit", description: "Make an entrance without saying a word.", image: "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?auto=format&fit=crop&w=1200&q=85" },
  denim: { title: "Denim Stories", description: "The familiar fabric, reworked for a new everyday.", image: "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=1200&q=85" },
  summer: { title: "Summer Edit", description: "Breathable shapes and light colour for warmer days.", image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=85" },
  festive: { title: "Festive Edit", description: "Expressive pieces with occasion-ready polish.", image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=1200&q=85" },
  kids: { title: "Kids Play", description: "Colour, comfort, and room to move freely.", image: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=1200&q=85" },
  baby: { title: "Baby Comfort", description: "Soft essentials for tiny everyday adventures.", image: "https://images.unsplash.com/photo-1544126592-807ade215a0b?auto=format&fit=crop&w=1200&q=85" }
};

const fallbackProducts = Object.entries(productImages).map(([name, imageUrl], index) => ({
  id: `visual-${index + 1}`,
  name,
  description: "A considered DKART piece designed for modern everyday wear.",
  price: 899 + (index % 10) * 300,
  stock: 8 + (index % 18),
  category: fallbackCategoryOverrides[name] || (index < 10 ? "men" : index < 20 ? "women" : index < 26 ? "boys" : index < 32 ? "girls" : index < 38 ? "baby" : "kids"),
  imageUrl,
  backendProduct: false,
  newArrival: index % 3 === 0,
  trending: index % 4 === 0,
  collection: index % 3 === 0 ? "essentials" : index % 3 === 1 ? "urban" : "party",
  sizes: ["S", "M", "L", "XL"]
}));

let allProducts = [...fallbackProducts];
let activeCategory = "all";
let recognition = null;

function escapeHtml(value) { return String(value ?? "").replace(/[&<>"']/g, character => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;", "'": "&#39;" }[character])); }
function formatPrice(value) { return `₹${Number(value || 0).toLocaleString("en-IN")}`; }
function normalizeText(value) { return String(value || "").toLowerCase().replace(/collection|category|edit/g, "").replace(/[^a-z0-9]+/g, " ").trim(); }
function showToast(message, isError = false) { const toast = document.getElementById("toast"); if (!toast) return; toast.textContent = message; toast.classList.toggle("is-error", isError); toast.classList.add("is-visible"); window.clearTimeout(showToast.timer); showToast.timer = window.setTimeout(() => toast.classList.remove("is-visible"), 3200); }
function getAuthenticatedUserId() { const storedId = Number(localStorage.getItem("userId") || localStorage.getItem("user_id")); if (Number.isInteger(storedId) && storedId > 0) return storedId; const token = localStorage.getItem("token"); try { const payload = JSON.parse(atob(token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/"))); const tokenId = Number(payload.id || payload.userId || payload.uid); return Number.isInteger(tokenId) && tokenId > 0 ? tokenId : null; } catch (error) { return null; } }
async function getErrorMessage(response, fallback) { let body = ""; try { body = await response.text(); } catch (error) { body = ""; } console.error("DKART API error", { status: response.status, body }); if (response.status === 401) return "Please login again."; if (response.status === 403) return "Your session has expired. Please login again."; if (response.status === 404) return "Product is not available."; if (response.status >= 500) return "Something went wrong. Please try again."; return body || fallback; }
function getWishlist() { try { return JSON.parse(localStorage.getItem("dkart-wishlist") || "[]"); } catch (error) { return []; } }
function productImage(product) {
  const categoryKey = `${String(product.category || "").toLowerCase()}:${String(product.name || "").toLowerCase()}`;
  if (categoryProductImages[categoryKey]) return categoryProductImages[categoryKey];
  if (productImages[product.name]) return productImages[product.name];
  const fallbackIndex = Math.abs(Number(product.id || 0)) % uniqueFallbackImages.length;
  return uniqueFallbackImages[fallbackIndex] || categoryImages[product.category] || categoryImages.men;
}
function normalizeProduct(raw) { const category = normalizeText(raw.category?.name || raw.category || "general"); const normalized = { ...raw, backendProduct: true, category, name: raw.name || "DKART Essential", price: Number(raw.price || 0), stock: Number(raw.stock || 0), description: raw.description || "A considered piece designed for modern everyday wear." }; normalized.imageUrl = productImage(normalized); return normalized; }

function toggleMenu() { const nav = document.getElementById("site-nav"); const button = document.querySelector(".menu-toggle"); const open = nav.classList.toggle("open"); button.setAttribute("aria-expanded", String(open)); }
function focusSearch(event) { event.preventDefault(); document.getElementById("product-search").focus(); document.getElementById("products").scrollIntoView({ behavior: "smooth" }); }
function getProductById(id) { return allProducts.find(product => Number(product.id) === Number(id)); }

async function loadProducts() {
  const token = localStorage.getItem("token");
  if (token) {
    try {
      const response = await fetch(`${API_URL}/products`, { method: "GET", headers: { Authorization: "Bearer " + token } });
      if (!response.ok) throw new Error("Unable to load products");
      const data = await response.json();
      const backendProducts = Array.isArray(data) ? data.map(normalizeProduct) : [];
      const backendNames = new Set(backendProducts.map(product => normalizeText(product.name)));
      allProducts = [...backendProducts, ...fallbackProducts.filter(product => !backendNames.has(normalizeText(product.name)))];
    } catch (error) { console.error(error); allProducts = [...fallbackProducts]; }
  }
  renderProducts(applyFilterToList(allProducts));
  renderTrending();
  renderCollectionCards();
}

function renderCollectionCards() {
  const grid = document.querySelector(".collection-grid");
  if (!grid) return;
  grid.innerHTML = Object.entries(collectionMeta).map(([key, collection], index) => `<article class="collection-card" style="background-image:url('${collection.image}')"><div><span>${String(index + 1).padStart(2, "0")} / CURATED</span><h3>${collection.title}</h3><p>${collection.description}</p><button onclick="showCollection('${key}')">View collection ↗</button></div></article>`).join("");
}

function filterProductsByCategory(list, category) { const target = normalizeText(category); if (!target || target === "all") return list; return list.filter(product => { const productCategory = normalizeText(product.category); const productText = normalizeText(`${product.name} ${product.description}`); return productCategory === target || productCategory.includes(target) || (target === "kids" && productText.includes("kids")) || (target === "baby" && productText.includes("baby")); }); }
function filterProductsByCollection(list, collection) { const target = normalizeText(collection); const aliases = { "kids play": "kids", "baby comfort": "baby", "denim stories": "denim", "party edit": "party", "urban edit": "urban", "weekend wear": "weekend", "summer edit": "summer", "festive edit": "festive" }; const collectionTarget = aliases[target] || target; return list.filter(product => { const productCollection = normalizeText(product.collection); const text = normalizeText(`${product.name} ${product.description}`); if (collectionTarget === "kids" || collectionTarget === "baby") return normalizeText(product.category).includes(collectionTarget); if (collectionTarget === "denim") return /denim|jeans|jacket/.test(text); if (collectionTarget === "party" || collectionTarget === "festive") return /dress|party|formal|satin|co ord|occasion/.test(text); if (collectionTarget === "urban") return /cargo|hoodie|bomber|jacket|jogger|street/.test(text) || productCollection === "urban"; return productCollection === collectionTarget || text.includes(collectionTarget); }); }
function applyFilterToList(list) { if (activeCategory === "all") return list; if (activeCategory === "new") return list.filter(product => product.newArrival || Number(product.id) % 3 === 0); if (activeCategory === "trending") return list.filter(product => product.trending || Number(product.id) % 4 === 0); if (activeCategory === "offers") return list.filter(product => product.price <= 5000 && product.stock > 0); if (collectionMeta[activeCategory]) return filterProductsByCollection(list, collectionMeta[activeCategory].title); return filterProductsByCategory(list, activeCategory); }

function setCategory(category) {
  activeCategory = category;
  const titles = { men: "Men's edit", women: "Women's edit", boys: "Boys' edit", girls: "Girls' edit", baby: "Baby edit", kids: "Kids' edit", new: "New arrivals", trending: "Trending now", offers: "Offers" };
  document.getElementById("product-title").innerHTML = `${titles[category] || "Pieces with <i>presence.</i>"}`;
  renderProducts(applyFilterToList(filteredBySearch(allProducts)));
  document.getElementById("products").scrollIntoView({ behavior: "smooth" });
}

function filteredBySearch(list) {
  const query = (document.getElementById("product-search")?.value || "").toLowerCase().trim();
  const price = document.getElementById("price-filter")?.value || "all";
  return list.filter(product => (!query || `${product.name} ${product.description} ${product.category}`.toLowerCase().includes(query)) && (price === "all" || product.price < Number(price)));
}
function applyFilters() { renderProducts(applyFilterToList(filteredBySearch(allProducts))); }
function resetFilters() { activeCategory = "all"; document.getElementById("product-search").value = ""; document.getElementById("price-filter").value = "all"; document.getElementById("product-title").innerHTML = "Pieces with <i>presence.</i>"; renderProducts(allProducts); }

function renderProducts(products, targetId = "product-grid") {
  const grid = document.getElementById(targetId);
  if (!grid) return;
  grid.innerHTML = "";
  if (!products.length) { grid.innerHTML = '<div class="empty-state"><h3>No pieces found</h3><p>Try another edit or reset your filters.</p></div>'; return; }
  products.slice(0, 12).forEach((product, index) => {
    const liked = getWishlist().includes(Number(product.id));
    const card = document.createElement("article"); card.className = "product-card"; card.style.animationDelay = `${index * 45}ms`;
    const canPurchase = Boolean(product.backendProduct && product.id);
    const productId = canPurchase ? Number(product.id) : "null";
    card.innerHTML = `<div class="product-image"><img src="${escapeHtml(productImage(product))}" alt="${escapeHtml(product.name)}" loading="lazy" onerror="this.src='${escapeHtml(categoryImages[product.category] || categoryImages.men)}'"><span class="product-tag">${product.newArrival ? "NEW" : product.trending ? "TRENDING" : "THE EDIT"}</span><button class="wishlist-button ${liked ? "is-liked" : ""}" aria-label="Add to wishlist" onclick="toggleWishlist(${productId}, this)">${liked ? "♥" : "♡"}</button></div><div class="product-info"><span class="product-category">${escapeHtml(String(product.category).toUpperCase())}</span><h3>${escapeHtml(product.name)}</h3><p class="product-description">${escapeHtml(product.description)}</p><div class="product-bottom"><span class="price">${formatPrice(product.price)}</span><span class="stock">${product.stock > 0 ? `${product.stock} in stock` : "sold out"}</span></div><div class="product-actions"><button class="add-button" onclick="addToCart(${productId})" ${!canPurchase || product.stock <= 0 ? "disabled" : ""}>${!canPurchase ? "Login to buy" : product.stock > 0 ? "Add to bag" : "Sold out"}</button><button class="ai-button" onclick="openProductDetail(${productId})">Details</button></div></div>`;
    card.addEventListener("click", event => { if (!event.target.closest("button")) openProductDetail(product.id); }); grid.appendChild(card);
  });
}

function renderTrending() { renderProducts(allProducts.filter(product => product.trending || Number(product.id) % 4 === 0).slice(0, 8), "trending-grid"); }
function showCollection(key) { const meta = collectionMeta[key]; const products = filterProductsByCollection(allProducts, meta?.title || key).slice(0, 6); const showcase = document.getElementById("collection-showcase"); if (!meta || !showcase) return; showcase.innerHTML = `<div class="showcase-header"><img src="${meta.image}" alt="${meta.title}"><div><p class="eyebrow">Collection / ${key}</p><h3>${meta.title}</h3><p>${meta.description}</p><button onclick="setCategory('${key}')">View collection</button></div></div><div id="collection-products" class="product-grid" style="margin-top:18px"></div>`; renderProducts(products, "collection-products"); showcase.scrollIntoView({ behavior: "smooth", block: "center" }); }

function toggleWishlist(id, button) { const list = getWishlist(); const number = Number(id); const index = list.indexOf(number); if (index >= 0) { list.splice(index, 1); button.classList.remove("is-liked"); button.textContent = "♡"; } else { list.push(number); button.classList.add("is-liked"); button.textContent = "♥"; } localStorage.setItem("dkart-wishlist", JSON.stringify(list)); }
function openProductDetail(id) { const product = getProductById(id); if (!product) return; const gallery = [productImage(product), ...Object.values(productImages).filter(image => image !== productImage(product)).slice(0, 3)]; const related = allProducts.filter(item => item.id !== product.id && normalizeText(item.category) === normalizeText(product.category)).slice(0, 3); document.getElementById("product-detail").innerHTML = `<div class="detail-layout"><div class="detail-gallery">${gallery.map((image, index) => `<img src="${image}" alt="${escapeHtml(product.name)} view ${index + 1}" onerror="this.src='${categoryImages[product.category] || categoryImages.men}'">`).join("")}</div><div class="detail-copy"><span class="eyebrow">${escapeHtml(String(product.category).toUpperCase())}</span><h2>${escapeHtml(product.name)}</h2><span class="detail-price">${formatPrice(product.price)}</span><p>${escapeHtml(product.description)}</p><p>${product.stock} pieces available for immediate delivery.</p><div class="detail-controls"><select id="detail-size">${(product.sizes || ["S", "M", "L", "XL"]).map(size => `<option>${size}</option>`).join("")}</select><input id="detail-quantity" type="number" min="1" max="${product.stock || 1}" value="1"><button onclick="addDetailToBag(${Number(product.id)})">Add to bag</button><button onclick="buyNow(${Number(product.id)})">Buy now</button></div><button class="wishlist-detail text-button" onclick="toggleWishlist(${Number(product.id)}, this)">♡ Add to wishlist</button><button class="text-button" style="margin-top:20px" onclick="toggleDara(true)">Ask Alexa about this piece ↗</button><h3 style="margin-top:28px;font-family:Playfair Display,serif">You may also like</h3><div class="related-products">${related.map(item => `<button onclick="openProductDetail(${Number(item.id)})"><img src="${productImage(item)}" alt="${escapeHtml(item.name)}"><span>${escapeHtml(item.name)}</span></button>`).join("")}</div></div></div>`; document.getElementById("product-modal").classList.add("is-open"); document.getElementById("product-modal").setAttribute("aria-hidden", "false"); }
function closeProductDetails() { document.getElementById("product-modal").classList.remove("is-open"); document.getElementById("product-modal").setAttribute("aria-hidden", "true"); }
function addDetailToBag(id) { const quantity = Number(document.getElementById("detail-quantity")?.value || 1); addToCart(id, quantity); closeProductDetails(); }
function buyNow(id) { addDetailToBag(id); document.getElementById("cart").scrollIntoView({ behavior: "smooth" }); }

async function addToCart(productId, quantity = 1) { const token = localStorage.getItem("token"); if (!token) { showToast("Please login to continue.", true); return; } const product = getProductById(productId); const userId = getAuthenticatedUserId(); if (!product || !product.backendProduct || !Number.isInteger(Number(productId))) { showToast("This visual piece is not available in the live catalogue yet.", true); return; } if (!userId) { console.error("Cannot add to cart: the JWT has no user ID claim and no stored userId is available."); showToast("Your account ID is unavailable. Please sign in again.", true); return; } try { const response = await fetch(`${API_URL}/cart/add?userId=${encodeURIComponent(userId)}&productId=${encodeURIComponent(productId)}&quantity=${encodeURIComponent(quantity)}`, { method: "POST", headers: { Authorization: "Bearer " + token } }); if (!response.ok) { showToast(await getErrorMessage(response, "Unable to add product to cart."), true); return; } showToast("Added to bag ✓"); await loadCart(); } catch (error) { console.error("Cart add request failed", error); showToast("Unable to reach the cart. Please try again.", true); } }
async function loadCart() { const token = localStorage.getItem("token"); const userId = getAuthenticatedUserId(); if (!token || !userId) return; try { const response = await fetch(`${API_URL}/cart/${encodeURIComponent(userId)}`, { method: "GET", headers: { Authorization: "Bearer " + token } }); if (!response.ok) { console.error("Cart load failed", { status: response.status, body: await response.text() }); return; } displayCart(await response.json()); } catch (error) { console.error("Cart load request failed", error); } }
function displayCart(items) { const container = document.getElementById("cart-items"); document.getElementById("cart-count").textContent = items.reduce((sum, item) => sum + item.quantity, 0); if (!items.length) { container.innerHTML = '<div class="empty-state"><h3>Your bag is waiting</h3><p>Add a few pieces from the collection to see them here.</p></div>'; return; } container.innerHTML = items.map(item => `<div class="cart-item"><div><h3>${escapeHtml(item.product.name)}</h3><p>${formatPrice(item.product.price)} × ${item.quantity} · Total ${formatPrice(item.product.price * item.quantity)}</p></div><button class="remove-button" onclick="removeFromCart(${Number(item.id)})">Remove</button></div>`).join(""); document.getElementById("cart-summary").textContent = `${items.length} piece${items.length === 1 ? "" : "s"} in your bag`; }
async function removeFromCart(id) { const token = localStorage.getItem("token"); if (!token) { showToast("Please login to continue.", true); return; } try { const response = await fetch(`${API_URL}/cart/remove/${encodeURIComponent(id)}`, { method: "DELETE", headers: { Authorization: "Bearer " + token } }); if (!response.ok) { showToast(await getErrorMessage(response, "Unable to remove product."), true); return; } showToast("Removed from bag"); await loadCart(); } catch (error) { console.error("Cart remove request failed", error); showToast("Unable to reach the cart. Please try again.", true); } }

async function loginUser() { const email = document.getElementById("email").value.trim(); const password = document.getElementById("password").value; const message = document.getElementById("login-message"); if (!email || !password) { message.textContent = "Please enter email and password."; return; } try { const response = await fetch(`${API_URL}/users/login`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email, password }) }); const result = await response.text(); if (!response.ok || result === "Invalid email or password") throw new Error(result); localStorage.setItem("token", result); message.textContent = "Login successful."; showToast("Login successful"); await loadProducts(); await loadCart(); } catch (error) { console.error("Login failed", error); message.textContent = "Invalid email or password."; showToast("Invalid email or password.", true); } }
function subscribeNewsletter() { const input = document.getElementById("newsletter-email"); document.getElementById("newsletter-message").textContent = input.value ? "You are on the list. Welcome to DKART." : "Enter your email to subscribe."; input.value = ""; }

function toggleDara(force) { const panel = document.getElementById("dara-panel"); const open = typeof force === "boolean" ? force : !panel.classList.contains("is-open"); panel.classList.toggle("is-open", open); panel.setAttribute("aria-hidden", String(!open)); document.querySelector(".dara-launcher").setAttribute("aria-expanded", String(open)); }
function addDaraMessage(text, type) { const thread = document.getElementById("dara-thread"); const message = document.createElement("div"); message.className = `dara-message ${type}`; message.textContent = text; thread.appendChild(message); thread.scrollTop = thread.scrollHeight; }
function setDaraVoiceState(state) { const stateElement = document.getElementById("dara-voice-state"); if (stateElement) stateElement.textContent = state; document.getElementById("dara-panel")?.classList.toggle("is-listening", state === "Listening..."); }
function chooseDaraVoice() { if (!("speechSynthesis" in window)) return null; const voices = window.speechSynthesis.getVoices(); return voices.find(voice => /^en(-|_)/i.test(voice.lang) && /female|zira|samantha|susan|karen|victoria|hazel|google uk english female/i.test(voice.name)) || voices.find(voice => /^en(-|_)/i.test(voice.lang)) || null; }
function speakDara(text) { if (!("speechSynthesis" in window)) return; window.speechSynthesis.cancel(); setDaraVoiceState("Speaking..."); const utterance = new SpeechSynthesisUtterance(text); const voice = chooseDaraVoice(); if (voice) utterance.voice = voice; utterance.lang = voice?.lang || "en-IN"; utterance.rate = .92; utterance.pitch = 1.05; utterance.volume = 1; utterance.onend = () => setDaraVoiceState("Tap to talk"); window.speechSynthesis.speak(utterance); }
function useDaraSuggestion(button) { document.getElementById("dara-input").value = button.textContent; askDara(); }
function addDaraRecommendations(products) { const thread = document.getElementById("dara-thread"); const wrap = document.createElement("div"); wrap.className = "dara-message bot dara-recommendations"; wrap.innerHTML = products.map(product => `<button type="button" onclick="openProductDetail(${Number(product.id)})"><strong>${escapeHtml(product.name)}</strong><span>${formatPrice(product.price)}</span></button>`).join(""); thread.appendChild(wrap); thread.scrollTop = thread.scrollHeight; }
function normalizeAlexaText(text) { return normalizeText(text).replace(/venum|venumga|venumnga|venum bro|venum ma|venum akka/g, "want").replace(/kulla|ulla|within|budget la|budget ulla/g, "under").replace(/karuppu|karupu/g, "black").replace(/vellai|white color/g, "white").replace(/sattai|shirt venum|top venum/g, "shirt").replace(/udai|dress venum|dress ah/g, "dress").replace(/pasanga|boys ku|boy ku/g, "boys").replace(/ponnunga|girls ku|girl ku/g, "girls").replace(/kuzhandhai|baby ku/g, "baby").replace(/college mudichitu|farewell ku|farewell look/g, "college farewell").replace(/seekiram|ippo|today/g, "today"); }
function askDara() { const input = document.getElementById("dara-input"); const text = input.value.trim(); if (!text) return; addDaraMessage(text, "user"); input.value = ""; setDaraVoiceState("Thinking..."); const normalized = normalizeAlexaText(text); const budgetMatch = text.match(/(?:under|below|budget|less than|kulla|ulla)\s*₹?\s*(\d+)/i); const budget = budgetMatch ? Number(budgetMatch[1]) : null; let picks = allProducts.filter(product => product.stock > 0 && (!budget || product.price <= budget)); if (/baby|newborn|infant/.test(normalized)) picks = picks.filter(product => normalizeText(product.category).includes("baby")); else if (/kid|child|children|boys|girls/.test(normalized)) picks = picks.filter(product => /kids|boys|girls/.test(normalizeText(product.category))); else if (/jean|denim/.test(normalized)) picks = picks.filter(product => /jean|denim/.test(normalizeText(`${product.name} ${product.description}`))); else if (/party|farewell|dress|wedding|date|dinner|college/.test(normalized)) picks = picks.filter(product => /dress|party|formal|satin|shirt|blazer/.test(normalizeText(`${product.name} ${product.description}`))); else if (/black|dark/.test(normalized)) picks = picks.filter(product => /black|dark|bomber|hoodie/.test(normalizeText(`${product.name} ${product.description}`))); picks = picks.slice(0, 3); window.setTimeout(() => { let response = "Naan konjam options kandupidichirukken. Colour, size, illa occasion sollunga, innum better-a filter pannuren."; if (/^hi$|^hello$|^hey$|how are you|vanakkam|vanakam/.test(normalized)) response = "Hi! Naan Alexa. Ungalukku enna look venum? Occasion, colour, size, illa budget sollunga."; else if (/thank|thanks|nandri/.test(normalized)) response = "Welcome! Ungalukku style panna naan ready."; else if (/who are you|your name|nee yaaru/.test(normalized)) response = "Naan Alexa, unga DKART fashion concierge. Outfit build panna, products find panna, budget-kulla suggest panna help pannuren."; else if (/farewell|college/.test(normalized)) response = "College farewell-ku super look venum la? Classic, bold, illa effortless style-la edhu venum?"; else if (!picks.length) response = budget ? `₹${budget.toLocaleString("en-IN")} kulla in-stock piece kidaikkala. Budget konjam increase pannalama, illa vera style try pannalama?` : "Exact match kidaikkala. Occasion, colour, category sollunga, naan marubadiyum find pannuren."; addDaraMessage(response, "bot"); if (picks.length) addDaraRecommendations(picks); speakDara(response + (picks.length ? ` ${picks.map(product => product.name).join(", ")}.` : "")); }, 450); }
function toggleDaraVoice() { const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition; if (!SpeechRecognition) { addDaraMessage("Indha browser voice input support panna maatengudhu. Keela type pannunga.", "bot"); setDaraVoiceState("Text input available"); return; } if (recognition) { recognition.stop(); recognition = null; setDaraVoiceState("Ready to help"); return; } recognition = new SpeechRecognition(); recognition.lang = "en-IN"; recognition.interimResults = false; recognition.maxAlternatives = 3; recognition.onstart = () => setDaraVoiceState("Listening..."); recognition.onresult = event => { const transcript = Array.from(event.results[0]).sort((first, second) => second.confidence - first.confidence)[0].transcript; setDaraVoiceState("Thinking..."); document.getElementById("dara-input").value = transcript; askDara(); }; recognition.onerror = event => { console.error("Alexa microphone error", event.error); recognition = null; setDaraVoiceState("Ready to help"); addDaraMessage(event.error === "not-allowed" ? "Microphone permission allow pannunga, appo naan voice-la help pannuren." : "Konjam clear-a marubadiyum pesunga, illa type pannunga.", "bot"); }; recognition.onend = () => { recognition = null; if (document.getElementById("dara-voice-state")?.textContent === "Listening...") setDaraVoiceState("Ready to help"); }; try { recognition.start(); } catch (error) { console.error("Alexa microphone start failed", error); setDaraVoiceState("Ready to help"); } }

document.addEventListener("DOMContentLoaded", () => { document.querySelectorAll(".site-nav a").forEach(link => link.addEventListener("click", () => document.getElementById("site-nav").classList.remove("open"))); loadProducts(); if (localStorage.getItem("token")) loadCart(); });
