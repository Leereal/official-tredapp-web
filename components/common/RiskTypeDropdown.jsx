import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";

const RiskTypeDropdown = ({ value, onChangeHandler }) => {
  const risk_types = [
    "FLAT",
    "MARTINGALE",
    "COMPOUND ALL",
    "COMPOUND PROFIT ONLY",
    "BALANCE PERCENTAGE",
  ];

  return (
    <Select onValueChange={onChangeHandler} defaultValue={value}>
      <SelectTrigger className="select-field">
        <SelectValue placeholder="Risk Type" />
      </SelectTrigger>
      <SelectContent>
        {risk_types.length > 0 &&
          risk_types.map((risk_type) => (
            <SelectItem
              key={risk_type}
              value={risk_type}
              className="select-item p-regular-14"
            >
              {risk_type}
            </SelectItem>
          ))}
      </SelectContent>
    </Select>
  );
};

export default RiskTypeDropdown;
