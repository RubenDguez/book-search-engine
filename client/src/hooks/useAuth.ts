import { jwtDecode } from 'jwt-decode';
import { useCallback } from 'react';

interface UserToken {
    name: string;
    exp: number;
  }

export default function useAuth() {
  const getProfile = useCallback(() => {
    return jwtDecode(getToken() ?? '');
  }, []);

  const loggedIn = useCallback(() => {
    const token = getToken();
    return !!token && !isTokenExpired(token);
  }, []);

  const isTokenExpired = useCallback((token: string) => {
    try {
      const decoded = jwtDecode<UserToken>(token);
      if (decoded.exp < Date.now() / 1000) {
        return true;
      }

      return false;
    } catch (err) {
      return false;
    }
  }, []);

  const getToken = useCallback(() => {
    return localStorage.getItem('id_token');
  }, []);

  const login = useCallback((idToken: string) => {
    localStorage.setItem('id_token', idToken);
    window.location.assign('/');
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('id_token');
    window.location.assign('/');
  }, []);


  return { getProfile, loggedIn, isTokenExpired, getToken, login, logout }
}
