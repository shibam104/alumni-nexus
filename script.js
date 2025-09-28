// Dashboard JavaScript Functionality

// Global state
let currentView = 'dashboard';
let isDarkMode = false;
let charts = {};

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
  initializeDashboard();
  setupEventListeners();
  initializeCharts();
  animateCounters();
});

// Initialize Dashboard
function initializeDashboard() {
  // Set initial view
  showView('dashboard');
  
  // Initialize dark mode from localStorage
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    toggleDarkMode();
  }
  
  // Initialize sidebar state
  updateSidebarState();
}

// Setup Event Listeners
function setupEventListeners() {
  // Sidebar navigation
  const sidebarItems = document.querySelectorAll('.sidebar-item');
  sidebarItems.forEach(item => {
    item.addEventListener('click', function() {
      const view = this.dataset.view;
      showView(view);
      updateSidebarState();
    });
  });

  // Dark mode toggle
  const darkModeToggle = document.getElementById('darkModeToggle');
  if (darkModeToggle) {
    darkModeToggle.addEventListener('change', toggleDarkMode);
  }

  // Sidebar toggle for mobile
  const sidebarToggle = document.querySelector('.sidebar-toggle');
  if (sidebarToggle) {
    sidebarToggle.addEventListener('click', toggleSidebar);
  }

  // Search functionality
  const searchInput = document.querySelector('.search-input');
  if (searchInput) {
    searchInput.addEventListener('input', handleSearch);
  }

  // Notification button
  const notificationBtn = document.querySelector('.notification-btn');
  if (notificationBtn) {
    notificationBtn.addEventListener('click', showNotifications);
  }

  // User profile dropdown
  const userProfile = document.querySelector('.user-profile');
  if (userProfile) {
    userProfile.addEventListener('click', showUserMenu);
  }
}

// View Management
function showView(viewName) {
  // Hide all views
  const views = document.querySelectorAll('.view-content');
  views.forEach(view => {
    view.classList.remove('active');
  });

  // Show selected view
  const targetView = document.getElementById(`${viewName}-view`);
  if (targetView) {
    targetView.classList.add('active');
    currentView = viewName;
  }

  // Update URL hash
  window.location.hash = viewName;
}

// Update Sidebar State
function updateSidebarState() {
  const sidebarItems = document.querySelectorAll('.sidebar-item');
  sidebarItems.forEach(item => {
    item.classList.remove('active');
    if (item.dataset.view === currentView) {
      item.classList.add('active');
    }
  });
}

// Dark Mode Toggle
function toggleDarkMode() {
  isDarkMode = !isDarkMode;
  document.documentElement.classList.toggle('dark', isDarkMode);
  
  // Update toggle state
  const darkModeToggle = document.getElementById('darkModeToggle');
  if (darkModeToggle) {
    darkModeToggle.checked = isDarkMode;
  }
  
  // Update dark mode icon
  const darkModeIcon = document.querySelector('.dark-mode-icon');
  if (darkModeIcon) {
    darkModeIcon.className = isDarkMode ? 'fas fa-moon dark-mode-icon' : 'fas fa-sun dark-mode-icon';
  }
  
  // Save to localStorage
  localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  
  // Update charts if they exist
  updateChartsTheme();
}

// Sidebar Toggle (Mobile)
function toggleSidebar() {
  const sidebar = document.querySelector('.sidebar');
  sidebar.classList.toggle('open');
}

// Search Functionality
function handleSearch(event) {
  const query = event.target.value.toLowerCase();
  console.log('Searching for:', query);
  // Implement search logic here
}

