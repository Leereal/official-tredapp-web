"use client";

import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { symbols } from "@/constants";
import { getAllSignalCategories } from "@/lib/actions/signalCategory.actions";
import { useEffect, useState } from "react";

export function SymbolComboBox({ value, onChangeHandler, categoryId = "" }) {
  const [open, setOpen] = useState(false);
  const [categories, setCategories] = useState([]);

  const assets = categoryId
    ? symbols[
        categories.find((cat) => cat._id == categoryId)?.name?.toLowerCase()
      ]
    : symbols.forex;

  useEffect(() => {
    const getCategories = async () => {
      const categoryList = await getAllSignalCategories();
      categoryList && setCategories(categoryList);
    };

    getCategories();
  }, []);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? assets.find((asset) => asset.name.toLowerCase() === value)?.name
            : "Select Symbol..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search Symbol..." />

          <CommandEmpty>No asset found.</CommandEmpty>
          <CommandGroup>
            {assets?.map((asset) => (
              <CommandItem
                key={asset.name}
                value={asset.name}
                onSelect={(currentValue) => {
                  onChangeHandler(currentValue);
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === asset.name ? "opacity-100" : "opacity-0"
                  )}
                />
                {asset.name}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
