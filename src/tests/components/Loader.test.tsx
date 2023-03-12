import React from "react";
import { render } from "@testing-library/react";
import { describe, test } from "vitest";

import Loader from "../../components/Loader";

describe("test Loader", () => {
  test("renders Loader", () => {
    render(<Loader />);
  });
});
