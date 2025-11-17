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
import { useNavigate } from "react-router-dom";
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../components/ui/select";

import { deleteSubCategory, useGetSubCategory } from "../../../actions/subcategory";
import type { SubCategory } from "../../../types/subcategory";
import { getUserInfo } from "../../../utils/utils";


export default function CategoryList() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const { subcategory, isLoading, mutate } = useGetSubCategory();
  const navigate = useNavigate();
  const user = getUserInfo();

  // user roles normalized to lowercase
  const userRoles: string[] = (user?.data?.roles ?? []).map((r: string) =>
    String(r).toLowerCase()
  );

  const categories = React.useMemo(() => {
    const list = subcategory?.map((b) => b.category_slug ?? "") ?? [];
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
  }, [subcategory, userRoles]);

  const [selectedCategory, setSelectedCategory] = React.useState("all");

  const filteredData = React.useMemo(() => {
    if (selectedCategory === "all") return subcategory || [];
    return (subcategory || []).filter((b) => b.category_slug === selectedCategory);
  }, [subcategory, selectedCategory]);

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


  // Delete API
  async function handleDelete(id: number) {
    await deleteSubCategory(id);
    await mutate();
  }

  const columns: ColumnDef<SubCategory>[] = [
    {
      accessorKey: "subcategory_id",
      header: "Index",
      cell: ({ row }) => <div>{row.index + 1}</div>,
    },
    {
      accessorKey: "subcategory_name",
      header: ({ column }) => (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Name <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => <div>{row.getValue("subcategory_name")}</div>,
    },
    {
      accessorKey: "category_slug",
      header: () => <div>Service Name</div>,
    },
    {
      accessorKey: "heading",
      header: () => <div>Heading</div>,
    },
    {
      accessorKey: "description",
      header: () => <div>Description</div>,
      cell: ({ row }) => (
        <div style={{ width: "300px", whiteSpace: "pre-wrap" }}>{row.original.description}</div>
      ),
    },
    {
      accessorKey: "subcategory_image",
      header: () => <div>Image</div>,
      cell: ({ row }) => {
        const image = row.getValue("subcategory_image");
        if (!image) return <div className="text-gray-400 italic">No image</div>;
        const imageURL = `${import.meta.env.VITE_URL}/${image}`;
        return <img src={imageURL} alt="Category" className="w-14 h-14 object-cover border rounded" />;
      },
    },
    {
      accessorKey: "active",
      header: () => <div>Status</div>,
      cell: ({ row }) => {
        const isActive = row.getValue("active") == 1;
        return (
          <Button className={`px-3 py-1 text-white rounded cursor-not-allowed ${isActive ? "bg-green-500 hover:bg-green-600" : "bg-red-500 hover:bg-red-600"}`}>
            {isActive ? "Active" : "Inactive"}
          </Button>
        );
      },
    },
    {
      accessorKey: "metadata",
      header: () => <div>Meta Data</div>,
    },
    {
      accessorKey: "metatag",
      header: () => <div>Meta Tags</div>,
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const sub = row.original;
        const canDelete = userRoles.includes(String(sub.category_slug ?? "").toLowerCase()) || userRoles.includes("hr");
        return (
          <div className="flex gap-2">
            <Button onClick={() => navigate("/dashboard/subcategory", { state: { subcategory: sub } })} variant="secondary">
              Edit
            </Button>

            {canDelete && (
              <Button onClick={() => handleDelete(Number(sub.subcategory_id))} variant="destructive">
                Delete
              </Button>
            )}
          </div>
        );
      },
    },
  ];

  const table = useReactTable({
    data: filteredData,
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
      {/* ---------------- Filter Section ---------------- */}
      <div className="flex items-center py-4 gap-4 w-full">
        {/* Search Filter */}
        <Input
          placeholder="Filter by name..."
          value={(table.getColumn("subcategory_name")?.getFilterValue() as string) ?? ""}
          onChange={(e) => table.getColumn("subcategory_name")?.setFilterValue(e.target.value)}
          className="max-w-sm"
        />

        <div className="flex items-center gap-4 ml-auto">
          {/* Category Dropdown Filter */}
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
              {table.getAllColumns()
                .filter((col) => col.getCanHide())
                .map((col) => (
                  <DropdownMenuCheckboxItem key={col.id} checked={col.getIsVisible()} onCheckedChange={(val) => col.toggleVisibility(!!val)} className="capitalize">
                    {col.id}
                  </DropdownMenuCheckboxItem>
                ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* ---------------- Table ---------------- */}
      <div className="w-full overflow-x-auto rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((group) => (
              <TableRow key={group.id}>
                {group.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
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
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
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

      {/* ---------------- Pagination ---------------- */}
      <div className="flex items-center justify-end py-4 space-x-2">
        <div className="flex w-full items-center gap-8 lg:w-fit">
          <div className="text-sm font-medium">
            Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
          </div>

          <div className="ml-auto flex gap-2 items-center lg:ml-0">
            <Button variant="outline" className="hidden h-8 w-8 p-0 lg:flex" onClick={() => table.setPageIndex(0)} disabled={!table.getCanPreviousPage()}>
              <FaAnglesLeft />
            </Button>

            <Button variant="outline" className="size-8" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
              <FaAngleLeft />
            </Button>

            <Button variant="outline" className="size-8" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
              <FaAngleRight />
            </Button>

            <Button variant="outline" className="hidden size-8 lg:flex" onClick={() => table.setPageIndex(table.getPageCount() - 1)} disabled={!table.getCanNextPage()}>
              <FaAnglesRight />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
