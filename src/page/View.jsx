import React, { useState, useEffect } from "react";
import AdminNavbar from "../components/AdminNavbar";
import {
  Container,
  Modal,
  Button,
  Form,
  FormText,
  Table,
} from "react-bootstrap";
import axios from "axios";
import "./table.css";

const View = () => {
  const [text, setText] = useState("");
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    type: "",
  });
  const [showModal, setShowModal] = useState(false);
  const [updatedProducts, setUpdatedProducts] = useState({});
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await axios.get(
        "https://showcasebackend.onrender.com/admin/viewProduct"
      );

      // console.log(response.data.data);
      setProducts(response.data.data);
    };
    fetchProducts();
  }, [products]);

  const handleDelete = (id) => {
    axios
      .delete(`https://showcasebackend.onrender.com/admin/product/${id}`)
      .then(() =>
        setProducts((prevProducts) => prevProducts.filter((u) => u._id !== id))
      )
      .catch((ex) => console.log(ex));
  };

  const handleEdit = (product) => {
    setShowModal(true);
    setUpdatedProducts(product);
    setFormData({
      name: product.name || "",
      price: product.price || "",
      description: product.description || "",
      type: product.type || "",
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setUpdatedProducts((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleUpdate = async () => {
    const { _id, files, __v, ...updatedProductData } = updatedProducts;

    console.log(updatedProductData);
    console.log(updatedProducts);
    try {
      const response = await axios.put(
        `https://showcasebackend.onrender.com/admin/product/${_id}`,
        updatedProductData
      );

      console.log(response.data.data);
      const updatedProduct = products.map((product) => {
        if (product._id === _id) {
          return response.data.data;
        } else {
          return product;
        }
      });

      setProducts(updatedProduct);
      setUpdatedProducts({});
      setShowModal(false);
    } catch (ex) {
      console.error(ex);
    }
  };

  const handleSearch = (e) => {
    setText(e.target.value);

    const filteredProduct = products.filter((product) =>
      product.name.toLowerCase().includes(text.toLowerCase())
    );

    setFilteredProducts(filteredProduct);
  };

  return (
    <div>
      <AdminNavbar />

      <Container className="mt-5">
        <Form.Control
          type="text"
          placeholder="Enter name to search"
          value={text}
          onChange={handleSearch}
          style={{ maxWidth: "40%", marginBottom: "1.5rem" }}
        />

        <div className="table-responsive">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Name</th>
                <th>Price</th>
                <th>Description</th>
                <th>Type</th>
                <th style={{ width: "20%" }}>File Names</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {(text !== "" && filteredProducts.length > 0
                ? filteredProducts
                : products
              ).map((product) => (
                <tr key={product.id}>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{product.description}</td>
                  <td>{product.type}</td>
                  <td>
                    <div style={{ width: "300px", overflowX: "auto" }}>
                      {product.description}
                    </div>
                  </td>
                  <td>
                    {product.files.map((file) => (
                      <a
                        style={{ textDecoration: "none" }}
                        key={file.id}
                        href={`https://showcasebackend.onrender.com/admin/${file.path}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {file.name}
                      </a>
                    ))}
                  </td>
                  <td>
                    <button
                      className="btn btn-primary  mx-2"
                      onClick={() => handleEdit(product)}
                    >
                      Update
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDelete(product._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
        {showModal && (
          <Modal
            show={showModal}
            onHide={() => setShowModal(false)}
            id="editUserModal"
          >
            <Modal.Header closeButton>
              <Modal.Title>Edit Products Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group>
                  <Form.Label className="label"> Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label className="label">Price</Form.Label>
                  <Form.Control
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label className="label">Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    maxLength={300}
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                  />
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
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShowModal(false)}>
                Cancel
              </Button>
              <Button
                variant="primary"
                onClick={handleUpdate}
                disabled={
                  !formData.name || !formData.price || !formData.description
                }
              >
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>
        )}
      </Container>
    </div>
  );
};

export default View;
