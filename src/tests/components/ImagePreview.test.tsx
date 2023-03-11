import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";

import ImagePreview from "../../components/ImagePreview";
import defaultImg from "../../assets/avatar.svg";

describe("test ImagePreview component", () => {
  test("renders component", () => {
    render(<ImagePreview imgSrc={defaultImg} altText="Text" handleRemove={vi.fn()} url="" />);
  });

  test("displays image", () => {
    render(<ImagePreview imgSrc={defaultImg} altText="Text" handleRemove={vi.fn()} url="" />);

    const image = screen.getByRole("img", { name: /Text/ });

    expect(image).toBeTruthy();
  });
});
