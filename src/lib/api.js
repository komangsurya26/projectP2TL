export const apiFetch = async (url, options = {}) => {
  return fetch(url, {
    ...options,
    credentials: "include",
    headers: {
      Accept: "application/json",
      ...options.headers,
    },
  });
};
