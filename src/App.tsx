import "./App.css";
import Dashboard from "./pages/Dashboard";
import Detail from "./pages/Detail";
import { createBrowserRouter, RouterProvider } from "react-router";
import ReposProvider from "./store/ReposContext";

function App() {
  return (
    <ReposProvider>
      <RouterProvider
        router={createBrowserRouter([
          {
            path: "/",
            element: <Dashboard />,
          },
          {
            path: "/repo/:id",
            element: <Detail />,
          },
        ])}
      />
    </ReposProvider>
  );
}

export default App;
