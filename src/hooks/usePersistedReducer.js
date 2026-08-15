"use client";

import { useEffect, useReducer, useRef } from "react";
import { readLocalStorage, writeLocalStorage } from "@/lib/storage";

const HYDRATE = "__HYDRATE__";

function withHydrate(reducer) {
  return (state, action) =>
    action.type === HYDRATE ? action.payload : reducer(state, action);
}

/**
 * useReducer whose state is transparently hydrated from (and persisted to)
 * localStorage. `state` is exactly what gets stored — no wrapper shape.
 * `transformHydrated` can sanitize/migrate whatever was read from storage
 * before it becomes the new state (e.g. dropping stale ids).
 */
export function usePersistedReducer(
  key,
  reducer,
  initialState,
  transformHydrated = (value) => value
) {
  const [state, dispatch] = useReducer(withHydrate(reducer), initialState);
  const isFirstPersist = useRef(true);

  useEffect(() => {
    const stored = readLocalStorage(key, null);
    if (stored !== null) {
      dispatch({ type: HYDRATE, payload: transformHydrated(stored) });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // Skip the run that fires alongside the hydrate effect above — at that
    // point `state` is still the pre-hydration initialState, and writing it
    // would clobber real data with an empty value before hydration's
    // dispatch has had a chance to land.
    if (isFirstPersist.current) {
      isFirstPersist.current = false;
      return;
    }
    writeLocalStorage(key, state);
  }, [key, state]);

  return [state, dispatch];
}
