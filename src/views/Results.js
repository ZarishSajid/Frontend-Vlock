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
    const userData =
    this.props.location.aboutProps && this.props.location.aboutProps.userData;
    const headers = {
      headers: {
        token:localStorage.getItem("token"),
      },
    };

 console.log("token in result page",headers.headers.token)
    axios.post(`http://localhost:8080/vlock/getresult/${userData._id}`,).then((res) => {
      
      console.log("RESPONSE = ", res.data);
      // this.setState({ loading: false, pulls: res.data.data });
      // console.log("this.state.pulls", this.state.pulls);

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
