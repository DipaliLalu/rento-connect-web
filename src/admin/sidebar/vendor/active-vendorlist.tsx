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
import { useGetActiveVendorList } from "../../../actions/vendor";
import type { Vendor } from "../../../types/vendor";
import { getUserInfo } from "../../../utils/utils";


export default function ActiveVendorlist() {
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
        [],
    );
    const [columnVisibility, setColumnVisibility] =
        React.useState<VisibilityState>({});
    const [rowSelection, setRowSelection] = React.useState({});
    const user = getUserInfo();
    const categoryParam = Array.isArray(user?.data.roles)
        ? user?.data.roles.join(',').toLowerCase() // e.g. ["HR", "Admin"] → "HR,Admin"
        : user?.data.roles;
    const { vendor, isLoading } = useGetActiveVendorList(categoryParam);
    // const navigate = useNavigate();
    const userRoles: string[] = (user?.data?.roles ?? []).map((r: string) =>
        String(r).toLowerCase()
    );

    const categories = React.useMemo(() => {
        const list = vendor?.map((b) => b.category ?? "") ?? [];
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
    }, [vendor, userRoles]);

    const [selectedCategory, setSelectedCategory] = React.useState("all");

    // Filter vendor data by category
    const filteredData = React.useMemo(() => {
        if (selectedCategory === "all") return vendor || [];
        return (vendor || []).filter((v) => v.category === selectedCategory);
    }, [vendor, selectedCategory]);

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
    //     await deleteCategory(id);
    //     await mutate(); // refetch SWR
    // }

    const columns: ColumnDef<Vendor>[] = [
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
            accessorKey: "alternativecontact",
            header: () => <div>Alternative Contact</div>,
        },
        {
            accessorKey: "email",
            header: () => <div>Email</div>,
        },
        {
            accessorKey: "category",
            header: "Category",
            cell: ({ row }) => <div>{row.getValue("category")}</div>,
        },
        // {
        //     accessorKey: "subCategory",
        //     header: "Sub Category",
        //     cell: ({ row }) => <div>{row.getValue("subCategory")}</div>,
        // },
        {
            accessorKey: "location",
            header: "Location",
            cell: ({ row }) => <div>{row.getValue("location")}</div>,
        },
        {
            accessorKey: "active",
            header: () => <div>Status</div>,
            cell: ({ row }) => {
                const isActive = row.getValue("active") == 1;
                return (
                    <Button
                        className={`px-3 py-1 text-white rounded cursor-not-allowed ${isActive
                            ? "bg-green-500 hover:bg-green-600"
                            : "bg-red-500 hover:bg-red-600"
                            }`}
                    >
                        {isActive ? "Active" : "Inactive"}
                    </Button>
                );
            },
        },
        // {
        //     id: "actions",
        //     header: "Actions",
        //     cell: ({ row }) => {
        //         const vendor = row.original;
        //         return (
        //             <div className="flex gap-2">
        //                 <Button
        //                     onClick={() => handleDelete(Number(vendor.id))}
        //                     variant="destructive"
        //                 >
        //                     Delete
        //                 </Button>
        //             </div>
        //         );
        //     },
        // },
    ];

    const table = useReactTable({
        data: filteredData || [],
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
            {/* ---------------- FILTER BAR ---------------- */}
            <div className="flex items-center py-4 gap-4 w-full">

                {/* Search Input */}
                <Input
                    placeholder="Search by vendor name..."
                    value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
                    onChange={(e) =>
                        table.getColumn("name")?.setFilterValue(e.target.value)
                    }
                    className="max-w-sm"
                />

                {/* RIGHT SIDE — Category + Columns */}
                <div className="flex items-center gap-4 ml-auto">

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
