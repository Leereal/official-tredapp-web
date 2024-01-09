"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { accountFormSchema } from "@/lib/validator";
import { createAccount, updateAccount } from "@/lib/actions/account.actions";
import { Button } from "@/components/ui/button";
import { accountDefaultValues } from "@/constants";
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
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FaPencil, FaPlus } from "react-icons/fa6";
import { useState } from "react";
import { Spinner } from "./Spinner";
import AccountTypeDropdown from "./AccountTypeDropdown";

const AccountForm = ({ userId, type, account, accountId, fetchAccounts }) => {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const initialValues =
    account && type === "Update"
      ? {
          ...account,
        }
      : accountDefaultValues;
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(accountFormSchema),
    defaultValues: initialValues,
  });

  async function onSubmit(values) {
    setIsLoading(true);
    if (type === "Create") {
      try {
        const newAccount = await createAccount({
          account: { ...values },
          userId,
          path: "/accounts",
        });

        if (newAccount) {
          form.reset();
          setOpen(false);
          router.reload();
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }

    if (type === "Update") {
      if (!accountId) {
        router.back();
        return;
      }

      try {
        const updatedAccount = await updateAccount({
          userId,
          account: { ...values, _id: accountId },
          path: `/accounts`,
        });

        if (updatedAccount) {
          form.reset();
          setOpen(false);
          fetchAccounts();
          router.push(`/accounts`);
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
        <Button size="xs">
          {type === "Create" ? (
            <>
              <FaPlus className="mr-2" />
              Create Account
            </>
          ) : (
            <FaPencil />
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-white max-h-[90vh] overflow-auto">
        <DialogHeader>
          <DialogTitle>Add Account</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-5"
          >
            <div className="flex flex-col gap-5 md:flex-row">
              <FormField
                control={form.control}
                name="account_name"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Account Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Account Name"
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
                name="email"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Email"
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
                name="balance"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Balance</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Current Balance"
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
                name="opening_balance"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Opening Balance</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Opening Balance"
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
                name="token"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Token</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Token"
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
            </div>
            <div className="flex flex-col gap-5 md:flex-row items-center">
              <FormField
                control={form.control}
                name="account_type"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Account Type</FormLabel>
                    <FormControl>
                      <AccountTypeDropdown
                        onChangeHandler={field.onChange}
                        value={field.value}
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

export default AccountForm;
