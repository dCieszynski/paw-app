import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";

import SliderInput from "../../components/SliderInput";

describe("test SliderInput", () => {
  test("renders SliderInput", () => {
    render(<SliderInput title="Age" min={0} max={30} maxCap={30} reset={false} setFieldValue={vi.fn()} setReset={vi.fn()} />);
  });

  test("renders header", () => {
    render(<SliderInput title="Age" min={0} max={30} maxCap={30} reset={false} setFieldValue={vi.fn()} setReset={vi.fn()} />);

    expect(screen.getByText("Age")).toBeTruthy();
  });
});
