"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { socket } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const TradeCard = ({ currency }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [option, setOption] = useState("digital");
  const [error, setError] = useState("");
  const [price, setPrice] = useState(0);
  const router = useRouter();
  const enterTrade = (symbol, action) => {
    if (option) {
      if (price) {
        socket.emit("signal", {
          symbol,
          action,
          option,
          price,
        });
        setIsLoading(true);
        setError("");
      } else {
        socket.emit("signal", {
          symbol,
          action,
          option,
        });
        setIsLoading(true);
        setError("");
      }
    } else {
      setError("Option is required");
    }
  };
  const set_option = (e) => {
    setOption(e);
  };
  useEffect(() => {
    // Listen for the "connect" event, which is emitted when the connection is established
    socket.on("bot", ({ action, data }) => {
      switch (action) {
        case "trade_success":
          setIsLoading(false);
          toast.success("Trade opened successfully");

          //Redirect to the other tab
          break;
        case "trade_fail":
          setIsLoading(false);
          toast.error(
            "Trade failed. Please make sure it's not running if so try again or contact support"
          );
          //Redirect to the other tab
          break;
        default:
      }
    });
    socket.on("pending_order_success", (data) => {
      if (data._id === currency) {
        toast.success("Pending Order set successfully");
        setIsLoading(false);
        setOption("");
        setPrice(0);
      }
    });
    socket.on("no_bot_running", () => {
      router.push("/robots");
    });

    // Clean up the event listeners when the component unmounts
    return () => {
      socket.off(["bot", "pending_order_success"]);
    };
  }, [socket]);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-center pb-2">
        <CardTitle className="text-lg font-bold text-center justify-center">
          <div>{currency}</div>
          <RadioGroup
            defaultValue="option"
            onValueChange={set_option}
            className="flex justify-between"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem className="w-3 h-3" value="binary" id="binary" />
              <Label htmlFor="binary" className="text-[10px] font-semibold">
                Binary
              </Label>
            </div>
            <div className="flex items-center space-x-2 ">
              <RadioGroupItem
                className="w-3 h-3"
                value="digital"
                id="digital"
              />
              <Label htmlFor="digital" className="text-[10px] font-semibold">
                Digital
              </Label>
            </div>
          </RadioGroup>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col justify-center gap-3">
          <Input
            value={price}
            onChange={(e) => {
              setPrice(e.target.value.replace(/,/g, "."));
            }}
            type="number"
          />
          {(!price || price === 0) && (
            <div className=" flex justify-between">
              <Button
                disabled={isLoading}
                onClick={() => enterTrade(currency, "call")}
              >
                BUY
              </Button>
              <Button
                disabled={isLoading}
                onClick={() => enterTrade(currency, "put")}
                className="bg-red-600"
              >
                SELL
              </Button>
            </div>
          )}
          {price > 0 && (
            <>
              <div className=" flex justify-between">
                <Button
                  disabled={isLoading}
                  onClick={() => enterTrade(currency, "buy_limit")}
                  size="xs"
                >
                  BUY LIMIT
                </Button>
                <Button
                  disabled={isLoading}
                  onClick={() => enterTrade(currency, "buy_stop")}
                  size="xs"
                >
                  BUY STOP
                </Button>
              </div>
              <div className=" flex justify-between">
                <Button
                  disabled={isLoading}
                  onClick={() => enterTrade(currency, "sell_limit")}
                  className="bg-red-600"
                  size="xs"
                >
                  SELL LIMIT
                </Button>
                <Button
                  disabled={isLoading}
                  onClick={() => enterTrade(currency, "sell_stop")}
                  className="bg-red-600"
                  size="xs"
                >
                  SELL STOP
                </Button>
              </div>
            </>
          )}
          <div className="text-red-500 text-[10px] text-center p-0">
            {error}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TradeCard;
