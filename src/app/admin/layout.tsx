import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Link from "next/link";

function isAdmin(email: string | null | undefined): boolean {
  if (!email) return false;
  const list = process.env.ADMIN_EMAILS ?? "";
  return list.split(",").map((e) => e.trim().toLowerCase()).includes(email.toLowerCase());
}

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email || !isAdmin(session.user.email)) {
    redirect("/home");
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <header className="sticky top-0 z-10 border-b border-border bg-background/95 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6">
          <Link
            href="/admin"
            className="font-semibold text-foreground"
          >
            Admin · Inquiries
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">
              {session.user.email}
            </span>
            <Link
              href="/home"
              className="text-sm font-medium text-primary hover:underline"
            >
              Back to site
            </Link>
          </div>
        </div>
      </header>
      {children}
    </div>
  );
}
