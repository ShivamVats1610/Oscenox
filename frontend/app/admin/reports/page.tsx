"use client";

import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

interface DashboardData {
  totalUsers: number;
  totalBookings: number;
  activeRooms: number;

  grossRevenue: number;
  taxCollected: number;
  platformFee: number;
  netRevenue: number;
  profit: number;
  refundLoss: number;

  bookingStatus: {
    _id: string;
    count: number;
  }[];

  monthlyRevenue: {
    _id: { month: number };
    revenue: number;
  }[];
}

export default function AdminReportsPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  const monthNames = [
    "Jan","Feb","Mar","Apr","May","Jun",
    "Jul","Aug","Sep","Oct","Nov","Dec"
  ];

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        "http://localhost:5000/api/reports/admin/dashboard",
        { credentials: "include" }
      );

      const result = await res.json();
      setData(result);
      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading)
    return (
      <div className="p-10 text-gray-400">
        Loading financial report...
      </div>
    );

  if (!data) return null;

  const monthlyChartData = data.monthlyRevenue.map((item) => ({
    month: monthNames[item._id.month - 1],
    revenue: item.revenue,
  }));

  const pieColors = ["#22c55e", "#facc15", "#ef4444"];

  return (
    <div className="min-h-screen bg-[#0b1f1e] text-white p-10">

      <h1 className="text-4xl font-serif text-[#c6a75e] mb-10">
        Financial Analytics
      </h1>

      {/* ================= KPI CARDS ================= */}
      <div className="grid md:grid-cols-4 gap-6 mb-12">

        <Card title="Gross Revenue" value={`₹ ${data.grossRevenue}`} />
        <Card title="Net Revenue" value={`₹ ${data.netRevenue}`} />
        <Card title="Profit" value={`₹ ${data.profit}`} highlight />
        <Card title="Tax Collected" value={`₹ ${data.taxCollected}`} />

      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-12">

        <Card title="Platform Fee" value={`₹ ${data.platformFee}`} />
        <Card title="Refund Loss" value={`₹ ${data.refundLoss}`} />
        <Card title="Active Rooms" value={data.activeRooms} />

      </div>

      {/* ================= CHARTS ================= */}
      <div className="grid md:grid-cols-2 gap-10">

        {/* Monthly Revenue Chart */}
        <div className="bg-black/40 p-6 rounded-2xl border border-[#c6a75e]/20">
          <h2 className="text-xl font-serif text-[#c6a75e] mb-6">
            Monthly Revenue
          </h2>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyChartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis dataKey="month" stroke="#ccc" />
              <YAxis stroke="#ccc" />
              <Tooltip />
              <Bar
                dataKey="revenue"
                fill="#c6a75e"
                radius={[8, 8, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Booking Status Pie */}
        <div className="bg-black/40 p-6 rounded-2xl border border-[#c6a75e]/20">
          <h2 className="text-xl font-serif text-[#c6a75e] mb-6">
            Booking Status Distribution
          </h2>

          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={data.bookingStatus}
                dataKey="count"
                nameKey="_id"
                outerRadius={100}
                label
              >
                {data.bookingStatus.map((_, index) => (
                  <Cell
                    key={index}
                    fill={pieColors[index % pieColors.length]}
                  />
                ))}
              </Pie>
              <Legend />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

      </div>
    </div>
  );
}

/* ================= CARD COMPONENT ================= */

function Card({
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
