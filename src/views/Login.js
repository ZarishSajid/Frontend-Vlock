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

import Link from "@material-ui/core/Link";
import { Redirect, NavLink } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { createHashHistory } from "history";
import { Input } from "reactstrap";
import { history } from "react-dom";
import axios from "axios";
const FormItem = Form.Item;
const { Text } = Typography;
let count = 0;
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.onRedirect = this.onRedirect.bind(this);

    this.state = {
      sapID: "",
      password: "",
      email: "",
      name: "",
      department: "",
      designation: "",
      userType: "",
      semester: "",
      degree: "",
      value: "",
      token: "",
      userId: "",
      privateKey: "",
      publicKey: "",
      accountId: "",
      fireRedirect: false,
      redirectRoute: "",
      data: {},
      count: 0,
    };
  }
  // myChangeHandler = (event) => {
  //   this.setState({password: event.target.value});
  // }
  // updateState(e) {
  //   this.setState({ password: e.target.value });
  //   // this.setState({ sapID: e.target.value });

  // }

  // countInc(){
  //   this.setState({ count: count+1});
  // };

  onRedirect = (e) => {
    this.props.form.validateFieldsAndScroll((error, formData) => {
      if (!error && formData) {
        if (Number(localStorage.getItem("count")) < 3) {
          axios
            .post("http://localhost:8080/vlock/login", {
              sapID: formData.sapID,
              password: formData.password,
            })
            .then((res) => {
              console.log("RESPONSE = ", res);
              // this.state.token=res.data.data.token;
              this.setState({ data: res.data.data });
              console.log(res.message);
              if (res.data.success) {
                alert("Login Sucessfully");
                console.log(this.state.data.token);

                localStorage.setItem("token", this.state.data.token);
                localStorage.setItem("userType", this.state.data.userType);
                localStorage.setItem("id", this.state.data.id);
                localStorage.setItem("sapID", this.state.data.sapID);
                localStorage.setItem("email", this.state.data.email);
                localStorage.setItem("password", this.state.data.password);

                const userType = localStorage.getItem("userType");
                // localStorage.setItem('sapID', this.state.sapID);
                // localStorage.getItem('sapID');

                console.log("data", res.data.message);

                this.setState({
                  redirectRoute:
                    userType === "admin"
                      ? "/components/Admin"
                      : userType === "student"
                      ? "/components/StudentPanel"
                      : userType === "uniAdmin"
                      ? "/components/UniversityAdministration"
                      : "/components/FacultyPanel",

                  fireRedirect: true,
                });
                window.location.reload(false);
              } else {
                console.log("else", count + 1);
                count = count + 1;
                localStorage.setItem("count", count);
                alert(res.data.message);
              }

              //res.sucess=();
            });
        } else {
          setTimeout(() => {
            localStorage.setItem("count", 0);
          }, 3000);
          alert("try 3 and above time");
        }
      }
    });
  };
  validateSapId = (value, callback) => {
    if (!/^[0-9]*$/i.test(value)) {
      callback("Invalid SapId");
    }
    return callback();
  };

  // submitSapId = (e) => {
  //   this.setState({
  //     sapID: e.target.value,
  //   });
  // };
  // submitpassword = (e) => {
  //   this.setState({
  //     password: e.target.value,
  //   });
  // };
  render() {
    const { userType, fireRedirect, redirectRoute } = this.state;
    const { getFieldDecorator } = this.props.form;

    return [
      <Fragment key={1}>
        {fireRedirect && [
          <div key={1}>{this.setState({ fireRedirect: false })}</div>,
          <Redirect key={2} to={redirectRoute} />,
        ]}
      </Fragment>,
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
                  <h4 style={{ marginLeft: "0px", color: "Black" }}>Login</h4>
                  <a href="#!" className="green-text font-weight-bold"></a>
                </h3>
              </div>
              <FormItem
                style={{ color: "red" }}
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
                })(<Input placeholder="SapID" />)}
              </FormItem>
              <br />
              <FormItem
                style={{ color: "red" }}
                label={
                  <Text style={{ fontWeight: "bold", color: "black" }}>
                    Password
                  </Text>
                }
              >
                {getFieldDecorator("password", {
                  rules: [
                    {
                      required: true,
                      message: "Please enter  your password",
                    },
                    // {
                    //   validator: (rule, value, callback) => {
                    //      if (!value.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,1024}$/)) {
                    //       callback(" Your password must include 1 lowercase character, 1 uppercase character,1 number and 1 special character in (!@#*&/^)");
                    //     }
                    //     return callback();
                    //   }
                    // }
                  ],
                  initialValue: this.state.password,
                })(<Input placeholder="password" type="password" />)}
              </FormItem>
              <br />

              <center>
                {" "}
                {/* <NavLink to={"components/Admin"}> */}
                <MDBBtn
                  onClick={() => this.onRedirect()}
                  style={{ width: "180px" }}
                  color="primary"
                  rounded
                >
                  Login
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
Login = Form.create()(Login);
export default Login;
