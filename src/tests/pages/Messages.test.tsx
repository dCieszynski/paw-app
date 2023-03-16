import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { BrowserRouter } from "react-router-dom";

import Messages from "../../pages/Messages";

describe("test Messages page", () => {
  test("renders page", () => {
    render(
      <BrowserRouter>
        <Messages />
      </BrowserRouter>
    );
  });

  test("renders header", () => {
    render(
      <BrowserRouter>
        <Messages />
      </BrowserRouter>
    );

    expect(screen.getByText("Messages")).toBeTruthy();
  });

  test("renders buttons", () => {
    render(
      <BrowserRouter>
        <Messages />
      </BrowserRouter>
    );

    expect(screen.getAllByRole("button").length).toBe(1);
  });
});
