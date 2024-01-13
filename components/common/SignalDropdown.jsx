import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { startTransition, useEffect, useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Input } from "../ui/input";
import {
  createSignalCategory,
  getAllSignalCategories,
} from "@/lib/actions/signalCategory.actions";

const SignalDropdown = ({ value, onChangeHandler }) => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");

  const handleAddCategory = () => {
    createSignalCategory({
      signalCategoryName: newCategory.trim(),
    }).then((signalCategory) => {
      setCategories((prevState) => [...prevState, signalCategory]);
    });
  };

  useEffect(() => {
    const getCategories = async () => {
      const signalCategoryList = await getAllSignalCategories();
      signalCategoryList && setCategories(signalCategoryList);
    };

    getCategories();
  }, []);

  return (
    <Select onValueChange={onChangeHandler} defaultValue={value}>
      <SelectTrigger className="select-field">
        <SelectValue placeholder="Category" />
      </SelectTrigger>
      <SelectContent>
        {categories.length > 0 &&
          categories.map((signalCategory) => (
            <SelectItem
              key={signalCategory._id}
              value={signalCategory._id}
              className="select-item p-regular-14"
            >
              {signalCategory.name}
            </SelectItem>
          ))}

        <AlertDialog>
          <AlertDialogTrigger className="p-medium-14 flex w-full rounded-sm py-3 pl-8 text-primary-500 hover:bg-primary-50 focus:text-primary-500">
            Add new category
          </AlertDialogTrigger>
          <AlertDialogContent className="bg-white">
            <AlertDialogHeader>
              <AlertDialogTitle>New Category</AlertDialogTitle>
              <AlertDialogDescription>
                <Input
                  type="text"
                  placeholder="Category name"
                  className="input-field mt-3"
                  onChange={(e) => setNewCategory(e.target.value)}
                />
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => startTransition(handleAddCategory)}
              >
                Add
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </SelectContent>
    </Select>
  );
};

export default SignalDropdown;
