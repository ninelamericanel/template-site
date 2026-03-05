import React from "react";
import { Button } from "./index";

const reserveButton = "button-reserve";

describe("Open Modal <Button /> [Integration test]", () => {
  beforeEach(() => {
    cy.visit("");
  });

  it("Testing open modal of Reserve", () => {
    cy.contains(`[data-testid=${reserveButton}]`);
  });
});
