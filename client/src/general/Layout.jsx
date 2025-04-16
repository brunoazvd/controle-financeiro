import { ErrorBoundary } from "react-error-boundary";
import { ErrorFallback } from "../components/ErrorFallback.jsx";
import { Navbar } from "../components/Navbar.jsx";

export const Layout = ({ children }) => {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <div className="min-h-screen bg-slate-900">
          <Navbar />
          {children}
      </div>
    </ErrorBoundary>
  );
};
