import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";

import Selector from "../../components/Selector";

describe("test Selector", () => {
  test("renders Selector", () => {
    render(<Selector title="Age" elements={["18-25", "26-35", "36-45", "46-55", "56-65", "66+"]} value="" setFieldValue={vi.fn()} />);
  });

  test("renders header", () => {
    render(<Selector title="Age" elements={["18-25", "26-35", "36-45", "46-55", "56-65", "66+"]} value="" setFieldValue={vi.fn()} />);
  });

  test("renders elements", () => {
    render(<Selector title="Age" elements={["18-25", "26-35", "36-45", "46-55", "56-65", "66+"]} value="" setFieldValue={vi.fn()} />);
    expect(screen.getByText("18-25")).toBeTruthy();
    expect(screen.getByText("26-35")).toBeTruthy();
    expect(screen.getByText("36-45")).toBeTruthy();
  });
});
