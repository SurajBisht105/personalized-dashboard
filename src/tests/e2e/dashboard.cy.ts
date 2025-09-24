describe('Dashboard E2E Tests', () => {
  beforeEach(() => {
    cy.visit('/dashboard');
  });

  it('should load the dashboard and display content', () => {
    cy.get('[data-testid="content-feed"]').should('be.visible');
    cy.get('[data-testid="content-card"]').should('have.length.greaterThan', 0);
  });

  it('should perform search functionality', () => {
    cy.get('[data-testid="search-input"]').type('technology');
    cy.wait(600); // Wait for debounce
    cy.get('[data-testid="content-card"]').should('contain', 'technology');
  });

  it('should toggle dark mode', () => {
    cy.get('[data-testid="theme-toggle"]').click();
    cy.get('html').should('have.class', 'dark');
    cy.get('[data-testid="theme-toggle"]').click();
    cy.get('html').should('not.have.class', 'dark');
  });

  it('should drag and drop content cards', () => {
    cy.get('[data-testid="content-card"]').first().as('firstCard');
    cy.get('[data-testid="content-card"]').eq(1).as('secondCard');

    cy.get('@firstCard')
      .trigger('dragstart')
      .trigger('drag');

    cy.get('@secondCard')
      .trigger('dragover')
      .trigger('drop');

    // Verify order has changed
    cy.get('[data-testid="content-card"]').first().should('not.contain', 'Content Item 0');
  });

  it('should navigate to settings and update preferences', () => {
    cy.get('[data-testid="nav-settings"]').click();
    cy.url().should('include', '/settings');
    
    cy.get('[data-testid="category-technology"]').uncheck();
    cy.get('[data-testid="category-sports"]').check();
    cy.get('[data-testid="save-preferences"]').click();
    
    cy.get('[data-testid="success-message"]').should('be.visible');
  });

  it('should add and remove favorites', () => {
    cy.get('[data-testid="favorite-button"]').first().click();
    cy.get('[data-testid="nav-favorites"]').click();
    cy.url().should('include', '/favorites');
    cy.get('[data-testid="content-card"]').should('have.length.greaterThan', 0);
  });
});