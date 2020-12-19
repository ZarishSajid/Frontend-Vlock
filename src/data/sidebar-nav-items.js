export default function() {
if(localStorage.getItem('userType') === 'admin')
{ 
  return [
    {

      title: "Dashboard",
      htmlBefore: '<i class="material-icons">vertical_split</i>',
      to: "/components/Admin",
    },
    // {
    //   title: "Student Panel",
    //   htmlBefore: '<i class="material-icons"></i>',
    //   to: "/components/StudentPanel",
    // },
    // {
    //   title: "University Admin",
    //   htmlBefore: '<i class="material-icons"></i>',
    //   to: "/components/UniversityAdministration",
    // },

    // {
    //   title: "Faculty Panel",
    //   to: "/components/FacultyPanel",
    //   htmlBefore: '<i class="material-icons"></i>',
    //   htmlAfter: "",
    //   subs: [
    //     {
    //       icon: "simple-icon-user-following",
          
    //       to: "/user/login",
    //       newWindow: true,
    //     },
      
        // {
        //   icon: "simple-icon-user-follow",
        //   label: "menu.register",
        //   to: "/user/register",
        //   newWindow: true,
        // },
  //       {
  //         icon: "simple-icon-user-following",
  //         label: "menu.forgot-password",
  //         to: "/user/forgot-password",
  //         newWindow: true,
  //       },
  //       {
  //         icon: "simple-icon-user-unfollow",
  //         label: "menu.reset-password",
  //         to: "/user/reset-password",
  //         newWindow: true,
  //       },
  //     ]
  // },
    // {
    //   title: "Blog Posts",
    //   htmlBefore: '<i class="material-icons"></i>',
    //   to: "/blog-posts",
    // },
    // {
    //   title: "Add New Post",
    //   htmlBefore: '<i class="material-icons"></i>',
    //   to: "/add-new-post",
    // },
    // {
    //   title: "Forms & Components",
    //   htmlBefore: '<i class="material-icons">view_module</i>',
    //   to: "/conponents/components-overview",
    // },
    // {
    //   title: "Tables",
    //   htmlBefore: '<i class="material-icons">table_chart</i>',
    //   to: "/tables",
    // },
    // {
    //   title: "User Profile",
    //   htmlBefore: '<i class="material-icons"></i>',
    //   to: "/components/user-profile-lite",
    // },
    // {
    //   title: "Poll",
    //   htmlBefore: '<i class="material-icons"></i>',
    //   to: "/components/Poll",
    // },
    // {
    //   title: "Blockchain",
    //   htmlBefore: '<i class="material-icons"></i>',
    //   to: "/components/blockchain",
    // },
    // {
    //   title: "Poll Status",
    //   htmlBefore: '<i class="material-icons"></i>',
    //   to: "/components/PollStatus",
    // },
    {
      title: "Poll Status",
      htmlBefore: '<i class="material-icons"> poll</i>',
      to: "/components/Status",
    },
    {
      title: " User Status",
      htmlBefore: '<i class="material-icons">person</i>',
      to: "/components/UserStatus",
    },
    {
      title: "Poll Request",
      htmlBefore: '<i class="material-icons"> poll</i>',
      to: "/components/PollRequest",
    },
    // {
    //   title: " Poll List",
    //   htmlBefore: '<i class="material-icons"></i>',
    //   to: "/components/PollList",
    // },
    // {
    //   title: "Cast Vote",
    //   htmlBefore: '<i class="material-icons"></i>',
    //   to: "/components/CastVote",
    // },

    // {
    //   title: "Create Poll",
    //   htmlBefore: '<i class="material-icons"></i>',
    //   to: "/components/CreatePoll",
    // },
    
    // {
    //   title: " Login",
    //   htmlBefore: '<i class="material-icons"></i>',
    //   to: "/Login",
    // },
    // {
    //   title: " Register ",
    //   htmlBefore: '<i class="material-icons"></i>',
    //   to: "/Register",
    // },
    // {
    //   title: " Forgot Password ",
    //   htmlBefore: '<i class="material-icons"></i>',
    //   to: "/ForgotPassword",
    // },
    // {
    //   title: "Reset Password ",
    //   htmlBefore: '<i class="material-icons"></i>',
    //   to: "/ResetPassword",
    // }
  ];
}
else if(localStorage.getItem('userType') === 'student'){
  return[
    {
        title: "Dashboard",
        htmlBefore: '<i class="material-icons">vertical_split</i>',
        to: "/components/StudentPanel",
      },
   
      {
          title: " Profile",
          htmlBefore: '<i class="material-icons">person</i>',
          to: "/components/user-profile-lite",
        },
        {
          title: "Poll Status",
          htmlBefore: '<i class="material-icons">poll</i>',
          to: "/components/PollStatus",
        },
        {
            title: "Cast Vote",
            htmlBefore: '<i class="material-icons">table_chart</i>',
            to: "/components/CastVote",
          },
          {
      title: "Create Poll",
      htmlBefore: '<i class="material-icons">note_add</i>',
      to: "/components/CreatePoll",
    },
    {
      // title: "",
      htmlBefore: '<i class="material-icons"></i>',
      to: "/components/editPoll",
    },
    
   
    {
        // title: "Blockchain",
        htmlBefore: '<i class="material-icons"></i>',
        to: "/components/blockchain",
      }, 
      {
        title: "Help",
        htmlBefore: '<i class="material-icons"></i>',
        to: "/components/userGuide",
      },
    
  ]
}
  else if(localStorage.getItem('userType') === 'uniAdmin'){
    return[
      {
          title: "Dashboard",
          htmlBefore: '<i class="material-icons"></i>',
          to: "/components/UniversityAdministration",
        },
        {
          title: "Profile",
          htmlBefore: '<i class="material-icons"></i>',
          to: "/components/user-profile-lite",
        },
        {
          title: "Poll Status",
          htmlBefore: '<i class="material-icons"></i>',
          to: "/components/PollStatus",
        },
        {
            title: "Cast Vote",
            htmlBefore: '<i class="material-icons"></i>',
            to: "/components/CastVote",
          },
          {
      title: "Create Poll",
      htmlBefore: '<i class="material-icons"></i>',
      to: "/components/CreatePoll",
    },
    {
    //  title: "Blockchain",
        htmlBefore: '<i class="material-icons"></i>',
         to: "/components/blockchain",
       },
    ]
  }
    else if(localStorage.getItem('userType') === 'faculty'){
      return[
       
          {
              title: "Dashboard",
              htmlBefore: '<i class="material-icons"></i>',
              to: "/components/FacultyPanel",
          },
                {
                  title: " Profile",
                  htmlBefore: '<i class="material-icons"></i>',
                  to: "/components/user-profile-lite",
                },
                {
                  title: "Poll Status",
                  htmlBefore: '<i class="material-icons"></i>',
                  to: "/components/PollStatus",
                },
                {
                    title: "Cast Vote",
                    htmlBefore: '<i class="material-icons"></i>',
                    to: "/components/CastVote",
                  },
                  {
              title: "Create Poll",
              htmlBefore: '<i class="material-icons"></i>',
              to: "/components/CreatePoll",
                  },
                  {
                  // title: "Blockchain",
                  htmlBefore: '<i class="material-icons"></i>',
                   to: "/components/blockchain",
                 },
              
                ]
          
        }}
          
              