import { useRef, useEffect, useState } from "react";
import RepoCard from "../components/RepoCard";
import Header from "../components/Header";
import { useReposContext } from "../store/ReposContext";

function Dashboard() {
  const { repos, isLoading, error, repoCount, hasMore, loadMoreRepos } =
    useReposContext();

  // Ref for the first newly loaded repo link
  const newRepoLinkRef = useRef<HTMLAnchorElement>(null);
  // Track previous repo count
  const [prevRepoCount, setPrevRepoCount] = useState<number>(0);

  useEffect(() => {
    if (repos.length > prevRepoCount && newRepoLinkRef.current) {
      newRepoLinkRef.current.focus();
    }
    setPrevRepoCount(repos.length);
  }, [repos]);

  // Calculate the index of the first new repo
  const firstNewIndex = prevRepoCount;

  if (error) return <p>{error}</p>;

  return (
    <>
      <Header />
      <main>
        {error ? (
          <div className="text-red-600 text-center my-8" role="alert">
            {error}
          </div>
        ) : (
          <>
            <ul className="flex flex-col w-full sm:w-1/2 p-4 sm:p-0 gap-4 items-center m-auto">
              {repoCount === 0 && !isLoading ? (
                <p className="text-center">No repositories found.</p>
              ) : (
                <>
                  {repos.map((repo, index) => {
                    // Pass ref to the first new item only
                    const shouldAttachRef =
                      index === firstNewIndex && repos.length > prevRepoCount;
                    return (
                      <RepoCard
                        key={repo.id}
                        repo={repo}
                        linkRef={shouldAttachRef ? newRepoLinkRef : undefined}
                      />
                    );
                  })}
                </>
              )}
            </ul>
            {hasMore ? (
              <button
                className="m-auto block my-20"
                onClick={loadMoreRepos}
                disabled={isLoading}
              >
                {isLoading ? "Loading..." : "Load more repos"}
              </button>
            ) : null}
          </>
        )}
      </main>
    </>
  );
}

export default Dashboard;
