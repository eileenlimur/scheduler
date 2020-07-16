// const { CYCLIC_KEY } = require("@storybook/addon-actions")

describe("Navigation", () => {
  beforeEach(()=> {
    cy.visit("/");
  });
  it("Should navigate to Tuesday", () => {
    cy.contains("[data-testid=day]", "Tuesday")
    .click()
    .should("have.class", "day-list__item--selected");
  });
});