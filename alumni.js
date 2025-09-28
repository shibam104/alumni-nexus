// Alumni data (same as in React component)
const alumniData = [
  { id: 1, name: "Sarah Johnson", batch: "2019", department: "Computer Science", jobTitle: "Senior Software Engineer", company: "Google", email: "sarah.johnson@gmail.com", status: "Active", avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2" },
  { id: 2, name: "Michael Chen", batch: "2018", department: "Business Administration", jobTitle: "Product Manager", company: "Microsoft", email: "michael.chen@outlook.com", status: "Active", avatar: "https://images.unsplash.com/photo-1589458223095-03eee50f0054" },
  { id: 3, name: "Emily Rodriguez", batch: "2020", department: "Marketing", jobTitle: "Marketing Director", company: "Adobe", email: "emily.rodriguez@adobe.com", status: "Active", avatar: "https://images.unsplash.com/photo-1655249481446-25d575f1c054" },
  { id: 4, name: "David Kim", batch: "2017", department: "Engineering", jobTitle: "Engineering Manager", company: "Tesla", email: "david.kim@tesla.com", status: "Inactive", avatar: "https://images.unsplash.com/photo-1581065178047-8ee15951ede6" },
  { id: 5, name: "Jessica Taylor", batch: "2021", department: "Data Science", jobTitle: "Data Scientist", company: "Netflix", email: "jessica.taylor@netflix.com", status: "Active", avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2" },
  { id: 6, name: "Robert Wilson", batch: "2016", department: "Finance", jobTitle: "Investment Banker", company: "Goldman Sachs", email: "robert.wilson@gs.com", status: "Active", avatar: "https://images.unsplash.com/photo-1589458223095-03eee50f0054" },
  { id: 7, name: "Lisa Anderson", batch: "2019", department: "Medicine", jobTitle: "Surgeon", company: "Mayo Clinic", email: "lisa.anderson@mayo.edu", status: "Inactive", avatar: "https://images.unsplash.com/photo-1655249481446-25d575f1c054" },
  { id: 8, name: "James Brown", batch: "2015", department: "Law", jobTitle: "Corporate Lawyer", company: "Sullivan & Cromwell", email: "james.brown@sullcrom.com", status: "Active", avatar: "https://images.unsplash.com/photo-1581065178047-8ee15951ede6" }
];

const ITEMS_PER_PAGE = 5;
let currentPage = 1;
let searchTerm = '';
let statusFilter = 'all';
let departmentFilter = 'all';

// DOM Elements
const tableBody = document.getElementById('alumniTableBody');
const searchInput = document.getElementById('searchInput');
const statusSelect = document.getElementById('statusFilter');
const deptSelect = document.getElementById('departmentFilter');
const paginationDiv = document.getElementById('pagination');

// Populate Department Filter
const uniqueDepartments = [...new Set(alumniData.map(a => a.department))];
uniqueDepartments.forEach(dept => {
  const option = document.createElement('option');
  option.value = dept;
  option.textContent = dept;
  deptSelect.appendChild(option);
});

// Event Listeners
searchInput.addEventListener('input', (e) => {
  searchTerm = e.target.value.toLowerCase();
  currentPage = 1;
  renderTable();
});

statusSelect.addEventListener('change', (e) => {
  statusFilter = e.target.value;
  currentPage = 1;
  renderTable();
});

deptSelect.addEventListener('change', (e) => {
  departmentFilter = e.target.value;
  currentPage = 1;
  renderTable();
});

document.getElementById('exportBtn').addEventListener('click', () => {
  alert('Export CSV functionality coming soon!');
});

// Render Table
function renderTable() {
  // Add loading state
  const tableContainer = document.querySelector('.alumni-table-container');
  tableContainer.classList.add('loading');
  
  // Simulate loading delay for better UX
  setTimeout(() => {
    let filtered = alumniData.filter(a => {
      const matchesSearch = a.name.toLowerCase().includes(searchTerm) ||
                            a.email.toLowerCase().includes(searchTerm) ||
                            a.company.toLowerCase().includes(searchTerm);
      const matchesStatus = statusFilter === 'all' || a.status.toLowerCase() === statusFilter;
      const matchesDept = departmentFilter === 'all' || a.department === departmentFilter;
      return matchesSearch && matchesStatus && matchesDept;
    });

    const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
    const paginated = filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

    // Remove loading state
    tableContainer.classList.remove('loading');
    
    // Add empty state if no results
    if (filtered.length === 0) {
      tableContainer.classList.add('empty');
      tableBody.innerHTML = '';
    } else {
      tableContainer.classList.remove('empty');
      renderTableRows(paginated);
    }
    
    renderPagination(filtered.length, totalPages);
  }, 300);
}

// Render table rows
function renderTableRows(paginated) {
  tableBody.innerHTML = paginated.map(alumni => `
    <tr class="table-row">
      <td>
        <div class="alumni-info">
          <img class="alumni-avatar" src="${alumni.avatar}" alt="${alumni.name}" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
          <div class="alumni-avatar-fallback" style="display: none;">👤</div>
          <div class="alumni-details">
            <div class="alumni-name">${alumni.name}</div>
            <div class="alumni-meta">Member since ${alumni.batch}</div>
          </div>
        </div>
      </td>
      <td><span class="batch-badge">${alumni.batch}</span></td>
      <td>${alumni.department}</td>
      <td>
        <div class="role-info">
          <div class="job-title">${alumni.jobTitle}</div>
          <div class="company">${alumni.company}</div>
        </div>
      </td>
      <td class="email-cell">${alumni.email}</td>
      <td>
        <span class="status-badge ${alumni.status === 'Active' ? 'active' : 'inactive'}">
          ${alumni.status}
        </span>
      </td>
    </tr>
  `).join('');
}

// Render pagination
function renderPagination(totalResults, totalPages) {
  paginationDiv.innerHTML = `
    <div class="pagination-info">
      Showing ${(currentPage - 1) * ITEMS_PER_PAGE + 1} to ${Math.min(currentPage * ITEMS_PER_PAGE, totalResults)} of ${totalResults} results
    </div>
    <div class="pagination-buttons">
      <button class="pagination-btn" ${currentPage === 1 ? 'disabled' : ''} onclick="changePage(${currentPage - 1})">
        <i class="fas fa-chevron-left"></i> Previous
      </button>
      <button class="pagination-btn" ${currentPage === totalPages ? 'disabled' : ''} onclick="changePage(${currentPage + 1})">
        Next <i class="fas fa-chevron-right"></i>
      </button>
    </div>
  `;
}

function changePage(page) {
  currentPage = page;
  renderTable();
}

// Initial Render
renderTable();
