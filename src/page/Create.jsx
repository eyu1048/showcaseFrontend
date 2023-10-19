import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button, FormText } from "react-bootstrap";
import axios from "axios";
import AdminNavbar from "../components/AdminNavbar";
import Joi from "joi";

const schema = Joi.object({
  name: Joi.string().min(3).max(30).required(true).label("Name"),
  price: Joi.number().min(0).required(true).label("Price"),
  description: Joi.string().max(300).required(true).label("Description"),
  type: Joi.string().max(30).required(true).label("Type"),
});

const Create = () => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    type: "",
  });
  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    axios
      .get("https://showcasebackend.onrender.com/admin/files")
      .then((response) => setFiles(response.data))
      .catch((error) => console.error(error));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, price, description, type } = formData;

    const requestData = {
      name,
      price,
      description,
      type,
    };

    try {
      await schema.validateAsync(requestData, { abortEarly: false });
      const response = await axios.post(
        "https://showcasebackend.onrender.com/admin/addProduct",
        requestData
      );

      console.log(response.data.data);

      if (response.status === 200) {
        if (files) {
          const fileFormData = new FormData();
          fileFormData.append("file", selectedFile);

          try {
            const fileResponse = await axios.post(
              `https://showcasebackend.onrender.com/admin/upload`,
              fileFormData
            );

            console.log(fileResponse.data);

            const fileId = fileResponse.data._id;

            console.log("fileId" + fileId);
            const productId = response.data.data._id;

            console.log("productId" + productId);

            await axios.put(
              `https://showcasebackend.onrender.com/admin/product/${productId}/files`,
              {
                fileId,
              }
            );

            setFiles((prevFiles) => [...prevFiles, fileResponse.data]);

            alert("file uploaded successfully");
            setSelectedFile(null);
            setErrors((prev) => ({ ...prev, file: "" }));
          } catch (error) {
            console.error(error);
          }
          setFormData({
            name: "",
            price: "",
            description: "",
          });
        }
      }
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
      <AdminNavbar />
      <Container className="mt-5 ">
        <Row className="justify-content-center">
          <Col lg={8}>
            <h2 className="mb-4 form-label" style={{ fontSize: "2rem" }}>
              Create Product Items
            </h2>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formName">
                <Form.Label style={{ fontSize: "1.2rem" }}>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter product name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
                {errors.name && (
                  <FormText className="text-danger">{errors.name}</FormText>
                )}
              </Form.Group>

              <Form.Group className="my-3">
                <Form.Label style={{ fontSize: "1.2rem" }}>Price</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter product price"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                />
                {errors.price && (
                  <FormText className="text-danger">{errors.price}</FormText>
                )}
              </Form.Group>

              <Form.Group>
                <Form.Label style={{ fontSize: "1.2rem" }}>
                  Description
                </Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  maxLength={300}
                  placeholder="Enter product information "
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                />
                {errors.description && (
                  <FormText className="text-danger">
                    {errors.description}
                  </FormText>
                )}
              </Form.Group>

              <Form.Group>
                <Form.Label style={{ fontSize: "1.2rem" }}>Type</Form.Label>
                <Form.Control
                  as="select"
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                >
                  <option value="">Select type of product</option>
                  <option value="SHOES">SHOES</option>
                  <option value="BAGS">BAGS</option>
                  <option value="CLOTHES">CLOTHES</option>
                  <option value="ELECTRONICS">ELECTRONICS</option>
                </Form.Control>
                {errors.type && (
                  <Form.Text className="text-danger">{errors.type}</Form.Text>
                )}
              </Form.Group>
              <Form.Group>
                <Form.Label style={{ fontSize: "1.2rem" }}>Image</Form.Label>
                <Form.Control
                  type="file"
                  // placeholder="Enter product information"
                  name="file"
                  onChange={handleFileChange}
                />
              </Form.Group>

              <Button variant="primary" type="submit" className="my-3">
                Create Product
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Create;
