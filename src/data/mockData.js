export const customers = [
  {
    id: "PLN-001",
    name: "Budi Santoso",
    tariff: "R-1/TR",
    power: "2200 VA",
    result: "Normal",
    risk: "low",
    address: "Denpasar",
    phone: "0812-3456-7890",
    meterType: "ami",
    meterNumber: "51002345678",
  },
];

export const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "Mei",
  "Jun",
  "Jul",
  "Agu",
  "Sep",
  "Okt",
  "Nov",
  "Des",
];
export const years = [2022, 2023, 2024, 2025, 2026];

export const uploadHistory = [
  {
    filename: "P2TL_Data_Feb2026.xlsx",
    date: "2026-02-28",
    status: "success",
    rows: 1250,
  },
  {
    filename: "P2TL_Data_Jan2026.xlsx",
    date: "2026-01-31",
    status: "success",
    rows: 1180,
  },
  {
    filename: "Inspection_Q4_2025.xlsx",
    date: "2025-12-30",
    status: "success",
    rows: 3200,
  },
  {
    filename: "Customer_Update_Dec.xlsx",
    date: "2025-12-15",
    status: "error",
    rows: 0,
  },
  {
    filename: "P2TL_Data_Nov2025.xlsx",
    date: "2025-11-30",
    status: "success",
    rows: 1150,
  },
];

export const recentActivities = [
  {
    text: "Anomali baru terdeteksi untuk pelanggan PLN-002 (Siti Rahayu)",
    time: "2 jam lalu",
    color: "red",
  },
  {
    text: "Inspeksi selesai untuk PLN-009 (Ketut Arini) — Normal",
    time: "4 jam lalu",
    color: "green",
  },
  {
    text: "Unggah data selesai: P2TL_Data_Feb2026.xlsx",
    time: "6 jam lalu",
    color: "blue",
  },
  {
    text: "Tingkat risiko diperbarui untuk PLN-013 (Putu Mega) — Sedang",
    time: "8 jam lalu",
    color: "orange",
  },
  {
    text: "Laporan bulanan dibuat untuk Januari 2026",
    time: "1 hari lalu",
    color: "blue",
  },
  {
    text: "Anomali baru terdeteksi untuk pelanggan PLN-015 (Kadek Ratna)",
    time: "1 hari lalu",
    color: "red",
  },
  {
    text: "Inspeksi selesai untuk PLN-005 (Made Surya) — Normal",
    time: "2 hari lalu",
    color: "green",
  },
];

export const measurementHistory = [
  {
    date: "2026-02-15",
    kwh: 2450,
    kvarh: 120,
    pf: 0.95,
    voltage: 220,
    current: 8.5,
  },
  {
    date: "2026-01-15",
    kwh: 2380,
    kvarh: 115,
    pf: 0.94,
    voltage: 221,
    current: 8.3,
  },
  {
    date: "2025-12-15",
    kwh: 2420,
    kvarh: 118,
    pf: 0.95,
    voltage: 219,
    current: 8.4,
  },
  {
    date: "2025-11-15",
    kwh: 2350,
    kvarh: 112,
    pf: 0.96,
    voltage: 220,
    current: 8.2,
  },
  {
    date: "2025-10-15",
    kwh: 2400,
    kvarh: 117,
    pf: 0.95,
    voltage: 221,
    current: 8.4,
  },
];

export const dataChangeHistory = [
  {
    date: "2026-02-10",
    field: "Tarif",
    oldValue: "R-1/900",
    newValue: "R-1/TR",
    changedBy: "Sistem",
  },
  {
    date: "2025-12-01",
    field: "Kapasitas Daya",
    oldValue: "1300 VA",
    newValue: "2200 VA",
    changedBy: "Admin",
  },
  {
    date: "2025-09-15",
    field: "Alamat",
    oldValue: "Jl. Merdeka No. 40",
    newValue: "Jl. Merdeka No. 45",
    changedBy: "Pelanggan",
  },
];

export const tokenPurchaseHistory = [
  {
    date: "2026-02-14",
    amount: "Rp 201.000",
    energy: "150.5 kWh",
    token: "1234-5678-9012-3456",
  },
  {
    date: "2026-01-28",
    amount: "Rp 100.000",
    energy: "75.2 kWh",
    token: "9876-5432-1098-7654",
  },
  {
    date: "2026-01-10",
    amount: "Rp 300.000",
    energy: "225.8 kWh",
    token: "4567-8901-2345-6789",
  },
  {
    date: "2025-12-25",
    amount: "Rp 150.000",
    energy: "112.5 kWh",
    token: "3456-7890-1234-5678",
  },
  {
    date: "2025-12-05",
    amount: "Rp 200.000",
    energy: "150.0 kWh",
    token: "2345-6789-0123-4567",
  },
];

export const billingUsageHistory = [
  {
    month: "Feb 2026",
    usage: "320 kWh",
    bill: "Rp 450.000",
    status: "Belum Dibayar",
    dueDate: "2026-03-20",
  },
  {
    month: "Jan 2026",
    usage: "310 kWh",
    bill: "Rp 440.000",
    status: "Sudah Dibayar",
    dueDate: "2026-02-20",
  },
  {
    month: "Des 2025",
    usage: "340 kWh",
    bill: "Rp 480.000",
    status: "Sudah Dibayar",
    dueDate: "2026-01-20",
  },
  {
    month: "Nov 2025",
    usage: "325 kWh",
    bill: "Rp 460.000",
    status: "Sudah Dibayar",
    dueDate: "2025-12-20",
  },
  {
    month: "Okt 2025",
    usage: "350 kWh",
    bill: "Rp 495.000",
    status: "Sudah Dibayar",
    dueDate: "2025-11-20",
  },
];

export const dashboardTrendData = months.map((m, i) => ({
  month: m,
  consumption: [
    4200, 4350, 4500, 4100, 4600, 4450, 4700, 4800, 4550, 4650, 4500, 4750,
  ][i],
  target: [
    4500, 4500, 4500, 4500, 4500, 4500, 4500, 4500, 4500, 4500, 4500, 4500,
  ][i],
}));

export const riskDistribution = [
  { category: "Rendah", count: 12, color: "#10B981" },
  { category: "Sedang", count: 4, color: "#F59E0B" },
  { category: "Tinggi", count: 4, color: "#EF4444" },
];
