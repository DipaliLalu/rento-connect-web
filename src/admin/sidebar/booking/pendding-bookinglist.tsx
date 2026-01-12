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
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../../../components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../../components/ui/table";
import { Label } from "../../../components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../components/ui/select";
import { activeBooking, deleteBooking, useGetActiveBookingList, useGetBookingList, useGetBookingRemark } from "../../../actions/booking";
import type { Booking } from "../../../types/booking";
import { getUserInfo } from "../../../utils/utils";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../../../components/ui/card";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { getRemarkString } from "../../../utils/vendor-utils";
import { Popover, PopoverContent, PopoverTrigger } from "../../../components/ui/popover";


export default function BookingList() {
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
        [],
    );
    const [columnVisibility, setColumnVisibility] =
        React.useState<VisibilityState>({});
    const [rowSelection, setRowSelection] = React.useState({});
    const { bookings, isLoading, mutate } = useGetBookingList();
    const { mutate: activeMutate } = useGetActiveBookingList();
    const user = getUserInfo();
    // const navigate = useNavigate();

    const [openBooked, setOpenBooked] = React.useState(false);
    const [openCancelled, setOpenCancelled] = React.useState(false);
    const [selectedBooking, setSelectedBooking] = React.useState<Booking | null>(null);

    // form states
    const [isSubmitting, setIsSubmitting] = React.useState(false);
    const [pricePerDay, setPricePerDay] = React.useState("");
    const [pricePerHour, setPricePerHour] = React.useState("");
    const [pdfFile, setPdfFile] = React.useState<File | null>(null);
    const [reason, setReason] = React.useState("");
    // user roles normalized to lowercase
    const userRoles: string[] = (user?.data?.roles ?? []).map((r: string) =>
        String(r).toLowerCase()
    );
    // Extract unique categories from bookings
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

    // 🧹 Deletion logic (with revalidation)
    // async function handleDelete(id: number) {
    //     await deleteBooking(id);
    //     await mutate(); // refetch SWR
    // }

    async function handleConfirmBooking() {
        if (!selectedBooking || !selectedBooking.id) return;

        if (!pricePerDay && !pricePerHour) {
            alert("Enter price per day or price per hour");
            return;
        }
        // ✅ PDF required validation
        if (!pdfFile) {
            alert("Final quotation PDF is required");
            return;
        }

        // ✅ Only PDF validation
        if (pdfFile.type !== "application/pdf") {
            alert("Only PDF file is allowed");
            return;
        }
        setIsSubmitting(true); // 🔥 START loading

        const formData = new FormData();

        const action = "Booked";
        const remark = getRemarkString(
            action,
            user?.data?.username || "Unknown"
        );
        formData.append("remark", remark);
        if (pricePerDay) {
            formData.append("final_booking_price_perday", pricePerDay);
        }
        if (pricePerHour) {
            formData.append("final_booking_price_perhour", pricePerHour);
        }
        if (pdfFile) {
            formData.append("final_quotation_upload", pdfFile);
        }

        try {
            await activeBooking(selectedBooking.id, formData);

            // 🔄 Refresh tables
            await mutate();
            await activeMutate();

            setOpenBooked(false);
            setSelectedBooking(null);
        } catch (err) {
            console.error(err);
            alert("Something went wrong");
        } finally {
            setIsSubmitting(false); // 🔥 STOP loading
        }
    }

    async function handleCancelBooking() {
        if (!selectedBooking?.id) return;

        if (!reason.trim()) {
            alert("Please enter cancellation reason");
            return;
        }

        setIsSubmitting(true);

        const payload = {
            remark: getRemarkString(
                "Cancelled",
                user?.data?.username || "Unknown"
            ),
            reason,
        };

        try {
            await deleteBooking(selectedBooking.id, payload);

            await mutate();
            await activeMutate();

            setOpenCancelled(false);
            setSelectedBooking(null);
            setReason("");
        } catch (err) {
            console.error(err);
        } finally {
            setIsSubmitting(false);
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
            header: "Sub Service",
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
                // const vendor = row.original;
                const isActive = row.getValue("active") == 1;
                return (
                    <div
                        className={`px-3 py-2 font-semibold text-white rounded ${isActive
                            ? "bg-green-500 hover:bg-green-600"
                            : "bg-gray-500 hover:bg-gray-600"
                            }`}
                    // onClick={() => handleActiveVendor(Number(vendor.id))}
                    >
                        {isActive ? "Booked" : "Pending"}
                    </div>
                );
            },
        },
        {
            id: "actions",
            header: "Actions",
            cell: ({ row }) => {
                const vendor = row.original;

                return (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="sm">
                                Action
                            </Button>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent align="end">
                            <DropdownMenuItem
                                onClick={() => {
                                    setSelectedBooking(vendor);
                                    setOpenBooked(true);
                                }}
                            >
                                Booked
                            </DropdownMenuItem>

                            <DropdownMenuItem
                                onClick={() => {
                                    setSelectedBooking(vendor);
                                    setOpenCancelled(true);
                                }}
                            >
                                Cancelled
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
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
        <div className="w-full p-4 relative">
            {openBooked && selectedBooking && (
                <Card className="w-full max-w-lg absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 shadow-lg max-h-[80vh] overflow-y-auto py-0">
                    <CardHeader className="flex flex-row items-center justify-between sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 p-4 pt-5">
                        <CardTitle className="text-blue-950 text-xl font-bold">
                            Booking Confirmation
                        </CardTitle>
                        <IoIosCloseCircleOutline
                            size={30}
                            className="text-primary cursor-pointer"
                            onClick={() => setOpenBooked(false)}
                        />
                    </CardHeader>

                    <CardContent>
                        <form className="grid grid-cols-1 md:grid-cols-2 gap-4">

                            {/* Name (readonly) */}
                            <div className="flex flex-col gap-2">
                                <Label className="text-secondary-foreground/75">Name</Label>
                                <Input value={selectedBooking.name} disabled />
                            </div>

                            {/* Email */}
                            <div className="flex flex-col gap-2">
                                <Label className="text-secondary-foreground/75">Email</Label>
                                <Input value={selectedBooking.email} disabled />
                            </div>

                            {/* contact (readonly) */}
                            <div className="flex flex-col gap-2">
                                <Label className="text-secondary-foreground/75">Contact</Label>
                                <Input value={selectedBooking.contact} disabled />
                            </div>

                            {/* sub services */}
                            <div className="flex flex-col gap-2">
                                <Label className="text-secondary-foreground/75">Sub Services</Label>
                                <Input value={selectedBooking.subcategory} disabled />
                            </div>

                            {/* start date (readonly) */}
                            <div className="flex flex-col gap-2">
                                <Label className="text-secondary-foreground/75">Start Date</Label>
                                <Input value={selectedBooking.startDate} disabled />
                            </div>

                            {/* end date (readonly) */}
                            <div className="flex flex-col gap-2">
                                <Label className="text-secondary-foreground/75">End Date</Label>
                                <Input value={selectedBooking.endDate} disabled />
                            </div>

                            {/* Price Per Day */}
                            <div className="flex flex-col gap-2">
                                <Label className="text-secondary-foreground/75">Price Per Day</Label>
                                <Input
                                    type="number"
                                    value={pricePerDay}
                                    onChange={(e) => setPricePerDay(e.target.value)}
                                    placeholder="Enter per day price"
                                />
                            </div>

                            {/* Price Per Hour */}
                            <div className="flex flex-col gap-2">
                                <Label className="text-secondary-foreground/75">Price Per Hour</Label>
                                <Input
                                    type="number"
                                    value={pricePerHour}
                                    onChange={(e) => setPricePerHour(e.target.value)}
                                    placeholder="Enter per hour price"
                                />
                            </div>

                            {/* PDF Upload */}
                            <div className="flex flex-col gap-2 col-span-2">
                                <Label className="text-secondary-foreground/75">Final Quotation (PDF)</Label>
                                <Input
                                    type="file"
                                    accept="application/pdf"
                                    onChange={(e) => setPdfFile(e.target.files?.[0] || null)}
                                />
                            </div>
                        </form>
                    </CardContent>

                    <CardFooter className="flex flex-col md:flex-row  gap-2 justify-end mb-5 w-full ">
                        <Button
                            className="w-1/2"
                            onClick={handleConfirmBooking}
                            disabled={isSubmitting}
                        >
                            {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
                            {isSubmitting ? "Submitting..." : "Confirm Booking"}
                        </Button>

                        <Button className="w-1/2" variant="outline" onClick={() => setOpenBooked(false)}>
                            Cancel
                        </Button>

                    </CardFooter>
                </Card>
            )}
            {openCancelled && selectedBooking && (
                <Card className="w-full max-w-lg absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 shadow-lg max-h-[80vh] overflow-y-auto py-0">
                    <CardHeader className="flex flex-row items-center justify-between sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 p-4 pt-5">
                        <CardTitle className="text-blue-950 text-xl font-bold">
                            Booking Cancellation
                        </CardTitle>
                        <IoIosCloseCircleOutline
                            size={30}
                            className="text-primary cursor-pointer"
                            onClick={() => setOpenCancelled(false)}
                        />
                    </CardHeader>

                    <CardContent>
                        <form className="grid grid-cols-1 md:grid-cols-2 gap-4">

                            {/* Name (readonly) */}
                            <div className="flex flex-col gap-2">
                                <Label className="text-secondary-foreground/75">Name</Label>
                                <Input value={selectedBooking.name} disabled />
                            </div>

                            {/* Email */}
                            <div className="flex flex-col gap-2">
                                <Label className="text-secondary-foreground/75">Email</Label>
                                <Input value={selectedBooking.email} disabled />
                            </div>

                            {/* contact (readonly) */}
                            <div className="flex flex-col gap-2">
                                <Label className="text-secondary-foreground/75">Contact</Label>
                                <Input value={selectedBooking.contact} disabled />
                            </div>

                            {/* sub services */}
                            <div className="flex flex-col gap-2">
                                <Label className="text-secondary-foreground/75">Sub Services</Label>
                                <Input value={selectedBooking.subcategory} disabled />
                            </div>

                            {/* start date (readonly) */}
                            <div className="flex flex-col gap-2">
                                <Label className="text-secondary-foreground/75">Start Date</Label>
                                <Input value={selectedBooking.startDate} disabled />
                            </div>

                            {/* end date (readonly) */}
                            <div className="flex flex-col gap-2">
                                <Label className="text-secondary-foreground/75">End Date</Label>
                                <Input value={selectedBooking.endDate} disabled />
                            </div>

                            {/* reason */}
                            <div className="flex flex-col col-span-2 gap-2">
                                <Label className="text-secondary-foreground/75">Reason</Label>
                                <Input
                                    type="text"
                                    value={reason}
                                    onChange={(e) => setReason(e.target.value)}
                                    placeholder="Enter reason"
                                />
                            </div>
                        </form>
                    </CardContent>

                    <CardFooter className="flex flex-col md:flex-row  gap-2 justify-end mb-5 w-full ">
                        <Button
                            className="w-1/2"
                            onClick={handleCancelBooking}
                            disabled={isSubmitting}
                        >
                            {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
                            {isSubmitting ? "Submitting..." : "Confirm Cancellation"}
                        </Button>

                        <Button className="w-1/2" variant="outline" onClick={() => setOpenCancelled(false)}>
                            Cancel
                        </Button>

                    </CardFooter>
                </Card>
            )}

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
