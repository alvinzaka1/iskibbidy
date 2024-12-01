document.addEventListener("DOMContentLoaded", function () {
    const snapsContent = document.getElementById("snaps-content");
    const listingsPerPage = 24;
    let currentPage = 1;
    let jobListings = [];
    let filteredListings = []; 
  
    function renderListings(page, listings = jobListings) {
      snapsContent.innerHTML = `
        <h1>Here at iSkibidy.com we thrive on helping you find the perfect internship. </h1>
        <h2>Applying and going through the interview process is hard enough, leave researching for us!</h2>
        <div id="search-section">
          <input type="text" id="search-bar" placeholder="Rizz Jobs By Type"/>
          <button id="search-button">Search</button>
        </div>
        <div id="job-listings"></div>
        <div id="pagination-controls"></div>
      `;
  
      const searchBar = document.getElementById("search-bar");
      const searchButton = document.getElementById("search-button");
  
      searchButton.addEventListener("click", handleSearch);
      searchBar.addEventListener("keyup", (event) => {
        if (event.key === "Enter") handleSearch();
      });
  
      const listContainer = document.getElementById("job-listings");
      const paginationControls = document.getElementById("pagination-controls");
  
      const startIndex = (page - 1) * listingsPerPage;
      const endIndex = Math.min(startIndex + listingsPerPage, listings.length);
  
      for (let i = startIndex; i < endIndex; i++) {
        const job = listings[i];
        const jobCard = document.createElement("div");
        jobCard.className = "job-card";
  
        const datePosted = new Date(job.date_posted * 1000).toLocaleDateString();
        const locations = job.locations.join(", ");
  
        jobCard.innerHTML = `
          <h3>${job.title}</h3>
          <p><strong>Company:</strong> ${job.company_name}</p>
          <p><strong>Locations:</strong> ${locations}</p>
          <p><strong>Posted On:</strong> ${datePosted}</p>
          <p><strong>Terms:</strong> ${job.terms.join(", ")}</p>
          <p><strong>Sponsorship:</strong> ${job.sponsorship}</p>
          <a href="${job.url}" target="_blank">Apply Here</a>
          ${job.company_url ? `<p><a href="${job.company_url}" target="_blank">Company Website</a></p>` : ""}
        `;
  
        listContainer.appendChild(jobCard);
      }
  
      const totalPages = Math.ceil(listings.length / listingsPerPage);
  
      if (page > 1) {
        const prevButton = document.createElement("button");
        prevButton.textContent = "Previous";
        prevButton.addEventListener("click", () => renderListings(page - 1, listings));
        paginationControls.appendChild(prevButton);
      }
  
      if (page < totalPages) {
        const nextButton = document.createElement("button");
        nextButton.textContent = "Next";
        nextButton.addEventListener("click", () => renderListings(page + 1, listings));
        paginationControls.appendChild(nextButton);
      }
  
      const pageInfo = document.createElement("p");
      pageInfo.textContent = `Page ${page} of ${totalPages}`;
      paginationControls.appendChild(pageInfo);
    }
  
    function handleSearch() {
      const query = document.getElementById("search-bar").value.toLowerCase();
      filteredListings = jobListings.filter(
        (job) =>
          job.title.toLowerCase().includes(query) ||
          job.company_name.toLowerCase().includes(query) ||
          job.locations.some((location) => location.toLowerCase().includes(query))
      );
  
      currentPage = 1; 
      renderListings(currentPage, filteredListings);
  
      if (filteredListings.length === 0) {
        const listContainer = document.getElementById("job-listings");
        listContainer.innerHTML = `<p>No job listings match your search.</p>  `;
      }
    }
  
    fetch("listings.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        jobListings = data.filter((job) => job.is_visible && job.active);
        filteredListings = [...jobListings];
        renderListings(currentPage);
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
        snapsContent.innerHTML = `<p>Failed to load job listings.</p>`;
      });
  });
  