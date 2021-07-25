import React, { useContext } from "react";
import Grid from "@material-ui/core/Grid";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import Button from "@material-ui/core/Button";
import { SpendTitle } from "./../Title";
import { salamiSpendContext } from "./../UserContext";
import SalamiSampleList from "./../Table/SalamiSampleList";

interface ISate {
  sampleUser: {
    id: number;
    purpose: string;
    amount: number;
    status: string;
  }[];
}

function Spend() {
  const sampleUsers = useContext<ISate["sampleUser"]>(salamiSpendContext);
  return (
    <Grid container>
      <Grid item xs={12}>
        <SpendTitle />
        <TableContainer>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell></TableCell>
                <TableCell>
                  <b>খরচের খাত</b>
                </TableCell>
                <TableCell align="center">
                  <b>টাকা</b>
                </TableCell>
                <TableCell align="center" style={{ width: "100px" }}>
                  <b>সম্পাদনা</b>
                </TableCell>
                <TableCell align="center" style={{ width: "100px" }}>
                  <b>অপসারণ</b>
                </TableCell>
              </TableRow>

              {/* Main Table Data  */}

              {sampleUsers.map((person) => (
                <SalamiSampleList user={person} key={person.id} />
              ))}

              {/* Total Amount */}
              <TableRow>
                <TableCell colSpan={2} align="right">
                  <b>ঈদ এ মোট করছ হয়েছে</b>
                </TableCell>
                <TableCell align="center">
                  <b>৳ 65</b>
                </TableCell>
                <TableCell colSpan={2}>
                  <Button
                    type="button"
                    // onClick={salamiHandleAddOpen}
                    variant="contained"
                    color="secondary"
                    style={{ margin: "10px 0px 0px 50px" }}
                  >
                    খরচ বাদ দিন
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
}

export default Spend;
