import React from "react";
import PropTypes from "prop-types";
import { Navbar, NavbarBrand } from "shards-react";

import { Dispatcher, Constants } from "../../../flux";

class SidebarMainNavbar extends React.Component {
  constructor(props) {
    super(props);

    this.handleToggleSidebar = this.handleToggleSidebar.bind(this);
  }

  handleToggleSidebar() {
    Dispatcher.dispatch({
      actionType: Constants.TOGGLE_SIDEBAR,
    });
  }

  render() {
    const { hideLogoText } = this.props;
    return (
      <div className="main-navbar">
        <Navbar
          className="align-items-stretch bg-black flex-md-nowrap border-bottom p-0"
          color="black"
          style={{ marginTop: "0px" }}
        >
          <div className="d-table m-auto">
            <img
              id="main-logo"
              style={{
                maxWidth: "85px",
                color: "blue",
                marginRight: "90px",
                // marginRight: "6rem!important",
              
              }}
              src={require("../../../images/shards-logo.svg")}
              alt="VLock"
            />
      
         

          {/* eslint-disable-next-line */}
          </div>
          <a
            className="toggle-sidebar d-sm-inline d-md-none d-lg-none"
            onClick={this.handleToggleSidebar}
          >
            {/* <i className="material-icons">&#xE5C4;</i> */}
          </a>
        </Navbar>
      </div>
    );
  }
}

SidebarMainNavbar.propTypes = {
  /**
   * Whether to hide the logo text, or not.
   */
  hideLogoText: PropTypes.bool,
};

SidebarMainNavbar.defaultProps = {
  hideLogoText: false,
};

export default SidebarMainNavbar;
