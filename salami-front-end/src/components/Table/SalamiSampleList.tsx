import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import { Link } from "react-router-dom";

// icon
import EditIcon from "@material-ui/icons/Edit";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";

// Interface
interface IProps {
  user: {
    id: number;
    name?: string;
    purpose?: string;
    amount: number;
    status: string;
  };
}

function SalamiSampleList({ user }: IProps) {
  return (
    <TableRow key={user.id}>
      <TableCell>{user.id}</TableCell>
      <TableCell>{user.name ? user.name : user.purpose}</TableCell>
      <TableCell align="center">৳ {user.amount}</TableCell>
      <TableCell align="center" style={{ width: "100px" }}>
        <Link to="/">
          <EditIcon style={{ color: "green" }} />
        </Link>
      </TableCell>
      <TableCell align="center" style={{ width: "100px" }}>
        <Link to="/">
          <DeleteForeverIcon style={{ color: "red" }} />
        </Link>
      </TableCell>
    </TableRow>
  );
}

export default SalamiSampleList;
