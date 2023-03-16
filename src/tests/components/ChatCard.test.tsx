import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";

import ChatCard from "../../components/ChatCard";

describe("test ChatCard component", () => {
  test("renders component", () => {
    render(<ChatCard image={""} title={""} status={""} handleApprove={vi.fn()} handleReject={vi.fn()} />);
  });

  test("renders image", () => {
    render(<ChatCard image={"img.png"} title={"Chat card image"} status={"Pending"} handleApprove={vi.fn()} handleReject={vi.fn()} />);

    expect(screen.getByAltText("Chat card image")).toBeTruthy();
  });

  test("renders title", () => {
    render(<ChatCard image={""} title={"Chat card title"} status={"Pending"} handleApprove={vi.fn()} handleReject={vi.fn()} />);

    expect(screen.getByText("Chat card title")).toBeTruthy();
  });
});
