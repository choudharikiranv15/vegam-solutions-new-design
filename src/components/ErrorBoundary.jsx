import React from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ errorInfo });
    // Log error to console in development
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
  };

  handleGoHome = () => {
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      // Custom fallback UI
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen flex items-center justify-center bg-brand-50 dark:bg-dark-bg p-4">
          <div className="max-w-md w-full bg-white dark:bg-dark-card rounded-3xl shadow-soft p-8 text-center border border-brand-100 dark:border-brand-900/50">
            <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
              <AlertTriangle className="w-8 h-8 text-red-600 dark:text-red-400" />
            </div>

            <h1 className="text-2xl font-bold text-brand-900 dark:text-white mb-2">
              Something went wrong
            </h1>

            <p className="text-brand-500 dark:text-brand-400 mb-6">
              We encountered an unexpected error. Please try again or return to the homepage.
            </p>

            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="mb-6 text-left">
                <summary className="cursor-pointer text-sm text-brand-600 dark:text-brand-300 hover:underline">
                  View error details
                </summary>
                <pre className="mt-2 p-3 bg-brand-50 dark:bg-brand-900/30 rounded-lg text-xs text-red-600 dark:text-red-400 overflow-auto max-h-40">
                  {this.state.error.toString()}
                  {this.state.errorInfo?.componentStack}
                </pre>
              </details>
            )}

            <div className="flex gap-3 justify-center">
              <button
                onClick={this.handleRetry}
                className="flex items-center gap-2 px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white rounded-xl font-medium transition-colors"
              >
                <RefreshCw size={18} />
                Try Again
              </button>

              <button
                onClick={this.handleGoHome}
                className="flex items-center gap-2 px-4 py-2 bg-brand-100 dark:bg-brand-800 hover:bg-brand-200 dark:hover:bg-brand-700 text-brand-700 dark:text-brand-200 rounded-xl font-medium transition-colors"
              >
                <Home size={18} />
                Go Home
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
