/* eslint-disable react-refresh/only-export-components */

import { createContext } from "react";
import { usePersistentReducer } from "../hooks/usePersistentReducer";
import { STORAGE_KEYS } from "../lib/constants";
import {
  authReducer,
  initialAuthState,
  validateAuthState,
} from "../reducers/authReducer";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [state, dispatch] = usePersistentReducer(authReducer, initialAuthState, {
    storageKey: STORAGE_KEYS.auth,
    validate: validateAuthState,
  });

  function login(name) {
    dispatch({
      type: "auth/login",
      payload: { name: name.trim() || "Retail guest" },
    });
  }

  function logout() {
    dispatch({ type: "auth/logout" });
  }

  const value = {
    isAuthenticated: state.isAuthenticated,
    profileName: state.profileName,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
