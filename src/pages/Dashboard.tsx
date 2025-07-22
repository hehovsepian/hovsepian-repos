import RepoCard from "../components/RepoCard";
import { useReposContext } from "../store/repos-context";

function Dashboard() {
  const { repos, isLoading, error, loadMoreRepos } = useReposContext();

  if (error) return <p>{error}</p>;

  return (
    <>
      <h2>Showing {repos.length} repositories</h2>
      {repos.map((repo) => {
        return <RepoCard key={repo.id} repo={repo} />;
      })}
      <button onClick={loadMoreRepos} disabled={isLoading}>
        {isLoading ? "Loading..." : "Load more repos"}
      </button>
    </>
  );
}

export default Dashboard;
