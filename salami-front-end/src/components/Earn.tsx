import React, { useState, useContext, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";
import SalamiAddModal from "./SalamiAddModal";
import SalamiRemoveModal from "./SalamiRemoveModal";
import axios from "axios";
import SalamiList from "./SalamiList";
import SalamiSampleList from "./SalamiSampleList";

import { userContext } from "./UserContext";
import { salamiAddModalContext } from "./UserContext";
import { salamiRemoveModalContext } from "./UserContext";

// interface
interface ISate {
  users: {
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
  const [users, setUsers] = useState<ISate["users"]>([]);

  useEffect(() => {
    const salamiData = async () => {
      const response = await axios.get(
        "https://eid-salami.herokuapp.com/all-salami"
      );
      const salmiData = response.data;
      setUsers(salmiData);
    };
    salamiData().catch((err) => console.log(err.message));
  }, []);

  // Total Amount
  const totalAmount = () => {
    return users.reduce(
      (acc, current) => Number(acc) + Number(current.amount),
      0
    );
  };

  // Salami Handle Modal Add
  const salamiHandleAddOpen = () => {
    setAddOpen(true);
  };

  // Salami Handle Modal Add
  const salamiHandleAddClose = () => {
    setAddOpen(false);
  };

  // Salami Handle Modal Remove
  const salamiHandleRemoveOpen = (id: number) => {
    setRemoveOpen({
      status: true,
      id: id,
    });
  };

  // Salami Handle Modal Remove
  const salamiHandleRemoveClose = () => {
    setRemoveOpen({
      status: false,
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
                users.length
                  ? users.map((person, index) => (
                      <SalamiList
                        user={person}
                        index={index}
                        salamiHandleRemoveOpen={salamiHandleRemoveOpen}
                      />
                    ))
                  : sampleUsers.map((person) => (
                      <SalamiSampleList user={person} />
                    ))
              }

              {/* Total Amount */}
              <TableRow>
                <TableCell colSpan={2} align="right">
                  <b>ঈদ এ মোট সালামি উঠেছে</b>
                </TableCell>
                <TableCell align="center">
                  <b>৳ {totalAmount() || "600"}</b>
                </TableCell>
                <TableCell colSpan={2}>
                  <Button
                    type="button"
                    onClick={salamiHandleAddOpen}
                    variant="contained"
                    color="secondary"
                    style={{ margin: "10px 0px 0px 50px" }}
                  >
                    ঈদ সালামি যোগ করুন
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>

      <SalamiAddModal
        open={addOpen}
        salamiHandleAddClose={salamiHandleAddClose}
      />
      <SalamiRemoveModal open={removeOpen} />
    </Grid>
  );
}

export default Earn;
