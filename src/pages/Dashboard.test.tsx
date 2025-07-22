import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Dashboard from "./Dashboard";
import { mockRepos } from "../mock_data/mockRepos";

vi.mock("../components/RepoCard", () => ({
  default: ({ repo }: { repo: { name: string } }) => <p>{repo.name}</p>,
}));

let mockContext: any;

vi.mock("../store/ReposContext", () => ({
  useReposContext: () => mockContext,
}));

describe("Dashboard", () => {
  beforeEach(() => {
    mockContext = {};
  });

  it("shows 'No repositories found.' when repoCount is 0 and not loading", () => {
    mockContext = {
      repos: [],
      isLoading: false,
      error: null,
      repoCount: 0,
      hasMore: true,
      loadMoreRepos: vi.fn(),
    };
    render(<Dashboard />);
    expect(screen.getByText("No repositories found.")).toBeInTheDocument();
  });

  it("shows 'Loading...' in the button when isLoading is true", () => {
    mockContext = {
      repos: [],
      isLoading: true,
      error: null,
      repoCount: 0,
      hasMore: true,
      loadMoreRepos: vi.fn(),
    };
    render(<Dashboard />);
    const button = screen.getByRole("button");
    expect(button).toHaveTextContent("Loading...");
    expect(button).toBeDisabled();
  });

  it("renders a list of repos when repos are provided", () => {
    mockContext = {
      repos: mockRepos,
      isLoading: false,
      error: null,
      repoCount: mockRepos.length,
      hasMore: true,
      loadMoreRepos: vi.fn(),
    };
    render(<Dashboard />);
    expect(screen.getByText("gdapi-php")).toBeInTheDocument();
    expect(screen.getByText("lazy-social-buttons")).toBeInTheDocument();
  });

  it("shows error message when error is present", () => {
    mockContext = {
      repos: [],
      isLoading: false,
      error: "Failed to fetch repos",
      repoCount: 0,
      hasMore: true,
      loadMoreRepos: vi.fn(),
    };
    render(<Dashboard />);
    expect(screen.getByText("Failed to fetch repos")).toBeInTheDocument();
  });

  // if more time I would've written a unit test for the hasMore functionality
  // this just ensures that the button is only rendered when more repos are available to load from the api
});
