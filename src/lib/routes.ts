/**
 * Routes logic
 * authenticated: accessible only for auth users
 * unauthenticated: accessible only for disconnected users
 */
const routes: {
  authenticated: string[];
  unauthenticated: string[];
} = {
  authenticated: ["/home"],
  unauthenticated: ["/login"],
};

export default routes;
