import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect } from "vitest";
import PickRole from "../../pages/PickRole";

describe("test PickRole page", () => {
  test("renders page", () => {
    render(<PickRole />);
  });

  test("renders buttons", () => {
    render(<PickRole />);

    expect(screen.getAllByRole("button").length).toBe(3);
  });
});
