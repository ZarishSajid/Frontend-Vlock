export default function() {
if(localStorage.getItem('userType') === 'admin')
{ 
  return [
    {
      title: "Dashboard",
      htmlBefore: '<i class="material-icons">vertical_split</i>',
      to: "/components/Admin",
    },
    {
      title: "Profile",
      htmlBefore: '<i class="material-icons">person</i>',
      to: "/components/Profile",
    },
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
    //   title: "",
    //   htmlBefore: '<i class="material-icons"> </i>',
    //   to: "/components/editUser",
    // },
    
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
      title: "Help",
      htmlBefore: '<i class="material-icons">help</i>',
      to: "/components/userGuide",
    },
    // {
    //   // title: "",
    //   htmlBefore: '<i class="material-icons"></i>',
    //   to: "/components/editPoll",
    // },
    
    // {
    //     // title: "Blockchain",
    //     htmlBefore: '<i class="material-icons"></i>',
    //     to: "/components/blockchain",
    //   }, 
    
      
    {
      title: "Results",
      htmlBefore: '<i class="material-icons">table_chart</i>',
      to: "/components/Results",
    },
  ]
}
  else if(localStorage.getItem('userType') === 'uniAdmin'){
    return[
      {
          title: "Dashboard",
          htmlBefore: '<i class="material-icons">vertical_split</i>',
          to: "/components/UniversityAdministration",
        },
        {
          title: "Profile",
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
      htmlBefore: '<i class="material-icons">poll</i>',
      to: "/components/CreatePoll",
    },
    // {
    // //  title: "Blockchain",
    //     htmlBefore: '<i class="material-icons"></i>',
    //      to: "/components/blockchain",
    //    },
    ]
  }
    else if(localStorage.getItem('userType') === 'faculty'){
      return[
       
          {
              title: "Dashboard",
              htmlBefore: '<i class="material-icons">vertical_split</i>',
              to: "/components/FacultyPanel",
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
                    title: "Help",
                    htmlBefore: '<i class="material-icons">help</i>',
                    to: "/components/userGuide",
                  },
                //   {
                //   // title: "Blockchain",
                //   htmlBefore: '<i class="material-icons"></i>',
                //    to: "/components/blockchain",
                //  },
              
                ]
          
        }}
          
              