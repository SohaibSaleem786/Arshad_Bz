import React, { useState, useEffect } from "react";
import { MDBTable, MDBTableBody, MDBTableHead } from "mdbreact";
import { Modal, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Header from "../MainComponent/Header/Header";
import Alert from "@mui/material/Alert";
import Footer from "../MainComponent/Footer/Footer";
import { useTheme } from "../../ThemeContext";
import axios from "axios";
import "../Dash_Before_Login/Login.css";
import { Row, Col, FormControl, InputGroup } from "react-bootstrap";
import { useParams } from "react-router-dom";
import CategoryCardContainer from "../Dash_Before_Login/CategoryCar/CategoryCardContainer";
import CategoryTable from "./CategoryTable/CategoryTable";
import ItemTable from "./ItemTable/ItemTable";
import ItemCardContainer from "./ItemCardContainer/ItemCardContainer";
import { useSelector, useDispatch } from "react-redux";
import store from "../../store";
import { fetchCategory,fetchItem } from "../../Redux/action";
// import Edit from "../../../../image/edit.png";
const Login = () => {
  console.log("Login");
  const dispatch = useDispatch();
  const categoryData = useSelector((state) => state.category);
  const itemData = useSelector((state) => state.item);
  useEffect(() => {
    dispatch(fetchCategory());
    dispatch(fetchItem());
  }, [dispatch]);

   const [item , setItem] = useState([]);
   const [category , setCategory] = useState([]);

  useEffect(() => {  
  if (categoryData && categoryData.data) {
     setCategory(categoryData.data);
  }
  if (itemData && itemData.data) {
    setItem(itemData.data);
  }
  }, [categoryData, itemData]);

  const navigate = useNavigate();
  const { primaryColor, secondaryColor, apiLinks } = useTheme();
  const imageurl = `${apiLinks}/ctgImg/`;
  const [alertData, setAlertData] = useState(null);
  const { id } = useParams();
  const [filterValue, setFilterValue] = useState("");
  const storedCart = JSON.parse(localStorage.getItem("cart")) || { header: {}, cartItems: [] };
  console.log("Stored Cart:", storedCart);
  const [getUser, setUser] = useState();
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (userData) {
      setUser(userData);
      // handleAddToCart();
      console.log(userData);
      console.log("user id is", userData.id);
    } else {
      console.error("User data not available in local storage.");
    }
  }, []);

  const [view, setView] = useState("card"); // Initialize the default view as 'table'
  const handleChangeView = (e) => {
    setView(e.target.value);
  };
  /////////////////////////////////////////////////////////////////////////
  const imageurlitm = `${apiLinks}/itemimage/`;
  const [data1, setData1] = useState({ columns: [], rows: [] });

  const tableCellStyle = {
    backgroundColor: primaryColor,
    color: secondaryColor,
    fontWeight: "bold",
    position: "sticky",
    top: -1,
    zIndex: 1,
  };


  const [cartItems, setCartItems] = useState({
    detail1: {},
    detail2: [],
  });


  const handleNavigation = () => {
    navigate("/Loginn");
  };
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
  const [showModal, setShowModal] = useState(false);
  const handleClose = () => {
    setShowModal(false);
  };
  const handleShow = () => setShowModal(true);

  let Cart = JSON.parse(localStorage.getItem("cart"));

  const handleCheckout = async () => {
    try { 
      
      console.log("handleCheckout--------------", Cart);
  
      if (Cart.header && typeof Cart.header.subTotal !== 'undefined') {
        const requestData = {
          name: formData.name,
          contact: formData.mobile,
          address: formData.address,
          email: formData.email,
          remarks: formData.remarks,
          userId: getUser?.id,
          subTotal: Cart.header.subTotal,
          subQuantity: Cart.header.subQuantity,
          cartItems: Cart.cartItems,
        };
  
        const response = await axios.post(
          `${apiLinks}/CheckOut.php`,
          JSON.stringify(requestData),
          {
            headers: { "Content-Type": "application/json" },
          }
        );
  
        console.log(response.data);
        if (response.data.error === 200) {
          localStorage.removeItem("cart");
  
          setAlertData({
            type: "success",
            message: `${response.data.message}`,
          });
          setTimeout(() => {
            setAlertData(null);
            setCartItems({
              header: {},
              cartItems: [],
            });
            // Clear the local storage
            localStorage.removeItem("cart");
          }, 1000);
          handleClose();
        } else {
          setAlertData({
            type: "error",
            message: `${response.data.message}`,
          });
          setTimeout(() => {
            setAlertData(null);
          }, 2000);
        }
        setFormData({
          name: "",
          mobile: "",
          email: "",
          address: "",
          loading: false,
        });
      } else {
        throw new Error('Cart subtotal is not defined');
      }
    } catch (error) {
      console.error("Error:", error);
      // Show the error message to the user
      alert("An error occurred during checkout. Please try again later.");
    }
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
                  maxLength={11}
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

      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100vh",
          overflow: "hidden",
        }}
      >
        {alertData && (
          <Alert
            severity={alertData.type}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "30%",
              marginLeft: "35%",
              zIndex: 1000,
              textAlign: "center",
            }}
          >
            {alertData.message}
          </Alert>
        )}

        <Header id={id} screen="OrderCategory" screen1='Login' onCheckoutClick={handleShow} />

        

        <br />
        <div
          style={{
            border: "1px solid black",
            padding: "10px",
            height: "80vh",
            backgroundColor: "white",
            marginLeft: "5%",
            marginRight: "5%",
          }}
        >
          <Row>
            <Col xs={12} sm={4} md={4} lg={4} xl={{ span: 2, offset: 6 }}>
              <Form.Control
                type="text"
                placeholder="Search..."
                className="form-control"
                value={filterValue}
                onChange={(e) => setFilterValue(e.target.value)}
                // value={filterValue}
                // onChange={(e) => setFilterValue(e.target.value)}
              />
            </Col>
            <Col xs={12} sm={3} md={3} lg={3} xl={{ span: 2 }}>
              <Form.Control
                as="select"
                name="FCtgStss"
                style={{ height: "35px", width: "180px", fontWeight: "bold" }}
                onChange={handleChangeView}
              >
                <option value="card">Category Card</option>
                {/* <option value="table">Category List</option> */}
                <option value="Item_card">Item Card</option>
                {/* <option value="Item_tbl">Item List</option> */}
              </Form.Control>
            </Col>
            <Col xs={12} sm={4} md={4} lg={4} xl={2}>
              <Button
                className="btn btn-primary"
                style={{
                  backgroundColor: primaryColor,
                  fontSize: "11px",
                  color: secondaryColor,
                  width: "100%",
                  marginBottom: "10px",
                }}
                onClick={handleNavigation}
              >
                Login
              </Button>
            </Col>
          </Row>

          {view === "card" ? (
            <CategoryCardContainer
              data={category}
              filterValue={filterValue}
              primaryColor={primaryColor}
              secondaryColor={secondaryColor}
              imageurl={imageurl}
              id={id}
            />
          ) : view === "table" ? (
            <CategoryTable
              data={category}
              filterValue={filterValue}
              tableCellStyle={tableCellStyle}
              apiLinks={apiLinks}
            />
          ) : view === "Item_card" ? (
            <ItemCardContainer
              
            />
          ) : view === "Item_tbl" ? (
            <ItemTable
              data1={item}
              filterValue={filterValue}
              tableCellStyle={tableCellStyle}
              primaryColor={primaryColor}
              secondaryColor={secondaryColor}
              imageurlitm={imageurlitm}
            />
          ) : null}
        </div>

        <Footer />
      </div>
    </>
  );
};

export default Login;
