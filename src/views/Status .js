import React, { Fragment } from "react";
import { Container, Button } from "shards-react";
import { AiOutlineRest } from "react-icons/ai";
import { ImCheckmark } from "react-icons/im";
import { RiDeleteBinLine } from "react-icons/fa";
import { Link, useHistory } from "react-router-dom";
import Tooltip from "react-simple-tooltip";
import { MdLock } from "react-icons/md";
import { AiFillCalendar } from "react-icons/ai";
import { AiFillSafetyCertificate } from "react-icons/ai";
import { BsFillPersonFill, BsFillCalendarFill } from "react-icons/bs";
import { Table, Label } from "reactstrap";
import { FormInput } from "shards-react";
import { Form } from "antd";
import * as moment from "moment";
import { IoMdCreate } from "react-icons/io";
import getToken from "../helpers/auth";
import { NavLink } from "react-router-dom";
import { Icon } from "antd";
import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";
import { Modal, ModalBody, ModalHeader } from "shards-react";
import { BsFillBarChartFill } from "react-icons/bs";
import { Redirect } from "react-router-dom";
import { AiOutlineEye } from "react-icons/ai";
import { Spinner } from "reactstrap";
import axios from "axios";
import ClipLoader from "react-spinners/ClipLoader";
import SweetAlert from "sweetalert-react/lib/SweetAlert";
import { css } from "@emotion/core";
import { BsUnlockFill } from "react-icons/bs";
import { BsLockFill } from "react-icons/bs";
const override = css`
  position: absolute;
  left: 40%;
  right: 0;
  top: 70%;
  border-color: blue;
`;

