import React from "react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { Card, Container, Col, Row } from "react-bootstrap";
const axios = require("axios");

function ListServices() {
  var options = require("../../config/constants");
  function sayHello() {
    alert('You clicked me!');
  }

  const navigate = useNavigate();
  const [services, setServices] = useState([]);

  useEffect(() => {
    retrieveUserService(localStorage.email);
  }, []);

  const retrieveUserService = (email) => {
    const url = options.BACKEND_APP_URL + "services/user/" + email;
    axios.get(url)
      .then(response => {
        setServices(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };


  const handleClick = (id) => {
    navigate(`/house/${id}`);
  }

  return (
    <Container className="d-block justify-content-center border border-primary p-5">
      <Row className="mb-3 w-100">
        <h3 style={{ fontFamily: 'Roboto', color: "Maroon", fontWeight: "bold" }}>Your Services</h3>
      </Row>
      {services &&
        services.map((service,index) => (
          <Row key={index} className="d-flex justify-content-center border border-primary w-100 p-2 my-3">
            {console.log(service.image_urls)}
            <img src={service.image_urls[0]} width="100" height="50" />
            <Col key={index} lg="3">Image</Col><Col lg="3">{service.service_type}</Col><Col lg="3">
              <Button className="mx-1" variant="primary" onClick={() => navigate("/services/" + service.Id)}>Details</Button>
              <Button className="mx-1" variant="warning" onClick={() => navigate("/service/" + service.Id + "/edit")}>Edit</Button>
              <Button className="mx-1" variant="danger" onClick={() => navigate("/service/" + service.Id + "/edit")}>Delete</Button>

              </Col>
          </Row>
        ))}
    </Container>
  );
}

export default ListServices;