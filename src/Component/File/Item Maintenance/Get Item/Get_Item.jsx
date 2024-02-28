import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MDBTable, MDBTableBody, MDBTableHead, MDBTableFoot } from "mdbreact";
import Header from "../../../MainComponent/Header/Header";
import Footer from "../../../MainComponent/Footer/Footer";
import { useTheme } from "../../../../ThemeContext";
import PathHead from "../../../MainComponent/PathHead/PathHead";
import Edit from "../../../../image/edit.png";
import {
  Card,
  Row,
  Col,
  Button,
  FormControl,
  InputGroup,
  Form,
} from "react-bootstrap";
import "../Get Item/Get_Item.css";
import { useDispatch, useSelector } from "react-redux";
import {fetchItem } from "../../../../Redux/action";
const Get_Item = () => {
  const dispatch = useDispatch();
  const item = useSelector((state) => state.item);
  useEffect(() => {
    dispatch(fetchItem());
  }, [dispatch]);

  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");
  const [data, setData] = useState({ columns: [], rows: [] });
  const { primaryColor, secondaryColor } = useTheme();
  const { apiLinks, fontFamily } = useTheme();
  const imageurl = `${apiLinks}/itemimage/`;
  const [Length, setLength] = useState("");

  const handleMenuItemClick = () => {
    navigate("/Add_Item");
  };
  const [getUser, setUser] = useState();

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
    if (item && item.data) {
      const transformedData = item.data.map((item) => ({
        TItmId: item.TItmId,
        TItmDsc: item.TItmDsc,
        // itmdscurd: item.itmdscurd,
        // itmremarks: item.itmremarks,
        uomdsc: item.uomdsc,
        TItmSts: item.TItmSts,
        // TPurRat: item.TPurRat,
        // itmdis: item.itmdis,
        TSalRat: item.TSalRat,
        tctgdsc: item.tctgdsc,
        // TitmTyp: item.TitmTyp,
        // TItmPic: item.TItmPic,
      }));

      const columns = [
        { label: " ID", field: "TItmId", sort: "asc" },
        { label: "Desription ", field: "TItmDsc", sort: "asc" },
        // { label: "تفصیل ", field: "itmdscurd", sort: "asc" },
        // { label: "Remarks ", field: "itmremarks", sort: "asc" },

        { label: "UOM ", field: "uom", sort: "asc" },

        { label: "Status", field: "TItmSts", sort: "asc" },
        // { label: "Cost", field: "TPurRat", sort: "asc" },
        { label: "Sale Rate", field: "TSalRat", sort: "asc" },
        // { label: "Discount", field: "itmdis", sort: "asc" },
        { label: "Category", field: "tctgdsc", sort: "asc" },
        // { label: " Type", field: "TitmTyp", sort: "asc" },
        // { label: "Pic ", field: "TItmPic", sort: "asc" },
        // { label: "Edit ", field: "tedtdat", sort: "asc" },
      ];

      setData({ columns, rows: transformedData });
      setLength(item.data.length);
    }
  }, [item]);
  const filteredRows = data.rows.filter((row) =>
    row.TItmDsc.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };
  ///////////////// here is our selected row
  const [selectedRow, setSelectedRow] = useState(null);

  const handleRowClick = (row) => {
    if (selectedRow === row.TItmId) {
      // If the clicked row is already selected, navigate to the update screen
      navigate(`/Update_Item/${row.TItmId}`);
    } else {
      // Set the selectedRow state to the clicked row id
      setSelectedRow(row.TItmId);
    }
  };
  return (
    <>
      <Header />
      <PathHead
        pageName="Dashboard > Item Maintenance"
        screen="Get_Item"
        pageLink="/MainPage"
      />

      <div
        className="col-12"
        style={{ color: secondaryColor, fontFamily: fontFamily }}
      >
        <br />
        <div
          className="Item-container"
          style={{
            marginLeft: "15%",
            marginRight: "15%",
            maxWidth: "70%",
            padding: "10px",
            border: "1px solid black",
            backgroundColor: "white",
          }}
        >
          <Row>
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
                onClick={handleMenuItemClick}
              >
                ADD
              </Button>
            </Col>

            <Col xs={12} sm={4} md={4} lg={4} xl={{ span: 2, offset: 8 }}>
              <Form.Control
                type="text"
                placeholder="Search..."
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
              {/* <MDBTableHead columns={data.columns} /> */}
              <MDBTableHead>
                <tr>
                  {data.columns.map((column, columnIndex) => (
                    <th
                      key={columnIndex}
                      style={{
                        backgroundColor: primaryColor,
                        color: secondaryColor,
                        fontWeight: "bold",
                        position: "sticky",
                        top: -1,
                        textAlign:'center',
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
                  <tr key={index} onClick={() => handleRowClick(row)}>
                    
                    {Object.keys(row).map((key, columnIndex) => {
                      if (columnIndex === 9) {
                        // Skip rendering these columns
                        return null;
                      }

                      return (
                        <td
                          key={key}
                          style={{
                            textAlign:
                              columnIndex === 1
                                ? "left"
                                : columnIndex === 2
                                ? "center"
                                : columnIndex === 4
                                ? "right"
                                :"center",

                            width: columnIndex === 1 ? "30%" : "auto",
                          }}
                        >
                          {key === "tusrpwd" ? "*****" : row[key]}
                        </td>
                      );
                    })}
                    {/* <td style={{textAlign:'center'}}>
                      <img
                        src={imageurl + row.TItmPic}
                        alt="Category"
                        style={{ width: "50px", height: "22px" }}
                      />
                    </td> */}
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
                      length: 6,
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
                      textAlign:'center'
                    }}
                  >{Length}</th>
                  <th
                    colSpan={11}
                    style={{
                      backgroundColor: primaryColor,
                      color: secondaryColor,

                      textAlign: "left",
                    }}
                  >
                    
                  </th>
                </tr>
              </MDBTableFoot>
            </MDBTable>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default Get_Item;
