import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const AccountTypeDropdown = ({ value, onChangeHandler }) => {
  const account_types = ["PRACTICE", "REAL"];

  return (
    <Select onValueChange={onChangeHandler} defaultValue={value}>
      <SelectTrigger className="select-field">
        <SelectValue placeholder="Account Type" />
      </SelectTrigger>
      <SelectContent>
        {account_types.length > 0 &&
          account_types.map((account_type) => (
            <SelectItem
              key={account_type}
              value={account_type}
              className="select-item p-regular-14"
            >
              {account_type}
            </SelectItem>
          ))}
      </SelectContent>
    </Select>
  );
};

export default AccountTypeDropdown;
