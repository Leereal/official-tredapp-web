"use client";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import TradeCard from "@/components/common/TradeCard";
import { getAllRobots } from "@/lib/actions/robot.actions";
import { cn } from "@/lib/utils";
import { Switch } from "../ui/switch";
import { Label } from "../ui/label";
import { useTradeStore } from "@/store/Trade";

const skeleton = () => {
  return (
    <div className="space-y-2">
      <Skeleton className="h-32" />
      <div className="flex flex-row justify-between space-x-16">
        <Skeleton className="h-8 w-20" />
        <Skeleton className="h-8 w-20" />
      </div>
    </div>
  );
};
const TradeGroup = () => {
  // const [deriv, setDeriv] = useState(false);
  // const [symbols, setSymbols] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  const { deriv, symbols, getSymbols, setDeriv, isLoading, error } =
    useTradeStore();

  // const fetchSymbols = async () => {
  //   // We get the robot then extract the symbols in those robots
  //   const robotList = await getAllRobots({
  //     query: "",
  //     category: "Semi-Auto",
  //     page: 1,
  //     limit: 100,
  //   });
  //   robotList && setSymbols(robotList.data[0].symbols);
  // };

  useEffect(() => {
    getSymbols();
  }, []);

  return (
    <div className="space-y-3">
      <div className="flex items-center space-x-2">
        <Switch
          id="deriv"
          onCheckedChange={() => {
            setDeriv(deriv);
          }}
        />
        <Label htmlFor="deriv">Deriv</Label>
      </div>
      {!isLoading ? (
        <div
          className={cn(
            symbols && symbols.length
              ? "grid gap-4 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 3xl:grid-cols-8"
              : "flex justify-center items-center"
          )}
        >
          {symbols && symbols.length ? (
            symbols
              .filter((symbol) => symbol.active === true)
              ?.map((symbol) => (
                <TradeCard currency={symbol.name} key={symbol.name} />
              ))
          ) : (
            <div className="font-bold text-red-600">
              No active symbols for {deriv ? "Deriv" : "IQ Option"}
            </div>
          )}
        </div>
      ) : (
        <div className="grid gap-4 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 3xl:grid-cols-8">
          {skeleton()}
          {skeleton()}
          {skeleton()}
          {skeleton()}
          {skeleton()}
          {skeleton()}
        </div>
      )}
    </div>
  );
};

export default TradeGroup;
