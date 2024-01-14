"use client";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { useSignalStore } from "@/store/Signals";
import SignalCard from "./SignalCard";

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
const SignalGroup = ({ category = null }) => {
  const { signals, getSignals, isLoading, error } = useSignalStore();

  useEffect(() => {
    getSignals(category);
  }, []);

  return (
    <div className="space-y-3">
      {!isLoading ? (
        <div
          className={cn(
            signals && signals.length
              ? "grid gap-4   lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4"
              : "flex justify-center items-center"
          )}
        >
          {signals && signals.length ? (
            signals
              .filter((signal) => signal.is_active === true)
              ?.map((signal) => <SignalCard signal={signal} key={signal._id} />)
          ) : (
            <div className="font-bold text-red-600">No active signals</div>
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

export default SignalGroup;
