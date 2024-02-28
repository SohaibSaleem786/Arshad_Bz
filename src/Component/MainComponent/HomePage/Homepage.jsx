// import {React,useState} from "react";
// import NavBar from "../Navbar/Navbar";
// import Header from "../Header/Header";
// // import Ittefaq from "../../image/logo.png";
// import Ittefaq from '../../../image/logo.png';
// import Footer from "../Footer/Footer";
// import { useLocation  } from "react-router-dom";
// import SideBar from "../SideBar/SideBar";
// import Metal from '../../../image/grmetal.png'
// import { useTheme } from "../../../ThemeContext";
// function HomePage1() {
//   const location = useLocation();
//   const { primaryColor,secondaryColor } = useTheme();
//   const [showNavBar, setShowNavBar] = useState(true);

//   const toggleNavbar = () => {
//     setShowNavBar(!showNavBar);
//   };
//   const userid = location?.state?.userid || null; // Check if location state contains the userid
//   const permissions = location?.state?.permissions || [];

//   return (
//     <>
 
//  <Header /> <NavBar />
//     {/* {showNavBar ?   <>  <Header /> <NavBar /></> : <SideBar />} */}


//     {/* <div
//       className="d-flex flex-column flex-grow-1"
//       style={{fontFamily: 'Verdana', backgroundColor: "lightblack" }}
//     >
      
//       <div className="container-fluid HomePage1 row justify-content-center align-items-center">
      
//         <div className="col-12 col-md-8 col-lg-6 text-center" style={{marginTop:'3%'}}>
        
//           <img
//             src={Metal}
//             alt="ITTEFAQ ELECTRONICS"
//             style={{ width: "30%" }}
//           />
//           <h1
//             className="mt-4 mb-5"
//             style={{ color: primaryColor, fontSize: "48px", fontWeight: "bold" }}
//           >
//             Welcome to Complain Management System 
//           </h1>
//           <p
//             style={{ color: "#444444", fontSize: "18px", lineHeight: "1.4" }}
//           >
//            A realm of boundless creativity and innovation, where art takes on new dimensions. Our passion is to transform imagination into exquisite visual masterpieces.
//           </p>
//         </div>
//       </div>
      
//     </div> */}

// <div
//       className="d-flex flex-column flex-grow-1"
//       style={{ fontFamily: "Verdana", backgroundColor: "#ecf0f1", minHeight: "100vh" 
//       }}
//     >
//       <div className="container-fluid HomePage1 row justify-content-center align-items-center">
//         <div className="col-12 col-md-8 col-lg-6 text-center" style={{ marginTop: '1%'
//         , position: 'absolute', top: '55%', left: '50%', transform: 'translate(-50%, -50%)' }}>
//           <img
//             src={Metal}
//             alt="ITTEFAQ ELECTRONICS"
//             style={{ width: "33%", borderRadius: "50%", boxShadow: "0 22px 44px rgba(0, 0, 0, 0.3)" }}
//           />
//           <h1
//             className="mt-4 mb-5"
//             style={{ color: primaryColor, fontSize: "44px", fontWeight: "bold" }}
//           >
//             Welcome to the Complaint Management System
//           </h1>
//           <p
//             style={{ color: "#333", fontSize: "16px", lineHeight: "1.4" }}
//           >
//             A realm of boundless creativity and innovation, where art takes on new dimensions. Our passion is to transform imagination into exquisite visual masterpieces.
//           </p>
//         </div>
//       </div>
//     </div>
    

  
//     <Footer className="mt-auto fixed-bottom" />
//   </>
//   );
// }

// export default HomePage1;





import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import NavBar from "../Navbar/Navbar";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import SideBar from "../SideBar/SideBar";
import Metal from '../../../image/grmetal.png';
import { useTheme } from "../../../ThemeContext";
import Dashboard from '../../../image/dashboard.jpg';
import CategoryImage from '../../../image/Category.png';
import ItemImage from '../../../image/item.png';
import OrderList from '../../../image/OrderList.png';
import Support from '../../../image/Support.png';
import Feedback from '../../../image/feedback.png';
function HomePage1() {
  const navigate = useNavigate();
  const location = useLocation();
  const { primaryColor, secondaryColor } = useTheme();

  const userid = location?.state?.userid || null;
  const permissions = location?.state?.permissions || [];

  const handleNavigation = (path) => {
    navigate(path);
  };

  const cardData = [
    {
      title: "Category",
      description: "Explore items by category",
      buttonLabel: "Category",
      onClick: () => handleNavigation("/Get_Category"),
      color: "danger",
      image: <img src={CategoryImage} alt="Category"  style={{width:'70px',height:'80px'}}/>,
    },
    {
      title: "All Items",
      description: "Discover our entire collection",
      buttonLabel: "Items",
      onClick: () => handleNavigation("/Get_Item"),
      color: "success",
      image: <img src={ItemImage} alt="Item" style={{width:'70px',height:'80px'}} />,
    },
    {
      title: "Order List",
      description: "Check your order history",
      buttonLabel: "Orders List",
      onClick: () => handleNavigation("/Order_List"),
      color: "info",
      image: <img src={OrderList} alt="Order" style={{width:'70px',height:'80px'}}/>,
    },
    // {
    //   title: "Pending Orders",
    //   description: "Manage pending orders",
    //   buttonLabel: "View Pending Orders",
    //   onClick: () => handleNavigation("/Pending_Order_List"),
    //   color: "warning",
    //   image: <img src={ItemImage} alt="Pending Order" style={{width:'70px',height:'80px'}}/>,
    // },
    {
      title: "Feedback",
      description: "Check customer feedback",
      buttonLabel: "Feedback",
      onClick: () => handleNavigation("/FeedbackPage"),
      color: "primary",
      image: <img src={Feedback} alt="Feedback" style={{width:'70px',height:'80px'}}/>,
    },
    {
      title: "Support",
      description: "Get customer support",
      buttonLabel: "Contact Support",
      onClick: () => handleNavigation("/SupportPage"),
      color: "danger",
      image: <img src={Support} alt="Support" style={{width:'70px',height:'80px'}}/>,
    },
  ];
  

  return (
    <>
      <Header />
      <div className="container mt-5">
        <div className="row">
          {cardData.map((card, index) => (
            <div key={index} className="col-lg-4 col-md-6 col-sm-12 mb-4">
              <div className={`card h-100 bg-${card.color}`}>
                <div className="card-body text-center">
                  {card.image}
                  <h5 className="card-title">{card.title}</h5>
                  <p className="card-text">{card.description}</p>
                  <button
                    style={{ backgroundColor: primaryColor, color: secondaryColor }}
                    className={`btn btn-${card.color}`}
                    onClick={card.onClick}
                  >
                    {card.buttonLabel}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default HomePage1;





