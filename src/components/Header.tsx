import { useReposContext } from "../store/ReposContext";

function Header() {
  const { repoCount } = useReposContext();

  return (
    <header className="w-screen h-10 bg-blue-500 text-white sm:mb-20 flex items-center justify-between sticky top-0 px-4">
      <h1 className="text-lg">GoDaddy Repositories</h1>
      <p className="text-sm">Showing {repoCount} Repositories</p>
    </header>
  );
}

export default Header;
