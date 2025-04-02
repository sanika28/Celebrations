import React from "react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import TimePicker from 'react-time-picker';
import { Form, Card, Table, Container, Col, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";

const axios = require("axios");


function ViewServices() {
    var options = require("../../config/constants");
    const params = useParams();

    const initialServiceState = {
        id: null,
        company_name: "",
        email: "",
        mobile: "",
        service_type: "",
        description: "",
        image: "",
    };

    const navigate = useNavigate();
    const [openingTime, onOpeningTime] = useState('10:00');
    const [closingTime, onClosingTime] = useState('10:00');
    const [service, setService] = useState(initialServiceState);

    useEffect(() => {

        const url = options.BACKEND_APP_URL + "services/" + params.id;
        axios.get(url).then(response => {
            setService(response.data[0]);
            onOpeningTime(response.data[0].opening_time)
            onClosingTime(response.data[0].closing_time)
        });

    }, [params.id]);


    return (
        <Container>
            <Row className="my-2 text-center"><h3 style={{ fontFamily: 'Segoe Script', fontStyle: 'italic', color: "Maroon", fontWeight: "bold" }}>Service Description</h3></Row>
            <Table variant="danger" striped bordered hover>
                <tbody>
                    <tr>
                        <td>Service Company</td>
                        <td>{service.company_name}</td>
                    </tr>
                    <tr>
                        <td>Service type</td>
                        <td>{service.service_type}</td>
                    </tr>
                    <tr>
                        <td>Service description</td>
                        <td>{service.description}</td>
                    </tr>
                    <tr>
                        <td>Timings</td>
                        <td>{service.opening_time} to {service.closing_time}</td>
                    </tr>
                </tbody>
            </Table>
            <div class="row text-center">
                {service.image_urls &&
                    service.image_urls.map(image => (
                        <div class="col-sm-4">
                            <div class="thumbnail">
                                <img src={image} alt="Paris" width="400" height="300" />
                            </div>
                        </div>
                    ))}
                <Row className="my-4 d-flex justify-content-end">
                    {localStorage.isServiceProvider == "true" ?
                        <Col lg="2" className="d-inline">
                            <Button variant="warning" onClick={() => navigate("/service/" + params.id + "/edit")} >Edit service</Button>
                        </Col>
                        :
                        <Col lg="2" className="d-inline">
                            <p className="text-success">Want to contact?&nbsp;</p><Button variant="warning" onClick={() => navigate("/service/" + params.id + "/book-appointment")} >Book Appointment</Button>
                        </Col>}
                </Row>
            </div>
        </Container>

    );
}

export default ViewServices;