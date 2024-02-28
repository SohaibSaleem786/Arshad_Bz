import React, { forwardRef, useEffect, useState } from "react";
import { MDBTable, MDBTableBody, MDBTableHead, MDBTableFoot } from "mdbreact";
import { useTheme } from "../../../ThemeContext";
import axios from "axios";

const Receipt = forwardRef(
  (
    {
      newOrderData,
      detailItem,
      priceDiscount,
      percentageDiscount,
      totalAmount,
    },
    ref
  ) => {
    console.log("newOrderData to receive", newOrderData);

    const { primaryColor, secondaryColor, apiLinks } = useTheme();

    const [tamtItems, settamtItems] = useState([]);
    const [totalItem, settotalItem] = useState([]);
    const [detailItema, setDetailItem] = useState([]);

    console.log("totalAmount detailItem", detailItem);

    return (
      <div id="receipt-container" ref={ref}>
        <div id="receipt" style={{ textAlign: "center", marginTop: "3%" }}>
          <h2 style={{ textAlign: "center" }}>Malik Spicy Restaurant</h2>
          <p style={{ textAlign: "center" }}>
            176 A Sector C Commercial <br />
            Bahria Town Lahore <br />
            Delivery: 042-37862888/0 0300-7888478 <br />{" "}
            0300-7888479/0300-7888480
          </p>

          <hr style={{ border: "3px", width: "50%", margin: "0 auto" }} />

          <h3>Sales Receipt</h3>
          <hr style={{ border: "3px", width: "50%", margin: "0 auto" }} />

          <p style={{ textAlign: "left", marginLeft: "15%" }}>
            Token Number:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            {newOrderData?.id}
            <br />
            Invoice Number:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;432140
            <br />
            Date and
            Time:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;01/03/2024
            01:41:46 PM
          </p>

          <div style={{ display: "flex", justifyContent: "center" }}>
            <MDBTable small responsive>
              <MDBTableHead>
                <tr>
                  <th className="centered-header">Sr.</th>
                  <th className="centered-header">Item</th>
                  <th className="centered-header">Price</th>
                  <th className="centered-header">Quantity</th>
                  <th className="centered-header">Total</th>
                </tr>
              </MDBTableHead>
              <MDBTableBody>
                {detailItem?.map((item, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td style={{ textAlign: "left" }}>{item.titmdsc}</td>
                    <td className="right-align">{item.tsalrat}</td>
                    <td style={{ textAlign: "center" }}>{item.titmqnt}</td>
                    <td className="right-align">{item.salamt}</td>
                  </tr>
                ))}
              </MDBTableBody>
            </MDBTable>
          </div>
          <hr style={{ border: "2px solid black", margin: "0 auto" }} />

          <div
            style={{
              display: "flex",
              justifyContent: "left",
              marginLeft: "15%",
              marginTop: "5px",
            }}
          >
            <p>
              {" "}
              <span style={{ fontWeight: "bold" }}>Totol Items:</span>{" "}
              {totalItem}
            </p>
            <p style={{ marginLeft: "10px" }}>
              <span style={{ fontWeight: "bold" }}>Totol Amount:</span>{" "}
              {tamtItems}
            </p>
          </div>
          <hr style={{ border: "2px solid black", margin: "0 auto" }} />

          <p style={{ marginTop: "2px" }}>
            {" "}
            <span style={{ fontWeight: "bold" }}>Amount Payable:</span>{" "}
            {totalAmount}
          </p>
        </div>
      </div>
    );
  }
);

export default Receipt;
