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
const formatDate = moment(newDate).format("YYYY-MM-DDTHH:mm");
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
      file: null,
      visible: false,
      optionValue: "",
      fileValue:"",
      options: [],
      value: "",
      // selectedAudience:["student","faculty","uniAdmin"],
      pollQuestion: "",
      pollOptions: "",
    };
    this.handleDropdownChange = this.handleDropdownChange.bind(this);
    this.handleAudience = this.handleAudience.bind(this);
    this.onChange = this.onChange.bind(this);
    this.resetFile = this.resetFile.bind(this);

    // this.showModal = this.showModal.bind(this);
    // this.handleOk = this.handleOk.bind(this);
  }
  handleDropdownChange(e) {
    console.log("You Selected", e.target.value);

    this.setState({ electionType: e.target.value });
  }
  handleDescription = (e) => {
    this.setState({
      pollDescription: e.target.value,
    });
  };
  startDate = (e) => {
    console.log("start Date", e.target.value);
    this.setState({
      startDate: e.target.value,
    });
  };
  endDate = (e) => {
    console.log("End Date", e.target.value);
    this.setState({
      endDate: e.target.value,
    });
  };
  handleTimeChange(time) {
    console.log(time); // <- prints "3600" if "01:00" is picked
    this.setState({ time });
  }

  handleAudience(e) {
    console.log("You Selected", e.target.value);

    this.setState({ assemblyType: e.target.value });
  }

  onRedirect = (e) => {
    console.log("clicked");
    const { getFieldValue } = this.props.form;
    const {
      electionType,
      assemblyType,
      selectedAudience,
      pollDescription,
      optionValue,
      startDate,
      endDate,
      options,
    } = this.state;

    if (!optionValue) return alert("Poll Option  Description is required");
    if (!assemblyType) return alert("Assembly Type is required");
    if (!startDate) return alert("Start date is required");
    if (!endDate) return alert("End date is required");

    const headers = {
      headers: {
        token: localStorage.getItem("token"),
      },
    };

    const data = {
      electionType: electionType,
      assemblyType: assemblyType,
      startDate: startDate,
      endDate: endDate,
      pollQuestion: getFieldValue("pollQuestion"),
      pollOptions: options,
    };
    if (!data.pollQuestion) return alert("Poll Question is required");

    console.log("dataaaa", data);
    axios
      .post(`http://localhost:8080/vlock/poll`, data, headers)
      .then((res) => {
        console.log("RESPONSE = ", res);
        console.log(res.message);
        if (res.data.success) {
          alert("Poll Created");
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
      fileValue:value
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
    const {file,fileValue}=this.state;
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

  onChange(event) {
    this.setState({
      file: URL.createObjectURL(event.target.files[0])
    });
  }

  resetFile(event) {
    event.preventDefault();
    this.setState({ file: null });
  }
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
                      Election Type
                    </Label>
                    {getFieldDecorator("electionType", {
                      rules: [
                        {
                          required: true,
                          message: "Please select Your electionType",
                        },
                      ],
                      initialValue: this.state.electionType,
                    })}
                    <FormSelect
                      style={{ height: "50px", width: "47rem" }}
                      onChange={this.handleDropdownChange}
                    >
                      <option
                        style={{ color: "black" }}
                        value="election 1"
                      >
                        election type 1
                      </option>
                      <option style={{ color: "black" }} value="election 2">
                      election type 2
                      </option>
                      <option style={{ color: "black" }} value="election 3">
                      election type 3
                      </option>
                    </FormSelect>
                  </Col>
                </Row>
                <br />
                <Row>
                  <Col lg="10" md="12">
                    <Label style={{ color: "black", marginLeft: "0px" }}>
                      Select Assessmblies
                    </Label>

                    {getFieldDecorator("assemblyType", {
                      rules: [
                        {
                          required: true,
                          message: "Please select Your Assembly",
                        },
                      ],
                      initialValue: this.state.assemblyType,
                    })}
                    <FormSelect
                      style={{ height: "50px", width: "47rem" }}
                      onChange={this.handleAudience}
                    >
                      <option style={{ color: "black" }} value="NA">
                       NA
                      </option>
                      <option style={{ color: "black" }} value="PA">
                       PA
                      </option>
                      {/* <option style={{ color: "black" }} value="uniAdmin">
                        University Administration
                      </option>
                      <option
                        style={{ color: "black" }}
                        value="All"
                        onClick={this.allSelected}
                      >
                        All
                      </option> */}
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
                  size="md"
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
                            message: "Please Enter Name",
                          },
                        ],
                      })(<Input placeholder="Name" />)}
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
                {/* <b style={{ color: "black" }}>Description</b>
                {getFieldDecorator(" pollDescription", {
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
                /> */}
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
                <div>
        {/* <input type="file" onChange={this.onChange} />
        {this.state.file && (
          <div style={{ textAlign: "center" }}>
            <button onClick={this.resetFile}>Remove File</button>
          </div>
        )} */}
        {/* <img style={{ width: "30%",height:"30%" }} src={this.state.file} /> */}
      </div>
    
                <b style={{ color: "black", marginLeft: "0px" }}>
                  {" "}
                  Start Date{" "}
                </b>
                <FormItem style={{ color: "red" }}>
                  {getFieldDecorator("startDate", {
                    rules: [
                      {
                        required: true,
                        message: "*Required",
                      },
                    ],
                  })(
                    <Input
                      type="datetime-local"
                      min={formatDate}
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
                      min={formatDate}
                      style={{
                        marginLeft: "20px",
                        width: "210px",
                        border: "1px solid black",
                      }}
                      onChange={this.endDate}
                    />
                  )}
                  <br />
                </FormItem>
              </Form>

              <br />
              <br />
              <MDBBtn
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
