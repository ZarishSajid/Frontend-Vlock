// import React from "react";
// import { ListGroup, ListGroupItem, FormInput, Button } from "shards-react";
// import { Container, Row, Col, Card, CardHeader, CardBody } from "shards-react";
// import PageTitle from "../components/common/PageTitle";
// import ReactDOM from "react-dom";
// import Web3 from "web3";
// import TruffleContract from "truffle-contract";
// import Election from "../build/contracts/Election.json";
// // import Poll from "../../src/build/contracts/Polls.json";
// import Option from "../build/contracts/Option.json";
// import Form from "./Form";

// class Test extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       account: "0x0",
//       polls: [],
      
//       hasVoted: false,
//       loading: true,
//       voting: false,
//       option: "",
//     };

//     var web3 = new Web3();
//     if (window.ethereum) {
//       web3 = new Web3(window.ethereum);
//       try {
//         window.ethereum.enable().then(function() {
//           // User has allowed account access to DApp...
//         });
//       } catch (e) {
//         // User has denied account access to DApp...
//       }
//     }
//     // Legacy DApp Browsers
//     else if (window.web3) {
//       web3 = new Web3(web3.currentProvider);
//     }
//     // Non-DApp Browsers
//     else {
//       alert("You have to install MetaMask !");
//     }
//     window.ethereum.enable();
//     console.log(" typoe of = ", typeof web3);
//     if (typeof web3 != "undefined") {
//       this.web3Provider = web3.currentProvider;
//       window.ethereum.enable();
//     } else {
//       this.web3Provider = new Web3.providers.HttpProvider(
//         "http://127.0.0.1:8545"
//       );
//       window.ethereum.enable();
//     }
  

//     // web3.eth.getAccounts().then((acc)=>{ console.log(acc); });
//     // txnCount = web3.eth.getTransactionCount(web3.eth.accounts[0])
//     // console.log("account cteat",web3.eth.accounts.create);
//     web3.eth.getTransactionCount((err, res) => {  
//       console.log(" TransAccountsss***");                 
//       console.log(res);
//       // console.log(res);
//       // console.log(res[2]);
//       // console.log(res[3]);
//       // console.log(res[4]);
//       console.log("TransAccountsss***")

// });
//     web3.eth.getAccounts((err, res) => {  
//       console.log("Accountsss***");                 
//       console.log(res[0]);
//       console.log(res);
//       console.log(res[2]);
//       console.log(res[3]);
//       console.log(res[4]);
//       console.log("Accountsss***")

// });
    
//     // web3.eth.getAccounts().then( function (result) { console.log (result[0] )});
//      console.log("Web 3 Accounts",web3.eth.getAccounts());
//     // var accounts = web3.eth.getAccounts();
//     //  console.log(accounts[1]);

//     console.log("Zara 1st test this.web3Provider", this.web3Provider);

//     this.web3 = new Web3(this.web3Provider);
//     console.log("Zara 2st test this.web3Provider", this.web3Provider);
//     this.castVote = this.castVote.bind(this);
//     this.watchEvents = this.watchEvents.bind(this);
//     this.registerCandidate = this.registerCandidate.bind(this);
//     this.gettingDep = this.gettingDep.bind(this);
//     this.onUserRegister = this.onUserRegister.bind(this);
//     this.poll= TruffleContract(Poll);
//     this.poll.setProvider(this.web3Provider);
//     this.optioncontract = TruffleContract(Option)
//     this.optioncontract.setProvider(this.web3Provider);
    
   
//   }

//   async onUserRegister() {
//     console.log("Inside Register user state =", this.state);
//     const { option} = this.state;

//     console.log("option");
//     console.log(option);
//     console.log("this.pollInstance = ", this.pollInstance);
//     this.pollInstance
//       .addOption(option, {
//         from: this.state.account,
//       })
//       .then(async (result) => {
//         console.log("result = ", result);
//         console.log("Before  state of polls = ", this.state.polls);
//         await this.registerCandidate();
//         console.log("\n this.state.event = ", this.state.event);
//         // console.log("APP >> Before >> candidates", JSON.stringify(candidate));
//         const polls = [...this.state.polls]; //for cancatination of array
//         const id = polls.length + 1;
//         polls.push({
//           id: id.toString(),
//            option,
//         });

//         console.log("APP >> polss >> Array ", JSON.stringify(polls));

//         this.setState({ polls: polls });

//         console.log("After  state of polls = ", this.state.polls);
//       });
//   }

//   async componentDidMount() {

//     console.log("zara test inside component Didmount");
//     console.log(" Account************",this.state.account);
// //     this.web3.eth.getAccounts()
// // .then(console.log);
// // web3-eth-accounts
// // const accounting = await this.web3.eth.getAccounts();
// //     const accountAddress = await accounting[0];
// //     console.log("accountAddress",accountAddress);
//     this.web3.eth.getCoinbase(async (err, account) => {
//        const accounts = await this.web3.eth.getAccounts();
//       console.log("accounts  === ", accounts);   

//       //  this.web3.eth.getAccounts()
//       // .then((accounts) => {
//       //    console.log(accounts);
//       // });
   
//       this.setState({ account });
//       this.poll.deployed().then((pollInstance) => {
//         this.pollInstance = pollInstance;

//         console.log("PollInstance", this.pollInstance);

//         // this.watchEvents()

//         this.pollInstance.candidatesCount().then((candidatesCount) => {
//           console.log("Zara candidatesCount", candidatesCount);
//           console.log(" Account************",this.state.account);
//      //     this.web3.eth.getAccounts.then(console.log);
//           // var transaction = this.web3.eth.getTransactionFromBlock(this.state.account, 2).then( (result) => {
//           //   var res= result;
//           //   console.log(res);
//           // });


   

