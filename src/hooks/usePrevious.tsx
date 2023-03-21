import { useEffect, useRef } from 'react';
import { Block } from '@/components/editable-page';

export const usePrevious = (value: Block[]) => {
  const ref = useRef<null | Block[]>(null);
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};
