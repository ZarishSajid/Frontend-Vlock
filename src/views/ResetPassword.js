// import React from "react";
// import {
//   MDBCard,
//   MDBCardTitle,
//   MDBBtn,
//   MDBRow,
//   MDBCol,
//   MDBIcon,
//   MDBInput,
// } from "mdbreact";
// import { Form, FormInput, FormGroup } from "shards-react";
// import { Modal, ModalBody, ModalHeader } from "shards-react";
// import Link from "@material-ui/core/Link";
// import { Redirect, NavLink } from "react-router-dom";
// import Avatar from "@material-ui/core/Avatar";
// import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
// //  import { createHashHistory } from "history";
// import { history } from "react-dom";
// import axios from "axios";
// import { Typography } from "@material-ui/core";
// import PhoneInput from "react-phone-input-2";
// import "react-phone-input-2/lib/style.css";
// import { Select, Input } from "antd";
// const FormItem = Form.Item;
// const { Option } = Select;
// const prefixSelector = (
//   <Form.Item name="prefix" noStyle>
//     <Select style={{ width: 70 }}>
//       <Option value="86">+86</Option>
//       <Option value="87">+87</Option>
//     </Select>
//   </Form.Item>
// );
// const { Text } = Typography;
// export default class Login extends React.Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       phone: "",
//       sapID:"",
//       //    SapId: "2284",
//       //  password: "admin",
//     };

//   }
//   Redirect() {
//     const headers = {
//       headers: {
//         token: localStorage.getItem("token"),
//       },
//     };
//     const data = {
//       phone: this.state.phone,
//       sapID: this.state.sapID,

//     };
//     console.log("Number  ", this.state.phone);
//     console.log("SapId = ", this.state.sapID);

//     axios
//       .post(`http://localhost:8080/vlock/sms`, headers)

//       .then((res) => {
//         console.log("RESPONSE = ", res);

//         this.setState({ pulls: res.data });
//         // this.userDetails.privateKey = res.data.data.accountId.privateKey;

//       });

//     }
//   prefixSelector = (
//     <Form.Item name="prefix" noStyle>
//       <Select style={{ width: 70 }}>
//         <Option value="86">+86</Option>
//         <Option value="87">+87</Option>
//       </Select>
//     </Form.Item>
//   );
//   render() {
//     const { open, values } = this.state;
//     return (
//       <MDBRow
//         style={{
//           backgroundRepeat: "no-repeat",
//           backgroundSize: "cover",
//           backgroundImage:
//             "url('https://techcrunch.com/wp-content/uploads/2017/10/gettyimages-844081956.jpg?w=730&crop=1')",
//         }}
//       >
//         <MDBCard
//           className="card-image"
//           style={{
//             marginTop: "20px",
//             marginLeft: "270px",
//             width: "15rem",
//             height: "700px",
//             //#00008B
//             backgroundColor: "#2980B9 ",
//           }}
//         >
//           <h4 style={{ marginTop: "50px", color: "white", marginLeft: "20px" }}>
//             Lock Your Decision
//           </h4>
//           {/* <p style={{color:"white",marginLeft:"20px"}}>Please enter your credientials to login.If you are not a  member.</p> */}

//           <NavLink to={"/Register"}>
//             <p style={{ color: "white", marginLeft: "20px" }}>
//               {" "}
//               Please register Yourself.
//             </p>
//           </NavLink>
//         </MDBCard>

