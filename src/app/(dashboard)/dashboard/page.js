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
      label: "Potensi Losses (Rp.) ",
      value: "Rp 2.8M",
      trend: "-5.3%",
      trendDir: "down",
      color: "orange",
      icon: DollarSign,
    },
  ];

  return (
    <>
      <div className="page-header">
        <h1>Dashboard Overview</h1>
        <p>Hasil monitoring inspeksi P2TL dan analisa energi</p>
      </div>

      <div className="summary-cards">
        {summaryCards.map((card, i) => (
          <div key={i} className={`summary-card ${card.color}`}>
            <div className={`summary-card-icon ${card.color}`}>
              <card.icon size={24} />
            </div>
            <div className="summary-card-value">{card.value}</div>
            <div className="summary-card-label">{card.label}</div>
            <div className={`summary-card-trend ${card.trendDir}`}>
              {card.trendDir === "up" ? (
                <TrendingUp size={14} />
              ) : (
                <TrendingDown size={14} />
              )}
              {card.trend} from last month
            </div>
          </div>
        ))}
      </div>

      <div className="charts-grid">
        <div className="chart-card">
          <div className="card-header">
            <h3>Monthly Energy Consumption Trend</h3>
            <span
              style={{ fontSize: "0.75rem", color: "var(--color-gray-400)" }}
            >
              2026
            </span>
          </div>
          <div className="card-body">
            <EnergyLineChart data={dashboardTrendData} />
          </div>
        </div>
        <div className="chart-card">
          <div className="card-header">
            <h3>Risk Distribution</h3>
            <span
              style={{ fontSize: "0.75rem", color: "var(--color-gray-400)" }}
            >
              20 customers
            </span>
          </div>
          <div className="card-body">
            <RiskBarChart data={riskDistribution} />
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h3>Recent Activity</h3>
          <a href="#" style={{ fontSize: "0.8125rem", fontWeight: 600 }}>
            View All
          </a>
        </div>
        <div className="activity-list">
          {recentActivities.map((item, i) => (
            <div key={i} className="activity-item">
              <div className={`activity-dot ${item.color}`}></div>
              <div>
                <div className="activity-text">{item.text}</div>
                <div className="activity-time">{item.time}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
