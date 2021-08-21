
import React,{Component} from 'react';
import { BrowserRouter as Router, Route,Switch } from "react-router-dom";
import { Container, Row, Col } from "shards-react";
import MainNavbar from "../src/common/layout/MainNavbar/MainNavbar";
import MainSidebar from "../src/common/layout/MainSidebar/MainSidebar";
import MainFooter from "../src/common/layout/MainFooter";
import  Admin  from "../src/views/Admin";
import FacultyPanel from "../src/views/FacultyPanel";
import UserProfileLite from "../src/views/UserProfileLite";
import AddNewPost from "../src/views/AddNewPost";
import Tables from "../src/views/Tables";
import BlogPosts from "../src/views/BlogPosts";
import Test from "../src/views/blockchain";
import PollStatus from "../src/views/PollStatus";
import CastVote from "../src/views/CastVote";
import CreatePoll from "../src/views/CreatePoll";
import UniversityAdministration from "../src/views/UniversityAdministration";
import StudentPanel from "../src/views/StudentPanel";
import  AdminPollApproved from "../src/views/AdminPollApproved";
import AdminPollDisapproved from "../src/views/AdminPollDisapproved";
import AdminPollRequest from "../src/views/AdminPollRequest";
import ForgotPassword from "../src/views/ForgotPassword";
import ResetPassword from "../src/views/ResetPassword";
import RegisterVoter from "../src/views/RegisterVoter";
import UserStatus from "../src/views/UserStatus";
import PollList from "../src/views/PollList"
import ComponentsOverview from "../src/views/ComponentsOverview";
import editPoll from "../src/views/editPoll";
import Status from "../src/views/Status ";
import PollRequest from "../src/views/PollRequest";
import userGuide from "../src/views/userGuide";
import editUser from "../src/views/editUser";
import Profile from "../src/views/Profile";
import Results from "../src/views/Results";
import PollResult from "../src/views/PollResult";
import ResultDup from "../src/views/ResultsDup";
import PollingAgentRegistration from "../src/views/PollingAgentRegistration";
import AdminRegistration from "../src/views/AdminRegistration";
import voterStatusPollingAgent from "../src/views/voterStatusPollingAgent";
import RegisteredVoterInfo from "../src/views/RegisteredVoterInfo"
import adminStatus from "../src/views/adminStatus"
import RegisteredAdminInfo from "../src/views/RegisteredAdminInfo";
import RegisteredAgentInfo from "../src/views/RegisteredAgentInfo";
import agentStatus from "../src/views/agentStatus ";

class Components extends Component {
    
    constructor(props) {
      super(props);
      
    }
   
    render() {
      return (
        <div>
        <Router>
          <Container fluid>
            <Row>
            { <MainSidebar />}
              <Col
                className="main-content p-0"
                lg={{ size: 10, offset: 2}}
                md={{ size: 9, offset: 3 }}
                sm="12"
                tag="main"
              >
                <MainNavbar />
                <Switch>
                  {/* <Route path='/' exact component={} /> */}
                  <Route path='/components/Admin' component={Admin} />
                  <Route path='/components/FacultyPanel' component={FacultyPanel} />
                  <Route path='/components/user-profile-lite' component={UserProfileLite}/>
                  <Route path='/componenrs/add-new-post' component={AddNewPost}/>
                  <Route path='/components/tables' component={Tables}/>
                  <Route path='/components/blog-posts' component={BlogPosts}/>
                  <Route path='/components/blockchain' component={Test}/>
                  <Route path='/components/pollstatus' component={PollStatus}/>
                  <Route path='/components/castvote' component={CastVote}/>
                  <Route path='/components/createpoll' component={CreatePoll}/>
                  <Route path='/components/studentpanel' component={StudentPanel}/>
                  <Route path='/components/UniversityAdministration' component={UniversityAdministration}/>
                  <Route path='/components/AdminPollApproved' component={AdminPollApproved}/>
                  <Route path='/components/AdminPollDisapproved' component={AdminPollDisapproved}/>
                  <Route path='/components/AdminPollRequest' component={AdminPollRequest}/>
                  <Route path='/components/ForgotPassword' component={ForgotPassword}/>
                  <Route path='/components/UserStatus' component={UserStatus}/>
                  <Route path='/components/PollList' component={PollList}/>
                  <Route path='/components/components-overview' component={ComponentsOverview}/>
                  <Route path='/components/editPoll' component={editPoll}/>
                  <Route path='/components/Status' component={Status}/>
                  <Route path='/components/PollRequest' component={PollRequest}/>
                  <Route path='/components/userGuide' component={userGuide}/>
                  <Route path='/components/editUser' component={editUser}/>
                  <Route path='/components/Profile' component={Profile}/>
                  <Route path='/components/Results' component={Results}/>
                  <Route path='/components/PollResult' component={PollResult}/>
                  <Route path='/components/ResultDup' component={ResultDup}/>
                 <Route path="/components/voterStatusPollingAgent" component={voterStatusPollingAgent}/>
                 <Route path='/components/RegisterVoter' component={RegisterVoter}/>
                 <Route path="/components/AdminRegistration" component={AdminRegistration}/>
                 <Route path="/components/PollingAgentRegistration" component={PollingAgentRegistration}/>
                 <Route path="/components/RegisteredVoterInfo" component={RegisteredVoterInfo}/>
                 <Route path="/components/RegisteredAdminInfo" component={RegisteredAdminInfo}/>
                 <Route path="/components/RegisteredAgentInfo" component={RegisteredAgentInfo}/>
                 <Route path="/components/adminStatus" component={adminStatus}/>
                 <Route path="/components/agentStatus" component={agentStatus}/>

                  {/* <Route path='/ResetPassword' component={ResetPassword}/> */}
                  {/* <Route path='/components/Register' component={Register}/> */}

                </Switch>
                <MainFooter />
              </Col>
            </Row>
          </Container> 
        </Router>
        </div>
      );
    }
  }
  export default  Components;
  