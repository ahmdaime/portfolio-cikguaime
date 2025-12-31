import React, { Component, ReactNode } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import { TELEGRAM_LINK } from './constants';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-[400px] flex items-center justify-center p-8">
          <div className="bg-white/5 backdrop-blur-sm border border-red-500/30 rounded-2xl p-8 max-w-md text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-red-500/20 rounded-full mb-6">
              <AlertTriangle className="w-8 h-8 text-red-400" />
            </div>

            <h2 className="text-xl font-bold text-white mb-2">
              Ralat Berlaku
            </h2>

            <p className="text-gray-400 mb-6">
              Maaf, sesuatu yang tidak dijangka telah berlaku. Sila cuba muat semula halaman ini.
            </p>

            {this.state.error && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 mb-6 text-left">
                <p className="text-red-400 text-xs font-mono break-all">
                  {this.state.error.message}
                </p>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={this.handleRetry}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-accent-purple text-white rounded-lg font-medium hover:bg-accent-purple/80 transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
                Cuba Lagi
              </button>

              <a
                href={TELEGRAM_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white/10 text-white rounded-lg font-medium hover:bg-white/20 transition-colors"
              >
                Hubungi Support
              </a>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Smaller inline error fallback for specific sections
export const SectionErrorFallback = ({
  title = 'Ralat memuatkan bahagian ini',
  onRetry
}: {
  title?: string;
  onRetry?: () => void;
}) => (
  <div className="bg-white/5 backdrop-blur-sm border border-red-500/20 rounded-xl p-6 text-center">
    <div className="flex items-center justify-center gap-2 text-red-400 mb-3">
      <AlertTriangle className="w-5 h-5" />
      <span className="font-medium">{title}</span>
    </div>
    {onRetry && (
      <button
        onClick={onRetry}
        className="text-sm text-accent-purple hover:text-accent-pink transition-colors inline-flex items-center gap-1"
      >
        <RefreshCw className="w-3 h-3" />
        Cuba lagi
      </button>
    )}
  </div>
);

export default ErrorBoundary;
