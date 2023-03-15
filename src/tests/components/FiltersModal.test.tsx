import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";

import FiltersModal from "../../components/FiltersModal";

describe("test FiltersModal", () => {
  test("renders FiltersModal", () => {
    render(
      <FiltersModal
        initialFilters={{ minAge: 0, maxAge: 30, species: "All", city: "" }}
        display
        handleCloseFilterModal={vi.fn()}
        handleSubmit={vi.fn()}
      />
    );
  });

  test("renders header", () => {
    render(
      <FiltersModal
        initialFilters={{ minAge: 0, maxAge: 30, species: "All", city: "" }}
        display
        handleCloseFilterModal={vi.fn()}
        handleSubmit={vi.fn()}
      />
    );

    expect(screen.getByText("Filters")).toBeTruthy();
  });

  test("renders elements", () => {
    render(
      <FiltersModal
        initialFilters={{ minAge: 0, maxAge: 30, species: "All", city: "" }}
        display
        handleCloseFilterModal={vi.fn()}
        handleSubmit={vi.fn()}
      />
    );

    expect(screen.getByText("Age")).toBeTruthy();
    expect(screen.getByText("Interested in")).toBeTruthy();
    expect(screen.getByText("Location")).toBeTruthy();
  });
});
