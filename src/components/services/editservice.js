
import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TimePicker from 'react-time-picker';
import Button from "react-bootstrap/Button";
import { Form, Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";


const axios = require("axios");

function AddServices() {
    const params = useParams();
    var options = require("../../config/constants");
    const navigate = useNavigate();
    const initialServiceState = {
        id: null,
        company_name: "",
        email: "",
        mobile: "",
        service_type: "",
        description: "",
        image: "",
    };

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

    const handleInputChange = event => {
        const { name, value } = event.target;
        setService({ ...service, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // if (!handleValidation()) {
        //     alert("errors");
        //     console.log(errors);
        // }
        // else {
        var data = {
            company_name: service.company_name,
            email: service.email,
            mobile: service.mobile,
            service_type: service.service_type,
            description: service.description,
            opening_time: openingTime,
            closing_time: closingTime,
            // image: service.image,
        };
        const url = options.BACKEND_APP_URL + "services/" + params.id + "/edit";
        axios.put(url, data)
            .then(response => {
                setService({
                    company_name: response.company_name,
                    email: response.email,
                    mobile: response.mobile,
                    service_type: response.service_type,
                    description: response.description,
                    opening_time: response.opening_time,
                    closing_time: response.closing_time,
                    // image: response.image,
                });
                navigate("/listservices")
            })
            .catch(e => {
                console.log(e);
            });
        // }
    };

    return (
        <Container >
            <Row className="my-2"><h3 style={{ fontFamily: 'Roboto', color: "Maroon", fontWeight: "bold" }}>Edit Service</h3></Row>
            <Form className="border border-primary p-3" onSubmit={handleSubmit}>
                <Form.Group className="mb-3" >
                    <Form.Label>Company Name</Form.Label>
                    <Form.Control name="company_name" value={service.company_name} onChange={handleInputChange} type="text" placeholder="Enter company name" />
                </Form.Group>
                <Form.Group className="mb-3" >
                    <Form.Label>Email address</Form.Label>
                    <Form.Control name="email" value={service.email} onChange={handleInputChange} type="email" placeholder="Enter email" />
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3" >
                    <Form.Label>Mobile number</Form.Label>
                    <Form.Control name="mobile" value={service.mobile} onChange={handleInputChange} type="tel" placeholder="Provide your number to contact" />
                </Form.Group>

                <Form.Label>Service type</Form.Label>
                <Form.Select name="service_type" value={service.service_type} onChange={handleInputChange} className="mb-3" aria-label="Default select example">
                    <option>Select service</option>
                    <option value="Catering">Catering</option>
                    <option value="Decoration">Decoration</option>
                    <option value="Beauty">Beauty and salon</option>
                    <option value="Bands">Bands and music</option>
                    <option value="Flowers">Flowers</option>
                    <option value="Partyplots">Party plots</option>
                </Form.Select>

                <Form.Group className="mb-3" >
                    <Form.Label>Description</Form.Label>
                    <Form.Control name="description" value={service.description} onChange={handleInputChange} type="text" placeholder="Write about your service" />
                </Form.Group>
                <Form.Group className="mb-3" >
                    <Form.Label>Opening time</Form.Label>
                    <TimePicker className="m-3"  name="opening_time" onChange={onOpeningTime} value={openingTime} />

                    <Form.Label>Closing time</Form.Label>
                    <TimePicker className="m-3" name="closing_time" onChange={onClosingTime} value={closingTime} />
                </Form.Group>
                <Button onClick={handleSubmit} variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </Container>
    );
}

export default AddServices;