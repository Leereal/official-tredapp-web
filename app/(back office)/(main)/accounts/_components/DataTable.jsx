"use client";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getAllAccounts } from "@/lib/actions/account.actions";
import { useEffect, useState } from "react";
import AccountForm from "@/components/common/AccountForm";

const DataTable = ({ userId }) => {
  const [accounts, setAccounts] = useState([]);
  const fetchAccounts = async () => {
    const accountList = await getAllAccounts({
      query: "",
      page: 1,
      limit: 6,
    });
    accountList && setAccounts(accountList.data);
  };
  const columns = [
    {
      accessorKey: "account_name",
      header: "Account Name",
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "token",
      header: "Token",
    },
    {
      accessorKey: "account_type",
      header: "Account Type",
    },
    {
      accessorKey: "opening_balance",
      header: "Opening Balance",
    },
    {
      accessorKey: "balance",
      header: "Balance",
    },
    {
      accessorKey: "active",
      header: "Active",
    },
    {
      accessorKey: "_id",
      header: "Actions",
      cell: ({ row }) => {
        const id = row.getValue("_id");
        return (
          <span>
            <AccountForm
              type="Update"
              accountId={id}
              userId={userId}
              account={row.original}
              fetchAccounts={fetchAccounts}
            />
          </span>
        );
      },
    },
  ];
  const table = useReactTable({
    data: accounts,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  useEffect(() => {
    fetchAccounts();
  }, []);
  return (
    <div className="rounded-md border m-5">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default DataTable;
