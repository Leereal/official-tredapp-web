import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";

import { getAllAccounts } from "@/lib/actions/account.actions";

const AccountDropdown = ({ value, onChangeHandler, type }) => {
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    const getAccounts = async () => {
      const accountList = await getAllAccounts({
        query: "",
        page: 1,
        limit: 100,
      });
      accountList && setAccounts(accountList.data);
    };

    getAccounts();
  }, []);

  return (
    <Select
      onValueChange={onChangeHandler}
      defaultValue={value}
      disabled={type === "Update"}
    >
      <SelectTrigger className="select-field">
        <SelectValue placeholder="Account" />
      </SelectTrigger>
      <SelectContent>
        {accounts.length > 0 &&
          accounts.map((account) => (
            <SelectItem
              key={account._id}
              value={account._id}
              className="select-item p-regular-14"
            >
              {account.account_name}
            </SelectItem>
          ))}
      </SelectContent>
    </Select>
  );
};

export default AccountDropdown;
