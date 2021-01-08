import React from "react";
import PropTypes from "prop-types";
import {
  Container,
  Row,
  Col,
  Button,
  CardTitle,
  CardBody,
  CardHeader,
  Card,
} from "shards-react";
import { SignalFilled } from "@ant-design/icons";
import { TeamOutlined } from "@ant-design/icons";
import { Colxx, Separator } from "../../src/common/CustomBootstrap";
import PageTitle from "./../components/common/PageTitle";
import SmallStats from "./../components/common/SmallStats";
import UsersOverview from "./../components/blog/UsersOverview";
import UsersByDevice from "./../components/blog/UsersByDevice";
import NewDraft from "./../components/blog/NewDraft";
import Discussions from "./../components/blog/Discussions";
import TopReferrals from "./../components/common/TopReferrals";
import { FaPoll } from "react-icons/fa";
import { BsFillPeopleFill } from "react-icons/bs";
import { CardText } from "reactstrap";
import { BiBellMinus } from "react-icons/bi";
import axios from "axios";

import { chartExample2 } from "../../src/variables/charts";
import classNames from "classnames";
import { Line, Pie, Bar } from "react-chartjs-2";
const linChart = {
  labels: ["Fri", "Thur", "Wed", "Tue", "Mon", "Sat", "Sun"],
  datasets: [
    {
      label: "Previous Week",
      fill: false,
      lineTension: 0.1,
      backgroundColor: "rgba(75,192,192,0.4)",
      borderColor: "rgba(75,192,192,1)",
      borderCapStyle: "butt",
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: "miter",
      pointBorderColor: "rgba(75,192,192,1)",
      pointBackgroundColor: "#fff",
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: "rgba(75,192,192,1)",
      pointHoverBorderColor: "rgba(220,220,220,1)",
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: [0, 0, 0, 0, 0, 0, 0],
    },
  ],
};
class UniverityAdministration extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pollCreated: "",
      newPoll: "",
      castedVotes: "",
      isLoading: true,
      pulls: [],
      pullss: [],
      casted: [],
      bigChartData: "data1",
    };
  }
  setBgChartData = (name) => {
    this.setState({
      bigChartData: name,
    });
  };
  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    const headers = {
      headers: {
        token: localStorage.getItem("token"),
      },
    };
    const data = {
      pollCreated: this.state.pollCreated,
    };
    axios
      .get(`http://localhost:8080/vlock/total`, headers, data)
      //  console.log("header")

      .then((res) => {
        // console.log("RESPONSE = ", res.data);
        this.setState({ pulls: res.data.data });
        console.log("poll count in uni admin  =", res.data.data);

        this.state.pollCreated = res.data.data;

        console.log("data received", this.state.pollCreated);

        console.log(res.message);
      });
    axios.get("http://localhost:8080/vlock/graph", headers).then((res) => {
      // console.log("RESPONSE = ", res.data);
      this.setState({ pulls: res.data });
      console.log("weekly poll graph data", res.data.data);
      console.log("weekly poll graph days", res.data.days);
      this.state.data = res.data.data;
      linChart.datasets[0].data = this.state.data;
      linChart.labels = res.data.days;
      this.state.days = res.data.days;
      console.log("this.data.data", data.data);
      console.log("this.state.data", this.state.data);
      console.log("this.state.days", this.state.days);
      localStorage.setItem("data ", this.state.data);
      localStorage.setItem("days ", this.state.days);
    });

    axios
      .get(`http://localhost:8080/vlock/count`, headers)
      //  console.log("header")

      .then((res) => {
        this.setState({ pullss: res.data.data });
        console.log("new poll  =", res.data.data);

        this.state.newPoll = res.data.data;

        console.log("new poll data", this.state.newPoll);

        console.log(res.message);
      });
    axios
      .get(`http://localhost:8080/vlock/totalpolls`, headers)
      //  console.log("header")

      .then((res) => {
        this.setState({ casted: res.data.data });
        console.log("casted votes  =", res.data.data);

        this.state.castedVotes = res.data.data;

        console.log("casted votess", this.state.castedVotes);

        console.log(res.message);
      });
  }
  render() {
    let { pulls } = this.state;
    let { pullss } = this.state;
    let { casted } = this.state;
    console.log("poll created in render", pulls);
    console.log("new polls in render", pullss);
    console.log("casted votes in render", casted);

    const data = pulls;
    return (
      <Container fluid className="main-content-container px-4">
        <Separator className="mb-5" />
        <h4 style={{ marginLeft: "400px", color: "black" }}> Dashboard</h4>

        <Row>
          <Col>
            <Card small className="mb-4"style={{backgroundColor:"#7FA7B3"}} >
              <br />
              <CardBody >
                <center>
                  {" "}
                  <FaPoll style={{ color: "white" }}  />
                </center>
                <center>
                  {" "}
                  <CardTitle style={{color:"white"}}>Poll Created </CardTitle>
                </center>
                <center>
                  {" "}
                  <p style={{color:"white",fontWeight:"bold"}}>{this.state.pollCreated}</p>
                </center>
              </CardBody>
            </Card>
          </Col>
          <Col>
            <Card small className="mb-4" style={{backgroundColor:"#717378"}}>
              <br />
              <CardBody  >
                <center>
                  {" "}
                  <FaPoll style={{ color: "white" }} />
                </center>
                <center>
                  {" "}
                  <CardTitle style={{color:"white"}}>New Poll</CardTitle>
                </center>
                <center>
                  {" "}
                  <p style={{ color: "white",fontWeight:"bold" }}>{this.state.newPoll}</p>
                </center>
              </CardBody>
            </Card>
          </Col>
          <Col>
            <Card small className="mb-4" >
              <CardBody style={{backgroundColor:"#569CE5"}}>
                <br />
                <center>
                  {" "}
                  <FaPoll style={{ color: "white" }} />
                </center>
                <center>
                  {" "}
                  <CardTitle style={{color:"white"}}> Casted Votes</CardTitle>
                </center>
                <center>
                  <p style={{color:"white",fontWeight:"bold"}}>{this.state.castedVotes}</p>
                </center>
              </CardBody>
            </Card>
          </Col>
          <br />
        </Row>

        <Row></Row>
        <Col>
          <Card width="100" height="50" className="card-chart">
            <CardHeader>
              <h5 className="card-category">Weekly Polls</h5>
              <CardTitle tag="h3"></CardTitle>
            </CardHeader>
            <CardBody>
              <div className="chart-area">
                <Line data={linChart} width={515} height={110} />
              </div>
            </CardBody>
          </Card>
        </Col>
        {/* <Col lg="12" md="10" sm="8" className="mb-4"  >
        <UsersOverview />
      </Col> */}
      </Container>
    );
  }
}
// UniverityAdministration.propTypes = {
//   /**
//    * The small stats dataset.
//    */
//   smallStats: PropTypes.array
// };

