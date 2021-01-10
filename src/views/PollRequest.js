import React, { Fragment } from "react";
import { Container, Button } from "shards-react";
import { AiOutlineRest } from "react-icons/ai";
import { ImCheckmark } from "react-icons/im";
import { RiDeleteBinLine } from "react-icons/fa";
import { Link, useHistory } from "react-router-dom";
import Tooltip from "react-simple-tooltip";
import { Table } from "reactstrap";
import * as moment from "moment";

import { IoMdCreate } from "react-icons/io";
import getToken from "../helpers/auth";
import { NavLink } from "react-router-dom";
import { Icon } from "antd";
import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";
// import Loader from "Loader"
import { Modal, ModalBody, ModalHeader } from "shards-react";
import { Redirect } from "react-router-dom";

import { AiOutlineEye } from "react-icons/ai";
import { Spinner } from "reactstrap";
import axios from "axios";
import ClipLoader from "react-spinners/ClipLoader";
import SweetAlert from "sweetalert-react/lib/SweetAlert";
import { css } from "@emotion/core";

const override = css`
  position: absolute;
  left: 40%;
  right: 0;
  top: 50%;
  border-color: blue;
`;
class PollStatus extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      pollType: "",
      startDate: "",
      endDate: "",
      status: "",
      userType: "",
      createdBy: "",
      loading: false,
      pulls: [],
      _id: "",
      index: "",
      fireRedirect: false,
      show: false,
      redirectRoute: "",
      newStatus: "",
    };
    this.toggle = this.toggle.bind(this);
  }
  toggle() {
    this.setState({
      open: !this.state.open,
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
      .put(`http://localhost:8080/vlock/status/${id}`, data, headers)

      .then((res) => {
        console.log("RESPONSE = ", res);
        console.log(res.message);
        if (res.data.success) {
          // alert("Approved Sucessfully");
        } else {
          //  console.log("else")
          // alert(res.data.message);
        }
        // window.location.reload(false);
      });
    const dataa = {
      email: this.state.email,
      subject: "Vlock Notification",
      message: "Dear User Your Account Has Been Blocked ",
    };
    const header = {
      header: {
        token: localStorage.getItem("token"),
      },
    };
    // axios.post(`http://localhost:8080/vlock/email`, dataa);
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
    console.log("status disapproveddd",data.status)
    axios
      .put(`http://localhost:8080/vlock/status/${id}`, data, headers)

      .then((res) => {
        console.log("RESPONSE = ", res);
        console.log(res.message);
        console.log(res.message);

        if (res.data.success) {
          // alert("Disapproved Sucessfully");
        } else {
          //  console.log("else")
          // alert(res.data.message);
        }
        // window.location.reload(false);
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
      userType: this.state.userType,
      startDate: this.state.startDate,
      endDate: this.state.endDate,
      selectedAudience: this.state.selectedAudience,
      pollOptions: this.state.pollOptions,
    };
    axios
      .get(`http://localhost:8080/vlock/request`, headers, data)
      .then((res) => {
        console.log("RESPONSE = ", res.data.data);
        this.setState({ loading: false, pulls: res.data.data });
        console.log("this.state.pulls", this.state.pulls);
        console.log(res.message);
      });
  }
  render() {
    const userData =
      this.props.location &&
      this.props.location.aboutProps &&
      this.props.location.aboutProps.userData;
    const { fireRedirect, redirectRoute } = this.state;

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
        <h3 style={{ marginLeft: "400px" }}>Poll Request</h3>

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
              <th> Poll Type</th>
              <th style={{ width: "220px" }}>Poll Question</th>
              <th>Created By</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Status</th>
              <th>Action</th>
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
                  No Poll Request are Available
                </td>
              </tr>
            ) : (
              pulls.map((values, index) => {
                return (
                  <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td>{values.pollType}</td>
                    <td>{values.pollQuestion}</td>
                    <td>{values.createdBy.name}</td>
                    <td>{moment(values.startDate).format("MM-DD-YYYY")}</td>
                    <td>{moment(values.endDate).format("MM-DD-YYYY")}</td>
                    <td>{values.status}</td>
                    <td>
                      {" "}
                      <NavLink
                        to={{
                          aboutProps: { userData: values },
                        }}
                      >
                        <Tooltip content="View Poll">
                          <AiOutlineEye
                           customCss={css`
                          white-space: nowrap;
                        `}
                            onClick={this.toggle}
                            style={{ marginLeft: "10px", color: "blue" }}
                          />
                        </Tooltip>
                      </NavLink>{" "}
                      <Tooltip content=" Accept Poll "  customCss={css`
                          white-space: nowrap;
                        `}>
                        <AiOutlineCheck
                          onClick={(e) => this.changeStatus(e, values._id)}
                          style={{
                            color: "green",
                            fontWeight: "bold",
                            marginLeft: "10px",
                          }}
                        />
                      </Tooltip>
                      <Tooltip
                        content="Reject Poll"
                        customCss={css`
                          white-space: nowrap;
                        `}
                      >
                        <AiOutlineClose
                          onClick={(e) => this.disapprove(e, values._id)}
                          style={{ color: "red", marginLeft: "10px" }}
                        />
                      </Tooltip>
                    </td>
                    <td></td>
                  </tr>
                );
              })
            )}
            <Modal size="md" open={open} toggle={this.toggle}>
            <ModalHeader style={{ marginLeft: "0px" }}>
                <h4 style={{color:"black"}}>Poll Detail</h4>
              </ModalHeader>
              <ModalBody>
                <p
                  style={{
                    border: "4px solid black",
                    borderRadius: "20px",
                    padding: "15px",
                  }}
                >
                  <p style={{ color: "black" }}>
                    Poll Type:{" "}
                    {userData && userData._id
                      ? userData.pollType
                      : this.state.pollType}
                  </p>
                  <p style={{ color: "black" }}>
                    Poll Question:{" "}
                    {userData && userData._id
                      ? userData.pollQuestion
                      : this.state.pollQuestion}
                  </p>
                  <p style={{ color: "black" }}>
                    Created By:{" "}
                    {userData && userData._id
                      ? userData.createdBy.name
                      : this.state.createdBy.name}
                  </p>
                  <p style={{ color: "black" }}>
                    Department:{" "}
                    {userData && userData._id
                      ? userData.createdBy.department
                      : this.state.createdBy.department}
                  </p>
                  <p style={{ color: "black" }}>
                    Email:{" "}
                    {userData && userData._id
                      ? userData.createdBy.email
                      : this.state.createdBy.email}
                  </p>
                  <p style={{ color: "black" }}>
                    {" "}
                    Selected Audience:{" "}
                    {userData && userData._id
                      ? userData.selectedAudience
                      : this.state.selectedAudience
                     
                    }
                  </p>
                  <p style={{ color: "black" }}>
                    {" "}
                    Poll Options:{" "}
                    {userData && userData._id
                      ? userData.pollOptions
                      : this.state.pollOptions}
                  </p>
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
                </p>
                <Button
                  style={{ marginLeft: "100px" }}
                  type="secondary"
                  onClick={this.handleBack}
                >
                  Cancel
                </Button>
              </ModalBody>
            </Modal>
          </tbody>
        </Table>

        <br />
        <br />
        <br />
        <br />
        <br />
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
