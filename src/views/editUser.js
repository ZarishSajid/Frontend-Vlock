import React from "react";
import { Container, Row, Col } from "shards-react";
import { FormSelect } from "shards-react";
import { Colxx, Separator } from "../../src/common/CustomBootstrap";
import * as moment from "moment";
import PageTitle from "../components/common/PageTitle";
import Editor from "../components/add-new-post/Editor";
import SidebarActions from "../components/add-new-post/SidebarActions";
import SidebarCategories from "../components/add-new-post/SidebarCategories";
import { Radio, Form, Typography } from "antd";
import { Input } from "reactstrap";
import Link from "@material-ui/core/Link";
import { NavLink } from "react-router-dom";

import {
  MDBCard,
  MDBCardTitle,
  MDBBtn,
  MDBRow,
  MDBCol,
  MDBIcon,
  MDBInput,
} from "mdbreact";
import { Label } from "reactstrap";
import DayPickerInput from "react-day-picker/DayPickerInput";
import "react-day-picker/lib/style.css";
import { CardBody, FormInput } from "shards-react";
import axios from "axios";

import {
  Card,
  Button,
  CardHeader,
  ListGroup,
  ListGroupItem,
  FormGroup,
  FormTextarea,
  Modal,
  ModalBody,
  ModalHeader,
} from "shards-react";
import { unmountComponentAtNode } from "react-dom";
import { formatCountdown } from "antd/lib/statistic/utils";
import { useParams } from "react-router-dom";

const FormItem = Form.Item;
const { Text } = Typography;

