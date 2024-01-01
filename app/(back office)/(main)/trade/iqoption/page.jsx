import { Button } from "@/components/ui/button";
import { auth } from "@clerk/nextjs";
import TradeTabs from "../_components/TradeTabs";
const IQOption = () => {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId;
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Trade</h2>
        <div className="flex items-center space-x-2">
          <Button>Download</Button>
        </div>
      </div>
      <TradeTabs userId={userId} />
    </div>
  );
};

export default IQOption;
