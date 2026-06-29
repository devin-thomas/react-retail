import { BrowserRouter, HashRouter } from "react-router-dom";
import { AppProviders } from "./app/AppProviders";
import { AppRouter } from "./app/AppRouter";
import { IS_GITHUB_PAGES } from "./lib/constants";
import { HostedLandingPage } from "./pages/HostedLandingPage";

export default function App() {
  const RouterComponent = IS_GITHUB_PAGES ? HashRouter : BrowserRouter;

  return (
    <AppProviders>
      <RouterComponent>
        {IS_GITHUB_PAGES ? <HostedLandingPage /> : <AppRouter />}
      </RouterComponent>
    </AppProviders>
  );
}
