export const initialAuthState = {
  isAuthenticated: false,
  profileName: "",
};

export function validateAuthState(value) {
  if (!value || typeof value !== "object") {
    return initialAuthState;
  }

  return {
    isAuthenticated: Boolean(value.isAuthenticated),
    profileName: typeof value.profileName === "string" ? value.profileName : "",
  };
}

export function authReducer(state, action) {
  switch (action.type) {
    case "auth/login":
      return {
        isAuthenticated: true,
        profileName: action.payload.name,
      };
    case "auth/logout":
      return initialAuthState;
    default:
      return state;
  }
}
