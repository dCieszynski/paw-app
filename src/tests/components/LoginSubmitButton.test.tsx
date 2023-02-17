import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect } from "vitest";
import LoginSubmitButton from "../../components/LoginSubmitButton";

describe("test LoginSubmitButton", () => {
  test("renders LoginSubmitButton", () => {
    render(<LoginSubmitButton title="Continue" submit={false} />);
  });

  test("renders button", () => {
    render(<LoginSubmitButton title="Continue" submit={false} />);

    expect(screen.getByRole("button")).toBeTruthy();
  });

  test("renders title", () => {
    render(<LoginSubmitButton title="Continue" submit={false} />);

    expect(screen.getByText("Continue")).toBeTruthy();
  });
});
