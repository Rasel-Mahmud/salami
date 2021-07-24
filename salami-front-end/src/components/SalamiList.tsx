import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import { Link } from "react-router-dom";

// icon
import EditIcon from "@material-ui/icons/Edit";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";

// types
interface IProps {
  user: {
    _id: number;
    name: string;
    amount: number;
  };
  index: number;
  salamiHandleRemoveOpen: (id: number) => void;
}

function SalamiList({ user, index, salamiHandleRemoveOpen }: IProps) {
  return (
    <TableRow key={user._id}>
      <TableCell>
        <b>{index + 1}</b>
      </TableCell>
      <TableCell>{user.name}</TableCell>
      <TableCell align="center">৳ {user.amount}</TableCell>
      <TableCell align="center" style={{ width: "100px" }}>
        <Link to="/">
          <EditIcon style={{ color: "green" }} />
        </Link>
      </TableCell>
      <TableCell align="center" style={{ width: "100px" }}>
        <Link to="/" onClick={(e) => salamiHandleRemoveOpen(user._id)}>
          <DeleteForeverIcon style={{ color: "red" }} />
        </Link>
      </TableCell>
    </TableRow>
  );
}

export default SalamiList;
