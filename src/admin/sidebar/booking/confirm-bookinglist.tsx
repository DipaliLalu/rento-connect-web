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
import { ArrowUpDown, ChevronDown } from "lucide-react";
import {
    FaAngleLeft,
    FaAngleRight,
    FaAnglesLeft,
    FaAnglesRight,
} from "react-icons/fa6";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from "../../../components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../../components/ui/table";
import { Label } from "../../../components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../components/ui/select";
import { createBookingRemark, useGetActiveBookingList, useGetBookingRemark } from "../../../actions/booking";
import type { Booking } from "../../../types/booking";
import { getUserInfo } from "../../../utils/utils";
import { getRemarkString } from "../../../utils/vendor-utils";
import BookingDetailDialog from "./booking-detail-dialog";
import { Popover, PopoverContent, PopoverTrigger } from "../../../components/ui/popover";


export default function ActiveBookinglist() {
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
        [],
    );
    const [columnVisibility, setColumnVisibility] =
        React.useState<VisibilityState>({});
    const [rowSelection, setRowSelection] = React.useState({});
    const { bookings, isLoading } = useGetActiveBookingList();
    const user = getUserInfo();
    // const navigate = useNavigate();

    // user roles normalized to lowercase
    const userRoles: string[] = (user?.data?.roles ?? []).map((r: string) =>
        String(r).toLowerCase()
    );

    const categories = React.useMemo(() => {
        const list = bookings?.map((b) => b.category ?? "") ?? [];
        const unique = Array.from(new Set(list));

        // HR → show all categories + "all"
        if (userRoles.includes("hr")) {
            return ["all", ...unique];
        }

        // Normal user → show only categories matching userRoles
        const filtered = unique.filter((cat) =>
            userRoles.includes(String(cat).toLowerCase())
        );

        return filtered;
    }, [bookings, userRoles]);

    const [selectedCategory, setSelectedCategory] = React.useState("all");

    const filteredBookings = React.useMemo(() => {
        if (selectedCategory === "all") return bookings || [];
        return (bookings || []).filter((b) => b.category === selectedCategory);
    }, [bookings, selectedCategory]);

    const didSetDefault = React.useRef(false);

    React.useEffect(() => {
        if (!categories.length) return;
        if (didSetDefault.current) return; // ❗ stop overriding after first time

        if (userRoles.includes("hr")) {
            setSelectedCategory("all");
        } else {
            setSelectedCategory(categories[0]);
        }

        didSetDefault.current = true; // prevent future overrides
    }, [categories, userRoles]);

    // // 🧹 Deletion logic (with revalidation)
    // async function handleDelete(id: number) {
    //     await deleteBooking(id);
    //     await mutate(); // refetch SWR
    // }
    const [viewBooking, setViewBooking] = React.useState(false);
    const [bookingDetail, setBookingDetail] = React.useState<Booking | null>(null);

    async function handleBookingView(booking: Booking) {
        setBookingDetail(booking);
        setViewBooking(true);

        const action = "Viewed Booking Details";
        const remark = getRemarkString(
            action,
            user?.data?.username || "Unknown"
        );

        try {
            await createBookingRemark({
                booking_id: booking.id as number,
                remark,
            });
        } catch (err) {
            console.error(err);
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
            header: "Sub Services",
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
            accessorKey: "active",
            header: () => <div>Status</div>,
            cell: ({ row }) => {
                const isActive = row.getValue("active") == 1;
                return (
                    <div
                        className={`px-3 py-2 font-semibold text-white rounded  ${isActive
                            ? "bg-green-500 "
                            : "bg-gray-500 "
                            }`}
                    >
                        {isActive ? "Booked" : "Pendding"}
                    </div>
                );
            },
        },
        {
            id: "actions",
            header: "Actions",
            cell: ({ row }) => {
                const booking = row.original;
                return (
                    <div className="flex gap-2">
                        <Button
                            onClick={() => handleBookingView(booking)}
                            variant="outline"
                        >
                            view Details
                        </Button>
                    </div>
                );
            },
        },
        {
            id: "remark",
            header: "Remark",
            cell: ({ row }) => {
                const vendorId = Number(row.original.id);

                const {
                    vendorRemark,
                    isLoading,
                    mutate,
                } = useGetBookingRemark(vendorId);

                return (
                    <Popover
                        onOpenChange={(open) => {
                            if (open) {
                                mutate(); // 🔥 refetch latest remarks
                            }
                        }}
                    >
                        <PopoverTrigger asChild>
                            <Button size="sm" variant="outline">
                                View Remarks
                            </Button>
                        </PopoverTrigger>

                        <PopoverContent className="w-96 max-h-64 overflow-y-auto">
                            <h4 className="font-semibold mb-2 text-sm">
                                Booking Remarks
                            </h4>

                            {isLoading ? (
                                <div className="text-sm">Loading...</div>
                            ) : Array.isArray(vendorRemark) && vendorRemark.length > 0 ? (
                                <div className="space-y-2">
                                    {vendorRemark.map((item) => (
                                        <div
                                            key={item.id}
                                            className="p-2 border rounded text-sm bg-muted"
                                        >
                                            {item.remark}
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-sm text-muted-foreground">
                                    No remarks found
                                </div>
                            )}
                        </PopoverContent>
                    </Popover>
                );
            },
        }
    ];

    const table = useReactTable({
        data: filteredBookings || [],
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
        <div className="w-full p-4">
            <BookingDetailDialog
                open={viewBooking}
                onClose={() => setViewBooking(false)}
                booking={bookingDetail}
            />

            {/* Filter + Columns */}
            <div className="flex items-center py-4 gap-4">

                {/* Search Filter */}
                <Input
                    placeholder="Filter by name..."
                    value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
                    onChange={(e) =>
                        table.getColumn("name")?.setFilterValue(e.target.value)
                    }
                    className="max-w-sm"
                />

                {/* RIGHT SIDE OPTIONS */}
                <div className="ml-auto flex items-center gap-4">

                    {/* Category Dropdown */}
                    <Select
                        value={selectedCategory}
                        onValueChange={(value) => setSelectedCategory(value)}
                    >
                        <SelectTrigger className="w-[200px]">
                            <SelectValue placeholder="Select Category" />
                        </SelectTrigger>

                        <SelectContent>
                            {categories.length === 0 ? (
                                <div className="px-3 py-2 text-sm text-muted-foreground">
                                    No categories available
                                </div>
                            ) : (
                                categories.map((cat) => (
                                    <SelectItem key={cat} value={cat}>
                                        {cat === "all" ? "All Categories" : cat}
                                    </SelectItem>
                                ))
                            )}
                        </SelectContent>
                    </Select>

                    {/* Columns Dropdown */}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline">
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
