"use client";
import { useState, useMemo, useEffect } from "react";
import { usePathname } from "next/navigation";
import {
  Search,
  ChevronUp,
  ChevronDown,
  ChevronsLeft,
  ChevronsRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { customers } from "@/data/mockData";
import CustomerDetail from "@/components/CustomerDetail";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";

export default function DataAnalysisPage() {
  const pathname = usePathname();
  const typeParam = pathname.split("/").pop();

  const isValidType = ["ami", "amr", "paskabayar", "prabayar"].includes(
    typeParam?.toLowerCase(),
  );
  const displayType = isValidType
    ? typeParam.toUpperCase().replace("-", " ")
    : "ALL";

  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState("id");
  const [sortDir, setSortDir] = useState("asc");
  const [riskFilter, setRiskFilter] = useState("all");
  const [resultFilter, setResultFilter] = useState("all");
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  useEffect(() => {
    setPage(1);
  }, [typeParam]);

  const filtered = useMemo(() => {
    let data = [...customers];

    // Filter by Meter Type
    if (isValidType) {
      data = data.filter((c) => c.meterType === typeParam.toLowerCase());
    }

    if (search) {
      const s = search.toLowerCase();
      data = data.filter(
        (c) =>
          c.id.toLowerCase().includes(s) || c.name.toLowerCase().includes(s),
      );
    }
    if (riskFilter !== "all") data = data.filter((c) => c.risk === riskFilter);
    if (resultFilter !== "all")
      data = data.filter((c) => c.result === resultFilter);

    data.sort((a, b) => {
      let va = a[sortField],
        vb = b[sortField];
      if (typeof va === "string") {
        va = va.toLowerCase();
        vb = vb.toLowerCase();
      }
      if (va < vb) return sortDir === "asc" ? -1 : 1;
      if (va > vb) return sortDir === "asc" ? 1 : -1;
      return 0;
    });
    return data;
  }, [
    search,
    sortField,
    sortDir,
    riskFilter,
    resultFilter,
    isValidType,
    typeParam,
  ]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const paged = filtered.slice((page - 1) * perPage, page * perPage);

  const handleSort = (field) => {
    if (sortField === field) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else {
      setSortField(field);
      setSortDir("asc");
    }
  };

  const SortIcon = ({ field }) => {
    if (sortField !== field)
      return <ChevronUp size={12} className="opacity-30" />;
    return sortDir === "asc" ? (
      <ChevronUp size={12} />
    ) : (
      <ChevronDown size={12} />
    );
  };

  const getColumns = () => {
    switch (typeParam?.toLowerCase()) {
      case "ami":
        return [
          { key: "id", label: "Customer ID" },
          { key: "name", label: "Customer Name" },
          { key: "meterNumber", label: "Meter Number" },
          { key: "voltage", label: "Voltage (V)" },
          { key: "current", label: "Current (A)" },
          { key: "powerFactor", label: "Power Factor" },
          { key: "energyImport", label: "Energy Import (kWh)" },
          { key: "reactiveEnergy", label: "Reactive Energy" },
          { key: "apparentPower", label: "Apparent Power" },
          { key: "risk", label: "Risk Score" },
          { key: "result", label: "Status" },
        ];
      case "amr":
        return [
          { key: "id", label: "Customer ID" },
          { key: "name", label: "Customer Name" },
          { key: "averageConsumption", label: "Avg Consumption" },
          { key: "consumptionChange", label: "Change (%)" },
          { key: "risk", label: "Risk Score" },
          { key: "result", label: "Status" },
        ];
      case "prabayar":
        return [
          { key: "id", label: "Customer ID" },
          { key: "name", label: "Customer Name" },
          { key: "tokenDate", label: "Token Purchase Date" },
          { key: "tokenEnergy", label: "Token Energy (kWh)" },
          { key: "tokenFreq", label: "Purchase Frequency" },
          { key: "risk", label: "Risk Score" },
          { key: "result", label: "Status" },
        ];
      case "paskabayar":
        return [
          { key: "id", label: "Customer ID" },
          { key: "name", label: "Customer Name" },
          { key: "billingMonth", label: "Billing Month" },
          { key: "averageUsage", label: "Average Usage" },
          { key: "usageChange", label: "Usage Change (%)" },
          { key: "estimatedBill", label: "Estimated Bill" },
          { key: "risk", label: "Risk Score" },
          { key: "result", label: "Status" },
        ];
      default:
        return [
          { key: "id", label: "Customer ID" },
          { key: "name", label: "Customer Name" },
          { key: "tariff", label: "Tariff" },
          { key: "power", label: "Power Capacity" },
          { key: "result", label: "Inspection Result" },
          { key: "risk", label: "Risk Indicator" },
          { key: "lastInspection", label: "Last Inspection" },
        ];
    }
  };

  const columns = getColumns();

  if (!isValidType) {
    return (
      <div className="p-8 text-center text-gray-500">
        Invalid meter type selected.
      </div>
    );
  }

  return (
    <>
      <div className="mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-dark-blue mb-1">
            Data Analysis: {displayType}
          </h1>
          <p className="text-sm text-gray-500">
            Analyze P2TL inspection data and customer risk indicators for{" "}
            {displayType} meters.
          </p>
        </div>
        <Badge
          variant="primary"
          className="w-fit text-sm px-3 py-1 bg-electric-blue/10 text-electric-blue border-electric-blue/20"
        >
          Total filtered: {filtered.length} Customers
        </Badge>
      </div>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-2 px-4 py-2 bg-white border-[1.5px] border-gray-200 rounded-lg w-full md:min-w-[300px] md:w-auto transition-colors focus-within:border-electric-blue focus-within:ring-[3px] focus-within:ring-electric-blue/10">
          <Search size={18} className="text-gray-400 min-w-[18px]" />
          <input
            type="text"
            placeholder="Search by ID or name..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="border-none bg-transparent text-sm text-gray-700 outline-none w-full font-sans"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <select
            className="px-3 py-2 border-[1.5px] border-gray-200 rounded-lg text-sm font-sans text-gray-600 bg-white cursor-pointer outline-none focus:border-electric-blue flex-1 md:flex-none"
            value={riskFilter}
            onChange={(e) => {
              setRiskFilter(e.target.value);
              setPage(1);
            }}
          >
            <option value="all">All Risks</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          <select
            className="px-3 py-2 border-[1.5px] border-gray-200 rounded-lg text-sm font-sans text-gray-600 bg-white cursor-pointer outline-none focus:border-electric-blue flex-1 md:flex-none"
            value={resultFilter}
            onChange={(e) => {
              setResultFilter(e.target.value);
              setPage(1);
            }}
          >
            <option value="all">All Results</option>
            <option value="Normal">Normal</option>
            <option value="Suspect">Suspect</option>
            <option value="Anomaly">Anomaly</option>
          </select>
          <select
            className="px-3 py-2 border-[1.5px] border-gray-200 rounded-lg text-sm font-sans text-gray-600 bg-white cursor-pointer outline-none focus:border-electric-blue min-w-[100px]"
            value={perPage}
            onChange={(e) => {
              setPerPage(Number(e.target.value));
              setPage(1);
            }}
          >
            <option value={10}>10 rows</option>
            <option value={25}>25 rows</option>
            <option value={50}>50 rows</option>
          </select>
        </div>
      </div>

      <Card className="overflow-hidden">
        <div className="overflow-x-auto w-full">
          <table className="w-full min-w-[800px] border-collapse">
            <thead>
              <tr>
                {columns.map((col) => (
                  <th
                    key={col.key}
                    onClick={() => handleSort(col.key)}
                    className="px-4 py-3.5 text-left text-xs font-bold uppercase tracking-wider text-gray-500 bg-gray-50 border-b-2 border-gray-200 cursor-pointer select-none hover:text-electric-blue whitespace-nowrap"
                  >
                    <div className="flex items-center gap-1.5">
                      {col.label} <SortIcon field={col.key} />
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paged.length > 0 ? (
                paged.map((customer) => (
                  <tr
                    key={customer.id}
                    onClick={() => setSelectedCustomer(customer)}
                    className="transition-colors cursor-pointer hover:bg-electric-blue/4"
                  >
                    {columns.map((col) => {
                      if (col.key === "result" || col.key === "status") {
                        return (
                          <td
                            key={col.key}
                            className="px-4 py-3.5 text-sm border-b border-gray-100"
                          >
                            <Badge
                              variant={
                                customer.result === "Anomaly"
                                  ? "danger"
                                  : customer.result === "Suspect"
                                    ? "warning"
                                    : "success"
                              }
                            >
                              {customer.result === "Normal"
                                ? "Normal"
                                : customer.result}
                            </Badge>
                          </td>
                        );
                      }
                      if (col.key === "risk") {
                        return (
                          <td
                            key={col.key}
                            className="px-4 py-3.5 text-sm border-b border-gray-100"
                          >
                            <Badge
                              variant={
                                customer.risk === "high"
                                  ? "danger"
                                  : customer.risk === "medium"
                                    ? "warning"
                                    : "success"
                              }
                            >
                              {customer.risk.charAt(0).toUpperCase() +
                                customer.risk.slice(1)}
                            </Badge>
                          </td>
                        );
                      }
                      if (col.key === "id") {
                        return (
                          <td
                            key={col.key}
                            className="px-4 py-3.5 text-sm border-b border-gray-100 font-semibold text-electric-blue"
                          >
                            {customer[col.key]}
                          </td>
                        );
                      }
                      if (col.key === "estimatedBill") {
                        return (
                          <td
                            key={col.key}
                            className="px-4 py-3.5 text-sm border-b border-gray-100 text-gray-700"
                          >
                            {new Intl.NumberFormat("id-ID", {
                              style: "currency",
                              currency: "IDR",
                            }).format(customer[col.key])}
                          </td>
                        );
                      }
                      return (
                        <td
                          key={col.key}
                          className="px-4 py-3.5 text-sm text-gray-700 border-b border-gray-100 whitespace-nowrap"
                        >
                          {customer[col.key] !== undefined
                            ? customer[col.key]
                            : "-"}
                        </td>
                      );
                    })}
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={7}
                    className="px-4 py-8 text-center text-sm text-gray-500 border-b border-gray-100"
                  >
                    No customers found matching the criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 border-t border-gray-100 bg-white">
          <div className="text-sm text-gray-500">
            Showing {filtered.length === 0 ? 0 : (page - 1) * perPage + 1}–
            {Math.min(page * perPage, filtered.length)} of {filtered.length}{" "}
            results
          </div>

          <div className="flex items-center gap-1">
            <button
              className="w-9 h-9 rounded-md border border-gray-200 bg-white text-gray-600 flex items-center justify-center cursor-pointer transition-colors font-sans text-sm font-medium hover:not-disabled:border-electric-blue hover:not-disabled:text-electric-blue disabled:opacity-40 disabled:cursor-not-allowed"
              disabled={page === 1}
              onClick={() => setPage(1)}
            >
              <ChevronsLeft size={16} />
            </button>
            <button
              className="w-9 h-9 rounded-md border border-gray-200 bg-white text-gray-600 flex items-center justify-center cursor-pointer transition-colors font-sans text-sm font-medium hover:not-disabled:border-electric-blue hover:not-disabled:text-electric-blue disabled:opacity-40 disabled:cursor-not-allowed"
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
            >
              <ChevronLeft size={16} />
            </button>

            <div className="hidden sm:flex items-center gap-1 mx-1">
              {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                const p = Math.max(1, Math.min(page - 2, totalPages - 4)) + i;
                if (p > totalPages) return null;
                return (
                  <button
                    key={p}
                    className={`w-9 h-9 rounded-md border flex items-center justify-center cursor-pointer transition-colors font-sans text-sm font-medium
                      ${
                        p === page
                          ? "bg-electric-blue border-electric-blue text-white"
                          : "border-gray-200 bg-white text-gray-600 hover:border-electric-blue hover:text-electric-blue"
                      }`}
                    onClick={() => setPage(p)}
                  >
                    {p}
                  </button>
                );
              })}
            </div>

            <span className="sm:hidden text-sm font-medium px-2">
              Page {page} of {totalPages}
            </span>

            <button
              className="w-9 h-9 rounded-md border border-gray-200 bg-white text-gray-600 flex items-center justify-center cursor-pointer transition-colors font-sans text-sm font-medium hover:not-disabled:border-electric-blue hover:not-disabled:text-electric-blue disabled:opacity-40 disabled:cursor-not-allowed"
              disabled={page === totalPages || totalPages === 0}
              onClick={() => setPage((p) => p + 1)}
            >
              <ChevronRight size={16} />
            </button>
            <button
              className="w-9 h-9 rounded-md border border-gray-200 bg-white text-gray-600 flex items-center justify-center cursor-pointer transition-colors font-sans text-sm font-medium hover:not-disabled:border-electric-blue hover:not-disabled:text-electric-blue disabled:opacity-40 disabled:cursor-not-allowed"
              disabled={page === totalPages || totalPages === 0}
              onClick={() => setPage(totalPages)}
            >
              <ChevronsRight size={16} />
            </button>
          </div>
        </div>
      </Card>

      {selectedCustomer && (
        <CustomerDetail
          customer={selectedCustomer}
          onClose={() => setSelectedCustomer(null)}
        />
      )}
    </>
  );
}
