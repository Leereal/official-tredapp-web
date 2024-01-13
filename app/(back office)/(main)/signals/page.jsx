import ConnectForm from "@/components/common/ConnectForm";
import { auth } from "@clerk/nextjs";
import SignalForm from "@/components/common/SignalForm";

const Signals = () => {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId;

  return (
    <div className="flex-1 space-y-4  ">
      <div className="bg-slate-100 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Signals</h2>
          <div className="flex items-center space-x-2">
            <SignalForm userId={userId} type="Create" />
          </div>
        </div>
      </div>
      <div>Tabs here </div>
    </div>
  );
};

export default Signals;
