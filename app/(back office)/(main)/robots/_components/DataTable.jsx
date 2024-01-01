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
import { getAllRobots } from "@/lib/actions/robot.actions";
import { useEffect, useState } from "react";
import RobotForm from "@/components/common/RobotForm";
import { Button } from "@/components/ui/button";
import { FaCirclePlay, FaCircleStop } from "react-icons/fa6";
import { socket } from "@/lib/utils";

const DataTable = ({ userId }) => {
  const [robots, setRobots] = useState([]);
  const [botState, setBotState] = useState({
    isPending: false,
    id: "",
  });
  const handleBot = (id, active) => {
    setBotState({
      id,
      isPending: true,
    });
    if (active) {
      socket.emit("handleBot", {
        id,
        activate: false,
      });
    } else {
      socket.emit("handleBot", {
        id,
        activate: true,
      });
    }
  };
  const fetchRobots = async () => {
    const robotList = await getAllRobots({
      query: "",
      category: "",
      page: 1,
      limit: 6,
    });
    robotList && setRobots(robotList.data);
  };
  const handleBotEvent = ({ action, data }) => {
    switch (action) {
      case "bot_started":
        setBotState({
          id: "",
          isPending: false,
        });
        // Fetch the robots again after a bot starts
        fetchRobots();
        break;
      default:
        break;
    }
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
    },
    {
      accessorKey: "strategy",
      header: "Strategy",
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
                fetchRobots={fetchRobots}
              />
            </span>
            <span>
              <Button
                size="xs"
                className={active ? `bg-red-500` : ``}
                onClick={() => handleBot(id, active)}
                disabled={botState.isPending && botState.id === id}
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
    const getRobots = async () => {
      await fetchRobots();
    };

    getRobots();
  }, []);
  useEffect(() => {
    socket.on("bot", handleBotEvent);

    return () => {
      // Clean up the socket event listener when the component unmounts
      socket.off("bot", handleBotEvent);
    };
  }, [socket]);
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
