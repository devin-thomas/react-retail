import { useEffect, useReducer } from "react";
import { loadStoredState, saveStoredState } from "../lib/storage";

export function usePersistentReducer(
  reducer,
  initialState,
  { storageKey, validate }
) {
  const [state, dispatch] = useReducer(
    reducer,
    initialState,
    (defaultState) => loadStoredState(storageKey, defaultState, validate)
  );

  useEffect(() => {
    saveStoredState(storageKey, state);
  }, [state, storageKey]);

  return [state, dispatch];
}
