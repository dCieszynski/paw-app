import React, { useContext } from "react";
import { describe, expect, test, vi } from "vitest";
import { render, screen, renderHook } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import AuthContext, { AuthProvider, TAuthContext } from "../../context/AuthProvider";
import { User } from "@supabase/supabase-js";

describe("AuthProvider", () => {
  const mockUser: User = {
    id: "1",
    email: "test@example.com",
  } as any;

  test("should set auth context", () => {
    render(
      <BrowserRouter>
        <AuthProvider />
      </BrowserRouter>
    );

    const { result } = renderHook(() => useContext(AuthContext));

    expect(result.current.auth).toBeNull();
  });
});
