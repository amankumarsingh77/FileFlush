import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
    publicRoutes:['/'],
    ignoredRoutes: ["/((?!api|trpc))(_next.*|.+\.[\w]+$)", "/api/upload"]
    
});
 
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};