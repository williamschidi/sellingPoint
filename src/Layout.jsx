import { Outlet, useLocation } from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import SkipLink from "./components/SkipLink";

function Layout() {
  const { pathname } = useLocation();
  const isAgentDashboard = pathname.startsWith("/dashboard");

  return (
    <div className="min-h-screen w-full overflow-x-hidden">
      <SkipLink />
      {!isAgentDashboard && <Navbar />}
      <main id="main-content">
        <Outlet />
      </main>
      {!isAgentDashboard && <Footer />}
    </div>
  );
}

export default Layout;
