import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import Dashboard from "./Dashboard";

vi.mock("../store/ReposContext", () => ({
  useReposContext: () => ({
    repos: [],
    isLoading: false,
    error: null,
    repoCount: 0,
    loadMoreRepos: vi.fn(),
  }),
}));

vi.mock("../components/RepoCard", () => ({
  default: () => <div>RepoCard</div>,
}));

describe("Dashboard", () => {
  it("shows 'No repositories found.' when repoCount is 0 and not loading", () => {
    render(<Dashboard />);
    expect(screen.getByText("No repositories found.")).toBeTruthy();
  });

  it("shows 'Load more repos' button", () => {
    render(<Dashboard />);
    expect(screen.getByRole("button")).toBeTruthy();
  });
});
