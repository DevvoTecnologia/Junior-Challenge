describe("Login Page OAuth", () => {
  it("passes", () => {
    cy.visit("http://localhost:3001/login");
  });

  it("should navigate to github oauth page", () => {
    cy.visit("http://localhost:3001/login");
    cy.get("button")
      .contains(/Github/i)
      .click();
  });
});
