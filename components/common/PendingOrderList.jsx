"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { useEffect } from "react";
import { getPendingOrdersByUser } from "@/lib/actions/pending_order.actions";
import PendingOrder from "./PendingOrder";
import { socket } from "@/lib/utils";
const PendingOrderList = ({ userId }) => {
  const [pendingOrders, setPendingOrders] = useState([]);

  const fetchPendingOrders = async () => {
    const pendingOrderList = await getPendingOrdersByUser({
      userId: userId,
      page: 1,
      limit: 6,
    });
    pendingOrderList && setPendingOrders(pendingOrderList);
  };
  const deletePendingOrder = (id) => {
    socket.emit("delete_pending_order", {
      id,
    });
  };

  useEffect(() => {
    const getPendingOrders = async () => {
      await fetchPendingOrders();
    };

    getPendingOrders();
  }, []);

  useEffect(() => {
    socket.on("pending_order_deleted", () => {
      fetchPendingOrders();
    });
    return () => {
      socket.off("pending_order_deleted");
    };
  }, [socket]);
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card className="col-span-12">
        <CardHeader>
          <CardTitle>Pending Orders</CardTitle>
        </CardHeader>
        <CardContent>
          {pendingOrders && pendingOrders.length ? (
            pendingOrders.map((pendingOrder) => (
              <PendingOrder
                key={pendingOrder._id}
                pendingOrder={pendingOrder}
                deletePendingOrder={deletePendingOrder}
              />
            ))
          ) : (
            <div>No Pending Orders Running</div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
export default PendingOrderList;
