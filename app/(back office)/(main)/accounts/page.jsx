import AccountForm from "@/components/common/AccountForm";
import { auth } from "@clerk/nextjs";
import DataTable from "./_components/DataTable";

const Accounts = () => {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId;
  return (
    <div className="flex-1 space-y-4  ">
      <div className="bg-slate-100 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Accounts</h2>
          <div className="flex items-center space-x-2">
            <AccountForm userId={userId} type="Create" />
          </div>
        </div>
      </div>
      <div>
        <DataTable userId={userId} />
      </div>
    </div>
  );
};

export default Accounts;
