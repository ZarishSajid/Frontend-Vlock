import React, { useState } from "react";
import { Container, Row, Col } from "shards-react";
import { FormSelect } from "shards-react";
import { Colxx, Separator } from "../../src/common/CustomBootstrap";

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
import * as moment from "moment";
import TimePicker from "react-bootstrap-time-picker";
const FormItem = Form.Item;
const { Text } = Typography;
// var today = moment();
// var tomorrow = moment(today).add(1, "days");
// const date = new Date(tomorrow);
// var time = moment.utc(" 12:19:14").local().format(" HH:mm:ss");


const newDate = new Date();
const formatDate = moment(newDate).format('YYYY-MM-DDTHH:mm');
class CreatePoll extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      time: "00:00",
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
    this.handleDropdownChange = this.handleDropdownChange.bind(this);
    this.handleAudience = this.handleAudience.bind(this);



    // this.showModal = this.showModal.bind(this);
    // this.handleOk = this.handleOk.bind(this);
  }
  handleDropdownChange(e) {
    console.log("You Selected", e.target.value);

    this.setState({ pollType: e.target.value });
  }
  handleDescription = (e) => {
    this.setState({
      pollDescription: e.target.value,
    });
  };
  startDate= (e) => {
    console.log("start Date", e.target.value);
    this.setState({
      startDate: e.target.value,
    });
  };
  endDate = (e) => {
    console.log("End Date", e.target.value);
    this.setState({
      endDate:e.target.value,
    });
  };
  handleTimeChange(time) {
    console.log(time); // <- prints "3600" if "01:00" is picked
    this.setState({ time });
  }

  handleAudience(e) {
    console.log("You Selected", e.target.value);

    this.setState({ selectedAudience: e.target.value });
  }
 
  onRedirect = (e) => {
    console.log("clicked");
    const { getFieldValue } = this.props.form;
    const {
      pollType,
      selectedAudience,
      pollDescription,
      optionValue,
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
      pollType: pollType,
      selectedAudience: selectedAudience,
      pollDescription: pollDescription,
      startDate: startDate,
      endDate: endDate,
      pollQuestion: getFieldValue("pollQuestion"),
      pollOptions: options,
    };
    console.log("dataaaa", data);
    axios
      .post(`http://localhost:8080/vlock/poll`, data, headers)
      .then((res) => {
        console.log("RESPONSE = ", res);
        console.log(res.message);
        if (res.data.success) {
          this.props.history.push("/components/FacultyPanel");
          alert("Your Request has been sent  to the admin");
          this.setState({});
          console.log("data", res.data.message);
        } else {
          //  console.log("else")
          alert(res.data.message);
        }
        //res.sucess=();
      });
  };

  handleOnChange = (value) => {
    console.log("radio checked", value);

    this.setState({
      optionValue: value,
      // value: e.target.value,
    });
  };
  showModal = (e) => {
    e.preventDefault();
    this.setState({
      visible: true,
    });
  };

  handleCancel = () => {
    this.setState({
      visible: !this.state.visible,
    });
  };

  // handleSelectedDate = (type, value) => {
  //   if (type === "startDate") {
  //     this.setState({
  //       startDate: value,
  //     });
  //   } else {
  //     this.setState({
  //       endDate: value,
  //     });
  //   }
  // };
  // handleSelectedTime = (type, value) => {
  //   debugger;
  //   if (type === "startTime") {
  //     this.setState({
  //       startTime: value,
  //     });
  //   } else {
  //     this.setState({
  //       endTime: value,
  //     });
  //   }
  // };

  handleOk = () => {
    const { options, optionValue } = this.state;
    const { getFieldValue } = this.props.form;
    this.setState({
      optionAdded: true,
      visible: !this.state.visible,
      // optionValue: getFieldValue("pollingOption"),
    });
    console.log(getFieldValue("pollingOption"));

    getFieldValue("pollingOption") !== undefined &&
      getFieldValue("pollingOption") !== "" &&
      options.push(getFieldValue("pollingOption"));
    // this.props.form.resetFields(['pollingOption']);
  };
  allSelected = () => {
    this.setState({ selectedAudience: [] });
  };
 

  render() {
    const { getFieldDecorator } = this.props.form;
    console.log("field decarotrrrr", this.props.form);

    return (
      <Container>
        <Col lg="10" md="14">
          <Card
            sm
            className="mb-4"
            style={{
              height: "68rem",
              width: "50rem ",
              marginTop: "30px",
              marginLeft: "130px",
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
                <center>Create Poll</center>
              </h4>
            </CardHeader>
            <CardBody>
              <Form className="add-new-post">
                <Row>
                  <Col lg="10" md="12">
                    <Label style={{ color: "black", marginLeft: "0px" }}>
                      Poll Type
                    </Label>
                    {getFieldDecorator("pollType", {
                      rules: [
                        {
                          required: true,
                          message: "Please select Your pollType",
                        },
                      ],
                      initialValue: this.state.pollType,
                    })}
                    <FormSelect
                      style={{ height: "50px", width: "47rem" }}
                      onChange={this.handleDropdownChange}
                    >
                      <option
                        style={{ color: "black" }}
                        value="CR/GR Selection"
                      >
                        CR/GR 
                      </option>
                      <option
                        style={{ color: "black" }}
                        value="  Trip Location"
                      >
                        Trip 
                      </option>
                      <option
                        style={{ color: "black" }}
                        value="FC Evening"
                      >
                        FC Evening
                      </option>
                      <option
                        style={{ color: "black" }}
                        value=" Webinar / Seminar"
                      >
                        Webinar / Seminar
                      </option>
                      <option
                        style={{ color: "black" }}
                        value="University Events"
                      >
                        University Events
                      </option>
                      <option
                        style={{ color: "black" }}
                        value=" Discipline Issue"
                      >
                        Discipline Issue
                      </option>
                      <option
                        style={{ color: "black" }}
                        value="Cafeteria"
                      >
                        Cafeteria
                      </option>
                      <option
                        style={{ color: "black" }}
                        value="Cabinet Member"
                      >
                        Cabinet Member
                      </option>
                      <option
                        style={{ color: "black" }}
                        value=" Society"
                      >
                        Society
                      </option>
                      <option
                        style={{ color: "black" }}
                        value="Teacher Evaluation"
                      >
                         Teacher Evaluation
                      </option>
                      <option
                        style={{ color: "black" }}
                        value="Course Issue"
                      >
                        Course Issue
                      </option>
                      <option
                        style={{ color: "black" }}
                        value="Transportation Issue"
                      >
                        Transportation Issue
                      </option>
                      <option
                        style={{ color: "black" }}
                        value=" Student Evaluation"
                      >
                        Student Evaluation
                      </option>
                      <option
                        style={{ color: "black" }}
                        value="Lab Equipmentsr"
                      >
                        Lab Equipments
                      </option>
                      <option
                        style={{ color: "black" }}
                        value="Seminar Speaker"
                      >
                        Laibrary 
                      </option>
                      <option
                        style={{ color: "black" }}
                        value=" Finance "
                      >
                        Finance 
                      </option>
                      <option style={{ color: "black" }} value="Other">
                        Other
                      </option>
                      Student
                    </FormSelect>
                  </Col>
                </Row>
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
                      style={{ height: "50px", width: "47rem" }}
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
                <b style={{ color: "black" }}> Poll Question</b>
                <FormItem style={{ color: "red" }}>
                  {getFieldDecorator("pollQuestion", {
                    rules: [
                      {
                        required: true,
                        message: "*Required",
                      },
                    ],
                  })(
                    <Input
                      id="optionInput"
                      size="lg"
                      className="mb-3"
                      placeholder=""
                    />
                  )}
                </FormItem>
                {this.state.optionAdded && (
                  <Radio.Group
                    options={this.state.options}
                    //when you want to change the radio button here you will call a fucn
                    onChange={(e) => this.handleOnChange(e.target.value)}
                    value={this.state.optionValue}
                  ></Radio.Group>
                )}
                <Button type="primary" onClick={this.showModal}>
                  Add Options
                </Button>{" "}
                <br />
                <Modal
                  size="sm"
                  open={this.state.visible}
                  toggle={this.handleCancel}
                >
                  <ModalHeader></ModalHeader>
                  <ModalBody>
                    <FormItem>
                      {getFieldDecorator("pollingOption", {
                        rules: [
                          {
                            required: true,
                            message: "Please enter the polling option",
                          },
                        ],
                      })(<Input placeholder="Enter the polling option" />)}
                    </FormItem>
                    {/* <FormInput
                      size="lg"
                      className="mb-3"
                      onChange={this.handleValueChange}
                      placeholder=" Enter the polling option"
                    /> */}
                    <br />
                    <Button type="submit" onClick={this.handleOk}>
                      Add
                    </Button>

                    <Button
                      style={{ marginLeft: "20px" }}
                      type="secondary"
                      onClick={this.handleCancel}
                    >
                      Cancel
                    </Button>
                  </ModalBody>
                </Modal>
                <br />
                <br />
                <b style={{ color: "black" }}>Description</b>
                {getFieldDecorator(" Poll Description", {
                  rules: [
                    {
                      required: true,
                      message: "Please enter your  Poll Description",
                    },
                  ],
                  initialValue: this.state.pollDescription,
                })}
                <FormInput
                  style={{ color: "black" }}
                  type="Description"
                  onChange={this.handleDescription}
                  size="lg"
                  className="mb-3"
                  placeholder=""
                />
                {/* <b style={{ color: "black" }}>Start Date </b>
                <FormItem>
                  {getFieldDecorator("startDate", {
                    rules: [
                      {
                        required: true,
                        message: "Please select Your Date",
                      },
                    ],
                    // initialValue: this.state.startDate,
                  })(
                    <DayPickerInput
                      dayPickerProps={{ disabledDays: { before: new Date() } }}
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
                <FormItem>
                  {getFieldDecorator("endDate", {
                    rules: [
                      {
                        required: true,
                        message: "Please select Your Date",
                      },
                    ],
                    // initialValue: this.state.endDate,
                  })(
                    <DayPickerInput
                      dayPickerProps={{ disabledDays: { before: new Date() } }}
                      style={{ marginLeft: "20px", height: "30px" }}
                      selected={this.state.endDate}
                      onDayChange={(day) =>
                        this.handleSelectedDate("endDate", day)
                      }
                      // onDayChange={(day) => console.log(day)}
                    />
                  )} */}
                  {/* <br />
                  <br />
                </FormItem> */}
                <b style={{ color: "black", marginLeft: "0px" }}>
                  {" "}
                  Start Time{" "}
                </b>
                <FormItem style={{ color: "red" }}>
                  {getFieldDecorator("startDate",{
                    rules: [
                      {
                        required: true,
                        message: "*Required",
                      },
                    ],
                  })(
                    <Input
                    type="datetime-local" 
                    min= {formatDate}
                      style={{
                        marginLeft: "20px",
                        width: "210px",
                        border: "1px solid  black",
                      }}
                      onChange={this.startDate}
                    />
                  )}
                </FormItem>
                <br />
                <b style={{ color: "black", marginLeft: "0px" }}> End Date </b>
                <FormItem style={{ color: "red" }}>
                  {getFieldDecorator("endDate", {
                    rules: [
                      {
                        required: true,
                        message: "*Required",
                      },
                    ],
                  })(
                    <Input
                    type="datetime-local" 
                    min= {formatDate}
                      style={{
                        marginLeft: "20px",
                        width: "210px",
                        border: "1px solid black",
                      }}
                      onChange={this.endDate}
                    />
                  )}
                   <br/>
                </FormItem>
                
              </Form>

              <br />
              <br />
              <MDBBtn
                onClick={() => this.onRedirect()}
                style={{
                  width: "140px",
                  mrginTop: "10px",
                  marginLeft: "300px",
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
      </Container>
    );
  }
}

CreatePoll = Form.create()(CreatePoll);
export default CreatePoll;
