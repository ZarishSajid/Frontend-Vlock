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
      pollDescription: "",
      audienceAdded: false,
      optionAdded: false,
      startDate: "",
      endDate: "",
      visible: false,
      optionValue: "",
      options: [],
      value: "",
      // selectedAudience:["student","faculty","uniAdmin"],
      pollQuestion: "",
      pollOptions: "",
    };
    this.handleAudience = this.handleAudience.bind(this);

    // this.showModal = this.showModal.bind(this);
    // this.handleOk = this.handleOk.bind(this);
  }

  handleDescription = (e) => {
    this.setState({
      pollDescription: e.target.value,
    });
  };
  handleAudience(e) {
    console.log("You Selected", e.target.value);

    this.setState({ selectedAudience: e.target.value });
  }

  onRedirect = (e) => {
    const userData =
      this.props.location.aboutProps && this.props.location.aboutProps.userData;

    console.log("clicked");
    const { getFieldValue } = this.props.form;
    const {
      selectedAudience,
      pollDescription,
      startDate,
      endDate,
      options,
    } = this.state;
    const headers = {
      headers: {
        token: localStorage.getItem("token"),
      },
    };
    const data = {
      selectedAudience: selectedAudience,
      pollDescription: pollDescription,
      startDate: startDate,
      endDate: endDate,
    };

    console.log("dataaaa", data);
    axios
      .put(`http://localhost:8080/vlock/polls/${userData._id}`, data, headers)
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
  };

  handleSelectedDate = (type, value) => {
    if (type === "startDate") {
      this.setState({
        startDate: value,
      });
    } else {
      this.setState({
        endDate: value,
      });
    }
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const userData =
      this.props.location.aboutProps && this.props.location.aboutProps.userData;

    return (
      <Container fluid className="main-content-container px-4 pb-4">
        {/* Page Header */}

        <Row noGutters className="page-header py-4">
          <PageTitle
            sm="4"
            title="Edit Poll"
            subtitle=""
            className="text-sm-left"
            style={{ marginLeft: "380px" }}
          />
        </Row>
        <Col lg="10" md="12">
          <Card small style={{ width: "60rem", height: "43rem" }}>
            <CardBody>
              <Form className="add-new-post">
                <br />
                <Row>
                  <Col lg="10" md="12">
                    <Label style={{ color: "black", marginLeft: "0px" }}>
                      Select Audience
                    </Label>
                    {getFieldDecorator("selectedAudience", {
                      rules: [
                        {
                          required: true,
                          message: "Please select Your Audience",
                        },
                      ],
                      initialValue: this.state.selectedAudience,
                    })}
                    <FormSelect
                      style={{ height: "50px", width: "58rem" }}
                      onChange={this.handleAudience}
                    >
                      <option style={{ color: "black" }} value="Student">
                        Student
                      </option>
                      <option style={{ color: "black" }} value="  Faculty">
                        Faculty
                      </option>
                      <option style={{ color: "black" }} value="Uni Admin">
                        University Administration
                      </option>
                      <option
                        style={{ color: "black" }}
                        value="All"
                        onClick={this.allSelected}
                      >
                        All
                      </option>
                    </FormSelect>
                  </Col>
                </Row>
                <br />

                <br />
                <FormItem>
                  <b style={{ color: "black" }}>Description</b>
                  {getFieldDecorator(" Poll Description", {
                    rules: [
                      {
                        required: true,
                        message: "Please enter your  Poll Description",
                      },
                    ],
                    initialValue:
                      userData && userData._id
                        ? userData.pollDescription
                        : this.state.pollDescription,
                  })(
                    <FormInput
                      type="Description"
                      onChange={this.handleDescription}
                      size="lg"
                      className="mb-3"
                      placeholder=""
                    />
                  )}
                </FormItem>
                <b style={{ color: "black" }}>Start Date </b>
                <br />
                <br />
                <FormItem>
                  {getFieldDecorator("startDate", {
                    rules: [
                      {
                        required: true,
                        message: "Please select Your Date",
                      },
                    ],
                    initialValue:
                      userData && userData._id
                        ? moment(userData.startDate).format("MM-DD-YYYY")
                        : this.state.startDate,
                  })(
                    <DayPickerInput
                      selected={this.state.startDate}
                      style={{ marginLeft: "20px" }}
                      onDayChange={(day) =>
                        this.handleSelectedDate("startDate", day)
                      }
                      // onDayChange={(day) => console.log(day)}
                    />
                  )}
                </FormItem>
                <br />

                <b style={{ color: "black", marginLeft: "0px" }}> End Date </b>
                <br />
                <br />
                <FormItem>
                  {getFieldDecorator("endDate", {
                    rules: [
                      {
                        required: true,
                        message: "Please select Your Date",
                      },
                    ],
                    initialValue:
                      userData && userData._id
                        ? moment(userData.endDate).format("MM-DD-YYYY")
                        : this.state.endDate,
                  })(
                    <DayPickerInput
                      style={{ marginLeft: "20px" }}
                      selected={this.state.endDate}
                      onDayChange={(day) =>
                        this.handleSelectedDate("endDate", day)
                      }
                      // onDayChange={(day) => console.log(day)}
                    />
                  )}
                </FormItem>
              </Form>

              <br />
              <br />
              <MDBBtn
                onClick={() => this.onRedirect()}
                style={{
                  width: "140px",
                  mrginTop: "10px",
                  marginLeft: "370px",
                }}
                onClick={() => this.onRedirect()}
                color="primary"
                rounded
              >
                Submit
              </MDBBtn>
            </CardBody>
          </Card>
        </Col>

        {/* <Col lg="9" md="12">
        <Editor />
      </Col> */}
      </Container>
    );
  }
}

CreatePoll = Form.create()(CreatePoll);
export default CreatePoll;
