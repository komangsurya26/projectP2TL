"use client";
import { User, Bell, Database } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/context/AuthContext";

export default function SettingsPage() {
  const { user } = useAuth();
  return (
    <>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-dark-blue mb-1">Settings</h1>
        <p className="text-sm text-gray-500">
          Manage your account and application preferences
        </p>
      </div>

      <div className="grid gap-6">
        {/* Profile */}
        <Card>
          <CardHeader>
            <CardTitle>
              <div className="flex items-center gap-2">
                <User size={18} />
                Profile Settings
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-3xl">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-gray-600">
                  Full Name
                </label>
                <input
                  className="w-full px-4 py-2.5 border-[1.5px] border-gray-200 rounded-lg text-sm font-sans text-gray-700 bg-white outline-none transition-all focus:border-electric-blue focus:shadow-[0_0_0_3px_rgba(33,150,243,0.12)]"
                  defaultValue={user?.name}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-gray-600">
                  Email
                </label>
                <input
                  className="w-full px-4 py-2.5 border-[1.5px] border-gray-200 rounded-lg text-sm font-sans text-gray-700 bg-white outline-none transition-all focus:border-electric-blue focus:shadow-[0_0_0_3px_rgba(33,150,243,0.12)]"
                  defaultValue={user?.email}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-gray-600">
                  Role
                </label>
                <input
                  className="w-full px-4 py-2.5 border-[1.5px] border-gray-200 rounded-lg text-sm font-sans text-gray-700 bg-gray-50 outline-none select-none cursor-default"
                  defaultValue={user?.role}
                  readOnly
                />
              </div>
            </div>
            <Button className="mt-6">Save Changes</Button>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card>
          <CardHeader>
            <CardTitle>
              <div className="flex items-center gap-2">
                <Bell size={18} />
                Notification Preferences
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0 sm:p-0">
            <div className="flex flex-col">
              {[
                "Anomaly Detection Alerts",
                "Inspection Report Ready",
                "Weekly Summary Email",
                "System Maintenance Notices",
              ].map((label, i) => (
                <label
                  key={i}
                  className={`flex items-center gap-3 px-5 sm:px-6 py-4 cursor-pointer text-sm text-gray-700 hover:bg-gray-50 transition-colors ${
                    i < 3 ? "border-b border-gray-100" : ""
                  }`}
                >
                  <input
                    type="checkbox"
                    defaultChecked={i < 2}
                    className="w-4 h-4 accent-electric-blue cursor-pointer"
                  />
                  {label}
                </label>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* System */}
        <Card>
          <CardHeader>
            <CardTitle>
              <div className="flex items-center gap-2">
                <Database size={18} />
                System Information
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-[auto_1fr] gap-x-8 gap-y-4 text-sm max-w-md">
              <span className="text-gray-500 font-semibold">Version</span>
              <span className="text-gray-800">P2TL Analytics v1.0.0</span>

              <span className="text-gray-500 font-semibold">Last Updated</span>
              <span className="text-gray-800">March 2026</span>

              <span className="text-gray-500 font-semibold">Database</span>
              <span className="text-gray-800">PostgreSQL 16.2</span>

              <span className="text-gray-500 font-semibold">Environment</span>
              <span className="text-success font-semibold">Production</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
