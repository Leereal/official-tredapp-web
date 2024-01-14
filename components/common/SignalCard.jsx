import moment from "moment";
import Image from "next/image";
import React from "react";
import { FaHandPointUp } from "react-icons/fa6";
import { IoRadioButtonOn } from "react-icons/io5";
import { Separator } from "../ui/separator";

const SignalCard = ({ signal }) => {
  return (
    <div
      className={`${
        signal.profit
          ? signal.profit > 0
            ? "bg-green-300"
            : "bg-red-200"
          : signal.is_active
          ? "bg-blue-200"
          : "bg-gray-200"
      } border border-gray-200 rounded-lg m-2 p-2 flex flex-row items-center shadow-xl`}
    >
      <div className="p-2">
        <Image src="/images/eurusd.png" alt="" height={64} width={64} />
      </div>
      <div className="ml-2 flex-1">
        <div className="flex flex-row justify-between items-center">
          <div className="uppercase text-xs font-bold">{signal.symbol}</div>
          <div>
            <IoRadioButtonOn
              size={24}
              color={signal.is_active ? "green" : "grey"}
            />
          </div>
        </div>
        <div className="flex flex-col items-center">
          <div className="capitalize font-extrabold text-xs whitespace-nowrap">
            {signal.type}
          </div>
          <Separator className="my-1" />
          <div className="uppercase font-semibold text-xs whitespace-nowrap">
            {signal.entry_range}
          </div>
        </div>
        <div className="flex flex-col items-center">
          <div className="text-xs font-bold text-green-700 flex mt-1">
            Touch for TP and SL <FaHandPointUp size={14} color="green" />
          </div>
        </div>
        <div className="text-xs italic text-right">
          {moment(signal.createdAt).fromNow()}
        </div>
      </div>
    </div>
  );
};

export default SignalCard;