class PollStatus extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pollType: "",
      startDate: "",
      endDate: "",
      status: "",
      createdBy: "",
      pulls: [],
      _id: "",
      loading: false,
      index: "",
      fireRedirect: false,
      show: false,
      redirectRoute: "",
      newStatus: "",
    };
    this.toggle = this.toggle.bind(this);
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
  toggle() {
    this.setState({
      open: !this.state.open,
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
    const header = {
      header: {
        token: localStorage.getItem("token"),
      },
    };
    axios.put(`http://localhost:8080/vlock/polin/${id}`, data).then((res) => {
      alert("Poll Blocked Sucessfully ");
      if (res.data.success === true) {
        this.fetchData();
      }
      // window.location.reload(false);
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

    const header = {
      header: {
        token: localStorage.getItem("token"),
      },
    };
    console.log("dataa",data.status);
    console.log("iddd",id);


    axios.put(`http://localhost:8080/vlock/pollact/${id}`, data)
    .then((res) => {
      alert("Poll Unblocked Sucessfully ");
      if (res.data.success === true) {
        this.fetchData();
      }
      // window.location.reload(false);
    });
  }

  deletePoll(e, id) {
    e.preventDefault();
    console.log("id inside delete poll");
    const headers = {
      headers: {
        token: localStorage.getItem("token"),
      },
    };

    console.log("before axios", id);

    axios
      .delete(`http://localhost:8080/vlock/poll/${id}`, headers)

      .then((res) => {
        console.log("RESPONSE = ", res._id);
        alert("Sucesfully Deleted");
        window.location.reload(false);
        console.log(res.message);
      });
  }
  changeStatus(e, id) {
    e.preventDefault();
    const headers = {
      headers: {
        token: localStorage.getItem("token"),
      },
    };
    const data = {
      status: "approved",
    };
    axios
      .put(`http://localhost:8080/vlock/change/${id}`, data, headers)

      .then((res) => {
        console.log("RESPONSE = ", res);
        console.log(res.message);
        if (res.data.success) {
          alert("Updated Sucessfully");
        } else {
          //  console.log("else")
          alert(res.data.message);
        }
        //res.sucess=();
      });
  }
  disapprove(e, id) {
    e.preventDefault();
    const headers = {
      headers: {
        token: localStorage.getItem("token"),
      },
    };
    const data = {
      status: "disapproved",
    };
    axios
      .put(`http://localhost:8080/vlock/change/${id}`, data, headers)

      .then((res) => {
        console.log("RESPONSE = ", res);
        console.log(res.message);
        if (res.data.success) {
          alert("Disapproved Sucessfully");
        } else {
          //  console.log("else")
          alert(res.data.message);
        }
        //res.sucess=();
      });
  }

  componentDidMount() {
    this.fetchData();
  }
  fetchData() {
    this.setState({ loading: true });
    const headers = {
      headers: {
        token: localStorage.getItem("token"),
      },
    };
    const data = {
      pollType: this.state.pollType,
      createdBy: this.state.createdBy,
      startDate: this.state.startDate,
      endDate: this.state.endDate,
    };
    axios.get(`http://localhost:8080/vlock/poll`, headers, data).then((res) => {
      console.log("RESPONSE = ", res.data.data);
      this.setState({ loading: false, pulls: res.data.data });
      console.log("this.state.pulls", this.state.pulls);
      console.log(res.message);
    });
  }
  handleBack = () => {
    this.setState({
      //openActive: !this.state.openActive,
      open: !this.state.open,
    });
  };
  getAudience = (userData) => {
    if (userData && userData._id) {
      if (userData.selectedAudience && !userData.selectedAudience.length) {
        return <p style={{ color: "black" }}> {userData.selectedAudience}</p>;
      }
      if (userData.selectedAudience && userData.selectedAudience.length > 0) {
        return userData.selectedAudience.map((Audience) => (
          <li style={{ color: "black" }}>{Audience}</li>
        ));
      }
    } else {
      return <p style={{ color: "black" }}>{this.state.selectedAudience}</p>;
    }
  };
  render() {
    const userData =
      this.props.location &&
      this.props.location.aboutProps &&
      this.props.location.aboutProps.userData;
    const { fireRedirect, redirectRoute } = this.state;
    const { openActive } = this.state;
    const { open, userType } = this.state;
    const { pulls } = this.state;
    const { match } = this.props;

    return [
      <Fragment key={1}>
        {fireRedirect && [
          <div key={1}>{this.setState({ fireRedirect: false })}</div>,
          <Redirect key={2} to={redirectRoute} />,
        ]}
      </Fragment>,

      <div>
        <br />
        <h3 style={{ marginLeft: "400px", color: "black" }}>Poll Status</h3>

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
              <th>#</th>
              <th>Poll Type</th>
              <th>Created By</th>
              <th>Department</th>
              <th>Status</th>
              <th>Active/Inactive</th>
              <th>Action</th>{" "}
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
                  No Data Found
                </td>
              </tr>
            ) : (
              pulls.map((values, index) => {
                return (
                  <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td>{values.pollType}</td>
                    <td>{values.createdBy && values.createdBy.name}</td>
                    <td>{values.createdBy && values.createdBy.department}</td>
                    <td>
                      {values.status == "approve"
                        ? "Approve"
                        : values.status == "disapproved"
                        ? "Disapproved"
                        : values.status == "pending"
                        ? "Pending"
                        : values.status == "started"
                        ? "Started"
                        : "Expired"}
                    </td>
                    <td>{values.active ? "Active" : "Inactive"}</td>
                    <td>
                      <Tooltip
                        content="Delete Poll"
                        customCss={css`
                          white-space: nowrap;
                        `}
                      >
                        <AiOutlineRest
                          style={{ color: "blue" }}
                          onClick={(e) => this.deletePoll(e, values._id)}
                        />
                      </Tooltip>
                      {values.status !== "pending" ? null : (
                        <NavLink
                          disabled={values.status !== "pending"}
                          to={{
                            pathname: "/components/editPoll",
                            aboutProps: { userData: values },
                          }}
                        >
                          {" "}
                        </NavLink>
                      )}
                      <NavLink
                        to={{
                          aboutProps: { userData: values },
                        }}
                      >
                        <Tooltip
                          content="View Poll"
                          customCss={css`
                            white-space: nowrap;
                          `}
                        >
                          <AiOutlineEye
                            onClick={this.toggle}
                            style={{ marginLeft: "10px", color: "blue" }}
                          />
                        </Tooltip>
                      </NavLink>{" "}
                      {values.active ? (
                        <Tooltip
                          content="Block Poll"
                          customCss={css`
                            white-space: nowrap;
                          `}
                        >
                          <BsUnlockFill
                            //inactive
                            onClick={(e) =>
                              this.Activetogglee(e, values.email, values._id)
                            }
                            style={{
                              marginTop: "3px",
                              marginLeft: "10px",
                              height: "30px",
                              color: "green",
                            }}
                          ></BsUnlockFill>
                        </Tooltip>
                      ) : (
                        <Tooltip
                          content="Unblock Poll"
                          customCss={css`
                            white-space: nowrap;
                          `}
                        >
                          <MdLock
                            //inactive
                            onClick={(e) =>
                              this.Activetoggle(e, values.email, values._id)
                            }
                            style={{
                              marginTop: "3px",
                              marginLeft: "10px",
                              color: "red",
                            }}
                          ></MdLock>
                        </Tooltip>
                      )}
                    </td>
                  </tr>
                );
              })
            )}
            <Modal size="md" open={open} toggle={this.toggle}>
              <center>
                <h4 style={{ color: "black", marginTop: "30px" }}>
                  {" "}
                  Poll Detail
                </h4>
              </center>
              <ModalBody>
                <p
                  style={{
                    border: "4px solid black",
                    borderRadius: "20px",
                    padding: "15px",
                  }}
                >
                  {/* <p style={{ color: "black" }}>
                    Poll Type:{" "}
                    {userData && userData._id
                      ? userData.pollType
                      : this.state.pollType}
                  </p> */}
                  <p style={{ color: "black" }}>
                    Poll Question:{" "}
                    {userData && userData._id
                      ? userData.pollQuestion
                      : this.state.pollQuestion}
                  </p>
                  {/* <p style={{ color: "black" }}>
                    Created By:{" "}
                    {userData && userData._id && userData.createdBy
                      ? userData.createdBy && userData.createdBy.name
                      : this.state.createdBy.name}
                  </p> */}
                  {/* <p style={{ color: "black" }}>
                    Department:{" "}
                    {userData && userData._id
                      ? userData.createdBy.department
                      : this.state.createdBy.department}
                  </p> */}
                  <p style={{ color: "black" }}>
                    Email:{" "}
                    {userData && userData._id
                      ? userData.createdBy.email
                      : this.state.createdBy.email}
                  </p>{" "}
                  Selected Audience: {this.getAudience(userData)}
                   Poll Options:{" "}
                  {userData && userData._id ? (
                    userData.pollOptions.map((option) => (
                      <li style={{ color: "black" }}>{option}</li>
                    ))
                  ) : (
                    <p style={{ color: "black" }}>{this.state.pollOptions}</p>
                  )}
                  <br/>
                  <p style={{ color: "black" }}>
                    Start Date:
                    {userData && userData._id
                      ? moment(userData.startDate).format("MM-DD-YYYY")
                      : this.state.startDate}
                  </p>
                  <p style={{ color: "black" }}>
                    End Date:{" "}
                    {userData && userData._id
                      ? moment(userData.endDate).format("MM-DD-YYYY")
                      : this.state.endDate}
                  </p>
                  <Button
                    style={{ marginLeft: "150px" }}
                    type="secondary"
                    onClick={this.handleBack}
                  >
                    Cancel
                  </Button>
                </p>
              </ModalBody>
            </Modal>
          </tbody>
        </Table>
        {/* <Modal size="md" open={openActive} Activetoggle={this.Activetoggle}>
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
              onClick={this.handleBack}
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
        </Modal> */}
        <br />
        <br />
        <br />
        <br />
        <br />
      </div>,
    ];
  }
}

const mapStateToProps = (PollStatus) => {
  return { PollStatus };
};

export default PollStatus;
