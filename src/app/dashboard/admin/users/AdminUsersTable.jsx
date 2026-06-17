"use client";

import { useState } from "react";
import { updateUserRole, updateUserStatus } from "@/lib/actions/users";

const columns = ["USER NAME", "EMAIL", "ROLE", "JOIN DATE", "STATUS", "ACTIONS"];

function getRoleButtons(role) {
  if (role === "recruiter") {
    return [
      { label: "Make Admin", newRole: "admin", color: "text-purple-400 hover:text-purple-300 hover:bg-purple-400/10" },
      { label: "Make Seeker", newRole: "seeker", color: "text-blue-400 hover:text-blue-300 hover:bg-blue-400/10" },
    ];
  }
  if (role === "seeker") {
    return [
      { label: "Make Admin", newRole: "admin", color: "text-purple-400 hover:text-purple-300 hover:bg-purple-400/10" },
      { label: "Make Recruiter", newRole: "recruiter", color: "text-blue-400 hover:text-blue-300 hover:bg-blue-400/10" },
    ];
  }
  if (role === "admin") {
    return [
      { label: "Make Seeker", newRole: "seeker", color: "text-blue-400 hover:text-blue-300 hover:bg-blue-400/10" },
      { label: "Make Recruiter", newRole: "recruiter", color: "text-green-400 hover:text-green-300 hover:bg-green-400/10" },
    ];
  }
  return [];
}

function ConfirmDialog({ open, userName, message, confirmLabel, confirmColor, onConfirm, onCancel }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-[#1a1a2e] border border-white/10 rounded-xl p-6 w-full max-w-sm shadow-xl">
        <h3 className="text-white font-semibold text-base mb-2">Confirm Action</h3>
        <p className="text-gray-400 text-sm mb-6">
          <span className="text-white font-medium">{userName}</span> — {message}
        </p>
        <div className="flex gap-3 justify-end">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-sm rounded-lg border border-white/10 text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className={`px-4 py-2 text-sm rounded-lg text-white font-medium transition-colors ${confirmColor}`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function AdminUsersTable({ users: initialUsers = [] }) {
  const [users, setUsers] = useState(initialUsers);
  const [dialog, setDialog] = useState(null);
  // dialog shape: { type: "role"|"status", userId, userName, newRole?, newStatus?, message, confirmLabel, confirmColor }

  function promptRoleChange(userId, userName, newRole) {
    setDialog({
      type: "role",
      userId,
      userName,
      newRole,
      message: `Change role to "${newRole}"?`,
      confirmLabel: "Confirm",
      confirmColor: "bg-orange-500 hover:bg-orange-400",
    });
  }

  function promptStatusToggle(userId, userName, currentStatus) {
    const newStatus = currentStatus === "Active" ? "Suspended" : "Active";
    const isSuspend = newStatus === "Suspended";
    setDialog({
      type: "status",
      userId,
      userName,
      newStatus,
      message: isSuspend ? "Suspend this user?" : "Reactivate this user?",
      confirmLabel: isSuspend ? "Suspend" : "Reactivate",
      confirmColor: isSuspend
        ? "bg-red-600 hover:bg-red-500"
        : "bg-green-600 hover:bg-green-500",
    });
  }

  async function handleConfirm() {
    if (!dialog) return;
    if (dialog.type === "role") {
      await updateUserRole(dialog.userId, dialog.newRole);
      setUsers((prev) =>
        prev.map((u) => (u.id === dialog.userId ? { ...u, role: dialog.newRole } : u))
      );
    } else if (dialog.type === "status") {
      await updateUserStatus(dialog.userId, dialog.newStatus);
      setUsers((prev) =>
        prev.map((u) => (u.id === dialog.userId ? { ...u, status: dialog.newStatus } : u))
      );
    }
    setDialog(null);
  }

  return (
    <>
      <ConfirmDialog
        open={!!dialog}
        userName={dialog?.userName}
        message={dialog?.message}
        confirmLabel={dialog?.confirmLabel}
        confirmColor={dialog?.confirmColor}
        onConfirm={handleConfirm}
        onCancel={() => setDialog(null)}
      />

      <div className="overflow-x-auto rounded-xl border border-white/10">
        <table className="w-full text-sm text-left">
          <thead className="bg-white/5 text-gray-400 uppercase text-xs">
            <tr>
              {columns.map((col) => (
                <th key={col} className="px-4 py-3 font-medium tracking-wider">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-8 text-gray-500">
                  No users found.
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr
                  key={user.id}
                  className="border-t border-white/5 hover:bg-white/5 transition-colors"
                >
                  {/* NAME */}
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-orange-400 flex items-center justify-center text-white font-bold text-xs shrink-0">
                        {user.name?.[0]?.toUpperCase() ?? "?"}
                      </div>
                      <span className="font-medium text-white">{user.name ?? "—"}</span>
                    </div>
                  </td>

                  {/* EMAIL */}
                  <td className="px-4 py-3 text-gray-400">{user.email ?? "—"}</td>

                  {/* ROLE */}
                  <td className="px-4 py-3">
                    <span className="px-2 py-1 rounded-md bg-white/10 text-gray-300 text-xs">
                      {user.role ?? "—"}
                    </span>
                  </td>

                  {/* JOIN DATE */}
                  <td className="px-4 py-3 text-gray-400">
                    {user.createdAt
                      ? new Date(user.createdAt).toLocaleDateString()
                      : "—"}
                  </td>

                  {/* STATUS */}
                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        user.status === "Active"
                          ? "bg-green-500/20 text-green-400"
                          : "bg-red-500/20 text-red-400"
                      }`}
                    >
                      {user.status ?? "—"}
                    </span>
                  </td>

                  {/* ACTIONS */}
                  <td className="px-4 py-3">
                    <div className="flex gap-2 flex-wrap">
                      {getRoleButtons(user.role).map((btn) => (
                        <button
                          key={btn.label}
                          onClick={() => promptRoleChange(user.id, user.name, btn.newRole)}
                          className={`text-xs px-2 py-1 rounded transition-colors ${btn.color}`}
                        >
                          {btn.label}
                        </button>
                      ))}
                      <button
                        onClick={() => promptStatusToggle(user.id, user.name, user.status)}
                        className={`text-xs px-2 py-1 rounded transition-colors ${
                          user.status === "Active"
                            ? "text-red-500 hover:text-red-400 hover:bg-red-500/10"
                            : "text-green-500 hover:text-green-400 hover:bg-green-500/10"
                        }`}
                      >
                        {user.status === "Active" ? "Suspend" : "Reactivate"}
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}