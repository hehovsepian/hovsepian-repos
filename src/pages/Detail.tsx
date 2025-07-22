import { useEffect, useState } from "react";
import { type Repo } from "../types/global_types";
import { useParams } from "react-router-dom";
import { useReposContext } from "../store/repos-context";
import { Link } from "react-router";

function Detail() {
  const { id } = useParams<{ id: string }>();
  const { repos, isLoading } = useReposContext();

  const [selectedRepo, setSelectedRepo] = useState<Repo | undefined>(undefined);
  const [languagesList, setLanguagesList] = useState<string[]>([]);

  const getRepoLanguages = () => {
    if (typeof selectedRepo !== "undefined" && selectedRepo.languages_url) {
      fetch(selectedRepo.languages_url)
        .then((results) => results.json())
        .then((data) => {
          setLanguagesList(data);
        })
        .catch(() => {
          console.error("Failed to fetch repo languages");
        });
    }
  };

  useEffect(() => {
    const repo = repos.find((repo) => repo.id === Number(id));
    setSelectedRepo(repo);
  }, [id, repos]);

  useEffect(() => {
    getRepoLanguages();
  }, [selectedRepo]);

  if (isLoading) return <p>Loading...</p>;

  return (
    <>
      <Link to={`/`}>Back to all repos</Link>
      {selectedRepo ? (
        <>
          <p>{selectedRepo.name}</p>
          <p>{selectedRepo.description}</p>
          <a href={selectedRepo.html_url}>View on Github</a>
          {languagesList.length > 0 ? (
            <ul>
              {languagesList.map((language, index) => (
                <li key={index}>{language}</li>
              ))}
            </ul>
          ) : (
            <p>{selectedRepo.language}</p>
          )}
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
