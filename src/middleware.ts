import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
    publicRoutes:['/',"/api/webhooks/clerk","/api/auth/dropbox","/api/auth/dropbox/callback","api/auth/dropbox"],
    ignoredRoutes: ["/((?!api|trpc))(_next.*|.+\.[\w]+$)", "/api/upload", "/api/webhooks/clerk","/api/auth/callback/google", "/api/auth/signin"],
    debug: true 
});
 
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};