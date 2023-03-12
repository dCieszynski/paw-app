import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";

import ImageCard from "../../components/ImageCard";

describe("test ImageCard", () => {
  test("renders ImageCard", () => {
    render(<ImageCard size="large" images={["1", "2"]} title="" description="Desc" handleDelete={vi.fn()} id={1} />);
    expect(screen.getByText("Desc")).toBeTruthy();
  });

  test("renders header", () => {
    render(<ImageCard size="small" images={["1", "2"]} title="Title" description="Desc" handleDelete={vi.fn()} id={1} />);

    expect(screen.getByText("Title")).toBeTruthy();
  });

  test("handles delete", () => {
    const handleDelete = vi.fn(() => {});
    render(<ImageCard size="small" images={["1", "2"]} title="Title" description="Desc" handleDelete={handleDelete} id={1} />);
    screen.getAllByRole("button")[0].click();

    expect(handleDelete).toBeCalled();
  });
});
