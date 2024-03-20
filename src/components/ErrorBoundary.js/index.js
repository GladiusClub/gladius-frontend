import Typography from "components/Typography";
import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught by ErrorBoundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex justify-center items-center h-full">
          <Typography variant="h2">
            Something went wrong!
          </Typography>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
