import { useState, useRef, useEffect } from 'react';

export function usePreviousState<T>(value: T): T | undefined {
  const ref = useRef<T>();
  const [previousState, setPreviousState] = useState<T>();

  useEffect(() => {
    ref.current = value;
    setPreviousState(ref.current);
  }, [value]);

  return previousState;
}
