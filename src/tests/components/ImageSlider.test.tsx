import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { describe, expect, test } from "vitest";

import ImageSlider from "../../components/ImageSlider";

describe("test ImageSlider", () => {
  test("renders ImageSlider", () => {
    render(<ImageSlider />);
  });

  test("renders image", () => {
    render(<ImageSlider />);

    waitFor(async () => {
      expect(screen.getByRole("img")).toBeTruthy();
    });
  });
});
