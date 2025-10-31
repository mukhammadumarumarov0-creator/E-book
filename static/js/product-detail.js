


// Function to update cart count
function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || []
  const cartCount = document.getElementById("cart-count")
  cartCount.textContent = cart.length
}

// Get product ID from URL
function getProductIdFromUrl() {
  const params = new URLSearchParams(window.location.search)
  return params.get("id") || 1
}

// Load product details
function loadProductDetails() {
  const productId = getProductIdFromUrl()
  const product = products[productId] || products[1]

  document.getElementById("product-title").textContent = product.title
  document.getElementById("product-image").src = product.image
  document.getElementById("product-price").textContent = `$${product.price.toFixed(2)}`
  document.getElementById("product-description").textContent = product.description
  document.getElementById("product-author").textContent = product.author
  document.getElementById("product-publisher").textContent = product.publisher
  document.getElementById("product-pages").textContent = product.pages
  document.getElementById("product-genre").textContent = product.genre
  document.getElementById("breadcrumb-title").textContent = product.title

  // Show original price if on sale
  if (product.originalPrice) {
    document.getElementById("original-price").style.display = "inline"
    document.getElementById("original-price").textContent = `$${product.originalPrice.toFixed(2)}`
    document.getElementById("sale-badge").style.display = "inline-block"
  }

  // Update rating display
  const ratingText = document.querySelector(".rating-text")
  ratingText.textContent = `${product.rating} out of 5 (${product.reviews} reviews)`
}

// Quantity selector
document.getElementById("qty-plus").addEventListener("click", () => {
  const input = document.getElementById("quantity")
  input.value = Math.min(Number.parseInt(input.value) + 1, 10)
})

document.getElementById("qty-minus").addEventListener("click", () => {
  const input = document.getElementById("quantity")
  input.value = Math.max(Number.parseInt(input.value) - 1, 1)
})

// Add to cart
document.getElementById("add-to-cart-btn").addEventListener("click", function () {
  const quantity = Number.parseInt(document.getElementById("quantity").value)
  const productId = getProductIdFromUrl()
  const product = products[productId] || products[1]

  // Get existing cart
  const cart = JSON.parse(localStorage.getItem("cart")) || []

  // Check if product already in cart
  const existingItem = cart.find((item) => item.id === productId)
  if (existingItem) {
    existingItem.quantity += quantity
  } else {
    cart.push({
      id: productId,
      title: product.title,
      price: product.price,
      quantity: quantity,
      image: product.image,
    })
  }

  localStorage.setItem("cart", JSON.stringify(cart))
  updateCartCount()

  // Show feedback
  this.textContent = "Added to Cart!"
  this.style.backgroundColor = "#4CAF50"
  setTimeout(() => {
    this.textContent = "Add to Cart"
    this.style.backgroundColor = ""
  }, 2000)
})

// Wishlist
document.getElementById("wishlist-btn").addEventListener("click", function () {
  this.classList.toggle("active")
  this.textContent = this.classList.contains("active") ? "♥ Added to Wishlist" : "♡ Add to Wishlist"
})

// Initialize
loadProductDetails()
