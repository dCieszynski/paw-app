import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { describe, expect, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import ImagePicker from "../../components/ImagePicker";
import defaultImgUrl from "../assets/avatar.svg";

describe("test ImagePicker", () => {
  test("renders ImagePicker", () => {
    render(<ImagePicker imgUrl={defaultImgUrl} altText="Avatar" handleChange={vi.fn()} />);
  });

  test("renders image", () => {
    render(<ImagePicker imgUrl={defaultImgUrl} altText="Avatar" handleChange={vi.fn()} />);

    expect(screen.getByAltText("Avatar")).toBeTruthy();
  });

  test("changes input", () => {
    const handleChangeMock = vi.fn();
    render(<ImagePicker imgUrl={defaultImgUrl} altText="Avatar" handleChange={handleChangeMock} />);

    const input = screen.getByLabelText("", { selector: 'input[type="file"]' });

    const file = new File(["file content"], "file.png", { type: "image/png" });
    userEvent.upload(input, file);

    waitFor(() => {
      expect(handleChangeMock).toHaveBeenCalled();
    });
  });
});
