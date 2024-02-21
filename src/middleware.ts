import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
    publicRoutes:['/',"/api/webhooks/clerk"],
    ignoredRoutes: ["/((?!api|trpc))(_next.*|.+\.[\w]+$)", "/api/upload", "/api/webhooks/clerk"]
    
});
 
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};