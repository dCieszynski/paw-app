import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import { FaFacebookSquare } from "react-icons/fa";

import LoginButton from "../../components/LoginButton";

describe("test LoginButton", () => {
  test("renders LoginButton", () => {
    render(<LoginButton Icon={FaFacebookSquare} handleClick={vi.fn()} />);
  });

  test("renders button", () => {
    render(<LoginButton Icon={FaFacebookSquare} handleClick={vi.fn()} />);

    expect(screen.getByRole("button")).toBeTruthy();
  });
});
