import { Component } from "react";
import PageStatus, { PageStatusButton, PageStatusLink } from "./PageStatus";

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.resetKey !== this.props.resetKey && this.state.hasError) {
      this.setState({ hasError: false });
    }
  }

  componentDidCatch(error, info) {
    console.error("Application error:", error, info);
  }

  handleTryAgain = () => {
    this.setState({ hasError: false });
  };

  render() {
    if (this.state.hasError) {
      return (
        <PageStatus
          className="flex min-h-[50vh] flex-col items-center justify-center gap-4 px-4 text-center"
          role="alert"
        >
          <h1 className="font-serif text-2xl text-slate-900">Something went wrong</h1>
          <p className="max-w-md text-sm text-slate-500">
            An unexpected error occurred. You can try again or return home.
          </p>
          <div className="flex gap-3">
            <PageStatusButton onClick={this.handleTryAgain}>Try again</PageStatusButton>
            <PageStatusLink to="/" className="btn-ghost">
              Go home
            </PageStatusLink>
          </div>
        </PageStatus>
      );
    }

    return this.props.children;
  }
}
