import { type Repo } from "../types/global_types";
import { Link } from "react-router";

type RepoCardProps = {
  repo: Repo;
};

function RepoCard({ repo }: RepoCardProps) {
  return (
    <div className="border p-4 rounded-lg shadow-md">
      <p>{repo.name}</p>
      <Link to={`/repo/${repo.id}`}>See repo details</Link>
    </div>
  );
}

export default RepoCard;
