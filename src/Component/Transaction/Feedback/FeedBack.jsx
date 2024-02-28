import React, { useState } from "react";
import { Typography, TextField, Button } from "@mui/material";
import Header from "../../MainComponent/Header/Header";
import PathHead from "../../MainComponent/PathHead/PathHead";
import Footer from "../../MainComponent/Footer/Footer";
import axios from "axios";
import { useTheme } from "../../../ThemeContext";
import Alert from "@mui/material/Alert";

const Feedback = () => {
  const [alertData, setAlertData] = useState(null);

  const { apiLinks } = useTheme();
  const [feedbackData, setFeedbackData] = useState({
    name: "",
    mobile: "",
    email: "",
    remarks: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFeedbackData((prevData) => ({ ...prevData, [name]: value }));
  };

  
   function handleSubmit() {
    const data = {
      username: feedbackData.name,
      email: feedbackData.email,
      mobile: feedbackData.mobile,
      remarks: feedbackData.remarks,
    };
    const formData = new URLSearchParams(data).toString();

    axios
      .post(`${apiLinks}/FeedBack.php`, formData, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
      .then((response) => {
        if (response.data.error === 200) {
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
  }
  const feedbackContainerStyle = {
    maxWidth: '600px',
    margin: '10px auto',
    padding: '20px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    backgroundColor: '#fff',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  };

  const headingStyle = {
    color: '#333',
    textAlign: 'center',
  };

  const descriptionStyle = {
    color: '#666',
    textAlign: 'center',
    marginBottom: '20px',
  };

  const inputStyle = {
    width: '100%',
    marginBottom: '20px',
  };

  const buttonStyle = {
    backgroundColor: '#007bff',
    color: '#fff',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
    transition: 'background-color 0.3s ease',
  };

  const buttonHoverStyle = {
    backgroundColor: '#0056b3',
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
           <Header />
      <PathHead pageName="Dashboard > Feedback" screen="Get_Item" pageLink="/MainPage" />
      <div style={feedbackContainerStyle}>
        <Typography variant="h4" style={headingStyle}>Share Your Feedback</Typography>
        <Typography variant="body1" style={descriptionStyle}>We value your opinion. Let us know how we can improve!</Typography>

        <TextField
          label="Name"
          name="name"
          value={feedbackData.name}
          onChange={handleInputChange}
          variant="outlined"
          style={inputStyle}
        />

        <TextField
          label="Mobile"
          name="mobile"
          value={feedbackData.mobile}
          onChange={handleInputChange}
          variant="outlined"
          style={inputStyle}
        />

        <TextField
          label="Email"
          name="email"
          value={feedbackData.email}
          onChange={handleInputChange}
          variant="outlined"
          style={inputStyle}
        />

        <TextField
          label="Remarks"
          name="remarks"
          value={feedbackData.remarks}
          onChange={handleInputChange}
          multiline
          rows={4}
          variant="outlined"
          style={inputStyle}
        />

        <Button
          onClick={handleSubmit}
          variant="contained"
          style={{ ...buttonStyle, ...(buttonHoverStyle && { ...buttonHoverStyle }) }}
        >
          Submit Feedback
        </Button>
      </div>
      <Footer />   
      </div>









 
       </>
  );
};

export default Feedback;
