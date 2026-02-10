import ProtectedRoute from "../components/ProtectedRoute";

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-[#0b1f1e] text-white p-8">
        <h1 className="text-3xl font-serif text-[#c6a75e]">
          Dashboard
        </h1>
        <p className="mt-4 text-gray-300">
          This page is protected.
        </p>
      </div>
    </ProtectedRoute>
  );
}
