 import React from "react";
 import { useEffect, useState } from "react";
 import { NavLink } from "react-router-dom";
 import { Link, useNavigate } from "react-router-dom";
 import Button from "react-bootstrap/Button";
 import Form from "react-bootstrap/Form";
 import axios from "axios";
 var options = require("../../config/constants");

 
 function SignIn(props) {
   const navigate = useNavigate();
 
   const emailRegex = /^[0-9a-zA-Z._-]+@[0-9a-zA-Z._-]+\.[(0-9a-zA-Z._)]+$/;
   const passwordRegex = /^.{8,}$/;
 
   const [errorMessage, setErrorMessage] = useState("");
   const [isLoggedIn, setLoginState] = useState(false);
 
   const [data, setData] = useState({
     email: "",
     password: "",
   });
 
   const handleChange = ({ target: { name, value } }) => {
     setData((prev) => ({ ...prev, [name]: value }));
   };
 
   const handleSubmit = async (e) => {
     e.preventDefault();
 
     if (!emailRegex.test(data.email)) {
       setErrorMessage("Please provide valid email address");
     } else if (!passwordRegex.test(data.password)) {
       setErrorMessage(
         "Instructions for password: Minimum 8 Characters + One special Character + One Capital"
       );
     } else {
       setErrorMessage("");
       try {
         const url = options.BACKEND_APP_URL+"sign-in-user";
         // Axios content header with token
         const res = await axios.post(url, data);
         console.log(res);
         console.log("This is inside Try Block");
         console.log(res.message);
         if (res.data.success == true) {
          console.log(res.data.data);

           localStorage.setItem("token", res.data.token);
           localStorage.setItem("isAdmin", res.data.data.isAdmin);
           localStorage.setItem("isServiceProvider", res.data.data.isServiceProvider);
           localStorage.setItem("token", res.data.token);
           localStorage.setItem("email", data.email);
           localStorage.setItem("firstName", res.data.data.firstName);
           localStorage.setItem("mobile", res.data.data.mobile);
           setLoginState(true);
           console.log(localStorage);
           navigate("/services");
         }else{
          setErrorMessage(res.data.message);
          console.log(res.data);
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
           <h3>Sign In</h3>
           <br />
           <div className="form-group">
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
           <div className="button-center">
             <Button variant="primary" type="submit">
               Sign In
             </Button>
           </div>
           <div>
             <hr className="simple-line" />
           </div>
           <div className="button-center forgot-password text-right">
             <p className="forgot-password text-right">
               Not registered ? <NavLink to="/sign-up">Register here</NavLink>
             </p>
           </div>
         </div>
       </div>
     </Form>
   );
 }
 
 export default SignIn;
 