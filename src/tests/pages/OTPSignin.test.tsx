import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { describe, test, expect } from "vitest";
import userEvent from "@testing-library/user-event";
import { BrowserRouter, MemoryRouter } from "react-router-dom";
import OTPSignin from "../../pages/OTPSignin";
import App from "../../App";

describe("test OTPSignin page", () => {
  test("renders page", () => {
    render(
      <BrowserRouter>
        <OTPSignin />
      </BrowserRouter>
    );
  });

  test("renders header", () => {
    render(
      <BrowserRouter>
        <OTPSignin />
      </BrowserRouter>
    );

    expect(screen.getByText("Sign in via OTP link")).toBeTruthy();
  });

  test("renders buttons", () => {
    render(
      <BrowserRouter>
        <OTPSignin />
      </BrowserRouter>
    );

    expect(screen.getAllByRole("button").length).toBe(2);
  });
});
