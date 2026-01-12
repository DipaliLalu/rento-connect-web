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
import { activeVendor, useGetVendorList, useGetVendorRemark } from "../../../actions/vendor";
import type { Vendor } from "../../../types/vendor";
import { getUserInfo } from "../../../utils/utils";
import { getRemarkString } from "../../../utils/vendor-utils";
import { Popover, PopoverContent, PopoverTrigger } from "../../../components/ui/popover";


export default function VendorList() {
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

    const { vendor, isLoading, mutate } = useGetVendorList(categoryParam);
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
    React.useEffect(() => {
        mutate();
    }, []);

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
    const [loadingId, setLoadingId] = React.useState<number | null>(null);
    const [activeMap, setActiveMap] = React.useState<Record<number, boolean>>({});


    async function handleActiveVendor(id: number) {
        setActiveMap(prev => ({
            ...prev,
            [id]: !(prev[id] ?? false),
        }));
        setLoadingId(id);

        // 🔥 optimistic UI update
        mutate(
            (currentData) => {
                if (!currentData) return currentData;

                return {
                    ...currentData,
                    data: currentData.data.map((item: any) =>
                        item.id === id
                            ? { ...item, active: item.active === 1 ? 0 : 1 }
                            : item
                    ),
                };
            },
            false // revalidate = false so UI changes instantly
        );

        try {
            const action = "Active";
            const remark = getRemarkString(
                action,
                user?.data?.username || "Unknown"
            );
            // 🔥 backend toggle (id only)
            await activeVendor(id, remark);

            // optional: re-fetch fresh data
            mutate();
        } catch (error) {
            // ❌ rollback
            mutate();
        } finally {
            setLoadingId(null);
        }
    }


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
                // const vendor = row.original;
                const isActive = row.getValue("active") == 1;
                return (
                    <div
                        className={`px-3 py-1 text-white rounded ${isActive
                            ? "bg-green-500 hover:bg-green-600"
                            : "bg-red-500 hover:bg-red-600"
                            }`}
                    // onClick={() => handleActiveVendor(Number(vendor.id))}
                    >
                        {isActive ? "Active" : "Inactive"}
                    </div>
                );
            },
        },
        {
            accessorKey: "activeSwitch",
            header: () => <div>Active / Inactive</div>,
            cell: ({ row }) => {
                const vendor = row.original;
                const vendorId = Number(vendor?.id);
                const isActive = activeMap[vendorId] !== undefined ? activeMap[vendorId] : (Number(vendor?.active) === 1);

                return (
                    <div className="flex justify-center">
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input
                            type="checkbox"
                            disabled={loadingId == Number(vendor.id)}
                            checked={isActive}
                            onChange={() => handleActiveVendor(Number(vendor.id))}
                            className="sr-only peer"
                        />
                        <div
                            className="
                                w-11 h-6 bg-red-500 peer-focus:outline-none rounded-full
                                peer peer-checked:bg-green-500
                                after:content-[''] after:absolute after:top-[2px] after:left-[2px]
                                after:bg-white after:rounded-full after:h-5 after:w-5
                                after:transition-all
                                peer-checked:after:translate-x-full
                            "
                        ></div>
                    </label>
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
                } = useGetVendorRemark(vendorId);

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
                                Vendor Remarks
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