//         <MDBCard
//           className="card-image"
//           style={{
//             marginTop: "20px",
//             textColor: "blue",
//             textColor: "black",
//             marginLeft: "0px",
//             width: "32rem",
//           }}
//         >
//           {/* <form  onSubmit={this.submitForm.bind(this)}> */}
//           <div className="text-blue rgba-stylish-strong py-5 px-5 z-depth-4">
//             <div className="text-center">
//               <h3 className="blue-text mb-5 mt-4 font-weight-bold">
//                 {/* <Avatar style={{marginLeft:"190px",color:"white",backgroundColor:"#f58742"}}  >
//              <LockOutlinedIcon />
//          </Avatar> */}
//                 <img
//                   id="main-logo"
//                   className="d-inline-block align-top mr-1"
//                   style={{
//                     maxWidth: "80px",
//                     height: "75px",
//                     color: "blue",
//                     marginRight: "100px",
//                   }}
//                   src={require("../../src/images/shards-dashboards-orignal.svg")}
//                   alt="VLock"
//                 />
//                 <h4 style={{ marginLeft: "0px", color: "Black" }}>
//                   Reset Password
//                 </h4>
//                 <a href="#!" className="green-text font-weight-bold"></a>
//               </h3>
//             </div>
//             <br />
//             <br />
//             <Form>
//             <FormGroup>
//             <label htmlFor="#password">Sap Id</label>
//         <FormInput type="id" id="id"
//                       value={this.state.sapID}
//                       />
//       </FormGroup>
//             <PhoneInput
//               country={"us"}
//               value={this.state.phone}
//               onChange={(phone) => this.setState({ phone })}
//             />

//             <br />

//             <center>
//               {" "}
//               <NavLink to={`/components/Admin`}>
//                 <p style={{ color: "white", marginLeft: "30px" }}>
//                   {" "}
//                   Please register Yourself.
//                 </p>
//               </NavLink>
//               <MDBBtn
//                 style={{ width: "180px" }}
//                 onClick={this.Redirect()}
//                 color="primary"
//                 rounded
//               >
//                 Reset
//               </MDBBtn>

//             </center>
//             </Form>
//             <br />
//             {/*
//                 </div>

//               </MDBRow> */}
//           </div>

//           {/* </form> P*/}
//           <Modal size="md" open={open} toggle={this.toggle}>
//             <ModalHeader style={{ marginLeft: "30px" }}>
//               {" "}
//               OTP
//             </ModalHeader>
//             <ModalBody>
//               <p> {}</p>
//             </ModalBody>
//           </Modal>
//         </MDBCard>
//       </MDBRow>
//     );
//   }
// }

import React, { Fragment } from "react";

import {
  MDBCard,
  MDBCardTitle,
  MDBBtn,
  MDBRow,
  MDBCol,
  MDBIcon,
  MDBInput,
} from "mdbreact";
import { Form, Typography } from "antd";
import { Select } from "antd";
import Link from "@material-ui/core/Link";
import { Redirect, NavLink } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { createHashHistory } from "history";
import { Input } from "reactstrap";
import { history } from "react-dom";
import axios from "axios";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
const FormItem = Form.Item;
const { Text } = Typography;
const { Option } = Select;
const prefixSelector = (
  <Form.Item name="prefix" noStyle>
    <Select style={{ width: 70 }}>
      <Option value="86">+86</Option>
      <Option value="87">+87</Option>
    </Select>
  </Form.Item>
);
class ResetPassword extends React.Component {
  constructor(props) {
    super(props);
    this.Redirect = this.Redirect.bind(this);
    this.state = {
      sapID: "",
      number: "",
    };
  }

  Redirect() {
    const headers = {
      headers: {
        token: localStorage.getItem("token"),
      },
    };
    const data = {
      sapID: this.state.sapID,
      number: this.state.number,
    };

    console.log("SapID", this.state.sapID);
    console.log("Number", this.state.number);

    axios
      .post(`http://localhost:8080/vlock/sms`, data)

      .then((res) => {
        console.log("RESPONSE = ", res);

        this.setState({ pulls: res.data });
        // this.userDetails.privateKey = res.data.data.accountId.privateKey;
      });
  }

