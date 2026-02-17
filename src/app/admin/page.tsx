import { InquiriesTable } from "./inquiries-table";

export default async function AdminDashboardPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-foreground">
          Customer inquiries
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Newest first. Reach out via call or email as per their preference.
        </p>
      </div>
      <InquiriesTable />
    </div>
  );
}
