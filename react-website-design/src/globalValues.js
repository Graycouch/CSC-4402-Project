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

setSessionState('partyIDs', {
  1: "Republican",
  2: "Democrat",
  3: "Libertarian",
  4: "Green",
  5: "Forward",
  9: "Independent",
  99: "Illuminati"
})