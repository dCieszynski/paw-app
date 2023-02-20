import React from "react";
import { render, screen, act, waitFor } from "@testing-library/react";
import { describe, expect } from "vitest";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import CreateProfile from "../../pages/CreateProfile";

describe("test CreateProfile page", () => {
  test("renders page", () => {
    render(
      <BrowserRouter>
        <CreateProfile />
      </BrowserRouter>
    );
  });

  test("displays validation messages", () => {
    render(
      <BrowserRouter>
        <CreateProfile />
      </BrowserRouter>
    );

    const button = screen.getByRole("button", { name: /Confirm/ });

    act(() => {
      userEvent.click(button);
    });

    waitFor(() => {
      expect(screen.getByText("Avatar is required")).toBeTruthy();
      expect(screen.getByText("First name is required")).toBeTruthy();
      expect(screen.getByText("Last name is required")).toBeTruthy();
    });
  });
});
