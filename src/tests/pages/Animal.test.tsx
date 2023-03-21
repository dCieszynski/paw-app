import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { BrowserRouter } from "react-router-dom";

import Animal from "../../pages/Animal";

describe("test Animal page", () => {
  test("renders page", () => {
    render(
      <BrowserRouter>
        <Animal />
      </BrowserRouter>
    );
  });
});
