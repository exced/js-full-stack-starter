/**
 *
 * @flow
 */

const TOKEN_KEY = "my_token__";

export const setToken = (token: string) => {
  localStorage.setItem(TOKEN_KEY, token);
};

export const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

export const clear = () => {
  localStorage.clear();
};
