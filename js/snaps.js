document.addEventListener("DOMContentLoaded", function () {
    const snapsContent = document.getElementById("snaps-content");
    const listingsPerPage = 24;
    let currentPage = 1;
    let jobListings = [];
  
    function renderListings(page) {
      snapsContent.innerHTML = `
        <h2>Rizz Your Way Through The Internship Process </h2>
        <div id="job-listings"></div>
        <div id="pagination-controls"></div>
      `;
  
      const listContainer = document.getElementById("job-listings");
      const paginationControls = document.getElementById("pagination-controls");
  
      const startIndex = (page - 1) * listingsPerPage;
      const endIndex = Math.min(startIndex + listingsPerPage, jobListings.length);
  
      for (let i = startIndex; i < endIndex; i++) {
        const job = jobListings[i];
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
  
      const totalPages = Math.ceil(jobListings.length / listingsPerPage);
  
      if (page > 1) {
        const prevButton = document.createElement("button");
        prevButton.textContent = "Previous";
        prevButton.addEventListener("click", () => renderListings(page - 1));
        paginationControls.appendChild(prevButton);
      }
  
      if (page < totalPages) {
        const nextButton = document.createElement("button");
        nextButton.textContent = "Next";
        nextButton.addEventListener("click", () => renderListings(page + 1));
        paginationControls.appendChild(nextButton);
      }
  
      const pageInfo = document.createElement("p");
      pageInfo.textContent = `Page ${page} of ${totalPages}`;
      paginationControls.appendChild(pageInfo);
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
        renderListings(currentPage);
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
        snapsContent.innerHTML = `<p>Failed to load job listings.</p>`;
      });
  });
  