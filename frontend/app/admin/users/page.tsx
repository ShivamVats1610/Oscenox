"use client";

import { useEffect, useState } from "react";
import UserDrawer from "../components/UserDrawer";

interface User {
  _id: string;
  name: string;
  email: string;
  role: "admin" | "user";
  isBlocked: boolean;
  isDeleted?: boolean;
  createdAt: string;
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [filtered, setFiltered] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  const [selectedUser, setSelectedUser] = useState<string | null>(null);

  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("active");

  /* ===========================================
     FETCH USERS
  =========================================== */
  const fetchUsers = async () => {
    try {
      setLoading(true);

      const url =
        statusFilter === "archived"
          ? "http://localhost:5000/api/users/admin/all?status=archived"
          : "http://localhost:5000/api/users/admin/all";

      const res = await fetch(url, {
        credentials: "include",
      });

      const data = await res.json();
      setUsers(data || []);
    } catch (error) {
      console.error("Fetch users error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [statusFilter]);

  /* ===========================================
     FILTER LOGIC
  =========================================== */
  useEffect(() => {
    let result = users;

    if (search) {
      result = result.filter(
        (u) =>
          u.name.toLowerCase().includes(search.toLowerCase()) ||
          u.email.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (roleFilter !== "all") {
      result = result.filter((u) => u.role === roleFilter);
    }

    setFiltered(result);
  }, [search, roleFilter, users]);

  /* ===========================================
     ACTIONS
  =========================================== */

  const toggleBlock = async (e: React.MouseEvent, id: string) => {
    e.stopPropagation();

    await fetch(
      `http://localhost:5000/api/users/admin/${id}/block`,
      {
        method: "PUT",
        credentials: "include",
      }
    );

    fetchUsers();
  };

  const changeRole = async (
    e: React.MouseEvent,
    id: string,
    role: string
  ) => {
    e.stopPropagation();

    await fetch(
      `http://localhost:5000/api/users/admin/${id}/role`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ role }),
      }
    );

    fetchUsers();
  };

  const softDelete = async (e: React.MouseEvent, id: string) => {
    e.stopPropagation();

    const confirmDelete = confirm("Archive this user?");
    if (!confirmDelete) return;

    await fetch(
      `http://localhost:5000/api/users/admin/${id}`,
      {
        method: "DELETE",
        credentials: "include",
      }
    );

    fetchUsers();
  };

  const restoreUser = async (e: React.MouseEvent, id: string) => {
    e.stopPropagation();

    await fetch(
      `http://localhost:5000/api/users/admin/${id}/restore`,
      {
        method: "PUT",
        credentials: "include",
      }
    );

    fetchUsers();
  };

  /* ===========================================
     UI
  =========================================== */

  return (
    <div className="min-h-screen bg-[#0b1f1e] text-white p-10">
      <h1 className="text-4xl font-serif text-[#c6a75e] mb-10">
        User Management
      </h1>

      {/* FILTER BAR */}
      <div className="grid md:grid-cols-4 gap-4 mb-8">

        <input
          placeholder="Search name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-black/40 border border-[#c6a75e]/30 px-4 py-2 rounded"
        />

        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          className="bg-black/40 border border-[#c6a75e]/30 px-4 py-2 rounded"
        >
          <option value="all">All Roles</option>
          <option value="admin">Admin</option>
          <option value="user">User</option>
        </select>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="bg-black/40 border border-[#c6a75e]/30 px-4 py-2 rounded"
        >
          <option value="active">Active</option>
          <option value="archived">Archived</option>
        </select>

      </div>

      {/* TABLE */}
      {loading ? (
        <p className="text-gray-400">Loading users...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border border-[#c6a75e]/30">
            <thead className="bg-black/50">
              <tr>
                <th className="p-3 text-left">Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Status</th>
                <th>Joined</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((user) => (
                <tr
                  key={user._id}
                  onClick={() => setSelectedUser(user._id)}
                  className="cursor-pointer border-t border-[#c6a75e]/20 hover:bg-black/20 transition"
                >
                  <td className="p-3">{user.name}</td>
                  <td>{user.email}</td>

                  <td>
                    <span className={`px-3 py-1 rounded-full text-xs ${
                      user.role === "admin"
                        ? "bg-purple-600/20 text-purple-400"
                        : "bg-blue-600/20 text-blue-400"
                    }`}>
                      {user.role}
                    </span>
                  </td>

                  <td>
                    {user.isDeleted ? (
                      <span className="px-3 py-1 rounded-full text-xs bg-gray-600/20 text-gray-400">
                        Archived
                      </span>
                    ) : user.isBlocked ? (
                      <span className="px-3 py-1 rounded-full text-xs bg-red-600/20 text-red-400">
                        Blocked
                      </span>
                    ) : (
                      <span className="px-3 py-1 rounded-full text-xs bg-green-600/20 text-green-400">
                        Active
                      </span>
                    )}
                  </td>

                  <td>
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>

                  <td className="space-x-2">

                    {!user.isDeleted && (
                      <>
                        <button
                          onClick={(e) => toggleBlock(e, user._id)}
                          className="px-3 py-1 text-xs rounded bg-yellow-600/80 hover:bg-yellow-600"
                        >
                          {user.isBlocked ? "Unblock" : "Block"}
                        </button>

                        <button
                          onClick={(e) =>
                            changeRole(
                              e,
                              user._id,
                              user.role === "admin" ? "user" : "admin"
                            )
                          }
                          className="px-3 py-1 text-xs rounded bg-indigo-600/80 hover:bg-indigo-600"
                        >
                          {user.role === "admin" ? "Demote" : "Promote"}
                        </button>

                        <button
                          onClick={(e) => softDelete(e, user._id)}
                          className="px-3 py-1 text-xs rounded bg-red-600/80 hover:bg-red-600"
                        >
                          Archive
                        </button>
                      </>
                    )}

                    {user.isDeleted && (
                      <button
                        onClick={(e) => restoreUser(e, user._id)}
                        className="px-3 py-1 text-xs rounded bg-green-600/80 hover:bg-green-600"
                      >
                        Restore
                      </button>
                    )}

                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filtered.length === 0 && (
            <p className="text-gray-500 mt-6">
              No users found.
            </p>
          )}
        </div>
      )}

      {/* USER DRAWER */}
      <UserDrawer
        userId={selectedUser}
        onClose={() => setSelectedUser(null)}
      />
    </div>
  );
}
