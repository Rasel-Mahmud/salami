import React, { useState, useEffect, useContext } from "react";
import Modal from "@material-ui/core/Modal";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { salamiAddModalContext } from "./../UserContext";

interface ISate {
  formData: {
    name: string;
    amount: number;
  }[];
}

interface IProps {
  open: boolean;
  salamiHandleAddClose: () => void;
}

function SalamiAddModal({ open, salamiHandleAddClose }: IProps) {
  const [formData, setFormData] = useState<ISate["formData"]>([]);
  const { addOpen, setAddOpen } = useContext(salamiAddModalContext);

  const onClickHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmitHandler = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Post data in MongoDB
    const earnCollection = async () => {
      if (addOpen.whatIDid === "earn") {
        const postFormData = await fetch("http://localhost:3500/earn/", {
          method: "POST",
          body: JSON.stringify(formData),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        });
        const jsonData = await postFormData.json();
        if (jsonData?.data?._id) {
          setAddOpen({ status: false, whatIDid: "" });
        }
      }
      if (addOpen.whatIDid === "spend") {
        const postFormData = await fetch("http://localhost:3500/spend/", {
          method: "POST",
          body: JSON.stringify(formData),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        });
        const jsonData = await postFormData.json();
        if (jsonData?.data?._id) {
          setAddOpen({ status: false, whatIDid: "" });
        }
      }
    };
    earnCollection();
  };

  return (
    <Modal
      open={open}
      onClose={salamiHandleAddClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <form
        onSubmit={onSubmitHandler}
        noValidate
        autoComplete="off"
        className="modal-wrapper"
        style={{ width: "500px" }}
      >
        <h3>
          {addOpen.whatIDid === "earn"
            ? "সালামি জমা করুন"
            : "খরচ নথিভুক্ত করুন"}
        </h3>
        <TextField
          name="name"
          id="outlined-basic"
          onChange={onClickHandler}
          fullWidth
          label={
            addOpen.whatIDid === "earn"
              ? "যার থেকে সালামি পেয়েছি"
              : "যে খাত এ খরচ হয়েছে"
          }
          variant="outlined"
        />
        <TextField
          type="number"
          name="amount"
          id="outlined-basic"
          onChange={onClickHandler}
          fullWidth
          label={
            addOpen.whatIDid === "earn" ? "যত টাকা পেয়েছি" : "যত টাকা খরচ হয়েছে"
          }
          variant="outlined"
        />
        <Button type="submit" variant="contained" color="secondary">
          {addOpen.whatIDid === "earn" ? "জমা করি" : "খরচের হিসাব যুক্ত করি"}
        </Button>
      </form>
    </Modal>
  );
}

export default SalamiAddModal;
