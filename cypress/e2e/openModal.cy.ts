export const reserveButton = "button-reserve";
const reserveModal = "reserve-location";

describe("Open modal and close modal [INTEGRATION TEST]", () => {
  beforeEach(() => {
    cy.visit("");
    cy.get(`[data-testid*=${reserveButton}]`).click({ multiple: true, force: true });
    cy.get(`[data-testid="${reserveModal}"]`).should("be.visible");
  });

  it("Testing close Modal Reserve", () => {
    cy.get(`[data-testid="modal-button-close"]`).should("be.visible");
  });
});
