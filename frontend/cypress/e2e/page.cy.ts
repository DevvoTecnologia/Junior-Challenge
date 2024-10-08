describe("Main Page", () => {
  it("passes", () => {
    cy.visit("http://localhost:3001");
  });

  it("should navigate to login page", () => {
    cy.visit("http://localhost:3001");
    cy.get("a").contains("Log In").click();
    cy.url().should("include", "/login");
  });
});
