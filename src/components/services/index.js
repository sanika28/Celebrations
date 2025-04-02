
import React from "react";
import { useEffect, useState } from "react";
import {useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { Card, Container, Col, Row } from "react-bootstrap";
const axios = require("axios");


function Services() {
  var options = require("../../config/constants");
  const navigate = useNavigate();
  const [services, setServices] = useState([]);

  useEffect(() => {
    retrieveServices();
  },[]);

  const retrieveServices = () => {
    const url = options.BACKEND_APP_URL + "services";
    axios.get(url)
      .then(response => {
        setServices(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };


  return (
    <Container className="border border-primary p-2">
      <Row className="mb-3">
        <h3 style={{ fontFamily: 'Roboto', color: "Maroon", fontWeight: "bold" }}>All Services</h3>
      </Row>
      <Row>
        {services &&
          services.map(service => (
            <Col lg="4">
              <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={service.image_urls && service.image_urls[0]} />
                <Card.Body>
                  <Card.Title>{service.company_name}</Card.Title>
                  <Card.Text>
                  {service.service_type}
                  </Card.Text>
                  <Button variant="primary" onClick={() => navigate("/service/" + service.Id)} >Details</Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
      </Row>
    </Container>
  );
}

export default Services;