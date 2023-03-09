import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { BrowserRouter } from "react-router-dom";

import ShelterMain from "../../pages/ShelterMain";

describe("test ShelterMain page", () => {
  test("renders page", () => {
    render(
      <BrowserRouter>
        <ShelterMain />
      </BrowserRouter>
    );
  });

  test("displays correct elements", () => {
    render(
      <BrowserRouter>
        <ShelterMain />
      </BrowserRouter>
    );

    expect(screen.getByText("Animals")).toBeTruthy();
    expect(screen.getByText("This is a list of animals that are available in your animal shelter")).toBeTruthy();
  });
});
