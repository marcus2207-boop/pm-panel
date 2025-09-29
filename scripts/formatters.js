// Utility functions for formatting data in PM Panel

const Formatters = {
  // Date formatting
  formatDate(dateString, options = {}) {
    const date = new Date(dateString);
    const defaultOptions = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      ...options
    };
    
    return new Intl.DateTimeFormat('pl-PL', defaultOptions).format(date);
  },

  formatRelativeDate(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);
    
    if (diffInSeconds < 60) {
      return 'teraz';
    } else if (diffInSeconds < 3600) {
      const minutes = Math.floor(diffInSeconds / 60);
      return `${minutes} min temu`;
    } else if (diffInSeconds < 86400) {
      const hours = Math.floor(diffInSeconds / 3600);
      return `${hours} godz. temu`;
    } else if (diffInSeconds < 2592000) {
      const days = Math.floor(diffInSeconds / 86400);
      return `${days} dni temu`;
    } else {
      return this.formatDate(dateString);
    }
  },

  formatDeadline(dateString) {
    const deadline = new Date(dateString);
    const now = new Date();
    const diffInDays = Math.floor((deadline - now) / (1000 * 60 * 60 * 24));
    
    if (diffInDays < 0) {
      return {
        text: `Przeterminowane o ${Math.abs(diffInDays)} dni`,
        status: 'error',
        urgent: true
      };
    } else if (diffInDays === 0) {
      return {
        text: 'Dziś!',
        status: 'error',
        urgent: true
      };
    } else if (diffInDays <= 3) {
      return {
        text: `${diffInDays} dni`,
        status: 'warning',
        urgent: true
      };
    } else if (diffInDays <= 7) {
      return {
        text: `${diffInDays} dni`,
        status: 'warning',
        urgent: false
      };
    } else {
      return {
        text: this.formatDate(dateString),
        status: 'success',
        urgent: false
      };
    }
  },

  // Progress formatting
  formatProgress(percentage) {
    const rounded = Math.round(percentage);
    let status = 'success';
    
    if (rounded < 30) {
      status = 'error';
    } else if (rounded < 70) {
      status = 'warning';
    }
    
    return {
      percentage: rounded,
      status,
      text: `${rounded}%`
    };
  },

  // Status formatting
  formatStatus(status) {
    const statusMap = {
      success: {
        text: 'W realizacji',
        icon: '🟢',
        class: 'success'
      },
      warning: {
        text: 'Zagrożone',
        icon: '🟡',
        class: 'warning'
      },
      error: {
        text: 'Krytyczne',
        icon: '🔴',
        class: 'error'
      },
      info: {
        text: 'W planowaniu',
        icon: '🔵',
        class: 'info'
      }
    };
    
    return statusMap[status] || statusMap.info;
  },

  // Priority formatting
  formatPriority(priority) {
    const priorityMap = {
      critical: {
        text: 'Krytyczny',
        icon: '🚨',
        class: 'error',
        order: 1
      },
      high: {
        text: 'Wysoki',
        icon: '⚠️',
        class: 'warning',
        order: 2
      },
      medium: {
        text: 'Średni',
        icon: '📋',
        class: 'info',
        order: 3
      },
      low: {
        text: 'Niski',
        icon: '📝',
        class: 'success',
        order: 4
      }
    };
    
    return priorityMap[priority] || priorityMap.medium;
  },

  // Team formatting
  formatTeam(teamName) {
    const teamColors = {
      'JS': '#f7df1e',
      'React': '#61dafb',
      'Angular': '#dd0031',
      'Vue': '#4fc08d',
      'Full Stack': '#6366f1'
    };
    
    return {
      name: teamName,
      color: teamColors[teamName] || '#6366f1',
      initials: teamName.split(' ').map(word => word[0]).join('').toUpperCase()
    };
  },

  // File size formatting
  formatFileSize(bytes) {
    if (bytes === 0) return '0 B';
    
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  },

  // Number formatting
  formatNumber(number) {
    return new Intl.NumberFormat('pl-PL').format(number);
  },

  // Currency formatting (for budget features)
  formatCurrency(amount, currency = 'PLN') {
    return new Intl.NumberFormat('pl-PL', {
      style: 'currency',
      currency: currency
    }).format(amount);
  },

  // Percentage formatting
  formatPercentage(value, decimals = 0) {
    return new Intl.NumberFormat('pl-PL', {
      style: 'percent',
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals
    }).format(value / 100);
  },

  // Task status formatting
  formatTaskStatus(status) {
    const taskStatusMap = {
      'todo': {
        text: 'Do zrobienia',
        icon: '⏳',
        class: 'info'
      },
      'in_progress': {
        text: 'W trakcie',
        icon: '🔄',
        class: 'warning'
      },
      'review': {
        text: 'Do przeglądu',
        icon: '👀',
        class: 'info'
      },
      'done': {
        text: 'Zakończone',
        icon: '✅',
        class: 'success'
      },
      'blocked': {
        text: 'Zablokowane',
        icon: '🚫',
        class: 'error'
      }
    };
    
    return taskStatusMap[status] || taskStatusMap.todo;
  },

  // Incident severity formatting
  formatIncidentSeverity(severity) {
    const severityMap = {
      critical: {
        text: 'Krytyczny',
        icon: '🔥',
        class: 'error',
        order: 1
      },
      high: {
        text: 'Wysoki',
        icon: '⚠️',
        class: 'warning',
        order: 2
      },
      medium: {
        text: 'Średni',
        icon: '📢',
        class: 'info',
        order: 3
      },
      low: {
        text: 'Niski',
        icon: '📝',
        class: 'success',
        order: 4
      }
    };
    
    return severityMap[severity] || severityMap.medium;
  },

  // Git commit formatting
  formatCommitMessage(message, maxLength = 50) {
    if (message.length <= maxLength) {
      return message;
    }
    
    return message.substring(0, maxLength - 3) + '...';
  },

  // Time duration formatting
  formatDuration(minutes) {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    
    if (hours === 0) {
      return `${remainingMinutes} min`;
    } else if (remainingMinutes === 0) {
      return `${hours} godz.`;
    } else {
      return `${hours} godz. ${remainingMinutes} min`;
    }
  },

  // Allocation percentage formatting with visual indicator
  formatAllocation(percentage) {
    let status = 'success';
    let warning = false;
    
    if (percentage > 100) {
      status = 'error';
      warning = true;
    } else if (percentage > 85) {
      status = 'warning';
      warning = true;
    }
    
    return {
      percentage,
      status,
      warning,
      text: `${percentage}%`,
      description: warning ? 'Przeciążenie' : 'Dostępny'
    };
  },

  // Create initials from name
  getInitials(name) {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  },

  // Sanitize HTML to prevent XSS
  sanitizeHTML(str) {
    const temp = document.createElement('div');
    temp.textContent = str;
    return temp.innerHTML;
  },

  // Truncate text with ellipsis
  truncateText(text, maxLength) {
    if (text.length <= maxLength) {
      return text;
    }
    return text.substring(0, maxLength - 3) + '...';
  },

  // Format search highlight
  highlightSearchTerm(text, searchTerm) {
    if (!searchTerm) return text;
    
    const regex = new RegExp(`(${searchTerm})`, 'gi');
    return text.replace(regex, '<mark>$1</mark>');
  }
};

// Export for global use
window.Formatters = Formatters;

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
  module.exports = Formatters;
}