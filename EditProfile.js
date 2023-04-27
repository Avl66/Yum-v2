import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
var store = require("store");

function EditProfile() {
  //console.log("editprofile rendered");
  const history = useHistory();
  const memberId = store.get("user").id;
  const [edituser, setEditUser] = useState({ mail: "", psd: "", addr: "" });
  const editMe = (e) => {
    const { name, value } = e.target;
    setEditUser({
      ...edituser,
      [name]: value,
    });
  };
  const editProfile = (e) => {
    e.preventDefault();
    axios
      .put(
        `https://food-items-server-default-rtdb.asia-southeast1.firebasedatabase.app/users/${memberId}.json`,
        JSON.stringify(edituser),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      //store.set('user', response.data);
      .then((response) => {
        console.log(response);
        //store.set('user', response.data);
        alert("Profile updated successfully !!");
        history.push("/");
      })
      .catch((e) => {
        alert(`${e.message}.Please try again after sometime.`);
      });
  };
  return (
    <form className="form1" onSubmit={editProfile}>
      <h2 className="text-center">Edit Profile</h2>
      <hr />
      <div className="d-flex flex-column">
        <div className="form-group py-2">
          <input
            type="email"
            name="mail"
            placeholder="Email"
            className="form-control"
            value={edituser.mail}
            onChange={editMe}
            required
          />
        </div>

        <div className="form-group py-2">
          <input
            type="password"
            name="psd"
            placeholder="Password"
            className="form-control"
            value={edituser.psd}
            onChange={editMe}
            required
          />
        </div>

        <div className="form-group py-2">
          <textarea
            type="text"
            name="addr"
            placeholder="Address"
            className="form-control"
            value={edituser.addr}
            onChange={editMe}
            required
          />
        </div>
        <button className="btn btn-success my-3 h4">Update Profile</button>
        <hr />
      </div>
    </form>
  );
}

export default EditProfile;
