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
import DOMPurify from "dompurify";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from "../../../components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../../components/ui/table";
import { Label } from "../../../components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../components/ui/select";
import { deleteBlog, useGetBlogs } from "../../../actions/blog";
import type { Blogs } from "../../../types/blogs";


export default function CategoryList() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const { blogs, isLoading, mutate } = useGetBlogs();
  const navigate = useNavigate();

  // 🧹 Deletion logic (with revalidation)
  async function handleDelete(id: number) {
    await deleteBlog(id);
    await mutate(); // refetch SWR
  }

  const columns: ColumnDef<Blogs>[] = [
    {
      accessorKey: "id",
      header: "Index",
      cell: ({ row }) => <div>{row.index + 1}</div>,
    },
    {
      accessorKey: "title",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Title
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => <div>{row.getValue("title")}</div>,
    },
    {
      accessorKey: "description",
      header: "Description",
      cell: ({ row }) => {
        const rawHTML = row.getValue("description") as string
        const cleanHTML = DOMPurify.sanitize(rawHTML)

        const truncatedText =
          cleanHTML.length > 100 ? cleanHTML.slice(0, 300) + "..." : cleanHTML

        return (
          <div
            className=""
            style={{ width: "300px", whiteSpace: "pre-wrap", }}
            dangerouslySetInnerHTML={{ __html: truncatedText }}
          />
        )
      },
    },
    {
      accessorKey: "image",
      header: () => <div>Image</div>,
      cell: ({ row }) => {
        const image = row.getValue("image");
        if (!image) return <div className="text-gray-400 italic">No image</div>;
        const imageURL = `${import.meta.env.VITE_URL}/${image}`;
        return (
          <img
            src={imageURL}
            alt="blog-image"
            className="w-14 h-14 object-cover border rounded"
          />
        );
      },
    },
    {
      accessorKey: "active",
      header: () => <div>Status</div>,
      cell: ({ row }) => {
        const isActive = row.getValue("active") == 1;
        return (
          <div
            className={`px-3 py-1 text-white rounded ${isActive
              ? "bg-green-500 hover:bg-green-600"
              : "bg-red-500 hover:bg-red-600"
              }`}
          >
            {isActive ? "Active" : "Inactive"}
          </div>
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
        const blog = row.original;
        return (
          <div className="flex gap-2">
            <Button
              onClick={() =>
                navigate("/dashboard/blog", { state: { blog } })
              }
              variant="secondary"
            >
              Edit
            </Button>
            <Button
              onClick={() => handleDelete(Number(blog.id))}
              variant="destructive"
            >
              Delete
            </Button>
          </div>
        );
      },
    },
  ];

  const table = useReactTable({
    data: blogs || [],
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
      {/* Filter + Columns */}
      <div className="flex items-center py-4 gap-4">
        <Input
          placeholder="Filter name..."
          value={
            (table.getColumn("title")?.getFilterValue() as string) ?? ""
          }
          onChange={(e) =>
            table.getColumn("title")?.setFilterValue(e.target.value)
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
