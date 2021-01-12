// new code

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
import { FormCheckbox } from "shards-react";
import Link from "@material-ui/core/Link";
import { Redirect, NavLink } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import { MDBFormInline } from "mdbreact";
import { Radio, Typography } from "antd";
import SweetAlert from "sweetalert-react";
import { Alert } from "reactstrap";

import { Label } from "reactstrap";
import { Container, Col } from "shards-react";

import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
//  import { createHashHistory } from "history";
import axios from "axios";
import { Input, Button } from "reactstrap";
import { Form } from "antd";
import IntlMessages from "../../src/helpers/IntlMessages";

import { history } from "react-dom";

const FormItem = Form.Item;
const { Text } = Typography;

class Register extends React.Component {
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
      radio: "",
      selectedType: null,
      showTextBox: false,
      value: "",
      formErrors: {},
      fireRedirect: false,
      redirectRoute: "",
    };
    // this.initialState = this.state;
  }
  myChangeHandler = (event) => {
    this.setState({ email: event.target.value });
  };
  // handleChange = (e) => {
  //   const { name, value } = e.target;
  //   this.setState({ [name]: value });
  // };

  updateState(e) {
    this.setState({ email: e.target.value });
    // this.setState({ sapID: e.target.value });
  }

  handleOnChange = (value) => {
    if (value === "faculty") {
      this.setState({ userType: "faculty" });
      console.log(value);
    } else if (value === "student") {
      this.setState({ userType: "student" });
      console.log(value);
    } else if (value === "uniAdmin") {
      this.setState({ userType: "uniAdmin" });
      console.log(value);
    } else {
      this.setState({ userType: "" });
    }
  };

  onClick = (nr) => () => {
    this.setState({
      radio: nr,
    });
  };

  validateSapId = (value, callback) => {
    if (!/^[0-9]*$/i.test(value)) {
      callback("Invalid SapId");
    }
    return callback();
  };

  onRedirect = (e) => {
    // e.preventDefault();

    // this.setState(this.initialState)

    console.log("clicked");

    this.props.form.validateFieldsAndScroll((error, formData) => {
      if (!error && formData) {
        axios
          .post(`http://localhost:8080/signup2`, {
            sapID: formData.sapID,
            password: formData.password,
            email: formData.email,
            name: formData.name,
            department: formData.department,
            designation: formData.designation,
            userType: this.state.userType,
            semester: formData.semester,
            degree: formData.degree,
          })
          .then((res) => {
            console.log("RESPONSE = ", res);
            console.log(res.message);
            if (res.data.success) {
              alert("Registerd");
              const userType = this.state.userType;

              console.log("data", res.data.message);
              this.setState({
                // redirectRoute: userType === 'faculty' ? "/components/FacultyPanel" : userType === 'student' ? "/components/StudentPanel" : userType === 'uniAdmin' ? "/components/UniversityAdministration":"/components/Admin" ,
                fireRedirect: true,
                fireRedirect: "/Login",
              });
            } else {
              //  console.log("else")
              alert(res.data.message);
            }
            //res.sucess=();
          });
      }
    });
  };
  onChange = (e) => {
    console.log("radio checked", e.target.value);
    this.setState({
      value: e.target.value,
    });
  };

  submitSapId = (e) => {
    this.setState({
      sapID: e.target.value,
    });
  };

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
        <div></div>
        <MDBRow
          style={{
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundImage:
              "url('https://techcrunch.com/wp-content/uploads/2017/10/gettyimages-844081956.jpg?w=730&crop=1')",
          }}
        >
          <MDBCard
            className="card-image"
            style={{
              marginTop: "20px",
              marginLeft: "280px",
              width: "15rem",
              height: "1200px",
              //#00008B
              backgroundColor: "#2980B9 ",
            }}

            // backgroundColor:"#ff8c00"
          >
            <h4
              style={{ marginTop: "50px", color: "white", marginLeft: "20px" }}
            >
              Lock Your Decision
            </h4>
            {/* <p style={{color:"white",marginLeft:"20px"}}>Register yourself here and be a part of Riphah biggest decision making platform.If you are already a member.</p> */}

            <p style={{ color: "white", marginLeft: "30px" }}>
              {" "}
              Please register Yourself.
            </p>

            <div className="text-white text-center d-flex align-items-center rgba-black-strong py-5 px-4">
              <div>
                <h5 className="pink-text"></h5>
                <MDBCardTitle tag="h3" className="pt-2"></MDBCardTitle>
              </div>
            </div>
          </MDBCard>

          <MDBCard
            className="card-image"
            style={{
              marginTop: "20px",
              textColor: "blue",
              textColor: "black",
              marginLeft: "0px",
              heighr: "400px",
              width: "32rem",
            }}
          >
            <div className="text-blue rgba-stylish-strong py-5 px-5 z-depth-4">
              <h3 className="blue-text mb-5 mt-4 font-weight-bold">
                <img
                  id="main-logo"
                  className="d-inline-block align-top mr-1"
                  style={{
                    maxWidth: "200px",
                    height: "105px",
                    color: "blue",
                    marginLeft: "150px",
                  }}
                  src={require("../../src/images/shards-dashboards-orignal.svg")}
                  alt="VLock"
                />
                {/* <Avatar style={{marginLeft:"200px",color:"white",backgroundColor:"#f58742"}}  >
             <LockOutlinedIcon />
         </Avatar> */}
                <h4 style={{ color: "black", marginLeft: "120px" }}>
                  Register Now{" "}
                </h4>
                <a href="#!" className="green-text font-weight-bold"></a>
              </h3>

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
                      message: "SapId is Required",
                    },
                    {
                      validator: (rule, value, callback) =>
                        this.validateSapId(value, callback),
                    },
                  ],
                  initialValue: this.state.sapID,
                })(<Input placeholder="Please enter your sap Id" />)}
              </FormItem>
              <br />
              <FormItem
                style={{ color: "red" }}
                label={
                  <Text style={{ fontWeight: "bold", color: "black" }}>
                    Full Name
                  </Text>
                }
              >
                {getFieldDecorator("name", {
                  rules: [
                    {
                      required: true,
                      message: "Full Name is Required",
                    },

                    // {
                    //   validator: (rule, value, callback) => {
                    //      if (!value.match(/^[a-zA-Z]+$/)) {
                    //       callback("Alphabets only");
                    //     }
                    //     return callback();
                    //   }
                    // }
                  ],
                  initialValue: this.state.name,
                })(<Input placeholder=" Please enter your full name" />)}
              </FormItem>
              <br />

              <FormItem
                style={{ color: "red" }}
                label={
                  <Text style={{ fontWeight: "bold", color: "black" }}>
                    Email
                  </Text>
                }
              >
                {getFieldDecorator("email", {
                  rules: [
                    {
                      type: "email",
                      message: "Please enter valid E-mail",
                    },
                    {
                      required: true,
                      message: "Email is Required",
                    },
                  ],
                  initialValue: this.state.email,
                })(
                  <Input placeholder=" Please enter your email" type="email" />
                )}
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
                      message: "",
                    },
                    {
                      required: true,
                      message: "Password is Required",
                    },
                    {
                      validator: (rule, value, callback) => {
                        if (
                          !value.match(
                            /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,1024}$/
                          )
                        ) {
                          callback(
                            " Your password must include 1 lowercase character, 1 uppercase character,1 number and 1 special character in (!@#*&/^)"
                          );
                        }
                        return callback();
                      },
                    },
                  ],
                  initialValue: this.state.password,
                })(
                  <Input
                    placeholder=" Please enter your password"
                    type="password"
                  />
                )}
              </FormItem>

              <br />
              <FormItem
                style={{ color: "red" }}
                label={
                  <Text style={{ fontWeight: "bold", color: "black" }}>
                    Department
                  </Text>
                }
              >
                {getFieldDecorator("department", {
                  rules: [
                    {
                      required: true,
                      message: "Department is Required",
                    },
                  ],
                  initialValue: this.state.department,
                })(
                  <Input
                    placeholder=" Please enter your department"
                    type="text"
                  />
                )}
              </FormItem>

              <br />
              <label style={{ fontWeight: "bold", color: "black" }}>
                User Type
              </label>

              <Radio.Group
                onChange={(e) => this.handleOnChange(e.target.value)}
                value={userType}
              >
                <Radio style={{ color: "black" }} value="student">
                  {" "}
                  Student
                </Radio>
                <br />

                <Radio style={{ color: "black" }} value="faculty">
                  {" "}
                  Faculty
                </Radio>

                <br />
                <Radio style={{ color: "black" }} value="uniAdmin">
                  {" "}
                  University Administration
                </Radio>
              </Radio.Group>
              <br />
              {userType !== "" && userType === "student" && (
                <>
                  <FormItem
                    style={{ color: "red" }}
                    label={
                      <Text style={{ fontWeight: "bold", color: "black" }}>
                        Semester
                      </Text>
                    }
                  >
                    {getFieldDecorator("semester", {
                      rules: [
                        {
                          required: true,
                          message: "Semester is Required",
                        },
                      ],
                      initialValue: this.state.semester,
                    })(<Input placeholder=" Please enter your semester" />)}
                  </FormItem>

                  <br />
                  <FormItem
                    style={{ color: "red" }}
                    label={
                      <Text style={{ fontWeight: "bold", color: "black" }}>
                        Degree
                      </Text>
                    }
                  >
                    {getFieldDecorator("degree", {
                      rules: [
                        {
                          required: true,
                          message: "Degree is Required",
                        },
                      ],
                      initialValue: this.state.degree,
                    })(<Input placeholder=" Please enter your degree" />)}
                  </FormItem>
                </>
              )}

              {userType !== "" && userType === "faculty" && (
                <>
                  <br />
                  <br />
                  <FormItem
                    style={{ color: "red" }}
                    label={
                      <Text style={{ fontWeight: "bold", color: "black" }}>
                        Designation
                      </Text>
                    }
                  >
                    {getFieldDecorator("designation", {
                      rules: [
                        {
                          required: true,
                          message: "Designation is Required",
                        },
                      ],
                      initialValue: this.state.designation,
                    })(
                      <Input
                        placeholder=" Please enter your designation"
                        type="text"
                      />
                    )}
                  </FormItem>
                </>
              )}
              {userType !== "" && userType === "uniAdmin" && (
                <>
                  <br />
                  <b>{/* <IntlMessages id="Designation" /> */}</b>

                  <FormItem
                    style={{ color: "red" }}
                    label={
                      <Text style={{ fontWeight: "bold", color: "black" }}>
                        Designation
                      </Text>
                    }
                  >
                    {getFieldDecorator("designation", {
                      rules: [
                        {
                          required: true,
                          message: "Designation is Required",
                        },
                      ],
                      initialValue: this.state.designation,
                    })(
                      <Input
                        placeholder=" Please enter your designation"
                        type="text"
                      />
                    )}
                 
                  </FormItem>
                </>
              )}
                  <FormCheckbox style={{color:"black"}}>
                      {/* eslint-disable-next-line */ }I agree with your{" "}
                      <a href="#">Privacy Policy</a>.
                    </FormCheckbox>
              <MDBRow className="d-flex align-items-center mb-4">
                <center>
                  {" "}
                  {/* <NavLink to={`/components/Admin`}> */}
                  <p style={{ color: "white", marginLeft: "30px" }}>
                    {" "}
                    Please register Yourself.
                  </p>
                   
                  <MDBBtn
                    style={{ width: "180px", marginLeft: "100px" }}
                    onClick={() => this.onRedirect()}
                    color="primary"
                    rounded
                  >
                    Register
                  </MDBBtn>
                  {/* </NavLink>{" "} */}
                </center>
              </MDBRow>

              <p
                className="font-small green-text d-flex justify-content-end"
                style={{ color: "black" }}
              >
                Have an account?
                <a
                  style={{ color: "black", textDecorationLine: "underline" }}
                  href="/Login"
                  className="green-text ml-1 font-weight-bold"
                >
                  Login Here
                </a>
              </p>
            </div>
          </MDBCard>
        </MDBRow>
      </Form>,
    ];
  }
}

Register = Form.create()(Register);
export default Register;
