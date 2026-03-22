"use client";
import { useState, useEffect } from "react";
import { X, MapPin, Phone, AlertTriangle } from "lucide-react";
import {
  UsageTrendChart,
  YearlyTrendChart,
  VoltageTrendChart,
  PowerFactorTrendChart,
  TokenPurchaseTrendChart,
} from "./Charts";
import { dataChangeHistory, billingUsageHistory } from "@/data/mockData";

export default function CustomerDetail({ customer, onClose }) {
  const [activeTab, setActiveTab] = useState("usage");
  const [purchaseHistory, setPurchaseHistory] = useState([]);
  const [monthlyUsage, setMonthlyUsage] = useState([]);
  const [yearlyUsage, setYearlyUsage] = useState([]);
  const [tokenTrend, setTokenTrend] = useState([]);
  const [voltageTrend, setVoltageTrend] = useState([]);
  const [powerFactorTrend, setPowerFactorTrend] = useState([]);
  const [measurementHistory, setMeasurementHistory] = useState([]);

  if (!customer) return null;

  const url = process.env.NEXT_PUBLIC_API_URL;

  const fetchPurchaseHistory = async () => {
    const res = await fetch(
      `${url}/meters/${customer.meterNumber}/purchase-history`,
    );
    const json = await res.json();
    setPurchaseHistory(json.data);
  };

  const monthlyUsagePrabayar = async () => {
    const res = await fetch(
      `${url}/meters/${customer.meterNumber}/monthly-usage`,
    );
    const json = await res.json();
    setMonthlyUsage(json.data);
  };

  const tokenTrendPrabayar = async () => {
    const res = await fetch(
      `${url}/meters/${customer.meterNumber}/token-trend`,
    );
    const json = await res.json();
    setTokenTrend(json.data);
  };

  const monthlyUsageAmi = async () => {
    const res = await fetch(`${url}/meters/${customer.meterNumber}/ami-usage`);
    const json = await res.json();
    setMonthlyUsage(json.data);
  };

  const yearlyUsageAmi = async () => {
    const res = await fetch(
      `${url}/meters/${customer.meterNumber}/ami-yearly-usage`,
    );
    const json = await res.json();
    setYearlyUsage(json.data);
  };

  const voltageTrendAmi = async () => {
    const res = await fetch(
      `${url}/meters/${customer.meterNumber}/voltage-trend`,
    );
    const json = await res.json();
    setVoltageTrend(json.data);
  };

  const powerFactorTrendAmi = async () => {
    const res = await fetch(
      `${url}/meters/${customer.meterNumber}/power-factor-trend`,
    );
    const json = await res.json();
    setPowerFactorTrend(json.data);
  };

  const measurementHistoryAmi = async () => {
    const res = await fetch(
      `${url}/meters/${customer.meterNumber}/measurement-history`,
    );
    const json = await res.json();
    setMeasurementHistory(json.data);
  };

  useEffect(() => {
    if (customer?.meterType === "prabayar") {
      fetchPurchaseHistory();
      monthlyUsagePrabayar();
      tokenTrendPrabayar();
    }

    if (customer?.meterType === "ami") {
      monthlyUsageAmi();
      yearlyUsageAmi();
      voltageTrendAmi();
      powerFactorTrendAmi();
      measurementHistoryAmi();
    }
  }, [customer]);

  const resultColorMap = {
    ANOMALY: "text-danger",
    SUSPECT: "text-warning",
    LOW_CONSUMPTION: "text-success",
    NORMAL: "text-electric-blue",
  };

  const getTabs = () => {
    switch (customer.meterType) {
      case "ami":
        return [
          { key: "usage", label: "Energy Usage" },
          { key: "yearly", label: "Yearly Trend" },
          { key: "voltage", label: "Voltage Trend" },
          { key: "powerfactor", label: "Power Factor" },
          { key: "measurements", label: "Measurement History" },
        ];
      case "prabayar":
        return [
          { key: "usage", label: "Token Purchases" },
          { key: "monthly", label: "Monthly Usage" },
          { key: "token_history", label: "Purchase History" },
        ];
      default:
        return [
          { key: "usage", label: "Monthly Usage" },
          { key: "yearly", label: "Yearly Trend" },
          { key: "measurements", label: "Measurements" },
          { key: "changes", label: "Data Changes" },
        ];
    }
  };

  const tabs = getTabs();

  // Reset tab if current activeTab doesn't exist in new tabs array
  if (!tabs.find((t) => t.key === activeTab)) {
    setActiveTab(tabs[0].key);
  }

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-dark-blue/50 z-200 animate-fade-in"
        onClick={onClose}
      />

      {/* Panel */}
      <div className="fixed top-0 right-0 w-[680px] max-w-[90vw] h-screen bg-white z-201 overflow-y-auto animate-slide-in shadow-[-10px_0_40px_rgba(0,0,0,0.1)]">
        {/* Header */}
        <div className="px-8 py-6 border-b border-gray-200 flex justify-between items-start sticky top-0 bg-white z-10">
          <div>
            <h2 className="text-xl font-bold text-dark-blue">
              {customer.name}
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              ID: {customer.id} • {customer.tariff} • {customer.power}
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full border border-gray-200 bg-white flex items-center justify-center cursor-pointer text-gray-500 hover:bg-gray-100 hover:text-dark-blue transition-all"
          >
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="p-8">
          {/* Contact info */}
          <div className="flex gap-4 mb-6 flex-wrap">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <MapPin size={14} /> {customer.address}
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Phone size={14} /> {customer.phone}
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="p-4 bg-gray-50 rounded-lg text-center flex flex-col justify-center">
              <div className="text-2xl font-extrabold text-dark-blue">
                {customer.meterType === "prabayar" && customer.tokenFreq
                  ? `${customer.tokenFreq}x/mo`
                  : customer.power || "-"}
              </div>
              <div className="text-xs text-gray-500 mt-0.5">
                {customer.meterType === "prabayar"
                  ? "Purchase Freq"
                  : "Power Capacity"}
              </div>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg text-center flex flex-col justify-center">
              <div className={`text-2xl font-extrabold overflow-y-auto`}>
                {customer.risk_score}
              </div>
              <div className="text-xs text-gray-500 mt-0.5">Risk Score</div>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg text-center flex flex-col justify-center">
              <div
                className={`text-2xl font-extrabold ${resultColorMap[customer.result]} overflow-y-auto`}
              >
                {customer.result}
              </div>
              <div className="text-xs text-gray-500 mt-0.5">
                Inspection Result
              </div>
            </div>
          </div>

          {/* Anomaly alert */}
          {customer.result === "ANOMALY" && (
            <div className="flex items-start gap-3 p-4 bg-danger/6 border border-danger/15 rounded-lg mb-6 text-sm text-danger">
              <AlertTriangle size={18} className="mt-0.5 shrink-0" />
              <span>
                <strong>Anomaly Detected: </strong>
                {customer.meterType === "ami"
                  ? "Voltage drop detected below threshold during off-peak hours."
                  : customer.meterType === "prabayar"
                    ? "Token purchase frequency is drastically lower than historical averages."
                    : "Significant usage drop detected. Possible meter tampering or bypass suspected."}
              </span>
            </div>
          )}

          {/* Tabs */}
          <div className="flex border-b-2 border-gray-200 mb-6 overflow-x-auto overflow-y-hidden">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-5 py-3 text-sm font-semibold cursor-pointer border-none bg-transparent font-sans relative transition-colors
                  ${
                    activeTab === tab.key
                      ? 'text-electric-blue after:content-[""] after:absolute after:bottom-[-2px] after:left-0 after:right-0 after:h-0.5 after:bg-electric-blue after:rounded-t'
                      : "text-gray-500 hover:text-dark-blue"
                  }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab content */}
          {activeTab === "usage" && customer.meterType === "prabayar" && (
            <div>
              <h4 className="text-sm font-semibold text-dark-blue mb-4">
                Token Purchase & Frequency Trend
              </h4>
              <TokenPurchaseTrendChart tokenTrend={tokenTrend} />
            </div>
          )}

          {activeTab === "usage" && customer.meterType !== "prabayar" && (
            <div>
              <h4 className="text-sm font-semibold text-dark-blue mb-4">
                Monthly Energy Usage (kWh)
              </h4>
              <UsageTrendChart monthlyUsage={monthlyUsage} />
            </div>
          )}

          {activeTab === "monthly" && customer.meterType === "prabayar" && (
            <div>
              <h4 className="text-sm font-semibold text-dark-blue mb-4">
                Monthly Energy Usage (kWh)
              </h4>
              <UsageTrendChart monthlyUsage={monthlyUsage} />
            </div>
          )}

          {activeTab === "yearly" && customer.meterType !== "prabayar" && (
            <div>
              <h4 className="text-sm font-semibold text-dark-blue mb-4">
                Yearly Consumption Trend (kWh)
              </h4>
              <YearlyTrendChart yearlyUsage={yearlyUsage} />
            </div>
          )}

          {activeTab === "voltage" && (
            <div>
              <h4 className="text-sm font-semibold text-dark-blue mb-4">
                Voltage Trend (V)
              </h4>
              <VoltageTrendChart voltageTrend={voltageTrend} />
            </div>
          )}

          {activeTab === "powerfactor" && (
            <div>
              <h4 className="text-sm font-semibold text-dark-blue mb-4">
                Power Factor Trend
              </h4>
              <PowerFactorTrendChart powerFactorTrend={powerFactorTrend} />
            </div>
          )}

          {activeTab === "measurements" && (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    {["Date", "kWh", "kVARh", "PF", "Voltage", "Current"].map(
                      (h) => (
                        <th
                          key={h}
                          className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-500 bg-gray-50 border-b-2 border-gray-200"
                        >
                          {h}
                        </th>
                      ),
                    )}
                  </tr>
                </thead>
                <tbody>
                  {measurementHistory.map((m, i) => (
                    <tr key={i}>
                      <td className="px-4 py-3 text-sm text-gray-700 border-b border-gray-100">
                        {m.date}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-700 border-b border-gray-100">
                        {m.kwh}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-700 border-b border-gray-100">
                        {customer.meterType === "ami" ? m.kvarh : "-"}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-700 border-b border-gray-100">
                        {customer.meterType === "ami" ? m.pf : "-"}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-700 border-b border-gray-100">
                        {customer.meterType === "ami" ? `${m.voltage}V` : "-"}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-700 border-b border-gray-100">
                        {customer.meterType === "ami" ? `${m.current}A` : "-"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === "token_history" && (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    {["Date", "Amount", "Energy", "Token Code"].map((h) => (
                      <th
                        key={h}
                        className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-500 bg-gray-50 border-b-2 border-gray-200"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {purchaseHistory?.map((t, i) => (
                    <tr key={i}>
                      <td className="px-4 py-3 text-sm text-gray-700 border-b border-gray-100">
                        {t.date}
                      </td>
                      <td className="px-4 py-3 text-sm font-semibold text-dark-blue border-b border-gray-100">
                        {t.amount}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-700 border-b border-gray-100">
                        {t.energy}
                      </td>
                      <td className="px-4 py-3 text-sm font-mono text-gray-600 border-b border-gray-100">
                        {t.token}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === "billing_history" && (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    {[
                      "Billing Month",
                      "Usage",
                      "Amount",
                      "Status",
                      "Due Date",
                    ].map((h) => (
                      <th
                        key={h}
                        className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-500 bg-gray-50 border-b-2 border-gray-200"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {billingUsageHistory.map((b, i) => (
                    <tr key={i}>
                      <td className="px-4 py-3 text-sm text-gray-700 border-b border-gray-100">
                        {b.month}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-700 border-b border-gray-100">
                        {b.usage}
                      </td>
                      <td className="px-4 py-3 text-sm font-semibold text-dark-blue border-b border-gray-100">
                        {b.bill}
                      </td>
                      <td className="px-4 py-3 text-sm border-b border-gray-100">
                        <span
                          className={`px-2 py-0.5 rounded-full text-xs font-medium ${b.status === "Paid" ? "bg-success/10 text-success" : "bg-warning/10 text-warning"}`}
                        >
                          {b.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-500 border-b border-gray-100">
                        {b.dueDate}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === "changes" && (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    {[
                      "Date",
                      "Field",
                      "Old Value",
                      "New Value",
                      "Changed By",
                    ].map((h) => (
                      <th
                        key={h}
                        className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-500 bg-gray-50 border-b-2 border-gray-200"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {dataChangeHistory.map((c, i) => (
                    <tr key={i}>
                      <td className="px-4 py-3 text-sm text-gray-700 border-b border-gray-100">
                        {c.date}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-700 border-b border-gray-100">
                        {c.field}
                      </td>
                      <td className="px-4 py-3 text-sm text-danger border-b border-gray-100">
                        {c.oldValue}
                      </td>
                      <td className="px-4 py-3 text-sm text-success border-b border-gray-100">
                        {c.newValue}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-700 border-b border-gray-100">
                        {c.changedBy}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
