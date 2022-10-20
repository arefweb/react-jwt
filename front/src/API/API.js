
// export const URL = "https://jwt-login-logout.herokuapp.com";
export const URL =
  process.env.NODE_ENV === "production"
    ? "https://jwt-login-logout.herokuapp.com"
    : "http://localhost:4000";