import logo from "../NavBarAfterLogin/logonew.png";
import React from "react";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import AddServices from "../services/addservice";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import { Link, useNavigate } from "react-router-dom";


function NavBarAfterLogin() {
    const navigate = useNavigate();
    const handleLogout = () => {
        navigate("/sign-in", { replace: true });
        localStorage.clear();
    };

    return (
        <Navbar fixed="top" className="navbar-color navbar navbar-dark" expand="lg">
            <img className="mx-2" style={{ width: '200px', height: '50px' }} src={logo} alt="Logo" />
            <Container>
                <NavLink to="/dashboard">

                </NavLink>

                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Nav className="nav-text-color">
                    {/* <Nav.Item className="p-2">
                            <NavLink to="/sign-in" className="nav-text-color">
                                Sign-in
                            </NavLink>
                        </Nav.Item> */}

                    <Nav.Item className="p-2 float-left">
                        <NavLink to="/services" className="nav-text-color">
                            Services
                        </NavLink>
                    </Nav.Item>

                    {localStorage.isServiceProvider == "true" ?
                        <Nav.Item className="p-2 float-left">
                            <NavLink to="/addservice" className="nav-text-color">
                                Add Services
                            </NavLink>
                        </Nav.Item>
                        : ""
                    }
                    {/* <Nav.Item className="p-2 float-left">
                        <NavLink to="/listservices" className="nav-text-color">
                            List Services
                        </NavLink>
                    </Nav.Item> */}
                    {/* <Nav.Item className="p-2 float-left">
                        <NavLink to="/bookappointment" className="nav-text-color">
                            BookAppointment
                        </NavLink>
                    </Nav.Item> */}
                    <Nav.Item className="p-2 float-left">
                        <NavLink to="/appointmentrequests" className="nav-text-color">
                            Appointments
                        </NavLink>
                    </Nav.Item>
                    <Nav.Item className="p-2 float-left">
                        <NavLink to="/sign-in" className="nav-text-color" onClick={handleLogout}>
                            Log out
                        </NavLink>
                    </Nav.Item>

                    {/* <Nav.Item className="p-2">
                            <NavLink to="/UpdateApplicationStatus" className="nav-text-color">
                                Update Application Status
                            </NavLink>
                        </Nav.Item>

                        <Nav.Item className="p-2">
                            <NavLink to="/dashboard" className="nav-text-color">
                                Dashboard
                            </NavLink>
                        </Nav.Item>

                    */}
                </Nav>

                {/*
                    <Nav.Item className="ms-auto p-2">
                        <NavLink to="/profile" className="nav-text-color">
                            Profile
                        </NavLink>
                    </Nav.Item> */}
            </Container>
        </Navbar>
    );
}

export default NavBarAfterLogin;
