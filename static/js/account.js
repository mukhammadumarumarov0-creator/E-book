// Tab switching
document.querySelectorAll(".tab-btn").forEach((btn) => {
  btn.addEventListener("click", function () {
    const tabName = this.dataset.tab
    switchTab(tabName)
  })
})

document.querySelectorAll(".switch-tab").forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault()
    const tabName = this.dataset.tab
    switchTab(tabName)
  })
})

function switchTab(tabName) {
  // Hide all tabs
  document.querySelectorAll(".auth-form").forEach((form) => {
    form.classList.remove("active")
  })

  // Remove active class from all buttons
  document.querySelectorAll(".tab-btn").forEach((btn) => {
    btn.classList.remove("active")
  })

  // Show selected tab
  document.getElementById(`${tabName}-tab`).classList.add("active")

  // Add active class to clicked button
  document.querySelector(`[data-tab="${tabName}"]`).classList.add("active")
}

// Login form
document.getElementById("login-form").addEventListener("submit", (e) => {
  e.preventDefault()

  const email = document.getElementById("login-email").value
  const password = document.getElementById("login-password").value

  // Validate
  if (!email || !password) {
    alert("Please fill in all fields")
    return
  }

  // Store user session
  const user = {
    email,
    name: email.split("@")[0],
    loginTime: new Date().toISOString(),
  }

  localStorage.setItem("user", JSON.stringify(user))
  showUserDashboard(user)
})

// Register form
document.getElementById("register-form").addEventListener("submit", (e) => {
  e.preventDefault()

  const firstName = document.getElementById("register-first-name").value
  const lastName = document.getElementById("register-last-name").value
  const email = document.getElementById("register-email").value
  const password = document.getElementById("register-password").value
  const confirmPassword = document.getElementById("register-confirm-password").value

  // Validate
  if (!firstName || !lastName || !email || !password || !confirmPassword) {
    alert("Please fill in all fields")
    return
  }

  if (password.length < 8) {
    alert("Password must be at least 8 characters")
    return
  }

  if (password !== confirmPassword) {
    alert("Passwords do not match")
    return
  }

  if (!document.getElementById("terms").checked) {
    alert("Please agree to the Terms & Conditions")
    return
  }

  // Store user
  const user = {
    firstName,
    lastName,
    email,
    name: `${firstName} ${lastName}`,
    memberSince: new Date().getFullYear(),
  }

  localStorage.setItem("user", JSON.stringify(user))
  showUserDashboard(user)
})

// Show user dashboard
function showUserDashboard(user) {
  document.getElementById("auth-container").style.display = "none"
  document.getElementById("user-dashboard").style.display = "block"

  document.getElementById("user-name").textContent = user.name
  document.getElementById("display-email").textContent = user.email
  document.getElementById("display-name").textContent = user.name
  document.getElementById("member-since").textContent = user.memberSince || new Date().getFullYear()
}

// Logout
document.getElementById("logout-btn").addEventListener("click", () => {
  localStorage.removeItem("user")
  location.reload()
})

// Edit profile
document.getElementById("edit-profile-btn").addEventListener("click", () => {
  alert("Edit profile feature coming soon!")
})

// Change password
document.getElementById("change-password-btn").addEventListener("click", () => {
  alert("Change password feature coming soon!")
})

// Save preferences
document.getElementById("save-preferences-btn").addEventListener("click", () => {
  alert("Preferences saved successfully!")
})

// Check if user is logged in
function checkUserLogin() {
  const user = JSON.parse(localStorage.getItem("user"))
  if (user) {
    showUserDashboard(user)
  }
}

// Update cart count
function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || []
  document.getElementById("cart-count").textContent = cart.length
}

// Initialize
checkUserLogin()
updateCartCount()
