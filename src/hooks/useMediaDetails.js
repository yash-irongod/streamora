import { useEffect, useRef, useState } from 'react';
import { getMediaDetails } from '../services/tmdb';

/**
 * Fetches full media details (credits, similar, recommendations, watch providers)
 * using the tmdb Axios service layer.
 */
export default function useMediaDetails(type, id) {
  const abortRef = useRef(null);
  const requestKey = type && id ? `${type}:${id}` : '';
  const [state, setState] = useState(() => ({
    key: requestKey,
    data: null,
    providers: [],
    loading: !!requestKey,
    error: null,
  }));

  useEffect(() => {
    if (!requestKey || !type || !id) return undefined;

    if (abortRef.current) {
      abortRef.current.abort();
    }

    const controller = new AbortController();
    abortRef.current = controller;

    getMediaDetails(type, id, { signal: controller.signal })
      .then((details) => {
        if (controller.signal.aborted) return;

        const watchProviders = details?.['watch/providers']?.results?.US?.flatrate || [];

        setState({
          key: requestKey,
          data: details,
          providers: watchProviders,
          loading: false,
          error: null,
        });
      })
      .catch((error) => {
        if (controller.signal.aborted || error?.code === 'ERR_CANCELED') return;

        setState({
          key: requestKey,
          data: null,
          providers: [],
          loading: false,
          error: error?.response?.data?.status_message || error.message || 'Failed to load',
        });
      });

    return () => {
      controller.abort();
    };
  }, [requestKey, type, id]);

  if (!requestKey) {
    return { data: null, providers: [], loading: false, error: null };
  }

  const isCurrentRequest = state.key === requestKey;

  return {
    data: isCurrentRequest ? state.data : null,
    providers: isCurrentRequest ? state.providers : [],
    loading: isCurrentRequest ? state.loading : true,
    error: isCurrentRequest ? state.error : null,
  };
}