  // validateSapId = (value, callback) => {
  //   if (!/^[0-9]*$/i.test(value)) {
  //     callback("Invalid SapId");
  //   }
  //   return callback();
  // };
  prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select style={{ width: 70 }}>
        <Option value="86">+86</Option>
        <Option value="87">+87</Option>
      </Select>
    </Form.Item>
  );
  render() {
    const { userType, fireRedirect, redirectRoute } = this.state;
    const { getFieldDecorator } = this.props.form;

    return [
      <Form onSubmit={this.onRedirect}>
        <MDBRow
          style={{
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundImage:
              "url('https://techcrunch.com/wp-content/uploads/2017/10/gettyimages-844081956.jpg?w=730&crop=1') ",
          }}
        >
          <center>
            <MDBCard
              className="card-image"
              style={{
                marginTop: "20px",
                marginLeft: "280px",
                width: "15rem",
                height: "620px",
                shape: "square",
                //#00008B
                backgroundColor: "#2980B9 ",
              }}
            >
              <h4
                style={{
                  marginTop: "50px",
                  color: "white",
                  marginLeft: "10px",
                }}
              >
                Lock Your Decision
              </h4>
              {/* <p style={{color:"white",marginLeft:"20px"}}>Please enter your credientials to login.If you are not a  member.</p> */}

              <NavLink to={"/Register"}>
                <p style={{ color: "white", marginLeft: "10px" }}>
                  {" "}
                  Please register Yourself.
                </p>
              </NavLink>
            </MDBCard>
          </center>
          <MDBCard
            className="card-image"
            style={{
              marginTop: "20px",
              textColor: "blue",
              textColor: "black",
              shape: "square",
              marginLeft: "0px",
              height: "620px",

              width: "32rem",
            }}
          >
            {/* <form  onSubmit={this.submitForm.bind(this)}> */}
            <div className="text-blue rgba-stylish-strong py-5 px-5 z-depth-4">
              <div className="text-center">
                <h3 className="blue-text mb-5 mt-4 font-weight-bold">
                  {/* <Avatar style={{marginLeft:"190px",color:"white",backgroundColor:"#f58742"}}  >
             <LockOutlinedIcon /> */}
                  <img
                    id="main-logo"
                    className="d-inline-block align-top mr-1"
                    style={{
                      maxWidth: "200px",
                      height: "105px",
                      color: "blue",
                      marginRight: "100px",
                    }}
                    src={require("../../src/images/shards-dashboards-orignal.svg")}
                    alt="VLock"
                  />

                  {/* </Avatar> */}
                  <h4 style={{ marginLeft: "0px", color: "Black" }}>
                    Reset Password
                  </h4>
                  <a href="#!" className="green-text font-weight-bold"></a>
                </h3>
              </div>
              <FormItem
                style={{ color: "red" }}
                onChange={(e) => this.setState({ sapID: e.target.value })}
                label={
                  <Text style={{ fontWeight: "bold", color: "black" }}>
                    Sap ID
                  </Text>
                }
              >
                {getFieldDecorator("sapID", {
                  rules: [
                    {
                      // type: 'sapID',
                      message: "Please enter valid  Sap Id",
                    },
                    {
                      required: true,
                      message: "Please enter your Sap Id",
                    },
                    // {
                    //   validator: (rule, value, callback) =>
                    //     this.validateSapId(value, callback),
                    // },
                  ],
                  initialValue: this.state.sapID,
                })(<Input placeholder="sapID" />)}
              </FormItem>
              <br />{" "}
              <PhoneInput
                country={"us"}
                value={this.state.number}
                onChange={(number) => this.setState({ number })}
              />
              <br />
              <center>
                {" "}
                {/* <NavLink to={"components/Admin"}> */}
                <MDBBtn
                  onClick={() => this.Redirect()}
                  style={{ width: "180px" }}
                  color="primary"
                  rounded
                >
                  Reset
                </MDBBtn>{" "}
                {/* </NavLink> */}
              </center>
              <br />
              {/* 
                </div>
                
              </MDBRow> */}
              <p className="font-small green-text d-flex justify-content-end">
                <a
                  style={{ color: "black", textDecorationLine: "underline" }}
                  href="/ResetPassword"
                  className="green-text ml-1 font-weight-bold"
                >
                  Forgot Password?
                </a>
              </p>
            </div>

            {/* </form> */}
          </MDBCard>
        </MDBRow>
      </Form>,
    ];
  }
}
ResetPassword = Form.create()(ResetPassword);
export default ResetPassword;
