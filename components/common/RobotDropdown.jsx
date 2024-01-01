import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";

import { getAllRobots } from "@/lib/actions/robot.actions";

const RobotDropdown = ({ value, onChangeHandler }) => {
  const [robots, setRobots] = useState([]);

  useEffect(() => {
    const getRobots = async () => {
      const robotList = await getAllRobots({
        query: "",
        category: "",
        page: 1,
        limit: 100,
      });
      robotList && setRobots(robotList.data);
    };

    getRobots();
  }, []);

  return (
    <Select onValueChange={onChangeHandler} defaultValue={value}>
      <SelectTrigger className="select-field">
        <SelectValue placeholder="Robot" />
      </SelectTrigger>
      <SelectContent>
        {robots.length > 0 &&
          robots.map((robot) => (
            <SelectItem
              key={robot._id}
              value={robot._id}
              className="select-item p-regular-14"
            >
              {robot.name}
            </SelectItem>
          ))}
      </SelectContent>
    </Select>
  );
};

export default RobotDropdown;
