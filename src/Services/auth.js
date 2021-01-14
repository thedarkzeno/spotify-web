const TOKEN_KEY = "SPOTIFY";

export const getToken = () => localStorage.getItem(TOKEN_KEY + "_Token");
export const getTimestamp = () =>
  localStorage.getItem(TOKEN_KEY + "_Timestamp");

export const isAuthenticated = () => {
  try {
    if (!getToken()) {
      return false;
    } else {
      return true;
    }
  } catch (error) {
    console.log("error isAuthenticated");
    return false;
  }
};

export const login = (token, expire) => {
  localStorage.setItem(TOKEN_KEY + "_Token", token);
  localStorage.setItem(TOKEN_KEY + "_Timestamp", Date.now() + expire*1000);
};

export const logout = () => {
  localStorage.removeItem(TOKEN_KEY + "_Token");
};
