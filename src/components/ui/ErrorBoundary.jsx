import { Component } from 'react';
import { FilmIcon } from './Icons';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  handleGoHome = () => {
    this.handleReset();
    window.location.assign('/');
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary-shell">
          <div className="container">
            <div className="error-boundary-card">
              <div className="error-boundary-badge">
                <FilmIcon />
                Streamora Recovery
              </div>
              <div className="error-boundary-icon">!</div>
              <h1 className="error-boundary-title">Something went wrong</h1>
              <p className="error-boundary-sub">
                {this.state.error?.message || 'An unexpected error interrupted this page.'}
              </p>
              <div className="error-boundary-actions">
                <button className="btn-secondary" onClick={this.handleReset}>
                  Try Again
                </button>
                <button className="btn-primary" onClick={this.handleGoHome}>
                  Return Home
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
