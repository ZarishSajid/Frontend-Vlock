import React from "react";
import { Container, Button } from "shards-react";

import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { Tooltip } from "antd";
import { Table } from "reactstrap";



class PollStatus extends React.Component {
    constructor(props) {
        super(props);
    }
    
  render() {
    const { match } = this.props;

    return (
      <div>
          <br/>
        <h4 style={{ marginLeft: "380px" }}> Faculty Poll Results</h4>
       
        <div
          style={{ marginBottom: "10px" }}
          className="d-flex justify-content-center"
        ></div>
       <Table striped>
        <thead>
          <tr style={{ backgroundColor: "#85DBE9" }}>
            <th>#</th>
            <th>User Name</th>
            <th>Poll Type</th>
            <th style={{ marginLeft: "20px" }}>Result</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>Sadia</td>
            <td>CR/GR Selection</td>
            <td>Click here to see</td>
          </tr>

          <tr style={{ backgroundColor: "#85DBE9" }}>
            <th scope="row">2</th>
            <td>Batool</td>
            <td> Trip Location</td>
            <td>Click here to see</td>
          </tr>
          <tr>
            <th scope="row">3</th>
            <td>Bisma</td>
            <td>Discipline Issue</td>
            <td>Click here to see</td>
          </tr>
        </tbody>
      </Table>
      <Link to={"/FacultyPanel"}>   <b>  <Button style={{marginTop:"30px",marginLeft:"420px" }} color= "#031738"  >Back</Button></b> </Link>
      
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
     
     </div>
     

    );
  }
}

const mapStateToProps = (PollStatus) => {
  return { PollStatus };
};



export default PollStatus;
