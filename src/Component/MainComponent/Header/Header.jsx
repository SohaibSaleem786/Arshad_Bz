import Cart from "../../../image/cart.png";
import logo from "../../../image/logo.png";
import "../Header/Header.css";
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../../ThemeContext";
import LOGO from "../../../image/logo.jpg";
import {
  Card,
  Row,
  Col,
  Button,
  FormControl,
  InputGroup,
} from "react-bootstrap";
import axios from "axios";
import { useData } from "../../../DataContext";
import CartItemModal from "../../Dash_Before_Login/CategoryCar/CartItemModal/CartItemmodal";
import CheckOut from "../../../image/checkout.png";

function Header({ id, screen, screen1, onCheckoutClick }) {
  const navigate = useNavigate();
  const { primaryColor, secondaryColor } = useTheme();
  const [getUser, setUser] = useState();
  const { apiLinks } = useTheme();

  const handleLogout = () => {
    // Remove user data from local storage
    localStorage.removeItem("user");

    // Redirect to the login page
    navigate("/login");
  };
  const [cartItemsLength, setCartItemsLength] = useState(0); // State to store cart items length

  useEffect(() => {
    // Retrieve user data from local storage
    const userData = JSON.parse(localStorage.getItem("user"));

    if (userData && userData.tusrid) {
      setUser(userData);
    } else {
      // Redirect to the login page if user data is not available
      console.error(
        "User data not available in local storage. Redirecting to login."
      );
      // navigate("/login");
    }

    // Set interval to update cart items length every 1 second
    const interval = setInterval(() => {
      const storedCart = JSON.parse(localStorage.getItem("cart")) || {
        cartItems: [],
      };
      setCartItemsLength(storedCart.cartItems.length);
    }, 500);

    // Clear interval on component unmount
    return () => clearInterval(interval);
  }, [navigate]);

  /////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////
  ///////////////////////////CART ICON KA OPER ITEM NUMBER ///////////////////////////////
  /////////////////////////////////////////////////////////////////////////
  const { orderData } = useData();

  let storedCart = JSON.parse(localStorage.getItem("cart"));
  if (!storedCart) {
    storedCart = {
      header: {},
      cartItems: [],
    };
    localStorage.setItem("cart", JSON.stringify(storedCart));
  }

  console.log("Stored Cart:", storedCart);

  // Find the length of cartItems array
  // const cartItemsLength = storedCart.cartItems.length;
  console.log("Length of cartItems array:", cartItemsLength);

  useEffect(() => {
    // Retrieve user data from local storage
    const userData = JSON.parse(localStorage.getItem("user"));

    if (userData) {
      setUser(userData);
      console.log(userData);
      // fetchMenuItems(userData.id); // Fetch menu items based on user ID from userData
      console.log("user id is", userData.id);
    } else {
      // Handle cases when user data is not available
      console.error("User data not available in local storage.");
    }
  }, []);
  const [totalItems, settotalItem] = useState([]);

  const totalItem = totalItems; // Replace with your actual total item count
  const [showModal, setShowModal] = useState(false);
  const [cartData, setCartData] = useState([]);

  const handleCartClick = () => {
    setCartData(
      JSON.parse(localStorage.getItem("cart")) || { header: {}, cartItems: [] }
    );
    setShowModal(true);
  };

  return (
    <>
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "5px",
          backgroundColor: "#9172f7",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <img
            src={LOGO}
            alt="Company Logo"
            style={{ height: "55px", width: "70px", marginRight: "20px" }}
          />
          <h1 style={{ fontSize: "25px", margin: "0", color: primaryColor }}>
            ARSHAD_BZ
          </h1>
        </div>

        {screen === "CartItem" ||
        screen === "OrderCategory" ||
        screen === "OrderItem" ||
        screen === "Checkout" ? (
          <>
            <div style={{ marginLeft: "50%" }}></div>
            <Col xs={12} sm={4} md={4} lg={4} xl={2}>
              <img
                src={CheckOut}
                onClick={onCheckoutClick}
                alt="Company Logo"
                style={{ height: "50px", marginLeft: "180px" }}
              />
            </Col>

            <div style={{ position: "relative" }}>
              <img
                src={Cart}
                onClick={handleCartClick}
                alt="Company Logo"
                style={{ height: "40px", marginRight: "20px" }}
              />
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  backgroundColor: "red",
                  color: "white",
                  borderRadius: "50%",
                  width: "25px",
                  height: "25px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <h5 style={{ marginTop: "10px" }}>{cartItemsLength}</h5>
              </div>
            </div>
          </>
        ) : null}

        <div className="btn-group">
          <h5 style={{ fontSize: "14px", marginTop: "10px" }}>
            {moment().format("DD/MM/YYYY")}
          </h5>

          {screen1 !== "Login" && (
            <>
              <button
                className="btn"
                style={{ fontSize: "14px" }}
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <FontAwesomeIcon icon={faEllipsisV} />
              </button>
              <ul className="dropdown-menu dropdown-menu-left">
                <li>
                  <a
                    className="dropdown-item"
                    href="#"
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = primaryColor;
                      e.target.style.color = secondaryColor;
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = "";
                      e.target.style.color = "";
                    }}
                  >
                    {getUser && getUser.tusrid}
                  </a>
                </li>
                <li>
                  <a
                    className="dropdown-item"
                    href="#"
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = primaryColor;
                      e.target.style.color = secondaryColor;
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = "";
                      e.target.style.color = "";
                    }}
                    onClick={handleLogout}
                  >
                    Logout
                  </a>
                </li>
              </ul>
            </>
          )}
        </div>
      </header>

      <CartItemModal
        show={showModal}
        onHide={() => {
          setShowModal(false);
         
        }}
      />
    </>
  );
}

export default Header;
