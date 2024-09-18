export const getToken = (): string | null => {
  return localStorage.getItem('@LordOfTheRings:authToken');
};

export const logout = () => {
  localStorage.removeItem('@LordOfTheRings:authToken');
  window.location.href = '/login';
};