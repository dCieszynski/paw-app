import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { BrowserRouter } from "react-router-dom";
import { keeperLinks } from "../../utils/navbarLinks";

import AppLayout from "../../components/AppLayout";

describe("test AppLayout", () => {
  test("renders AppLayout", () => {
    render(
      <BrowserRouter>
        <AppLayout links={keeperLinks} />
      </BrowserRouter>
    );
  });

  test("renders navbar", () => {
    render(
      <BrowserRouter>
        <AppLayout links={keeperLinks} />
      </BrowserRouter>
    );

    expect(screen.getByRole("navigation")).toBeTruthy();
  });
});
