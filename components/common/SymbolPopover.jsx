import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useEffect, useState } from "react";

const SymbolPopover = ({ onChangeHandler, symbols }) => {
  const [activeSymbols, setActiveSymbols] = useState([]);
  const handleToggle = (e) => {
    let newSymbols = symbols.map((symbol) => ({
      name: symbol.name,
      active: e.some((activeSymbol) => activeSymbol.name === symbol.name),
    }));
    setActiveSymbols(e);
    onChangeHandler(newSymbols);
  };
  useEffect(() => {
    const oldActive = symbols.filter((symbol) => symbol.active === true);
    setActiveSymbols(oldActive);
  }, [symbols]);

  return (
    <div className="bg-grey-50 h-[54px] focus-visible:ring-offset-0 placeholder:text-grey-500 p-regular-16 px-4 py-3 focus-visible:ring-transparent border-2 border-dotted rounded-full text-center hover:bg-gray-100 cursor-pointer">
      <Popover>
        <PopoverTrigger>Symbols</PopoverTrigger>
        {console.log("Active Symbols : ", activeSymbols)}
        <PopoverContent className="p-2 w-fit ">
          {symbols && symbols.length ? (
            <ToggleGroup
              type="multiple"
              className=" justify-start"
              onValueChange={(e) => {
                handleToggle(e);
              }}
              value={activeSymbols}
            >
              <div className="p-0 flex flex-col">
                {symbols.map((symbol) => (
                  <ToggleGroupItem
                    key={symbol.name}
                    className="bg-grey-50 m-2 p-1 rounded-lg px-3"
                    value={symbol}
                  >
                    {symbol.name}
                  </ToggleGroupItem>
                ))}
              </div>
            </ToggleGroup>
          ) : (
            <div>No Symbols</div>
          )}
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default SymbolPopover;
