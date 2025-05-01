import { popularGifts } from "../data/data.js";

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
  const container = document.getElementById("popular-items");
  container.innerHTML = "";

  items.forEach((item) => {
    const itemElement = document.createElement("div");
    itemElement.className = "item";
    itemElement.dataset.category = item.category;

    itemElement.innerHTML = `
      <div class="item-image">
        <img src="${item.image}" alt="${item.title}">
        <div class="item-overlay">
          <a href="#" class="view-details">View Details</a>
        </div>
      </div>
      <div class="item-info">
        <h3>${item.title}</h3>
        <p>${item.description}</p>
        <span class="price">${item.price}</span>
        <div class="popularity">
          <i class="fas fa-heart"></i>
          <span>${item.loves} loves</span>
        </div>
      </div>
    `;

    container.appendChild(itemElement);
  });
}

// Filter functionality
const filterButtons = document.querySelectorAll(".filter-btn");
let currentFilter = "all";
let currentSort = "default";

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    // Remove active class from all buttons
    filterButtons.forEach((btn) => btn.classList.remove("active"));
    // Add active class to clicked button
    button.classList.add("active");

    currentFilter = button.dataset.filter;

    // Filter and sort items
    let filteredItems =
      currentFilter === "all"
        ? popularGifts
        : popularGifts.filter((item) => item.category === currentFilter);

    // Apply current sort
    filteredItems = sortItems(filteredItems, currentSort);

    // Display filtered and sorted items
    displayItems(filteredItems);
  });
});

// Sort functionality
document.getElementById("sort-select").addEventListener("change", (e) => {
  currentSort = e.target.value;

  // Filter and sort items
  let items =
    currentFilter === "all"
      ? popularGifts
      : popularGifts.filter((item) => item.category === currentFilter);

  // Apply sort
  items = sortItems(items, currentSort);

  // Display filtered and sorted items
  displayItems(items);
});

// Initial display of all items
displayItems(popularGifts);
