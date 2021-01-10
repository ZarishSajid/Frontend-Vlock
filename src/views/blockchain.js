import React from "react";
import { ListGroup, ListGroupItem, FormInput, Button } from "shards-react";
import { Container, Row, Col, Card, CardHeader, CardBody } from "shards-react";
import PageTitle from "../components/common/PageTitle";
import ReactDOM from "react-dom";
import Web3 from "web3";
import TruffleContract from "truffle-contract";
import Election from "../build/contracts/Election.json";
// import Poll from "../build/contracts/Poll.json";
import Option from "../build/contracts/Option.json";
import { Radio, Form } from "antd";
class Test extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      account: "0x0",
      polls: [],
      selectedOption: "",
      hasVoted: false,
      loading: true,
      voting: false,
      option: "",
      voteCount:0
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
    // console.log(" typoe of = ", typeof web3);
    if (typeof web3 != "undefined") {
      this.web3Provider = web3.currentProvider;
      window.ethereum.enable();
    } else {
      this.web3Provider = new Web3.providers.HttpProvider(
        "http://127.0.0.1:8545"
      );
      window.ethereum.enable();
    }

    web3.eth.getTransactionCount((err, res) => {
      console.log(" getTransactionCount ", err, res);
      // console.log(res);
      // console.log(res);
      // console.log(res[2]);
      // console.log(res[3]);
      // console.log(res[4]);
      // console.log("TransAccountsss***");
    });
    web3.eth.getAccounts((err, res) => {
      console.log("getAccounts = ", res);
    });

    // web3.eth.getAccounts().then( function (result) { console.log (result[0] )});
    // console.log("Web 3 Accounts", web3.eth.getAccounts());
    // var accounts = web3.eth.getAccounts();
    //  console.log(accounts[1]);

    // console.log("Zara 1st test this.web3Provider", this.web3Provider);

    this.web3 = new Web3(this.web3Provider);
    this.castVoteToZara = this.castVoteToZara.bind(this);
    this.watchEvents = this.watchEvents.bind(this);
    this.election = TruffleContract(Election);
    this.election.setProvider(this.web3Provider);
  }

 
  async componentDidMount() {
    console.log("inside componentDidMount ");
    // console.log(" Account************", this.state.account);
    //     this.web3.eth.getAccounts()
    // .then(console.log);
    // web3-eth-accounts
    // const accounting = await this.web3.eth.getAccounts();
    //     const accountAddress = await accounting[0];
    //     console.log("accountAddress",accountAddress);
    this.web3.eth.getCoinbase(async (err, account) => {
      console.log("getCoinbase = ", account);
      // this.state.account =
      this.setState({ account: account });
      // const accounts = await this.web3.eth.getAccounts();
      // console.log("getCoinbase => getAccounts  === ", accounts);

      //  this.web3.eth.getAccounts()
      // .then((accounts) => {
      //    console.log(accounts);
      // });

      // this.setState({ account });
      this.pollInstance = await this.election.deployed();
      console.log("PollInstance", this.pollInstance);
      // this.watchEvents()
      // const voted = await this.pollInstance.voted("1", "A");

      // this.pollInstance.voted("1", "A", { from: this.state.account }).then((voted) => {
      // console.log("voted  = ", voted);
      const pollCount = await this.pollInstance.pollCount();
      console.log("pollCount =  ", pollCount);
      const polls = [...this.state.polls];
      for (var i = 0; i <= pollCount; i++) {
        const poll = await this.pollInstance.polls(i);
        polls.push({ id: poll[1], option: poll[2], voteCount: poll[3] });
      }
      this.setState({ polls: polls });

      console.log(
        "\n downside of votecast method polls list of polls = ",
        polls
      );
      // this.pollInstance.voters(this.state.account).then((hasVoted) => {
      //   this.setState({ hasVoted, loading: false });
      // });
      // });
    });
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
        console.log("sselected  options!!!", values.pollOption);
        console.log("iddddd", userData._id);

        const results = await this.pollInstance
          .vote(userData._id, values.pollOption, {
            from: this.state.account,
          })
          .then((result) => this.setState({ hasVoted: true }));
      }

    
    });
    this.web3.eth.getCoinbase(async (err, account) => {
      console.log("getCoinbase = ", account);
      // this.state.account =
      this.setState({ account: account });
      // const accounts = await this.web3.eth.getAccounts();
      // console.log("getCoinbase => getAccounts  === ", accounts);

      //  this.web3.eth.getAccounts()
      // .then((accounts) => {
      //    console.log(accounts);
      // });

      // this.setState({ account });
      this.pollInstance = await this.election.deployed();
      console.log("PollInstance", this.pollInstance);
      const pollCount = await this.pollInstance.pollCount();
      console.log("pollCount =  ", pollCount);
      const polls = [...this.state.polls];
      for (var i = 0; i <= pollCount; i++) {
        const poll = await this.pollInstance.polls(i);
        polls.push({ id: poll[1], option: poll[2], voteCount: poll[3] });
      }
      this.setState({ polls: polls });

      console.log("\n polls list of polls = ", JSON.stringify(polls));

      for(var i=0; i<polls.length; i++)
      {
       console.log("Vote count of "+polls[i].id+" of "+polls[i].option+" is "+polls[i].voteCount);
          
      }
      // this.pollInstance.getAll().then((polls) => {
      //   console.log("Polls are here", polls);
      // });
    });

    // console.log("zara test castVote", candidateId);
    // this.setState({ voting: true });
    // //this.loginInstance.

    // this.electionInstance
    //   .vote(candidateId, { from: this.state.account })
    //   .then((result) => this.setState({ hasVoted: true }));

    // set state value or update this user in DB and marked as casted so he/she cant vote again
    // {1,B,5};
    /**
     * Get count again and save values into DBs for count.
     */

    // const pollCount = await this.pollInstance.pollCount();
    // console.log("pollCount =  ", pollCount);
    // const polls = [...this.state.polls];
    // for (var i = 0; i <= pollCount; i++) {
    //     const poll = await this.pollInstance.polls(i);
    //     polls.push({ id: poll[1],option: poll[2],voteCount: poll[3]});
    // }
    // this.setState({ polls: polls });

    // console.log("results", results);
    // this.setState({ voting: true });
    // this.electionInstance
    //   .vote(candidateId, { from: this.state.account })
    //   .then((result) => this.setState({ hasVoted: true }));
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
  //   console.log("zara test castVote", candidateId);
  //   this.setState({ voting: true });
  //   //this.loginInstance.

  //   // this.PollInstance.vote(candidateId, {
  //   //   from: this.state.account,
  //   // }).then((result) => this.setState({ hasVoted: true }));
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
          <PageTitle
            sm="4"
            title="Election Results"
            subtitle="Retrieve Blockchain"
            className="text-sm-left"
          />
        </Row>
        {/* {this.drawGrid()} */}
        <Row>
          <Col>
            <Card small>
              <CardHeader className="border-bottom">
                <h6 className="m-0">Cast Vote</h6>
              </CardHeader>
              <ListGroup flush>
                <ListGroupItem className="p-3">
                  <Row>
                    <Col md="6" className="form-group">
                      <label
                        style={{ color: "black", fontWeight: "bold" }}
                        htmlFor=""
                      >
                        {" "}
                        Poll Question
                      </label>
                      <p
                        style={{
                          border: "1px solid grey",
                          borderRadius: "10px",
                          padding: "15px",
                          color:"black",
                        }}
                      >
                        {userData && userData._id
                          ? userData.pollQuestion
                          : this.state.pollQuestion}
                      </p>
                      <label
                        style={{ color: "black", fontWeight: "bold" }}
                        htmlFor=""
                      >
                        Description
                      </label>
                      <p
                        style={{
                          border: "1px solid grey",
                          borderRadius: "10px",
                          padding: "15px",
                           color:"black",
                        }}
                      >
                        {userData && userData._id
                          ? userData.pollDescription
                          : this.state.pollDescription}
                      </p>
                      <Form onSubmit={this.castVoteToZara}>
                        {userData &&
                          userData._id &&
                          userData.pollOptions &&
                          userData.pollOptions.length > 0 &&
                          userData.pollOptions.map((option, index) => (
                            <Form.Item>
                              {getFieldDecorator("pollOption", {
                                rules: [
                                  {
                                    required: true,
                                    message: "Please select an option",
                                  },
                                ],
                              })(
                                <Radio.Group
                                  key={index.toString()}
                                  value={this.state.selectedOption}
                                  onChange={this.selectPollOption}
                                >
                                  <Radio
                                    style={{ color: "black" }}
                                    value={option}
                                  >
                                    <span style={{ paddingLeft: "10px" }}>
                                      {option}
                                    </span>
                                  </Radio>
                                  <br />
                                </Radio.Group>
                              )}
                            </Form.Item>
                          ))}
                          <br/>
                        <Button
                          type="html"
                          style={{ MarginLeft: "100px" }}
                          // onClick={() => this.castVoteToZara()}
                        >
                          Vote
                        </Button>
                      </Form>
                      <p>Your account: {this.state.account}</p>
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
