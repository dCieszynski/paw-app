import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect } from "vitest";
import Login from "../../pages/Login";

describe("test Login page", () => {
  test("renders page", () => {
    render(<Login />);
  });

  test("renders logo", () => {
    render(<Login />);

    expect(screen.getByAltText("Paw logo")).toBeTruthy();
  });

  test("renders header", () => {
    render(<Login />);

    expect(screen.getByText("Sign up to continue")).toBeTruthy();
  });

  test("renders buttons", () => {
    render(<Login />);

    expect(screen.getAllByRole("button").length).toBe(3);
  });
});
