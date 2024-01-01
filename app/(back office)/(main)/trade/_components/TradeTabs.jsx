"use client";
import ConnectionGroup from "@/components/common/ConnectionGroup";
import TradeGroup from "@/components/common/TradeGroup";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";

const TradeTabs = ({ userId }) => {
  const [value, setValue] = useState("");
  return (
    <div>
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="trading">Trading</TabsTrigger>
          <TabsTrigger value="reports" disabled>
            Reports
          </TabsTrigger>
          <TabsTrigger value="notifications" disabled>
            Notifications
          </TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <TradeGroup />
        </TabsContent>
        <TabsContent value="trading" className="space-y-4">
          <ConnectionGroup userId={userId} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TradeTabs;
