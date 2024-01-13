"use client";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import RobotCard from "./RobotCard";
import { Skeleton } from "../ui/skeleton";
import { useConnectionStore } from "@/store/Connections";

const skeleton = () => {
  return (
    <div className="space-y-2">
      <Skeleton className="h-8" />
      <Skeleton className="h-32" />
      <Skeleton className="h-8" />
    </div>
  );
};

const ConnectionGroup = ({ userId }) => {
  const { robotConnections, isLoading, error, getConnections } =
    useConnectionStore();
  useEffect(() => {
    getConnections(userId);
  }, []);

  return (
    <div id="robotConnections">
      {!isLoading ? (
        <div
          className={cn(
            robotConnections && robotConnections.length
              ? "grid gap-4 xs:grid-cols-2 sm:grid-cols-1 md:grid-cols-2   lg:grid-cols-3  2xl:grid-cols-5"
              : "flex justify-center items-center"
          )}
        >
          {robotConnections && robotConnections.length ? (
            robotConnections.map((robotConnection) => (
              <RobotCard
                connection={robotConnection}
                fetchConnections={() => getConnections()}
                key={robotConnection._id}
              />
            ))
          ) : (
            <div className="font-bold text-red-600">
              No connection available.
            </div>
          )}
        </div>
      ) : (
        <div className="grid gap-4 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 3xl:grid-cols-8">
          {skeleton()}
          {skeleton()}
        </div>
      )}
    </div>
  );
};

export default ConnectionGroup;
