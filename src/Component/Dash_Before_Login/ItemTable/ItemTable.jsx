import React from "react";
import { MDBTable, MDBTableHead, MDBTableBody } from "mdbreact";

const ItemTable = ({
  data1,
  filterValue,
  primaryColor,
  tableCellStyle,
  secondaryColor,
  imageurlitm,
}) => {
  console.log(data1, "show tha tdata is here ");
  return (
    <div
      style={{
        fontSize: "12px",
        width: "100%",
        maxHeight: "70vh",
        overflowX: "hidden",
        overflowY: "auto",  
      }}
    >
      <MDBTable striped bordered small responsive>
        <MDBTableHead>
          <tr>
            {data1 && data1.columns && data1.columns.length > 0
              ? data1.columns.map((column, columnIndex) => (
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
                ))
              : null}
          </tr>
        </MDBTableHead>
        <MDBTableHead>
          <tr style={{ textAlign: "center" }}>
            <th style={tableCellStyle}>ID</th>
            <th style={tableCellStyle}>Description</th>
            <th style={tableCellStyle}>تفصیل</th>
            <th style={tableCellStyle}>Remarks</th>
            <th style={tableCellStyle}>UOM</th>
            <th style={tableCellStyle}>Status</th>
            <th style={tableCellStyle}>Cost</th>
            <th style={tableCellStyle}>Sale</th>
            <th style={tableCellStyle}>Discount</th>
            <th style={tableCellStyle}>Category</th>
            <th style={tableCellStyle}>Type</th>
            <th style={tableCellStyle}>Pic</th>
          </tr>
        </MDBTableHead>
        <MDBTableBody>
          {data1
            .filter((item) =>
              item.TItmDsc.toLowerCase().includes(filterValue.toLowerCase())
            )
            .map((row, index) => (
              <tr key={index}>
                {[
                  "TItmId",
                  "TItmDsc",
                  "itmdscurd",
                  "itmremarks",
                  "uom",
                  "TItmSts",
                  "TPurRat",
                  "itmdis",
                  "TSalRat",
                  "tctgdsc",
                  "TitmTyp",
                ].map((key, columnIndex) => {
                  if (key === "tusrpwd") {
                    // Skip rendering these columns
                    return null;
                  }

                  return (
                    <td
                      key={key}
                      style={{
                        textAlign:
                          columnIndex === 1 || columnIndex === 3
                            ? "left"
                            : columnIndex === 2
                            ? "right"
                            : "center",
                        width: columnIndex === 1 ? "17%" : "auto",
                      }}
                    >
                      {key === "tusrpwd" ? "*****" : row[key]}
                    </td>
                  );
                })}
                <td>
                  <img
                    src={imageurlitm + row.TItmPic}
                    alt="Category"
                    style={{ width: "50px", height: "auto" }}
                  />
                </td>
              </tr>
            ))}
        </MDBTableBody>
      </MDBTable>
    </div>
  );
};

export default ItemTable;
