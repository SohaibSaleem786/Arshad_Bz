import React from "react";
import { MDBTable, MDBTableBody, MDBTableHead } from "mdbreact";

const CategoryTable = ({ data, filterValue, tableCellStyle, apiLinks }) => {
  return (
    <div
      style={{
        fontSize: "13px",
        width: "100%",
        overflowX: "auto",
        // marginLeft: "10%",
        // marginRight: "10%",
      }}
    >
      <MDBTable scrollY maxHeight="70vh" striped bordered small responsive>
        <MDBTableHead>
          <tr style={{textAlign:'center'}}>
            <th style={tableCellStyle}>ID</th>
            <th style={tableCellStyle}>Index</th>
            <th style={tableCellStyle}>Description</th>
            <th style={tableCellStyle}>Remarks</th>
            <th style={tableCellStyle}>Status</th>
            <th style={tableCellStyle}>Picture</th>
          </tr>
        </MDBTableHead>

        <MDBTableBody>
          {data
            .filter((item) =>
              item.tctgdsc.toLowerCase().includes(filterValue.toLowerCase())
            )
            .map((item) => (
              <tr key={item.tctgid}>
                <td style={{ textAlign: "center" }}>{item.tctgid}</td>
                <td style={{ textAlign: "center" }}>{item.ctindexs}</td>
                <td style={{ textAlign: "left" }}>{item.tctgdsc}</td>
                <td style={{ textAlign: "left" }}>{item.remarks}</td>
                <td style={{textAlign:'center'}}>{item.tctgsts}</td>
                <td style={{ width: "15%",textAlign:'center' }}>
                  <img
                    src={`${apiLinks}/ctgImg/${item.tctgpic}`}
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

export default CategoryTable;
