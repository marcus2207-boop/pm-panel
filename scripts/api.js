// Mock API Service - PM Panel
// This simulates the backend APIs that will integrate with Britesheet, Blink, GitLab, and Freshservice

class MockAPIService {
  constructor() {
    this.projects = [
      {
        id: 'PROJECT-001',
        name: 'PROJECT-001',
        client: 'ClientA',
        team: 'JS',
        status: 'success',
        progress: 67,
        deadline: '2024-01-15',
        priority: 'high',
        tasks: {
          total: 15,
          active: 8,
          blocked: 2,
          completed: 5
        },
        description: 'Main client portal development',
        teamLead: 'Jan Kowalski'
      },
      {
        id: 'PROJECT-002',
        name: 'PROJECT-002',
        client: 'ClientB',
        team: 'React',
        status: 'warning',
        progress: 45,
        deadline: '2024-01-22',
        priority: 'medium',
        tasks: {
          total: 12,
          active: 6,
          blocked: 1,
          completed: 5
        },
        description: 'E-commerce platform upgrade',
        teamLead: 'Anna Nowak'
      },
      {
        id: 'PROJECT-003',
        name: 'PROJECT-003',
        client: 'ClientC',
        team: 'Angular',
        status: 'error',
        progress: 23,
        deadline: '2024-01-10',
        priority: 'critical',
        tasks: {
          total: 20,
          active: 12,
          blocked: 5,
          completed: 3
        },
        description: 'Legacy system migration',
        teamLead: 'Piotr Wiśniewski'
      },
      {
        id: 'PROJECT-004',
        name: 'PROJECT-004',
        client: 'ClientD',
        team: 'Vue',
        status: 'success',
        progress: 89,
        deadline: '2024-02-01',
        priority: 'low',
        tasks: {
          total: 10,
          active: 2,
          blocked: 0,
          completed: 8
        },
        description: 'Mobile app integration',
        teamLead: 'Maria Kowalczyk'
      },
      {
        id: 'PROJECT-005',
        name: 'PROJECT-005',
        client: 'ClientE',
        team: 'Full Stack',
        status: 'info',
        progress: 12,
        deadline: '2024-02-15',
        priority: 'medium',
        tasks: {
          total: 25,
          active: 5,
          blocked: 1,
          completed: 2
        },
        description: 'AI/ML platform development',
        teamLead: 'Tomasz Nowicki'
      }
    ];

    this.tasks = [
      {
        id: 'TASK-001',
        projectId: 'PROJECT-001',
        title: 'Login functionality',
        assignee: 'Jan Kowalski',
        status: 'success',
        sprint: '2024-01',
        jiraLink: 'https://jira.example.com/TASK-001',
        commits: 3,
        blockers: [],
        description: 'Implement user authentication system'
      },
      {
        id: 'TASK-002',
        projectId: 'PROJECT-001',
        title: 'API integration',
        assignee: 'Anna Nowak',
        status: 'warning',
        sprint: '2024-01',
        jiraLink: 'https://jira.example.com/TASK-002',
        commits: 1,
        blockers: ['API endpoint not ready'],
        description: 'Connect frontend with backend services'
      },
      {
        id: 'TASK-003',
        projectId: 'PROJECT-001',
        title: 'Dashboard UI components',
        assignee: 'Piotr Kowalski',
        status: 'success',
        sprint: '2024-01',
        jiraLink: 'https://jira.example.com/TASK-003',
        commits: 5,
        blockers: [],
        description: 'Create reusable dashboard components'
      }
    ];

    this.commits = [
      {
        id: 'abc123',
        projectId: 'PROJECT-001',
        taskId: 'TASK-001',
        message: 'feat: implement login validation',
        author: 'Jan Kowalski',
        date: '2024-01-08T10:30:00Z',
        branch: 'feature/auth',
        status: 'merged'
      },
      {
        id: 'def456',
        projectId: 'PROJECT-001',
        taskId: 'TASK-002',
        message: 'fix: API connection timeout handling',
        author: 'Anna Nowak',
        date: '2024-01-08T14:15:00Z',
        branch: 'feature/api-integration',
        status: 'pending'
      }
    ];

    this.incidents = [
      {
        id: 'INC-001',
        projectId: 'PROJECT-001',
        title: 'Database connection timeout',
        severity: 'high',
        status: 'open',
        assignee: 'DevOps Team',
        created: '2024-01-08T09:00:00Z',
        freshserviceId: 'FS-12345'
      },
      {
        id: 'INC-002',
        projectId: 'PROJECT-003',
        title: 'Migration script failure',
        severity: 'critical',
        status: 'in_progress',
        assignee: 'Piotr Wiśniewski',
        created: '2024-01-07T16:30:00Z',
        freshserviceId: 'FS-12346'
      }
    ];

    this.alerts = [
      {
        id: 'ALERT-001',
        type: 'deadline',
        priority: 'critical',
        projectId: 'PROJECT-003',
        message: 'PROJECT-003 deadline overdue by 2 days',
        created: '2024-01-08T08:00:00Z',
        acknowledged: false
      },
      {
        id: 'ALERT-002',
        type: 'budget',
        priority: 'warning',
        projectId: 'PROJECT-002',
        message: 'PROJECT-002 budget usage at 85%',
        created: '2024-01-08T10:00:00Z',
        acknowledged: false
      },
      {
        id: 'ALERT-003',
        type: 'team',
        priority: 'info',
        projectId: 'PROJECT-001',
        message: 'Team capacity increased for PROJECT-001',
        created: '2024-01-08T12:00:00Z',
        acknowledged: true
      }
    ];

    this.teamMembers = [
      {
        id: 'tm-001',
        name: 'Jan Kowalski',
        role: 'Senior Developer',
        allocation: 100,
        skills: ['JavaScript', 'React', 'Node.js'],
        projects: ['PROJECT-001']
      },
      {
        id: 'tm-002',
        name: 'Anna Nowak',
        role: 'Full Stack Developer',
        allocation: 75,
        skills: ['JavaScript', 'Vue.js', 'Python'],
        projects: ['PROJECT-001', 'PROJECT-002']
      },
      {
        id: 'tm-003',
        name: 'Piotr Wiśniewski',
        role: 'Tech Lead',
        allocation: 90,
        skills: ['Angular', 'Java', 'Architecture'],
        projects: ['PROJECT-003']
      }
    ];
  }