// Show Notifications
function showNotifications() {
  // Create notification dropdown
  const existingDropdown = document.querySelector('.notification-dropdown');
  if (existingDropdown) {
    existingDropdown.remove();
    return;
  }

  const dropdown = document.createElement('div');
  dropdown.className = 'notification-dropdown glass-card';
  dropdown.style.cssText = `
    position: absolute;
    top: 100%;
    right: 0;
    width: 320px;
    max-height: 400px;
    overflow-y: auto;
    z-index: 1000;
    margin-top: 0.5rem;
    padding: 1rem;
  `;

  const notifications = [
    {
      title: "New Alumni Registration",
      message: "Sarah Johnson (Class 2024) has joined the platform",
      time: "2 minutes ago",
      type: "user"
    },
    {
      title: "Event RSVP Milestone",
      message: "Tech Talk has reached 100+ RSVPs",
      time: "15 minutes ago",
      type: "event"
    },
    {
      title: "Donation Received",
      message: "₹25,000 donation received for Emergency Relief Fund",
      time: "1 hour ago",
      type: "donation"
    }
  ];

  dropdown.innerHTML = `
    <div class="notification-header">
      <h3 class="gradient-text">Recent Notifications</h3>
    </div>
    <div class="notification-list">
      ${notifications.map(notification => `
        <div class="notification-item">
          <div class="notification-content">
            <div class="notification-title">${notification.title}</div>
            <div class="notification-message">${notification.message}</div>
            <div class="notification-time">${notification.time}</div>
          </div>
        </div>
      `).join('')}
    </div>
  `;

  const notificationBtn = document.querySelector('.notification-btn');
  notificationBtn.style.position = 'relative';
  notificationBtn.appendChild(dropdown);

  // Close dropdown when clicking outside
  setTimeout(() => {
    document.addEventListener('click', function closeDropdown(e) {
      if (!notificationBtn.contains(e.target)) {
        dropdown.remove();
        document.removeEventListener('click', closeDropdown);
      }
    });
  }, 100);
}

// Show User Menu
function showUserMenu() {
  // Create user menu dropdown
  const existingDropdown = document.querySelector('.user-dropdown');
  if (existingDropdown) {
    existingDropdown.remove();
    return;
  }

  const dropdown = document.createElement('div');
  dropdown.className = 'user-dropdown glass-card';
  dropdown.style.cssText = `
    position: absolute;
    top: 100%;
    right: 0;
    width: 200px;
    z-index: 1000;
    margin-top: 0.5rem;
    padding: 0.5rem;
  `;

  dropdown.innerHTML = `
    <div class="user-menu-item">
      <i class="fas fa-user"></i>
      <span>Profile</span>
    </div>
    <div class="user-menu-item">
      <i class="fas fa-cog"></i>
      <span>Settings</span>
    </div>
    <div class="user-menu-item">
      <i class="fas fa-question-circle"></i>
      <span>Help & Support</span>
    </div>
    <div class="user-menu-divider"></div>
    <div class="user-menu-item logout">
      <i class="fas fa-sign-out-alt"></i>
      <span>Log out</span>
    </div>
  `;

  const userProfile = document.querySelector('.user-profile');
  userProfile.style.position = 'relative';
  userProfile.appendChild(dropdown);

  // Close dropdown when clicking outside
  setTimeout(() => {
    document.addEventListener('click', function closeDropdown(e) {
      if (!userProfile.contains(e.target)) {
        dropdown.remove();
        document.removeEventListener('click', closeDropdown);
      }
    });
  }, 100);
}

// Animate Counters
function animateCounters() {
  const counters = document.querySelectorAll('.card-value[data-count]');
  
  counters.forEach(counter => {
    const targetValue = parseInt(counter.dataset.count);
    const prefix = counter.dataset.prefix || '';
    const duration = 2000; // 2 seconds
    const startTime = performance.now();
    
    function updateCounter(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function for smooth animation
      const easeOutCubic = 1 - Math.pow(1 - progress, 3);
      const currentValue = Math.floor(targetValue * easeOutCubic);
      
      // Format number with commas
      const formattedValue = currentValue.toLocaleString();
      counter.textContent = prefix + formattedValue;
      
      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        counter.textContent = prefix + targetValue.toLocaleString();
      }
    }
    
    requestAnimationFrame(updateCounter);
  });
}

