import React from 'react';

interface Props {
  children: React.ReactNode;
  fallback: React.ElementType;
  onReset: () => void;
}

interface State {
  hasError: boolean;
  info: Error | null;
}

const initialState: State = {
  hasError: false,
  info: null,
};

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = initialState;
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, info: error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    console.log('error', error, 'errorInfo', errorInfo);
  }

  onResetErrorBoundary = () => {
    const { onReset } = this.props;
    onReset == null ? void 0 : this.props.onReset();
    this.reset();
  };

  reset() {
    this.setState(initialState);
  }

  render() {
    if (this.state.hasError) {
      // 폴백 UI를 커스텀하여 렌더링할 수 있습니다.
      return (
        <this.props.fallback
          onError={this.state.info}
          onReset={this.onResetErrorBoundary}
        />
      );
    }
    return this.props.children;
  }
}
