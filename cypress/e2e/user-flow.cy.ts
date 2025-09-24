describe('Complete User Flow', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.clearLocalStorage();
    cy.clearCookies();
  });

  it('should complete full user journey', () => {
    // 1. Landing page
    cy.contains('Content Hub').should('be.visible');
    cy.get('[data-testid="get-started-btn"]').click();

    // 2. Dashboard
    cy.url().should('include', '/dashboard');
    cy.get('[data-testid="content-feed"]').should('be.visible');

    // 3. Search functionality
    cy.get('[data-testid="search-input"]').type('technology{enter}');
    cy.wait(1000);
    cy.get('[data-testid="content-card"]').should('contain', 'technology');

    // 4. Add to favorites
    cy.get('[data-testid="favorite-button"]').first().click();
    cy.get('[data-testid="success-toast"]').should('contain', 'Added to favorites');

    // 5. Navigate to favorites
    cy.get('[data-testid="nav-favorites"]').click();
    cy.url().should('include', '/favorites');
    cy.get('[data-testid="content-card"]').should('have.length.at.least', 1);

    // 6. Settings and preferences
    cy.get('[data-testid="nav-settings"]').click();
    cy.url().should('include', '/settings');
    
    // Toggle dark mode
    cy.get('[data-testid="dark-mode-toggle"]').click();
    cy.get('html').should('have.class', 'dark');

    // Update categories
    cy.get('[data-testid="category-sports"]').check();
    cy.get('[data-testid="category-finance"]').check();
    cy.get('[data-testid="save-preferences"]').click();
    cy.get('[data-testid="success-toast"]').should('contain', 'Settings saved');

    // 7. Return to dashboard and verify preferences
    cy.get('[data-testid="nav-dashboard"]').click();
    cy.get('[data-testid="content-card"]').should('exist');

    // 8. Drag and drop
    cy.get('[data-testid="content-card"]').first().as('firstCard');
    cy.get('[data-testid="content-card"]').eq(1).as('secondCard');

    cy.get('@firstCard').trigger('dragstart');
    cy.get('@secondCard').trigger('drop');
    cy.get('@firstCard').trigger('dragend');

    // 9. Infinite scroll
    cy.scrollTo('bottom');
    cy.wait(1000);
    cy.get('[data-testid="content-card"]').should('have.length.greaterThan', 10);

    // 10. Sign out
    cy.get('[data-testid="user-menu"]').click();
    cy.get('[data-testid="sign-out"]').click();
    cy.url().should('eq', Cypress.config().baseUrl + '/');
  });

  it('should handle error states gracefully', () => {
    // Simulate network error
    cy.intercept('GET', '/api/content', { statusCode: 500 });
    cy.visit('/dashboard');
    cy.get('[data-testid="error-message"]').should('contain', 'Something went wrong');
    cy.get('[data-testid="retry-button"]').click();
  });

  it('should persist user preferences', () => {
    // Set preferences
    cy.visit('/settings');
    cy.get('[data-testid="category-technology"]').check();
    cy.get('[data-testid="save-preferences"]').click();

    // Reload page
    cy.reload();

    // Verify preferences are persisted
    cy.get('[data-testid="category-technology"]').should('be.checked');
  });

  it('should handle search with debouncing', () => {
    cy.visit('/dashboard');
    cy.intercept('GET', '/api/content/search*').as('searchRequest');

    cy.get('[data-testid="search-input"]').type('test');
    
    // Should not trigger immediately
    cy.wait(100);
    cy.get('@searchRequest.all').should('have.length', 0);

    // Should trigger after debounce delay
    cy.wait(500);
    cy.get('@searchRequest.all').should('have.length', 1);
  });
});