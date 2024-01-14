"use client";
import SignalDropdown from "./SignalDropdown";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useRouter } from "next/navigation";
import { Input } from "../ui/input";
import { Checkbox } from "../ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { Spinner } from "./Spinner";
import { signalDefaultValues } from "@/constants";
import { createSignal } from "@/lib/actions/signal.actions";
import { SymbolComboBox } from "./SymbolComboBox";
import { useSignalStore } from "@/store/Signals";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { signalFormSchema } from "@/lib/validator";
import { Button } from "../ui/button";
import { FaPencil, FaPlus } from "react-icons/fa6";
import EntryTypeDropdown from "./EntryTypeDropdown";
import { cn } from "@/lib/utils";

const SignalForm = ({
  userId,
  type,
  signal,
  signalId,
  binary = false,
  buttonName = "",
}) => {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { getSignals } = useSignalStore();
  const initialValues =
    signal && type === "Update"
      ? {
          ...signal,
          signalCategoryId: signal.signalCategory._id,
        }
      : signalDefaultValues;

  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(signalFormSchema),
    defaultValues: initialValues,
  });

  async function onSubmit(values) {
    setIsLoading(true);
    if (type === "Create") {
      try {
        const newSignal = await createSignal({
          signal: { ...values },
          userId,
          path: "/signals",
        });

        if (newSignal) {
          getSignals();
          form.reset();
          setOpen(false);
          router.push(`/signals`);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }

    if (type === "Update") {
      if (!signalId) {
        router.back();
        return;
      }

      try {
        const updatedSignal = await updateSignal({
          userId,
          signal: { ...values, _id: signalId },
          path: `/signals`,
        });

        if (updatedSignal) {
          getSignals();
          form.reset();
          setOpen(false);
          router.push(`/signals`);
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
              {buttonName}
            </>
          ) : (
            <FaPencil />
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-white max-h-[90vh] overflow-auto max-w-[70vw]">
        <DialogHeader>
          <DialogTitle>{type} Signal</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-5"
          >
            <div className="flex flex-col gap-5 md:flex-row">
              <FormField
                control={form.control}
                name="signalCategoryId"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Category</FormLabel>
                    <FormControl>
                      <SignalDropdown
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
                name="symbol"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Symbol</FormLabel>
                    <FormControl>
                      <SymbolComboBox
                        categoryId={form.getValues("signalCategoryId")}
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
                name="entry_range"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Entry Range / Price</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="entry_range"
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
                name="type"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Entry Type</FormLabel>
                    <FormControl>
                      <EntryTypeDropdown
                        onChangeHandler={field.onChange}
                        value={field.value}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div
              className={cn(
                `flex flex-col gap-5 md:flex-row `,
                binary ? "hidden" : ""
              )}
            >
              <FormField
                control={form.control}
                name="take_profit_1"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Take Profit 1</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Take Profit 1"
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
                name="take_profit_2"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Take Profit 2</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Take Profit 2"
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
                name="take_profit_3"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Take Profit 3</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Take Profit 3"
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
                name="take_profit_4"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Take Profit 4</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Take Profit 4"
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
                name="take_profit_5"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Take Profit 5</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Take Profit 5"
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
              {!binary ? (
                <FormField
                  control={form.control}
                  name="stop_loss"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Stop Loss</FormLabel>
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
              ) : (
                <FormField
                  control={form.control}
                  name="expiration"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Expiration (in minutes)</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Expiration"
                          {...field}
                          className="input-field"
                          type="number"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              <FormField
                control={form.control}
                name="is_active"
                render={({ field }) => (
                  <FormItem className="w-full md:mt-5">
                    <FormControl>
                      <div className="flex items-center justify-center">
                        <label
                          htmlFor="is_active"
                          className="whitespace-nowrap pr-3 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Active
                        </label>
                        <Checkbox
                          onCheckedChange={field.onChange}
                          checked={field.value}
                          id="is_active"
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
                name="is_premium"
                render={({ field }) => (
                  <FormItem className="w-full md:mt-5">
                    <FormControl>
                      <div className="flex items-center justify-center">
                        <label
                          htmlFor="is_premium"
                          className="whitespace-nowrap pr-3 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Premium
                        </label>
                        <Checkbox
                          onCheckedChange={field.onChange}
                          checked={field.value}
                          id="is_premium"
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
                name="profit"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Profit</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Profit"
                        {...field}
                        className="input-field"
                      />
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

export default SignalForm;
