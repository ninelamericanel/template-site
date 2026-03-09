const closeButton = "modal-button-close";
import { reserveButton } from "./openModal.cy";
const modal = "modal";

describe("Close modal [INTEGRATION TEST]", () => {
  beforeEach(() => {
    cy.visit("");
    cy.get(`[data-testid*=${reserveButton}]`).click({ multiple: true, force: true });
    cy.get(`[data-testid*=${modal}]`).should("be.visible");
    cy.get(`[data-testid="${closeButton}"]`).should("be.visible");
  });

  it("Testing close Modal", () => {
    cy.get(`[data-testid="${closeButton}"]`).click({});
  });
});
