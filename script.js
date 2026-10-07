// Automatic year
document.getElementById("year").textContent = new Date().getFullYear();

// Mobile menu toggle
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("open");
});

// Dark mode toggle with memory
const themeToggle = document.getElementById("themeToggle");
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  const darkMode = document.body.classList.contains("dark");
  localStorage.setItem("portfolio-theme", darkMode ? "dark" : "light");
});

// Load saved theme
if (localStorage.getItem("portfolio-theme") === "dark") {
  document.body.classList.add("dark");
}
document.getElementById("demoBtn").addEventListener("click", function() {
  document.getElementById("demoText").textContent = "JavaScript made this text appear!";
});
