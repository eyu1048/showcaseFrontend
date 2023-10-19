import React, { useState } from "react";
import { Container, Row, Col, Form, Button, FormText } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Navbar_log from "../components/Navbar_log";
import axios from "axios";
import Joi from "joi";

const schema = Joi.object({
  name: Joi.string().min(3).max(30).required(true).label("Name"),
  password: Joi.string()
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)
    .required()
    .label("Password")
    .messages({
      "string.pattern.base":
        "Password must contain at least 8 characters, one capital letter, one small letter, and one number.",
    }),
  companyName: Joi.string().min(3).max(30).required(true).label("CompanyName"),
});

const AdminRegister = () => {
  const [formData, setFormData] = useState({
    name: "",
    password: "",
    companyName: "",
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, password, companyName } = formData;
    const requestData = {
      name,
      password,
      companyName,
    };

    try {
      await schema.validateAsync(requestData, { abortEarly: false });
      const response = await axios.post(
        "https://showcasebackend.onrender.com/admin/register",
        formData
      );
      console.log(response);
      navigate("/admin");
      setFormData({
        name: "",
        password: "",
        companyName: "",
      });
    } catch (ex) {
      console.error(ex);
      if (ex?.details) {
        // Extract the validation errors from the Joi validation error
        const validationErrors = {};
        ex.details.forEach((error) => {
          validationErrors[error.context.key] = error.message;
        });
        setErrors(validationErrors);
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
              Register
            </h2>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formName">
                <Form.Label style={{ fontSize: "1.2rem" }}>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  // onChange={(e) => setName(e.target.value)}
                />
                {errors.name && (
                  <FormText className="text-danger">{errors.name}</FormText>
                )}
              </Form.Group>

              <Form.Group controlId="formPassword" className="my-4">
                <Form.Label style={{ fontSize: "1.2rem" }}>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter your password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                />
                {errors.password && (
                  <FormText className="text-danger">{errors.password}</FormText>
                )}
              </Form.Group>
              <Form.Group controlId="formCompanyName">
                <Form.Label style={{ fontSize: "1.2rem" }}>
                  Company Name
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your company name"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                />
                {errors.companyName && (
                  <FormText className="text-danger">
                    {errors.companyName}
                  </FormText>
                )}
              </Form.Group>

              <Button variant="primary" type="submit" className="my-3">
                Sign Up
              </Button>
            </Form>
            <p>
              If you already registered got to{" "}
              <Link to="/AdminLogin">Login</Link>
            </p>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default AdminRegister;
