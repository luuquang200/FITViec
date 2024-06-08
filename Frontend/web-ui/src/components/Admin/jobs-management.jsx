import React, { useState, useMemo } from "react";
import Container from "@/components/layout/container";
import { useTable, usePagination, useSortBy, useFilters } from "react-table";
import {
    ChevronLeftIcon,
    ChevronRightIcon,
    EyeIcon,
    CheckIcon,
    XIcon,
} from "@heroicons/react/solid";
import { jobData } from "./data";
import Modal from "./modal";

const JobManagement = () => {
    const [selectedJob, setSelectedJob] = useState(null);
    const [filterInput, setFilterInput] = useState("");

    const data = useMemo(() => jobData, []);

    const columns = useMemo(
        () => [
            {
                Header: "Title",
                accessor: "title",
            },
            {
                Header: "Recruiter",
                accessor: "recruiter",
                Filter: ColumnFilter,
            },
            {
                Header: "Post Date",
                accessor: "date",
                Cell: ({ value }) => new Date(value).toLocaleDateString(),
            },
            {
                Header: "Status",
                accessor: "status",
            },
            {
                Header: "Action",
                Cell: ({ row }) => (
                    <div className="flex items-center space-x-2">
                        <EyeIcon
                            className="h-5 w-5 cursor-pointer text-blue-500"
                            onClick={() => setSelectedJob(row.original)}
                        />
                    </div>
                ),
            },
        ],
        [],
    );

    const handleApprove = (id) => {
        console.log(`Approved job with ID: ${id}`);
        setSelectedJob((prev) => ({ ...prev, status: "approved" }));
    };

    const handleRemove = (id) => {
        console.log(`Removed job with ID: ${id}`);
        setSelectedJob(null);
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
        setFilter("recruiter", value);
        setFilterInput(value);
    };

    return (
        <Container className="py-16 pt-8">
            <div className="mb-4 flex items-center justify-between">
                <h3 className="text-2xl font-bold text-gray-900">
                    Job Posts Management
                </h3>
            </div>
            <div className="mb-4">
                <input
                    value={filterInput}
                    onChange={handleFilterChange}
                    placeholder={"Search by Recruiter"}
                    className="w-full rounded-lg border px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
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
                    {page.map((row) => {
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
                    })}
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
            {selectedJob && (
                <Modal onClose={() => setSelectedJob(null)}>
                    <div className="rounded-lg bg-white p-4 shadow-md">
                        <p className="text-sm text-gray-700">
                            <strong>Job Title:</strong> {selectedJob.title}
                        </p>
                        <p className="text-sm text-gray-700">
                            <strong>Recruiter:</strong> {selectedJob.recruiter}
                        </p>
                        <p className="text-sm text-gray-700">
                            <strong>Post Date:</strong>{" "}
                            {new Date(selectedJob.date).toLocaleDateString()}
                        </p>
                        <p className="text-sm text-gray-700">
                            <strong>Status:</strong> {selectedJob.status}
                        </p>
                        {selectedJob.status !== "approved" && (
                            <button
                                onClick={() => handleApprove(selectedJob.id)}
                                className="mr-4 mt-4 rounded-lg bg-green-500 px-4 py-2 text-white"
                            >
                                Approve Job
                            </button>
                        )}
                        <button
                            onClick={() => handleRemove(selectedJob.id)}
                            className="mt-4 rounded-lg bg-red-500 px-4 py-2 text-white"
                        >
                            Remove Job
                        </button>
                    </div>
                </Modal>
            )}
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
            onChange={(e) => {
                setFilter(e.target.value || undefined);
            }}
            placeholder={`Search ${count} records...`}
            className="w-full rounded-lg border px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
    );
}

export default JobManagement;
