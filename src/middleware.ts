import { defineMiddleware } from 'astro:middleware';

// Simple middleware - no server-side auth checks
// Auth is handled client-side since session is in localStorage (implicit flow)
export const onRequest = defineMiddleware(async (context, next) => {
  return next();
});
