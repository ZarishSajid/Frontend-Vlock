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
  handleDepartment=(e)=>{
    this.setState({
    department: e.target.value,
    });
  }; 
  handlepassword=(e)=>{
    this.setState({
      passward: e.target.value,
      });
  }
  handleAudience(e) {
    console.log("You Selected", e.target.value);

    this.setState({ selectedAudience: e.target.value });
  }

  onRedirect = (e) => {
    this.props.form.validateFieldsAndScroll((error, formData) => {
      if (!error && formData) {
    const userData =
      this.props.location.aboutProps && this.props.location.aboutProps.userData;

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
   } )};
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
              height: "43rem",
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
             <h4 style={{color:"black",fontWeight:"bold"}} > <center>Edit User</center></h4>
            </CardHeader>
            <CardBody>
              <Form className="add-new-post">
                <FormItem   style={{ color: "red" }}>
                  <b style={{ color: "black" }}>Name</b>
                  {getFieldDecorator(" name", {
                    rules: [
                      {
                        required: true,
                        message: "Please enter your Name",
                      },
                    ],
                    initialValue:
                      userData && userData._id
                        ? userData.name
                        : this.state.name,
                  })(
                    <FormInput
                      type="name"
                      onChange={this.handleName}
                      size="lg"
                      className="mb-3"
                      placeholder=""
                    />
                  )}
                </FormItem >
                <b style={{ color: "black" }}>Email </b>
                <br />
                <br />
                <FormItem   style={{ color: "red" }}> 
                  {getFieldDecorator("email", {
                    rules: [
                      {
                        required: true,
                        message: "Please enter your email",
                      },
                    ],
                    initialValue:
                      userData && userData._id
                        ? userData.email
                        : this.state.email,
                  })(
                    <FormInput
                      type="name"
                      onChange={this.handleEmail}
                      size="lg"
                      className="mb-3"
                      placeholder=""
                    />
                  )}
                </FormItem>
                <br />
                <FormItem   style={{ color: "red" }}>
                  <b style={{ color: "black" }}>Department</b>
                  {getFieldDecorator("department", {
                    rules: [
                      {
                        required: true,
                        message: "Please enter your Department",
                      },
                    ],
                    initialValue:
                      userData && userData._id
                        ? userData.department
                        : this.state.department,
                  })(
                    <FormInput
                      type="name"
                      onChange={this.handleDepartment}
                      size="lg"
                      className="mb-3"
                      placeholder=""
                    />
                  )}
                </FormItem>
                <br />
                <FormItem   style={{ color: "red" }}>
                  <b style={{ color: "black" }}>Password</b>
                  {getFieldDecorator("password", {
                    rules: [
                      {
                        required: true,
                        message: "Please enter your password",
                      },
                    ],
                    initialValue:
                      userData && userData._id
                        ? userData.password
                        : this.state.password,
                  })(
                    <FormInput
                      type={hide ? "password" : "input"}
                      onChange={this.handlepassword}
                      size="lg"
                      className="mb-3"
                      placeholder=""
                    />
                  )}
                </FormItem>
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
              <Button
                style={{ marginLeft: "30px" }}
                type="secondary"
              >
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
