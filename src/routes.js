import React from "react";
import { Redirect } from "react-router-dom";

// Layout Types
// import { DefaultLayout } from "../src/common/layout/";

// Route Views
import FacultyPanel from "./views/FacultyPanel";
import UserProfileLite from "./views/UserProfileLite";
import AddNewPost from "./views/AddNewPost";
import Poll from "./views/";
import ComponentsOverview from "./views/ComponentsOverview";
import Tables from "./views/Tables";
import BlogPosts from "./views/BlogPosts";
import PollStatus from "./views/PollStatus"
import blockchain from "./views/blockchain";
import CastVote from "./views/CastVote";
import Test from "./views/Test"
import CreatePoll from "./views/CreatePoll";
import Admin from "./views/Admin";
import StudentPanel from "./views/StudentPanel";
import UniversityAdministration from "./views/UniversityAdministration";
import FacultyPollResult from "./views/FacultyPollResult";
import Login from "./views/Login";
import Register from "./views/Register";
import AdminPollApproved from "./views/AdminPollApproved";
import AdminPollDisapproved from "./views/AdminPollDisapproved";
import AdminPollRequest from "./views/AdminPollRequest";
import ForgotPassword from "./views/ForgotPassword";
import ResetPassword from "./views/ResetPassword";
import UserStatus from "./views/UserStatus";
import editPoll from "./views/editPoll";
export default [

  {
    path: "/",
    exact: true,
    layout: Login,
    component: () => < Redirect to = "/Login" />
},
{
    path: "/Login",
    layout: Login,
    component: Login
},
{
    path: "/components/Admin",
    layout: Admin,
    component:Admin
  },
  {
    path: "/components/FacultyPanel",
    layout: FacultyPanel,
    component: FacultyPanel
  },
  {
    path: "/components/user-profile-lite",
    layout: UserProfileLite,
    component: UserProfileLite
  },
  {
    path: "/components/add-new-post",
    layout: AddNewPost,
    component: AddNewPost
  },
  {
    path: "/components/UserStatus",
    layout: UserStatus,
    component: UserStatus
  },
  {
    path: "/components/components-overview",
    layout:  ComponentsOverview,
    component: ComponentsOverview
  },
  {
    path: "/tables",
    layout: Tables,
    component: Tables
  },
  {
    path: "/blog-posts",
    layout: BlogPosts,
    component: BlogPosts
  },
  {
    path: "/components/blockchain",
    layout: Test,
    component: Test
  },
  {
    path: "/components/pollstatus",
    layout: PollStatus,
    component:PollStatus
  },
  {
    path: "/components/castvote",
    layout: CastVote,
    component:CastVote
  },
  
  {
    path: "/components/createpoll",
    layout: CreatePoll,
    component:CreatePoll
  },
 
  {
    path: "/components/studentpanel",
    layout: StudentPanel,
    component:StudentPanel
  },
  {
    path: "/components/UniversityAdministration",
    layout: UniversityAdministration,
    component:UniversityAdministration
  },
  {
    path: "/components/FacultyPollResult",
    layout: FacultyPollResult,
    component:FacultyPollResult
  },
  // {
  //   path: "/Login",
  //   layout: Login,
  //   component:Login
  // },
  // {
  //   path: "/Register",
  //   layout: Register,
  //   component:Register
  // },
  {
    path: "/components/AdminPollApproved",
    layout: AdminPollApproved,
    component:AdminPollApproved
  },
  {
    path: "/components/AdminPollDisapproved",
    layout: AdminPollDisapproved,
    component:AdminPollDisapproved
  },
  {
    path: "components//AdminPollRequest",
    layout: AdminPollRequest,
    component:AdminPollRequest
  },
  {
    path: "/components/ForgotPassword",
    layout: ForgotPassword,
    component:ForgotPassword
  },
  {
    path: "/components/ResetPassword",
    layout:ResetPassword ,
    component:ResetPassword
  },{
    path: "/components/editPoll",
    layout:editPoll ,
    component:editPoll,
  },
];
