import { Link } from "react-router-dom";
import { StatePanel } from "../components/common/StatePanel";

export function NotFoundPage() {
  return (
    <div className="space-y-4">
      <StatePanel>That route does not exist.</StatePanel>
      <div className="flex justify-center">
        <Link
          className="rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
          to="/"
        >
          Back to catalog
        </Link>
      </div>
    </div>
  );
}
