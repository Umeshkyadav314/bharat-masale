"use client";

import { useEffect, useState } from "react";

type Inquiry = {
  id: string;
  name: string;
  mobile: string;
  address: string;
  email: string;
  contactMethod: string;
  message: string | null;
  createdAt: string;
};

function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleString("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

export function InquiriesTable() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/admin/inquiries")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load");
        return res.json();
      })
      .then(setInquiries)
      .catch(() => setError("Could not load inquiries."))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center rounded-xl border border-border bg-card py-16">
        <p className="text-muted-foreground">Loading inquiries…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-6 text-destructive">
        {error}
      </div>
    );
  }

  if (inquiries.length === 0) {
    return (
      <div className="rounded-xl border border-border bg-card px-4 py-12 text-center text-muted-foreground">
        No inquiries yet.
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/50">
              <th className="px-4 py-3 font-semibold text-foreground">Time</th>
              <th className="px-4 py-3 font-semibold text-foreground">Name</th>
              <th className="px-4 py-3 font-semibold text-foreground">Mobile</th>
              <th className="px-4 py-3 font-semibold text-foreground">Email</th>
              <th className="px-4 py-3 font-semibold text-foreground">Address</th>
              <th className="px-4 py-3 font-semibold text-foreground">Contact by</th>
              <th className="px-4 py-3 font-semibold text-foreground">Message</th>
            </tr>
          </thead>
          <tbody>
            {inquiries.map((row) => (
              <tr
                key={row.id}
                className="border-b border-border/60 transition hover:bg-muted/30"
              >
                <td className="whitespace-nowrap px-4 py-3 text-muted-foreground">
                  {formatDate(row.createdAt)}
                </td>
                <td className="px-4 py-3 font-medium text-foreground">
                  {row.name}
                </td>
                <td className="whitespace-nowrap px-4 py-3">
                  <a
                    href={`tel:${row.mobile}`}
                    className="text-primary hover:underline"
                  >
                    {row.mobile}
                  </a>
                </td>
                <td className="whitespace-nowrap px-4 py-3">
                  <a
                    href={`mailto:${row.email}`}
                    className="text-primary hover:underline"
                  >
                    {row.email}
                  </a>
                </td>
                <td className="max-w-[200px] truncate px-4 py-3 text-muted-foreground">
                  {row.address}
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${
                      row.contactMethod === "CALLBACK"
                        ? "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-200"
                        : "bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-200"
                    }`}
                  >
                    {row.contactMethod === "CALLBACK" ? "Callback" : "Email"}
                  </span>
                </td>
                <td className="max-w-[180px] truncate px-4 py-3 text-muted-foreground">
                  {row.message || "—"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
