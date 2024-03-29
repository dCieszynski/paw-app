import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, vi, test } from "vitest";
import InputField from "../../components/InputField";

describe("test InputField", () => {
  test("renders InputField", () => {
    render(<InputField name="test" title="Test" handleChange={vi.fn()} value="" />);
  });

  test("renders title", () => {
    render(<InputField name="test" title="Test" handleChange={vi.fn()} value="" />);

    expect(screen.getByText("Test")).toBeTruthy();
  });
});
