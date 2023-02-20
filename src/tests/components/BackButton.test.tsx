import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect } from "vitest";
import { BrowserRouter } from "react-router-dom";
import BackButton from "../../components/BackButton";

describe("test BackButton", () => {
  test("renders BackButton", () => {
    render(
      <BrowserRouter>
        <BackButton />
      </BrowserRouter>
    );
  });

  test("renders button", () => {
    render(
      <BrowserRouter>
        <BackButton />
      </BrowserRouter>
    );

    expect(screen.getByRole("button")).toBeTruthy();
  });
});
