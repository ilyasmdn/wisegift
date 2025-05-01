import { giftRecommendations } from './data/data.js';

document
  .getElementById("recommendation-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    // Get form values
    const name = document.getElementById("name").value;
    const occasion = document.getElementById("occasion").value;
    const interests = document.getElementById("interests").value;

    const filteredRecommendations = giftRecommendations.filter(
      (rec) => rec.occasion === occasion.toLowerCase()
    );

    // Display results
    const resultSection = document.getElementById("results");
    const recommendationList = document.getElementById("recommendation-list");
    recommendationList.innerHTML = ""; // Clear previous results

    if (filteredRecommendations.length > 0) {
      filteredRecommendations.forEach((rec) => {
        const item = document.createElement("div");
        item.classList.add("recommendation-item");
        item.innerHTML = `
          <img src="${rec.image}" alt="${rec.title}">
          <div class="recommendation-details">
            <h3>${rec.title}</h3>
            <p>${rec.description}</p>
            <p class="price">${rec.price}</p>
          </div>
        `;
        recommendationList.appendChild(item);
      });
      resultSection.style.display = "block";
    } else {
      recommendationList.innerHTML = "<p>No recommendations found for this occasion.</p>";
      resultSection.style.display = "block";
    }
  });

document.querySelectorAll('.faq-question').forEach(item => {
  item.addEventListener('click', () => {
    const faqItem = item.parentElement;
    faqItem.classList.toggle('active');
  });
});

document.getElementById("nav-toggle").addEventListener('click', () => {
  document.getElementById("nav-toggle").classList.toggle('show');
  document.getElementById("navbar").classList.toggle('show');
});