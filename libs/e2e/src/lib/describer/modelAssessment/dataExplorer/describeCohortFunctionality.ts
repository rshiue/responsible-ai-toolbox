// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Locators } from "../Constants";
import { IModelAssessmentData } from "../IModelAssessmentData";

const cohortName = "CohortCreateE2E";
export function describeCohortFunctionality(
  dataShape: IModelAssessmentData
): void {
  describe("Cohort functionality", () => {
    it("Should have global cohort by default", () => {
      cy.get(`${Locators.DECohortDropdown} span`).should(
        "contain",
        dataShape.cohortDefaultName
      );
    });
    it("should have save and save and switch buttons disabled by default", () => {
      cy.get(Locators.CreateNewCohortButton).click();
      cy.get(Locators.CohortSaveButton).should("be.disabled");
      cy.get(Locators.CohortSaveAndSwitchButton).should("be.disabled");
      cy.get(Locators.CancelButton).click();
      cy.get(Locators.YesButton).click();
    });
    it("should not allow creating empty cohort", () => {
      cy.get(Locators.CreateNewCohortButton).click();
      cy.get(Locators.CohortFilterSelection).first().check();
      cy.get(Locators.CohortDatasetValueInput).clear().type("0");
      cy.get(Locators.CohortAddFilterButton).click();
      cy.get(Locators.CohortSaveAndSwitchButton).click();
      cy.get(Locators.CohortEmptyDialogCloseButton).click();
      cy.get(Locators.CancelButton).click();
      cy.get(Locators.YesButton).click();
    });
    it("Should update dataset selection with new cohort when a new cohort is created", () => {
      cy.get(Locators.CreateNewCohortButton).click();
      cy.get("#cohortEditPanel").should("exist");
      cy.get(Locators.CohortNameInput).clear().type(cohortName);
      cy.get(Locators.CohortFilterSelection).eq(1).check(); // select Dataset
      cy.get(Locators.CohortDatasetValueInput).then(($input) => {
        if ($input.length > 0) {
          cy.get(Locators.CohortDatasetValueInput)
            .clear()
            .type(dataShape.datasetExplorerData?.cohortDatasetNewValue || "");
        }
      });
      cy.get(Locators.CohortAddFilterButton).click();
      cy.get(Locators.CohortSaveAndSwitchButton).eq(0).click({ force: true });
      cy.get(Locators.NewCohortSpan).should("exist");

      cy.get(Locators.DECohortDropdown).click();
      cy.get(Locators.DEDropdownOptions).should("exist");
      cy.get(Locators.DECohortDropdown).click();
    });

    it("should render global cohort by default for individual datapoints until dataset selection is changed", () => {
      cy.get(`${Locators.DECohortDropdown} span`).should(
        "contain",
        dataShape.cohortDefaultName
      );
      cy.get(Locators.DEIndividualDatapoints).click();
      cy.get(`${Locators.DECohortDropdown} span`).should(
        "contain",
        dataShape.cohortDefaultName
      );
      cy.get(Locators.DEAggregatePlots).click();
    });

    it.skip("should update chart on selecting new cohort", () => {
      cy.get(Locators.DECohortDropdown).click();
      cy.get(Locators.DEDropdownOptions).should("exist").click();
      cy.get(Locators.DEYAxisPoints)
        .last()
        .invoke("text")
        .then((text) => {
          const valueInInt = Number(text);
          expect(valueInInt).lte(
            Number(dataShape.datasetExplorerData?.cohortDatasetNewValue || "")
          );
        });
    });
  });
}