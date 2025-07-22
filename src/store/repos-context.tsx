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
  //   setRepos: (repos: Repo[]) => void;
};

const ReposContext = createContext<ReposContextType>({
  repos: [],
  isLoading: true,
  error: null,
  //   setRepos: (repos: Repo[]) => {},
});

type ReposProviderProps = {
  children: ReactNode;
};

export default function ReposProvider({ children }: ReposProviderProps) {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("https://api.github.com/orgs/godaddy/repos?per_page=20")
      .then((results) => results.json())
      .then((data) => {
        setRepos(data);
        setIsLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch repos");
        setIsLoading(false);
      });
  }, []);

  //   const context = {
  //     repos: [],
  //     setRepos: (repos: Repo[]) => {
  //       //...
  //     },
  //   };

  return (
    <ReposContext.Provider value={{ repos, isLoading, error }}>
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
