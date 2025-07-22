import { type Ref } from "react";
import { type Repo } from "../types/global_types";
import { Link } from "react-router-dom";

type RepoCardProps = {
  repo: Repo;
  linkRef?: Ref<HTMLAnchorElement>;
};

function RepoCard({ repo, linkRef }: RepoCardProps) {
  return (
    <li className="border p-4 rounded-lg shadow-md w-full">
      <p>{repo.name}</p>
      <Link to={`/repo/${repo.id}`} ref={linkRef}>
        See repo details
      </Link>
    </li>
  );
}

export default RepoCard;
