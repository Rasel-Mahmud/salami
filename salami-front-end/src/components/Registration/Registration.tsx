import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import axios from "axios";

// interface
interface ISate {
  registration: {
    username: String;
    email: string;
    password: any;
  };
}

function Registration() {
  const [userData, setUserData] = useState<ISate["registration"]>({
    username: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");

  const registrationFromHandler = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    // check field is not empty
    if (
      userData.username != "" &&
      userData.email != "" &&
      userData.password != ""
    ) {
      const registerUser = async () => {
        const response = await axios.post(
          "http://localhost:3500/user/register",
          userData
        );
        console.log(response);
        if (response.status === 200) {
          setMessage(response.data.message);
        }
      };
      registerUser();
    }
  };

  const onChangeFromHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };
  return (
    <div className="registration">
      <Grid container justifyContent="center" alignItems="center" spacing={3}>
        <h3>নিবন্ধন করুন</h3>
        <Grid item md={12}>
          <form
            onSubmit={registrationFromHandler}
            className="registration-form"
            noValidate
            autoComplete="off"
          >
            <TextField
              name="username"
              className="registration-input"
              label="নাম"
              variant="outlined"
              onChange={onChangeFromHandler}
            />
            <TextField
              name="email"
              type="email"
              className="registration-input"
              label="ই-মেল"
              variant="outlined"
              onChange={onChangeFromHandler}
            />
            <TextField
              name="password"
              type="password"
              className="registration-input"
              label="পাসওয়ার্ড"
              variant="outlined"
              onChange={onChangeFromHandler}
            />
            <Button type="submit" variant="contained" color="primary">
              নিবন্ধন করুন
            </Button>
          </form>
          <p>{message}</p>
          <p>
            আপনি কি নিবন্ধিত? তাহলে প্রবেশ করতে
            <Link to="/login">এখানে ক্লিক</Link> করুন
          </p>
        </Grid>
      </Grid>
    </div>
  );
}

export default Registration;
