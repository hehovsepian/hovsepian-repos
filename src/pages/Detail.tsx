import { useEffect, useState } from "react";
import { type Repo } from "../types/global_types";
import { useParams } from "react-router-dom";
import { useReposContext } from "../store/ReposContext";
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
          const languages = Object.keys(data);
          setLanguagesList(languages);
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
    <main className="w-screen h-screen p-4 sm:p-20">
      <div className="flex flex-col w-full sm:w-1/2 gap-4 items-center m-auto">
        <Link to={`/`}>Back to all repos</Link>
        {selectedRepo ? (
          <>
            <div className="border p-4 rounded-lg shadow-md w-full mt-10">
              <p>{selectedRepo.name}</p>
              <p>{selectedRepo.description}</p>
              <a href={selectedRepo.html_url} target="_blank">
                View on Github
              </a>
            </div>
            <div className="border p-4 rounded-lg shadow-md w-full mt-4">
              {languagesList.length > 1 ? (
                <>
                  <span>Languages:</span>
                  <ul>
                    {languagesList.map((language, index) => (
                      <li key={index}>{language}</li>
                    ))}
                  </ul>
                </>
              ) : (
                <p>Language: {selectedRepo.language}</p>
              )}
              {/* this could also be another fetch to get more details */}
              <p>Forks: {selectedRepo.forks}</p>
              <p>Open Issues: {selectedRepo.open_issues}</p>
              <p>Watchers: {selectedRepo.watchers}</p>
            </div>
          </>
        ) : (
          <p>Repo not found</p>
        )}
      </div>
    </main>
  );
}

export default Detail;
