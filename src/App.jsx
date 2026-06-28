import { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import AgentRoute from "./components/auth/AgentRoute";
import AuthRedirectNotice from "./components/auth/AuthRedirectNotice";
import ErrorBoundaryRoute from "./components/common/ErrorBoundaryRoute";
import PageLoader from "./components/common/PageLoader";
import Layout from "./Layout";

const Home = lazy(() => import("./pages/Home"));
const Listing = lazy(() => import("./pages/Listing"));
const PropertyDetail = lazy(() => import("./pages/PropertyDetail"));
const BookInspection = lazy(() => import("./pages/BookInspection"));
const Saved = lazy(() => import("./pages/Saved"));
const SignIn = lazy(() => import("./pages/SignIn"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Privacy = lazy(() => import("./pages/Privacy"));
const Terms = lazy(() => import("./pages/Terms"));
const Verification = lazy(() => import("./pages/Verification"));
const NotFound = lazy(() => import("./pages/NotFound"));

function App() {
  return (
    <ErrorBoundaryRoute>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/properties" element={<Listing />} />
            <Route path="/propertyDetail/:id" element={<PropertyDetail />} />
            <Route path="/book-inspection/:propertyId" element={<BookInspection />} />
            <Route path="/saved" element={<Saved />} />
            <Route path="/sign-in" element={<SignIn />} />
            <Route
              path="/dashboard/*"
              element={
                <AgentRoute>
                  <Dashboard />
                </AgentRoute>
              }
            />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/verification" element={<Verification />} />
            <Route path="*" element={<NotFound />} />
          </Route>
          <Route
            path="/bookInspection"
            element={
              <Navigate
                to="/book-inspection/lekki-phase-1-residential-plot"
                replace
              />
            }
          />
        </Routes>
      </Suspense>
    </ErrorBoundaryRoute>
  );
}

export default App;
