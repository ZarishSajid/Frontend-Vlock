import React from "react";
import { ListGroup, ListGroupItem, FormInput, Button } from "shards-react";
import { Container, Row, Col, Card, CardHeader, CardBody } from "shards-react";
import PageTitle from "../components/common/PageTitle";
import ReactDOM from "react-dom";
import Web3 from "web3";
import TruffleContract from "truffle-contract";
import Election from "../build/contracts/Election.json";
import axios from "axios";
import { Radio, Form } from "antd";
class Test extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pollId: "",
      pollId1: "",
      voteCount1: 0,
      pollOption1: "",

      account: "0x0",
      polls: [],
      selectedOption: "",
      hasVoted: false,
      loading: true,
      voting: false,
      pollOption: "",
      voteCount: 0,
    };

    var web3 = new Web3();
    if (window.ethereum) {
      web3 = new Web3(window.ethereum);
      try {
        window.ethereum.enable().then(function() {
          // User has allowed account access to DApp...
        });
      } catch (e) {
        // User has denied account access to DApp...
      }
    }
    // Legacy DApp Browsers
    else if (window.web3) {
      web3 = new Web3(web3.currentProvider);
    }
    // Non-DApp Browsers
    else {
      alert("You have to install MetaMask !");
    }
    window.ethereum.enable();
    if (typeof web3 != "undefined") {
      this.web3Provider = web3.currentProvider;
      window.ethereum.enable();
    } else {
      this.web3Provider = new Web3.providers.HttpProvider(
        "http://127.0.0.1:8545"
      );
      window.ethereum.enable();
    }

    web3.eth.getAccounts((err, res) => {
      console.log("getAccounts = ", res);
    });

    this.web3 = new Web3(this.web3Provider);
    this.castVoteToZara = this.castVoteToZara.bind(this);
    this.watchEvents = this.watchEvents.bind(this);
    this.election = TruffleContract(Election);
    this.election.setProvider(this.web3Provider);
  }

  async componentDidMount() {
    console.log("inside componentDidMount ");
    // console.log(" Account************", this.state.account);
    // this.web3.eth.getAccounts()
    // .then(console.log);
    // web3-eth-accounts
    // const accounting = await this.web3.eth.getAccounts();
    // const accountAddress = await accounting[0];
    // console.log("accountAddress",accountAddress);
    // this.web3.eth.getCoinbase(async (err, account) => {
    // console.log("getCoinbase = ", account);
    // // this.state.account =
    // this.setState({ account: account });
    // const accounts = await this.web3.eth.getAccounts();
    // console.log("getCoinbase => getAccounts === ", accounts);

    // this.web3.eth.getAccounts()
    // .then((accounts) => {
    // console.log(accounts);
    // });

    // this.setState({ account });
    // this.pollInstance = await this.election.deployed();
    // console.log("PollInstance", this.pollInstance);
    // this.watchEvents()
    // const voted = await this.pollInstance.voted("1", "A");

    // this.pollInstance.voted("1", "A", { from: this.state.account }).then((voted) => {
    // console.log("voted = ", voted);
    // const pollCount = await this.pollInstance.pollCount();
    // console.log("pollCount = ", pollCount);
    // const polls = [...this.state.polls];
    // for (var i = 0; i <= pollCount; i++) {
    // const poll = await this.pollInstance.polls(i);
    // polls.push({ id: poll[1], option: poll[2], voteCount: poll[3] });
    // }
    // this.setState({ polls: polls });

    // console.log(
    // "\n downside of votecast method polls list of polls = ",
    // JSON.stringify(polls),polls.length
    // );
    // this.pollInstance.voters(this.state.account).then((hasVoted) => {
    // this.setState({ hasVoted, loading: false });
    // });
    // });
    // });
  }

  selectPollOption = (e) => {
    this.setState({ selectedOption: e.target.value });
    console.log("radio butto selected stateee!!!");
  };

  async castVoteToZara(e, values) {
    e.preventDefault();
    const userData =
    this.props.location &&
    this.props.location.aboutProps &&
    this.props.location.aboutProps.userData;
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        console.log("sselected options!!!", values.pollOption);
        console.log("iddddd", userData._id);

        console.log("PollInstance", this.pollInstance);
        this.web3.eth.getCoinbase(async (err, account) => {
          console.log("getCoinbase = ", account);
          this.setState({ account: account });
          this.election.deployed().then(async (pollInstance) => {
            this.pollInstance = pollInstance;
            // var mypolls=[];
            // mypolls=this.pollInstance.getAll();
            // console.log("Call to get all", mypolls);
            try {
              const results = await this.pollInstance.vote(
                userData._id,
                values.pollOption,
                {
                  from: this.state.account,
                }
              );
              // console.log("Inside Cast vote Method", results);
              //API
              const data = {
                pollId: userData._id,
              };
              const headers = {
                headers: {
                  token: localStorage.getItem("token"),
                },
              };
              console.log("token  before votess api", headers, data);
              axios
                .post(`http://localhost:8080/vlock/votes`, data, headers)
                .then((res) => {
                  console.log("***Cast Vote API****", res);
                });

              //API
            } catch (e) {
              console.log("Error from log", e);
            }
            // .then(async (result) => {

            //    console.log("PollInstance", this.pollInstance);
            this.setState({ hasVoted: true });
            const pollCount = await this.pollInstance.getLength();
            //  console.log("getLength = ", pollCount);
            // const polls = [...this.state.polls];
            const polls = [];
            for (var i = 0; i < pollCount; i++) {
              const poll = await this.pollInstance.polls(i);
              polls.push({
                pollId1: poll[0],
                pollOption1: poll[1],
                voteCount1: poll[2],
              });
            }
            this.setState({ polls: polls });

            // console.log(
            //   "\n polls list of polls = ",
            //   JSON.stringify(polls),
            //   polls.length
            // );

            const data = {
              pollId: this.pollId,
            };

            //
            polls.map((value, index) => {
              //  console.log("mapping function", value);
              //console.log("Vote count", value.voteCount1.toString());
              this.pollId = value.pollId1;
              this.pollOption = value.pollOption1;
              this.voteCount = value.voteCount1;
              // console.log("poll id  before data ", value.pollId1);
              // console.log("poll option   before data", value.pollOption1);
              //console.log("vote count   before data", value.voteCount1);
              // console.log("poll id  before data", this.pollId);

              //API START

              //            console.log("token in blockchain page",headers)

              const data = {
                pollId: this.pollId,
                pollOption: this.pollOption,
                voteCount: this.voteCount,
              };
              //  console.log("poll id  after data", this.pollId);
              //  console.log("poll option  after data", this.pollOption);
              //  console.log("vote count   after data", this.voteCount);

              const headers = {
                headers: {
                  token: localStorage.getItem("token"),
                },
              };
              //            console.log("token in blockchain page",headers)
              axios
                .post(`http://localhost:8080/vlock/results`, data, headers)
                .then((res) => {
                  // console.log("inside blockchain api Respnse",res)
                });

              // console.log("token in blockchain page",headers)

              //ENd
            });

            // });

            // console.log("PollInstance", this.pollInstance);
            // const getall =[];
            // getall= await this.pollInstance.getAll();
            // console.log("Get All MEthod", getall);

            // for(var i=0; i<polls.length; i++)
            // {
            // console.log("Vote count of "+polls[i].id+" of "+polls[i].option+" is "+polls[i].voteCount);

            // }
            // const result = await this.pollInstance.getAll();
            // console.log("Get All MEthod", result);
            // this.pollInstance.getAll().then((polls) => {
            // console.log("Get All MEthod", polls);
            // });
            // const p = await this.pollInstance.getAll();
            // console.log("Get All MEthod2 s", JSON.stringify(p));
            // const getAll = await instance.methods.getAll().call();
            // try {
            // const res = await this.pollInstance.contract.getAll().call();
            // console.log("Get All", res);

            // // ** Code for SS2 *//
            // // this.pollInstance.contract.getAllData().call((result)=> {
            // // console.log("get all method",result)
            // // })
            // // ** Code for SS2 *//
            // // ** Code for SS1 *//
            // // const p = await this.pollInstance.getAllData();
            // // console.log("Get All MEthod2 s", p);
            // // ** Code for SS1 *//
            // // ** Code for SS3 *//
            // // const getAll = await this.pollInstance.contract.getAllData().call();
            // // console.log("GET ALL METHOD", getAll);
            // // getAll.map((value, index) => {
            // // console.log("value get all", value);
            // // });
            // // ** Code for SS3 *//
            // // ***** Code for SS4****//
            // // const results = await this.pollInstance
            // // .getAll( {
            // // from: this.state.account,
            // // })
            // // .then((result) => console.log("get ALL vote", result, results));

            // this.pollInstance.getAll().then((polls) => {
            // console.log("Get All MEthod", polls);
            // });
            // // // ** Code for SS4 *//
            // // ** Code for SS5 *//
            // // const p = await this.pollInstance.getAllData();
            // // console.log("Get All MEthod2 s", JSON.stringify(p));
            // // ** Code for SS5 *//

            // } catch (e) {
            // console.log("Get All MEthod error", e);
            // }
          });
        });
      }
    });
  }

  watchEvents() {
    // TODO: trigger event when vote is counted, not when component renders
    console.log("zara test inside watchevent");
    this.pollInstance
      .voteEvent(
        {},
        {
          fromBlock: 0,
          toBlock: "latest",
        }
      )
      .watch((error, event) => {
        this.setState({ voting: false });
      });
  }

  // castVote(candidateId) {
  // console.log("zara test castVote", candidateId);
  // this.setState({ voting: true });
  // //this.loginInstance.

  // // this.PollInstance.vote(candidateId, {
  // // from: this.state.account,
  // // }).then((result) => this.setState({ hasVoted: true }));
  // }

  drawGrid() {
    return (
      <Row>
        <Col>
          {/* <Card small className="mb-4">
<CardHeader className="border-bottom"></CardHeader>
<CardBody className="p-0 pb-3">
{this.state.loading || this.state.voting ? (
<p className="text-center">Loading...</p>
) : (
<table className="table mb-0">
<tbody>
<tr>
<td>
{this.state.polls.map((poll) => {
console.log("inside loop = ", poll.id);
return (
<tr>
<td></td>

{poll.option}
</tr>
);
})}
</td>
</tr>
</tbody>
</table>
)}
<hr />
{!this.state.hasVoted ? (
<Form polls={this.state.polls} castVote={this.castVote} />
) : null}
<p>Your account: {this.state.account}</p>
</CardBody>
</Card> */}
        </Col>
      </Row>
    );
  }

  render() {
    const { form } = this.props;
    const { getFieldDecorator } = form;
    const userData =
      this.props.location &&
      this.props.location.aboutProps &&
      this.props.location.aboutProps.userData;
    console.log(" ++++ inside blockchain", userData);
    return (
      <Container fluid className="main-content-container px-4">
        <Row noGutters className="page-header py-4">
          <PageTitle className="text-sm-left" />
        </Row>
        {/* {/ {/ {this.drawGrid()} /} /} */}
        <Row>
          <Col>
            <Card >
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
                <center>Cast Vote</center>
              </h4>
            </CardHeader>
              <ListGroup flush>
                <ListGroupItem className="p-3">
                  <Row>
                    <Col md="6" className="form-group">
                      <br/>
                   <label
                        style={{ color: "black",marginLeft:"30px", fontWeight: "bold" }}
                        htmlFor=""
                      >
                        {" "}
                        Poll Question
                      </label>
                      <p
                        style={{
                          marginLeft:"30px",
                          border: "1px solid grey",
                          borderRadius: "10px",
                          padding: "15px",
                          color: "black",
                        }}
                      >
                        {userData && userData._id
                          ? userData.pollQuestion
                          : this.state.pollQuestion}
                      </p>
                     
                      <Form  onSubmit={this.castVoteToZara}>
                        {userData &&
                          userData._id &&
                          userData.pollOptions &&
                          userData.pollOptions.length > 0 &&
                          userData.pollOptions.map((option, index) => (
                            <Form.Item style={{color:"red"}}>
                              {getFieldDecorator("pollOption", {
                                rules: [
                                  {
                                    required: true,
                                    message: "Please select an option",
                                  },
                                ],
                              })(
                                <Radio.Group
                                style={{marginLeft:"30px"}}
                                  key={index.toString()}
                                  value={this.state.selectedOption}
                                  onChange={this.selectPollOption}
                                >
                                  <Radio
                                    style={{ color: "black",marginLeft:"30px" }}
                                    value={option}
                                  >
                                    <span style={{ paddingLeft: "30px" }}>
                                      {option}
                                    </span>
                                  </Radio>
                                  <br />
                                </Radio.Group>
                              )}
                            </Form.Item>
                          ))}
                        <br />
                       <center><Button
                          type="html"
                          style={{ MarginLeft: "100px" }}
                          // onClick={() => this.castVoteToZara()}
                        >
                          Vote
                        </Button>
                        </center> 
                           Your Account:  <p>{this.state.account}</p>
                      </Form>
                    </Col>
                  </Row>
                </ListGroupItem>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}

// ReactDOM.render(<Test />, document.querySelector("#root"));
export default Form.create()(Test);
