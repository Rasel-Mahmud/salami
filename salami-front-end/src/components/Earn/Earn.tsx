import React, { useState, useContext, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import Button from "@material-ui/core/Button";
import SalamiAddModal from "./../Modal/SalamiAddModal";
import SalamiRemoveModal from "./../Modal/SalamiRemoveModal";
import axios from "axios";
import SalamiList from "./../Table/SalamiList";
import SalamiSampleList from "./../Table/SalamiSampleList";

import { userContext } from "./../UserContext";
import { salamiAddModalContext } from "./../UserContext";
import { salamiRemoveModalContext } from "./../UserContext";
import { salamiBalance } from "./../UserContext";

// interface
interface ISate {
  list: {
    _id: number;
    name: string;
    amount: number;
  }[];
  sampleUser: {
    id: number;
    name: string;
    amount: number;
    status: string;
  }[];
}

function Earn() {
  const sampleUsers = useContext<ISate["sampleUser"]>(userContext);
  const { addOpen, setAddOpen } = useContext(salamiAddModalContext);
  const { removeOpen, setRemoveOpen } = useContext(salamiRemoveModalContext);
  const [earnList, setEarnList] = useState<ISate["list"]>([]);
  const { balance, setBalance } = useContext(salamiBalance);

  useEffect(() => {
    const salamiData = async () => {
      const response = await axios.get("http://localhost:3500/earn/all", {
        headers: {
          Authorization: localStorage.getItem("salami-auth"),
        },
      });
      const salmiData = response.data.data;
      setEarnList(salmiData);
    };
    salamiData().catch((err) => console.log(err.message));
  }, []);

  // Total Amount
  useEffect(() => {
    const totalAmount = () => {
      const totalBalance = earnList.reduce(
        (acc, current) => Number(acc) + Number(current.amount),
        0
      );
      return totalBalance;
    };
    totalAmount();
    setBalance({ ...balance, earn: totalAmount() });
  }, [earnList]);

  // Salami Handle Modal Add
  const salamiHandleAddOpen = (whatIDid: string) => {
    setAddOpen({
      status: true,
      whatIDid: whatIDid,
    });
  };

  // Salami Handle Modal Add
  const salamiHandleAddClose = () => {
    setAddOpen({
      status: false,
      whatIDid: "",
    });
  };

  // Salami Handle Modal Remove
  const salamiHandleRemoveOpen = (id: number) => {
    setRemoveOpen({
      status: true,
      id: id,
    });
  };

  return (
    <Grid container>
      <Grid item xs={12}>
        <TableContainer>
          <Table>
            <TableBody>
              {/* Table Header */}
              <TableRow>
                <TableCell></TableCell>
                <TableCell>
                  <b>নাম</b>
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
              {
                /* Table body from loop */
                earnList.length
                  ? earnList.map((list, index) => (
                      <SalamiList
                        key={index}
                        list={list}
                        index={index}
                        salamiHandleRemoveOpen={salamiHandleRemoveOpen}
                      />
                    ))
                  : sampleUsers.map((list) => (
                      <SalamiSampleList list={list} key={list.id} />
                    ))
              }

              {/* Total Amount */}
              <TableRow>
                <TableCell colSpan={2} align="right">
                  <b>ঈদ এ মোট সালামি উঠেছে</b>
                </TableCell>
                <TableCell align="center">
                  <b>৳ {balance.earn || "600"}</b>
                </TableCell>
                <TableCell colSpan={2}>
                  <Button
                    type="button"
                    onClick={() => salamiHandleAddOpen("earn")}
                    variant="contained"
                    color="secondary"
                    style={{ margin: "10px 0px 0px 50px" }}
                  >
                    সালামি যোগ করুন
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
      <SalamiRemoveModal open={removeOpen} whatIDid="earn" />
    </Grid>
  );
}

export default Earn;
