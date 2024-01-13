"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { socket } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useRouter } from "next/navigation";
import { useTradeStore } from "@/store/Trade";
import { flask_socket } from "@/lib/flask_socket";
import { node_socket } from "@/lib/node_socket";

const TradeCard = ({ currency }) => {
  const { isSending, trade_error, trade, setTradeError } = useTradeStore();
  const [option, setOption] = useState("digital");
  const [price, setPrice] = useState(0);

  const router = useRouter();
  const enterTrade = (symbol, action) => {
    if (option) {
      if (price) {
        trade({ symbol, action, option, price });
        setTradeError("");
      } else {
        trade({ symbol, action, option });
        setTradeError("");
      }
    } else {
      setTradeError("Option not selected");
    }
  };

  const set_option = (e) => setOption(e);

  useEffect(() => {
    flask_socket.on("no_bot_running", () => {
      router.push("/robots");
    });

    node_socket.on("no_bot_running", () => {
      router.push("/robots");
    });
    // Clean up the event listeners when the component unmounts
    return () => {
      flask_socket.off(["no_bot_running"]);
      node_socket.off(["no_bot_running"]);
    };
  }, [flask_socket, node_socket]);

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
                disabled={isSending}
                onClick={() => enterTrade(currency, "call")}
              >
                BUY
              </Button>
              <Button
                disabled={isSending}
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
                  disabled={isSending}
                  onClick={() => enterTrade(currency, "buy_limit")}
                  size="xs"
                >
                  BUY LIMIT
                </Button>
                <Button
                  disabled={isSending}
                  onClick={() => enterTrade(currency, "buy_stop")}
                  size="xs"
                >
                  BUY STOP
                </Button>
              </div>
              <div className=" flex justify-between">
                <Button
                  disabled={isSending}
                  onClick={() => enterTrade(currency, "sell_limit")}
                  className="bg-red-600"
                  size="xs"
                >
                  SELL LIMIT
                </Button>
                <Button
                  disabled={isSending}
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
            {trade_error}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TradeCard;
