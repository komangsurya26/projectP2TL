"use client";
import { useState, useMemo } from "react";
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

export default function AnalysisPage() {
  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState("id");
  const [sortDir, setSortDir] = useState("asc");
  const [riskFilter, setRiskFilter] = useState("all");
  const [resultFilter, setResultFilter] = useState("all");
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const filtered = useMemo(() => {
    let data = [...customers];
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
  }, [search, sortField, sortDir, riskFilter, resultFilter]);

  const totalPages = Math.ceil(filtered.length / perPage);
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
      return <ChevronUp size={12} style={{ opacity: 0.3 }} />;
    return sortDir === "asc" ? (
      <ChevronUp size={12} />
    ) : (
      <ChevronDown size={12} />
    );
  };

  const columns = [
    { key: "id", label: "Customer ID" },
    { key: "name", label: "Customer Name" },
    { key: "tariff", label: "Tariff" },
    { key: "power", label: "Power Capacity" },
    { key: "result", label: "Inspection Result" },
    { key: "risk", label: "Risk Indicator" },
    { key: "lastInspection", label: "Last Inspection" },
  ];

  return (
    <>
      <div className="page-header">
        <h1>Data Analysis</h1>
        <p>Analyze P2TL inspection data and customer risk indicators</p>
      </div>

      <div className="table-toolbar">
        <div className="table-search">
          <Search size={18} />
          <input
            type="text"
            placeholder="Search by ID or name..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
          />
        </div>
        <div className="table-filters">
          <select
            className="filter-select"
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
            className="filter-select"
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
            className="filter-select"
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

      <div className="data-table-wrapper">
        <table className="data-table">
          <thead>
            <tr>
              {columns.map((col) => (
                <th key={col.key} onClick={() => handleSort(col.key)}>
                  {col.label} <SortIcon field={col.key} />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paged.map((customer) => (
              <tr
                key={customer.id}
                onClick={() => setSelectedCustomer(customer)}
              >
                <td
                  style={{
                    fontWeight: 600,
                    color: "var(--color-electric-blue)",
                  }}
                >
                  {customer.id}
                </td>
                <td>{customer.name}</td>
                <td>{customer.tariff}</td>
                <td>{customer.power}</td>
                <td>
                  <span
                    className={`badge ${customer.result === "Anomaly" ? "high" : customer.result === "Suspect" ? "medium" : "normal"}`}
                  >
                    <span className="badge-dot"></span>
                    {customer.result}
                  </span>
                </td>
                <td>
                  <span className={`badge ${customer.risk}`}>
                    <span className="badge-dot"></span>
                    {customer.risk.charAt(0).toUpperCase() +
                      customer.risk.slice(1)}
                  </span>
                </td>
                <td>{customer.lastInspection}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="pagination">
          <div className="pagination-info">
            Showing {(page - 1) * perPage + 1}–
            {Math.min(page * perPage, filtered.length)} of {filtered.length}{" "}
            results
          </div>
          <div className="pagination-controls">
            <button
              className="pagination-btn"
              disabled={page === 1}
              onClick={() => setPage(1)}
            >
              <ChevronsLeft size={16} />
            </button>
            <button
              className="pagination-btn"
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
            >
              <ChevronLeft size={16} />
            </button>
            {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
              const p = Math.max(1, Math.min(page - 2, totalPages - 4)) + i;
              if (p > totalPages) return null;
              return (
                <button
                  key={p}
                  className={`pagination-btn${p === page ? " active" : ""}`}
                  onClick={() => setPage(p)}
                >
                  {p}
                </button>
              );
            })}
            <button
              className="pagination-btn"
              disabled={page === totalPages}
              onClick={() => setPage((p) => p + 1)}
            >
              <ChevronRight size={16} />
            </button>
            <button
              className="pagination-btn"
              disabled={page === totalPages}
              onClick={() => setPage(totalPages)}
            >
              <ChevronsRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {selectedCustomer && (
        <CustomerDetail
          customer={selectedCustomer}
          onClose={() => setSelectedCustomer(null)}
        />
      )}
    </>
  );
}