class CreatePoll extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectValue: "",
      address: "",
      district: "",
      city: "",
      name: "",
      password: "",
      department: "",
      email: "",
      pollDescription: "",
      audienceAdded: false,
      optionAdded: false,
      startDate: "",
      endDate: "",
      visible: false,
      optionValue: "",
      options: [],
      value: "",
      hide: true,

      // selectedAudience:["student","faculty","uniAdmin"],
      pollQuestion: "",
      pollOptions: "",
    };
    this.handleAudience = this.handleAudience.bind(this);

    // this.showModal = this.showModal.bind(this);
    // this.handleOk = this.handleOk.bind(this);
  }
  handleAddress = (e) => {
    this.setState({
      pollDescription: e.target.value,
    });
  };

  handleName = (e) => {
    this.setState({
      name: e.target.value,
    });
  };
  handleEmail = (e) => {
    this.setState({
      email: e.target.value,
    });
  };
  handleDepartment = (e) => {
    this.setState({
      department: e.target.value,
    });
  };
  handlepassword = (e) => {
    this.setState({
      passward: e.target.value,
    });
  };
  handleAudience(e) {
    console.log("You Selected", e.target.value);

    this.setState({ selectedAudience: e.target.value });
  }

  onRedirect = (e) => {
    this.props.form.validateFieldsAndScroll((error, formData) => {
      if (!error && formData) {
        const userData =
          this.props.location.aboutProps &&
          this.props.location.aboutProps.userData;

        console.log("clicked");
        const { getFieldValue } = this.props.form;
        const { name, password, email, department } = this.state;
        const headers = {
          headers: {
            token: localStorage.getItem("token"),
          },
        };
        const data = {
          name: name,
          password: password,
          email: email,
          department: department,
        };

        console.log("dataaaa", data);
        axios
          .put(`http://localhost:8080/vlock/update`, data, headers)
          .then((res) => {
            console.log("RESPONSE = ", res);
            console.log(res.message);
            if (res.data.success) {
              alert("Sucessfully Updated");

              console.log("data", res.data.message);
            } else {
              //  console.log("else")
              alert(res.data.message);
            }
            //res.sucess=();
          });
      }
    });
  };
  hideSwitch = (ev) => {
    this.setState({ hide: !this.state.hide });
  };
  render() {
    const { hide } = this.state;
    const { getFieldDecorator } = this.props.form;
    const userData =
      this.props.location.aboutProps && this.props.location.aboutProps.userData;

    return (
      <Container fluid className="main-content-container px-4 pb-4">
        {/* Page Header */}

        <Card
          sm
          className="mb-4"
          style={{
            height: "50%",
            width: "50rem ",
            marginTop: "30px",
            marginLeft: "145px",
          }}
        >
          <CardHeader
            style={{
              border: "1px solid white",
              borderRadius: "10px",
              padding: "25px",
              marginLeft: "30px",
              marginRight: "30px",
              backgroundColor: "#569CE5",
            }}
          >
            <h4 style={{ color: "black", fontWeight: "bold" }}>
              {" "}
              <center>Edit User</center>
            </h4>
          </CardHeader>
          <CardBody>
            <Form className="add-new-post">
              <Row>
                <Col md="6" className="form-group">
                  <label
                    style={{
                      color: "black",
                      marginLeft: "30px",
                      fontWeight: "bold",
                    }}
                    htmlFor=""
                  >
                    Full Name
                  </label>
                  <p
                    style={{
                      border: "1px solid black",
                      borderRadius: "10px",
                      padding: "20px",
                      marginLeft: "30px",
                      marginRight: "30px",
                    }}
                  >
                    {userData && userData._id
                      ? userData.fullname
                      : this.state.fullname}
                  </p>{" "}
                </Col>
                <Col md="6" className="form-group">
                  <label
                    style={{
                      color: "black",
                      marginLeft: "30px",
                      fontWeight: "bold",
                    }}
                    htmlFor=""
                  >
                    Father Name
                  </label>
                  <p
                    style={{
                      border: "1px solid black",
                      borderRadius: "10px",
                      padding: "20px",
                      marginLeft: "30px",
                      marginRight: "30px",
                    }}
                  >
                    {userData && userData._id
                      ? userData.fathername
                      : this.state.fathername}
                  </p>{" "}
                </Col>{" "}
              </Row>
              <Row>
                <Col md="6" className="form-group">
                  <label
                    style={{
                      color: "black",
                      marginLeft: "30px",
                      fontWeight: "bold",
                    }}
                    htmlFor=""
                  >
                    Gender
                  </label>
                  <p
                    style={{
                      border: "1px solid black",
                      borderRadius: "10px",
                      padding: "20px",
                      marginLeft: "30px",
                      marginRight: "30px",
                    }}
                  >
                    {userData && userData._id
                      ? userData.gender
                      : this.state.gender}
                  </p>{" "}
                </Col>
                <Col md="6" className="form-group">
                  <label
                    style={{
                      color: "black",
                      marginLeft: "30px",
                      fontWeight: "bold",
                    }}
                    htmlFor=""
                  >
                    Country
                  </label>
                  <p
                    style={{
                      border: "1px solid black",
                      borderRadius: "10px",
                      padding: "20px",
                      marginLeft: "30px",
                      marginRight: "30px",
                    }}
                  >
                   Pakistan
                  </p>{" "}
                </Col>{" "}
              </Row>
              <Row>
                <Col md="6" className="form-group">
                  <label
                    style={{
                      color: "black",
                      marginLeft: "30px",
                      fontWeight: "bold",
                    }}
                    htmlFor=""
                  >
                    City
                  </label>
                  <p
                    style={{
                      border: "1px solid black",
                      borderRadius: "10px",
                      padding: "20px",
                      marginLeft: "30px",
                      marginRight: "30px",
                    }}
                  >
                    {userData && userData._id ? userData.city : this.state.city}
                  </p>{" "}
                </Col>
                <Col md="6" className="form-group">
                  <label
                    style={{
                      color: "black",
                      marginLeft: "30px",
                      fontWeight: "bold",
                    }}
                    htmlFor=""
                  >
                    District
                  </label>
                  <p
                    style={{
                      border: "1px solid black",
                      borderRadius: "10px",
                      padding: "20px",
                      marginLeft: "30px",
                      marginRight: "30px",
                    }}
                  >
                    {userData && userData._id
                      ? userData.district
                      : this.state.district}
                  </p>{" "}
                </Col>{" "}
              </Row>
              <Row>
                <Col md="6" className="form-group">
                  <label
                    style={{
                      color: "black",
                      marginLeft: "30px",
                      fontWeight: "bold",
                    }}
                    htmlFor=""
                  >
                    Constituency Area
                  </label>
                  <p
                    style={{
                      border: "1px solid black",
                      borderRadius: "10px",
                      padding: "20px",
                      marginLeft: "30px",
                      marginRight: "30px",
                    }}
                  >
                    {userData && userData._id
                      ? userData.constituencyArea
                      : this.state.constituencyArea}
                  </p>
                </Col>
                <Col md="6" className="form-group">
                  <label
                    style={{
                      color: "black",
                      marginLeft: "30px",
                      fontWeight: "bold",
                    }}
                    htmlFor=""
                  >
                    Birth Mark
                  </label>
                  <p
                    style={{
                      border: "1px solid black",
                      borderRadius: "10px",
                      padding: "20px",
                      marginLeft: "30px",
                      marginRight: "30px",
                    }}
                  >
                    {userData && userData._id
                      ? userData.birthmark
                      : this.state.birthmark}
                  </p>{" "}
                </Col>{" "}
              </Row>
              <Row>
                <Col md="6" className="form-group">
                  <label
                    style={{
                      color: "black",
                      marginLeft: "30px",
                      fontWeight: "bold",
                    }}
                    htmlFor=""
                  >
                    DOB
                  </label>
                  <p
                    style={{
                      border: "1px solid black",
                      borderRadius: "10px",
                      padding: "20px",
                      marginLeft: "30px",
                      marginRight: "30px",
                    }}
                  >
                    {userData && userData._id
                      ? userData.dob
                      : this.state.dob}{" "}
                  </p>{" "}
                </Col>
                <Col md="6" className="form-group">
                  <label
                    style={{
                      color: "black",
                      marginLeft: "30px",
                      fontWeight: "bold",
                    }}
                    htmlFor=""
                  >
                    Constituency Number
                  </label>
                  <p
                    style={{
                      border: "1px solid black",
                      borderRadius: "10px",
                      padding: "20px",
                      marginLeft: "30px",
                      marginRight: "30px",
                    }}
                  >
                    {userData && userData._id
                          ? userData.constituencyNo
                          : this.state.constituencyNo}
                  </p>{" "}
                </Col>{" "}
              </Row>
              <br />
              <b style={{ color: "black" }}> Address</b>
              {getFieldDecorator(" pollDescription", {
                rules: [
                  {
                    required: true,
                    message: "Please enter your  Address",
                  },
                ],
                initialValue: this.state.address,
              })}
              <FormInput
                style={{ color: "black" }}
                type="Description"
                onChange={this.handleAddress}
                size="lg"
                className="mb-3"
                placeholder={localStorage.getItem("address")}
              />{" "}
              <b style={{ color: "black" }}> District</b>
              {getFieldDecorator("district", {
                rules: [
                  {
                    required: true,
                    message: "Please enter your  district",
                  },
                ],
                initialValue: this.state.address,
              })}
              <FormInput
                style={{ color: "black" }}
                type="district"
                onChange={this.handleAddress}
                size="lg"
                className="mb-3"
                placeholder={localStorage.getItem("district")}
              />
              <b style={{ color: "black" }}> City</b>
              {getFieldDecorator(" city", {
                rules: [
                  {
                    required: true,
                    message: "Please enter your  City",
                  },
                ],
                initialValue: this.state.address,
              })}
              <FormInput
                style={{ color: "black" }}
                type="text"
                onChange={this.handleAddress}
                size="lg"
                className="mb-3"
                placeholder={localStorage.getItem("city")}
              />
            </Form>

            <br />
            <Button
              style={{ marginLeft: "280px" }}
              onClick={() => this.onRedirect()}
              color="primary"
              rounded
            >
              Update
            </Button>
            <NavLink
              to={{
                pathname: "/components/UserStatus",
              }}
            >
              <Button style={{ marginLeft: "30px" }} type="secondary">
                Cancel
              </Button>
            </NavLink>
          </CardBody>
        </Card>

        {/* <Col lg="9" md="12">
        <Editor />
      </Col> */}
      </Container>
    );
  }
}

CreatePoll = Form.create()(CreatePoll);
export default CreatePoll;
