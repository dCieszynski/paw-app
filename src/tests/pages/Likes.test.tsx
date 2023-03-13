import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { BrowserRouter } from "react-router-dom";

import Likes from "../../pages/Likes";
import AuthContext from "../../context/AuthProvider";

describe("test Likes page", () => {
  test("renders page", () => {
    render(
      <BrowserRouter>
        <AuthContext.Provider value={{ auth: { id: 1 } as any, profile: { role: "keeper" } as any } as any}>
          <Likes />
        </AuthContext.Provider>
      </BrowserRouter>
    );
  });

  test("renders header", () => {
    render(
      <BrowserRouter>
        <AuthContext.Provider value={{ auth: { id: 1 } as any, profile: { role: "keeper" } as any } as any}>
          <Likes />
        </AuthContext.Provider>
      </BrowserRouter>
    );

    expect(screen.getByText("Likes")).toBeTruthy();
  });
});
