"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { connectionFormSchema } from "@/lib/validator";
import {
  createConnection,
  updateConnection,
} from "@/lib/actions/connection.actions";
import { Button } from "@/components/ui/button";
import { connectionDefaultValues } from "@/constants";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useRouter } from "next/navigation";
import { Textarea } from "../ui/textarea";
import { Input } from "../ui/input";
import Dropdown from "./Dropdown";
import { Checkbox } from "../ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FaCirclePlay, FaCircleStop, FaPencil, FaPlus } from "react-icons/fa6";
import { useState } from "react";
import { Spinner } from "./Spinner";
import AccountDropdown from "./AccountDropdown";
import RobotDropdown from "./RobotDropdown";
const StartBotForm = ({ userId, type, connection, connectionId }) => {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  async function onStart() {
    setIsLoading(true);
    // if (type === "Create") {
    //   try {
    //     const newConnection = await createConnection({
    //       connection: { ...values },
    //       userId,
    //       path: "/connections",
    //     });

    //     if (newConnection) {
    //       form.reset();
    //       setOpen(false);
    //       router.push(`/connections`);
    //     }
    //   } catch (error) {
    //     console.log(error);
    //   } finally {
    //     setIsLoading(false);
    //   }
    // }

    // if (type === "Update") {
    //   if (!connectionId) {
    //     router.back();
    //     return;
    //   }

    //   try {
    //     const updatedConnection = await updateConnection({
    //       userId,
    //       connection: { ...values, _id: connectionId },
    //       path: `/connections`,
    //     });

    //     if (updatedConnection) {
    //       form.reset();
    //       setOpen(false);
    //       router.push(`/connections`);
    //     }
    //   } catch (error) {
    //     console.log(error);
    //   } finally {
    //     setIsLoading(false);
    //   }
    // }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="xs" className={type === "Create" ? `` : `bg-red-500`}>
          {type === "Create" ? <FaCirclePlay /> : <FaCircleStop />}
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-white max-h-[90vh] overflow-auto">
        <DialogHeader>
          <DialogTitle>Account: {connection.account_name}</DialogTitle>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default StartBotForm;
