import React from 'react';

interface Props {
  children: React.ReactNode;
  fallback: React.ElementType;
}

interface State {
  hasError: boolean;
  info: Error | null;
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, info: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, info: error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    console.log('error', error, 'errorInfo', errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // 폴백 UI를 커스텀하여 렌더링할 수 있습니다.
      return <this.props.fallback error={this.state.info} />;
    }
    return this.props.children;
  }
}
