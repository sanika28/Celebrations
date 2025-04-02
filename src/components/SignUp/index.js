import React from "react";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { FormLabel } from "react-bootstrap";
var options = require("../../config/constants");

function SignUp() {
  const navigate = useNavigate();

  const nameRegex = /^[A-Za-z]+$/;
  const emailRegex = /^[0-9a-zA-Z._-]+@[0-9a-zA-Z._-]+\.[(0-9a-zA-Z._)]+$/;
  const passwordRegex = /^.{8,}$/;

  const [errorMessage, setErrorMessage] = useState("");

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    mobile: "",
    isAdmin: false,
    is_service_provider: false

  });

  const handleChange = ({ target: { name, value } }) => {
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nameRegex.test(data.firstName)) {
      setErrorMessage("Invalid first name - Only alphabets allowed");
    } else if (!nameRegex.test(data.lastName)) {
      setErrorMessage("Invalid last name - Only alphabets allowed");
    } else if (!emailRegex.test(data.email)) {
      setErrorMessage("Please provide valid email address");
    } else if (!passwordRegex.test(data.password)) {
      setErrorMessage(
        "Instructions for password: Minimum 8 Characters + One special Character + One Capital"
      );
    } else {
      setErrorMessage("");
      try {
        console.log(options.BACKEND_APP_URL);
        const url = options.BACKEND_APP_URL + "sign-up-user";
        const res = await axios.post(url, data);
        console.log(res);
        console.log("This is inside Try Block");
        console.log(res.data.success);
        if (res.data.success == true) {
          navigate("/sign-in");
        }
      } catch (error) {
        setErrorMessage(error.message);
        console.log(error);
      }
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <div className="outer">
        <div className="inner">
          <h3>Register</h3>
          <br />
          <div className="form-group">
            <FormLabel><strong>First name</strong></FormLabel>
            <input
              type="text"
              className="form-control inside-textbox form-field-color"
              placeholder="First name"
              name="firstName"
              value={data.firstName}
              onChange={handleChange}
            />
          </div>
          <br />
          <div className="form-group">
            <FormLabel><strong>Last name</strong></FormLabel>
            <input
              type="text"
              className="form-control inside-textbox form-field-color"
              placeholder="Last name"
              name="lastName"
              value={data.lastName}
              onChange={handleChange}
            />
          </div>
          <br />
          <div className="form-group">
            <FormLabel><strong>Mobile</strong></FormLabel>
            <input
              type="text"
              className="form-control inside-textbox form-field-color"
              placeholder="Enter mobile number"
              name="mobile"
              value={data.mobile}
              onChange={handleChange}
            />
          </div>
          <br />
          <div className="form-group">
            <FormLabel><strong>Email</strong></FormLabel>
            <input
              type="email"
              className="form-control inside-textbox form-field-color"
              placeholder="Enter email"
              name="email"
              value={data.email}
              onChange={handleChange}
            />
          </div>
          <br />
          <div className="form-group">
            <FormLabel><strong>Password</strong></FormLabel>
            <input
              type="password"
              className="form-control inside-textbox form-field-color"
              placeholder="Enter password"
              name="password"
              value={data.password}
              onChange={handleChange}
            />
          </div>
          <br />
          {errorMessage.length > 0 ? (
            <p className="button-center" style={{ color: "red" }}>
              {errorMessage}
            </p>
          ) : null}

          <div className="form-group">
            <FormLabel><strong>Register as Service Provider</strong></FormLabel>
            <select name="is_service_provider" id="is_service_provider" value={data.is_service_provider} className="form-control inside-textbox form-field-color" onChange={handleChange}>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>

          <div className="button-center ">
            <Button variant="primary" type="submit">
              Register
            </Button>
          </div>
          <div>
            <hr className="simple-line" />
          </div>
          <div className="button-center forgot-password text-right">
            <p className="forgot-password text-right">
              Already registered ? <NavLink to="/sign-in">log in</NavLink>
            </p>
          </div>
        </div>
      </div>
    </Form>
  );
}

export default SignUp;
