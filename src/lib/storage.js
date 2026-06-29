export function loadStoredState(storageKey, fallbackState, validate) {
  if (typeof window === "undefined") {
    return fallbackState;
  }

  const rawValue = window.localStorage.getItem(storageKey);
  if (!rawValue) {
    return fallbackState;
  }

  try {
    const parsedValue = JSON.parse(rawValue);
    const normalizedValue = validate(parsedValue);
    return normalizedValue ?? fallbackState;
  } catch {
    window.localStorage.removeItem(storageKey);
    return fallbackState;
  }
}

export function saveStoredState(storageKey, value) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(storageKey, JSON.stringify(value));
}