// UniverityAdministration.defaultProps = {
//   smallStats: [
// {

//   // label: "Polls Approved",
//   // value: " You Created 4 new Polls",

//   // percentage: "4.7%",

//   // increase: true,
//   // chartLabels: [null, null, null, null, null, null, null],
//   // attrs: { md: "6", sm: "6" },
//   // datasets: [
//   //   {
//   //     label: "Today",
//   //     fill: "start",
//   //     borderWidth: 1.5,
//   //     backgroundColor: "rgba(0, 184, 216, 0.1)",
//   //     borderColor: "rgb(0, 184, 216)",
//   //     data: [1, 2, 1, 3, 5, 4, 7]
//     // }
//   // ]
// },
// {
//   label: "Pages",
//   value: "182",
//   percentage: "12.4",
//   increase: true,
//   chartLabels: [null, null, null, null, null, null, null],
//   attrs: { md: "6", sm: "6" },
//   datasets: [
//     {
//       label: "Today",
//       fill: "start",
//       borderWidth: 1.5,
//       backgroundColor: "rgba(23,198,113,0.1)",
//       borderColor: "rgb(23,198,113)",
//       data: [1, 2, 3, 3, 3, 4, 4]
//     }
//   ]
// },
// {
//   label: "Comments",
//   value: "8,147",
//   percentage: "3.8%",
//   increase: false,
//   decrease: true,
//   chartLabels: [null, null, null, null, null, null, null],
//   attrs: { md: "4", sm: "6" },
//   datasets: [
//     {
//       label: "Today",
//       fill: "start",
//       borderWidth: 1.5,
//       backgroundColor: "rgba(255,180,0,0.1)",
//       borderColor: "rgb(255,180,0)",
//       data: [2, 3, 3, 3, 4, 3, 3]
//     }
//   ]
// },
// {
//   label: "New Customers",
//   value: "29",
//   percentage: "2.71%",
//   increase: false,
//   decrease: true,
//   chartLabels: [null, null, null, null, null, null, null],
//   attrs: { md: "4", sm: "6" },
//   datasets: [
//     {
//       label: "Today",
//       fill: "start",
//       borderWidth: 1.5,
//       backgroundColor: "rgba(255,65,105,0.1)",
//       borderColor: "rgb(255,65,105)",
//       data: [1, 7, 1, 3, 1, 4, 8]
//     }
//   ]
// },
// {
//   label: "Subscribers",
//   value: "17,281",
//   percentage: "2.4%",
//   increase: false,
//   decrease: true,
//   chartLabels: [null, null, null, null, null, null, null],
//   attrs: { md: "4", sm: "6" },
//   datasets: [
//     {
//       label: "Today",
//       fill: "start",
//       borderWidth: 1.5,
//       backgroundColor: "rgb(0,123,255,0.1)",
//       borderColor: "rgb(0,123,255)",
//       data: [3, 2, 3, 2, 4, 5, 4]
//     }
//   ]
// }
//   ]
// };

export default UniverityAdministration;
