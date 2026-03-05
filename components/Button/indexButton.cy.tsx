import React from "react";
import { Button } from "./index";

const testText = "Тестовый текст";
const darkTheme = "dark";
const defaultTheme = "light";

describe("Booking button", () => {
  it("Проверка на рендер текста из пропсов", () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<Button desc={testText} />);
    cy.contains(testText);
  });

  it("Проверка на базовый стиль с текстом", () => {
    cy.mount(<Button desc={testText} />);
    cy.get("[class*=light]");
  });

  it("Проверка на темный стиль c текстом", () => {
    cy.mount(<Button theme={darkTheme} desc={testText} />);
    cy.get("[class*=dark]");
  });

  it("Проверка клика по кнопке", () => {
    const mockFunc = cy.stub().as("buttonClick");
    cy.mount(<Button func={mockFunc} desc={`${testText} Клик`} />);

    cy.get("button").click();
    cy.get("@buttonClick").should("have.been.calledOnce");
  });

  it("Проверка на возможность клика при disabled и стили", () => {
    const mockFunc = cy.stub().as("buttonClick");
    cy.mount(<Button disabled={true} func={mockFunc} desc="Disabled" />);

    cy.get("[class*=disabled]");

    cy.get("button")
      .should("be.disabled")
      .click({ force: true })
      .then(() => cy.get("@buttonClick").should("not.have.been.called"));
  });
});
