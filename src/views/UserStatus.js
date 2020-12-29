import React from "react";
import { Container, Button, bool } from "shards-react";
import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { BsUnlockFill } from "react-icons/bs";
import { BsLockFill } from "react-icons/bs";
import { BsFillEnvelopeFill } from "react-icons/bs";
import { BsFillPersonFill } from "react-icons/bs";
import { BsLink45Deg } from "react-icons/bs";
import { AiFillEdit } from "react-icons/ai";
import { AiFillDatabase } from "react-icons/ai";
import { AiFillSafetyCertificate } from "react-icons/ai";


import { Tooltip } from "antd";
import { Table } from "reactstrap";
import { Label } from "reactstrap";
import { Radio, Form, Typography } from "antd";
import { Modal, ModalBody, ModalHeader } from "shards-react";
import axios from "axios";
import { IoMdCreate } from "react-icons/io";
import { AiFillDelete } from "react-icons/ai";
import { CardBody, FormInput } from "shards-react";
import { AiOutlineRest } from "react-icons/ai";
import { AiOutlineEye } from "react-icons/ai";
import { NavLink } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import { css } from "@emotion/core";
const override = css`
  position: absolute;
  left: 45%;
  right: 0;
  top: 100%;
  border-color: blue;
`;
const FormItem = Form.Item;

