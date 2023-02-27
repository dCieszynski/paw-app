import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { BrowserRouter } from "react-router-dom";
import PickRole from "../../pages/PickRole";

describe("test PickRole page", () => {
  test("renders page", () => {
    render(
      <BrowserRouter>
        <PickRole />
      </BrowserRouter>
    );
  });

  test("renders buttons", () => {
    render(
      <BrowserRouter>
        <PickRole />
      </BrowserRouter>
    );

    expect(screen.getAllByRole("button").length).toBe(3);
  });
});
