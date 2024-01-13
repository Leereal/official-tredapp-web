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
import { useEffect, useState } from "react";
import RobotForm from "@/components/common/RobotForm";
import { Button } from "@/components/ui/button";
import { FaCirclePlay, FaCircleStop } from "react-icons/fa6";
import { socket } from "@/lib/utils";
import { useBotStore, useRobotStore } from "@/store/Robots";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

const DataTable = ({ userId }) => {
  const { robots, isLoading, error, getRobots } = useRobotStore();
  const { id: botId, isPending, activation } = useBotStore();
  const handleBot = (id, robot) => {
    activation(id, true, robot);
  };

  const columns = [
    {
      accessorKey: "name",
      header: "Robot Name",
    },
    {
      accessorKey: "version",
      header: "Version",
    },
    {
      accessorKey: "description",
      header: "Description",
      cell: ({ row }) => {
        const description = row.getValue("description");
        return <div className="max-w-64 truncate">{description}</div>;
      },
    },
    {
      accessorKey: "strategy",
      header: "Strategy",
    },
    {
      accessorKey: "socket",
      header: "Socket",
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
        const active = row.getValue("active");
        return (
          <>
            <span className="mr-3">
              <RobotForm
                type="Update"
                robotId={id}
                userId={userId}
                robot={row.original}
                fetchRobots={getRobots}
              />
            </span>
            <span>
              <Button
                size="xs"
                className={active ? `bg-red-500` : ``}
                onClick={() => handleBot(id, row.original)}
                disabled={isPending && botId === id}
              >
                {active ? <FaCircleStop /> : <FaCirclePlay />}
              </Button>
            </span>
          </>
        );
      },
    },
  ];
  const table = useReactTable({
    data: robots,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  useEffect(() => {
    getRobots();
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
