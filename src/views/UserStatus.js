import React from "react";
import { Container, Button, bool } from "shards-react";
import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { BsUnlockFill } from "react-icons/bs";
import { BsLockFill } from "react-icons/bs";
import { BsFillEnvelopeFill } from "react-icons/bs";
import { BsFillPersonFill } from "react-icons/bs";
import { BsLink45Deg, BsStopFill } from "react-icons/bs";
import { AiFillEdit, AiFillEye } from "react-icons/ai";
import { AiFillDatabase } from "react-icons/ai";
import { AiFillSafetyCertificate } from "react-icons/ai";
import Tooltip from "react-simple-tooltip";
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
      status: "",
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
      this.setState({
        openActive: !this.state.openActive,
      });
      if (res.data.success === true) {
        this.fetchData();
      }
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
  Activetoggle(e, email, id) {
    e.preventDefault();
    this.setState({
      openActive: !this.state.openActive,
      email: email,
    });
    const data = {
      status: "active",
    };
    const headers = {
      headers: {
        token: localStorage.getItem("token"),
      },
    };
    console.log("token in active", localStorage.getItem("token"));

    axios.put(`http://localhost:8080/vlock/active/${id}`, data).then((res) => {
      // alert("Email Sent ");
      // window.location.reload
    });
  }

  Activetogglee(e, email, id) {
    e.preventDefault();
    this.setState({
      openActive: !this.state.openActive,
      email: email,
    });
    const data = {
      status: "inactive",
    };
    const headers = {
      headers: {
        token: localStorage.getItem('token"'),
      },
    };
    console.log("token in inactive", localStorage.getItem("token"));

    axios
      .put(`http://localhost:8080/vlock/inactive/${id}`, data)
      .then((res) => {
        // alert("Email Sent ");
        console.log("token in inside apiii", localStorage.getItem("token"));

        // window.location.reload(false);
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
        <h3 style={{ marginLeft: "400px", color: "black" }}> User Status</h3>
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
            <tr style={{ backgroundColor: "#569CE5" }}>
              <th> #</th>
              <th>Name </th>
              <th> Sap ID</th>
              <th> Department</th>
              <th> Status</th>
              <th> Email</th>
              <th> Action</th>
              <th></th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {!pulls || pulls === undefined ? (
              <tr>
                {" "}
                <td
                  colspan="12"
                  className="text-center"
                  style={{ color: "black", fontWeight: "bold" }}
                >
                  {" "}
                  No Data found
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
                      <Tooltip
                        content=" Click here to delete user"
                        customCss={css`
                          white-space: nowrap;
                        `}
                      >
                        <AiOutlineRest
                          style={{ color: "blue" }}
                          onClick={(e) => this.deleteUser(e, values._id)}
                        ></AiOutlineRest>
                      </Tooltip>
                      <NavLink
                        to={{
                          aboutProps: { userData: values },
                        }}
                      >
                        <Tooltip
                          content=" Click here to view user"
                          customCss={css`
                            white-space: nowrap;
                          `}
                        >
                          <AiOutlineEye
                            style={{ color: "blue", marginLeft: "10px" }}
                            onClick={this.toggle}
                          ></AiOutlineEye>
                        </Tooltip>
                      </NavLink>
                      <NavLink
                        to={{
                          pathname: "/components/editUser",
                          aboutProps: { userData: values },
                        }}
                      >
                        <Tooltip
                          content=" Click here to edit user"
                          customCss={css`
                            white-space: nowrap;
                          `}
                        >
                          <AiFillEdit
                            style={{ color: "blue", marginLeft: "10px" }}
                          />
                        </Tooltip>
                      </NavLink>
                      {values.active ? (
                        <Tooltip
                          content="Click here to block user"
                          customCss={css`
                            white-space: nowrap;
                          `}
                        >
                          <BsUnlockFill
                            // Active
                            style={{
                              marginTop: "3px",
                              color: "green",
                              marginLeft: "10px",
                              height: "30px",
                            }}
                            onClick={(e) =>
                              this.Activetogglee(e, values.email, values._id)
                            }
                          ></BsUnlockFill>
                        </Tooltip>
                      ) : (
                        <Tooltip
                          content=" Click  here to unblock user"
                          customCss={css`
                            white-space: nowrap;
                          `}
                        >
                          <BsLockFill
                            // InActive
                            onClick={(e) =>
                              this.Activetoggle(e, values.email, values._id)
                            }
                            style={{
                              marginTop: "3px",
                              color: "red",
                              marginLeft: "10px",
                            }}
                          ></BsLockFill>
                        </Tooltip>
                      )}
                    </td>{" "}
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                );
              })
            )}

            <Modal size="md" open={open} toggle={this.toggle}>
              <center>
                <h4 style={{ color: "black", marginTop: "30px" }}>
                  User Detail
                </h4>
              </center>
              <ModalBody>
                <p
                  style={{
                    border: "2px solid black",
                    borderRadius: "16px",
                    padding: "15px",
                  }}
                >
                  <p style={{ color: "black" }}>
                    Name:
                    {userData && userData._id ? userData.name : this.state.name}
                  </p>
                  <p style={{ color: "black" }}>
                    Sap Id:{" "}
                    {userData && userData._id
                      ? userData.sapID
                      : this.state.sapID}
                  </p>
                  <p style={{ color: "black" }}>
                    Email:
                    {userData && userData._id
                      ? userData.email
                      : this.state.email}
                  </p>
                  <p style={{ color: "black" }}>
                    Department:{" "}
                    {userData && userData._id
                      ? userData.department
                      : this.state.department}
                  </p>
                  <p style={{ color: "black" }}>
                    {" "}
                    User Type:{" "}
                    {userData && userData._id
                      ? userData.userType
                      : this.state.userType}
                  </p>
                </p>
                <Button
                  style={{ marginLeft: "160px" }}
                  type="secondary"
                  onClick={this.handleBack}
                >
                  Cancel
                </Button>
              </ModalBody>
            </Modal>
          </tbody>
        </Table>
        <Modal size="lg" open={openActive} Activetoggle={this.Activetoggle}>
          <center>
            {" "}
            <h6
              style={{
                marginLeft: "0px",
                color: "black",
                fontWeight: "bold",
                marginTop: "30px",
              }}
            >
              {" "}
              Compose Your Message
            </h6>
          </center>

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

            {/* <Button
              size="sm"
              style={{ marginLeft: "110px" }}
              type="secondary"
              onClick={this.handleActiveBack}
            >
              Cancel
            </Button> */}
            <center>
              <Button
                size="sm"
                style={{ marginLeft: "270px" }}
                type="secondary"
                onClick={(e) => this.sendEmail()}
              >
                Send
              </Button>
            </center>
          </ModalBody>
        </Modal>
        <Modal size="lg" open={openActive} Activetoggle={this.Activetogglee}>
          <center>
            {" "}
            <h6
              style={{
                marginLeft: "0px",
                color: "black",
                fontWeight: "bold",
                marginTop: "30px",
              }}
            >
              {" "}
              Compose Your Message
            </h6>
          </center>
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

            {/* <Button
              size="sm"
              style={{ marginLeft: "110px" }}
              type="secondary"
              onClick={this.handleActiveBack}
            >
              Cancel
            </Button> */}
            <Button
              size="sm"
              style={{ marginLeft: "270px" }}
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
