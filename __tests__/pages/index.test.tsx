import React from "react";
import { render, screen } from "@testing-library/react";
import Home from "../../pages/index";

jest.mock("next-auth/react", () => ({
  useSession: () => ({ data: null, status: "unauthenticated" }),
}));

describe("Home", () => {
  it("renders the welcome message and get started button", () => {
    render(<Home />);

    expect(screen.getByText("Welcome to My App")).toBeInTheDocument();
    expect(
      screen.getByText("Analyze files, collect samples, and more!")
    ).toBeInTheDocument();
    expect(screen.getByText("Get Started")).toBeInTheDocument();
  });
});
