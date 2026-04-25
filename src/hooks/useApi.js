import { useEffect, useMemo, useRef, useState } from 'react';
import tmdb from '../services/tmdb';

/**
 * Generic data-fetching hook using the shared Axios tmdb instance.
 * StrictMode-safe and cancellation-aware: in-flight requests are aborted
 * when dependencies change or the component unmounts.
 */
export default function useApi(path, params = {}, deps = []) {
  const abortRef = useRef(null);
  const paramsKey = JSON.stringify(params);
  const depsKey = JSON.stringify(deps);
  const requestKey = useMemo(
    () => (path ? `${path}|${paramsKey}|${depsKey}` : ''),
    [path, paramsKey, depsKey]
  );
  const [state, setState] = useState(() => ({
    key: requestKey,
    data: null,
    loading: !!path,
    error: null,
  }));

  useEffect(() => {
    if (!requestKey || !path) return undefined;

    if (abortRef.current) {
      abortRef.current.abort();
    }

    const controller = new AbortController();
    abortRef.current = controller;

    async function fetchData() {
      try {
        const response = await tmdb.get(path, {
          params: JSON.parse(paramsKey),
          signal: controller.signal,
        });

        if (!controller.signal.aborted) {
          setState({
            key: requestKey,
            data: response.data,
            loading: false,
            error: null,
          });
        }
      } catch (error) {
        if (error?.code === 'ERR_CANCELED' || error?.name === 'CanceledError') return;

        if (!controller.signal.aborted) {
          setState({
            key: requestKey,
            data: null,
            loading: false,
            error: error?.response?.data?.status_message || error.message || 'Request failed',
          });
        }
      }
    }

    fetchData();

    return () => {
      controller.abort();
    };
  }, [requestKey, path, paramsKey]);

  if (!path) {
    return { data: null, loading: false, error: null };
  }

  const isCurrentRequest = state.key === requestKey;

  return {
    data: isCurrentRequest ? state.data : null,
    loading: isCurrentRequest ? state.loading : true,
    error: isCurrentRequest ? state.error : null,
  };
}
