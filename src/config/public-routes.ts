export const publicRoutes = ["/login", "/auth/callback"];

/**
 * Check if a given path is public (accessible without authentication)
 */
export function isPublicRoute(path: string): boolean {
  return publicRoutes.includes(path);
}