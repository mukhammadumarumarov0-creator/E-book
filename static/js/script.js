




// Update cart count on page load
function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || []
  const cartCountElements = document.querySelectorAll(".cart-count")
  cartCountElements.forEach((el) => {
    el.textContent = cart.length
  })
}

// Initialize on page load
document.addEventListener("DOMContentLoaded", () => {
  updateCartCount()
  console.log("[v0] Book store initialized successfully")
})

// Carousel functionality
const prevBtn = document.querySelector(".carousel-btn.prev")
const nextBtn = document.querySelector(".carousel-btn.next")
const bookItems = document.querySelectorAll(".book-item")
let currentIndex = 1

prevBtn.addEventListener("click", () => {
  bookItems[currentIndex].classList.remove("active")
  currentIndex = (currentIndex - 1 + bookItems.length) % bookItems.length
  bookItems[currentIndex].classList.add("active")
})

nextBtn.addEventListener("click", () => {
  bookItems[currentIndex].classList.remove("active")
  currentIndex = (currentIndex + 1) % bookItems.length
  bookItems[currentIndex].classList.add("active")
})

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({ behavior: "smooth" })
    }
  })
})

// Add hover effects to book cards
const bookCards = document.querySelectorAll(".book-card")
bookCards.forEach((card) => {
  card.addEventListener("mouseenter", function () {
    this.style.transform = "translateY(-10px)"
  })

  card.addEventListener("mouseleave", function () {
    this.style.transform = "translateY(0)"
  })
})

const categoryBtns = document.querySelectorAll(".category-btn")

categoryBtns.forEach((btn) => {
  btn.addEventListener("click", function () {
    const selectedGenre = this.getAttribute("data-genre")

    // Update active button
    categoryBtns.forEach((b) => b.classList.remove("active"))
    this.classList.add("active")

    // Filter books
    bookCards.forEach((card) => {
      if (selectedGenre === "all" || card.getAttribute("data-genre") === selectedGenre) {
        card.classList.remove("hidden")
      } else {
        card.classList.add("hidden")
      }
    })
  })
})
