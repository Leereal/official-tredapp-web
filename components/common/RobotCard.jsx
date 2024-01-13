"use client";
import { Button } from "../ui/button";
import PacmanLoader from "react-spinners/PacmanLoader";
import CircleLoader from "react-spinners/CircleLoader";
import { Badge } from "@/components/ui/badge";
import { FaCirclePlay, FaCircleStop } from "react-icons/fa6";
import { cn } from "@/lib/utils";
import moment from "moment";

import Link from "next/link";
import { node_socket } from "@/lib/node_socket";

const RobotCard = ({ connection }) => {
  const robotConnection = connection;
  const trade = () => {
    node_socket.emit("signal", {
      symbol: "Volatility 10 Index",
      trade_option: "buy",
      msg_type: "signal",
    });
  };
  return (
    <div className="flex justify-center m-3">
      <div className="block rounded-lg shadow-lg bg-white max-w-sm text-center">
        <div className=" flex py-3 px-4 border-b border-gray-300 justify-between text-justify">
          <span className="font-semibold">
            {robotConnection.account.account_name}
          </span>
          <Badge variant="secondary" className="text-[10px] p-[2px] rounded-lg">
            {robotConnection.category.name}
          </Badge>
        </div>
        <div className="flex justify-center items-center m-3">
          {robotConnection.open_trade &&
            (robotConnection.profit || robotConnection.profit === 0) && (
              <span className="flex gap-10">
                <PacmanLoader
                  color="#364ad6"
                  cssOverride={{}}
                  loading
                  size={10}
                  speedMultiplier={2}
                />
                <h5
                  className={cn(
                    robotConnection.profit < 0
                      ? `text-red-500`
                      : `text-green-500`
                  )}
                >
                  {robotConnection.profit}
                  {robotConnection.robot.name === "Manu-bot"
                    ? robotConnection.currency
                    : "%"}
                </h5>
              </span>
            )}
          {robotConnection.active && !robotConnection.profit && (
            <CircleLoader color="#36d7b7" />
          )}
          {!robotConnection.active && (
            <span className="flex flex-col gap-5 justify-center items-center  text-2xl">
              <FaCircleStop className="text-[1.5rem] text-red-500" />
              {robotConnection.target_reached ? (
                <span className="text-xs inline-block py-2 px-2.5 leading-none text-center whitespace-nowrap align-baseline font-bold bg-green-500 text-white rounded">
                  TARGET REACHED
                </span>
              ) : (
                `STOPPED`
              )}
            </span>
          )}
        </div>
        <div className="p-6">
          <div className="m-3 flex justify-between gap-2">
            <div className="w-fit p-3  ">
              <h3 className="text-xl">Balance</h3>
              <p>${robotConnection.account.balance}</p>
            </div>
            <div className="w-fit p-3  ">
              <h3 className="text-xl">Target</h3>
              <p>${robotConnection.target_percentage}</p>
            </div>
          </div>
          {robotConnection && robotConnection.entry && (
            <p>
              <small>{robotConnection.entry}</small>
            </p>
          )}

          {!robotConnection.active ? (
            <Link href="/connections">
              <Button size="sm" className="rounded-full">
                <FaCirclePlay className="text-white" /> ACTIVATE
              </Button>
            </Link>
          ) : (
            <Link href="/connections">
              <Button size="sm" className="rounded-full  bg-red-500">
                <FaCircleStop className="text-white" /> STOP
              </Button>
            </Link>
          )}
          <Button onClick={trade}>Trade</Button>
        </div>
        <div className="py-3 px-6 border-t border-gray-300 text-gray-600">
          {moment(robotConnection.updatedAt).fromNow()}
          {/* {error && (
            <div
              className="bg-red-100 rounded-lg py-5 px-6 mb-4 text-base text-red-700 mb-3"
              role="alert"
            >
              {error}
            </div>
          )} */}
        </div>
      </div>
    </div>
  );
};

export default RobotCard;
