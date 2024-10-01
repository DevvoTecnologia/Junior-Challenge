describe("Users/:id Page", () => {
  it("passes", () => {
    cy.visit("http://localhost:3001/users/1");
  });

  it("should navigate back to /users page", () => {
    cy.visit("http://localhost:3001/users/1");
    cy.get("[datatype=user-link-back-to-users]").click();
    cy.url().should("include", "/users");
  });
});
