import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import { Link } from "react-router-dom";

// icon
import EditIcon from "@material-ui/icons/Edit";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";

// Interface
interface IProps {
  list: {
    id: number;
    name?: string;
    purpose?: string;
    amount: number;
    status: string;
  };
}

function SalamiSampleList({ list }: IProps) {
  return (
    <TableRow key={list.id}>
      <TableCell>{list.id}</TableCell>
      <TableCell>{list.name ? list.name : list.purpose}</TableCell>
      <TableCell align="center">৳ {list.amount}</TableCell>
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
