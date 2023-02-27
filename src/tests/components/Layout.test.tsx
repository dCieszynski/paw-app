import React from "react";
import { render } from "@testing-library/react";
import { describe, test } from "vitest";
import Layout from "../../components/Layout";

describe("test Layout", () => {
  test("renders Layout", () => {
    render(<Layout />);
  });
});
