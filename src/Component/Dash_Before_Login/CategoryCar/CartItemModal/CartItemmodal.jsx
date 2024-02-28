import React, { useState } from "react";
import { MDBTable, MDBTableHead, MDBTableBody, MDBTableFoot } from "mdbreact";
import { useTheme } from "../../../../ThemeContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPrint } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { Modal, Button, Form } from "react-bootstrap";
import Alert from "@mui/material/Alert";

const CartItemModal = ({ show, onHide }) => {
  const { primaryColor, secondaryColor, apiLinks } = useTheme();
  const storedCart = JSON.parse(localStorage.getItem("cart")) || {
    header: {},
    cartItems: [],
  };
  
 
  
  const [alertData, setAlertData] = useState(null);

  const tableHeaderStyles = {
    backgroundColor: primaryColor,
    color: secondaryColor,
    fontWeight: "bold",
    position: "sticky",
    top: 0,
    zIndex: 1,
  };
  const [showModal, setShowModal] = useState(false);
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    address: "",
    email: "",
    remarks: "",
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };
  const handleCheckout = async () => {
    console.log("handleCheckout", storedCart);

    try {
      //   console.log("cartItems.id cartItems.id", cartItems);
      // setfilteredRowsss((prevItems) => [...prevItems, requestData.detail1]);
      const response = await axios.post(
        `${apiLinks}/CheckOut.php`,
        JSON.stringify(storedCart),
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.data.error === 200) {
        setAlertData({
          type: "success",
          message: `${response.data.message}`,
        });
        setTimeout(() => {
          setAlertData(null);
        }, 1000);
      } else {
        console.log(response.data.message);

        setAlertData({
          type: "error",
          message: `${response.data.message}`,
        });
        setTimeout(() => {
          setAlertData(null);
        }, 2000);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleDeleteItem = (index) => {
    const updatedCartItems = [...storedCart.cartItems];
    const deletedItem = updatedCartItems.splice(index, 1)[0];

    const updatedHeader = {
      ...storedCart.header,
      subQuantity: storedCart.header.subQuantity - deletedItem.qty,
      subTotal: storedCart.header.subTotal - deletedItem.amount,
    };

    const updatedCart = {
      header: updatedHeader,
      cartItems: updatedCartItems,
    };

    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setAlertData({
      type: "success",
      message: "Item deleted successfully.",
    });
    setTimeout(() => {
      // window.location.reload();
      setAlertData(null);
    }, 1000);
  };
 
  const handleReset = () => {
    const updatedCart = {
      header: { subQuantity: 0, subTotal: 0 },
      cartItems: [],
    };

    // localStorage.setItem("cart", JSON.stringify(updatedCart));
    localStorage.removeItem("cart");
    setAlertData({
      type: "success",
      message: "Cart reset successfully.",
    });
    setTimeout(() => {
      setAlertData(null);
    }, 1000);
  };
  return (
    <>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header
          closeButton
          style={{ backgroundColor: primaryColor, color: secondaryColor }}
        >
          <Modal.Title>Checkout</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Name"
                value={formData.name}
                onChange={handleInputChange}
                name="name" // Make sure to add the name attribute
              />{" "}
            </Form.Group>

            <Form.Group controlId="mobile">
              <Form.Label>Mobile Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Mobile Number"
                value={formData.mobile}
                onChange={handleInputChange}
                name="mobile" // Add the name attribute
              />{" "}
            </Form.Group>

            <Form.Group controlId="address">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Address"
                value={formData.address}
                onChange={handleInputChange}
                name="address" // Add the name attribute
              />{" "}
            </Form.Group>

            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter Email"
                value={formData.email}
                onChange={handleInputChange}
                name="email" // Add the name attribute
              />{" "}
            </Form.Group>

            <Form.Group controlId="remarks">
              <Form.Label>Remarks</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter Remarks"
                value={formData.remarks}
                onChange={handleInputChange}
                name="remarks" // Add the name attribute
              />{" "}
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer
          style={{ backgroundColor: primaryColor, color: secondaryColor }}
        >
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleCheckout(formData)}>
            Checkout
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={show} onHide={onHide} centered size="lg">
        <Modal.Header
          closeButton
          style={{ backgroundColor: primaryColor, color: secondaryColor }}
        >
          <Modal.Title>Cart Items</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className="col-12">
            <MDBTable striped bordered small responsive maxHeight="43vh">
              <MDBTableHead>
                <tr style={{ textAlign: "center" }}>
                  <th style={tableHeaderStyles}>Sr.</th>
                  <th style={tableHeaderStyles}>Item</th>
                  <th style={tableHeaderStyles}>Price</th>
                  <th style={tableHeaderStyles}>Quantity</th>
                  <th style={{ ...tableHeaderStyles, width: "90px" }}>Total</th>
                  <th style={tableHeaderStyles}>Delete</th>
                </tr>
              </MDBTableHead>
              <MDBTableBody>
                {storedCart.cartItems.map((item, index) => (
                  <tr key={index}>
                    <td style={{ width: "1%", textAlign: "center" }}>
                      {index + 1}
                    </td>
                    <td style={{ width: "50%", textAlign: "left" }}>
                      {item.TItmDsc}
                    </td>
                    <td style={{ textAlign: "right" }}>{item.TSalRat}</td>
                    <td style={{ textAlign: "center" }}>{item.qty}</td>
                    <td style={{ textAlign: "right" }}>{item.amount}</td>
                    <td style={{ textAlign: "center" }}>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleDeleteItem(index)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
                {Array.from({
                  length: Math.max(
                    0,
                    Math.floor((100 * window.innerHeight) / 100) / 99
                  ),
                }).map((_, index) => (
                  <tr key={`blank-${index}`}>
                    {Array.from({
                      length: 6,
                    }).map((_, colIndex) => (
                      <td key={`blank-${index}-${colIndex}`}>&nbsp;</td>
                    ))}
                  </tr>
                ))}
              </MDBTableBody>
              <MDBTableFoot
                style={{ ...tableHeaderStyles, position: "sticky", bottom: 0 }}
              >
                <tr>
                  <td
                    style={{
                      backgroundColor: primaryColor,
                      color: secondaryColor,
                    }}
                  ></td>
                  <td
                    style={{
                      backgroundColor: primaryColor,
                      color: secondaryColor,
                    }}
                  ></td>
                  <td
                    style={{
                      backgroundColor: primaryColor,
                      color: secondaryColor,
                    }}
                  ></td>
                  <td
                    style={{
                      backgroundColor: primaryColor,
                      color: secondaryColor,
                      textAlign: "center",
                    }}
                  >
                    {storedCart.header && storedCart.header.subQuantity
                      ? storedCart.header.subQuantity.toLocaleString()
                      : 0}
                  </td>
                  <td
                    style={{
                      backgroundColor: primaryColor,
                      color: secondaryColor,
                      textAlign: "center",
                    }}
                  >
                    {storedCart.header && storedCart.header.subTotal
                      ? storedCart.header.subTotal.toLocaleString()
                      : 0}
                  </td>
                  <td
                    style={{
                      backgroundColor: primaryColor,
                      color: secondaryColor,
                    }}
                  ></td>
                </tr>
              </MDBTableFoot>
            </MDBTable>
          </div>
        </Modal.Body>

        <Modal.Footer
          style={{ backgroundColor: primaryColor, color: secondaryColor }}
        >
          <Button variant="secondary" onClick={onHide}>
            Close
          </Button>
          <Button variant="danger" onClick={handleReset}>
            Reset
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CartItemModal;