class UserList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      sapID: "",
      department: "",
      Description: "",
      active: Boolean,
      loading: false,
      visible: false,
      setIsModalVisible: false,
      pulls: [],
      openActive: false,
    };
    this.toggle = this.toggle.bind(this);
    // this.Activetoggle = this.Activetoggle.bind(this);
  }
  sendEmail(e) {
    const data = {
      //email: "rajazara75@gmail.com",
      email: this.state.email,
      subject: "Vlock Notification",
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
  toggle() {
    this.setState({
      open: !this.state.open,
    });
  }
  Activetoggle(e, email) {
    e.preventDefault();
    this.setState({
      openActive: !this.state.openActive,
      email: email,
    });
  }
  handleOk = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };
  handleBack = () => {
    this.setState({
      //openActive: !this.state.openActive,
      open: !this.state.open,
    });
  };

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    this.setState({ loading: true });
    console.log("inside fetch", this.state.email);
    const headers = {
      headers: {
        token: localStorage.getItem("token"),
      },
    };
    const data = {
      name: this.state.name,
      email: this.state.email,
      sapID: this.state.sapID,
      department: this.state.department,
    };
    axios
      .get(`http://localhost:8080/vlock/user`, headers, data)
      //  console.log("header")

      .then((res) => {
        console.log("RESPONSE = ", res.data.data);
        this.setState({ loading: false, pulls: res.data.data });
        console.log(this.state.pulls);
        // console.log("Active", this.state.pulls[1].active);

        console.log(res.message);
      });
  }

  deleteUser(e, id) {
    e.preventDefault();
    console.log("id inside delete user");
    const headers = {
      headers: {
        token: localStorage.getItem("token"),
      },
    };
    console.log("before axios", id);
    axios
      .delete(`http://localhost:8080/vlock/user/${id}`, headers)

      .then((res) => {
        console.log("RESPONSE = ", res._id);
        alert("Sucesfully Deleted");

        //  window.location.reload(false);
        console.log(res.message);
        console.log("emailll", this.state.email);
      });
  }
  //   const data = {
  //     email: this.state.email,
  //     subject: "Vlock Notification",
  //     message: "Dear User Your Account Has Been Blocked ",
  //   };
  //   const header = {
  //     header: {
  //       token: localStorage.getItem("token"),
  //     },
  //   };
  //   axios.post(`http://localhost:8080/vlock/email`, data);
  // }

  render() {
    const userData =
      this.props.location &&
      this.props.location.aboutProps &&
      this.props.location.aboutProps.userData;
    const { pulls } = this.state;
    const { open, openActive } = this.state;
    const { data, loading } = this.state;
    return (
      <div>
        <br />
        <h3 style={{ marginLeft: "400px" }}> User Status</h3>

        <div
          style={{ marginBottom: "10px" }}
          className="d-flex justify-content-center"
        ></div>
        <div className="sweet-loading">
          <ClipLoader
            css={override}
            size={100}
            color={"#123abc"}
            loading={this.state.loading}
          />
        </div>
        <Table striped>
          <thead>
            <tr style={{ backgroundColor: "#569CE5"}}>
              <th>
                {" "}
                <BsLink45Deg></BsLink45Deg> #
              </th>
              <th>
                <BsFillPersonFill></BsFillPersonFill> Name{" "}
              </th>
              
              <th>
                {" "}
                <AiFillEdit></AiFillEdit> Sap ID
              </th>
              <th>
                {" "}
                <AiFillDatabase> </AiFillDatabase> Department
              </th>
              <th> <AiFillSafetyCertificate ></AiFillSafetyCertificate> Status</th>
              <th>
                {" "}
                <BsFillEnvelopeFill></BsFillEnvelopeFill> Email
              </th>
              <th> <AiFillSafetyCertificate></AiFillSafetyCertificate>  Action</th>
              <th></th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {!pulls.length ? (
              <tr>
                {" "}
                <td
                  colspan="8"
                  className="text-center"
                  style={{ color: "black", fontWeight: "bold" }}
                >
                  {" "}
                  No Data are found
                </td>
              </tr>
            ) : (
              pulls.map((values, index) => {
                return (
                  <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td>{values.name}</td>
                    <td>{values.sapID}</td>
                    <td>{values.department}</td>
                    <td>{values.active ? "Active" : "Inactive"}</td>
                    <td>{values.email}</td>

                    <td>
                      {" "}
                      <AiOutlineRest
                        style={{ color: "blue" }}
                        onClick={(e) => this.deleteUser(e, values._id)}
                      />
                      <NavLink
                        to={{
                          aboutProps: { userData: values },
                        }}
                      >
                        <AiOutlineEye
                          onClick={this.toggle}
                          style={{ marginLeft: "10px", color: "blue" }}
                        />
                      </NavLink>
                      <NavLink
                        to={{
                          pathname: "/components/editUser",
                          aboutProps: { userData: values },
                        }}
                      >
                        <IoMdCreate style={{ marginLeft: "10px" }} />
                      </NavLink>
                      {values.active ? (
                        <Button
                          onClick={(e) => this.Activetoggle(e, values.email)}
                          style={{
                            marginTop: "3px",
                            marginLeft: "10px",
                            height: "30px",
                          }}
                        >
                          <BsUnlockFill></BsUnlockFill>
                        </Button>
                      ) : (
                        <Button
                          onClick={(e) => this.Activetoggle(e, values.email)}
                          style={{
                            marginTop: "3px",
                            backgroundColor: "red",
                            marginLeft: "10px",
                          }}
                        >
                          <BsLockFill></BsLockFill>
                        </Button>
                      )}
                    </td>{" "}
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                );
              })
            )}

            <Modal size="sm" open={open} toggle={this.toggle}>
              <ModalHeader>User Detail</ModalHeader>
              <ModalBody>
                <p
                  style={{
                    border: "2px solid grey",
                    borderRadius: "16px",
                    padding: "15px",
                  }}
                >
                  <p style={{ color: "blue" }}>
                    Name:
                    {userData && userData._id ? userData.name : this.state.name}
                  </p>
                  <p style={{ color: "blue" }}>
                    Sap Id:{" "}
                    {userData && userData._id
                      ? userData.sapID
                      : this.state.sapID}
                  </p>
                  <p style={{ color: "blue" }}>
                    Email:
                    {userData && userData._id
                      ? userData.email
                      : this.state.email}
                  </p>
                  <p style={{ color: "blue" }}>
                    Department:{" "}
                    {userData && userData._id
                      ? userData.department
                      : this.state.department}
                  </p>
                  <p style={{ color: "blue" }}>
                    {" "}
                    User Type:{" "}
                    {userData && userData._id
                      ? userData.userType
                      : this.state.userType}
                  </p>
                </p>
                <Button
                  style={{ marginLeft: "50px" }}
                  type="secondary"
                  onClick={this.handleBack}
                >
                  Cancel
                </Button>
              </ModalBody>
            </Modal>
          </tbody>
        </Table>
        <Modal size="md" open={openActive} Activetoggle={this.Activetoggle}>
          <h6
            style={{
              marginLeft: "140px",
              color: "black",
              fontWeight: "bold",
              marginTop: "30px",
            }}
          >
            {" "}
            Compose Your Message
          </h6>
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
              size="sm"
              style={{ marginLeft: "110px" }}
              type="secondary"
              onClick={this.handleActiveBack}
            >
              Cancel
            </Button>
            <Button
              size="sm"
              style={{ marginLeft: "30px" }}
              type="secondary"
              onClick={(e) => this.sendEmail()}
            >
              Send
            </Button>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (UserList) => {
  return { UserList };
};

export default UserList;
