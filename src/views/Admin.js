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
import {
  chartExample1,
  chartExample2,
  chartExample3,
  chartExample4,
} from "../../src/variables/charts";
import { Link } from "react-router-dom";
import { ButtonGroup } from "reactstrap";
import axios from "axios";

import classNames from "classnames";
import { Line, Pie, Doughnut } from "react-chartjs-2";
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
const pieChart = {
	labels: ["Accepted", "Rejected", "Pending"],
	datasets: [{
		data: [0,0,0],
		backgroundColor: [
      "rgba(127, 167, 179) ",
      "rgba(113, 115, 120)",
      "rgba(86,156,229)",
		],
      hoverBorderColor:[ "#ffffff",

		]
	}]
}
export default class Admin extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      approvedCount: "",
      disapprovedCount: "",
      pendingCount: "",
      bigChartData: "data1",
      isLoading: true,
      pulls: [],
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
      approvedCount: this.state.approvedCount,
      disapprovedCount: this.state.disapprovedCount,
      bigChartData: this.state.bigChartData,
    };
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
      .get(`http://localhost:8080/vlock/poll/status`, headers, data)
      //  console.log("header")

      .then((res) => {
        // console.log("RESPONSE = ", res.data);
        this.setState({ pulls: res.data });
        // console.log("approved count  =", res.data.data.approvedCount);
        // console.log("poending count  =", res.data.data.pendingCount);
        // console.log(
        //   "disapprovedCount count  =",
        //   res.data.data.disapprovedCount
        // );

        this.state.disapprovedCount = res.data.data.disapprovedCount;

        this.state.approvedCount = res.data.data.approvedCount;

        this.state.pendingCount = res.data.data.pendingCount;
        pieChart.datasets[0].data = [this.state.disapprovedCount,this.state.approvedCount,this.state.pendingCount]
        console.log(
          "this.state.disapprovedCount  =",
          this.state.disapprovedCount
        );
        console.log("this.state.approvedCount  =", this.state.approvedCount);
        console.log("this.state.pendingCount  =", this.state.pendingCount);

        //local storage
        localStorage.setItem("approve count", this.state.approvedCount);
        localStorage.setItem("disapprove count ", this.state.disapprovedCount);
        localStorage.setItem("pending count ", this.state.pendingCount);

        console.log(res.message);
      });
  }
  render() {
    let { pulls } = this.state;
    // const {approvedCount} = pulls;
    console.log("pulsss12345s", pulls);
    console.log("ttttttttt", JSON.parse(localStorage.getItem("days")));
    const data = pulls;

    // const {approvedCount} = data;
    // pulls = JSON.stringify(pulls);
    // pulls = JSON.parse(pulls);
    // const {success, data } = pulls;

    return (
      <Container fluid className="main-content-container px-4">
        {/* Page Header */}
        <Row noGutters className="page-header py-4">
          <Separator className="mb-5" />

          <PageTitle
            title=" Dashboard"
            subtitle=""
            className="text-sm-left mb-3"
            style={{ marginLeft: "380px", color: "black" }}
          />
        </Row>

        <Row>
          <Col>
            <Card className="mb-4" style={{ color: "" }}>
              <CardBody style={{backgroundColor:"#7FA7B3"}}>
                <br />
                <center>
                  {" "}
                  <FaPoll style={{ color: "white" }} />
                </center>
                <center>
                  {" "}
                  <CardTitle style={{color:"white"}}>Polls Approved</CardTitle>
                </center>
                <center>
                  {" "}
                  <p style={{ color: "white" ,fontWeight:"bold"}}>{this.state.approvedCount}</p>
                </center>
              </CardBody>
            </Card>
          </Col>
          <Col>
            <Card className="mb-4">
              <CardBody style={{backgroundColor:"#717378"}}>
                <br />
                <center>
                  {" "}
                  <FaPoll style={{ color: "white" }} />
                </center>
                <center>
                  {" "}
                  <CardTitle style={{color:"white"}}>Polls Dispproved</CardTitle>
                </center>
                <center>
                  {" "}
                  <p style={{ color: "white",fontWeight:"bold" }}>{this.state.disapprovedCount}</p>
                </center>
              </CardBody>
            </Card>
          </Col>
          <Col>
            <Card className="mb-4">
              <CardBody style={{backgroundColor:"#569CE5"}}>
                <br />
                <center>
                  {" "}
                  <BsFillPeopleFill style={{ color: "white", size: "80px" }} />
                </center>
                <center>
                  {" "}
                  <CardTitle style={{color:"white"}}>Polls Request</CardTitle>
                </center>
                <center>
                  {" "}
                  <p style={{ color: "white",fontWeight:"bold", }}>{this.state.pendingCount}</p>
                </center>
              </CardBody>
            </Card>
          </Col>
          <br />
        </Row>

        <Row>
          <Col lg="6" sm="6">
            <Card className="card-chart">
              <CardHeader >
                <h5 className="card-category">Weekly Polls</h5>
                <CardTitle tag="h3"></CardTitle>
              </CardHeader>
              <CardBody style={{padding:"0 1.75rem",}}>
                <div className="chart-area">
                  <Line data={linChart} />
                </div>
              </CardBody>
            </Card>
          </Col>

          <Col lg="6" sm="6">
            <Card small className="h-100">
            <CardHeader className="border-bottom">

        </CardHeader>
        <CardBody className="d-flex py-0" style={{height:"15px",marginTop:"0px"}}>
           < Doughnut data={pieChart} />
        </CardBody>
           
              {/* <UsersByDevice /> */}
            </Card>
          </Col>
        </Row>

        {/* <Row> */}
        {/* <Col sm="6"  style={{height:"00px"}}>
        <Card body style={{height:"180px"}}>
         <h5 style={{marginLeft:"190px"}}>Notification</h5>
          <CardText  style={{marginLeft:"0px",backgroundColor:"#ABDADF"}}>    You Approved Zara's Polls.</CardText>
          <CardText  style={{marginLeft:"0px",backgroundColor:"#ABDADF"}}>You Deleted Tanzeela Riaz Profile.
</CardText>
<CardText  style={{marginLeft:"0px",backgroundColor:"#ABDADF"}}>You Disapproved Bisma Raza Poll.
</CardText>
        </Card>
      </Col> */}
        {/* <Col sm="6"> */}
        {/* <Card body>
          <CardTitle>Special Title Treatment</CardTitle>
          <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
          <Button>Go somewhere</Button>
        </Card> */}
        {/* </Col> */}
        {/* </Row> */}

        <Row>
          {/* Users Overview */}

          {/* 
      {/* Users by Device */}

          {/* New Draft */}

          {/* <Col lg="4" md="6" sm="12" className="mb-4">
        <NewDraft />
      </Col> */}

          {/* Discussions */}
          {/* <Col lg="5" md="12" sm="12" className="mb-4">
        <Discussions />
      </Col> */}

          {/* Top Referrals */}
          {/* <Col lg="3" md="12" sm="12" className="mb-4">
        <TopReferrals />
      </Col> */}
        </Row>
        {/* <Col lg="12" md="10" sm="8" className="mb-4"  >
        <UsersOverview />
      </Col> */}
      </Container>
    );
  }
}

Admin.propTypes = {
  /**
   * The small stats dataset.
   */
  smallStats: PropTypes.array,
};

Admin.defaultProps = {
  smallStats: [
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
  ],
};
