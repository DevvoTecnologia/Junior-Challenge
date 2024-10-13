describe("Login Page", () => {
  it("passes", () => {
    cy.visit("http://localhost:3001/login");
  });

  it("should navigate to register page", () => {
    cy.visit("http://localhost:3001/login");
    cy.get("a")
      .contains(/Register/i)
      .click();
    cy.url().should("include", "/register");
  });

  it("should show toastfy email is not valid", () => {
    cy.visit("http://localhost:3001/login");
    cy.get("input[name=email]").type("awdwd@awdawd");
    cy.get("input[name=password]").type("password");
    cy.get("button[type=submit]").click();
    cy.get(".Toastify__toast-body").contains(/This e-mail is not valid/i);
  });

  it("should show toastfy message when login fails", () => {
    cy.visit("http://localhost:3001/login");
    cy.get("input[name=email]").type("awdwd@aawaw.com");
    cy.get("input[name=password]").type("wrongpassword");
    cy.get("button[type=submit]").click();
    cy.get(".Toastify__toast-body").contains(/Invalid user or password/i);
  });

  it("should login successfully and navigate to /users page", () => {
    cy.visit("http://localhost:3001/login");
    cy.get("input[name=email]").type("admin@admin.com");
    cy.get("input[name=password]").type("admin");
    cy.get("button[type=submit]").click();
    cy.get(".Toastify__toast-body").contains(/Logged in successfully/i);
    cy.url().should("include", "/users");
  });
});
