"use client";

import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

interface DashboardData {
  totalUsers: number;
  totalBookings: number;
  activeRooms: number;

  grossRevenue: number;
  profit: number;

  monthlyRevenue: {
    _id: { month: number };
    revenue: number;
  }[];
}

// ✅ Production Base URL
const BASE_URL = process.env.NEXT_PUBLIC_API_URL!;

export default function AdminDashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  const monthNames = [
    "Jan","Feb","Mar","Apr","May","Jun",
    "Jul","Aug","Sep","Oct","Nov","Dec"
  ];

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await fetch(
          `${BASE_URL}/api/reports/admin/dashboard`,
          { credentials: "include" }
        );

        if (!res.ok) {
          throw new Error("Failed to fetch dashboard");
        }

        const result = await res.json();
        setData(result);
      } catch (error) {
        console.error("Dashboard fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  if (loading)
    return (
      <div className="p-10 text-gray-400">
        Loading dashboard...
      </div>
    );

  if (!data) return null;

  const chartData = data.monthlyRevenue.map((item) => ({
    month: monthNames[item._id.month - 1],
    revenue: item.revenue,
  }));

  return (
    <div className="min-h-screen bg-[#0b1f1e] text-white p-10">

      <h1 className="text-4xl font-serif text-[#c6a75e] mb-10">
        Admin Dashboard
      </h1>

      {/* KPI CARDS */}
      <div className="grid md:grid-cols-4 gap-6 mb-12">

        <DashboardCard
          title="Total Users"
          value={data.totalUsers}
        />

        <DashboardCard
          title="Total Bookings"
          value={data.totalBookings}
        />

        <DashboardCard
          title="Active Rooms"
          value={data.activeRooms}
        />

        <DashboardCard
          title="Gross Revenue"
          value={`₹ ${data.grossRevenue}`}
          highlight
        />

      </div>

      {/* PROFIT + CHART */}
      <div className="grid md:grid-cols-2 gap-8 mb-12">

        <DashboardCard
          title="Net Profit"
          value={`₹ ${data.profit}`}
          highlight
        />

        <div className="bg-black/40 border border-[#c6a75e]/20 p-6 rounded-2xl">
          <h2 className="text-xl font-serif text-[#c6a75e] mb-4">
            Monthly Revenue
          </h2>

          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={chartData}>
              <CartesianGrid stroke="#333" />
              <XAxis dataKey="month" stroke="#ccc" />
              <YAxis stroke="#ccc" />
              <Tooltip />
              <Bar
                dataKey="revenue"
                fill="#c6a75e"
                radius={[6, 6, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

      </div>

    </div>
  );
}

/* ================= CARD COMPONENT ================= */

function DashboardCard({
  title,
  value,
  highlight = false,
}: {
  title: string;
  value: any;
  highlight?: boolean;
}) {
  return (
    <div
      className={`p-6 rounded-2xl border ${
        highlight
          ? "bg-[#c6a75e]/10 border-[#c6a75e]"
          : "bg-black/40 border-[#c6a75e]/20"
      }`}
    >
      <p className="text-gray-400 text-sm mb-2">
        {title}
      </p>
      <h3 className="text-2xl font-bold">
        {value}
      </h3>
    </div>
  );
}