// Initialize Charts
function initializeCharts() {
  // Registration Chart
  const regCtx = document.getElementById('registrationsChart');
  if (regCtx) {
    charts.registrations = new Chart(regCtx, {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [{
          label: 'Registrations',
          data: [156, 234, 298, 187, 345, 289, 423, 378, 456, 521, 398, 467],
          borderColor: '#667eea',
          backgroundColor: 'rgba(102, 126, 234, 0.1)',
          borderWidth: 3,
          fill: true,
          tension: 0.4,
          pointBackgroundColor: '#667eea',
          pointBorderColor: '#ffffff',
          pointBorderWidth: 2,
          pointRadius: 4,
          pointHoverRadius: 8
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          }
        },
        scales: {
          x: {
            grid: {
              display: false
            },
            ticks: {
              color: 'var(--muted-foreground)'
            }
          },
          y: {
            grid: {
              color: 'rgba(102, 126, 234, 0.1)'
            },
            ticks: {
              color: 'var(--muted-foreground)'
            }
          }
        },
        elements: {
          point: {
            hoverBackgroundColor: '#667eea'
          }
        }
      }
    });
  }

  // Department Chart
  const deptCtx = document.getElementById('departmentChart');
  if (deptCtx) {
    charts.department = new Chart(deptCtx, {
      type: 'doughnut',
      data: {
        labels: ['Engineering', 'Business', 'Arts & Sciences', 'Medicine', 'Law', 'Others'],
        datasets: [{
          data: [3450, 2890, 2156, 1876, 1245, 932],
          backgroundColor: [
            '#667eea',
            '#f093fb',
            '#4facfe',
            '#43e97b',
            '#ffecd2',
            '#94a3b8'
          ],
          borderWidth: 2,
          borderColor: 'rgba(255, 255, 255, 0.3)'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '60%',
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              color: 'var(--foreground)',
              padding: 20,
              usePointStyle: true
            }
          }
        }
      }
    });
  }

  // Fundraising Chart
  const fundCtx = document.getElementById('fundraisingChart');
  if (fundCtx) {
    charts.fundraising = new Chart(fundCtx, {
      type: 'bar',
      data: {
        labels: ['Annual Fund', 'Scholarship Fund', 'Infrastructure', 'Research Grant', 'Emergency Relief'],
        datasets: [{
          label: 'Amount (₹)',
          data: [850000, 650000, 920000, 455000, 320000],
          backgroundColor: 'rgba(102, 126, 234, 0.8)',
          borderColor: '#667eea',
          borderWidth: 1,
          borderRadius: 8,
          borderSkipped: false
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                return 'Amount: ₹' + (context.parsed.y / 100000).toFixed(1) + 'L';
              }
            }
          }
        },
        scales: {
          x: {
            grid: {
              display: false
            },
            ticks: {
              color: 'var(--muted-foreground)'
            }
          },
          y: {
            grid: {
              color: 'rgba(102, 126, 234, 0.1)'
            },
            ticks: {
              color: 'var(--muted-foreground)',
              callback: function(value) {
                return '₹' + (value / 100000).toFixed(0) + 'L';
              }
            }
          }
        }
      }
    });
  }
}

// Update Charts Theme
function updateChartsTheme() {
  Object.values(charts).forEach(chart => {
    if (chart) {
      chart.update();
    }
  });
}

// Handle URL Hash Changes
window.addEventListener('hashchange', function() {
  const hash = window.location.hash.substring(1);
  if (hash && hash !== currentView) {
    showView(hash);
    updateSidebarState();
  }
});

// Initialize on page load
window.addEventListener('load', function() {
  const hash = window.location.hash.substring(1);
  if (hash) {
    showView(hash);
    updateSidebarState();
  }
});

// Add CSS for dropdowns
const style = document.createElement('style');
style.textContent = `
  .notification-dropdown,
  .user-dropdown {
    border: 1px solid var(--border);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  }
  
  .notification-item {
    padding: 0.75rem;
    border-radius: 8px;
    margin-bottom: 0.5rem;
    transition: background-color 0.2s ease;
    cursor: pointer;
  }
  
  .notification-item:hover {
    background: var(--muted);
  }
  
  .notification-title {
    font-weight: 600;
    font-size: 0.875rem;
    margin-bottom: 0.25rem;
  }
  
  .notification-message {
    font-size: 0.75rem;
    color: var(--muted-foreground);
    margin-bottom: 0.25rem;
  }
  
  .notification-time {
    font-size: 0.625rem;
    color: var(--muted-foreground);
  }
  
  .user-menu-item {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.75rem;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.2s ease;
  }
  
  .user-menu-item:hover {
    background: var(--muted);
  }
  
  .user-menu-item.logout {
    color: var(--destructive);
  }
  
  .user-menu-divider {
    height: 1px;
    background: var(--border);
    margin: 0.5rem 0;
  }
`;
document.head.appendChild(style);
