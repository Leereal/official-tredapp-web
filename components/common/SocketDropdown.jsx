import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const SocketDropdown = ({ value, onChangeHandler }) => {
  const sockets = ["Node", "Python"];

  return (
    <Select onValueChange={onChangeHandler} defaultValue={value}>
      <SelectTrigger className="select-field">
        <SelectValue placeholder="Socket" />
      </SelectTrigger>
      <SelectContent>
        {sockets.length > 0 &&
          sockets.map((socket) => (
            <SelectItem
              key={socket}
              value={socket}
              className="select-item p-regular-14"
            >
              {socket}
            </SelectItem>
          ))}
      </SelectContent>
    </Select>
  );
};

export default SocketDropdown;
