import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: { signIn: "/login" },
});

export const config = {
  // Keep main website public. Only protect admin routes.
  matcher: ["/admin", "/admin/:path*"],
};
