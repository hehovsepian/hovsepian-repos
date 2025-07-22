import { describe, it, expect, vi, beforeEach } from "vitest";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Detail from "./Detail";
import { mockRepos } from "../mock_data/mockRepos";

let mockContext: any;

vi.mock("../store/ReposContext", () => ({
  useReposContext: () => mockContext,
}));

describe("Detail Page", () => {
  beforeEach(() => {
    mockContext = {};
  });

  it('shows "Repo not found" when repo is missing', () => {
    mockContext = {
      repos: [],
      isLoading: false,
      error: null,
      repoCount: 0,
      loadMoreRepos: vi.fn(),
    };
    render(
      <MemoryRouter initialEntries={["/repo/123"]}>
        <Routes>
          <Route path="/repo/:id" element={<Detail />} />
        </Routes>
      </MemoryRouter>
    );
    expect(screen.getByText("Repo not found")).toBeInTheDocument();
  });

  it("renders repo details when a repo is provided", () => {
    mockContext = {
      repos: [mockRepos[0]],
      isLoading: false,
      error: null,
      repoCount: 1,
      loadMoreRepos: vi.fn(),
    };
    render(
      <MemoryRouter initialEntries={["/repo/4967118"]}>
        <Routes>
          <Route path="/repo/:id" element={<Detail />} />
        </Routes>
      </MemoryRouter>
    );
    expect(screen.getByText("gdapi-php")).toBeInTheDocument();
    expect(
      screen.getByText("A PHP client for Go Daddy® REST APIs")
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "View on Github" })
    ).toHaveAttribute("href", "https://github.com/godaddy/gdapi-php");
    expect(screen.getByText("Language: PHP")).toBeInTheDocument();
  });
});
