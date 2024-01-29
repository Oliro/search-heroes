describe('Home test', () => {

  it('Visits the initial project page', () => {
    cy.visit('/')
    cy.contains('EXPLORE O UNIVERSO')
  });

  it('Search and open character details', () => {
    cy.visit('/');
    cy.contains('EXPLORE O UNIVERSO')
    cy.get('#searchCharacter').type('spider-girl');
    cy.wait(2500);
    cy.get('#characterDetails').click();
    cy.url().should('contain', '/character-detail/');
  });

})

