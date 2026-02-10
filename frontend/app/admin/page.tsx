import AdminRoute from "../components/AdminRoute";

export default function AdminPage() {
  return (
    <AdminRoute>
      <div className="min-h-screen bg-[#0b1f1e] text-white p-8">
        <h1 className="text-3xl font-serif text-[#c6a75e]">
          Admin Dashboard
        </h1>
        <p className="mt-4 text-gray-300">
          Only admins can see this page.
        </p>
      </div>
    </AdminRoute>
  );
}
