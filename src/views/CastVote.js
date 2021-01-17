import { NavLink } from "react-router-dom";
import React from "react";
import { Container, Button } from "shards-react";
import { ImCross, ImCheckmark } from "react-icons/im";
import { RiDeleteBinLine } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Tooltip } from "antd";
import { Table } from "reactstrap";
import * as moment from "moment";
import { IoMdCreate } from "react-icons/io";
import getToken from "../helpers/auth";
// import Loader from "Loader"
import { AiOutlineEye } from "react-icons/ai";
import { Spinner } from "reactstrap";
import axios from "axios";
import ClipLoader from "react-spinners/ClipLoader";
import Loader from "react-loader-spinner";
import { css } from "@emotion/core";
const override = css`
  position: absolute;
  left: 40%;
  right: 0;
  top: 50%;
  border-color: blue;
`;
class CastVote extends React.Component {
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
    };
  }
  sendData(i) {
    const headers = {
      headers: {
        token:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzYXBJRCI6IjIzMDAiLCJ0aW1lIjoxNjA1NTU1NDA1NTk0LCJpYXQiOjE2MDU1NTU0MDUsImV4cCI6MTYwNTU1OTAwNX0.jiqGzFmRA2OuUCyxccqwew0g0WbcQPUtjrwS03t7aNA",
      },
    };
    const data = {
      id: this.state.pulls[i]._id,
    };
    console.log("id inside send data", data.id);
    const id = data.id;
    axios
      .get(` http://localhost:8080/vlock/polls`, headers)

      .then((res) => {
        console.log("RESPONSE = ", res._id);
        this.setState({ isLoading: false, pulls: res._id });
        console.log(this.state.pulls);

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
    axios
      .get(`http://localhost:8080/vlock/polls`, headers, data)
      //  console.log("header")

      .then((res) => {
        console.log("RESPONSE = ", res.data.data);
        console.log("iddd", res._id);
        this.setState({ loading: false, pulls: res.data.data });
        // console.log("this.state.pulls",this.state.pulls);
        // console.log("this.state.pulls",this.state.pulls[0]._id);
        console.log(res.message);
      });
  }
  render() {
    const { pulls } = this.state;
    // if (this.state.loading) return <Loader />;
    const { match } = this.props;

    return (
      <div>
        <br />
        <h3 style={{ marginLeft: "400px",color:"black" }}>Cast Vote</h3>

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
              <th>Start Date</th>
              <th>End Date</th>
              <th>Action</th>
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
                  No Poll are Available
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
                      <NavLink
                        to={{
                          pathname: "/components/blockchain",
                          aboutProps: { userData: values },
                        }}
                      >
                        <Button
                          size="sm"
                          style={{ marginLeft: "10px", marginTop: "6px" }}
                        >
                          Cast Vote
                        </Button>
                      </NavLink>
                    </td>
                    
                  </tr>
                );
              })
            )}
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
      </div>
    );
  }
}

const mapStateToProps = (CastVote) => {
  return { CastVote };
};

export default CastVote;
