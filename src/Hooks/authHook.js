import { useCookies } from './cookiesHook';

export const useAuthHook = () => {
  const { removeTokenCookie, getTokenCookie } = useCookies();

  // 24 hours in milliseconds
  const SESSION_TIMEOUT = 24 * 60 * 60 * 1000;
  let logoutTimer;

  const setSession = () => {
    const loggedInTime = Date.now();
    sessionStorage.setItem('loggedInTime', loggedInTime);

    // Set a timer to automatically log out the user after SESSION_TIMEOUT
    logoutTimer = setTimeout(() => {
      logoutUser();
    }, SESSION_TIMEOUT);
  };

  const clearSession = () => {
    sessionStorage.removeItem('loggedInTime');
    clearTimeout(logoutTimer);
  };

  const getSessionTime = () => {
    return sessionStorage.getItem('loggedInTime');
  };

  const logoutUser = () => {
    // Perform logout logic
    clearSession();
    localStorage.removeItem('persist:BookDoctor');

    const userToken = getTokenCookie('userToken');
    if (userToken) {
      removeTokenCookie('userToken');
    }

    window.location.reload();
  };

  return {
    logoutUser,
    setSession,
    clearSession,
    getSessionTime,
    SESSION_TIMEOUT,
  };
};
