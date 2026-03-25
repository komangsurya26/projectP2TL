"use client";
import {
  Users,
  AlertTriangle,
  ClipboardCheck,
  DollarSign,
  TrendingUp,
  TrendingDown,
} from "lucide-react";
import { EnergyLineChart, RiskBarChart } from "@/components/Charts";
import {
  dashboardTrendData,
  riskDistribution,
  recentActivities,
} from "@/data/mockData";

const cardColors = {
  blue: {
    accent: "from-electric-blue to-accent",
    iconBg: "bg-electric-blue/10",
    iconText: "text-electric-blue",
  },
  red: {
    accent: "from-danger to-red-400",
    iconBg: "bg-danger/10",
    iconText: "text-danger",
  },
  green: {
    accent: "from-success to-emerald-400",
    iconBg: "bg-success/10",
    iconText: "text-success",
  },
  orange: {
    accent: "from-warning to-amber-300",
    iconBg: "bg-warning/10",
    iconText: "text-warning",
  },
};

const dotColors = {
  red: "bg-danger",
  green: "bg-success",
  blue: "bg-electric-blue",
  orange: "bg-warning",
};

export default function DashboardPage() {
  const summaryCards = [
    {
      label: "Jumlah Pelanggan",
      value: "12,458",
      trend: "+3.2%",
      trendDir: "up",
      color: "blue",
      icon: Users,
    },
    {
      label: "Jumlah Deteksi Anomali",
      value: "156",
      trend: "+12.5%",
      trendDir: "up",
      color: "red",
      icon: AlertTriangle,
    },
    {
      label: "Jumlah Inspeksi Bulan Ini",
      value: "342",
      trend: "+8.1%",
      trendDir: "up",
      color: "green",
      icon: ClipboardCheck,
    },
    {
      label: "Potensi Losses (Rp.)",
      value: "Rp 2.8M",
      trend: "-5.3%",
      trendDir: "down",
      color: "orange",
      icon: DollarSign,
    },
  ];

  return (
    <>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-dark-blue mb-1">
          Ringkasan Dashboard
        </h1>
        <p className="text-sm text-gray-500">
          Hasil monitoring inspeksi P2TL dan analisa energi
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-4 gap-6 mb-8 max-2xl:grid-cols-2 max-md:grid-cols-1">
        {summaryCards.map((card, i) => {
          const c = cardColors[card.color];
          return (
            <div
              key={i}
              className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-lg hover:shadow-electric-blue/10 transition-all hover:-translate-y-0.5 relative overflow-hidden"
            >
              <div
                className={`absolute top-0 left-0 right-0 h-[3px] bg-linear-to-r ${c.accent}`}
              ></div>
              <div
                className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${c.iconBg} ${c.iconText}`}
              >
                <card.icon size={24} />
              </div>
              <div className="text-3xl font-extrabold text-dark-blue leading-tight">
                {card.value}
              </div>
              <div className="text-sm text-gray-500 mt-1">{card.label}</div>
              <div
                className={`flex items-center gap-1 mt-3 text-xs font-semibold ${card.trendDir === "up" ? "text-success" : "text-danger"}`}
              >
                {card.trendDir === "up" ? (
                  <TrendingUp size={14} />
                ) : (
                  <TrendingDown size={14} />
                )}
                {card.trend} dari bulan lalu
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-[2fr_1fr] gap-6 mb-8 max-2xl:grid-cols-1">
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
            <h3 className="text-base font-semibold text-dark-blue">
              Tren Konsumsi Energi Bulanan
            </h3>
            <span className="text-xs text-gray-400">2026</span>
          </div>
          <div className="p-6">
            <EnergyLineChart data={dashboardTrendData} />
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
            <h3 className="text-base font-semibold text-dark-blue">
              Distribusi Risiko
            </h3>
            <span className="text-xs text-gray-400">20 pelanggan</span>
          </div>
          <div className="p-6">
            <RiskBarChart data={riskDistribution} />
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
        <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
          <h3 className="text-base font-semibold text-dark-blue">
            Aktivitas Terbaru
          </h3>
          <a
            href="#"
            className="text-sm font-semibold text-electric-blue no-underline hover:underline"
          >
            Lihat Semua
          </a>
        </div>
        <div className="flex flex-col">
          {recentActivities.map((item, i) => (
            <div
              key={i}
              className="flex items-start gap-4 px-6 py-4 border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition-colors"
            >
              <div
                className={`w-2 h-2 rounded-full mt-1.5 min-w-2 ${dotColors[item.color]}`}
              ></div>
              <div>
                <div className="text-sm text-gray-700 leading-relaxed">
                  {item.text}
                </div>
                <div className="text-xs text-gray-400 mt-0.5">{item.time}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
