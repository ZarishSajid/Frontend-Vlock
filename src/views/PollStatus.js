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
        window.location.reload(false);
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
        <h3 style={{ marginLeft: "400px" }}>Poll Status</h3>
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
                    <td>{values.pollType}</td>
                    <td>{values.createdBy.name}</td>
                    <td>{moment(values.startDate).format("MM-DD-YYYY")}</td>
                    <td>{moment(values.endDate).format("MM-DD-YYYY")}</td>
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
                      <Tooltip
                          content=" Delete Poll"
                          customCss={css`
                            white-space: nowrap;
                          `}
                        >
                      <AiOutlineRest
                        style={{ marginLeft: "10px", color: "blue" }}
                        onClick={(e) => this.deletePoll(e, values._id)}
                      ></AiOutlineRest>
                      </Tooltip>
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
                            style={{ marginTop: "3px", marginLeft: "10px",color:"blue" }}
                            disabled={values.status !== "pending"}
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
              <ModalHeader style={{ marginLeft: "0px" }}>
                <h4 style={{ marginLeft: "150px" }}>Poll Detail</h4>
              </ModalHeader>
              <ModalBody>
                <p
                  style={{
                    border: "4px solid blue",
                    borderRadius: "20px",
                    padding: "15px",
                  }}
                >
                  <p style={{ color: "blue" }}>
                    Poll Type:{" "}
                    {userData && userData._id
                      ? userData.pollType
                      : this.state.pollType}
                  </p>
                  <p style={{ color: "blue" }}>
                    Poll Question:{" "}
                    {userData && userData._id
                      ? userData.pollQuestion
                      : this.state.pollQuestion}
                  </p>
                  <p style={{ color: "blue" }}>
                    Created By:{" "}
                    {userData && userData._id
                      ? userData.createdBy.name
                      : this.state.createdBy.name}
                  </p>

                  <p style={{ color: "blue" }}>
                    Email:{" "}
                    {userData && userData._id
                      ? userData.createdBy.email
                      : this.state.createdBy.email}
                  </p>

                  <p style={{ color: "blue" }}>
                    {" "}
                    Selected Audience:{" "}
                    {userData && userData._id
                      ? userData.selectedAudience
                      : this.state.selectedAudience}
                  </p>
                  <p style={{ color: "blue" }}>
                    {" "}
                    Poll Options:{" "}
                    {userData && userData._id
                      ? userData.pollOptions
                      : this.state.pollOptions}
                  </p>
                  <p style={{ color: "blue" }}>
                    Start Date:
                    {userData && userData._id
                      ? moment(userData.startDate).format("MM-DD-YYYY")
                      : this.state.startDate}
                  </p>
                  <p style={{ color: "blue" }}>
                    End Date:{" "}
                    {userData && userData._id
                      ? moment(userData.endDate).format("MM-DD-YYYY")
                      : this.state.endDate}
                  </p>
                </p>
                {/* <Button
                  style={{ marginLeft: "150px" }}
                  type="secondary"
                  onClick={this.handleBack}
                >
                  Cancel
                </Button> */}
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
