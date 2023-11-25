import { useEffect, useState } from "react";

export default function useDebounce<Type>(state: Type, delay: number) {
  const [debouncedState, setDebouncedState] = useState(state);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedState(state);
    }, delay);
    return () => clearTimeout(timer);
  }, [delay, state]);

  return debouncedState;
}
