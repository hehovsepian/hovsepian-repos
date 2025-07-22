import { useEffect, useState } from "react";
import { type Repo } from "../types/global_types";
import { useParams } from "react-router-dom";
import { useReposContext } from "../store/repos-context";
import { Link } from "react-router";

function Detail() {
  const { id } = useParams<{ id: string }>();
  const { repos, isLoading } = useReposContext();

  if (isLoading) return <p>Loading...</p>;

  const selectedRepo: Repo | undefined = repos.find(
    (repo) => repo.id === Number(id)
  );
  console.log(selectedRepo);

  return (
    <>
      <Link to={`/`}>Back to all repos</Link>
      {selectedRepo ? (
        <>
          <p>{selectedRepo.name}</p>
          <p>{selectedRepo.description}</p>
          <a href={selectedRepo.html_url}>View on Github</a>
          {/* this is a new fetch */}
          <p>{selectedRepo.languages_url}</p>
          {/* this could also be another fetch to get more details */}
          <p>Forks: {selectedRepo.forks}</p>
          <p>Open Issues: {selectedRepo.open_issues}</p>
          <p>Watchers: {selectedRepo.watchers}</p>
        </>
      ) : (
        <p>Repo not found</p>
      )}
    </>
  );
}

export default Detail;
