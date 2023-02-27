import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { describe, expect, vi, test } from "vitest";
import RoleOption from "../../components/RoleOption";

describe("test RoleOption", () => {
  test("renders RoleOption", () => {
    render(<RoleOption text="Keeper" active onClick={vi.fn()} />);
  });

  test("renders RoleOption if not active", () => {
    render(<RoleOption text="Keeper" active={false} onClick={vi.fn()} />);
  });

  test("renders button", () => {
    render(<RoleOption text="Keeper" active onClick={vi.fn()} />);

    expect(screen.getByRole("button")).toBeTruthy();
  });

  test("renders text", () => {
    render(<RoleOption text="Keeper" active onClick={vi.fn()} />);

    expect(screen.getByText("Keeper")).toBeTruthy();
  });

  test("runs onClick props", () => {
    const handleClickMock = vi.fn();

    render(<RoleOption text="Keeper" active onClick={handleClickMock} />);

    waitFor(() => {
      expect(handleClickMock).toHaveBeenCalled();
    });
  });
});
