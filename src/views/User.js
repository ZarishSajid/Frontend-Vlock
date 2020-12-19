import React from 'react';

import ReactDOM from 'react-dom';
import {
    Container,
    Row,
    Col,
    Card,
    CardHeader,
    
  } from "shards-react";
  
  
  import PageTitle from "../components/common/PageTitle";
  
import Candidate from '../components/Candidate';

class User extends React.Component {
//   constructor(props) {
//     super(props)
//     this.state = {
//       account: '0x0',
//       candidates: [],
//       users:[],
//       hasVoted: false,
//       loading: true,
//       voting: false,
//     }
   
//    var web3 = new Web3();
//    if (window.ethereum) {
//     web3 = new Web3(window.ethereum);
//     try { 
//        window.ethereum.enable().then(function() {
//        });
//     } catch(e) {
//        // User has denied account access to DApp...
//     }
//  }
//  // Legacy DApp Browsers
//  else if (window.web3) {
//      web3 = new Web3(web3.currentProvider);
//  }
//  // Non-DApp Browsers
//  else {
//      alert('You have to install MetaMask !');
//  }
//   //let web3 
//    window.ethereum.enable()
//     console.log(" typoe of = ",typeof web3);
//     if (typeof web3 != 'undefined') {
//       this.web3Provider = web3.currentProvider
//       window.ethereum.enable()
    
//     } else {
      
//       this.web3Provider = new Web3.providers.HttpProvider('http://127.0.0.1:8545')
//       window.ethereum.enable();
      
//    }
 


//     console.log("Zara 1st test this.web3Provider", this.web3Provider);

//     this.web3 = new Web3(this.web3Provider)
//     console.log("Zara 2st test this.web3Provider", this.web3Provider);
//     this.election = TruffleContract(Election)
//     this.election.setProvider(this.web3Provider)
//     this.users = TruffleContract(Registration)
//     this.users.setProvider(this.web3Provider)

//     this.castVote = this.castVote.bind(this)
//     this.watchEvents = this.watchEvents.bind(this)
//   }

//   componentDidMount() {
//     // TODO: Refactor with promise chain
//     this.web3.eth.getCoinbase((err, account) => {
     
     
//       console.log("Zara account",account);

//       this.setState({ account })

//       this.election.deployed().then((electionInstance) => {
      
//         this.electionInstance = electionInstance
      
//         console.log("electionInstance",this.electionInstance);
      
//         // this.watchEvents()
      
//         this.electionInstance.candidatesCount().then((candidatesCount) => {
     
//             console.log("Zara candidatesCount",candidatesCount);
     
//           for (var i = 1; i <= candidatesCount; i++) {
     
//             this.electionInstance.candidates(i).then((candidate) => {
     
//               console.log("APP >> Before >> candidates",JSON.stringify(candidate));
     
//               const candidates = [...this.state.candidates]; //for cancatination of array
     
//               // console.log("APP >> After t>> candidates",candidates);
     
//               candidates.push({
     
//                 id: candidate[0],
//                 name: candidate[1],
//                 voteCount: candidate[2],
//                  party: candidate[3]
//               });
     
//              console.log("APP >> candidates >> Array ",JSON.stringify(candidates));
     
//               this.setState({ candidates: candidates })
//             });
//           }
//         })
     
//         this.electionInstance.voters(this.state.account).then((hasVoted) => {
     
//           this.setState({ hasVoted, loading: false })
//         })
//       })

//       //new code
//       this.users.deployed().then((usersInstance) => {
      
//         this.usersInstance = usersInstance
      
//         console.log("usersInstance",this.usersInstance);
      
      
//         this.usersInstance.usersCount().then((usersCount) => {
     
//             console.log("Zara usersCount ",usersCount);
     
//           for (var i = 1; i <= usersCount; i++) {
     
//             this.usersInstance.users(i).then((user) => {
     
//               console.log("APP >> Before >> user",JSON.stringify(user));
     
//               const users = [...this.state.users]; //for cancatination of array
     
//               // console.log("APP >> After t>> candidates",candidates);
     
//               users.push({
     
//                 id: user[0],
//                 sap_id: user[1],
//                 name: user[2],
//                  department: user[3],
//                  degree:user[4],
//                  password: user[5],
//                  email: user[6],

//               });
     
//              console.log("APP >> candidates >> Array ",JSON.stringify(users));
     
//               this.setState({ users: users })
//             });
//           }
//         })
     
//         this.electionInstance.voters(this.state.account).then((hasVoted) => {
     
//           this.setState({ hasVoted, loading: false })
//         })
//       }


//       // end


//     )})
//   }

//   watchEvents() {
//     // TODO: trigger event when vote is counted, not when component renders
//     console.log("zara test inside watchevent");
//     this.electionInstance.votedEvent({}, {
      
//       fromBlock: 0,
//       toBlock: 'latest'
//     }).watch((error, event) => {
//       this.setState({ voting: false })
//     })
//   }

//   castVote(candidateId) {
//     console.log("zara test castVote",candidateId);
//     this.setState({ voting: true })
//     this.electionInstance.vote(candidateId, { from: this.state.account }).then((result) =>
//       this.setState({ hasVoted: true })
//     )
//   }

  render() {
    return (
        <div>
        <Container fluid className="px-0">
          
        </Container>
        <Container fluid className="main-content-container px-4">
          <Row noGutters className="page-header py-4">
            <PageTitle
              sm="4"
              title="Add Candidate"
              subtitle="Overview"
              className="text-sm-left"
            />
          </Row>
    
         
    
          <Row>
            <Col lg="8" className="mb-4">
            
    
              {/* Complete Form Example */}
              <Card small>
                <CardHeader className="border-bottom">
                  <h6 className="m-0">Sign Up</h6>
                </CardHeader>
                <Candidate />
              </Card>
            </Col>
    
            <Col lg="4" className="mb-4">
              {/* Sliders & Progress Bars */}
            
    
              {/* Groups */}
              
    
              
            </Col>
          </Row>
        </Container>
      </div>
    )
  }

  //new

  //end
}

ReactDOM.render(
   <User />,
   document.querySelector('#root')
)
export default User;