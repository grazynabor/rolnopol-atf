/**
 * Central route registry for page objects and URL assertions.
 */
export const PAGE_URLS = {
  docs: "/docs.html",
  home: "/",
  login: "/login.html",
  registration: "/register.html",
  swagger: "/swagger.html",
} as const;

export type PageUrl = (typeof PAGE_URLS)[keyof typeof PAGE_URLS];