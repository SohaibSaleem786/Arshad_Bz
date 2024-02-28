// CategoryCardContainer.jsx

import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

const CategoryCardContainer = ({ data, filterValue, primaryColor, secondaryColor, imageurl, id }) => {
  console.log("CategoryCardContainer");

  return (
    <div
      className="card-container"
      style={{
        overflowX: "hidden",
        overflowY: "auto",
        maxHeight: "70vh",
      }}
    >
      <div className="cards" style={{ fontSize: "12px", width: "104%", display: "flex", flexWrap: "wrap" }}>
        {data
          .filter((item) => item.tctgdsc.toLowerCase().includes(filterValue.toLowerCase()))
          .filter((item) => item.tctgsts === "Yes")
          .map((item) => (
            <Card
              key={item.tctgid}
              sx={{
                maxWidth: 345,
                margin: "8px",
                width: "15%",
                height: "190px",
              }}
            >
              <CardContent
                style={{
                  backgroundColor: primaryColor,
                  color: secondaryColor,
                  height: "49px",
                }}
              >
                <Typography gutterBottom component="div" style={{ fontSize: "18px", textAlign: "center", fontWeight: "bold" }}>
                  {item.tctgdsc}
                </Typography>
              </CardContent>
              <Link to={`/Order_Item/${item.tctgid}/${id}`}>
                <CardMedia component="img" height="140" image={imageurl + item.tctgpic} alt="Category" />
              </Link>
            </Card>
          ))}
      </div>
    </div>
  );
};

export default CategoryCardContainer;
