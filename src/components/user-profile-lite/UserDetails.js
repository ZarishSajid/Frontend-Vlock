import React from "react";
import PropTypes from "prop-types";
import { useState } from "react";
import { Label } from "reactstrap";

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
      subject:"",
      active: Boolean,
      loading: false,
      visible: false,
      setIsModalVisible: false,
      pulls: [],
      metaValue:
        "Click on the view key button copy the key from the box and in the top of  the browser see the metamask icon click on the icon and select the import account option and paste the key ",
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
  Activetoggle() {
    this.setState({
      openActive: !this.state.openActive,
    });
  }
  sendEmail(e) {
    const data = {
      //email: "rajazara75@gmail.com",
      email: "teamvlock@gmail.com",
      subject: this.state.subject,
      message: this.state.Description,
      //message: "Dear zara your account has been blocked",
    };
    const header = {
      header: {
        token: localStorage.getItem("token"),
      },
    };
    axios.post(`http://localhost:8080/vlock/email`, data).then((res) => {
      alert("Email Sent ");
      window.location.reload(false);
    });
  }
  handleDescription = (e) => {
    this.setState({
      Description: e.target.value,
    });
  };
  handleSubject = (e) => {
    this.setState({
      subject: e.target.value,
    });
  };
  toggle() {
    this.setState({
      open: !this.state.open,
    });
  }
  render() {
    const { openActive } = this.state;

    const { open, values } = this.state;
    let { pulls } = this.userDetails.privateKey;
    console.log("inside render ", this.userDetails.privateKey);
    // const { match } = this.props;
    return (
      <Card
        small
        className="mb-4 pt-3"
        style={{ height: "510px", marginTop: "0px", border: "red" }}
      >
        <CardHeader className="border-bottom text-center">
          <h4 className="mb-0">{this.userDetails.name}</h4>
          <span style={{ color: "#000" }} className="text-black d-block mb-2">
            {this.userDetails.jobTitle}
          </span>
          <Button pill outline size="sm" className="mb-2" onClick={this.toggle}>
            <i className="material-icons mr-1"></i> View Key
          </Button>
          <Modal size="sm" open={open} toggle={this.toggle}>
            <ModalHeader style={{ marginLeft: "30px" }}>
              {" "}
              Your Private Key
            </ModalHeader>
            <ModalBody>
              <p> {this.userDetails.privateKey}</p>
            </ModalBody>
          </Modal>
        </CardHeader>
        <ListGroup flush>
          <ListGroupItem className="px-4">
            <div className="progress-wrapper">
              <strong className="text-muted d-block mb-2">
                {/* {userDetails.performanceReportTitle} */}
              </strong>
              {/* <Progress
                  className="progress-sm"
                 
                  // value={userDetails.performanceReportValue}
                >
                  <span className="progress-value">
                    {   userDetails.performanceReportValue}%
                  </span>
                </Progress> */}
            </div>
          </ListGroupItem>
          <ListGroupItem className="p-4">
            <strong className="text-black d-block mb-2">
              {/* {userDetails.metaTitle} */}
            </strong>
            <span style={{ color: "black" }}>{this.userDetails.metaValue}</span>
          </ListGroupItem>
          <Modal  size="md" open={openActive} Activetoggle={this.Activetoggle}>
            <h6 style={{marginLeft:"140px",color:"black",fontWeight:"bold",marginTop:"30px"}}> Compose Your Message</h6>
            <ModalBody>
              <Label style={{ color: "black", fontWeight: "bold" }}>
                Subject:
              </Label>

              <FormInput
                style={{ color: "black" }}
                type="textarea"
                onChange={this.handleSubject}
                size="lg"
                className="mb-3"
                placeholder="Type Your Subject"
              />

              <br />
              <Label style={{ color: "black", fontWeight: "bold" }}>
                Message:
              </Label>

              <FormInput
                style={{ color: "black" }}
                type="textarea"
                onChange={this.handleDescription}
                size="lg"
                className="mb-3"
                placeholder="Type Your Message"
              />

              <Button
                style={{ marginLeft: "110px" }}
                type="secondary"
                onClick={this.handleActiveBack}
              >
                Cancel
              </Button>
              <Button
                style={{ marginLeft: "70px" }}
                type="secondary"
                onClick={(e) => this.sendEmail()}
              >
                Send
              </Button>
            </ModalBody>
          </Modal>
          <CardHeader
            style={{
              color: "blue",
              marginTop: "80px",
              borderRadius: "10px",
              marginLeft: "2opx",
              padding: "15px",
              // border: "2px solid grey",
            }}
          >
            <p style={{ color: "blue" }} onClick={() => this.Activetoggle()}>
              In case of having any issue while u contact
              To Team Vlock  teamvlock@gmail.com
            </p>
          </CardHeader>
        </ListGroup>
      </Card>
    );
  }
}

// const UserDetails = ({ userDetails }) => (

//   <Card small className="mb-4 pt-3"  style={{height:"400px",marginTop:"30px", border: 'red',
// }}>
//     <CardHeader className="border-bottom text-center">
//       <div className="mb-3 mx-auto">
//         <img
//           className="rounded-circle"
//           src={userDetails.avatar}
//           alt={userDetails.name}
//           width="110"
//         />
//       </div>
//       <h4 className="mb-0">{userDetails.name}</h4>
//       <span  style={{color:"#000"}}className="text-black d-block mb-2">{ userDetails.jobTitle }</span>
//       <Button pill outline size="sm" className="mb-2">
//         <i className="material-icons mr-1"></i> View Key
//       </Button>
//     </CardHeader>
//     <ListGroup flush>
//       <ListGroupItem className="px-4">
//         <div className="progress-wrapper">
//           <strong className="text-muted d-block mb-2">
//             {/* {userDetails.performanceReportTitle} */}
//           </strong>
//           {/* <Progress
//             className="progress-sm"

//             // value={userDetails.performanceReportValue}
//           >
//             <span className="progress-value">
//               {   userDetails.performanceReportValue}%
//             </span>
//           </Progress> */}
//         </div>
//       </ListGroupItem>
//       <ListGroupItem className="p-4">
//         <strong className="text-black d-block mb-2">
//           {/* {userDetails.metaTitle} */}
//         </strong>
//         <span style={{color:"black"}} >{userDetails.metaValue}</span>
//       </ListGroupItem>
//     </ListGroup>
//   </Card>

// );

// UserDetails.propTypes = {
//   // /**
//   //  * The user details object.
//   //  */
//   userDetails: PropTypes.object
// };

// UserDetails.defaultProps = {
//   userDetails: {

//     name: "",
//     avatar:"",
//     jobTitle: "Student",
//     performanceReportTitle: "Workload",
//     performanceReportValue: 74,
//     metaTitle: "Description",
//     metaValue:
//       "Click on the view key button copy the key from the box and in the top of  the browser see the metamask icon click on the icon and select the import account option and paste the key ",
//   }
// };

// export default UserDetails;

export default UserDetails;
