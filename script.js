// API endpoint for Wisegift recommendations
const API_ENDPOINT = "https://wisegift-api.wisegift.workers.dev";

document
  .getElementById("recommendation-form")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    // Get form values
    const recipientName = document.getElementById("name").value;
    const occasion = document.getElementById("occasion").value;
    const recipientAge = document.getElementById("age").value ? parseInt(document.getElementById("age").value) : 0;
    const interests = document.getElementById("interests").value;
    const budget = document.getElementById("budget").value || "No specific budget";

    // Show loading state
    const resultSection = document.getElementById("results");
    const recommendationList = document.getElementById("recommendation-list");
    recommendationList.innerHTML = `
      <div class="loading">
        <p>Finding perfect gift suggestions...</p>
        <div class="loading-spinner"></div>
      </div>
    `;
    resultSection.style.display = "block";    try {
      // Prepare request payload
      const payload = {
        recipientName,
        occasion,
        recipientAge,
        interests,
        budget
      };

      console.log("Sending request to API:", payload);

      // Call the API
      const response = await fetch(API_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("API error response:", errorText);
        throw new Error(`API error: ${response.status}. Please try again later.`);
      }      let data;
      try {
        data = await response.json();
        console.log("API response data:", data);
      } catch (jsonError) {
        console.error("Error parsing JSON response:", jsonError);
        throw new Error("Unable to process the response from our recommendation service.");
      }
      
      // Display results
      recommendationList.innerHTML = ""; // Clear previous results

      if (data.gifts && data.gifts.length > 0) {
        data.gifts.forEach(gift => {
          const item = document.createElement("div");
          item.classList.add("recommendation-item");
          item.innerHTML = `
            <div class="item-info">
              <h3>${gift.name}</h3>
              <p>${gift.description}</p>
            </div>
          `;
          recommendationList.appendChild(item);
        });
        // Add a note below recommendations
        const noteElement = document.createElement("div");
        noteElement.className = "recommendations-note";
        noteElement.innerHTML = `<p>These recommendations were created by AI based on your inputs.</p>`;
        recommendationList.appendChild(noteElement);
      } else {
        recommendationList.innerHTML = 
          "<p>Sorry, we couldn't find any gift suggestions. Please try with different details.</p>";
      }    } catch (error) {
      console.error("Error fetching gift recommendations:", error);
      recommendationList.innerHTML = `
        <div class="error-message">
          <p>Sorry, something went wrong while getting your gift suggestions. Please try again later.</p>
          <p class="error-details">Error: ${error.message}</p>
          <p class="support-link">If this problem persists, please <a href="/contact/">contact our support team</a>.</p>
        </div>
      `;
    }
  });

document.querySelectorAll(".faq-question").forEach((item) => {
  item.addEventListener("click", () => {
    const faqItem = item.parentElement;
    faqItem.classList.toggle("active");
  });
});

document.getElementById("nav-toggle").addEventListener("click", () => {
  document.getElementById("nav-toggle").classList.toggle("show");
  document.getElementById("navbar").classList.toggle("show");
});
