import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage1 from "./Component/MainComponent/HomePage/Homepage";
import AuthProvider from "./AuthContext";
import { ThemeProvider } from "./ThemeContext"; // Import the ThemeProvider
import { RowIdProvider } from "./createContext";
import Get_Category from "./Component/File/Category_Maintenace/Get_Category/Get_Category";
import Add_Category from "./Component/File/Category_Maintenace/Add_Category/Add_Category";
import Update_Category from "./Component/File/Category_Maintenace/Update_Category/Update_Category";
import Loginn from "./Component/MainComponent/Loginn/Loginn";
import Get_Item from "./Component/File/Item Maintenance/Get Item/Get_Item";
import Add_Item from "./Component/File/Item Maintenance/Add Item/Item";
import Update_Item from "./Component/File/Item Maintenance/Update Item/Update_Item";
import Order_Number from "./Component/Transaction/Order/Order_List";
import Login from "./Component/Dash_Before_Login/Login";
import Order_Item from "./Component/Dash_Before_Login/CategoryCar/CategoryItemCard/CategoryITem";
import Pending_Order_List from "./Component/Transaction/Pending_Order/Pending_Order";
import SupportPage from "./Component/Transaction/Support/Suppot";
import Feedback from "./Component/Transaction/Feedback/FeedBack";

function App() {
  return (
    <>
      <div style={{ backgroundColor: "#edf2ff", minHeight: "100vh" }}>
        <Router basename="/arshad_bzz">
          <AuthProvider>
            {/* Use the ThemeProvider */}
            <ThemeProvider>
              <RowIdProvider>
                <Routes>
                  <Route path="/" element={<Login />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/Loginn" element={<Loginn />} />
                  <Route path="/MainPage" element={<HomePage1 />} />
                  {/* Item */}
                  <Route path="/Get_Item" element={<Get_Item />} />
                  <Route path="/Add_Item" element={<Add_Item />} />
                  <Route
                    path="/Update_Item/:TItmId"
                    element={<Update_Item />}
                  />
                  {/* Category */}
                  <Route path="/Get_Category" element={<Get_Category />} />
                  <Route path="/Add_Category" element={<Add_Category />} />
                  <Route
                    path="/Update_Category/:tctgid"
                    element={<Update_Category />}
                  />
                  {/* Transaction */}
                  {/* ///////////////////     ORDER  ////////////////////////// */}
                  <Route path="/Order_List" element={<Order_Number />} />
                  <Route
                    path="/Order_Item/:categoryId/:id"
                    element={<Order_Item />}
                  />{" "}
                  {/* Include categoryId as a parameter */}
                  <Route
                    path="/Pending_Order_List"
                    element={<Pending_Order_List />}
                  />
                  <Route path="/SupportPage" element={<SupportPage />} />
                  <Route path="/FeedbackPage" element={<Feedback />} />
                  
                  
            
                </Routes>
              </RowIdProvider>
            </ThemeProvider>
          </AuthProvider>
        </Router>
      </div>
    </>
  );
}

export default App;
