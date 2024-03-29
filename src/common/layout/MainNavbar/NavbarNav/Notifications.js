
import React from "react";
import { NavItem, NavLink, Badge, Collapse, DropdownItem } from "shards-react";
import { notification } from "antd";
export default class Notifications extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false,
    };

    this.toggleNotifications = this.toggleNotifications.bind(this);
  }

  toggleNotifications() {
    this.setState({
      visible: !this.state.visible,
    });
    localStorage.setItem("read",false)
  }

  render() {
  const read =localStorage.getItem("read")
  console.log("readdddd",read)
    // const notifications = localStorage.getItem("notifications");
    const notifications= JSON.parse(localStorage.getItem("notifications")) || [];
    console.log("notificationssssss",notifications);
    return (
      <NavItem className=" dropdown notifications">
        <NavLink
          className="nav-link-icon text-center"
          onClick={this.toggleNotifications}
        >
          <div className="nav-link-icon__wrapper" style={{ marginTop: "5px" }}>
            <i className="material-icons">&#xE7F4;</i>
    {read==="true" && <Badge pill theme="danger">
              {notifications.length}
    </Badge>
    }
          </div>
        </NavLink>
        <Collapse
        // style={{height: "330px !important",
        //   overflowy: scroll,
        //   display: "block" }}
          open={this.state.visible}
          className="dropdown-menu dropdown-menu-small notify "
        >
          {notifications.map((notification) => (
            <DropdownItem>
              <div className="notification__icon-wrapper">
                <div className="notification__icon">
                  <i className="material-icons">&#xE6E1;</i>
                </div>
              </div>
              <div className="notification__content">
                <span className="notification__category">Notification</span>
                <p>{notification.message}</p>
              </div>
            </DropdownItem>
          ))}
          {/* <DropdownItem>
            <div className="notification__icon-wrapper">
              <div className="notification__icon">
                <i className="material-icons">&#xE6E1;</i>
              </div>
            </div>
            <div className="notification__content">
              <span className="notification__category">Notification</span>
              <p>
                {localStorage.getItem(
                  "notification2"
                
                )}
              </p>
            </div>
            
          </DropdownItem>
          <DropdownItem>
            <div className="notification__icon-wrapper">
              <div className="notification__icon">
                <i className="material-icons">&#xE6E1;</i>
              </div>
            </div>
            <div className="notification__content">
              <span className="notification__category">Notification</span>
              <p>
              {localStorage.getItem(
                  "notification3"
                
                )}
              </p>
            </div>
            
          </DropdownItem>
          <DropdownItem>
            <div className="notification__icon-wrapper">
              <div className="notification__icon">
                <i className="material-icons">&#xE6E1;</i>
              </div>
            </div>
            <div className="notification__content">
              <span className="notification__category">Notification</span>
              <p>
              {localStorage.getItem(
                  "notification4"
                
                )}
              </p>
            </div>
            
          </DropdownItem> */}
          {/* <DropdownItem>
            <div className="notification__icon-wrapper">
              <div className="notification__icon">
                <i className="material-icons">&#xE6E1;</i>
              </div>
            </div>
            <div className="notification__content">
              <span className="notification__category">Notification</span>
              <p>
              {localStorage.getItem(
                  "notification5"
                
                )}
              </p>
            </div>
            
          </DropdownItem>
          <DropdownItem>
            <div className="notification__icon-wrapper">
              <div className="notification__icon">
                <i className="material-icons">&#xE6E1;</i>
              </div>
            </div>
            <div className="notification__content">
              <span className="notification__category">Notification</span>
              <p>
              {localStorage.getItem(
                  "notification6"
                
                )}
              </p>
            </div>
            
          </DropdownItem> */}
          {/* <DropdownItem>
            <div className="notification__icon-wrapper">
              <div className="notification__icon">
                <i className="material-icons">&#xE6E1;</i>
              </div>
            </div>
            <div className="notification__content">
              <span className="notification__category">Notification</span>
              <p>
              {localStorage.getItem(
                  "notification7"
                
                )}
              </p>
            </div>
            
          </DropdownItem>
          <DropdownItem>
            <div className="notification__icon-wrapper">
              <div className="notification__icon">
                <i className="material-icons">&#xE6E1;</i>
              </div>
            </div>
            <div className="notification__content">
              <span className="notification__category">Notification</span>
              <p>
              {localStorage.getItem(
                  "notification8"
                
                )}
              </p>
            </div>
            
          </DropdownItem> */}
          {/* <DropdownItem>
            <div className="notification__icon-wrapper">
              <div className="notification__icon">
                <i className="material-icons">&#xE6E1;</i>
              </div>
            </div>
            <div className="notification__content">
              <span className="notification__category">Notification</span>
              <p>
              {localStorage.getItem(
                  "notification9"
                
                )}
              </p>
            </div>
            
          </DropdownItem>
          <DropdownItem>
            <div className="notification__icon-wrapper">
              <div className="notification__icon">
                <i className="material-icons">&#xE6E1;</i>
              </div>
            </div>
            <div className="notification__content">
              <span className="notification__category">Notification</span>
              <p>
              {localStorage.getItem(
                  "notification10"
                
                )}
              </p>
            </div>
            
          </DropdownItem> */}
        </Collapse>
      </NavItem>
    );
  }
}
