import { useState } from "react";
import { Icon } from "@iconify/react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import PageShell from "../components/common/PageShell";
import { useAuth } from "../context/AuthContext";
import { usePageMeta } from "../hooks/usePageMeta";

export default function SignIn() {
  usePageMeta({
    title: "Sign in",
    description:
      "Sign in to SellingPoint to sync saved properties, manage inspection requests, and access the agent dashboard.",
    path: "/sign-in",
  });

  const navigate = useNavigate();
  const location = useLocation();
  const { signIn, signUp, authAvailable } = useAuth();
  const [mode, setMode] = useState("sign-in");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const redirectTo = location.state?.from ?? "/";

  async function handleSubmit(event) {
    event.preventDefault();

    if (!authAvailable) {
      return;
    }

    setError("");
    setIsSubmitting(true);

    try {
      const result =
        mode === "sign-in"
          ? await signIn({ email, password })
          : await signUp({ email, password, name });

      if (result.ok && result.user) {
        navigate(redirectTo, { replace: true });
        return;
      }

      if (result.code === "not_connected") {
        return;
      }

      setError(
        "We couldn't sign you in with those details. Please check your email and password."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <PageShell variant="full" className="flex min-h-[75vh] items-center justify-center px-6 py-16">
      <div className="w-full max-w-md animate-fade-in-up">
        <div className="mb-10 text-center">
          <div className="bg-primary mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl shadow-md">
            <Icon icon="mdi:home-outline" className="text-2xl text-white" aria-hidden />
          </div>
          <h1 className="font-serif text-3xl tracking-tight text-slate-900">
            {mode === "sign-in" ? "Welcome back" : "Create your account"}
          </h1>
          <p className="mt-3 text-sm leading-7 text-slate-500">
            Sync saved properties and track inspections across your devices.
          </p>
        </div>

        <div className="surface-panel-elevated p-8 lg:p-10">
          {!authAvailable && (
            <div
              className="mb-6 flex items-start gap-3 rounded-xl border border-primary/10 bg-primary-subtle px-4 py-3.5 text-sm leading-6 text-primary"
              role="status"
            >
              <Icon icon="lucide:clock" className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
              <p>
                Account sign-in is launching soon. You can browse listings, save
                properties on this device, and book inspections without an account.
              </p>
            </div>
          )}

          <div className="mb-6 flex rounded-xl bg-slate-100/80 p-1">
            {["sign-in", "sign-up"].map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => {
                  setMode(tab);
                  setError("");
                }}
                className={`flex-1 rounded-lg py-2.5 text-sm font-semibold transition-all duration-200 ${
                  mode === tab
                    ? "bg-white text-slate-900 shadow-sm"
                    : "text-slate-500 hover:text-slate-700"
                }`}
              >
                {tab === "sign-in" ? "Sign in" : "Sign up"}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === "sign-up" && (
              <label className="block">
                <span className="form-label">Full name</span>
                <input
                  type="text"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  required={authAvailable}
                  disabled={!authAvailable}
                  className="form-input"
                />
              </label>
            )}

            <label className="block">
              <span className="form-label">Email</span>
              <input
                type="email"
                autoComplete="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required={authAvailable}
                disabled={!authAvailable}
                className="form-input"
              />
            </label>

            <label className="block">
              <span className="form-label">Password</span>
              <input
                type="password"
                autoComplete={mode === "sign-in" ? "current-password" : "new-password"}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required={authAvailable}
                disabled={!authAvailable}
                minLength={8}
                className="form-input"
              />
            </label>

            {error && (
              <p
                className="flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800"
                role="alert"
              >
                <Icon icon="lucide:alert-circle" className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
                {error}
              </p>
            )}

            {authAvailable ? (
              <button type="submit" disabled={isSubmitting} className="btn-primary w-full">
                {isSubmitting
                  ? "Please wait..."
                  : mode === "sign-in"
                    ? "Sign in"
                    : "Create account"}
              </button>
            ) : (
              <button type="button" disabled className="btn-primary w-full cursor-not-allowed opacity-60">
                {mode === "sign-in" ? "Sign in" : "Create account"} — coming soon
              </button>
            )}
          </form>

          <div className="mt-8 space-y-3 border-t border-slate-100 pt-8">
            <Link
              to="/properties"
              className={authAvailable ? "btn-ghost w-full" : "btn-primary w-full"}
            >
              Continue as guest
            </Link>
            <Link
              to="/saved"
              className="block text-center text-sm font-medium text-primary transition hover:underline"
            >
              View saved properties
            </Link>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
