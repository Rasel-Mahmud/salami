import React, { useContext, useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import Button from "@material-ui/core/Button";
import { salamiSpendContext } from "./../UserContext";
import SalamiSampleList from "./../Table/SalamiSampleList";
import SalamiList from "../Table/SalamiList";
import { salamiRemoveModalContext } from "./../UserContext";
import { salamiAddModalContext } from "./../UserContext";
import axios from "axios";
import SalamiAddModal from "../Modal/SalamiAddModal";
import SalamiRemoveModal from "../Modal/SalamiRemoveModal";
import { salamiBalance } from "./../UserContext";

interface ISate {
  sampleUser: {
    id: number;
    purpose: string;
    amount: number;
    status: string;
  }[];
  list: {
    _id: number;
    name: string;
    amount: number;
  }[];
}

function Spend() {
  const sampleUsers = useContext<ISate["sampleUser"]>(salamiSpendContext);
  const [spendList, setSpendList] = useState<ISate["list"]>([]);
  const { addOpen, setAddOpen } = useContext(salamiAddModalContext);
  const { removeOpen, setRemoveOpen } = useContext(salamiRemoveModalContext);
  const { balance, setBalance } = useContext(salamiBalance);

  // Get all spend List
  useEffect(() => {
    const getAllSpendList = async () => {
      const response = await axios.get("http://localhost:3500/spend/all");
      setSpendList(response.data.data);
    };
    getAllSpendList();
  }, []);

  // Total Amount
  useEffect(() => {
    const totalAmount = () => {
      const totalBalance = spendList.reduce(
        (acc, current) => Number(acc) + Number(current.amount),
        0
      );
      return totalBalance;
    };
    totalAmount();
    setBalance({ ...balance, spend: totalAmount() });
  }, [spendList]);

  // Salami List Remove
  const salamiHandleRemoveOpen = (id: number) => {
    setRemoveOpen({
      status: true,
      id: id,
    });
  };

  // Salami handle popup model close
  const salamiHandleAddClose = () => {
    setAddOpen({
      status: false,
      whatIDid: "",
    });
  };

  // Salami handle popup model open
  const salamiHandlerOpen = (whatIDid: string) => {
    setAddOpen({
      status: true,
      whatIDid: whatIDid,
    });
  };

  return (
    <Grid container>
      <Grid item xs={12}>
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

              {spendList && spendList.length
                ? spendList.map((list, index) => (
                    <SalamiList
                      key={index}
                      list={list}
                      index={index}
                      salamiHandleRemoveOpen={salamiHandleRemoveOpen}
                    />
                  ))
                : sampleUsers.map((list) => (
                    <SalamiSampleList list={list} key={list.id} />
                  ))}

              {/* Total Amount */}
              <TableRow>
                <TableCell colSpan={2} align="right">
                  <b>ঈদ এ মোট করছ হয়েছে</b>
                </TableCell>
                <TableCell align="center">
                  <b>৳ {balance.spend}</b>
                </TableCell>
                <TableCell colSpan={2}>
                  <Button
                    type="button"
                    onClick={() => salamiHandlerOpen("spend")}
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

      <SalamiAddModal
        open={addOpen.status}
        salamiHandleAddClose={salamiHandleAddClose}
      />
      <SalamiRemoveModal open={removeOpen} whatIDid="spend" />
    </Grid>
  );
}

export default Spend;
