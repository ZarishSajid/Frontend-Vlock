// /*!

// =========================================================
// * Black Dashboard React v1.1.0
// =========================================================

// * Product Page: https://www.creative-tim.com/product/black-dashboard-react
// * Copyright 2020 Creative Tim (https://www.creative-tim.com)
// * Licensed under MIT (https://github.com/creativetimofficial/black-dashboard-react/blob/master/LICENSE.md)

// * Coded by Creative Tim

// =========================================================

// * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

// */
// import React,{Fragment} from "react";
// // nodejs library that concatenates classes
// import classNames from "classnames";
// import axios from "axios";
// import { Redirect } from "react-router-dom";
// // reactstrap components
// import {
//   Button,
//   Collapse,
//   DropdownToggle,
//   DropdownMenu,
//   DropdownItem,
//   UncontrolledDropdown,
//   Input,
//   InputGroup,
//   NavbarBrand,
//   Navbar,
//   NavLink,
//   Nav,
//   Container,
//   Modal,
 
// } from "reactstrap";
// import { Link } from "react-router-dom";

// import {AiOutlineUser}  from "react-icons/ai";
// class AdminNavbar extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       collapseOpen: false,
//       modalSearch: false,
//       fireRedirect: false,
//       redirectRoute: "",
//       color: "navbar-transparent"
//     };
//   }
//   componentDidMount() {

//     window.addEventListener("resize", this.updateColor);
//   }
//   componentWillUnmount() {
//     window.removeEventListener("resize", this.updateColor);
//   }
//   // function that adds color white/transparent to the navbar on resize (this is for the collapse)
//   updateColor = () => {
//     if (window.innerWidth < 993 && this.state.collapseOpen) {
//       this.setState({
//         color: "bg-white"
//       });
//     } else {
//       this.setState({
//         color: "navbar-transparent"
//       });
//     }
//   };
//   // this function opens and closes the collapse on small devices
//   toggleCollapse = () => {
//     if (this.state.collapseOpen) {
//       this.setState({
//         color: "navbar-transparent"
//       });
//     } else {
//       this.setState({
//         color: "bg-white"
//       });
//     }
//     this.setState({
      
//       collapseOpen: !this.state.collapseOpen
//     });
//   };
//   // this function is to open the Search modal
//   toggleModalSearch = () => {
//     this.setState({
//       modalSearch: !this.state.modalSearch
//     });
//   };
//     Logout = () => {
//     const headers = {
//       headers: {
//         token: localStorage.getItem("token"),
//       },
//     };
//     axios.get(`http://localhost:8080/logout`, headers)

//     .then((res) => {
//        console.log("RESPONSE = ", res);

//        this.setState({
            
//         redirectRoute:"/Login",

//         fireRedirect: true,

//       });
//       window.location.reload(false);

