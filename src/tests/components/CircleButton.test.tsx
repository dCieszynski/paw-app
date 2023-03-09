import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";

import CircleButton from "../../components/CircleButton";

describe("test CircleButton", () => {
  test("renders CircleButton", () => {
    render(<CircleButton Icon={() => <div>Icon</div>} textSize="text-2xl" color="bg-br-green" handleClick={() => {}} />);
  });

  test("renders button", () => {
    render(<CircleButton Icon={() => <div>Icon</div>} textSize="text-2xl" color="bg-br-green" handleClick={() => {}} />);

    expect(screen.getByRole("button")).toBeTruthy();
  });

  test("handles click", () => {
    const handleClick = vi.fn(() => {});

    render(<CircleButton Icon={() => <div>Icon</div>} textSize="text-2xl" color="bg-br-green" handleClick={handleClick} />);

    screen.getByRole("button").click();

    expect(handleClick).toBeCalled();
  });
});
