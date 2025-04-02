import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import './footer.css';

const Footer = () => {
  return (
    <footer
      style={{
        marginTop: "1rem",
        padding: "1rem",
        backgroundColor: "#CD5C5C",
        position: "absolute",
        marginBottom: "0",
        left: "0",
        width: "100%"
      }}
    >
      <Container >
        <Row className="d-flex justify-content-center">
        <Col lg="4">
            <Row className="text-light fontdesign"><h5>About Us</h5></Row>
            <Row className="text-light fontdesign">We are emerging service providing</Row>
            <Row className="text-light fontdesign">solutions. We aim to provide you</Row>
            <Row className="text-light fontdesign">best service in best price.</Row>
          </Col>
          <Col lg="4" className="pl-5">
            <Row className="text-light fontdesign"><h5>Contact Us</h5></Row>
            <Row className="text-light fontdesign">Mobile: +1(903)322442</Row>
            <Row className="text-light fontdesign">Landline: (206)23135453</Row>
            <Row className="text-light fontdesign">Email: celebrations@gmail.com</Row>
          </Col>
          <Col lg="4" className="pl-5">
          <Row className="text-light fontdesign"><h5>Address</h5></Row>
            <Row className="text-light fontdesign">6299 South St</Row>
            <Row className="text-light fontdesign">Halifax, Nova Scotia</Row>
            <Row className="text-light fontdesign">B3H 4R2</Row>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;