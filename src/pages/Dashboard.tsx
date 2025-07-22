import RepoCard from "../components/RepoCard";
import Header from "../components/Header";
import { useReposContext } from "../store/ReposContext";

function Dashboard() {
  const { repos, isLoading, error, repoCount, loadMoreRepos } =
    useReposContext();

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
                  {repos.map((repo) => {
                    return <RepoCard key={repo.id} repo={repo} />;
                  })}
                </>
              )}
            </ul>
            <button
              className="m-auto block my-20"
              onClick={loadMoreRepos}
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : "Load more repos"}
            </button>
          </>
        )}
      </main>
    </>
  );
}

export default Dashboard;
