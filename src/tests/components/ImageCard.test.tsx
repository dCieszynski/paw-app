import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";

import ImageCard from "../../components/ImageCard";

describe("test ImageCard", () => {
  test("renders ImageCard", () => {
    render(<ImageCard size="large" />);
  });

  test("renders header", () => {
    render(<ImageCard size="small" />);

    expect(screen.getByText("Rolf, 2")).toBeTruthy();
  });
});
