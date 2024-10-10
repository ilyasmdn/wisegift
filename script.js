document
  .getElementById("recommendation-form")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent default form submission

    // Get form values
    const name = document.getElementById("name").value;
    const occasion = document.getElementById("occasion").value;
    const interests = document.getElementById("interests").value;

    // Create dummy recommendations with title, description, price, and image URL
    const recommendations = [
      {
        title: "Personalized Mug",
        description: "A mug with a custom message.",
        price: "$15.99",
        image:
          "https://images.squarespace-cdn.com/content/v1/596541b94f14bc2bd28265ed/1621272436941-FOA8DR9AV6F4FB38SORE/IMG-4688+%281%29.jpg?format=1500w",
        occasion: "birthday",
      },
      {
        title: "Handmade Bracelet",
        description: "A beautiful bracelet for her.",
        price: "$25.00",
        image:
          "https://images.squarespace-cdn.com/content/v1/596541b94f14bc2bd28265ed/1621272436941-FOA8DR9AV6F4FB38SORE/IMG-4688+%281%29.jpg?format=1500w",
        occasion: "anniversary",
      },
      {
        title: "Board Game",
        description: "A fun game for family gatherings.",
        price: "$35.50",
        image:
          "https://images.squarespace-cdn.com/content/v1/596541b94f14bc2bd28265ed/1621272436941-FOA8DR9AV6F4FB38SORE/IMG-4688+%281%29.jpg?format=1500w",
        occasion: "holiday",
      },
  
    // Filter recommendations based on the occasion
   ];
   const filteredRecommendations = recommendations.filter(
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
      resultSection.style.display = "block"; // Show results section
    } else {
      recommendationList.innerHTML =
        "<p>No recommendations found for this occasion.</p>";
      resultSection.style.display = "block"; // Show results section
    }
  });
