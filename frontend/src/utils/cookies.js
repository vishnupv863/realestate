// utils/cookies.js

/**
 * Retrieves a cookie by name from the browser's document.cookie.
 * Assumes CSRF cookie is named 'csrftoken' (Django default).
 * Works only if CSRF_COOKIE_HTTPONLY = False in Django settings.
 */
export function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    return decodeURIComponent(parts.pop().split(";").shift());
  }
  return null;
}
