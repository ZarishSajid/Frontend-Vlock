import React from "react";
import { Nav } from "shards-react";

import Notifications from "./Notifications";
import UserActions from "./UserActions";
import {
  Button,
  Collapse,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavLink,
} from "reactstrap";
class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bigChartData: "data1"
    };
  }
 
  setBgChartData = name => {
    this.setState({
      bigChartData: name
    });
  };
  render() {
    return (
    
      <Nav navbar className="flex-row">
    <Notifications />
    <UserActions />
  </Nav>


    
    
);
}
}

export default NavBar;