//         // console.log( this.web3.eth.getAccounts());
//         // this.web3.eth.getAccounts(err, account).then((result) => {
//         // //this.setState({ hasVoted, loading: false });
//         //   console.log(result);
//         // });
    

//           for (var i = 1; i <= candidatesCount; i++) {
//             this.pollInstance.polls(i).then((poll) => {
//               console.log(
//                 "APP >> Before >> polls",
//                 JSON.stringify(poll)
//               );

//               const polls = [...this.state.polls]; 
//              polls.push({
//                 id: poll[0],
//                 option: poll[1],
               
//                 voteCount: poll[2],
                
//               });

//               console.log(
//                 "APP >> candidates >> Array ",
//                 JSON.stringify(polls)
//               );

//               this.setState({ polls: polls });
//             });
//           }
//         });

//         this.pollInstance.voters(this.state.account).then((hasVoted) => {
//           this.setState({ hasVoted, loading: false });
//         });
//       });
//     });
//   }

//   watchEvents() {
//     // TODO: trigger event when vote is counted, not when component renders
//     console.log("zara test inside watchevent");
//     this.pollInstance
//       .votedEvent(
//         {},
//         {
//           fromBlock: 0,
//           toBlock: "latest",
//         }
//       )
//       .watch((error, event) => {
//         this.setState({ voting: false });
//       });
//   }

//   async registerCandidate() {
//     // TODO: trigger event when vote is counted, not when component renders
//     console.log("zara test inside registerCandidate");

//     return await this.pollInstance
//       .registerCandidate(
//         {},
//         {
//           fromBlock: 0,
//           toBlock: "latest",
//         }
//       )
//       .watch((error, event) => {
//         const { argu } = event;
//         console.log("error , event ", error, JSON.stringify(event));
//         // const { argu } = event;
//         this.setState({ event: event });
//         return event;
//       });
//   }

//   castVote(candidateId) {
//     console.log("zara test castVote", candidateId);
//     this.setState({ voting: true });
//     //this.loginInstance.

//     this.PollInstance
//       .vote(candidateId, { from: this.state.account })
//       .then((result) => this.setState({ hasVoted: true }));
//   }

//   gettingDep(namee) {
//     console.log("=== Test >> gettingDep >> inside getting >>>> Test.js");
//     console.log("=== this.state.namee = ", this.state.namee);
//     this.loginInstance
//       .setName(namee, { from: this.state.account })
//       .then((namee) => {
//         console.log("=== setName output  = ", namee);

//         this.loginInstance.getName().then((name) => {
//           console.log("=== Zaraaaaaaaa === getName output  = ", name);
//         });
//       });
//   }

//   drawGrid() {
//     return (
//       <Row>
//         <Col>
//           <Card small className="mb-4">
//             <CardHeader className="border-bottom">
        
//             </CardHeader>
//             <CardBody className="p-0 pb-3">
//               {this.state.loading || this.state.voting ? (
//                 <p className="text-center">Loading...</p>
//               ) : (
//                 <table className="table mb-0">
                 
                   
//                       <tbody>
//                      <tr>
                      
//                       <td>
//                       {this.state.polls.map((poll) => {
//                       console.log("inside loop = ", poll.id);
//                       return (
//                         <tr>
//                           <td></td>
                          
//                           {poll.option}
                             
                     
                          
                          
//                         </tr>
//                       );
//                     })}
//                       </td>

                  
//                        </tr>

                      
                      
        
                    
                  
//                       </tbody>
//                 </table>
//               )}
//               <hr />
//               {!this.state.hasVoted ? (
//                 <Form
//                   polls={this.state.polls}
//                   castVote={this.castVote}
//                 />
//               ) : null}
//               <p>Your account: {this.state.account}</p>
//               {/* {window.location.reload} */}
//             </CardBody>
//           </Card>
//         </Col>
//       </Row>
//     );
//   }

//   render() {
//     return (
//       <Container fluid className="main-content-container px-4">
//         <Row noGutters className="page-header py-4">
//           <PageTitle
//             sm="4"
//             title="Election Results"
//             subtitle="Retrieve Blockchain"
//             className="text-sm-left"
//           />
//         </Row>
//         {this.drawGrid()}
//         <Row>
//           <Col>
//             <Card small>
//               <CardHeader className="border-bottom">
//                 <h6 className="m-0">Create Poll</h6>
//               </CardHeader>
//               {/* <Candidate
//                 /> */}
//               <ListGroup flush>
//                 <ListGroupItem className="p-3">
//                   <Row>
//                     <Col md="6" className="form-group">
//                       {/* <label htmlFor="">Description</label>
//                       <FormInput
//                         type="text"
//                         name="description"
//                         placeholder="Please enter description"
//                         onChange={(e) => {
//                           this.setState({ description: e.target.value });
//                         }}
//                       /> */}

//                       <label htmlFor="">Option #1</label>
//                       <FormInput
//                         type="text"
//                         name="option"
//                         placeholder="Add Option"
//                         onChange={(e) => {
//                           this.setState({ option: e.target.value });
//                         }}
                        
//                       />

                    
//                       <Button onClick={() => this.onUserRegister()}>
//                         Create Poll!
//                       </Button>
//                     </Col>
//                   </Row>
//                 </ListGroupItem>
//               </ListGroup>
//             </Card>
//           </Col>
//         </Row>
//       </Container>
//     );
//   }
// }

// ReactDOM.render(<Test />, document.querySelector("#root"));
// export default Test;
