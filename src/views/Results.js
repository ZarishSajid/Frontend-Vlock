import { NavLink } from "react-router-dom";
import React from "react";
import { Form, Typography } from "antd";
import {
  MDBCard,
  MDBCardTitle,
  MDBBtn,
  MDBRow,
  MDBCol,
  MDBIcon,
  MDBInput,
} from "mdbreact";
import {
  Card,
  CardBody,
  CardHeader,
  ListGroup,
  ListGroupItem,
  Row,
  Col,
  FormGroup,
  FormInput,
  FormSelect,
  FormTextarea,
  Button,
} from "shards-react";
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
  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    debugger;
    const userData =
      this.props.location.aboutProps && this.props.location.aboutProps.userData;
    const headers = {
      headers: {
        token: localStorage.getItem("token"),
      },
    };

    console.log("token in result page", headers.headers.token);
    axios
      .get(`http://localhost:8080/vlock/getresult/${userData._id}`, headers)
      .then((res) => {
        console.log("Poll Question", userData.pollQuestion);

        console.log("RESPONSE = ", res.data.data);
        this.setState({ pulls: res.data.data });

        // console.log("this.state.pulls", this.state.pulls);

        console.log(res.message);
      });
  }
  render() {
    const userData =
      this.props.location &&
      this.props.location.aboutProps &&
      this.props.location.aboutProps.userData;
    const { pulls } = this.state;
    // if (this.state.loading) return <Loader />;
    const { match } = this.props;

    return (
      <div>
        <br />
        <Form onSubmit={this.onRedirect}>
          <Card
            sm
            className="mb-4"
            style={{
              height: "43rem",
              width: "50rem ",
              marginTop: "30px",
              marginLeft: "150px",
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
                <center>Result</center>
              </h4>
            </CardHeader>
            <CardBody>
              <ListGroup flush>
                <p style={{ color: "black", fontWeight: "bold" }}>
                  Poll Question: {userData.pollQuestion}
                </p>

                <ul class="list-group">
                  <li class="list-group-item d-flex justify-content-between align-items-center">
                    Poll Options
                    <span class="badge badge-primary badge-pill">
                      Vote Count
                    </span>
                  </li>

                  {!pulls.length ? (
                    <p>No Data Found</p>
                  ) : (
                    pulls.map((values, index) => {
                      return (
                        <li
                          key={index}
                          class="list-group-item d-flex justify-content-between align-items-center"
                        >
                          {values.pollOption}
                          <span class="badge badge-primary badge-pill">
                            {values.voteCount}
                          </span>
                        </li>
                      );
                    })
                  )}
                </ul>
               
               <center> <NavLink
                  to={{
                    pathname: "/components/PollStatus",
                  }}
                >
                  <Button style={{ marginLeft: "30px" ,marginTop:"170px"}} type="secondary">
                    Back
                  </Button>
                </NavLink>
                </center>
              </ListGroup>
            </CardBody>
          </Card>
        </Form>
      </div>
    );
  }
}

const mapStateToProps = (CastVote) => {
  return { CastVote };
};

export default CastVote;
