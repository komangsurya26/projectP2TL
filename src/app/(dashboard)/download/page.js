"use client";
import { useState } from "react";
import { Download, FileSpreadsheet, Calendar } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

const downloadHistory = [
  {
    name: "P2TL_Report_Feb_2026.xlsx",
    date: "2026-02-28",
    size: "2.4 MB",
    type: "Monthly Report",
  },
  {
    name: "P2TL_Report_Jan_2026.xlsx",
    date: "2026-01-31",
    size: "2.1 MB",
    type: "Monthly Report",
  },
  {
    name: "Anomaly_Q4_2025.xlsx",
    date: "2025-12-31",
    size: "1.8 MB",
    type: "Anomaly Report",
  },
  {
    name: "P2TL_Annual_2025.xlsx",
    date: "2025-12-31",
    size: "8.5 MB",
    type: "Annual Report",
  },
  {
    name: "Risk_Assessment_Dec_2025.xlsx",
    date: "2025-12-15",
    size: "3.2 MB",
    type: "Risk Report",
  },
];

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const years = [2026, 2025, 2024, 2023];
const reportTypes = [
  "Monthly Report",
  "Anomaly Report",
  "Risk Report",
  "Annual Report",
  "Customer Summary",
];

export default function DownloadPage() {
  const [month, setMonth] = useState("February");
  const [year, setYear] = useState(2026);
  const [type, setType] = useState("Monthly Report");

  const handleDownload = () => {
    alert(
      `Downloading ${type} for ${month} ${year}...\n\n(Demo: In production, this would generate and download an XLSX file)`,
    );
  };

  return (
    <>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-dark-blue mb-1">
          Download Reports
        </h1>
        <p className="text-sm text-gray-500">
          Download processed analysis results and inspection reports
        </p>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Generate Report</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row md:items-end gap-5 flex-wrap">
            <div className="flex flex-col gap-2 w-full md:w-auto">
              <label className="text-[13px] font-semibold text-gray-600">
                Report Type
              </label>
              <select
                className="px-3 py-2 border-[1.5px] border-gray-200 rounded-lg text-sm font-sans text-gray-600 bg-white cursor-pointer outline-none focus:border-electric-blue w-full md:w-48"
                value={type}
                onChange={(e) => setType(e.target.value)}
              >
                {reportTypes.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex gap-5 w-full md:w-auto">
              <div className="flex flex-col gap-2 flex-1 md:flex-none">
                <label className="text-[13px] font-semibold text-gray-600">
                  Month
                </label>
                <select
                  className="px-3 py-2 border-[1.5px] border-gray-200 rounded-lg text-sm font-sans text-gray-600 bg-white cursor-pointer outline-none focus:border-electric-blue w-full md:w-32"
                  value={month}
                  onChange={(e) => setMonth(e.target.value)}
                >
                  {months.map((m) => (
                    <option key={m} value={m}>
                      {m}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col gap-2 flex-1 md:flex-none">
                <label className="text-[13px] font-semibold text-gray-600">
                  Year
                </label>
                <select
                  className="px-3 py-2 border-[1.5px] border-gray-200 rounded-lg text-sm font-sans text-gray-600 bg-white cursor-pointer outline-none focus:border-electric-blue w-full md:w-28"
                  value={year}
                  onChange={(e) => setYear(Number(e.target.value))}
                >
                  {years.map((y) => (
                    <option key={y} value={y}>
                      {y}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <Button
              onClick={handleDownload}
              className="w-full md:w-auto mt-2 md:mt-0"
            >
              <Download size={16} /> Download Report
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recent Downloads</CardTitle>
        </CardHeader>
        <div className="overflow-x-auto w-full">
          <table className="w-full min-w-[600px] border-collapse">
            <thead>
              <tr>
                <th className="px-4 py-3.5 text-left text-xs font-bold uppercase tracking-wider text-gray-500 bg-gray-50 border-b-2 border-gray-200">
                  File Name
                </th>
                <th className="px-4 py-3.5 text-left text-xs font-bold uppercase tracking-wider text-gray-500 bg-gray-50 border-b-2 border-gray-200">
                  Type
                </th>
                <th className="px-4 py-3.5 text-left text-xs font-bold uppercase tracking-wider text-gray-500 bg-gray-50 border-b-2 border-gray-200">
                  Date
                </th>
                <th className="px-4 py-3.5 text-left text-xs font-bold uppercase tracking-wider text-gray-500 bg-gray-50 border-b-2 border-gray-200">
                  Size
                </th>
                <th className="px-4 py-3.5 text-left text-xs font-bold uppercase tracking-wider text-gray-500 bg-gray-50 border-b-2 border-gray-200">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {downloadHistory.map((item, i) => (
                <tr key={i} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 text-sm text-gray-700 border-b border-gray-100 font-medium">
                    <div className="flex items-center gap-2">
                      <FileSpreadsheet size={16} className="text-success" />{" "}
                      {item.name}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-500 border-b border-gray-100">
                    {item.type}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-500 border-b border-gray-100">
                    <div className="flex items-center gap-2">
                      <Calendar size={14} className="text-gray-400" />{" "}
                      {item.date}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-500 border-b border-gray-100">
                    {item.size}
                  </td>
                  <td className="px-4 py-3 text-sm border-b border-gray-100">
                    <Button variant="secondary" size="sm">
                      <Download size={14} /> Download
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </>
  );
}
