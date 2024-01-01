import ConnectForm from "@/components/common/ConnectForm";
import { auth } from "@clerk/nextjs";
import DataTable from "./_components/DataTable";
import { FaPlay } from "react-icons/fa6";
import { Button } from "@/components/ui/button";

const Connections = () => {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId;

  return (
    <div className="flex-1 space-y-4  ">
      <div className="bg-slate-100 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">
            Robot Connections
          </h2>
          <div className="flex items-center space-x-2">
            <Button size="xs">
              <FaPlay className="text-white" /> Start All
            </Button>
            <ConnectForm userId={userId} type="Create" />
          </div>
        </div>
      </div>
      <div>
        <DataTable userId={userId} />
      </div>
    </div>
  );
};

export default Connections;
