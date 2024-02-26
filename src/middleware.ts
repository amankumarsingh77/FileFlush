import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
    publicRoutes:['/',"/api/webhooks/clerk","/api"],
    ignoredRoutes: ["/((?!api|trpc))(_next.*|.+\.[\w]+$)", "/api/upload", "/api/webhooks/clerk","/api/auth/callback/google", "/api/auth/signin", "/api/auth/dropbox/callback","/api/auth/dropbox"]
    
});
 
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};