  // Simulate API delay
  async delay(ms = 500) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // Projects API
  async getProjects(filters = {}) {
    await this.delay();
    let filteredProjects = [...this.projects];

    if (filters.status) {
      filteredProjects = filteredProjects.filter(p => p.status === filters.status);
    }

    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      filteredProjects = filteredProjects.filter(p => 
        p.name.toLowerCase().includes(searchTerm) ||
        p.client.toLowerCase().includes(searchTerm) ||
        p.team.toLowerCase().includes(searchTerm)
      );
    }

    if (filters.sortBy) {
      filteredProjects.sort((a, b) => {
        const aVal = a[filters.sortBy];
        const bVal = b[filters.sortBy];
        
        if (filters.sortDirection === 'desc') {
          return bVal > aVal ? 1 : -1;
        }
        return aVal > bVal ? 1 : -1;
      });
    }

    return {
      data: filteredProjects,
      total: filteredProjects.length,
      page: filters.page || 1,
      perPage: filters.perPage || 20
    };
  }

  async getProject(projectId) {
    await this.delay();
    return this.projects.find(p => p.id === projectId);
  }

  // Tasks API
  async getProjectTasks(projectId) {
    await this.delay();
    return this.tasks.filter(t => t.projectId === projectId);
  }

  // Commits API
  async getProjectCommits(projectId) {
    await this.delay();
    return this.commits.filter(c => c.projectId === projectId);
  }

  // Incidents API
  async getProjectIncidents(projectId) {
    await this.delay();
    return this.incidents.filter(i => i.projectId === projectId);
  }

  // Alerts API
  async getAlerts(filters = {}) {
    await this.delay();
    let filteredAlerts = [...this.alerts];

    if (filters.priority) {
      filteredAlerts = filteredAlerts.filter(a => a.priority === filters.priority);
    }

    if (filters.acknowledged !== undefined) {
      filteredAlerts = filteredAlerts.filter(a => a.acknowledged === filters.acknowledged);
    }

    return filteredAlerts;
  }

  async acknowledgeAlert(alertId) {
    await this.delay();
    const alert = this.alerts.find(a => a.id === alertId);
    if (alert) {
      alert.acknowledged = true;
    }
    return alert;
  }

  // Team API
  async getTeamMembers(projectId = null) {
    await this.delay();
    if (projectId) {
      return this.teamMembers.filter(tm => tm.projects.includes(projectId));
    }
    return this.teamMembers;
  }

  // Reports API
  async generateReport(config) {
    await this.delay(2000); // Simulate longer processing time
    
    return {
      id: `report-${Date.now()}`,
      type: config.template,
      projects: config.projects,
      format: config.format,
      generatedAt: new Date().toISOString(),
      downloadUrl: `#report-${Date.now()}`
    };
  }

  // Export API
  async exportData(config) {
    await this.delay(1500);
    
    return {
      id: `export-${Date.now()}`,
      format: config.format,
      dateRange: config.dateRange,
      downloadUrl: `#export-${Date.now()}`,
      size: '2.4 MB'
    };
  }

  // Health check for system status
  async getSystemHealth() {
    await this.delay(200);
    
    return {
      britesheet: { status: 'connected', lastSync: '2024-01-08T12:30:00Z' },
      blink: { status: 'connected', lastSync: '2024-01-08T12:25:00Z' },
      gitlab: { status: 'connected', lastSync: '2024-01-08T12:35:00Z' },
      freshservice: { status: 'warning', lastSync: '2024-01-08T11:45:00Z' }
    };
  }
}

// Create global API instance
window.apiService = new MockAPIService();

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
  module.exports = MockAPIService;
}