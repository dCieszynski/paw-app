import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";

import PawButton from "../../components/PawButton";

describe("test PawButton", () => {
  test("renders PawButton", () => {
    render(<PawButton handleClick={vi.fn()} />);
  });

  test("renders button", () => {
    render(<PawButton handleClick={vi.fn()} />);

    expect(screen.getByRole("button")).toBeTruthy();
  });

  test("handles click", () => {
    const handleClick = vi.fn(() => {});

    render(<PawButton handleClick={handleClick} />);

    screen.getByRole("button").click();

    expect(handleClick).toBeCalled();
  });
});
