"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { robotFormSchema } from "@/lib/validator";
import {
  createRobot,
  getRobotById,
  updateRobot,
} from "@/lib/actions/robot.actions";
import { Button } from "@/components/ui/button";
import { robotDefaultValues } from "@/constants";
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
import { FaPencil, FaPlus, FaRobot } from "react-icons/fa6";
import { useState } from "react";
import { Spinner } from "./Spinner";
import SymbolPopover from "./SymbolPopover";
import { useRobotStore } from "@/store/Robots";
import SocketDropdown from "./SocketDropdown";
const RobotForm = ({ userId, type, robot, robotId }) => {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { getRobots } = useRobotStore();
  const initialValues =
    robot && type === "Update"
      ? {
          ...robot,
          categoryId: robot.category._id,
        }
      : robotDefaultValues;

  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(robotFormSchema),
    defaultValues: initialValues,
  });

  async function onSubmit(values) {
    setIsLoading(true);
    if (type === "Create") {
      try {
        const newRobot = await createRobot({
          robot: { ...values },
          userId,
          path: "/robots",
        });

        if (newRobot) {
          getRobots();
          form.reset();
          setOpen(false);
          router.push(`/robots`);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }

    if (type === "Update") {
      if (!robotId) {
        router.back();
        return;
      }

      try {
        const updatedRobot = await updateRobot({
          userId,
          robot: { ...values, _id: robotId },
          path: `/robots`,
        });

        if (updatedRobot) {
          getRobots();
          form.reset();
          setOpen(false);
          router.push(`/robots`);
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
              Create Robot
            </>
          ) : (
            <FaPencil />
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-white max-h-[90vh] overflow-auto">
        <DialogHeader>
          <DialogTitle>{type} Robot</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-5"
          >
            <div className="flex flex-col gap-5 md:flex-row">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Robot Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Robot Name"
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
                name="version"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Version</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Version"
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
              <FormField
                control={form.control}
                name="symbols"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Symbols</FormLabel>
                    <FormControl>
                      <SymbolPopover
                        onChangeHandler={field.onChange}
                        value={field.value}
                        symbols={field.value}
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
                name="description"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Description</FormLabel>
                    <FormControl className="h-72">
                      <Textarea
                        placeholder="Enter Description Here..."
                        {...field}
                        className="textarea rounded-2xl"
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
                name="strategy"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Strategy</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Strategy"
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
                name="socket"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Socket</FormLabel>
                    <FormControl>
                      <SocketDropdown
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
            <Button type="submit" disabled={isLoading}>
              {isLoading ? <Spinner /> : `Submit`}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default RobotForm;
