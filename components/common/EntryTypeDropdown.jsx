import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const EntryTypeDropdown = ({ value, onChangeHandler }) => {
  const entry_types = [
    "BUY",
    "SELL",
    "BUY STOP",
    "BUY LIMIT",
    "SELL STOP",
    "SELL LIMIT",
  ];

  return (
    <Select onValueChange={onChangeHandler} defaultValue={value}>
      <SelectTrigger className="select-field">
        <SelectValue placeholder="Entry Type" />
      </SelectTrigger>
      <SelectContent>
        {entry_types.length > 0 &&
          entry_types.map((entry_type) => (
            <SelectItem
              key={entry_type}
              value={entry_type}
              className="select-item p-regular-14"
            >
              {entry_type}
            </SelectItem>
          ))}
      </SelectContent>
    </Select>
  );
};

export default EntryTypeDropdown;
