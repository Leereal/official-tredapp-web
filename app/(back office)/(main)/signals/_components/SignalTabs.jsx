"use client";
import ConnectionGroup from "@/components/common/ConnectionGroup";
import PendingOrderList from "@/components/common/PendingOrderList";
import SignalGroup from "@/components/common/SignalGroup";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";

const SignalTabs = ({ userId }) => {
  const [value, setValue] = useState("");
  return (
    <div>
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="forex">Forex</TabsTrigger>
          <TabsTrigger value="synthetic">Synthetic</TabsTrigger>
          <TabsTrigger value="iqoption-binary">IQ Option Binary</TabsTrigger>
          <TabsTrigger value="deriv-binary">IQ Option Binary</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <SignalGroup />
        </TabsContent>
        <TabsContent value="forex" className="space-y-4">
          <SignalGroup category="forex" />
        </TabsContent>
        <TabsContent value="synthetic" className="space-y-4">
          <SignalGroup category="synthetic" />
        </TabsContent>
        <TabsContent value="iqoption-binary" className="space-y-4">
          <SignalGroup category="iqoption-binary" />
        </TabsContent>
        <TabsContent value="deriv-binary" className="space-y-4">
          <SignalGroup category="deriv-binary" />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SignalTabs;
