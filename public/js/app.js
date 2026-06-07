class CollegeSearchApp {
  constructor() {
    this.currentPage = 1;
    this.totalPages = 1;
    this.itemsPerPage = 20;
    this.filterOptions = {};

    this.init();
  }

  async init() {
    await this.loadFilterOptions();
    this.bindEvents();
    this.showInitialMessage();
  }

  showInitialMessage() {
    const resultsInfo = document.getElementById('resultsInfo');
    resultsInfo.innerHTML = '<p></p>';
    resultsInfo.classList.remove('hidden');
  }

  async loadFilterOptions() {
    try {
      const response = await fetch("/api/colleges/filters");
      const data = await response.json();

      if (data.success) {
        this.filterOptions = data.data;
        this.populateFilterSelects();
      }
    } catch (error) {
      console.error("Error loading filter options:", error);
    }
  }

  populateFilterSelects() {
    const districtSelect = document.getElementById("districtSelect");
    if (this.filterOptions.districts && districtSelect) {
      districtSelect.innerHTML = '<option value="All">All</option>';
      this.filterOptions.districts.forEach((district) => {
        const option = document.createElement("option");
        option.value = district;
        option.textContent = district;
        districtSelect.appendChild(option);
      });
    }

    const courseTypeSelect = document.getElementById("courseTypeSelect");
    if (this.filterOptions.courseTypes && courseTypeSelect) {
      courseTypeSelect.innerHTML = '<option value="All">All</option>';
      this.filterOptions.courseTypes.forEach((type) => {
        const option = document.createElement("option");
        option.value = type;
        option.textContent = type;
        courseTypeSelect.appendChild(option);
      });
    }

    const statusSelect = document.getElementById("statusSelect");
    if (this.filterOptions.statuses && statusSelect) {
      statusSelect.innerHTML = '<option value="All">All</option>';
      this.filterOptions.statuses.forEach((status) => {
        const option = document.createElement("option");
        option.value = status;
        option.textContent = status;
        statusSelect.appendChild(option);
      });
    }

    // Populate courseSelect initially
    this.updateCourseDropdown();
  }

  updateCourseDropdown() {
    const courseSelect = document.getElementById("courseSelect");
    const courseTypeSelect = document.getElementById("courseTypeSelect");
    if (!courseSelect || !courseTypeSelect) return;

    const selectedType = courseTypeSelect.value;
    courseSelect.innerHTML = '<option value="All">All</option>';

    let courses = [];
    if (selectedType === "Under Graduate") {
      courses = this.filterOptions.ugCourses || [];
    } else if (selectedType === "Post Graduate") {
      courses = this.filterOptions.pgCourses || [];
    } else {
      const ug = this.filterOptions.ugCourses || [];
      const pg = this.filterOptions.pgCourses || [];
      courses = [...ug, ...pg];
    }

    courses.forEach((course) => {
      const option = document.createElement("option");
      option.value = course;
      option.textContent = course;
      courseSelect.appendChild(option);
    });
  }

  bindEvents() {
    const courseTypeSelect = document.getElementById("courseTypeSelect");
    if (courseTypeSelect) {
      courseTypeSelect.addEventListener("change", () => {
        this.updateCourseDropdown();
      });
    }

    const searchForm = document.getElementById("searchForm");
    if (searchForm) {
      searchForm.addEventListener("submit", (e) => {
        e.preventDefault();
        this.currentPage = 1;
        this.performSearch();
      });
    }

   
    const searchButton = document.querySelector(".search-button");
    if (searchButton) {
      searchButton.addEventListener("click", (e) => {
        e.preventDefault();
        this.currentPage = 1;
        this.performSearch();
      });
    }

    const prevBtn = document.getElementById("prevPage");
    const nextBtn = document.getElementById("nextPage");
    
    if (prevBtn) {
      prevBtn.addEventListener("click", () => {
        if (this.currentPage > 1) {
          this.currentPage--;
          this.performSearch();
        }
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        if (this.currentPage < this.totalPages) {
          this.currentPage++;
          this.performSearch();
        }
      });
    }
  }

  async performSearch() {
    this.showLoading(true);

    try {
      const params = this.buildSearchParams();
      const response = await fetch(`/api/colleges?${params}`);
      const data = await response.json();

      if (data.success) {
        if (data.data.length === 0) {
          this.showNoResults();
          this.showResultsInfo(0);
        } else {
          this.displayResults(data.data);
          this.updatePagination(data.pagination);
          this.showResultsInfo(data.pagination.total);
        }
      } else {
        this.showError("Error fetching colleges");
      }
    } catch (error) {
      console.error("Search error:", error);
      this.showError("Error connecting to server");
    } finally {
      this.showLoading(false);
    }
  }

  buildSearchParams() {
    const params = new URLSearchParams();

    const courseTypeSelect = document.getElementById("courseTypeSelect");
    const statusSelect = document.getElementById("statusSelect");

    const search = document.getElementById("searchInput")?.value?.trim() || '';
    const course = document.getElementById("courseSelect")?.value || 'All';
    const district = document.getElementById("districtSelect")?.value || 'All';
    const courseType = courseTypeSelect?.value || 'All';
    const status = statusSelect?.value || 'All';

    if (search) params.append("search", search);
    if (course !== "All") params.append("course", course);
    if (district !== "All") params.append("district", district);
    if (courseType !== "All") params.append("courseType", courseType);
    if (status !== "All") params.append("status", status);

    params.append("page", this.currentPage.toString());
    params.append("limit", this.itemsPerPage.toString());

    return params.toString();
  }

  displayResults(colleges) {
    const resultsBody = document.getElementById("resultsBody");
    if (!resultsBody) return;
    
    resultsBody.innerHTML = "";

    this.hideNoResults();
    this.showResultsContainer();

    colleges.forEach((college) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${college.SrNo || 'N/A'}</td>
        <td><a href="#" class="college-code-link" onclick="window.fetchCollegeDetails('${college['College Code']}'); return false;">${college['College Code'] || 'N/A'}</a></td>
        <td>${college['District'] || 'N/A'}</td>
        <td class="college-name">${college['College Name'] || 'N/A'}</td>
        <td>
            <span class="course-badge">${college['Status'] || 'N/A'}</span>
        </td>
        <td>${college['Total Intake'] || 'N/A'}</td>
      `;
      resultsBody.appendChild(row);
    });
  }

  updatePagination(pagination) {
    this.totalPages = pagination.pages;
    this.currentPage = pagination.current;

    const prevBtn = document.getElementById("prevPage");
    const nextBtn = document.getElementById("nextPage");
    const pageInfo = document.getElementById("pageInfo");

    if (prevBtn) prevBtn.disabled = this.currentPage <= 1;
    if (nextBtn) nextBtn.disabled = this.currentPage >= this.totalPages;
    if (pageInfo) pageInfo.textContent = `Page ${this.currentPage} of ${this.totalPages}`;

    if (this.totalPages > 1) {
      this.showPagination();
    } else {
      this.hidePagination();
    }
  }

  showResultsInfo(total) {
    const resultsInfo = document.getElementById("resultsInfo");
    const totalResults = document.getElementById("totalResults");

    if (total === 0) {
      resultsInfo.innerHTML = '<p>No colleges found matching your criteria.</p>';
    } else {
      if (totalResults) totalResults.textContent = total.toLocaleString();
      resultsInfo.innerHTML = `<p>Found <span id="totalResults">${total.toLocaleString()}</span> colleges</p>`;
    }
    
    if (resultsInfo) resultsInfo.classList.remove("hidden");
  }

  showLoading(show) {
    const loading = document.getElementById("loading");
    if (!loading) return;
    
    if (show) {
      loading.classList.remove("hidden");
      this.hideResultsContainer();
      this.hideNoResults();
      this.hidePagination();
    } else {
      loading.classList.add("hidden");
    }
  }

  showResultsContainer() {
    const container = document.getElementById("resultsContainer");
    if (container) container.classList.remove("hidden");
  }

  hideResultsContainer() {
    const container = document.getElementById("resultsContainer");
    if (container) container.classList.add("hidden");
  }

  showNoResults() {
    const noResults = document.getElementById("noResults");
    if (noResults) noResults.classList.remove("hidden");
    this.hideResultsContainer();
  }

  hideNoResults() {
    const noResults = document.getElementById("noResults");
    if (noResults) noResults.classList.add("hidden");
  }

  showPagination() {
    const pagination = document.getElementById("pagination");
    if (pagination) pagination.classList.remove("hidden");
  }

  hidePagination() {
    const pagination = document.getElementById("pagination");
    if (pagination) pagination.classList.add("hidden");
  }

  showError(message) {
    console.error(message);
    alert(message);
  }
}

// Global function to be called from onclick
window.fetchCollegeDetails = async function(code) {
  const modal = document.getElementById('detailsModal');
  const detailsContent = document.getElementById('detailsContent');
  if (!modal || !detailsContent) {
      alert("Details for College Code: " + code + "\n(Modal UI not found in index.html)");
      return;
  }
  
  modal.style.display = 'block';
  detailsContent.innerHTML = '<p>Loading live data from CET Cell...</p>';
  
  try {
      const response = await fetch('/api/colleges/' + code + '/details');
      const data = await response.json();
      
      if (data.success && data.data) {
          const d = data.data;
          detailsContent.innerHTML = `
              <h3>Institute Code: ${code}</h3>
              <p><strong>Address:</strong> ${d.Address}</p>
              <p><strong>Region:</strong> ${d.Region}</p>
              <p><strong>District:</strong> ${d.District}</p>
              <p><strong>Status:</strong> ${d.Status}</p>
              <p><strong>Email:</strong> <a href="mailto:${d.Email}">${d.Email}</a></p>
              <p><strong>Website:</strong> <a href="${d.Website.startsWith('http') ? d.Website : 'http://' + d.Website}" target="_blank">${d.Website}</a></p>
              <p><strong>Registrar:</strong> ${d.Registrar}</p>
          `;
      } else {
          detailsContent.innerHTML = '<p>Failed to load details from CET cell.</p>';
      }
  } catch(e) {
      detailsContent.innerHTML = '<p>Error fetching data.</p>';
  }
};

window.closeDetailsModal = function() {
  const modal = document.getElementById('detailsModal');
  if (modal) modal.style.display = 'none';
};

document.addEventListener("DOMContentLoaded", () => {
  new CollegeSearchApp();
});