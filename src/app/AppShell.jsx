import { Outlet } from "react-router-dom";
import { AppHeader } from "../components/common/AppHeader";

export function AppShell() {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(242,197,133,0.35),_transparent_25%),linear-gradient(180deg,_#fffdf8_0%,_#f6efe4_55%,_#efe3cf_100%)] text-slate-900">
      <AppHeader />
      <main className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 pb-12 pt-6 sm:px-6 lg:px-8">
        <Outlet />
      </main>
    </div>
  );
}
