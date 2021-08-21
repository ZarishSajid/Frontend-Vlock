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
      cnic: "",
      value: "",
      formErrors: {},
      fireRedirect: false,
      redirectRoute: "",
    };
  }
  onRedirect = (e) => {
    console.log("clicked signup button");

    this.props.form.validateFieldsAndScroll((error, formData) => {
      console.log("inside before if condition field validator");
      if (!error && formData) {
        console.log("inside field after if validator");

        axios
          .post(`http://localhost:8080/vlock/cnicverification`, {
            cnic: formData.cnic,
          })
          .then((res) => {
            // console.log("RESPONSE = ", res.data.data.cnic);

            if (res.data.success) {
              localStorage.setItem("cnic", res.data.data.cnic);
              localStorage.setItem("fullname",res.data.data.fullname);
              localStorage.setItem("fathername", res.data.data.fathername);
              localStorage.setItem("gender", res.data.data.gender);
              localStorage.setItem("country", res.data.data.country);
              localStorage.setItem("city", res.data.data.city);
              localStorage.setItem("district", res.data.data.district);
              localStorage.setItem("address", res.data.data.address);
              localStorage.setItem("dob", res.data.data.dob);
              localStorage.setItem("birthmark",res.data.data.birthmark)
              localStorage.setItem("constituencyNo", res.data.value.constituencyNo);
              localStorage.setItem("constituencyArea",res.data.value.constituencyArea);

              this.props.history.push("/components/RegisteredVoterInfo");
            } else {
                console.log("errror")
              alert(res.data.message);
            }
            //res.sucess=();
          });
      }
    });
  };
  myChangeHandler = (event) => {
    this.setState({ email: event.target.value });
  };

  updateState(e) {
    this.setState({ email: e.target.value });
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

  onChange = (e) => {
    console.log("radio checked", e.target.value);
    this.setState({
      value: e.target.value,
    });
  };

  submitCnic = (e) => {
    this.setState({
      cnic: e.target.value,
    });
  };

  render() {
    const userData =
      this.props.location &&
      this.props.location.aboutProps &&
      this.props.location.aboutProps.userData;
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
        <MDBRow>
          <MDBCard
            className="card-image card cardalign w-50 "
            style={{
              marginTop: "40px",
              textColor: "blue",
              textColor: "black",
              marginLeft: "0px",
              height: "80%",
              width: "50%",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            <div className="text-blue rgba-stylish-strong py-5 px-5 z-depth-4">
              <h3 className="blue-text mb-5 mt-4 font-weight-bold">
                <h4
                  style={{
                    color: "black",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  Voter Registration
                </h4>
                <a href="#!" className="green-text font-weight-bold"></a>
              </h3>

              <FormItem
                style={{ color: "red" }}
                label={
                  <Text style={{ fontWeight: "bold", color: "black" }}>
                    CNIC Number
                  </Text>
                }
              >
                {getFieldDecorator("cnic", {
                  rules: [
                    {
                      // type: 'sapID',
                      message: "Please enter valid  Sap Id",
                    },
                    {
                      required: true,
                      message: "cnic is Required",
                    },
                    // {
                    //   validator: (rule, value, callback) =>
                    //     this.validateCnic(value, callback),
                    // },
                  ],
                  initialValue: this.state.cnic,
                })(
                  <Input maxLength="14" placeholder="Please enter your CNIC" />
                )}
              </FormItem>
              <br />

              <MDBRow className="d-flex align-items-center mb-4">
                <center>
                  {" "}
                  {/* <NavLink to={`/components/Admin`}> */}
                  <MDBBtn
                    className="d-flex justify-content-center "
                    onClick={() => this.onRedirect()}
                    color="primary"
                    rounded
                  >
                    Submit
                  </MDBBtn>
                  {/* </NavLink>{" "} */}
                </center>
              </MDBRow>
            </div>
          </MDBCard>
        </MDBRow>
      </Form>,
    ];
  }
}

Register = Form.create()(Register);
export default Register;
