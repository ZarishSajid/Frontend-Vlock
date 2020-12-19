import React, { Component, Fragment } from "react";
import { Container, Button } from "shards-react";

import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { Tooltip } from "antd";
import { Table } from "reactstrap";

import {  Modal, ModalBody, ModalHeader } from "shards-react";

import {
  Colxx,
  Separator,
} from "../../src/common/CustomBootstrap";
import IntlMessages from "../../src/helpers/IntlMessages";
// import { CloseOutlined, CheckOutlined } from "@ant-design/icons";

class AdminPollApproved extends React.Component {
    constructor(props) {
      super(props);
      this.state = { open: false };
      this.toggle = this.toggle.bind(this);
  }
  toggle() {
      this.setState({
        open: !this.state.open
      });
    }


    

    
  render() {
    const { match} = this.props;
    const { open } = this.state;

 
  
    return (
      <Fragment>
        <br/>
      <h4 style={{ marginLeft: "390px" }}>Poll Approved</h4>
      <Table striped>
        <thead>
          <tr style={{ backgroundColor: "#85DBE9" }}>
            <th>#</th>
            <th>User Type</th>
            <th>Poll Type</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>Student</td>
            <td>CR/GR Selection</td>
            <td>
              {/* <CheckOutlined style={{ marginLeft: "10px" }} /> */}
            </td>
          </tr>

          <tr style={{ backgroundColor: "#E2E6E6" }}>
            <th scope="row">2</th>
            <td>Faculty </td>
            <td> Trip Location</td>
            <td>
              {/* <CheckOutlined style={{ marginLeft: "10px" }} /> */}
            </td>
          </tr>
          <tr>
            <th scope="row">3</th>
            <td>University Adminstration</td>
            <td>Discipline Issue</td>
            <td>
              {/* <CheckOutlined style={{ marginLeft: "10px" }} /> */}
            </td>
          </tr>
        </tbody>
      </Table>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      
    </Fragment>

    );
  }
}

const mapStateToProps = (AdminPollApproved) => {
  return {AdminPollApproved };
};



export default AdminPollApproved;
