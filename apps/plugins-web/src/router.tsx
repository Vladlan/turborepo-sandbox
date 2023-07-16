import App from "./App";
import ErrorPage from "./pages/error-page";
import { createBrowserRouter } from "react-router-dom";
import TabPage from "./pages/tab-page";
import { Suspense } from "react";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "tab/:tabName",
        element: (
          <Suspense fallback={<h2>Loading...</h2>}>
            <TabPage />
          </Suspense>
        ),
      },
    ],
  },
]);

export default router;
