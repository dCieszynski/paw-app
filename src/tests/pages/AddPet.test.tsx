import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { BrowserRouter } from "react-router-dom";

import AddPet from "../../pages/AddPet";
import userEvent from "@testing-library/user-event";

describe("test AddPet page", () => {
  test("renders page", () => {
    render(
      <BrowserRouter>
        <AddPet />
      </BrowserRouter>
    );
  });

  test("displays validation messages", async () => {
    render(
      <BrowserRouter>
        <AddPet />
      </BrowserRouter>
    );

    const button = screen.getByRole("button", { name: /Add pet/ });

    userEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText("Name is required")).toBeTruthy();
      expect(screen.getByText("Breed is required")).toBeTruthy();
      expect(screen.getByText("Age is required")).toBeTruthy();
      expect(screen.getByText("At least one image is required")).toBeTruthy();
    });
  });
});
