import { useEffect } from 'react';

const DEFAULT_TITLE = 'Streamora';

export default function useDocumentTitle(title) {
  useEffect(() => {
    if (!title) return undefined;

    const previousTitle = document.title;
    document.title = title;

    return () => {
      document.title = previousTitle || DEFAULT_TITLE;
    };
  }, [title]);
}
