import { useCallback } from "react";

export function useCopyCodeToClipboard() {
  const handleCopy = useCallback((code: string) => {}, []);

  return handleCopy;
}
