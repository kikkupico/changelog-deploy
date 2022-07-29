import { render, screen, cleanup } from "@testing-library/react";
import { FilterPanel } from "../../../components/composed/FilterPanel";
import "@testing-library/jest-dom";

beforeEach(() => {
  cleanup();
});

const assertLabelActive = (labelId: string, labelText: string) => {
  expect(screen.getByTestId(labelId).className).toContain(
    "bg-brandBlue-100 border border-brandBlue-400"
  );
  expect(screen.getByTestId(labelId).className).not.toContain(
    "border border-gray-400 bg-gray-100"
  );
  expect(screen.getByText(labelText).className).toContain("text-brandBlue-400");
  expect(screen.getByText(labelText).className).not.toContain("text-gray-400");
};

const assertLabelNotActive = (labelId: string, labelText: string) => {
  expect(screen.getByTestId(labelId).className).not.toContain(
    "bg-brandBlue-100 border border-brandBlue-400"
  );
  expect(screen.getByTestId(labelId).className).toContain(
    "border border-gray-400 bg-gray-100"
  );
  expect(screen.getByText(labelText).className).not.toContain(
    "text-brandBlue-400"
  );
  expect(screen.getByText(labelText).className).toContain("text-gray-400");
};

describe("FilterPanel", () => {
  it("renders emptiness in all sections correctly", () => {
    const setComponent = jest.fn();
    const setTag = jest.fn();
    const setTier = jest.fn();
    const setDate = jest.fn();
    render(
      <FilterPanel
        filters={{
          component: [],
          "release-type": [],
          tier: [],
          from: [],
          to: [],
        }}
      />
    );

    assertLabelNotActive("component-server", "Server");
    assertLabelNotActive("component-console", "Console");
    assertLabelNotActive("component-cli", "CLI");

    assertLabelNotActive("release-type-stable-release", "Release");
    assertLabelNotActive("release-type-update", "Update");
    assertLabelNotActive("release-type-patch-release", "Patch");
    // assertLabelNotActive("release-type-pre-release", "Coming Soon");

    // assertLabelNotActive("tier-cloud-free", "Free");
    // assertLabelNotActive("tier-cloud-standard", "Standard");
    // assertLabelNotActive("tier-cloud-enterprise", "Enterprise");

    expect(screen.getByTestId("date-from")).toHaveAttribute("value", "");
    expect(screen.getByTestId("date-to")).toHaveAttribute("value", "");
  });

  it("renders selected filters correctly", () => {
    const setComponent = jest.fn();
    const setTag = jest.fn();
    const setTier = jest.fn();
    const setDate = jest.fn();
    render(
      <FilterPanel
        filters={{
          component: ["cli", "server"],
          "release-type": ["patch-release"],
          tier: ["cloud-enterprise"],
          from: ["0"],
          to: ["1000000000000"],
        }}
      />
    );

    assertLabelActive("component-server", "Server");
    assertLabelNotActive("component-console", "Console");
    assertLabelActive("component-cli", "CLI");

    assertLabelNotActive("release-type-stable-release", "Release");
    assertLabelNotActive("release-type-update", "Update");
    assertLabelActive("release-type-patch-release", "Patch");

    // assertLabelNotActive("tier-cloud-free", "Free");
    // assertLabelNotActive("tier-cloud-standard", "Standard");
    // assertLabelActive("tier-cloud-enterprise", "Enterprise");

    expect(screen.getByTestId("date-from")).toHaveAttribute(
      "value",
      "1970-01-01"
    );
    expect(screen.getByTestId("date-to")).toHaveAttribute(
      "value",
      "2001-09-09"
    );
  });
});
