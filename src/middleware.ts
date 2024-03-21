import { authMiddleware } from "@clerk/nextjs";
import createMiddleware from "next-intl/middleware";


export default authMiddleware({
 

  publicRoutes: ["/", "/en"],
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};