export const setSessionState = (key, value) => {
  sessionStorage.setItem(key, JSON.stringify(value));
};

export const getSessionState = (key) => {
  const storedValue = sessionStorage.getItem(key);
  if (storedValue === null && (key === 'isLoggedIn' || key === 'isRegistering')) {
    return false;
  }
  return storedValue ? JSON.parse(storedValue) : null;
};

export const clearSessionState = () => {
  sessionStorage.clear();
};