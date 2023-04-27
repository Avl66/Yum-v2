import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

function Register() {
  const [user, setUser] = useState({ mail: "", psd: "", addr: "" });
  const [msg, setMsg] = useState("");
  const history = useHistory();
  useEffect(() => {
    let inter;
    if (msg.includes("Success")) {
      inter = setTimeout(() => {
        history.push("/login");
        setMsg("");
      }, 1000);
    }
    //clear time-out & subscriptions before unmounting the component
    return () => clearTimeout(inter);
  }, [msg, history]);

  const changeMe = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };
  const success = {
    padding: "10px 15px",
    border: "1px solid green",
    color: "green",
  };
  const fail = { padding: "10px 15px", border: "1px solid red", color: "red" };

  const registerMe = (e) => {
    e.preventDefault();
    let { mail, psd, addr } = user;
    if (mail !== "" && psd !== "" && addr !== "") {
      //Firebase automatically creates unique userid when data is posted
      //api post to server
      axios
        .post(
          "https://food-items-server-default-rtdb.asia-southeast1.firebasedatabase.app/users.json",
          JSON.stringify(user)
        )
        .then(
          () => setMsg("Registered Successfully")
          //redirect to login page
        )
        .catch((e) => {
          setMsg(`${e.message}.Please try again after sometime.`);
        });
    }
  };
  return (
    <form className="form1" onSubmit={registerMe}>
      <h2>Register Form</h2>
      <br />
      <div className="d-flex flex-column">
        <div className="form-group">
          <div className="form-group">
            <label htmlFor="email" className="form-label m-2 h5">
              Email
            </label>
            <input
              type="email"
              name="mail"
              placeholder="Email"
              className="form-control"
              value={user.mail}
              onChange={changeMe}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password" className="form-label m-2 h5">
              Password
            </label>
            <input
              type="password"
              name="psd"
              placeholder="Password"
              className="form-control"
              value={user.psd}
              onChange={changeMe}
              required
            />
          </div>
          <label htmlFor="address" className="form-label m-2 h5">
            Address
          </label>
          <textarea
            type="text"
            name="addr"
            placeholder="Address"
            className="form-control"
            value={user.addr}
            onChange={changeMe}
            required
          />
        </div>
        <button className="btn btn-primary my-3 h4">Sign Up</button>
        <div
          className="h5 text-center"
          style={msg === "" ? {} : msg.includes("Success") ? success : fail}
        >
          {msg}
        </div>
        <hr />
        <span>
          Already have an account? | <Link to="/login">Sign in</Link>
        </span>
      </div>
    </form>
  );
}

export default React.memo(Register);
