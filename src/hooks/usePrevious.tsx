import { useEffect, useRef } from 'react';
import { block } from '@/components/EditablePage/types';

export const usePrevious = (value: block[]) => {
  const ref = useRef<null | block[]>(null);
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};
