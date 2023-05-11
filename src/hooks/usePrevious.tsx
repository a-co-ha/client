import { useEffect, useRef } from 'react';

export const usePreviousState = (value: any) => {
  const previousRef = useRef();

  useEffect(() => {
    previousRef.current = value;
  }, [value]);

  return previousRef.current;
};
