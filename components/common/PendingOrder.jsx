import { FaTrash } from "react-icons/fa6";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import moment from "moment";
import { Button } from "../ui/button";

const PendingOrder = ({ pendingOrder, deletePendingOrder }) => {
  return (
    <div className="mb-3">
      <Card>
        <CardHeader className="py-2">
          <CardTitle className="text-md text-primary">
            {pendingOrder.symbol}
          </CardTitle>
        </CardHeader>
        <CardContent className="py-2">
          <div className="flex justify-between">
            <div className="flex flex-col items-center">
              <span className="font-bold">Time Set</span>
              <span className="text-slate-700 text-sm">
                {moment(pendingOrder.createdAt).fromNow()}
              </span>
            </div>
            <div className="flex flex-col items-center">
              <span className="font-bold">Action</span>
              <span className="text-slate-700 text-sm">
                {pendingOrder.action.replace(/_/g, " ").toUpperCase()}
              </span>
            </div>
            <div className="flex flex-col items-center">
              <span className="font-bold">Price</span>
              <span className="text-slate-700 text-sm">
                {pendingOrder.price}
              </span>
            </div>
            <div className="flex flex-col items-center">
              <span className="font-bold">Option</span>
              <span className="text-slate-700 text-sm">
                {pendingOrder.option.toUpperCase()}
              </span>
            </div>
            <div className="flex flex-col items-center">
              <span className="font-bold">Delete</span>
              <span className="text-red-500 text-sm cursor-pointer">
                <Button
                  size="icon"
                  className="rounded-full"
                  variant="destructive"
                  onClick={() => deletePendingOrder(pendingOrder._id)}
                >
                  <FaTrash />
                </Button>
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PendingOrder;
