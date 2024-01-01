"use client";
import { getConnectionsByUser } from "@/lib/actions/connection.actions";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import RobotCard from "./RobotCard";

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
  const [robotConnections, setRobotConnections] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const fetchConnections = () => {
    try {
      setIsLoading(true);
      const getConnections = async () => {
        const connectionsList = await getConnectionsByUser({
          userId,
          page: 1,
          limit: 6,
        });
        connectionsList && setRobotConnections(connectionsList.data);
      };

      getConnections();
    } catch (error) {
      console.log("ConnectionGroup error: ", error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchConnections();
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
                fetchConnections={fetchConnections}
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
