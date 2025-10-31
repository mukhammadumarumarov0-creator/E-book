// Handle contact form submission
document.getElementById("contact-form").addEventListener("submit", function (e) {
  e.preventDefault()

  const name = document.getElementById("name").value
  const email = document.getElementById("email").value
  const phone = document.getElementById("phone").value
  const subject = document.getElementById("subject").value
  const message = document.getElementById("message").value

  // Validate email
  if (!email.includes("@")) {
    showFormMessage("Please enter a valid email address", "error")
    return
  }

  // Validate message
  if (message.trim().length < 10) {
    showFormMessage("Message must be at least 10 characters long", "error")
    return
  }

  // Simulate form submission
  const formData = {
    name,
    email,
    phone,
    subject,
    message,
    timestamp: new Date().toISOString(),
  }

  // Store in localStorage (in a real app, this would be sent to a server)
  const messages = JSON.parse(localStorage.getItem("contact-messages")) || []
  messages.push(formData)
  localStorage.setItem("contact-messages", JSON.stringify(messages))

  // Show success message
  showFormMessage("Thank you for your message! We'll get back to you soon.", "success")

  // Reset form
  this.reset()
})

// Show form message
function showFormMessage(message, type) {
  const messageDiv = document.getElementById("form-message")
  messageDiv.textContent = message
  messageDiv.className = `form-message ${type}`
  messageDiv.style.display = "block"

  // Hide message after 5 seconds
  setTimeout(() => {
    messageDiv.style.display = "none"
  }, 5000)
}

// Update cart count
function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || []
  document.getElementById("cart-count").textContent = cart.length
}

// Initialize
updateCartCount()
