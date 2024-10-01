describe("Authenticated user browsing", () => {
  it("Should navigate into protected routes", () => {
    cy.visit("http://localhost:3001/login");
    cy.get("input[name=username]").type("admin2");
    cy.get("input[name=password]").type("password");

    cy.get("button[type=submit]").click();

    cy.get(".Toastify__toast-body").contains(/Logged in successfully/i);

    cy.url().should("include", "/users");

    cy.get("a")
      .contains(/My profile/i)
      .click();

    cy.get("a")
      .contains(/Settings/i)
      .click();

    cy.url().should("include", "/users/settings");

    cy.get("a")
      .contains(/Back to Profile/i)
      .click();

    cy.get("a")
      .contains(/My Rings/i)
      .click();

    cy.url().should("include", "/rings");

    cy.get("h1").contains(/Rings/i);

    cy.get("a")
      .contains(/My Profile/i)
      .click();

    cy.get("button")
      .contains(/Logout/i)
      .click();

    cy.url().should("include", "/");
  });
});
