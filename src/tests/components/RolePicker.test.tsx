import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, vi } from "vitest";
import RolePicker from "../../components/RolePicker";

describe("test RolePicker", () => {
  test("renders RolePicker", () => {
    render(<RolePicker activeRole="Keeper" setActiveRole={vi.fn()} />);
  });

  test("renders header", () => {
    render(<RolePicker activeRole="Keeper" setActiveRole={vi.fn()} />);

    expect(screen.getByText("I am a")).toBeTruthy();
  });
});
