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
import { FaPencil, FaPlus } from "react-icons/fa6";
import { useState } from "react";
import { Spinner } from "./Spinner";
import AccountDropdown from "./AccountDropdown";
import RobotDropdown from "./RobotDropdown";
import RiskTypeDropdown from "./RiskTypeDropdown";
const ConnectForm = ({
  userId,
  type,
  connection,
  connectionId,
  fetchConnections,
}) => {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const initialValues =
    connection && type === "Update"
      ? {
          ...connection,
          categoryId: connection.category._id,
          robotId: connection.robot._id,
          accountId: connection.account._id,
        }
      : connectionDefaultValues;

  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(connectionFormSchema),
    defaultValues: initialValues,
  });

  async function onSubmit(values) {
    setIsLoading(true);
    if (type === "Create") {
      try {
        const newConnection = await createConnection({
          connection: { ...values },
          userId,
          path: "/connections",
        });

        if (newConnection) {
          form.reset();
          setOpen(false);
          router.push(`/connections`);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }

    if (type === "Update") {
      if (!connectionId) {
        router.back();
        return;
      }

      try {
        const updatedConnection = await updateConnection({
          userId,
          connection: { ...values, _id: connectionId },
          path: `/connections`,
        });

        if (updatedConnection) {
          form.reset();
          setOpen(false);
          fetchConnections();
          router.push(`/connections`);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          {type === "Create" ? (
            <>
              <FaPlus className="mr-2" />
              Create Connection
            </>
          ) : (
            <FaPencil />
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-white max-h-[90vh] overflow-auto max-w-[70vw]">
        <DialogHeader>
          <DialogTitle>{type} Connection</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-5"
          >
            <div className="flex flex-col gap-5 md:flex-row">
              <FormField
                control={form.control}
                name="accountId"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Account Name</FormLabel>
                    <FormControl>
                      <AccountDropdown
                        onChangeHandler={field.onChange}
                        value={field.value}
                        type={type}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="robotId"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Robot</FormLabel>
                    <FormControl>
                      <RobotDropdown
                        onChangeHandler={field.onChange}
                        value={field.value}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="categoryId"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Category</FormLabel>
                    <FormControl>
                      <Dropdown
                        onChangeHandler={field.onChange}
                        value={field.value}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex flex-col gap-5 md:flex-row">
              <FormField
                control={form.control}
                name="payout"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Payout</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Payout"
                        {...field}
                        className="input-field"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="stake"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Stake</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Stake"
                        {...field}
                        className="input-field"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="currency"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Currency</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Currency"
                        {...field}
                        className="input-field"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex flex-col gap-5 md:flex-row">
              <FormField
                control={form.control}
                name="expiration"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Expiration</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Expiration"
                        {...field}
                        className="input-field"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="current_level"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Current Level</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Current Level"
                        {...field}
                        className="input-field"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="active_contract_id"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Active Contract</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Active Contract"
                        {...field}
                        className="input-field"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex flex-col gap-5 md:flex-row">
              <FormField
                control={form.control}
                name="last_profit"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Last Profit</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Last Profit"
                        {...field}
                        className="input-field"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="target_percentage"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Target</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Target"
                        {...field}
                        className="input-field"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="entry"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Entry</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Entry"
                        {...field}
                        className="input-field"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex flex-col gap-5 md:flex-row">
              <FormField
                control={form.control}
                name="stop_loss"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Daily Stop Loss</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Stop Loss"
                        {...field}
                        className="input-field"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="stake_percentage"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Stake Percentage</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Stake Percentage"
                        {...field}
                        className="input-field"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="risk_type"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Risk Type</FormLabel>
                    <FormControl>
                      <RiskTypeDropdown
                        onChangeHandler={field.onChange}
                        value={field.value}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="risk_percentage"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Risk Percentage</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Risk Percentage"
                        {...field}
                        className="input-field"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex flex-col gap-5 md:flex-row items-center">
              <FormField
                control={form.control}
                name="martingale"
                render={({ field }) => (
                  <FormItem className="w-full md:mt-5">
                    <FormControl>
                      <div className="flex items-center justify-center">
                        <label
                          htmlFor="martingale"
                          className="whitespace-nowrap pr-3 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Martingale
                        </label>
                        <Checkbox
                          onCheckedChange={field.onChange}
                          checked={field.value}
                          id="martingale"
                          className="mr-2 h-5 w-5 border-2 border-primary-500"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="active"
                render={({ field }) => (
                  <FormItem className="w-full md:mt-5">
                    <FormControl>
                      <div className="flex items-center justify-center">
                        <label
                          htmlFor="active"
                          className="whitespace-nowrap pr-3 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Active
                        </label>
                        <Checkbox
                          onCheckedChange={field.onChange}
                          checked={field.value}
                          id="active"
                          className="mr-2 h-5 w-5 border-2 border-primary-500"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="target_reached"
                render={({ field }) => (
                  <FormItem className="w-full md:mt-5">
                    <FormControl>
                      <div className="flex items-center justify-center">
                        <label
                          htmlFor="target_reached"
                          className="whitespace-nowrap pr-3 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Target Reached
                        </label>
                        <Checkbox
                          onCheckedChange={field.onChange}
                          checked={field.value}
                          id="target_reached"
                          className="mr-2 h-5 w-5 border-2 border-primary-500"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="open_trade"
                render={({ field }) => (
                  <FormItem className="w-full md:mt-5">
                    <FormControl>
                      <div className="flex items-center justify-center">
                        <label
                          htmlFor="open_trade"
                          className="whitespace-nowrap pr-3 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Open Trade
                        </label>
                        <Checkbox
                          onCheckedChange={field.onChange}
                          checked={field.value}
                          id="open_trade"
                          className="mr-2 h-5 w-5 border-2 border-primary-500"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="dynamic_stake"
                render={({ field }) => (
                  <FormItem className="w-full md:mt-5">
                    <FormControl>
                      <div className="flex items-center justify-center">
                        <label
                          htmlFor="dynamic_stake"
                          className="whitespace-nowrap pr-3 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Dynamic Stake
                        </label>
                        <Checkbox
                          onCheckedChange={field.onChange}
                          checked={field.value}
                          id="dynamic_stake"
                          className="mr-2 h-5 w-5 border-2 border-primary-500"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? <Spinner /> : `Submit`}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ConnectForm;
