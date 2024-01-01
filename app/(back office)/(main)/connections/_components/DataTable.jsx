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
import { getAllConnections } from "@/lib/actions/connection.actions";
import { useEffect, useState } from "react";
import ConnectForm from "@/components/common/ConnectForm";
import { FaDatabase } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import StartBotForm from "@/components/common/StartBotForm";

const DataTable = ({ userId }) => {
  const [connections, setConnections] = useState([]);
  const columns = [
    {
      accessorKey: "account.account_name",
      header: "Account",
    },
    {
      accessorKey: "robot.name",
      header: "Connected Robot",
    },
    {
      accessorKey: "robot.version",
      header: "Version",
    },
    {
      accessorKey: "createdAt",
      header: "Start Date",
    },
    {
      accessorKey: "payout",
      header: "Min Payout",
    },
    {
      accessorKey: "current_level",
      header: "Current Level",
    },
    {
      accessorKey: "martingale",
      header: "Martingale",
    },
    {
      accessorKey: "expiration",
      header: "Expiration",
    },
    {
      accessorKey: "target_percentage",
      header: "Target",
    },
    {
      accessorKey: "target_reached",
      header: "Target Reached",
    },
    {
      accessorKey: "open_trade",
      header: "Open Trade",
    },
    {
      accessorKey: "active_contract_id",
      header: "Active Contract",
    },
    {
      accessorKey: "last_profit",
      header: "Last Profit",
    },
    {
      accessorKey: "entry",
      header: "Entry",
    },
    {
      accessorKey: "currency",
      header: "Currency",
    },
    {
      accessorKey: "stake",
      header: "Stake",
    },
    {
      accessorKey: "stop_loss",
      header: "Stop Loss",
    },
    {
      accessorKey: "stake_percentage",
      header: "Stake %",
    },
    {
      accessorKey: "risk_type",
      header: "Risk Type",
    },
    {
      accessorKey: "risk_percentage",
      header: "Risk %",
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
        console.log("Original : ", row.original);
        return (
          <>
            <span className="mr-2">
              <ConnectForm
                type="Update"
                connectionId={id}
                userId={userId}
                connection={row.original}
              />
            </span>
            <span>
              <StartBotForm
                type="Update"
                connectionId={id}
                userId={userId}
                connection={row.original}
              />
            </span>
          </>
        );
      },
    },
  ];
  const table = useReactTable({
    data: connections,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  useEffect(() => {
    const getConnections = async () => {
      const connectionsList = await getAllConnections({
        query: "",
        category: "",
        page: 1,
        limit: 6,
      });
      connectionsList && setConnections(connectionsList.data);
    };

    getConnections();
  }, []);
  return (
    <div className="rounded-md border m-5">
      <Table className="text-xs">
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id} className="p-1">
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
                  <TableCell key={cell.id} className="p-1">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                <Button variant="outline hover:bg-white ">
                  <FaDatabase className="mr-2 text-primary" />
                  No results.
                </Button>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default DataTable;
