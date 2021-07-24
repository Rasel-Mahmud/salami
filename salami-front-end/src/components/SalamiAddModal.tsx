import React, { useState, useEffect, useContext } from "react";
import Modal from "@material-ui/core/Modal";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { salamiAddModalContext } from "./UserContext";

interface ISate {
  formData: {
    name: string;
    amount: Number;
  }[];
}

interface IProps {
  open: boolean;
  salamiHandleAddClose: () => void;
}

function SalamiAddModal({ open, salamiHandleAddClose }: IProps) {
  const [formData, setFormData] = useState<ISate["formData"]>([]);
  const { setAddOpen } = useContext(salamiAddModalContext);

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
      const postFormData = await fetch(
        "https://eid-salami.herokuapp.com/earn",
        {
          method: "POST",
          body: JSON.stringify(formData),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        }
      );
      const jsonData = await postFormData.json();
      if (jsonData.success) {
        setAddOpen(false);
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
        <h3>সালামি নিবন্ধন</h3>
        <TextField
          name="name"
          id="outlined-basic"
          onChange={onClickHandler}
          fullWidth
          label="যার থেকে সালামি পেয়েছি"
          variant="outlined"
        />
        <TextField
          type="number"
          name="amount"
          id="outlined-basic"
          onChange={onClickHandler}
          fullWidth
          label="যত টাকা পেয়েছি"
          variant="outlined"
        />
        <Button type="submit" variant="contained" color="secondary">
          জমা করি
        </Button>
      </form>
    </Modal>
  );
}

export default SalamiAddModal;
