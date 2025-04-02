import React from "react";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { Card, Table, Form, Container, Col, Row } from "react-bootstrap";
const axios = require("axios");

function AppointmentRequest() {
    var options = require("../../config/constants");
    const navigate = useNavigate();
    const [requests, setRequests] = useState([]);
    const [serviceType, setServiceType] = useState("");
    const [appointments, setAppointments] = useState([]);
    useEffect(() => {
        var url;
        if (localStorage.isAdmin == true) {
            url = options.BACKEND_APP_URL + "appointments/requests/";
        } else if (localStorage.isServiceProvider == "true") {
            url = options.BACKEND_APP_URL + "appointments/service-requests/" + localStorage.email;
        } else {
            console.log("inside");
            url = options.BACKEND_APP_URL + "appointments/requests/" + localStorage.email;
        }

        axios.get(url)
            .then(response => {
                if (localStorage.isServiceProvider == "true") {
                    setRequests(response.data);
                    setServiceType(response.data.service_type)
                    setAppointments(response.data.appointments);
                } else {
                    setRequests(response.data);
                    setServiceType(response.data[0].service_type)
                    setAppointments(response.data)
                }
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }, []);

    const handleUpdateStatus = (id, status) => {
        var data = {
            status: status,
        };
        const url = options.BACKEND_APP_URL + "appointments/" + id + "/update";
        axios.post(url, data).then(response => {
            navigate("/appointmentrequests")

            //RE RENDER IMPORTANT
        })
            .catch(e => {
                console.log(e);
            });
    }



    return (
        <Container className="d-block justify-content-center border border-primary p-5">
            <Row className="mb-3 w-100">
                <h3 style={{ fontFamily: 'Segoe Script', fontStyle: 'italic', color: "Maroon", fontWeight: "bold" }}>Appointment Requests</h3>
            </Row>
            <Row className="d-flex justify-content-center border border-primary w-100 p-2">
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Email Address</th>
                            <th>Phone Number</th>
                            <th>Ocassion</th>
                            <th>Service Type</th>
                            <th>Date & Time</th>
                            <th>Status</th>
                            {localStorage.isAdmin == true || localStorage.isServiceProvider == true ?
                                <th>Action</th>
                                : ""}
                        </tr>
                    </thead>
                    <tbody>
                        {requests && appointments &&
                            appointments.map((request, index) => (
                                <tr>
                                    <td>{request.email}</td>
                                    <td>{localStorage.mobile}</td>
                                    <td>{request.occasion}</td>  {/*add ocassion*/}
                                    <td>{serviceType}</td>

                                    <td>{request.selectedDate}</td>
                                    <td>{request.status}</td>
                                    {localStorage.isAdmin == true || localStorage.isServiceProvider == "true" ?
                                        <td><Button className="mx-1" onClick={() => handleUpdateStatus(request.Id, "Accepted")} variant="success" >Accept</Button>
                                            <Button variant="danger" onClick={() => handleUpdateStatus(request.Id, "Postponed")} >Postpone</Button></td>
                                        : ""}
                                </tr>
                            ))
                        }
                    </tbody>

                </Table>
            </Row>
        </Container>
    );
}

export default AppointmentRequest;