import React, { Fragment } from "react";
import { Container, Button } from "shards-react";
import { AiFillDelete } from "react-icons/ai";
import { ImCross, ImCheckmark } from "react-icons/im";
import { RiDeleteBinLine } from "react-icons/fa";
import { Link, useHistory } from "react-router-dom";
import { Table } from "reactstrap";
import * as moment from "moment";
import { IoMdCreate } from "react-icons/io";
import getToken from "../helpers/auth";
import Tooltip from "react-simple-tooltip";
import { NavLink } from "react-router-dom";
import { Icon } from "antd";
import { AiOutlineRest } from "react-icons/ai";
import { Modal, ModalBody, ModalHeader } from "shards-react";
import { Redirect } from "react-router-dom";
import { AiOutlineEye } from "react-icons/ai";
import { Spinner } from "reactstrap";
import axios from "axios";
import ClipLoader from "react-spinners/ClipLoader";
import SweetAlert from "sweetalert-react/lib/SweetAlert";
import { css } from "@emotion/core";
import { AiFillEdit } from "react-icons/ai";
import { BsLayoutTextSidebarReverse } from "react-icons/bs";

const override = css`
  position: absolute;
  left: 40%;
  right: 0;
  top: 60%;
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
      loading: false,
      pulls: [],
      _id: "",
      index: "",
      fireRedirect: false,
      show: false,
      redirectRoute: "",
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
    axios
      .delete(`http://localhost:8080/vlock/poll/${id}`, headers)

      .then((res) => {
        console.log("RESPONSE = ", res._id);
        alert("Sucesfully Deleted");
        if (res.data.success === true) {
          this.fetchData();
        }
        console.log(res.message);
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
    console.log("result page", headers);

    axios.get(`http://localhost:8080/vlock/allresult`, headers).then((res) => {
      console.log("RESPONSE = ", res.data);
      this.setState({ loading: false, pulls: res.data.data });
      console.log("this.state.pulls", this.state.pulls);

      console.log(res.message);
    });
  }
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
  handleBack = () => {
    this.setState({
      //openActive: !this.state.openActive,
      open: !this.state.open,
    });
  };
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
        <h3 style={{ marginLeft: "400px", color: "black" }}>Poll List</h3>
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
              <th>Created By</th>
              <th> Poll Type</th>
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
                  colspan="12"
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
                    <td>{values.createdBy.name}</td>
                    <td>{values.pollType}</td>
                    <td>
                      {values.status == "approved"
                        ? "Approved"
                        : values.status == "disapproved"
                        ? "Disapproved"
                        : values.status == "pending"
                        ? "Pending"
                        : values.status == "started"
                        ? "Started"
                        : "Expired"}
                    </td>
                    <td>
                      {" "}
                      <NavLink
                        to={{
                          aboutProps: { userData: values },
                        }}
                      >
                        <Tooltip
                          content=" View Poll"
                          customCss={css`
                            white-space: nowrap;
                          `}
                        >
                          <AiOutlineEye
                            onClick={this.toggle}
                            style={{ marginLeft: "10px", color: "blue" }}
                          />
                        </Tooltip>
                      </NavLink>
                      
                      {values.status !== "pending" ? null : (
                        <NavLink
                          disabled={values.status !== "pending"}
                          to={{
                            pathname: "/components/editPoll",
                            aboutProps: { userData: values },
                          }}
                        >
                          <Tooltip
                            content="Edit Poll"
                            customCss={css`
                              white-space: nowrap;
                            `}
                          >
                            <AiFillEdit
                              style={{
                                marginTop: "3px",
                                marginLeft: "10px",
                                color: "blue",
                              }}
                              disabled={values.status !== "pending"}
                            />
                          </Tooltip>
                        </NavLink>
                      )}
                      {/* Expireeee */}
                      {values.status !== "expired" ? null : (
                        <NavLink
                          disabled={values.status !== "pending"}
                          to={{
                            pathname: "/components/Results",
                            aboutProps: { userData: values },
                          }}
                        >
                          <Tooltip
                            content=" View Result"
                            customCss={css`
                              white-space: nowrap;
                            `}
                          >
                            <BsLayoutTextSidebarReverse
                              style={{
                                marginTop: "3px",
                                marginLeft: "10px",
                                color: "blue",
                              }}
                              disabled={values.status !== "expired"}
                            />
                          </Tooltip>
                        </NavLink>
                      )}
                    </td>
                    <td></td>
                  </tr>
                );
              })
            )}
            <Modal size="md" open={open} toggle={this.toggle}>
              <center>
                <h4 style={{ marginTop: "30px", color: "black" }}>
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
                    {userData && userData._id
                      ? userData.createdBy.name
                      : this.state.createdBy.name}
                  </p> */}
                  <p style={{ color: "black" }}>
                    Email:{" "}
                    {userData && userData._id
                      ? userData.createdBy.email
                      : this.state.createdBy.email}
                  </p>
                 
                  Poll Options:{" "}
                  {userData && userData._id ? (
                    userData.pollOptions.map((option) => (
                      <li style={{ color: "black" }}>{option}</li>
                    ))
                  ) : (
                    <p style={{ color: "black" }}>{this.state.pollOptions}</p>
                  )}
                  <p style={{ color: "black" }}>
                    <br />
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
                <center>
                  {" "}
                  <Button
                    style={{ marginLeft: "0px" }}
                    type="secondary"
                    onClick={this.handleBack}
                  >
                    Cancel
                  </Button>
                </center>
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
