describe("Users Page", () => {
  it("passes", () => {
    cy.visit("http://localhost:3001/users");
  });

  it("should move carousel to the right", () => {
    cy.visit("http://localhost:3001/users");
    cy.get("button[datatype=move-carousel-right]").first().click();
  });

  it("should apear Login button and should navigate to login page", () => {
    cy.visit("http://localhost:3001/users");
    cy.get("button").contains(/Login/i).click();
    cy.url().should("include", "/login");
  });

  it("should have container with users list", () => {
    cy.visit("http://localhost:3001/users");
    cy.get("[datatype=users-list]");
  });

  it("should navigate to users/:id page", () => {
    cy.visit("http://localhost:3001/users");
    cy.get("[datatype=user-list-id]")
      .first()
      .invoke("attr", "data-user-id")
      .then((userId) => {
        cy.visit(`http://localhost:3001/users/${userId}`);
        cy.url().should("include", `/users/${userId}`);
      });
  });
});
