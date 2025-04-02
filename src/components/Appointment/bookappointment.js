import React from "react";
import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";
import TimePicker from 'react-time-picker';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import setHours from "date-fns/setHours";
import setMinutes from "date-fns/setMinutes";
import { Form, Card, Button, Container, Col, Row } from "react-bootstrap";


const axios = require("axios");

function BookAppointment() {
    var options = require("../../config/constants");
    const navigate = useNavigate();
    const params = useParams();

    const initialAppointmentState = {
        id: null,
        email: localStorage.email,
        occasion: "",
        company_name: "",
        service_type: "",
        status: "pending"
    };

    useEffect(() => {

    }, [params.id]);

    const [selectedDate, setSelectedDate] = useState(new Date());
    const [startDate, setStartDate] = useState(
        setHours(setMinutes(new Date(), 30), 16)
    );
    const [appointment, setAppointment] = useState(initialAppointmentState);

    const handleInputChange = event => {
        const { name, value } = event.target;
        setAppointment({ ...appointment, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        var data = {
            email: appointment.email,
            occasion: appointment.occasion,
            service_id: params.id,
            selectedDate: selectedDate,

        };
        const url = options.BACKEND_APP_URL + "appointments/add";
        axios.post(url, data)
            .then(response => {
                setAppointment({
                    company_name: response.company_name,
                    email: response.email,
                    occasion: response.occasion,
                    company_name: response.company_name,
                    service_type: response.service_type,
                    selectedDate: response.selectedDate,
                });
                navigate("/appointmentrequests")
            })
            .catch(e => {
                console.log(e);
            });
    };

    return (
        <Container >
            <Row className="my-2"><h3 style={{ fontFamily: 'Segoe Script', fontStyle: 'italic', color: "Maroon", fontWeight: "bold" }}>Book appointment</h3></Row>
            <Form className="border border-primary p-3" onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="email" value={localStorage.firstName} readOnly />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Mobile</Form.Label>
                    <Form.Control type="mobile" value={localStorage.mobile} readOnly />
                    <Form.Text>You will get a notification on this mobile number.</Form.Text>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" value={localStorage.email} readOnly />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Occasion</Form.Label>
                    <Form.Control name="occasion" type="text" onChange={handleInputChange} placeholder="Enter serivce of occasion" />
                </Form.Group>
                
                <Form.Group className="mb-3" controlId="calendar">
                    <Form.Label className="font-weight-bold">
                        Pick a Date and Time to Book your Appointment
                    </Form.Label>
                    <div className="w-100">
                        <DatePicker name="selecteddate"
                            selected={selectedDate}
                            onChange={(date) => setSelectedDate(date)}
                            showTimeSelect
                            timeIntervals={30}
                            dateFormat="MMMM d, yyyy h:mm aa"
                            minTime={setHours(setMinutes(new Date(), 0), 11)}
                            maxTime={setHours(setMinutes(new Date(), 30), 20)}
                        ></DatePicker>
                    </div>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </Container>
    );
}

export default BookAppointment;