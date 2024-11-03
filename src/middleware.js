import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { auth } from "@clerk/nextjs/server";
import axios from "axios";
import { serialize } from "cookie";

const isProtectedRoute = createRouteMatcher([
  "/dashboard(.*)",
  "/chat",
  "/meet(.*)",
  "/dashboard/admin(.*)",
]);

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) auth().protect();
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
