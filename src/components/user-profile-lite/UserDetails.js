import React from "react";
import PropTypes from "prop-types";
import { useState } from "react";
import { Label } from "reactstrap";
import { FcKey } from "react-icons/fc";

import {
  Card,
  CardHeader,
  Button,
  ListGroup,
  ListGroupItem,
  Progress,
} from "shards-react";

import { Modal, ModalBody, ModalHeader } from "shards-react";
import { Form } from "antd";
import { FormInput } from "shards-react";

import { Alert } from "shards-react";

import axios from "axios";
import SweetAlert from "sweetalert-react/lib/SweetAlert";
const FormItem = Form.Item;

class UserDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = { open: false };
    this.toggle = this.toggle.bind(this);
    this.userDetails = {
      name: "",
      department: "",
      email: "",
      sapID: "",
      userType: "",
      password: "",
      designation: "",
      avatar: "",
      privateKey: "",
      publicKey: "",
      jobTitle: "",
      performanceReportTitle: "Workload",
      performanceReportValue: 74,
      metaTitle: "Description",
      openActive: false,
      Description: "",
      subject: "",
      active: Boolean,
      loading: false,
      visible: false,
      setIsModalVisible: false,
      pulls: [],
      metaValue:
      <ul>
      <li style={{color:"#569CE5"}} >Click on the view key button.</li>
      <li style={{color:"#569CE5"}}  >Copy the key from the box.</li>
      <li style={{color:"#569CE5"}}   >In the top of the browser see the metamask icon. </li>
     <li style={{color:"#569CE5"}}  > click on the icon.</li>
     <li  style={{color:"#569CE5"}}  > Select the import account option and paste the key.</li>

</ul>
    };
    this.toggle = this.toggle.bind(this);
  }
  onRedirect = (e) => {};
  toggle() {
    const headers = {
      headers: {
        token: localStorage.getItem("token"),
      },
    };
    const data = {
      name: this.state.name,
    };
    axios
      .get(`http://localhost:8080/vlock/profile`, headers)

      .then((res) => {
        console.log("RESPONSE = ", res);
        // console.log(res.message);
        // console.log("data",res.data.accountId.privateKey)
        this.setState({ pulls: res.data });
        this.userDetails.privateKey = res.data.data.accountId.privateKey;

        console.log("abc", this.userDetails.privateKey);
      });
    this.setState({
      open: !this.state.open,
    });
  }
  handleBack = () => {
    this.setState({
      open: !this.state.open,
    });
  };
  render() {
    const { openActive } = this.state;
    const { open, values } = this.state;
    let { pulls } = this.userDetails.privateKey;
    console.log("inside render ", this.userDetails.privateKey);
    return (
      <Card
        small
        className="mb-4 pt-3"
        style={{ height: "43rem", marginTop: "20px", border: "red" }}
      >
        <CardHeader className="border-bottom text-center">
          <h4 className="mb-0">{this.userDetails.name}</h4>
          <span style={{ color: "#000" }} className="text-black d-block mb-2">
            {this.userDetails.jobTitle}
          </span>
          <Button pill outline size="sm" className="mb-2" onClick={this.toggle}>
            <i className="material-icons mr-1"></i> View Key
          </Button>
          <p style={{color:"black"}}>{localStorage.getItem("name")}</p>

          <Modal size="sm" open={open} toggle={this.toggle}>
            <ModalHeader style={{ marginLeft: "30px" }}>
              {" "}
              <FcKey>Your Private Key</FcKey> 
            </ModalHeader>
            <ModalBody>
              <p> {this.userDetails.privateKey}</p>
              <center><Button
              size="sm"
              color="primary"
              theme="accent"
              onClick={this.handleBack} >
              Cancel
            </Button>
            </center>
            </ModalBody>
            
           
          </Modal>
        </CardHeader>
        <ListGroup flush>
          <ListGroupItem className="px-4">
            <div className="progress-wrapper">
              <strong className="text-muted d-block mb-2"></strong>
            </div>
          </ListGroupItem>
          <ListGroupItem className="p-4">
            <strong className="text-black d-block mb-2"></strong>
            <span style={{ color: "black" }}>{this.userDetails.metaValue}</span>
          </ListGroupItem>
        </ListGroup>
      </Card>
    );
  }
}
export default UserDetails;
