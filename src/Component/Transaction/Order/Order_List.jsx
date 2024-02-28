import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MDBTable, MDBTableBody, MDBTableHead, MDBTableFoot } from "mdbreact";
import Header from "../../MainComponent/Header/Header";
import Footer from "../../MainComponent/Footer/Footer";
import PathHead from "../../MainComponent/PathHead/PathHead";
import Edit from "../../../image/edit.png";
import Invoice from "../../../image/invoice.png";
import Order from "../../../image/check.png";
import "../Order/Order_List.css";
import axios from "axios";
import Alert from "@mui/material/Alert";
import { useData } from "../../../DataContext";
import { useParams } from "react-router-dom";
import Pending from "../../../image/dashed.png";
import {
  Card,
  Row,
  Col,
  Button,
  FormControl,
  InputGroup,
} from "react-bootstrap";
import { Form } from "react-bootstrap";
import { useTheme } from "../../../ThemeContext";
import { useLocation } from "react-router-dom";
import { Modal } from "react-bootstrap";
import { fetchOrderList } from "../../../Redux/action";
import { useDispatch, useSelector } from "react-redux";

const Order_Number = () => {
  const dispatch = useDispatch();
  const order = useSelector((state) => state.orderlist);
  useEffect(() => {
    dispatch(fetchOrderList());
  }, [dispatch]);
  const location = useLocation();
  const cartItems = location.state ? location.state.cartItems : [];
  const { updateOrderData } = useData();
  const { id } = useParams();
  const [getOrderNum, setOrderdatainto] = useState();

  const [selectedStatus, setSelectedStatus] = useState("All");
  const [searchText, setSearchText] = useState("");
  const [data, setData] = useState({ columns: [], rows: [] });
  const { primaryColor, secondaryColor } = useTheme();
  const { apiLinks } = useTheme();
  const [alertData, setAlertData] = useState(null);
  const [getUser, setUser] = useState();
  const [Length, setLength] = useState("");
  const [dataFetched, setDataFetched] = useState(false);
  const [Orderid, setOrderId] = useState("");
  const [refreshKey, setRefreshKey] = useState(0);
  const [newOrderData, setNewOrderData] = useState(null);
  const [formData, setFormData] = useState({
    mobile: "",
    remarks: "",
  });
  const [showModal, setShowModal] = useState(false);
  const [selectedRowId, setSelectedRowId] = useState(null); // State variable to store the row id of the clicked image

  useEffect(() => {
    // Retrieve user data from local storage
    const userData = JSON.parse(localStorage.getItem("user"));

    if (userData) {
      setUser(userData);
      console.log(userData);
      console.log("user id is", userData.id);
    } else {
      // Handle cases when user data is not available
      console.error("User data not available in local storage.");
    }
  }, []);

  useEffect(() => {
    if(order && order.data){
      const transformedData = order.data.map((item) => ({
        id: item.id,
        torddat: item.torddat,
        tordtim: item.tordtim,
        tcstnam: item.tcstnam,
        tordadd: item.tordadd,
        tmobnum: item.tmobnum,
        tordamt: item.tordamt,
        tordsts: item.tordsts,
      }));
      const columns = [
        { label: "ID", field: "id", sort: "asc" },
        { label: "Date", field: "torddat", sort: "asc" },
        { label: "Time", field: "tordtim", sort: "asc" },
        { label: "Customer Name", field: "tcstnam", sort: "asc" },
        { label: "Order Address", field: "tordadd", sort: "asc" },
        { label: "Mobile#", field: "tmobnum", sort: "asc" },
        { label: "Amount", field: "tordamt", sort: "asc" },
        { label: "Status", field: "tordsts", sort: "asc" },
      ];

      setData({ columns, rows: transformedData });
      setLength(order.data.length);
      setDataFetched(true);
      if (order.data.length > 0) {
        const lastId = order.data[order.data.length - 1].id;
        console.log("Last ID:", lastId);
        setOrderdatainto(lastId);
      } else {
        console.log("apiData is empty");
      }
      console.log("dsfsdfsd", order.data.length);
      updateOrderData(order.data.length);
    }
  }, [order]);



  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleStatusChange = (event) => {
    setSelectedStatus(event.target.value);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  function formatDate(dateString) {
    const options = { year: "numeric", month: "numeric", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  }

  function formatCurrency(amount) {
    return new Intl.NumberFormat("en-US").format(amount);
  }

  const [startDate, setStartDate] = useState("01-01-2024");
  const [endDate, setEndDate] = useState(new Date());

  useEffect(() => {
    dispatch(fetchOrderList());
  }, [startDate, endDate]); // Trigger fetchOrderData when startDate or endDate changes

  // Function to handle change in start date input
  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };

  // Function to handle change in end date input
  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };

  const filteredRows = data.rows.filter((row) => {
    const orderDate = new Date(row.torddat);
    const start = new Date(startDate);
    const end = new Date(endDate);

    // Filter based on selected status and date range
    return (
      (selectedStatus === "All" ||
        row.tordsts.toLowerCase() === selectedStatus.toLowerCase()) &&
      (!startDate || !endDate || (orderDate >= start && orderDate <= end))
    );
  });

  const handleShowModal = (rowId) => {
    setSelectedRowId(rowId); // Store the row id of the clicked image
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleCheckout = () => {
    if (selectedRowId) {
      Changetheinvoicestatus(selectedRowId); // Call Changetheinvoicestatus with the stored row id
      setShowModal(false);
    } else {
      // Handle error, no row id selected
    }
  };

  const Changetheinvoicestatus = (id) => {
    const data = {
      orderId: id,
    };

    const formData = new URLSearchParams(data).toString();

    axios
      .post(`${apiLinks}/Invoice.php`, formData, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
      .then((response) => {
        if (response.data.error === 200) {
          dispatch(fetchOrderList());

          setAlertData({
            type: "success",
            message: `${response.data.message}`,
          });
          setTimeout(() => {
            setAlertData(null);
          }, 500);
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
      })
      .catch((error) => {
        // Handle errors
        console.error("Error:", error);
      });
  };
  const calculateTotalAmount = () => {
    let totalAmount = 0;
    data.rows.forEach((row) => {
      totalAmount += parseFloat(row.tordamt);
    });
    return totalAmount.toFixed(2); // Return total amount rounded to 2 decimal places
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
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header
            closeButton
            style={{ backgroundColor: primaryColor, color: secondaryColor }}
          >
            <Modal.Title>Status Change</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="mobile">
                <Form.Label> Rating</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Rationg"
                  value={formData.mobile}
                  maxLength={11}
                  onChange={handleInputChange}
                  name="mobile"
                />
              </Form.Group>

              <Form.Group controlId="remarks">
                <Form.Label>Remarks</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Enter Remarks"
                  value={formData.remarks}
                  onChange={handleInputChange}
                  name="remarks"
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer
            style={{ backgroundColor: primaryColor, color: secondaryColor }}
          >
            <Button variant="secondary" onClick={handleCloseModal}>
              Close
            </Button>
            <Button variant="primary" onClick={handleCheckout}>
              OK
            </Button>
          </Modal.Footer>
        </Modal>

        <Header Orderid={Orderid} />
        <PathHead
          pageName="Dashboard > Order List"
          screen="Get_Item"
          pageLink="/MainPage"
        />
        <br />

        <div
          className="col-12 Order-List"
          style={{
            color: secondaryColor,
            border: "1px solid black",
            padding: "10px",
            backgroundColor: "white",
          }}
        >
          <div>
            <Row>
              <Col xs={12} sm={3} md={3} lg={3} xl={{ span: 2 }}>
                <input
                  type="date"
                  value={startDate}
                  onChange={handleStartDateChange}
                />
                
              </Col>
              <Col xs={12} sm={3} md={3} lg={3} xl={{ span: 2 }}>
                <input
                  type="date"
                  value={endDate}
                  onChange={handleEndDateChange}
                />
              </Col>

              <Col xs={12} sm={3} md={3} lg={3} xl={{ span: 2, offset: 3 }}>
                <Form.Control
                  as="select"
                  name="FCtgStss"
                  style={{ height: "35px", fontWeight: "bold" }}
                  onChange={handleStatusChange}
                >
                  <option value="All">All Orders</option>
                  <option value="Order">Pending</option>
                  <option value="INV">Invoice</option>
                </Form.Control>
              </Col>
              <Col xs={12} sm={4} md={4} lg={4} xl={{ span: 3 }}>
                <Form.Control
                  type="text"
                  placeholder="Name & Phone"
                  value={searchText}
                  onChange={handleSearchChange}
                />
              </Col>
            </Row>
            <div style={{ fontSize: "12px", width: "100%", overflowX: "auto" }}>
              <MDBTable
                scrollY
                maxHeight="68vh"
                striped
                bordered
                small
                responsive
              >
                <MDBTableHead>
                  <tr style={{ textAlign: "center" }}>
                    {data.columns.map((column, columnIndex) => (
                      <th
                        key={columnIndex}
                        style={{
                          backgroundColor: primaryColor,
                          color: secondaryColor,
                          fontWeight: "bold",
                          position: "sticky",
                          top: -1,
                          zIndex: 1,
                        }}
                      >
                        {column.label}
                      </th>
                    ))}
                  </tr>
                </MDBTableHead>
                <MDBTableBody>
                  {filteredRows.map((row, index) => (
                    <tr key={index}>
                      {Object.keys(row).map((key, columnIndex) => {
                        if (columnIndex !== 7) {
                          // Skip rendering the 7th column
                          return (
                            <td
                              key={key}
                              style={{
                                textAlign:
                                  columnIndex === 3 || columnIndex === 4
                                    ? "left"
                                    : columnIndex === 5
                                    ? "right"
                                    : "center",

                                width:
                                  columnIndex === 0
                                    ? "1%"
                                    : columnIndex === 1
                                    ? "5%"
                                    : columnIndex === 2
                                    ? "3%"
                                    : "auto",
                              }}
                            >
                              {
                                columnIndex === 1 && row[key]
                                  ? formatDate(row[key])
                                  : columnIndex === 6
                                  ? formatCurrency(row[key])
                                  : row[key] ||
                                    "" /* Render a dash if data is not available */
                              }
                            </td>
                          );
                        }
                        return null; // Return null for the 7th column
                      })}
                      <td style={{ textAlign: "center" }}>
                        <div>
                          {row.tordsts === "INV" ? (
                            <img
                              src={Order}
                              alt="Pending"
                              className="login-image"
                              style={{ height: "1.5rem", width: "75%" }}
                            />
                          ) : row.tordsts === "Order" ? (
                            <img
                              onClick={() => handleShowModal(row.id)} // Pass the row id to handleShowModal
                              src={Pending}
                              alt="Order"
                              className="login-image"
                              style={{
                                height: "1.5rem",
                                width: "75%",
                                cursor: "pointer",
                              }}
                            />
                          ) : null}
                        </div>
                      </td>
                    </tr>
                  ))}

                  {Array.from({
                    length: Math.max(
                      0,
                      Math.floor((100 * window.innerHeight) / 100) / 40
                    ),
                  }).map((_, index) => (
                    <tr key={`blank-${index}`}>
                      {Array.from({
                        length: 8,
                      }).map((_, colIndex) => (
                        <td key={`blank-${index}-${colIndex}`}>&nbsp;</td>
                      ))}
                    </tr>
                  ))}
                </MDBTableBody>
                <MDBTableFoot
                  style={{ position: "sticky", bottom: 0, zIndex: 2 }}
                >
                  <tr>
                    <th
                      style={{
                        backgroundColor: primaryColor,
                        color: secondaryColor,
                      }}
                    >{Length}</th>
                    <th
                      colSpan={5}
                      style={{
                        backgroundColor: primaryColor,
                        color: secondaryColor,

                        textAlign: "left",
                      }}
                    >
                      
                    </th>
                  <th
                  style={{
                    backgroundColor: primaryColor,
                    color: secondaryColor,

                    textAlign: "center",
                  }}
                  >{formatCurrency(calculateTotalAmount())}</th>
                  <th
                  style={{
                    backgroundColor: primaryColor,
                    color: secondaryColor,
                  }}
                  ></th>
                  </tr>
                </MDBTableFoot>
              </MDBTable>
            </div>
          </div>

          <Footer />
        </div>
      </div>
    </>
  );
};

export default Order_Number;
