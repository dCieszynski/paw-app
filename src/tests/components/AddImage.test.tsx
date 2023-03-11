import React from "react";
import { render } from "@testing-library/react";
import { describe, test, vi } from "vitest";

import AddImage from "../../components/AddImage";

describe("test AddImage component", () => {
  test("renders component", () => {
    render(<AddImage handleChange={vi.fn()} />);
  });
});
