import React, { useState, useMemo } from "react";
import Container from "@/components/layout/container";
import { useTable, usePagination, useSortBy, useFilters } from "react-table";
import {
    ChevronLeftIcon,
    ChevronRightIcon,
    EyeIcon,
} from "@heroicons/react/solid";
import {
    FaCheck,
    FaTimes,
    FaCalendarAlt,
    FaBuilding,
    FaUser,
} from "react-icons/fa";
import { jobData } from "./data";

const JobManagement = ({ onSelectJob }) => {
    const [selectedJob, setSelectedJob] = useState(null);
    const [filterInput, setFilterInput] = useState("");

    const data = useMemo(() => jobData, []);

    const columns = useMemo(
        () => [
            {
                Header: "Title",
                accessor: "jobTitle",
            },
            {
                Header: "Employer",
                accessor: "employerId",
                Filter: ColumnFilter,
            },
            {
                Header: "Post Date",
                accessor: "postedAt",
                // Cell: ({ value }) => new Date(value).toLocaleDateString(),
                Filter: ColumnFilter,
            },
            {
                Header: "Status",
                accessor: "jobStatus",
                Filter: SelectColumnFilter, // Sử dụng bộ lọc Select cho Status
            },
            {
                Header: "Action",
                Cell: ({ row }) => (
                    <div className="flex items-center space-x-2">
                        <EyeIcon
                            className="h-5 w-5 cursor-pointer text-blue-500"
                            onClick={() => onSelectJob(row.original)}
                        />
                    </div>
                ),
            },
        ],
        [],
    );

    const handleApprove = (id) => {
        console.log(`Approved job with ID: ${id}`);
        if (window.confirm("Are you sure you want to approve?")) {
            setSelectedJob((prev) => ({ ...prev, jobStatus: "approved" }));
        } else {
            return;
        }
    };

    const handleReject = (id) => {
        console.log(`Rejected job with ID: ${id}`);
        if (window.confirm("Are you sure you want to reject?")) {
            setSelectedJob((prev) => ({ ...prev, jobStatus: "rejected" }));
        } else {
            return;
        }
    };

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        page,
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setFilter,
        state: { pageIndex },
    } = useTable(
        {
            columns,
            data,
            initialState: { pageIndex: 0 },
        },
        useFilters,
        useSortBy,
        usePagination,
    );

    const handleFilterChange = (e) => {
        const value = e.target.value || undefined;
        setFilter("employerId", value);
        setFilterInput(value);
    };

    return (
        <Container className="py-16 pt-8">
            <div className="mb-4 flex items-center justify-between">
                <h3 className="text-2xl font-bold text-gray-900">
                    Job Posts Management
                </h3>
            </div>
            <div className="mb-4 flex space-x-4">
                <input
                    value={filterInput}
                    onChange={handleFilterChange}
                    placeholder={"Search by employerId"}
                    className="w-full rounded-lg border px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <select
                    onChange={(e) => setFilter("jobStatus", e.target.value)}
                    className="w-full rounded-lg border px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="">All Statuses</option>
                    <option value="approved">Approved</option>
                    <option value="pending">Pending</option>
                    <option value="rejected">Rejected</option>
                </select>
            </div>
            <table
                {...getTableProps()}
                className="min-w-full divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow-lg"
            >
                <thead className="bg-red-600 text-white">
                    {headerGroups.map((headerGroup) => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column) => (
                                <th
                                    {...column.getHeaderProps(
                                        column.getSortByToggleProps(),
                                    )}
                                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                                >
                                    {column.render("Header")}
                                    <span>
                                        {column.isSorted
                                            ? column.isSortedDesc
                                                ? " ▼"
                                                : " ▲"
                                            : ""}
                                    </span>
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody
                    {...getTableBodyProps()}
                    className="divide-y divide-gray-200"
                >
                    {page.length === 0 ? (
                        <tr>
                            <td
                                colSpan={columns.length}
                                className="px-6 py-4 text-center text-sm text-gray-500"
                            >
                                No results found
                            </td>
                        </tr>
                    ) : (
                        page.map((row) => {
                            prepareRow(row);
                            return (
                                <tr
                                    {...row.getRowProps()}
                                    className="hover:bg-gray-50"
                                >
                                    {row.cells.map((cell) => (
                                        <td
                                            {...cell.getCellProps()}
                                            className="whitespace-nowrap px-6 py-4 text-sm text-gray-500"
                                        >
                                            {cell.render("Cell")}
                                        </td>
                                    ))}
                                </tr>
                            );
                        })
                    )}
                </tbody>
            </table>
            <div className="mt-4 flex items-center justify-between">
                <button
                    onClick={() => previousPage()}
                    disabled={!canPreviousPage}
                    className="flex items-center rounded-lg bg-red-600 px-3 py-2 text-white disabled:opacity-50"
                >
                    <ChevronLeftIcon className="h-5 w-5" />
                    <span className="ml-2">Previous</span>
                </button>
                <span className="text-sm text-gray-700">
                    Page{" "}
                    <strong>
                        {pageIndex + 1} of {pageOptions.length}
                    </strong>
                </span>
                <button
                    onClick={() => nextPage()}
                    disabled={!canNextPage}
                    className="flex items-center rounded-lg bg-red-600 px-3 py-2 text-white disabled:opacity-50"
                >
                    <span className="mr-2">Next</span>
                    <ChevronRightIcon className="h-5 w-5" />
                </button>
            </div>
        </Container>
    );
};

function ColumnFilter({
    column: { filterValue, setFilter, preFilteredRows, id },
}) {
    const count = preFilteredRows.length;

    return (
        <input
            value={filterValue || ""}
            onChange={(e) => setFilter(e.target.value || undefined)}
            placeholder={`Search ${count} records...`}
            className="w-full rounded-lg border px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
    );
}

function SelectColumnFilter({
    column: { filterValue, setFilter, preFilteredRows, id },
}) {
    const options = useMemo(() => {
        const optionsSet = new Set();
        preFilteredRows.forEach((row) => {
            optionsSet.add(row.values[id]);
        });
        return [...optionsSet.values()];
    }, [id, preFilteredRows]);

    return (
        <select
            value={filterValue}
            onChange={(e) => {
                setFilter(e.target.value || undefined);
            }}
            className="w-full rounded-lg border px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
            <option value="">All</option>
            {options.map((option, i) => (
                <option key={i} value={option}>
                    {option}
                </option>
            ))}
        </select>
    );
}

export default JobManagement;
