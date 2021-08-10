import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import axios from "axios";

// Interface
interface IState {
  login: {
    email: string;
    password: any;
  };
}

function Login() {
  const [userData, setUserData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");

  const registrationFromHandler = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    // check field is not empty
    if (userData.email != "" && userData.password != "") {
      const loginUser = async () => {
        const response = await axios.post(
          "http://localhost:3500/user/login",
          userData
        );
        if (response.status === 200) {
          setMessage(response.data.message);
          localStorage.setItem(
            "salami-auth",
            "Bearer " + response.data.access_token
          );
        }
      };
      loginUser();
    }
  };

  // Getting form input information
  const onChangeFromHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };
  return (
    <div className="login">
      <Grid container justifyContent="center" alignItems="center" spacing={3}>
        <h3>প্রবেশ করুন</h3>
        <Grid item md={12}>
          <form
            onSubmit={registrationFromHandler}
            className="login-form"
            noValidate
            autoComplete="off"
          >
            <TextField
              name="email"
              onChange={onChangeFromHandler}
              type="email"
              className="login-input"
              label="ই-মেল"
              variant="outlined"
            />
            <TextField
              name="password"
              onChange={onChangeFromHandler}
              type="password"
              className="login-input"
              label="পাসওয়ার্ড"
              variant="outlined"
            />
            <Button type="submit" variant="contained" color="primary">
              প্রবেশ করুন
            </Button>
          </form>
          <p>{message}</p>
          <p>
            এখনো নিবন্ধন করেন নি? নিবন্ধন করতে{" "}
            <Link to="/registration">এখানে ক্লিক</Link> করুন
          </p>
        </Grid>
      </Grid>
    </div>
  );
}

export default Login;
