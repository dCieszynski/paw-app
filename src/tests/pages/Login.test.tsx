import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { BrowserRouter } from "react-router-dom";
import Login from "../../pages/Login";

describe("test Login page", () => {
  test("renders page", () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );
  });

  test("renders logo", () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    expect(screen.getByAltText("Paw logo")).toBeTruthy();
  });

  test("renders header", () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    expect(screen.getByText("Sign up to continue")).toBeTruthy();
  });

  test("renders buttons", () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    expect(screen.getAllByRole("button").length).toBe(2);
  });
});