//       });
//     }
  
  
//   render() {
//     const { userType, fireRedirect, redirectRoute } = this.state;
//     return [
//       <Fragment key={1}>
//       {fireRedirect && [
//         <div key={1}>{this.setState({ fireRedirect: false })}</div>,
//         <Redirect key={2} to={redirectRoute} />,
//       ]}
//     </Fragment>,
//       <>
//         <Navbar
//           className={classNames("navbar-absolute", this.state.color)}
//           expand="lg"
//         >
//           <Container fluid>
//             <div className="navbar-wrapper">
//               <div
//                 className={classNames("navbar-toggle d-inline", {
//                   toggled: this.props.sidebarOpened
//                 })}
//               >
//                 <button
//                   className="navbar-toggler"
//                   type="button"
//                   onClick={this.props.toggleSidebar}
//                 >
//                   <span className="navbar-toggler-bar bar1" />
//                   <span className="navbar-toggler-bar bar2" />
//                   <span className="navbar-toggler-bar bar3" />
//                 </button>
//               </div>
//               <NavbarBrand href="#pablo" onClick={e => e.preventDefault()}>
//                 {this.props.brandText}
//               </NavbarBrand>
//             </div>
//             <button
//               aria-expanded={false}
//               aria-label="Toggle navigation"
//               className="navbar-toggler"
//               data-target="#navigation"
//               data-toggle="collapse"
//               id="navigation"
//               type="button"
//               onClick={this.toggleCollapse}
//             >
//               <span className="navbar-toggler-bar navbar-kebab" />
//               <span className="navbar-toggler-bar navbar-kebab" />
//               <span className="navbar-toggler-bar navbar-kebab" />
//             </button>
//             <Collapse navbar isOpen={this.state.collapseOpen}>
//               <Nav className="ml-auto" navbar>
//                 <InputGroup className="search-bar">
//                   <Button
//                     color="link"
//                     data-target="#searchModal"
//                     data-toggle="modal"
//                     id="search-button"
//                     onClick={this.toggleModalSearch}
//                   >
//                     <i className="tim-icons icon-zoom-split" />
//                     <span className="d-lg-none d-md-block">Search</span>
//                   </Button>
//                 </InputGroup>
                
               
                  
               

//                 {/* <Link  to={"/Login"} > */}

//                   <button   onClick={() => this.Logout()}>Logout</button>
//                   {/* </Link> */}
                
//               </Nav>
//             </Collapse>
//           </Container>
//         </Navbar>
//         <Modal
//           modalClassName="modal-search"
//           isOpen={this.state.modalSearch}
//           toggle={this.toggleModalSearch}
//         >
//           <div className="modal-header">
//             <Input id="inlineFormInputGroup" placeholder="SEARCH" type="text" />
//             <button
//               aria-label="Close"
//               className="close"
//               data-dismiss="modal"
//               type="button"
//               onClick={this.toggleModalSearch}
//             >
//               <i className="tim-icons icon-simple-remove" />
//             </button>
//           </div>
//         </Modal>
//       </>
//    ];
//   }
// }

// export default AdminNavbar;

import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {BsFillPersonFill }from  "react-icons/bs";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Collapse,
  NavItem,
  NavLink
} from "shards-react";

export default class UserActions extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false
    };

    this.toggleUserActions = this.toggleUserActions.bind(this);
  }

  toggleUserActions() {
    this.setState({
      visible: !this.state.visible
    });
  }
  Logout = () => {
        const headers = {
          headers: {
            token: localStorage.getItem("token"),
          },
        };
        axios.get(`http://localhost:8080/logout`, headers)
    
        .then((res) => {
           console.log("RESPONSE = ", res);
    
           this.setState({
                
            redirectRoute:"/Login",
    
            fireRedirect: true,
    
          });
          window.location.reload(false);
    
          });
        }
      
      
  render() {
    return (
      <NavItem tag={Dropdown}  caret toggle={this.toggleUserActions}>
        <DropdownToggle style={{marginRight:"30px"}} caret tag={NavLink} className="text-nowrap px-3">
          
        <img style={{height:"30px"}}
            className="user-avatar rounded-circle mr-2"
            src={require("../../../../images/avatars/0.jpg")}
            alt="User Avatar"
          />{" "} 
        
        </DropdownToggle>
        <Collapse tag={DropdownMenu}style={{marginRight:"30px"}} right small open={this.state.visible}>
          <DropdownItem tag={Link} to="/components/user-profile-lite">
            <i className="material-icons">&#xE7FD;</i> Profile
          </DropdownItem>
          <DropdownItem tag={Link} to="edit-user-profile">
            <i className="material-icons">&#xE8B8;</i> Guide
          </DropdownItem>
         
        
          <DropdownItem divider />
          <DropdownItem tag={Link} to="/"  onClick={() => this.Logout()} className="text-danger">
            <i className="material-icons text-danger">&#xE879;</i> Logout
          </DropdownItem>
        </Collapse>
      </NavItem>
    );
  }
}
