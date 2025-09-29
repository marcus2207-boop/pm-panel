// Main Application Logic - PM Panel
class PMPanelApp {
  constructor() {
    this.currentScreen = 'dashboard';
    this.currentProject = null;
    this.currentSort = { field: 'status', direction: 'asc' };
    this.searchTerm = '';
    this.projects = [];
    this.isLoading = false;
    
    this.init();
  }

  async init() {
    this.bindEvents();
    await this.loadDashboard();
    this.updateNotificationBadge();
  }

  // Event Binding
  bindEvents() {
    // Navigation
    document.addEventListener('click', (e) => {
      if (e.target.matches('[data-screen]')) {
        this.navigateToScreen(e.target.dataset.screen);
      }
      
      if (e.target.matches('[data-project-id]')) {
        this.navigateToProject(e.target.dataset.projectId);
      }
      
      if (e.target.matches('.sort-btn')) {
        const th = e.target.closest('th');
        this.sortTable(th.dataset.sort);
      }
      
      if (e.target.matches('[data-tab]')) {
        this.switchTab(e.target.dataset.tab);
      }
      
      if (e.target.matches('[data-report-tab]')) {
        this.switchReportTab(e.target.dataset.reportTab);
      }
    });

    // Search
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
      searchInput.addEventListener('input', this.debounce((e) => {
        this.searchTerm = e.target.value;
        this.filterProjects();
      }, 300));
    }

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (e.altKey && e.key === 'd') {
        e.preventDefault();
        this.navigateToScreen('dashboard');
      }
      if (e.altKey && e.key === 'r') {
        e.preventDefault();
        this.navigateToScreen('reports');
      }
    });

    // Handle back navigation
    window.addEventListener('popstate', (e) => {
      if (e.state) {
        this.navigateToScreen(e.state.screen, e.state.projectId, false);
      }
    });
  }

  // Screen Navigation
  navigateToScreen(screenName, projectId = null, pushState = true) {
    // Update navigation state
    if (pushState) {
      const state = { screen: screenName, projectId };
      history.pushState(state, '', `#${screenName}${projectId ? `/${projectId}` : ''}`);
    }

    // Update UI
    this.currentScreen = screenName;
    this.updateActiveNavigation();
    this.showScreen(screenName);

    // Load screen-specific data
    switch (screenName) {
      case 'dashboard':
        this.loadDashboard();
        break;
      case 'project-details':
        if (projectId) {
          this.loadProjectDetails(projectId);
        }
        break;
      case 'reports':
        this.loadReports();
        break;
      case 'alerts':
        this.loadAlerts();
        break;
      case 'team':
        this.loadTeam();
        break;
    }
  }

  navigateToProject(projectId) {
    this.navigateToScreen('project-details', projectId);
  }

  updateActiveNavigation() {
    document.querySelectorAll('.nav-item').forEach(item => {
      item.classList.remove('active');
      item.removeAttribute('aria-current');
    });

    const activeNav = document.querySelector(`[data-screen="${this.currentScreen}"]`);
    if (activeNav && activeNav.classList.contains('nav-item')) {
      activeNav.classList.add('active');
      activeNav.setAttribute('aria-current', 'page');
    }
  }

  showScreen(screenName) {
    document.querySelectorAll('.screen').forEach(screen => {
      screen.classList.remove('active');
    });

    const targetScreen = document.getElementById(`${screenName}-screen`);
    if (targetScreen) {
      targetScreen.classList.add('active');
    }
  }

  // Dashboard Functions
  async loadDashboard() {
    this.showLoading(true);
    
    try {
      const response = await window.apiService.getProjects({
        search: this.searchTerm,
        sortBy: this.currentSort.field,
        sortDirection: this.currentSort.direction
      });
      
      this.projects = response.data;
      this.renderProjectsTable();
    } catch (error) {
      console.error('Error loading dashboard:', error);
      this.showError('Błąd podczas ładowania projektów');
    } finally {
      this.showLoading(false);
    }
  }

  renderProjectsTable() {
    const tbody = document.getElementById('projectsTableBody');
    if (!tbody) return;

    tbody.innerHTML = '';

    this.projects.forEach(project => {
      const row = this.createProjectRow(project);
      tbody.appendChild(row);
    });
  }

  createProjectRow(project) {
    const row = document.createElement('tr');
    row.className = 'project-row';
    row.setAttribute('role', 'row');
    
    const status = Formatters.formatStatus(project.status);
    const progress = Formatters.formatProgress(project.progress);
    const deadline = Formatters.formatDeadline(project.deadline);
    const team = Formatters.formatTeam(project.team);

    row.innerHTML = `
      <td role="gridcell">
        <div class="status-indicator">
          <span class="status-dot ${status.class}" aria-label="${status.text}"></span>
          <span class="sr-only">${status.text}</span>
        </div>
      </td>
      <td role="gridcell">
        <button class="project-name-link" data-project-id="${project.id}" data-screen="project-details">
          ${Formatters.sanitizeHTML(project.name)}
        </button>
      </td>
      <td role="gridcell">${project.client}</td>
      <td role="gridcell">
        <span class="team-badge" style="background-color: ${team.color}20; color: ${team.color}">
          ${team.name}
        </span>
      </td>
      <td role="gridcell">
        <div class="progress-container">
          <div class="progress-bar">
            <div class="progress-fill ${progress.status}" style="width: ${progress.percentage}%"></div>
          </div>
          <span class="progress-text">${progress.text}</span>
        </div>
      </td>
      <td role="gridcell">
        <span class="deadline ${deadline.status} ${deadline.urgent ? 'urgent' : ''}">
          ${deadline.text}
        </span>
      </td>
      <td role="gridcell">
        <div class="action-buttons">
          <button class="btn-icon" title="Zobacz szczegóły" data-project-id="${project.id}" data-screen="project-details">
            👁️
          </button>
          <button class="btn-icon" title="Edytuj projekt">
            ✏️
          </button>
          <button class="btn-icon" title="Więcej opcji">
            ⋯
          </button>
        </div>
      </td>
    `;

    // Add hover effect
    row.addEventListener('mouseenter', () => {
      row.style.backgroundColor = 'var(--background-hover)';
    });
    
    row.addEventListener('mouseleave', () => {
      row.style.backgroundColor = '';
    });

    return row;
  }

  // Project Details Functions
  async loadProjectDetails(projectId) {
    this.currentProject = projectId;
    this.showLoading(true);

    try {
      const [project, tasks, commits, incidents] = await Promise.all([
        window.apiService.getProject(projectId),
        window.apiService.getProjectTasks(projectId),
        window.apiService.getProjectCommits(projectId),
        window.apiService.getProjectIncidents(projectId)
      ]);

      this.renderProjectHeader(project);
      this.renderProjectTasks(tasks);
      this.updateBreadcrumb(project.name);
    } catch (error) {
      console.error('Error loading project details:', error);
      this.showError('Błąd podczas ładowania szczegółów projektu');
    } finally {
      this.showLoading(false);
    }
  }

  renderProjectHeader(project) {
    const titleEl = document.getElementById('projectTitle');
    const metaEl = document.querySelector('.project-meta');
    const statsEl = document.querySelector('.project-stats');

    if (titleEl) titleEl.textContent = project.name;
    
    if (metaEl) {
      const status = Formatters.formatStatus(project.status);
      metaEl.innerHTML = `
        <span class="meta-item">${project.client}</span>
        <span class="meta-item">${project.team} Team</span>
        <span class="status-badge ${status.class}">${status.icon} ${status.text}</span>
      `;
    }

    if (statsEl) {
      statsEl.innerHTML = `
        <span class="stat">${project.tasks.total} Tasks</span>
        <span class="stat">${project.tasks.active} Active</span>
        <span class="stat ${project.tasks.blocked > 0 ? 'warning' : ''}">${project.tasks.blocked} Blocked</span>
        <span class="stat success">${project.tasks.completed} Done</span>
      `;
    }
  }

  renderProjectTasks(tasks) {
    const taskList = document.getElementById('taskList');
    if (!taskList) return;

    taskList.innerHTML = '';

    tasks.forEach(task => {
      const taskEl = this.createTaskElement(task);
      taskList.appendChild(taskEl);
    });
  }

  createTaskElement(task) {
    const taskEl = document.createElement('div');
    taskEl.className = 'task-item';
    
    const status = Formatters.formatTaskStatus(task.status);
    const hasBlockers = task.blockers && task.blockers.length > 0;

    taskEl.innerHTML = `
      <div class="task-header">
        <h4 class="task-title">${Formatters.sanitizeHTML(task.title)}</h4>
        <span class="status-badge ${status.class}">${status.icon} ${status.text}</span>
      </div>
      <div class="task-meta">
        Assignee: ${Formatters.sanitizeHTML(task.assignee)} | Sprint: ${Formatters.sanitizeHTML(task.sprint)}
      </div>
      <div class="task-actions">
        <a href="${task.jiraLink}" class="btn btn-sm btn-secondary" target="_blank" rel="noopener noreferrer">View Jira</a>
        <span class="commit-count">Commits: ${task.commits}</span>
        ${hasBlockers ? `<span class="blocker-warning">⚠️ Blocker: ${task.blockers[0]}</span>` : '<span class="no-blockers">Blockers: None</span>'}
      </div>
    `;

    return taskEl;
  }

  updateBreadcrumb(projectName) {
    const breadcrumbProject = document.getElementById('currentProjectName');
    if (breadcrumbProject) {
      breadcrumbProject.textContent = projectName;
    }
  }

  // Tab Management
  switchTab(tabName) {
    // Update tab buttons
    document.querySelectorAll('.tab-btn').forEach(btn => {
      btn.classList.remove('active');
    });
    
    document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');

    // Update tab panels
    document.querySelectorAll('.tab-panel').forEach(panel => {
      panel.classList.remove('active');
    });
    
    document.getElementById(`${tabName}-panel`).classList.add('active');

    // Load tab-specific data
    this.loadTabData(tabName);
  }

  async loadTabData(tabName) {
    if (!this.currentProject) return;

    switch (tabName) {
      case 'tasks':
        // Already loaded in loadProjectDetails
        break;
      case 'code':
        const commits = await window.apiService.getProjectCommits(this.currentProject);
        this.renderCommits(commits);
        break;
      case 'incidents':
        const incidents = await window.apiService.getProjectIncidents(this.currentProject);
        this.renderIncidents(incidents);
        break;
    }
  }

  // Table Sorting
  sortTable(field) {
    if (this.currentSort.field === field) {
      this.currentSort.direction = this.currentSort.direction === 'asc' ? 'desc' : 'asc';
    } else {
      this.currentSort.field = field;
      this.currentSort.direction = 'asc';
    }

    this.updateSortIcons();
    this.loadDashboard();
  }

  updateSortIcons() {
    document.querySelectorAll('.sort-icon').forEach(icon => {
      icon.textContent = '↕️';
    });

    const activeSort = document.querySelector(`[data-sort="${this.currentSort.field}"] .sort-icon`);
    if (activeSort) {
      activeSort.textContent = this.currentSort.direction === 'asc' ? '↑' : '↓';
    }
  }

  // Search and Filtering
  async filterProjects() {
    await this.loadDashboard();
  }

  // Reports Functions
  async loadReports() {
    // Initialize report builder
    this.initReportBuilder();
  }

  initReportBuilder() {
    // Add event listeners for report controls
    document.querySelectorAll('.format-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.format-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
      });
    });

    document.querySelectorAll('.schedule-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.schedule-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
      });
    });
  }

  switchReportTab(tabName) {
    document.querySelectorAll('[data-report-tab]').forEach(btn => {
      btn.classList.remove('active');
    });
    
    document.querySelector(`[data-report-tab="${tabName}"]`).classList.add('active');
  }

  // Notification Management
  async updateNotificationBadge() {
    try {
      const alerts = await window.apiService.getAlerts({ acknowledged: false });
      const badge = document.querySelector('.notification-btn .badge');
      
      if (badge) {
        const count = alerts.length;
        badge.textContent = count;
        badge.style.display = count > 0 ? 'flex' : 'none';
      }
    } catch (error) {
      console.error('Error updating notifications:', error);
    }
  }

  // Loading States
  showLoading(show) {
    this.isLoading = show;
    const loadingState = document.getElementById('loadingState');
    const mainTable = document.querySelector('.table-wrapper');

    if (loadingState && mainTable) {
      if (show) {
        loadingState.classList.add('active');
        mainTable.style.opacity = '0.5';
      } else {
        loadingState.classList.remove('active');
        mainTable.style.opacity = '1';
      }
    }
  }

  showError(message) {
    // Simple error display - could be enhanced with toast notifications
    console.error(message);
    alert(message);
  }

  // Utility Functions
  debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }
}

// Initialize the application when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  window.pmApp = new PMPanelApp();
});

// Handle initial hash routing
window.addEventListener('load', () => {
  const hash = window.location.hash.slice(1);
  if (hash) {
    const [screen, projectId] = hash.split('/');
    if (screen && window.pmApp) {
      window.pmApp.navigateToScreen(screen, projectId, false);
    }
  }
});