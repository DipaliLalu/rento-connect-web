"use client";

import * as React from "react";
import {
    type ColumnDef,
    type ColumnFiltersState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    type SortingState,
    useReactTable,
    type VisibilityState,
} from "@tanstack/react-table";
import { ArrowUpDown, ChevronDown, Loader2 } from "lucide-react";
import {
    FaAngleLeft,
    FaAngleRight,
    FaAnglesLeft,
    FaAnglesRight,
} from "react-icons/fa6";
import { deleteBooking, useGetCustomerBookingList } from "../actions/booking";
import type { Booking } from "../types/booking";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from "../components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table";
import { Label } from "../components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { getRemarkString, getVendorInfo } from "../utils/vendor-utils";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "../components/ui/dialog";
import { GoDash } from "react-icons/go";

export default function CustomerBookingList() {
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
        [],
    );
    const [deletingId, setDeletingId] = React.useState<number | null>(null);
    const [columnVisibility, setColumnVisibility] =
        React.useState<VisibilityState>({});
    const [rowSelection, setRowSelection] = React.useState({});
    const user = getVendorInfo();
    const { bookings, isLoading, mutate } = useGetCustomerBookingList(Number(user?.id));
    const [openCancelDialog, setOpenCancelDialog] = React.useState(false);
    const [selectedBooking, setSelectedBooking] = React.useState<Booking | null>(null);
    const [reason, setReason] = React.useState("");


    // 🧹 Deletion logic (with revalidation)
    async function handleConfirmCancel() {
        if (!selectedBooking?.id) return;

        if (!reason.trim()) {
            alert("Please enter cancellation reason");
            return;
        }

        setDeletingId(selectedBooking.id);

        const payload = {
            remark: getRemarkString(
                "Cancelled",
                user?.name || "Unknown"
            ),
            reason,
        };

        try {
            await deleteBooking(selectedBooking.id, payload);
            setOpenCancelDialog(false);
            await mutate(); // refresh list

            setSelectedBooking(null);
            setReason("");
        } catch (error) {
            console.error("Delete failed:", error);
        } finally {
            setDeletingId(null);
        }
    }


    const columns: ColumnDef<Booking>[] = [
        {
            accessorKey: "id",
            header: "Index",
            cell: ({ row }) => <div>{row.index + 1}</div>,
        },
        {
            accessorKey: "name",
            header: ({ column }) => (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Name
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            ),
            cell: ({ row }) => <div>{row.getValue("name")}</div>,
        },
        {
            accessorKey: "contact",
            header: () => <div>Contact</div>,
        },
        {
            accessorKey: "email",
            header: () => <div>Email</div>,
        },
        {
            accessorKey: "subcategory",
            header: "Sub Category",
            cell: ({ row }) => <div>{row.getValue("subcategory")}</div>,
        },
        {
            accessorKey: "location",
            header: "Location",
            cell: ({ row }) => <div>{row.getValue("location")}</div>,
        },
        {
            accessorKey: "startDate",
            header: "Start Date",
            cell: ({ row }) => <div>{row.getValue("startDate")}</div>,
        },
        {
            accessorKey: "endDate",
            header: "End Date",
            cell: ({ row }) => <div>{row.getValue("endDate")}</div>,
        },
        {
            accessorKey: "status",
            header: () => <div>Status</div>,
            cell: ({ row }) => {
                const active = row.original.active;
                const deleted = row.original.deleted;

                let label = "Pending";
                let className = "bg-gray-500";

                if (Number(deleted) === 1) {
                    label = "Cancelled";
                    className = "bg-red-500";
                } else if (Number(active) === 1) {
                    label = "Approval";
                    className = "bg-green-500";
                }

                return (
                    <div
                        className={`px-1 py-2 text-white rounded text-center font-semibold ${className}`}
                    >
                        {label}
                    </div>
                );
            },
        },
        {
            id: "actions",
            header: "Actions",
            cell: ({ row }) => {
                const booking = row.original;

                // ❌ Already cancelled → show "-"
                if (Number(booking.deleted) === 1) {
                    return <div className="flex justify-center mr-5"><GoDash size={24}/></div>;
                }

                // ✅ Not deleted → show Cancel button
                return (
                    <Button
                        variant="destructive"
                        onClick={() => {
                            setSelectedBooking(booking);
                            setReason("");
                            setOpenCancelDialog(true);
                        }}
                    >
                        Cancel
                    </Button>
                );
            },
        }


    ];

    const table = useReactTable({
        data: bookings || [],
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
        initialState: {
            pagination: {
                pageSize: 10,
            },
        },
    });

    if (isLoading) return <div>Loading...</div>;

    return (
        <div className="w-full p-4 bg-white/30 py-5 px-5 md:px-10" >
            <h2 className="text-2xl font-semibold">Booking List</h2>
            <Dialog open={openCancelDialog} onOpenChange={setOpenCancelDialog}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Cancel Booking</DialogTitle>
                    </DialogHeader>

                    <div className="space-y-2">
                        <Label>Cancellation Reason</Label>
                        <Input
                            placeholder="Enter reason"
                            value={reason}
                            onChange={(e) => setReason(e.target.value)}
                        />
                    </div>

                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={() => setOpenCancelDialog(false)}
                        >
                            Close
                        </Button>

                        <Button
                            variant="destructive"
                            onClick={handleConfirmCancel}
                            disabled={deletingId === selectedBooking?.id}
                        >
                            {deletingId === selectedBooking?.id ? (
                                <span className="flex items-center gap-2">
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                    Cancelling...
                                </span>
                            ) : (
                                "Confirm Cancel"
                            )}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Filter + Columns */}
            <div className="flex items-center py-4 gap-4">
                <Input
                    placeholder="Filter name..."
                    value={
                        (table.getColumn("name")?.getFilterValue() as string) ?? ""
                    }
                    onChange={(e) =>
                        table.getColumn("name")?.setFilterValue(e.target.value)
                    }
                    className="max-w-sm"
                />
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="ml-auto">
                            Columns <ChevronDown className="ml-2 h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        {table
                            .getAllColumns()
                            .filter((col) => col.getCanHide())
                            .map((col) => (
                                <DropdownMenuCheckboxItem
                                    key={col.id}
                                    checked={col.getIsVisible()}
                                    onCheckedChange={(val) => col.toggleVisibility(!!val)}
                                    className="capitalize"
                                >
                                    {col.id}
                                </DropdownMenuCheckboxItem>
                            ))}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            {/* Table */}
            <div className="w-full overflow-x-auto! rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((group) => (
                            <TableRow key={group.id}>
                                {group.headers.map((header) => (
                                    <TableHead key={header.id}>
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                header.column.columnDef.header,
                                                header.getContext(),
                                            )}
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow key={row.id}>
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext(),
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="text-center">
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-end py-4 space-x-2">
                <div className="text-sm flex-1 text-muted-foreground">
                    {table.getFilteredSelectedRowModel().rows.length} of{" "}
                    {table.getFilteredRowModel().rows.length} row(s) selected.
                </div>
                <div className="flex w-full items-center gap-8 lg:w-fit">
                    <div className="hidden items-center gap-2 lg:flex">
                        <Label htmlFor="rows-per-page">Rows per page</Label>
                        <Select
                            value={`${table.getState().pagination.pageSize}`}
                            onValueChange={(val) => table.setPageSize(Number(val))}
                        >
                            <SelectTrigger className="w-20" id="rows-per-page" size="sm">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent side="top">
                                {[5, 10, 20, 30, 40, 50].map((size) => (
                                    <SelectItem key={size} value={`${size}`}>
                                        {size}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="text-sm font-medium">
                        Page {table.getState().pagination.pageIndex + 1} of{" "}
                        {table.getPageCount()}
                    </div>
                    <div className="ml-auto flex gap-2 items-center lg:ml-0">
                        <Button
                            variant="outline"
                            className="hidden h-8 w-8 p-0 lg:flex"
                            onClick={() => table.setPageIndex(0)}
                            disabled={!table.getCanPreviousPage()}
                        >
                            <FaAnglesLeft />
                        </Button>
                        <Button
                            variant="outline"
                            className="size-8"
                            onClick={() => table.previousPage()}
                            disabled={!table.getCanPreviousPage()}
                        >
                            <FaAngleLeft />
                        </Button>
                        <Button
                            variant="outline"
                            className="size-8"
                            onClick={() => table.nextPage()}
                            disabled={!table.getCanNextPage()}
                        >
                            <FaAngleRight />
                        </Button>
                        <Button
                            variant="outline"
                            className="hidden size-8 lg:flex"
                            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                            disabled={!table.getCanNextPage()}
                        >
                            <FaAnglesRight />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
