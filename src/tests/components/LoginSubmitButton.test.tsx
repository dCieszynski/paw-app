import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect } from "vitest";
import { BrowserRouter } from "react-router-dom";
import LoginSubmitButton from "../../components/LoginSubmitButton";

describe("test LoginSubmitButton", () => {
  test("renders LoginSubmitButton", () => {
    render(
      <BrowserRouter>
        <LoginSubmitButton title="Continue" submit={false} />
      </BrowserRouter>
    );
  });

  test("renders button", () => {
    render(
      <BrowserRouter>
        <LoginSubmitButton title="Continue" submit={false} />
      </BrowserRouter>
    );

    expect(screen.getByRole("button")).toBeTruthy();
  });

  test("renders title", () => {
    render(
      <BrowserRouter>
        <LoginSubmitButton title="Continue" submit={false} />
      </BrowserRouter>
    );

    expect(screen.getByText("Continue")).toBeTruthy();
  });

  test("renders link", () => {
    render(
      <BrowserRouter>
        <LoginSubmitButton title="Continue" submit={false} link="/create_role/keeper" />
      </BrowserRouter>
    );

    expect(screen.getByRole("link")).toBeTruthy();
  });
});
