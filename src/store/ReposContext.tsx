import {
  type ReactNode,
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";
import { type Repo } from "../types/global_types";

type ReposContextType = {
  repos: Repo[];
  isLoading: boolean;
  error: string | null;
  repoCount: number;
  loadMoreRepos: () => void;
};

const ReposContext = createContext<ReposContextType>({
  repos: [],
  isLoading: true,
  error: null,
  repoCount: 0,
  loadMoreRepos: () => {},
});

type ReposProviderProps = {
  children: ReactNode;
};

export default function ReposProvider({ children }: ReposProviderProps) {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);

  const fetchRepos = (pageNumber: number, signal?: AbortSignal) => {
    setIsLoading(true);
    fetch(
      `https://api.github.com/orgs/godaddy/repos?per_page=20&page=${pageNumber}`,
      { signal: signal }
    )
      .then((results) => results.json())
      .then((data) => {
        setRepos((prev) => [...prev, ...data]);
        setIsLoading(false);
      })
      .catch((error) => {
        if (error.name !== "AbortError") {
          setError("Failed to fetch repos");
          setIsLoading(false);
        }
      });
  };

  const loadMoreRepos = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchRepos(nextPage);
  };

  useEffect(() => {
    const controller = new AbortController();
    fetchRepos(1, controller.signal);

    return () => {
      controller.abort();
    };
  }, []);

  return (
    <ReposContext.Provider
      value={{
        repos,
        isLoading,
        error,
        repoCount: repos.length,
        loadMoreRepos,
      }}
    >
      {children}
    </ReposContext.Provider>
  );
}

export function useReposContext() {
  const reposContext = useContext(ReposContext);
  if (!reposContext) {
    throw new Error("useReposContext must be used within a ReposProvider");
  }
  return reposContext;
}
