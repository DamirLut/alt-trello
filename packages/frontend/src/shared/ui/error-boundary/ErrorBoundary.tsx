import { Component } from 'preact';
import type { FC, ReactNode } from 'preact/compat';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback: FC<{ error: unknown }>;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps> {
  override state = {
    hasError: false,
    error: null as unknown,
  };

  static getDerivedStateFromError(error: unknown): {
    hasError: boolean;
    error: unknown;
  } {
    console.error(error);
    return { hasError: true, error };
  }

  override componentDidCatch(error: Error, errorInfo: unknown): void {
    console.error(error, errorInfo);
  }

  override render(): ReactNode {
    if (this.state.hasError && this.props.fallback) {
      const Fallback = this.props.fallback;
      return <Fallback error={this.state.error} />;
    }

    return this.props.children;
  }
}
