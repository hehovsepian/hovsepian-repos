import RepoCard from "../components/RepoCard";
import { useReposContext } from "../store/repos-context";

function Dashboard() {
  const { repos } = useReposContext();

  return (
    <>
      {repos.map((repo) => {
        return <RepoCard key={repo.id} repo={repo} />;
      })}
    </>
  );
}

export default Dashboard;
