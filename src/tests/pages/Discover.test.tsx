import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { BrowserRouter } from "react-router-dom";

import Discover from "../../pages/Discover";

describe("test Discover page", () => {
  test("renders page", () => {
    render(
      <BrowserRouter>
        <Discover />
      </BrowserRouter>
    );
  });

  test("renders header", () => {
    render(
      <BrowserRouter>
        <Discover />
      </BrowserRouter>
    );

    expect(screen.getByText("Discover")).toBeTruthy();
  });
});
