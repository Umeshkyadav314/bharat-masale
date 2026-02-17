import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: { signIn: "/login" },
});

export const config = {
  matcher: ["/home", "/home/:path*", "/admin", "/admin/:path*"],
};
