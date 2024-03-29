import Alert from "@mui/material/Alert";
import axios from "axios";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Modal, Form } from "react-bootstrap";
import {
  Card,
  Row,
  Col,
  Button,
  FormControl,
  InputGroup,
} from "react-bootstrap";
import { useParams } from "react-router-dom";
import {
  // ... other imports ...
  TextField, // Make sure TextField is imported from the correct library
} from "@mui/material";
import Header from "../../MainComponent/Header/Header";
import Footer from "../../MainComponent/Footer/Footer";
import PathHead from "../../MainComponent/PathHead/PathHead";
import Empty from "../../../image/empty.png";
import { useTheme } from "../../../ThemeContext";
import { fetchItem } from "../../../Redux/action";
import { useDispatch, useSelector } from "react-redux";

const ItemCardContainer = () => {
  const dispatch = useDispatch();
  const itemdata = useSelector((state) => state.item);
  useEffect(() => {
    dispatch(fetchItem());
  }, [dispatch]);
  console.log("ItemCardContainer");
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");
  const [data, setData] = useState({ columns: [], rows: [] });
  const [filteredData, setFilteredData] = useState([]);
  const { primaryColor, secondaryColor } = useTheme();
  const { apiLinks } = useTheme();
  const { categoryId } = useParams();
  const [filterValue, setFilterValue] = useState(""); // Define filterValue and setFilterValue
  const [alertData, setAlertData] = useState(null);
  const { id } = useParams();
  const imageurl = `${apiLinks}/itemimage/`;

  const [getUser, setUser] = useState();

  const handleQuantityChange = (itemIndex, newValue) => {
    const updatedData = [...filteredData];
    // Parse the new value as a float
    const parsedValue = parseFloat(newValue);
    // Check if the parsed value is a valid number
    if (!isNaN(parsedValue)) {
      updatedData[itemIndex].quantity = parsedValue;
      setFilteredData(updatedData);
    }
  };
  useEffect(() => {
    if (itemdata && itemdata.data) {
      const transformedData = itemdata.data.map((item) => ({
        TItmId: item.TItmId,
        TItmDsc: item.TItmDsc,
        uom: item.uom,
        TItmSts: item.TItmSts,
        TPurRat: item.TPurRat,
        TSalRat: item.TSalRat,
        TCtgId: item.TCtgId,
        TitmTyp: item.TitmTyp,
        TItmPic: item.TItmPic,
        itmdis: item.itmdis,
        quantity: 1.0, // Add a quantity property to each item
      }));

      setData({ rows: transformedData });
      setFilteredData(transformedData);
    }
  }, []);

  const handleDecrement = (itemIndex) => {
    const updatedData = [...filteredData];
    if (updatedData[itemIndex].quantity > 0) {
      updatedData[itemIndex].quantity -= 1;
      setFilteredData(updatedData);
    }
  };

  const handleIncrement = (itemIndex) => {
    const updatedData = [...filteredData];
    updatedData[itemIndex].quantity += 1;
    setFilteredData(updatedData);
  };
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

  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    address: "",
    email: "",
    remarks: "",
  });
  const [headerData, setHeaderData] = useState({
    name: "",
    mobile: "",
    address: "",
    email: "",
    remarks: "",
  });

  const [cartItems, setCartItems] = useState({
    header: {},
    cartItems: [],
  });
  useEffect(() => {
    const interval = setInterval(() => {
      const storedCart = JSON.parse(localStorage.getItem("cart")) || {
        header: {},
        cartItems: [],
      };
      setCartItems(storedCart);
    }, 500);
  
    return () => clearInterval(interval);
  }, []);
  

  function handleAddToCart(item) {
    const { TItmId, TItmDsc, TPurRat, TSalRat, quantity, itmdis } = item;

    const currentCartItems = [...cartItems.cartItems];
    console.log("currentCartItems", currentCartItems);
    const newItem = {
      id: TItmId,
      TItmDsc: TItmDsc,
      TSalRat: TSalRat,
      qty: quantity,
      amount: TSalRat * quantity,
    };

    currentCartItems.push(newItem);

    const subTotal = currentCartItems.reduce(
      (total, item) => total + item.amount,
      0
    );
    const subQuantity = currentCartItems.reduce(
      (total, item) => total + item.qty,
      0
    );

    const updatedResponse = {
      ...cartItems,
      cartItems: currentCartItems,
      header: {
        name: formData.name,
        contact: formData.mobile,
        address: formData.address,
        email: formData.email,
        remarks: formData.remarks,
        userId: getUser?.id,
        subTotal: subTotal,
        subQuantity: subQuantity,
      },
    };

    setCartItems(updatedResponse);

    localStorage.setItem("cart", JSON.stringify(updatedResponse));

    setAlertData({
      type: "success",
      message: "Item added successfully!",
    });

    setTimeout(() => {
      setAlertData(null);
    }, 2000);
  }

  console.log("response: ", cartItems);
  /////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////
  ///////////////////////////CART ICON KA OPER ITEM NUMBER ///////////////////////////////
  /////////////////////////////////////////////////////////////////////////
  useEffect(() => {
    // Retrieve user data from local storage
    const userData = JSON.parse(localStorage.getItem("user"));

    if (userData) {
      setUser(userData);
      console.log(userData);
      fetchMenuItems(userData.id); // Fetch menu items based on user ID from userData
      console.log("user id is", userData.id);
    } else {
      // Handle cases when user data is not available
      console.error("User data not available in local storage.");
    }
  }, []);
  const [totalItem, settotalItem] = useState([]);

  function fetchMenuItems(userID) {
    const apiUrl = `${apiLinks}/Cart_Item.php`;
    const data = {
      userid: userID,
    };

    const formData = new URLSearchParams(data).toString();

    axios
      .post(apiUrl, formData)
      .then((response) => {
        settotalItem(response.data.totalItem);

        console.log("titm total amt ", response.data.titm);
      })
      .catch((error) => {
        // Handle errors
        console.error("Error:", error);
      });
  }
  const [showModal, setShowModal] = useState(false);
  const handleClose = () => {
    setShowModal(false);
  };
  const handleShow = () => setShowModal(true);

  const handleCheckout = async () => {
    console.log("handleCheckout");
    try {
      // Update the header data in cartItems with values from formData
      const updatedCartItems = {
        ...cartItems,
      };

      const requestData = {
        name: formData.name,
        contact: formData.mobile,
        address: formData.address,
        email: formData.email,
        remarks: formData.remarks,
        userId: getUser?.id,
        subTotal: cartItems.header.subTotal,
        subQuantity: cartItems.header.subQuantity,
        cartItems: updatedCartItems.cartItems,
      };
      console.log(requestData, "requestData");
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
          // Clear the cartItems variable after successful checkout
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
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
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

        <div
          className={`card-container ${filteredData.length > 0 ? "cards" : ""}`}
          style={{
            // Your existing styles for the container div

            overflowX: "hidden", // Hide horizontal overflow
            overflowY: "auto",
            maxHeight: "70vh",
          }}
        >
          {filteredData.length > 0 ? (
            <>
              <div
                className={`cards ${
                  filteredData.length > 0 ? "cards-large" : "cards-small"
                }`}
              >
                <Row xs={1} md={3} lg={5} xl={6}>
                  {filteredData.map((row, index) => (
                    <Col key={index}>
                      <Card style={{ marginBottom: "11px" }}>
                        <Card.Img
                          variant="top"
                          height="90"
                          src={imageurl + row.TItmPic}
                        />
                        <Card.Body>
                          <Card.Title
                            style={{
                              fontSize: "17px",
                              textAlign: "center",
                              fontWeight: "bold",
                              height: "30px",
                            }}
                          >
                            {row.TItmDsc}
                          </Card.Title>

                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              fontSize: "11px",
                            }}
                          >
                            <Typography
                              gutterBottom
                              component="div"
                              style={{ fontSize: "13px" }}
                            >
                              Sale Rate:
                            </Typography>
                            <Typography
                              gutterBottom
                              component="div"
                              style={{ fontSize: "13px" }}
                            >
                              {row.TSalRat}
                            </Typography>
                          </div>
                        </Card.Body>
                        <div style={{ borderTop: "1px solid #e0e0e0" }}>
                          <CardActions
                            style={{ justifyContent: "space-between" }}
                          >
                            <Button
                              variant="contained"
                              style={{
                                width: "130px",
                                height: "30px",
                                fontSize: "12px",
                                backgroundColor: primaryColor,
                                color: secondaryColor,
                                // borderRadius: '50%',
                                marginRight: "10px",
                                minWidth: "0",
                                padding: "0",
                              }}
                              onClick={() => handleAddToCart(row)}
                            >
                              Add
                            </Button>
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                              }}
                            >
                              <Button
                                variant="contained"
                                style={{
                                  width: "25px",
                                  height: "25px",
                                  backgroundColor: primaryColor,
                                  color: secondaryColor,
                                  borderRadius: "50%",
                                  marginRight: "10px",
                                  minWidth: "0",
                                  padding: "0",
                                }}
                                onClick={() => handleDecrement(index)}
                              >
                                -
                              </Button>
                              <input
                                type="text"
                                value={
                                  row.quantity !== undefined ? row.quantity : 1
                                }
                                style={{
                                  width: "50px",
                                  fontSize: "11px",
                                  marginRight: "10px",
                                  padding: "5px",
                                  textAlign: "center",
                                }}
                                onChange={(e) =>
                                  handleQuantityChange(index, e.target.value)
                                }
                              />

                              <Button
                                variant="contained"
                                style={{
                                  width: "25px",
                                  height: "25px",
                                  backgroundColor: primaryColor,
                                  color: secondaryColor,
                                  borderRadius: "50%",
                                  minWidth: "0",
                                  padding: "0",
                                }}
                                onClick={() => handleIncrement(index)}
                              >
                                +
                              </Button>
                            </div>
                          </CardActions>
                        </div>
                      </Card>
                    </Col>
                  ))}
                </Row>
              </div>
            </>
          ) : (
            <>
              <div style={{ marginLeft: "40%", marginTop: "14%" }}>
                <img
                  src={Empty}
                  // onClick={() => navigate("/Item")}
                  style={{ height: "24%", width: "25%", marginRight: "5%" }}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default ItemCardContainer;
