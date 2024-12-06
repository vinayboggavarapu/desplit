import type { NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";
import { authPages, protectedRoutes, publicRoutes } from "./lib/contants";

export default {
  providers: [
    Google({
      allowDangerousEmailAccountLinking: true,
    }),
  ],
  pages: {
    signIn: "/sign-in",
  },
  callbacks: {
    authorized: ({ request: { nextUrl }, auth }) => {
      const isLoggedIn = Boolean(auth?.user);
      const isAuthPage = authPages.includes(nextUrl.pathname);
      const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
      const protectedRoute = protectedRoutes.includes(nextUrl.pathname);

      if (isPublicRoute && !isLoggedIn) {
        // console.log("public route");
        return true;
      }
      if (!isLoggedIn && protectedRoute) {
        return Response.redirect(new URL("/sign-in", nextUrl));
      }
      if (isLoggedIn) {
        if (isAuthPage) {
          return Response.redirect(new URL("/groups", nextUrl));
        }
      }
      return true;
    },
  },
} satisfies NextAuthConfig;
