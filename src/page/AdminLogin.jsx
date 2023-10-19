import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import axios from "axios";
import Navbar_log from "../components/Navbar_log";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

const AdminLogin = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [_, setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate();

  const handleChangeName = (e) => {
    setName(e.target.value);
    setErrors({ ...errors, name: "" });
  };
  const handleChangePassword = (e) => {
    setPassword(e.target.value);
    setErrors({ ...errors, password: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://showcasebackend.onrender.com/admin/login",
        {
          name,
          password,
        }
      );

      console.log(response.data);
      setCookies("access_token", response.data.token);
      navigate("/admin");
    } catch (error) {
      if (error.response && error.response.status === 401) {
        // const errorMessage = error.response.data.message;
        setErrors({ ...errors, password: "password Invalid" });
      } else if (error.response && error.response.status === 404) {
        // const errorMessage = error.response.data.message;
        setErrors({ ...errors, name: "Admin Not Found" });
      } else {
        console.log(error);
      }
    }
  };
  return (
    <>
      <Navbar_log />
      <Container className="mt-5 ">
        <Row className="justify-content-center">
          <Col lg={8}>
            <h2 className="mb-4 form-label" style={{ fontSize: "2rem" }}>
              Login
            </h2>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formName">
                <Form.Label style={{ fontSize: "1.2rem" }}>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={handleChangeName}
                />
                {errors.name && <p className="text-danger">{errors.name}</p>}
              </Form.Group>

              <Form.Group controlId="formPassword" className="my-3">
                <Form.Label style={{ fontSize: "1.2rem" }}>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={handleChangePassword}
                />
                {errors.password && (
                  <p className="text-danger">{errors.password}</p>
                )}
              </Form.Group>

              <Button variant="primary" type="submit" className="m-2">
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default AdminLogin;
