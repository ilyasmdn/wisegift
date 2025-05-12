// List of AI-recommended featured gifts
const featuredGifts = [
  {
    title: "Personalized Star Map",
    description:
      "A beautiful star map showing the night sky from a specific date and location - perfect for commemorating special moments.",
    price: "$39.99",
    category: "birthday",
    loves: "4.2k",
  },
  {
    title: "Custom Name Necklace",
    description:
      "Elegant personalized name necklace made from sterling silver - a thoughtful gift that will be cherished for years.",
    price: "$49.99",
    category: "anniversary",
    loves: "3.7k",
  },
  {
    title: "Wireless Noise-Cancelling Headphones",
    description:
      "Premium headphones with active noise cancellation, perfect for music lovers and frequent travelers.",
    price: "$149.99",
    category: "holiday",
    loves: "5.1k",
  },
  {
    title: "Self-Care Gift Box",
    description:
      "A curated box of relaxation items including bath bombs, scented candles, and face masks - perfect for anyone who needs some relaxation.",
    price: "$35.99",
    category: "just-because",
    loves: "2.8k",
  },
  {
    title: "Smart Plant Monitor",
    description:
      "Device that monitors soil moisture, sunlight, and temperature to keep indoor plants thriving - great for plant enthusiasts.",
    price: "$29.99",
    category: "birthday",
    loves: "1.9k",
  },
  {
    title: "Customized Recipe Cutting Board",
    description:
      "Wooden cutting board with a handwritten family recipe engraved - a sentimental gift that combines function with meaning.",
    price: "$59.99",
    category: "anniversary",
    loves: "3.3k",
  },
  {
    title: "Portable Espresso Maker",
    description:
      "Compact espresso maker for coffee lovers on the go - makes barista-quality espresso anywhere.",
    price: "$44.99",
    category: "holiday",
    loves: "2.5k",
  },
  {
    title: "Digital Drawing Tablet",
    description:
      "Professional drawing tablet for digital artists, designers, and creative hobbyists.",
    price: "$89.99",
    category: "birthday",
    loves: "4.0k",
  },
];

// Navigation toggle
document.getElementById("nav-toggle").addEventListener("click", () => {
  document.getElementById("nav-toggle").classList.toggle("show");
  document.getElementById("navbar").classList.toggle("show");
});

// Sort items function
function sortItems(items, sortBy) {
  const itemsCopy = [...items];

  switch (sortBy) {
    case "price-low":
      return itemsCopy.sort(
        (a, b) =>
          parseFloat(a.price.replace("$", "")) -
          parseFloat(b.price.replace("$", ""))
      );
    case "price-high":
      return itemsCopy.sort(
        (a, b) =>
          parseFloat(b.price.replace("$", "")) -
          parseFloat(a.price.replace("$", ""))
      );
    case "popularity":
      return itemsCopy.sort(
        (a, b) =>
          parseFloat(b.loves.replace("k", "000")) -
          parseFloat(a.loves.replace("k", "000"))
      );
    default:
      return itemsCopy;
  }
}

// Load and display items
function displayItems(items) {
  const container = document.getElementById("featured-items");
  container.innerHTML = "";

  items.forEach((item) => {
    const itemElement = document.createElement("div");
    itemElement.className = "item";
    itemElement.dataset.category = item.category;

    itemElement.innerHTML = `
      <div class="item-info">
        <h3>${item.title}</h3>
        <p>${item.description}</p>
        <div class="item-meta">
          <span class="price">${item.price}</span>
          <span class="loves"><i class="fas fa-heart"></i> ${item.loves}</span>
        </div>
      </div>
    `;

    container.appendChild(itemElement);
  });
} // Filter items function
function filterItems(category) {
  const items = document.querySelectorAll(".item");

  if (category === "all") {
    items.forEach((item) => {
      item.style.display = "block";
    });
  } else {
    items.forEach((item) => {
      if (item.dataset.category === category) {
        item.style.display = "block";
      } else {
        item.style.display = "none";
      }
    });
  }
}

// Initialize
document.addEventListener("DOMContentLoaded", () => {
  // Display all items initially
  displayItems(featuredGifts);
  // Set up filter buttons
  const filterButtons = document.querySelectorAll(".filter-btn");
  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // Remove active class from all buttons
      filterButtons.forEach((btn) => btn.classList.remove("active"));
      // Add active class to clicked button
      button.classList.add("active");
      // Filter items
      filterItems(button.dataset.filter);
    });
  });

  // Set up sort select
  const sortSelect = document.getElementById("sort");
  sortSelect.addEventListener("change", () => {
    const sortedItems = sortItems(featuredGifts, sortSelect.value);
    displayItems(sortedItems);

    // Reapply current filter
    const activeFilter = document.querySelector(".filter-btn.active");
    if (activeFilter) {
      filterItems(activeFilter.dataset.category);
    }
  });
});
