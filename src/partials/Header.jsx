import React from "react";
import { Container, Navbar, Form, FormControl, Button } from "react-bootstrap";

const Header = () => {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="#home" className="logo">
          <span>DAILY</span> NEWS
        </Navbar.Brand>
        <div className="d-flex justify-content-center align-items-center">
          <Form className="d-flex w-100">
            <FormControl
              type="search"
              placeholder="Search"
              className="mr-2"
              aria-label="Search"
            />
          </Form>
        </div>
      </Container>
    </Navbar>
  );
};

export default Header;
