describe("Register Page", () => {
  it("passes", () => {
    cy.visit("http://localhost:3001/register");
  });

  it("should navigate to login page", () => {
    cy.visit("http://localhost:3001/register");
    cy.get("a")
      .contains(/Sign in/i)
      .click();
    cy.url().should("include", "/login");
  });

  it("should show toastfy message when register fails", () => {
    cy.visit("http://localhost:3001/register");
    cy.get("input[name=username]").type("admin2");
    cy.get("input[name=password]").type("wrongpassword");
    cy.get("button[type=submit]").click();
    cy.get(".Toastify__toast-body").contains(/Username already exists/i);
  });
});
