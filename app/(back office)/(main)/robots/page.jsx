import RobotForm from "@/components/common/RobotForm";
import { auth } from "@clerk/nextjs";
import DataTable from "./_components/DataTable";

const Robots = () => {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId;

  return (
    <div className="flex-1 space-y-4  ">
      <div className="bg-slate-100 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Robots</h2>
          <div className="flex items-center space-x-2">
            <RobotForm userId={userId} type="Create" />
          </div>
        </div>
      </div>
      <div>
        <DataTable userId={userId} />
      </div>
    </div>
  );
};

export default Robots;
