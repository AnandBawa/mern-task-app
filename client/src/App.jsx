import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { HomePage, Login, Register, Tasks, Error, Landing } from "./pages";

// Loaders
import { homePageLoader } from "./pages/HomePage";

// Actions
import { registerAction } from "./pages/Register";
import { loginAction } from "./pages/Login";
import { tasksAction } from "./pages/Tasks";

// default React Query Client with stale time of 5 mins
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
    },
  },
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage queryClient={queryClient} />,
    loader: homePageLoader(queryClient),
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Login />,
        action: loginAction(queryClient),
      },
      // {
      //   path: "login",
      //   element: <Login />,
      //   action: loginAction(queryClient),
      // },
      {
        path: "register",
        element: <Register />,
        action: registerAction,
      },
      {
        path: "tasks",
        element: <Tasks />,
        action: tasksAction(queryClient),
      },
    ],
  },
]);

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default App;
