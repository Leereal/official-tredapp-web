"use client";
import { Button } from "../ui/button";
import PacmanLoader from "react-spinners/PacmanLoader";
import CircleLoader from "react-spinners/CircleLoader";
import { Badge } from "@/components/ui/badge";
import { FaCirclePlay, FaCircleStop, FaPlay, FaStop } from "react-icons/fa6";
import { cn, socket } from "@/lib/utils";
import moment from "moment";

import { useEffect, useState } from "react";
import Link from "next/link";

const RobotCard = ({ connection, fetchConnections }) => {
  const [robotConnection, setRobotConnection] = useState(connection);
  const [profit, setProfit] = useState(0);
  useEffect(() => {
    // Listen for the "connect" event, which is emitted when the connection is established
    const onConnect = () => {
      console.log("Connected to socket");
    };

    // Listen for the "disconnect" event, emitted when the connection is lost
    const onDisconnect = () => {
      console.log("Socket Disconnected");
    };

    // Add event listeners
    socket.on("bot", ({ action, data }) => {
      switch (action) {
        case "balance":
          console.log("Balance : ", data);
          if (robotConnection.account.account_name === data.loginid) {
            setRobotConnection({
              ...robotConnection,
              account: { ...robotConnection.account, balance: data.balance },
            });
          }
          break;
        case "target_reached":
          console.log("Target Reached : ", data);
          if (robotConnection._id === data._id) {
            setRobotConnection({
              ...robotConnection,
              target_reached: true,
            });
            fetchConnections();
          }
          break;
        case "trade_success":
          if (robotConnection._id === data._id) {
            fetchConnections();
          }
          break;
        case "closed_trade":
          if (robotConnection._id === data._id) {
            setProfit(null);
            fetchConnections();
          }
          break;
        case "current_profit":
          if (robotConnection._id === data._id) {
            setProfit(data.current_profit);
          }
          break;
        case "signal":
          console.log("Signal : ", data);
          break;
        default:
          console.log(action, " : ", data);
      }
    });

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    // Clean up the event listeners when the component unmounts
    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off(["bot"]);
    };
  }, [
    socket,
    //  robotConnection
  ]);

  return (
    <div className="flex justify-center m-3">
      <div className="block rounded-lg shadow-lg bg-white max-w-sm text-center">
        <div className=" flex py-3 px-4 border-b border-gray-300 justify-between text-justify">
          {console.log("Profit : ", profit)}
          <span className="font-semibold">
            {robotConnection.account.account_name}
          </span>
          <Badge variant="secondary" className="text-[10px] p-[2px] rounded-lg">
            {robotConnection.category.name}
          </Badge>
        </div>
        <div className="flex justify-center items-center m-3">
          {robotConnection.open_trade && (profit || profit === 0) && (
            <span className="flex gap-10">
              <PacmanLoader
                color="#364ad6"
                cssOverride={{}}
                loading
                size={10}
                speedMultiplier={2}
              />
              <h5
                className={cn(profit < 0 ? `text-red-500` : `text-green-500`)}
              >
                {profit}
                {robotConnection.robot.name === "Manu-bot"
                  ? robotConnection.currency
                  : "%"}
              </h5>
            </span>
          )}
          {robotConnection.active && !profit && (
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
