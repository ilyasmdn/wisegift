// Navigation toggle
document.getElementById("nav-toggle").addEventListener("click", () => {
  document.getElementById("nav-toggle").classList.toggle("show");
  document.getElementById("navbar").classList.toggle("show");
});

// Contact form handling
document.getElementById("messageForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  // Get form data
  const formData = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    subject: document.getElementById("subject").value,
    message: document.getElementById("message").value,
  };

  // Here you would typically send the data to your backend
  // For now, we'll just show a success message
  alert("Thank you for your message! We will get back to you soon.");
  e.target.reset();
});
