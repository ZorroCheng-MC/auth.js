import React from "react";
import { render, screen } from "@testing-library/react";
import Layout from "../../components/Layout";
import { useSession } from "next-auth/react";

jest.mock("next-auth/react");

describe("Layout", () => {
  it("renders children and navigation", () => {
    (useSession as jest.Mock).mockReturnValue({
      data: null,
      status: "unauthenticated",
    });

    render(
      <Layout>
        <div>Test Content</div>
      </Layout>
    );

    expect(screen.getByText("My App")).toBeInTheDocument();
    expect(screen.getByText("File Analysis")).toBeInTheDocument();
    expect(screen.getByText("Test Content")).toBeInTheDocument();
    expect(screen.queryByText("Sample Records")).not.toBeInTheDocument();
    expect(screen.queryByText("Collect Files")).not.toBeInTheDocument();
  });

  it("renders authenticated navigation when user is logged in", () => {
    (useSession as jest.Mock).mockReturnValue({
      data: { user: { name: "Test User" } },
      status: "authenticated",
    });

    render(
      <Layout>
        <div>Test Content</div>
      </Layout>
    );

    expect(screen.getByText("Sample Records")).toBeInTheDocument();
    expect(screen.getByText("Collect Files")).toBeInTheDocument();
    expect(screen.getByText("Log out")).toBeInTheDocument();
  });
});
